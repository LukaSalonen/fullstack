import React from 'react'

const LogoutButton = ({ resetUser, updateNotification }) => {

  const deleteUser = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    resetUser()
    updateNotification('succesfully logged out','success')
  }

  return (
    <button onClick={deleteUser}> logout </button>
  )
}

export default LogoutButton