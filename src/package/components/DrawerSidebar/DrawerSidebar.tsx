import React from "react"
import PersistentDrawerSidebar, {
  PersistentDrawerSidebarProps,
} from "./Persistent"

const DrawerSidebar = (props: PersistentDrawerSidebarProps) => {
  return (
    <>
      <PersistentDrawerSidebar {...props} />
    </>
  )
}

export default DrawerSidebar
