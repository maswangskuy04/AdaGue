const dns = require('dns')
require('dotenv').config()
const http = require('http')
const app = require('./app')
const sequelize = require('./config/db')
const { Server } = require('socket.io')
const initSocket = require('./socket')

const PORT = process.env.PORT || 5000

dns.setServers([
    '8.8.8.8',
    '1.1.1.1'
])
dns.setDefaultResultOrder('ipv4first')

const allowedOrigins = [
    'http://localhost:5173',
    'https://ada-gue.vercel.app'
]

async function start() {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        const server = http.createServer(app)
        const io = new Server(server, {
            cors: {
                origin: allowedOrigins,
                credentials: true
            }
        })

        initSocket(io)
    
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (err) {
        console.error('Server failed: ', err)
    }
}

start()