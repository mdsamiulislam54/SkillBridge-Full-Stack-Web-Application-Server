export const timeStringToDate = (time: string) => {
  const [hour, minute] = time.split(":").map(Number)

  const date = new Date()
  date.setHours(hour, minute, 0, 0)

  return date
}
