export default function transformSalesToTopSales(salesByType) {
  const topSales = []

  // Transform monthly Sales
  for (const monthKey in salesByType.monthly) {
    const monthSales = salesByType.monthly[monthKey]
    const sortedMonthSales = Object.entries(monthSales).sort(
      (a, b) => b[1] - a[1]
    )

    sortedMonthSales.forEach(([prod, sumOfValues], index) => {
      topSales.push({
        type_item: 'vanzare',
        type_top: 'lunar',
        ident_top: monthKey,
        line: index + 1,
        sumofvalues: sumOfValues,
        prod: parseInt(prod),
      })
    })
  }

  // Transform weekly Sales
  for (const weekKey in salesByType.weekly) {
    const weekSales = salesByType.weekly[weekKey]
    const sortedWeekSales = Object.entries(weekSales).sort(
      (a, b) => b[1] - a[1]
    )

    sortedWeekSales.forEach(([prod, sumOfValues], index) => {
      topSales.push({
        type_item: 'vanzare',
        type_top: 'saptamanal',
        ident_top: weekKey,
        line: index + 1,
        sumofvalues: sumOfValues,
        prod: parseInt(prod),
      })
    })
  }

  // Transform yearly Sales
  for (const yearKey in salesByType.yearly) {
    const yearSales = salesByType.yearly[yearKey]
    const sortedYearSales = Object.entries(yearSales).sort(
      (a, b) => b[1] - a[1]
    )

    sortedYearSales.forEach(([prod, sumOfValues], index) => {
      topSales.push({
        type_item: 'vanzare',
        type_top: 'anual',
        ident_top: yearKey,
        line: index + 1,
        sumofvalues: sumOfValues,
        prod: parseInt(prod),
      })
    })
  }

  return topSales
}
