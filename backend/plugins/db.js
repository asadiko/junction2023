const fp = require('fastify-plugin')

const url = process.env.URL


module.exports = fp(async function (fastify, opts) {
    fastify.register(require('@fastify/mongodb'), {
        url: url
    })

    fastify.addHook('onReady', async () => {
        console.log('Mongo is connected')
        fastify.mongo.db = 'junction'
    })
})