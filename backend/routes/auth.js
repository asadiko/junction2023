// auth.js
const bcrypt = require('bcrypt')

async function authRoutes(fastify, options) {
    const usersCollection = fastify.mongo.db.collection('users')

    fastify.post('/register', async (request, reply) => {
        const {
            username,
            password
        } = request.body
        if (!username || !password) {
            reply.status(400).send({
                error: 'Username and password must be provided'
            })
            return
        }
        if (await usersCollection.findOne({
                username
            })) {
            reply.status(400).send({
                error: 'Username already taken'
            })
            return
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const result = await usersCollection.insertOne({
            username,
            password: hashedPassword
        })
        console.log(result)
        reply.status(201).send({
            status: 'OK'
        })
    })

    fastify.post('/login', async (request, reply) => {
        const {
            username,
            password
        } = request.body
        const user = await usersCollection.findOne({
            username
        })
        if (!user) {
            reply.status(400).send({
                error: 'Invalid username or password'
            })
            return
        }
        if (!await bcrypt.compare(password, user.password)) {
            reply.status(400).send({
                error: 'Invalid username or password'
            })
            return
        }
        const token = fastify.jwt.sign({
            id: user._id,
        })
        request.session.userId = user._id;
        reply.send({
            token
        })
    })

    fastify.post('/logout', async (request, reply) => {
        // In a real-world application, you might want to implement a token blacklist here
        reply.send({
            status: 'OK'
        })
    })
}

module.exports = authRoutes