import React from 'react'
import Blog from './Blog'

const BlogList = ({ store, updateBlogs }) => store.getState().blogs.map(blog =>
  <Blog key={blog.id} blog={blog} logIn={store.getState().user} updateBlogs={updateBlogs}/>
)

export default BlogList