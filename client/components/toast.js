import React from 'react'

const Toast = (props) => {
  return (
    props.visible ?
    <div>
      <p>{props.message}</p>
    </div> : <div></div>
  )
}

export default Toast
