const OpenAI = require('openai');
const fp = require('fastify-plugin')

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const task = (style, name, color) => {
    return {
        role: 'system',
        content: `
    Your task is to assist in creating a website using only JavaScript, React, HTML, and CSS.You are only providing the code and following all the rules mentioned below.The website should be designed in a brutalist style.Here are the specific requirements:

        1. Code Organization:
        -When creating new files, use the key“ NEW FILE: [filename]” followed by the code. -
        When modifying existing files, use the key“ MODIFY FILE: [filename]” followed by the updated code.

    2. ${style} Design:
        -Ensure that the site 's design adheres to ${style} web design principles. As primary color use ${color}.

    3. Placeholder Images:
        -Use placeholder images from free APIs.Each image should have a unique ID. -
        Apply the same concept to all text blocks, assigning each a unique ID.

    4. Final Documentation:
        -At the end of the document, provide a JSON - formatted list of all elements(images, text blocks) with their respective IDs and types.Format should be“ JSON: {
            list of elements with IDs and types
        }”.
    5. Name of the project: ${name}

    Remember, the focus is on adhering strictly to the specified technologies and the style, with clear organization and documentation of code and elements.
            `
    }
}

const gen_image = async (prompt, style) => {

    console.log('Generating image')

    try {

        return response = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        });
    } catch (e) {
        console.log(e.message)
    }

}


const chat = async (message) => {

    console.log('Chatting')

    console.log(message)

    let messages = [];

    messages.push(task)
    messages.push({
        role: 'user',
        content: message
    })

    try {
        return response = await openai.chat.completions.create({
            model: "gpt-4-1106-preview",
            messages: messages,
            temperature: 1,
            max_tokens: 4096,
        })
    } catch (e) {
        console.log(e.message)
        // console.log(messages)
    }


}

module.exports = fp(async function (fastify, opts) {
    fastify.decorate('gpt', {
        chat,
        gen_image
    })
});