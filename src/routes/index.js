const express = require('express')
const router = express.Router()

const routes_users = require('../routes/Users/Users.routes')
const routes_selections = require('../routes/Selections/Selections.routes')
const routes_tournaments = require('../routes/Tournaments/Tournaments.routes')
const routes_matches = require('../routes/Matches/Matches.routes')
const routes_auth = require('../routes/Auth/Auth.routes')
const quinela_auth = require('../routes/Quinela/Quinela.routes')


const protectedRoutes = express.Router()
//protectedRoutes.use(authMiddleware)

router.use(routes_users)
router.use(routes_selections)
router.use(routes_tournaments)
router.use(routes_matches)
router.use(routes_auth)
router.use(quinela_auth)

module.exports = router