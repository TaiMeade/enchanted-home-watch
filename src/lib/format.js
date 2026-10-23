const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export const formatPrice = (amount) => usd.format(amount)

export const formatFeet = (feet) => `${feet.toLocaleString('en-US')} ft`
