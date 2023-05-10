export default function transformVisitsToTopVisits(visitsByType) {
  const topVisits = []

  // Transform monthly visits
  for (const monthKey in visitsByType.monthly) {
    const monthVisits = visitsByType.monthly[monthKey]
    const sortedMonthVisits = Object.entries(monthVisits).sort(
      (a, b) => b[1] - a[1]
    )

    sortedMonthVisits.forEach(([prod, sumOfValues], index) => {
      topVisits.push({
        type_item: 'vizita',
        type_top: 'lunar',
        ident_top: monthKey,
        line: index + 1,
        sumofvalues: sumOfValues,
        prod: parseInt(prod),
      })
    })
  }

  // Transform weekly visits
  for (const weekKey in visitsByType.weekly) {
    const weekVisits = visitsByType.weekly[weekKey]
    const sortedWeekVisit = Object.entries(weekVisits).sort(
      (a, b) => b[1] - a[1]
    )

    sortedWeekVisit.forEach(([prod, sumOfValues], index) => {
      topVisits.push({
        type_item: 'vizita',
        type_top: 'saptamanal',
        ident_top: weekKey,
        line: index + 1,
        sumofvalues: sumOfValues,
        prod: parseInt(prod),
      })
    })
  }

  // Transform yearly visits
  for (const yearKey in visitsByType.yearly) {
    const yearVisits = visitsByType.yearly[yearKey]
    const sortedYearVisits = Object.entries(yearVisits).sort(
      (a, b) => b[1] - a[1]
    )

    sortedYearVisits.forEach(([prod, sumOfValues], index) => {
      topVisits.push({
        type_item: 'vizita',
        type_top: 'anual',
        ident_top: yearKey,
        line: index + 1,
        sumofvalues: sumOfValues,
        prod: parseInt(prod),
      })
    })
  }

  return topVisits
}
