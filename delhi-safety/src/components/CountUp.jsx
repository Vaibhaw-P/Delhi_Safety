import { useEffect, useRef, useState } from 'react'

/**
 * Animates a number from 0 up to `value` on mount / whenever `value` changes.
 * Usage: <CountUp value={91.4} decimals={1} suffix="%" />
 */
export default function CountUp({ value, duration = 900, decimals = 0, prefix = '', suffix = '' }) {
  const [display, setDisplay] = useState(0)
  const frameRef = useRef()
  const startRef = useRef(null)

  useEffect(() => {
    const target = Number(value) || 0
    startRef.current = null

    function step(timestamp) {
      if (startRef.current === null) startRef.current = timestamp
      const progress = Math.min((timestamp - startRef.current) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out-cubic
      setDisplay(target * eased)
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step)
      } else {
        setDisplay(target)
      }
    }

    frameRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration])

  return <>{prefix}{display.toFixed(decimals)}{suffix}</>
}
