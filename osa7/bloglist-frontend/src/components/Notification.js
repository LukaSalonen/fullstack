import React from 'react'

const Notification = ({ store }) => {
  const notification = store.getState().notificationMessage
  if (notification.text === '') {
    return null
  } else if(notification.kind === 'success') {
    return(
      <div className="success">
        {notification.text}
      </div>
    )

  } else {
    return(
      <div className="error">
        {notification.text}
      </div>
    )
  }
}

export default Notification