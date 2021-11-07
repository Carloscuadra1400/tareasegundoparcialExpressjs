import './loadEnv.js'
import express from 'express'
import router from './routes/routes.js'
import cookieParser from 'cookie-parser'


const PORT =  11000

const app = express()

app.set('view engine', 'pug')

app.use(express.static('public'))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(cookieParser())

app.use('/', router)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
