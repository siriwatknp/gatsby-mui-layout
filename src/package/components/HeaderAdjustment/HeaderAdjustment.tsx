import React from "react"
import useHeaderAdjustment from "../../core/hooks/useHeaderAdjustment"

const HeaderAdjustment = (
  props: React.PropsWithChildren<{ objectId?: string; clippable?: boolean }>
) => {
  const style = useHeaderAdjustment(props)
  return <div style={style} />
}

export default HeaderAdjustment
