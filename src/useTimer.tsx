import { useState, useEffect, useMemo } from "react"

const useTimer = (seconds: number) => {
  const t = useMemo(() => Date.now() + seconds * 1000, [seconds])
  const [remainingTime, setRemainingTime] = useState(t - Date.now())

  useEffect(() => {
    const f = setInterval(() => {
      setRemainingTime(t - Date.now())
    }, 50)
    return () => clearInterval(f)
  }, [t])

  return { remainingTime: Math.max(remainingTime, 0) }
}

export { useTimer }
