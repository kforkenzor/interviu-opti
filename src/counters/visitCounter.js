import getISOWeekNumber from './getISOWeekNumber'

function countVisitsByType(actions) {
  const visitsByType = {
    weekly: {},
    monthly: {},
    yearly: {},
  }

  actions.forEach((action) => {
    const { type, time, prod, value } = action
    const visitDate = new Date(time)

    if (type === 'vizita') {
      // Count visits on a weekly basis
      const weekKey = `${visitDate.getFullYear()}-W${String(
        getISOWeekNumber(visitDate)
      ).padStart(2, '0')}`
      visitsByType.weekly[weekKey] = visitsByType.weekly[weekKey] || {}
      visitsByType.weekly[weekKey][prod] =
        (visitsByType.weekly[weekKey][prod] || 0) + value

      // Count visits on a monthly basis
      const monthKey = `${visitDate.getFullYear()}-${String(
        visitDate.getMonth() + 1
      ).padStart(2, '0')}`
      visitsByType.monthly[monthKey] = visitsByType.monthly[monthKey] || {}
      visitsByType.monthly[monthKey][prod] =
        (visitsByType.monthly[monthKey][prod] || 0) + value

      // Count visits on a yearly basis
      const yearKey = visitDate.getFullYear()
      visitsByType.yearly[yearKey] = visitsByType.yearly[yearKey] || {}
      visitsByType.yearly[yearKey][prod] =
        (visitsByType.yearly[yearKey][prod] || 0) + value
    }
  })

  return visitsByType
}

export default countVisitsByType
