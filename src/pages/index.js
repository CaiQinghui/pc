import React from "react"

const pages = {
  GetLayout: React.lazy(() => import('./layout')),
  CycleManagement: React.lazy(() => import('./cycleManagement')),
  DebriefingScoring: React.lazy(() => import('./debriefingScoring')),
  DebriefingRole: React.lazy(() => import('./debriefingRole')),
}

export default pages