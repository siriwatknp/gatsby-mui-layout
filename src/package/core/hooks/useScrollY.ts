import { useEffect, useRef, useState } from "react"
import debounce from "debounce"

export const useScrollY = () => {
  const w = typeof window === "object" ? window : undefined
  function getScrollY(obj: Window) {
    return typeof obj === "object" ? obj.scrollY : 0
  }
  const [scrollY, setScrollY] = useState(getScrollY(w))
  const debounceScrollListener = useRef(
    debounce(() => {
      setScrollY(getScrollY(w))
    }, 300)
  )
  useEffect(() => {
    window.addEventListener("scroll", debounceScrollListener.current)
    return () => {
      window.removeEventListener("scroll", debounceScrollListener.current)
    }
  }, [])
  return scrollY
}

export default useScrollY
