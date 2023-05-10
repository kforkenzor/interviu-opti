import getISOWeekNumber from './getISOWeekNumber'
function countLikesByType(actions) {
  const likesByType = {
    weekly: {},
    monthly: {},
    yearly: {},
  }

  actions.forEach((action) => {
    const { type, time, prod, value } = action
    const visitDate = new Date(time)

    if (type === 'like') {
      // Count visits on a weekly basis
      const weekKey = `${visitDate.getFullYear()}-W${String(
        getISOWeekNumber(visitDate)
      ).padStart(2, '0')}`
      likesByType.weekly[weekKey] = likesByType.weekly[weekKey] || {}
      likesByType.weekly[weekKey][prod] =
        (likesByType.weekly[weekKey][prod] || 0) + value

      // Count visits on a monthly basis
      const monthKey = `${visitDate.getFullYear()}-${String(
        visitDate.getMonth() + 1
      ).padStart(2, '0')}`
      likesByType.monthly[monthKey] = likesByType.monthly[monthKey] || {}
      likesByType.monthly[monthKey][prod] =
        (likesByType.monthly[monthKey][prod] || 0) + value

      // Count visits on a yearly basis
      const yearKey = visitDate.getFullYear()
      likesByType.yearly[yearKey] = likesByType.yearly[yearKey] || {}
      likesByType.yearly[yearKey][prod] =
        (likesByType.yearly[yearKey][prod] || 0) + value
    }
  })

  return likesByType
}

export default countLikesByType
