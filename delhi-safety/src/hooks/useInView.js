import { useEffect, useRef, useState } from 'react'

/**
 * Returns [ref, inView]. Attach ref to a DOM element; inView flips to true
 * once the element scrolls into the viewport (then stays true).
 * Usage: const [ref, inView] = useInView()
 *        <div ref={ref} className={`reveal ${inView ? 'in-view' : ''}`}>
 */
export default function useInView(options = { threshold: 0.15 }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.unobserve(el)
      }
    }, options)
    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [ref, inView]
}
