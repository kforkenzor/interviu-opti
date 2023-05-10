function getISOWeekNumber(date) {
  const onejan = new Date(date.getFullYear(), 0, 1)
  const weekNum = Math.ceil(
    ((date - onejan) / 86400000 + onejan.getDay() + 1) / 7
  )
  return weekNum
}
export default getISOWeekNumber
