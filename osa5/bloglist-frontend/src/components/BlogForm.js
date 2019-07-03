import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const BlogForm = ({ updateBlogs, updateNotification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title,
        author,
        url,
      }
      const response = await blogService.create(blogObject)
      if (response) {
        updateNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 'success')
        setTitle('')
        setAuthor('')
        setUrl('')
        updateBlogs()
      }
    } catch (exception) {
      updateNotification('could not create new blog', 'error')
    }
  }

  return (
        <>
            <h2>create new</h2>
            <form onSubmit={handleCreate}>
              <div>
                    title:
                <input
                  type="text"
                  value={title}
                  name="Title"
                  onChange={({ target }) => setTitle(target.value)} />
              </div>
              <div>
              author:
                <input
                  type="text"
                  value={author}
                  name="Author"
                  onChange={({ target }) => setAuthor(target.value)} />
              </div>
              <div>
                    url:
                <input
                  type="text"
                  value={url}
                  name="Title"
                  onChange={({ target }) => setUrl(target.value)} />
              </div>
              <button type="submit">create</button>
            </form>
        </>
  )
}
BlogForm.propTypes = {
  updateBlogs: PropTypes.func.isRequired,
  updateNotification: PropTypes.func.isRequired
}

export default BlogForm