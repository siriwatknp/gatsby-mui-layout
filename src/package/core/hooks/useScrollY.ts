import { useEffect, useRef, useState } from "react"
import debounce from "debounce"

export default () => {
  function getScrollY(w: Window = window) {
    return typeof w === "object" ? w.scrollY : 0
  }
  const [scrollY, setScrollY] = useState(getScrollY())
  const debounceScrollListener = useRef(
    debounce(() => {
      setScrollY(getScrollY())
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
