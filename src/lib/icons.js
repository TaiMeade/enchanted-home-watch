// Maps the icon ids used in data files (e.g. site.json "social") to MDI SVG paths,
// so data stays plain JSON and only the icons we use end up in the bundle.
import { mdiFacebook, mdiInstagram, mdiHomeGroup, mdiLink } from '@mdi/js'

const socialIcons = {
  facebook: mdiFacebook,
  instagram: mdiInstagram,
  nextdoor: mdiHomeGroup,
}

export const socialIcon = (id) => socialIcons[id] ?? mdiLink
