const express = require('express')
const router = express.Router()

const routes_users = require('../routes/Users/Users.routes')
const routes_selections = require('../routes/Selections/Selections.routes')
const routes_tournaments = require('../routes/Tournaments/Tournaments.routes')

const protectedRoutes = express.Router()
//protectedRoutes.use(authMiddleware)

router.use(routes_users)
router.use(routes_selections)
router.use(routes_tournaments)

module.exports = router