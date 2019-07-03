import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, logIn, updateBlogs }) => blogs.map(blog =>
  <Blog key={blog.id} blog={blog} logIn={logIn} updateBlogs={updateBlogs}/>
)

export default BlogList