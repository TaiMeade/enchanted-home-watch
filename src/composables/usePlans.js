import planData from '@/data/plans.json'
import site from '@/data/site.json'
import { tierColors } from '@/theme/palette'

const discount = site.billing.annualDiscountPercent / 100

const plans = planData.plans.map((plan) => {
  const parent = planData.plans.find((p) => p.id === plan.includes)
  return {
    ...plan,
    color: tierColors[plan.id],
    // e.g. "Everything in Gold, plus"
    includesLabel: parent ? `Everything in ${parent.name}, plus` : null,
    annualMonthly: Math.round(plan.monthly * (1 - discount)),
    annualTotal: Math.round(plan.monthly * 12 * (1 - discount)),
  }
})

const addOns = planData.addOns

// Options for the contact form's "What are you interested in?" field.
const serviceOptions = [
  ...plans.map((p) => ({ value: p.id, title: `${p.name} plan` })),
  ...addOns.map((a) => ({ value: a.id, title: a.name })),
  { value: 'not-sure', title: 'Not sure yet' },
]

export function usePlans() {
  function serviceLabel(id) {
    return serviceOptions.find((o) => o.value === id)?.title ?? id
  }

  return {
    plans,
    addOns,
    serviceOptions,
    serviceLabel,
    annualDiscountPercent: site.billing.annualDiscountPercent,
  }
}
