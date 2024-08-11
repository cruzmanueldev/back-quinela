const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')
const port = 3001

const app = express()
app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
        credentials: true
    }
))


app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

app.use(fileUpload({
    createParentPath : true,
    useTempFiles: true,
}))

app.use(bodyParser.json({limit:'120mb'}))
app.use(bodyParser.urlencoded({ limit: '120mb', extended: true}))
app.use(express.json())

app.use('images/icons', express.static(path.join(__dirname, 'public/images/icons')))

const routes = require('./routes/index')
app.use(routes)

app.get('/', (req, res) => {
    res.send('Default request')
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
