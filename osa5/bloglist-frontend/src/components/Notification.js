import React from 'react'

const Notification = ({notification}) => {
    if (notification.text === '') {
      return null
    } else if(notification.type === 'success') {
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