export function decorateDateTimeToTime (dateTime: Date, format :'short' | 'long' = 'long') {
  const hours: string = dateTime.getHours() + ''
  const minutes: string = dateTime.getMinutes() + ''
  const seconds: string = dateTime.getSeconds() + ''

  if (format === 'long') {
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`
  } else {
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`
  }
}
