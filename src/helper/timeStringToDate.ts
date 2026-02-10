export const timeStringToDate = (time: string) => {
  const [hour=0, minute=0] = time.split(":").map(Number)

  const date = new Date()
  date.setHours(hour, minute, 0, 0)

  return date
}
