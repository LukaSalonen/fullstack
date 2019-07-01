import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login' 
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import LogoutButton from './components/LogoutButton'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([]) 
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState({text:'', type:''})

  const updateBlogs = async () => {
    const newBlogs = await blogService.getAll()
    setBlogs(newBlogs)
  }

  const updateUser = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }

  const updateNotification = (message, kind) => {
    setNotificationMessage({text:message, type:kind})
    setTimeout(() => {
      setNotificationMessage({text:'', type:''})
    }, 3000)
    
  }

  useEffect(() => {
    updateBlogs()
  }, [])
  useEffect(updateUser, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      updateNotification('succesfully logged in', 'success')
    } catch (exception) {
      updateNotification('wrong username or password', 'error')
    }
  }

  if (user === null) {
    return (
      <div>
        <h1>Log in to application</h1>
        <Notification notification={notificationMessage} />
        <LoginForm
        username={username} password={password}
        setUsername={setUsername} setPassword={setPassword}
        handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification notification={notificationMessage} />
      <h3>{user.name} logged in</h3>
      <LogoutButton setUser={setUser} updateNotification={updateNotification} />
      <br></br>
      <br></br>
      <BlogForm updateBlogs={updateBlogs} updateNotification={updateNotification} />
      <br></br>
      <BlogList blogs={blogs} />
    </div>
  )
}

export default App;
