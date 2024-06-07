const express = require('express')
const router = express.Router()

const ValAllTournaments = require('../../Controllers/Validations/Tournaments/AllTournaments')
const ValPositionsTournament = require('../../Controllers/Validations/Tournaments/PositionsTournament')


const protectedRoutes = express.Router()

protectedRoutes.post('/all', ValAllTournaments.AllTournaments)
protectedRoutes.post('/positions', ValPositionsTournament.PositionsTournament)

router.use('/tournaments', protectedRoutes)

module.exports = router