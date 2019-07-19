import React from 'react'

const LoginForm = ({ username, password, handleLogin }) => {

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
                username
          <input {...username} reset='' />
        </div>
        <div>
                  password
          <input {...password} reset='' />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm