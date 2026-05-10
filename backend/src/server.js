const http = require('http')
const app = require('./app')
const sequelize = require('./config/db')
const { Server } = require('socket.io')
const initSocket = require('./socket')

async function start() {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        const server = http.createServer(app)
        const io = new Server(server, {
            cors: {
                origin: '*',
                credentials: true
            }
        })

        initSocket(io)
    
        server.listen(process.env.PORT_SERVER, '0.0.0.0', () => {
            console.log(`Server running on http://0.0.0.0:${process.env.PORT_SERVER}`)
        })
    } catch (err) {
        console.error(err)
    }
}

start()