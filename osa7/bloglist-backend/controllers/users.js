const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body

        if (!body.password) {
            response.status(400).send({ error: "Request must contain password"})
        }

        if (body.password.length < 3) {
            response.status(400).send({ error: "Password must be at least 3 characters long"})
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })

        const savedUser = await user.save()
        response.status(201).json(savedUser)


    } catch (exception) {
        next(exception)
    } 
})

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({}).populate('blogs', {title: 1, author: 1, url:1, likes: 1})

        response.json(users.map(u => u.toJSON()))
    } catch (exception) {
        next(exception)
    }
})

module.exports = usersRouter
