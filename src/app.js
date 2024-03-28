const express = require('express')
const app = express()
const port = 3000

const routes = require('./routes/index')

app.use(routes)

app.get('/', (req, res) => {
    res.send('Default request')
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
