import React, { ReactElement } from 'react'
interface IChildrenGuard {
  showChildren: boolean
  children: ReactElement[] | ReactElement
}
const ChildrenGuard: React.FC<IChildrenGuard> = ({ showChildren, children }) => {
  if (!showChildren) {
    return null
  }

  return <>{children}</>
}

export default ChildrenGuard
