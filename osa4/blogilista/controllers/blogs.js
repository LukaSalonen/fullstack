const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', (request, response, next) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs.map(blog => blog.toJSON()))
      })
      .catch(error => {
        error
      })
  })
  
blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result.toJSON())
      })
      .catch(error => {
        next(error)
      })
  })

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const blog = request.body

  try {
    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true})
    response.status(200).end()
  } catch(error) {
    next(error)
  }
})

  module.exports = blogsRouter