import express from 'express'
import model from './model.js'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const corsOptions = {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the necessary HTTP methods
    credentials: true, // Allow cookies or authorization headers
}

const app = express()
const port = 3000

app.use(cors(corsOptions))

app.get('/', (req, res) => {
    console.log('Received GET request at /')
    res.send('Hello World!')
})

app.get('/translate', async(req, res) => {
    console.log('Received GET request at /translate')
    try {
        const {from, to, text} = req.query
        console.log('Request parameters:', {from, to, text})
        const result = await model.translate({from, to, text})
        console.log('Translation result:', result)
        res.json(result)
    } catch (error) {
        console.error('Error during translation:', error)
        app.send(error.message)
    }
})

app.get('/detect', (req, res) => {
    console.log('Received GET request at /detect')
    const {text} = req.query
    console.log('Request parameter:', {text})
    model.detectLanguage(text).then((result) => {
        console.log('Detection result:', result)
        res.send(result)
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})