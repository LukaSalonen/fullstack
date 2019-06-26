const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Test blog pls ignore",
    author: "Luke McDuke",
    url: "Nope",
    likes: 2
  },
  {
    title: "Bara en gummi",
    author: "Åke",
    url: "Nej tack",
    likes: 6
  },
  {
    title: "Hello world",
    author: "Alan Turing",
    url: "www.alan.com",
    likes: 166
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  const blogObjects = initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

})

describe('when there is initially some notes saved', () => {
  test('correct number of blogs is returned', async () => {

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length)
  
  })
  test('response is in JSON format', async () => {
    const response = await api.get('/api/blogs')
      .expect('Content-Type', /application\/json/)
  })
  test('object has an id field', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
    
  })

})
describe("addition of a note" , () => {
  test('adding blogs with post works', async () => {
    const newBlog =   {
      title: "Moro Pate",
      author: "Paten kaveri",
      url: "HAh gotem",
      likes: 123444
    }
  

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('content-type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(el => el.title)
  
    expect(response.body.length).toBe(initialBlogs.length + 1)
    expect(titles).toContain(
      'Moro Pate'
    )
  })
  test('default value for likes is 0', async () => {
    const newBlog =   {
      title: "Moro Pate",
      author: "Paten kaveri",
      url: "HAh gotem" 
    }

    await api
    .post('/api/blogs')
    .send(newBlog)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(el => el.title)

    expect(response.body[response.body.length - 1].likes).toBe(0)
  })
  test('missing title and url fields lead to HTTP code 400', async () => {
    const newBlog =   {
      author: "Paten kaveri",
      likes: 123444
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  })
})

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const startResponse = await api.get('/api/blogs')
    const startArr = startResponse.body
    const blogToDelete = startArr[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const endResponse = await api.get('/api/blogs')
    const endArr = endResponse.body

    expect(endArr.length).toBe(startArr.length - 1)

    const titles = endArr.map(el => el.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('updating a note', () => {
  test('succeeds with statu code 200 if edit succeeds', async () => {
    const startResponse = await api.get('/api/blogs')
    const startArr = startResponse.body
    const blogToModify = startArr[0]
    blogToModify.likes = 356

    await api
      .put(`/api/blogs/${blogToModify.id}`)
      .send(blogToModify)
      .expect(200)

    const endResponse = await api.get('/api/blogs')
    const endArr = endResponse.body

    expect(endArr[0].title).toBe(blogToModify.title)
    expect(endArr[0].likes).toBe(356)
  })
})
afterAll(() => {
  mongoose.connection.close()
})