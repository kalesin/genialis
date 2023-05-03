export function getTimestampFromEuFormat(date) { 
  const parts = date.split("/")
  const dateString = [parts[1], parts[0], parts[2]].join("/")
  return new Date(dateString).getTime()
}

export function getEuFormatFromTimestamp(timestamp) {
  const date = new Date(timestamp)
  let formatted = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
  return formatted
}

export function convertToKelvin(celsius) {
  return celsius+273
}

export function formatTemperatureToCelsius(temperature) {
  return `${Math.floor(temperature-273)} °C`
}