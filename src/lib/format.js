const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export const formatPrice = (amount) => usd.format(amount)

export const formatFeet = (feet) => `${feet.toLocaleString('en-US')} ft`

// "Credit or debit card", "ACH bank transfer", "Check" -> "credit or debit card, ACH bank transfer, or check"
// Lowercases each item's first letter for mid-sentence use, but leaves acronyms like ACH alone.
const list = new Intl.ListFormat('en-US', { style: 'long', type: 'disjunction' })
export const sentenceList = (items) =>
  list.format(items.map((item) => (/^[A-Z][a-z]/.test(item) ? item[0].toLowerCase() + item.slice(1) : item)))
