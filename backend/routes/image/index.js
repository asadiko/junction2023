'use strict'

module.exports = async function (fastify, opts) {
    fastify.post('/', async function (req, res) {
        const prompt = req.body.prompt;
        const image = await fastify.gpt.gen_image(prompt)
        if (image) await res.send({
            url: image.data[0].url
        })
    })
}