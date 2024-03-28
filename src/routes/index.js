const express = require('express')
const router = express.Router()

const routes_users = require('../routes/Users/Users.routes')

const protectedRoutes = express.Router()
//protectedRoutes.use(authMiddleware)

router.use(routes_users)

module.exports = router