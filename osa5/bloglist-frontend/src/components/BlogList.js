import React from 'react'
import Blog from './Blog'

const BlogList = ({blogs}) => blogs.map(blog => 
    <Blog key={blog.id} blog={blog} />
)

export default BlogList