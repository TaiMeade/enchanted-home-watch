<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import areas from '@/data/areas.json'
import { formatFeet } from '@/lib/format'

/**
 * A drawn map of the Enchanted Circle loop, projected from the lat/lon in areas.json.
 * Adding a town to the data file places it on the map automatically.
 */
const props = defineProps({
  activeSlug: { type: String, default: null },
})
const emit = defineEmits(['update:activeSlug'])

const router = useRouter()
const { loop, towns } = areas

// --- Projection (simple equirectangular, corrected for latitude) ---
const PAD_X = 118
const PAD_Y = 44
const SCALE = 1000
const allPoints = [...loop.route, ...towns, loop.peak]
const minLon = Math.min(...allPoints.map((p) => p.lon))
const maxLon = Math.max(...allPoints.map((p) => p.lon))
const minLat = Math.min(...allPoints.map((p) => p.lat))
const maxLat = Math.max(...allPoints.map((p) => p.lat))
const lonFactor = Math.cos((((minLat + maxLat) / 2) * Math.PI) / 180)

const project = ({ lat, lon }) => ({
  x: PAD_X + (lon - minLon) * lonFactor * SCALE,
  y: PAD_Y + (maxLat - lat) * SCALE,
})

const width = Math.round(PAD_X * 2 + (maxLon - minLon) * lonFactor * SCALE)
const height = Math.round(PAD_Y * 2 + (maxLat - minLat) * SCALE)

