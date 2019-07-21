import React from 'react'
import { Message } from 'semantic-ui-react'

const Notification = ({ store }) => {
  const notification = store.getState().notificationMessage
  if (notification.text === '') {
    return null
  } else if(notification.kind === 'success') {
    return (
      <Message success>
        {notification.text}
      </Message>
    )

  } else {
    return (
      <Message negative>
        {notification.text}
      </Message>
    )
  }
}

export default Notification