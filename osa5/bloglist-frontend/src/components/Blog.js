import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, logIn, updateBlogs }) => {
  const [showFull, setShowFull] = useState(false)

  const toggleVisibility = () => {
    setShowFull(!showFull)
  }

  const addLike = async () => {
    const updated = {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

    try {
      await blogService.update(updated, blog.id)
      updateBlogs()
    } catch(exception) {
      console.log('update did not work')
    }
  }

  if (showFull) {
    return (
      <div className='blog' onClick={toggleVisibility} >
        <p>{blog.title} {blog.author}</p>
        <p>{blog.url}</p>
        <p>{blog.likes} likes </p> <button onClick={addLike}> like </button>
        <p>added by {blog.user.name}</p>
        {(blog.user.username === logIn.username) && <button className="deleteButton" onClick={async () => {
          await blogService.deleteBlog(blog.id)
          updateBlogs()
        }}> delete </button>}
      </div>
    )
  }

  return (
    <div className='blog' onClick={toggleVisibility}>
      <p>{blog.title} {blog.author}</p>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  logIn: PropTypes.object.isRequired,
  updateBlogs: PropTypes.func.isRequired
}

export default Blog