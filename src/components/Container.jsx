import React from 'react'

function Container({children,className,...props}) {
  return (
    <div className={`container mx-auto p-2 w-full ${className}`} {...props}>{children}</div>
  )
}

export default Container