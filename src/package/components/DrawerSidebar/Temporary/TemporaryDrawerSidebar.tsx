import React from "react"
import { createDrawerSidebar } from "../../Shared/SharedSidebar"

export default createDrawerSidebar("temporary", ({ id, setOpen }) => ({
  onClose: () => setOpen(id, false),
}))
