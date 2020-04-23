import React from "react"
import useHeaderAdjustment from "../../core/hooks/useHeaderAdjustment"
import { HeaderHeightParams } from "../../types"

const HeaderAdjustment = (
  props: React.PropsWithChildren<
    Pick<
      HeaderHeightParams,
      "objectId" | "clippable" | "insetFixed" | "stable"
    >
  >
) => {
  const style = useHeaderAdjustment(props)
  return <div className={'MuiTreasury-headerAdjustment'} style={style} />
}

export default HeaderAdjustment
