import { useEffect, useState } from 'react'

function formatManilaTime(timezone) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(new Date())
  } catch {
    return '--:--'
  }
}

export function useManilaTime(timezone = 'Asia/Manila') {
  const [time, setTime] = useState(() => formatManilaTime(timezone))

  useEffect(() => {
    setTime(formatManilaTime(timezone))
    const intervalId = setInterval(() => {
      setTime(formatManilaTime(timezone))
    }, 30000)

    return () => clearInterval(intervalId)
  }, [timezone])

  return time
}
