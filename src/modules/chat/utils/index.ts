export function decorateDateTimeToTime (dateTime: Date) {
  const hours: string = dateTime.getHours() + ''
  const minutes: string = dateTime.getMinutes() + ''
  const seconds: string = dateTime.getSeconds() + ''

  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`
}
