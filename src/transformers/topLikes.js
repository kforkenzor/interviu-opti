export default function transformLikesToTopLikes(likesByType) {
  const topLikes = []

  // Transform monthly Likes
  for (const monthKey in likesByType.monthly) {
    const monthLikes = likesByType.monthly[monthKey]
    const sortedMonthLikes = Object.entries(monthLikes).sort(
      (a, b) => b[1] - a[1]
    )

    sortedMonthLikes.forEach(([prod, sumOfValues], index) => {
      topLikes.push({
        type_item: 'like',
        type_top: 'lunar',
        ident_top: monthKey,
        line: index + 1,
        sumofvalues: sumOfValues,
        prod: parseInt(prod),
      })
    })
  }

  // Transform weekly Likes
  for (const weekKey in likesByType.weekly) {
    const weekLikes = likesByType.weekly[weekKey]
    const sortedWeekVisit = Object.entries(weekLikes).sort(
      (a, b) => b[1] - a[1]
    )

    sortedWeekVisit.forEach(([prod, sumOfValues], index) => {
      topLikes.push({
        type_item: 'like',
        type_top: 'saptamanal',
        ident_top: weekKey,
        line: index + 1,
        sumofvalues: sumOfValues,
        prod: parseInt(prod),
      })
    })
  }

  // Transform yearly Likes
  for (const yearKey in likesByType.yearly) {
    const yearLikes = likesByType.yearly[yearKey]
    const sortedYearLikes = Object.entries(yearLikes).sort(
      (a, b) => b[1] - a[1]
    )

    sortedYearLikes.forEach(([prod, sumOfValues], index) => {
      topLikes.push({
        type_item: 'like',
        type_top: 'anual',
        ident_top: yearKey,
        line: index + 1,
        sumofvalues: sumOfValues,
        prod: parseInt(prod),
      })
    })
  }

  return topLikes
}
