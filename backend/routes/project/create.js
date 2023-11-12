const fastify = require("fastify")

const create = async (data) => {
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

module.exports = create