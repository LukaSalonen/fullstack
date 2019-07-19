import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { useField } from '../hooks'

const BlogForm = ({ updateBlogs, updateNotification }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: title.value,
        author: author.value,
        url: url.value
      }
      const response = await blogService.create(blogObject)
      if (response) {
        updateNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 'success')
        title.reset()
        author.reset()
        url.reset()
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
                <input {...title} reset='' />
              </div>
              <div>
              author:
                <input {...author} reset='' />
              </div>
              <div>
                    url:
                <input {...url} reset='' />
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