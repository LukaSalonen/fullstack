const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

const initialUsers = [
    {
        username: "Bob",
        name: "Bob Boberson",
        password: "bobisbob"
    },
    {
        username: "Mario",
        name: "Mario Plumberman",
        password: "luigiisbro"
    }
]

beforeEach(async () => {
    await User.deleteMany({})
    console.log('cleared')
  
    await api
        .post('/api/users')
        .send(initialUsers[0])

    await api
        .post('/api/users')
        .send(initialUsers[1])
})

describe('request must have correct fields in the correct format', () => {
    test('adding users with post works', async () => {
        const newUser = {
            username: "Hahaa",
            name: "Jasum Jakutsiks",
            password: "lehma"
        }
        await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('content-type', /application\/json/)

        const response = await api.get('/api/users')
  
        const usernames = response.body.map(el => el.username)
      
        expect(response.body.length).toBe(initialUsers.length + 1)
        expect(usernames).toContain(
          'Hahaa')

    })
    test('request must contain username', async () => {
        const newUser = {
            name: "Jasum Jakutsiks",
            password: "lehash"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const response = await api.get('/api/users')
        expect(response.body.length).toBe(initialUsers.length)
    })
    test('request must contain password', async () => {
        const newUser = {
            username: "Mykraine",
            name: "Putin, Vladimir"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const response = await api.get('/api/users')
        expect(response.body.length).toBe(initialUsers.length)
    })
    test('password must be longer than 3 characters', async () => {
        const newUser = {
            username: "Hahaa",
            name: "Jasum Jakutsiks",
            password: "le"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const response = await api.get('/api/users')
        expect(response.body.length).toBe(initialUsers.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
  })