// Closed Catmull-Rom spline through the route points, as cubic Béziers.
function closedCurve(points) {
  const n = points.length
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n]
    const p1 = points[i]
    const p2 = points[(i + 1) % n]
    const p3 = points[(i + 2) % n]
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 }
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 }
    d += ` C ${c1.x.toFixed(1)} ${c1.y.toFixed(1)}, ${c2.x.toFixed(1)} ${c2.y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }
  return `${d} Z`
}

const loopPath = closedCurve(loop.route.map(project))

const placedTowns = towns.map((town) => ({ ...town, ...project(town) }))
const townBySlug = Object.fromEntries(placedTowns.map((t) => [t.slug, t]))

const spurs = placedTowns
  .filter((t) => t.spurFrom)
  .map((t) => {
    const from = townBySlug[t.spurFrom]
    return { slug: t.slug, d: `M ${from.x} ${from.y} L ${t.x} ${t.y}` }
  })

const peak = { ...loop.peak, ...project(loop.peak) }
const peakPath = `M ${peak.x - 11} ${peak.y + 8} L ${peak.x} ${peak.y - 10} L ${peak.x + 11} ${peak.y + 8} Z`

// --- Draw the loop once when it scrolls into view ---
const root = ref(null)
const armed = ref(false)
const drawn = ref(false)
let observer = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
  armed.value = true
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        drawn.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.35 },
  )
  observer.observe(root.value)
})
onBeforeUnmount(() => observer?.disconnect())

const goTo = (slug) => router.push(`/service-areas/${slug}`)
</script>

<template>
  <svg
    ref="root"
    class="map"
    :class="{ 'map--armed': armed, 'map--drawn': drawn }"
    :viewBox="`0 0 ${width} ${height}`"
    role="img"
    :aria-label="`Map of the ${loop.miles}-mile ${loop.name}, showing ${towns.map((t) => t.name).join(', ')}`"
  >
    <path :d="loopPath" class="map__road-glow" />
    <path :d="loopPath" class="map__road" pathLength="1" />
    <path v-for="spur in spurs" :key="spur.slug" :d="spur.d" class="map__spur" />

    <g class="map__peak">
      <path :d="peakPath" />
      <text :x="peak.x" :y="peak.y + 26" text-anchor="middle" class="map__peak-name">{{ peak.name }}</text>
      <text :x="peak.x" :y="peak.y + 40" text-anchor="middle" class="map__peak-elev">
        {{ formatFeet(peak.elevationFt) }}, highest in New Mexico
      </text>
    </g>

    <g
      v-for="town in placedTowns"
      :key="town.slug"
      class="map__town"
      :class="{ 'map__town--active': town.slug === props.activeSlug }"
      @mouseenter="emit('update:activeSlug', town.slug)"
      @mouseleave="emit('update:activeSlug', null)"
      @click="goTo(town.slug)"
    >
      <circle :cx="town.x" :cy="town.y" r="14" class="map__hit" />
      <circle :cx="town.x" :cy="town.y" :r="town.onLoop ? 6.5 : 5" class="map__dot" />
      <text
        :x="town.labelSide === 'left' ? town.x - 14 : town.x + 14"
        :y="town.y + 1"
        :text-anchor="town.labelSide === 'left' ? 'end' : 'start'"
        class="map__label"
      >
        <tspan class="map__name">{{ town.name }}</tspan>
        <tspan :x="town.labelSide === 'left' ? town.x - 14 : town.x + 14" dy="15" class="map__elev">
          {{ formatFeet(town.elevationFt) }}
        </tspan>
      </text>
    </g>
  </svg>
</template>

<style scoped>
.map {
  width: 100%;
  height: auto;
  overflow: visible;
  font-family: var(--type-body);
}

.map__road-glow {
  fill: none;
  stroke: rgba(var(--v-theme-accent), 0.18);
  stroke-width: 16;
  stroke-linejoin: round;
}

.map__road {
  fill: none;
  stroke: rgb(var(--v-theme-accent));
  stroke-width: 4;
  stroke-linejoin: round;
  stroke-linecap: round;
}

.map--armed .map__road {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
}

.map--armed .map__road-glow,
.map--armed .map__spur,
.map--armed .map__town,
.map--armed .map__peak {
  opacity: 0;
}

.map--drawn .map__road {
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 2.4s var(--ease-out);
}

.map--drawn .map__road-glow,
.map--drawn .map__spur,
.map--drawn .map__town,
.map--drawn .map__peak {
  opacity: 1;
  transition: opacity 0.8s ease 1.6s;
}

.map__spur {
  fill: none;
  stroke: rgba(var(--v-theme-accent), 0.85);
  stroke-width: 2.5;
  stroke-dasharray: 5 6;
  stroke-linecap: round;
}

.map__peak path {
  fill: rgb(var(--v-theme-background));
}

/* A halo in the panel color keeps labels legible where they cross the road */
.map__label,
.map__peak text {
  paint-order: stroke;
  stroke: rgb(var(--v-theme-forest));
  stroke-width: 5px;
  stroke-linejoin: round;
}

.map__peak-name {
  fill: rgb(var(--v-theme-background));
  font-family: var(--type-display);
  font-size: 14px;
  font-weight: 700;
}

.map__peak-elev {
  fill: rgba(255, 255, 255, 0.6);
  font-size: 11px;
}

.map__town {
  cursor: pointer;
}

.map__hit {
  fill: transparent;
}

.map__dot {
  fill: rgb(var(--v-theme-forest));
  stroke: rgb(var(--v-theme-background));
  stroke-width: 2.5;
  transition:
    fill 0.2s,
    r 0.2s;
}

.map__label {
  fill: rgb(var(--v-theme-background));
}

.map__name {
  font-family: var(--type-display);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.map__elev {
  font-size: 11px;
  fill: rgba(255, 255, 255, 0.6);
}

/* The map shrinks to about half size on phones; the town tiles above it already list elevations */
@media (max-width: 599px) {
  .map__name {
    font-size: 19px;
  }

  .map__elev {
    display: none;
  }

  .map__peak-name {
    font-size: 17px;
  }

  .map__peak-elev {
    font-size: 13px;
  }
}

.map__town--active .map__dot,
.map__town:hover .map__dot {
  fill: rgb(var(--v-theme-gold-soft));
  r: 9px;
}

.map__town--active .map__name,
.map__town:hover .map__name {
  fill: rgb(var(--v-theme-gold-soft));
}
</style>
