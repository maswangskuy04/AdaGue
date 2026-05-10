require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

const authRoutes = require('./routes/authRoute')
const userRoutes = require('./routes/userRoute')
const chatRoutes = require('./routes/chatRoute')
const matchRoutes = require('./routes/matchRoute')

const allowedOrigins = [
    'https://ada-gue.vercel.app'
]

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', (req, res) => {
    res.send('API running...')
})
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/match', matchRoutes)

app.use((err, req, res, next) => {
    console.error(err)

    const status = err.status || 500
    const message = err.message

    res.status(status).json({
        message
    })
})

module.exports = app