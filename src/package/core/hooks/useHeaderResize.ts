import { useEffect, useState, useRef } from "react"
import { ResizeSensor } from "css-element-queries"

export default (headerId: string, initialHeight?: number | string) => {
  const [height, setHeight] = useState(initialHeight)
  const ref = useRef(0)
  useEffect(() => {
    const headerElm = document.getElementById(headerId)
    new ResizeSensor(headerElm, () => {
      if (!ref.current) {
        ref.current = headerElm.clientHeight
      }
      if (ref.current !== headerElm.clientHeight) {
        ref.current = headerElm.clientHeight
        setHeight(headerElm.clientHeight)
      }
    })
  }, [])
  return height
}
