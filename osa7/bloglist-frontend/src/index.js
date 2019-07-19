import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers } from 'redux'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import allUsersReducer from './reducers/allUsersReducer'

const reducer = combineReducers({
  users: allUsersReducer,
  blogs: blogReducer,
  user: userReducer,
  notificationMessage: notificationReducer
})

const store = createStore(reducer)

const renderApp = () => {
  ReactDOM.render(
    <App store={store} />, document.getElementById('root')
  )
}

renderApp()
store.subscribe(renderApp)