const express = require('express')
const cors = require('cors')
const { createServer } = require('http')
const socketSetup = require('./socket')
const app = express()
const server = createServer(app)
const URL = process.env.BASE_URL || 'http://localhost:3000'

app.use(express.json())
app.use(cors({
    origin: [URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}))

app.get('/', (req, res) => { })

const PORT = 8080
server.listen(PORT, () => { })

socketSetup(server)