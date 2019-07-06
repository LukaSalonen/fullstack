import React from 'react'

const LogoutButton = ({ setUser, updateNotification }) => {

  const deleteUser = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    updateNotification('succesfully logged out','success')
  }

  return (
    <button onClick={deleteUser}> logout </button>
  )
}

export default LogoutButton