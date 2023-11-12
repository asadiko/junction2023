'use strict'

module.exports = async function (fastify, opts) {
    fastify.post('/', async (req, res) => {

        // Get the GPT asnwer
        const prompt = req.body.prompt;
        const answer = await fastify.gpt.chat(prompt);

        if (answer) res.status(200)
        else res.status(400)
    })
}