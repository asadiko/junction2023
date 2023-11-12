'use strict'

// const create = require('./create')



module.exports = async function (fastify, opts) {

    const create = async (data) => {
        console.log('Starting project creation')
        const appPath = await fastify.project.create(data.name);
        const code = await fastify.gpt.chat(data.prompt, data.style, data.name);

        if (code.choices[0].text.includes('NEW FILE:')) {
            const filename = code.choices[0].text.split(':')[1];
            const code = await fastify.gpt.gen_image(data.prompt, data.style);
            await fs.writeFile(`${appPath}/${filename}`, code.data.image);
        }
        if (code.choices[0].text.includes('MODIFY FILE:')) {
            const filename = code.choices[0].text.split(':')[1];
            const code = await fastify.gpt.gen_image(data.prompt, data.style);
            await fs.writeFile(`${appPath}/${filename}`, code.data.image);
        }

        return await fastify.project.run(appPath, data.name);
    }

    const projectCollection = fastify.mongo.db.collection('projects')
    fastify.get('/', async function (request, reply) {
        return 'these are projects'
    })

    fastify.post('/create', async function (req, res) {

        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = fastify.jwt.verify(token);
            const userId = decoded.id;

            const {
                name
            } = req.body;

            if (await projectCollection.findOne({
                    name
                })) {
                res.status(400).send({
                    error: 'Project already exists'
                })
            }



            // const link = await create(req.body);
            const link = await fastify.project.create(name);

            if (link) {
                await projectCollection.insertOne({
                    name,
                    userId: userId,
                })
            }

            if (link) res.send({
                link: link
            })
            else res.status(400).send({
                error: 'Could not create project'
            })
        } catch (err) {
            console.log(err)
            res.status(401).send({
                error: err.message
            });
        }


    })
}