import React from "react"
import './index.scss'

const Status = (props) => {
  const { status } = props
  return (
    <span className={`${status}`} >
      {status === 'efficient' ? '有效' : '无效'}
    </span>
  )
}

export default Status