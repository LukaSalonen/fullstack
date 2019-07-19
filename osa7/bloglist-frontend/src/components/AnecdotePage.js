import React from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import BlogList from './BlogList'

const AnecdotePage = ({ store, updateNotification, updateBlogs }) => {
  return (
    <>
      <Togglable buttonLabel="new blog" >
        <BlogForm updateBlogs={updateBlogs} updateNotification={updateNotification} />
      </Togglable>
      <br></br>
      <BlogList store={store} updateBlogs={updateBlogs} />
    </>
  )
}

export default AnecdotePage