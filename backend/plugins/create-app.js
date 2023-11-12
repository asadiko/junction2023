const fp = require('fastify-plugin')
const fs = require('fs').promises;
const {
    exec: execCallback
} = require('child_process')
const {
    promisify
} = require('util')
const path = require('node:path')
const net = require('net')
const exec = promisify(execCallback)
let getPort;

import('get-port').then((module) => {
    getPort = module.default;
});

const randomPort = async () => {
    const port = await getPort()
    if (await checkPort(port)) {
        return port
    } else {
        randomPort();
    }
}

const checkPort = (port) => {
    return new Promise((resolve, reject) => {
        const server = net.createServer()
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                resolve(false)
            } else {
                reject(err)
            }
        })
        server.on('listening', () => {
            server.close()
            resolve(true)
        })
        server.listen(port)
    })
}

const create = async (name) => {
    name = name.split(' ').join('-');

    console.log('Creating app ' + name)

    const appPath = path.join(__dirname, '../../apps')
    console.log(appPath)
    const {
        stdout,
        stderr
    } = await exec(`cd ${appPath} && npx create-vite@latest ${name} --template react`);
    console.log(stdout)
    console.log(stderr)


    await exec(`cd ${appPath + '/' + name} && npm install`)

    return appPath + '/' + name
}

const run = async (appPath, name) => {
    console.log('Starting app' + name)
    try {
        const port = await randomPort();

        // Read vite.config.js
        const configPath = `${appPath}/vite.config.js`;
        let config = await fs.readFile(configPath, 'utf8');

        // Split the config into lines
        const lines = config.split('\n');

        // Find the line with "plugins: [react()],"
        const pluginLineIndex = lines.findIndex(line => line.includes('plugins: [react()],'));

        // Add the server configuration after the line
        const serverConfig = `  server: { port: ${port} },`;
        lines.splice(pluginLineIndex + 1, 0, serverConfig);

        // Join the lines back into a string
        config = lines.join('\n');

        // Write the file back
        await fs.writeFile(configPath, config);

        const {
            stdout,
            stderr
        } = await exec(`cd ${appPath} && pm2 start npm --name "${name}" -- run dev`)
        console.log(stdout)
        console.log(stderr)
        return {
            link: `http://localhost:${port}`
        }
    } catch (e) {
        console.log(e.message)
        return false
    }
}



module.exports = fp(async function (fastify, opts) {
    fastify.decorate('project', {
        create,
        run
    })
})