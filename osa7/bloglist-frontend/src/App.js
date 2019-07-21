import React, { useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import usersService from './services/users'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'
import AnecdotePage from './components/AnecdotePage'
import LogoutButton from './components/LogoutButton'
import SingleUser from './components/SingleUser'
import './App.css'
import { useField } from './hooks'
import { initBlogs } from './reducers/blogReducer'
import { setNotification, resetNotification } from './reducers/notificationReducer'
import { createUser, resetUser } from './reducers/userReducer'
import { setAllUsers } from './reducers/allUsersReducer'
import { Container } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'

const App = ({ store }) => {
  const password = useField('password')
  const username = useField('text')

  const updateBlogs = async () => {
    let newBlogs = await blogService.getAll()
    newBlogs = newBlogs.sort((a, b) => {
      return b.likes - a.likes
    })
    store.dispatch(initBlogs(newBlogs))
  }

  const getAllUsers = async () => {
    const response = await usersService.getUsers()
    store.dispatch(setAllUsers(response))
  }

  const updateUser = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      handleCreateUser(user)
      blogService.setToken(user.token)
    }
  }

  const updateNotification = (message, kind) => {
    const notificationData = {
      text: message,
      kind
    }
    store.dispatch(setNotification(notificationData))
    setTimeout(() => {
      store.dispatch(resetNotification())
    }, 3000)

  }

  useEffect(() => {
    updateBlogs()
    getAllUsers()
    updateUser()
    // eslint-disable-next-line
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      handleCreateUser(user)
      username.reset()
      password.reset()
      updateNotification('succesfully logged in', 'success')
    } catch (exception) {
      updateNotification('wrong username or password', 'error')
    }
  }

  const userById = (id) => store.getState().users.find(a => a.id === id)


  const handleCreateUser = (user) => {
    store.dispatch(createUser(user))
  }
  const handleResetUser = () => {
    store.dispatch(resetUser())
  }

  if (store.getState().user === null) {
    return (
      <Container>
        <h1>Blogs</h1>
        <Notification store={store} />
        <LoginForm
          username={username} password={password}
          handleLogin={handleLogin} />
      </Container>
    )
  }
  const padding = {
    paddingRight: 5
  }
  return (
    <Container>
      <Router>
        <div>
          <div>
            <Link style={padding} to="/">anecdotes</Link>
            <Link style={padding} to="/users">users</Link>
            {store.getState().user.name} logged in
            <LogoutButton resetUser={handleResetUser} updateNotification={updateNotification} />
          </div>
          <h1>Blogs</h1>
          <Notification store={store} />
          <Route exact path="/users/:id" render={({ match }) =>
            <SingleUser user={userById(match.params.id)} />
          } />
          <Route exact path="/" render={() =>
            <AnecdotePage
              store={store}
              updateBlogs={updateBlogs}
              updateNotification={updateNotification} />} />
          <Route exact path="/users" render={() => <Users store={store} />} />
        </div>
      </Router>
    </Container>
  )
}

export default App
