'use strict'

const path = require('node:path')
const AutoLoad = require('@fastify/autoload')
const fastifySession = require('@fastify/session');
const fastifyCookie = require('@fastify/cookie');




// Pass --options via CLI arguments in command to enable these options.
const options = {}

module.exports = async function (fastify, opts) {
    // Place here your custom code!
    fastify.register(require('@fastify/auth'))
    fastify.register(require('@fastify/jwt'), {
        secret: '2find'
    })
    fastify.register(fastifyCookie);
    fastify.register(fastifySession, {
        secret: 'a secret with minimum length of 32 characters'
    });

    // fastify.register(authRoutes)

    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'plugins'),
        options: Object.assign({}, opts)
    })

    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'routes'),
        options: Object.assign({}, opts)
    })
}

module.exports.options = options