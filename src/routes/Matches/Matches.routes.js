const express = require('express')
const router = express.Router()



const ValGetMatches = require('../../Controllers/Validations/Matches/GetMatches')
const ValGetLastMatches = require('../../Controllers/Validations/Matches/GetLastMatches')


const protectedRoutes = express.Router()

protectedRoutes.post('/all', ValGetMatches.GetMatches)
protectedRoutes.post('/last-matches', ValGetLastMatches.GetLastMatches)


router.use('/matches', protectedRoutes)

module.exports = router