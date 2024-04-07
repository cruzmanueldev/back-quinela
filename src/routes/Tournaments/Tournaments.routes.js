const express = require('express')
const router = express.Router()

const ValAllTournaments = require('../../Controllers/Validations/Tournaments/AllTournaments')

const protectedRoutes = express.Router()

protectedRoutes.post('/all', ValAllTournaments.AllTournaments)

router.use('/tournaments', protectedRoutes)

module.exports = router