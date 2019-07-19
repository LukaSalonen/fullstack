import React from 'react'

const SingleUser = ({ user }) => {

  if (user === undefined) {
    return null
  }

  const mappedBlogs = (blogs) => blogs.map(blog =>
    <div key={blog.id}>
      <li >{blog.title}</li>
    </div>
  )

  return (
    <>
    <h2>{user.name}</h2>
    <h3>added blogs</h3>
    <ul>
      {mappedBlogs(user.blogs)}
    </ul>
    </>
  )
}

export default SingleUser