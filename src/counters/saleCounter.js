import getISOWeekNumber from './getISOWeekNumber'

function countSalesByType(actions) {
  const salesByType = {
    weekly: {},
    monthly: {},
    yearly: {},
  }

  actions.forEach((action) => {
    const { type, time, prod, value } = action
    const visitDate = new Date(time)

    if (type === 'vanzare') {
      // Count visits on a weekly basis
      const weekKey = `${visitDate.getFullYear()}-W${String(
        getISOWeekNumber(visitDate)
      ).padStart(2, '0')}`
      salesByType.weekly[weekKey] = salesByType.weekly[weekKey] || {}
      salesByType.weekly[weekKey][prod] =
        (salesByType.weekly[weekKey][prod] || 0) + value

      // Count visits on a monthly basis
      const monthKey = `${visitDate.getFullYear()}-${String(
        visitDate.getMonth() + 1
      ).padStart(2, '0')}`
      salesByType.monthly[monthKey] = salesByType.monthly[monthKey] || {}
      salesByType.monthly[monthKey][prod] =
        (salesByType.monthly[monthKey][prod] || 0) + value

      // Count visits on a yearly basis
      const yearKey = visitDate.getFullYear()
      salesByType.yearly[yearKey] = salesByType.yearly[yearKey] || {}
      salesByType.yearly[yearKey][prod] =
        (salesByType.yearly[yearKey][prod] || 0) + value
    }
  })

  return salesByType
}

export default countSalesByType
