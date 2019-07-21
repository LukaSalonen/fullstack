const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs.map(b => b.toJSON()))
  })
  
blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid'})
      } 

      const user = await User.findById(decodedToken.id)

      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
      })

      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.json(savedBlog.toJSON())

    } catch (exception) {
      next(exception)
    }

  })

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid'})
    } else if ( blog.user.toString() !== decodedToken.id.toString() ) {
      return response.status(401).json({ error: 'No permission to delete that resource'})
    }

    await Blog.findByIdAndRemove(blog.id)
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