import React from 'react'

const EmailIcon = ({cor,size,className}) => {
  return (
    <div className={className}>
        <svg xmlns="http://www.w3.org/2000/svg" width={size} fill={cor} height={size} viewBox="0 0 24 24" style="transform: ;msFilter:;">z<path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z"></path></svg>
    </div>
  )
}

export default EmailIcon;