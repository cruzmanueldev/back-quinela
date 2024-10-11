const express = require('express')
const router = express.Router()



const ValGetMatches = require('../../Controllers/Validations/Matches/GetMatches')
const ValGetLastMatches = require('../../Controllers/Validations/Matches/GetLastMatches')

const ValGetNextMatches = require('../../Controllers/Validations/Matches/GetNextMatches')

const ValGetNextMatchesTeam = require('../../Controllers/Validations/Matches/GetNextMatchesTeam')

const ValGetAllMatches = require('../../Controllers/Validations/Matches/GetAllMatches')
const ValGetDataPrediction = require('../../Controllers/Validations/Matches/GetDataPrediction')


const ValDisableMatch = require('../../Controllers/Validations/Matches/DisableMatch')


const protectedRoutes = express.Router()

protectedRoutes.post('/data-prediction', ValGetDataPrediction.GetDataPrediction)

protectedRoutes.post('/all', ValGetMatches.GetMatches)
protectedRoutes.post('/last-matches', ValGetLastMatches.GetLastMatches)
protectedRoutes.post('/next-matches-team', ValGetNextMatchesTeam.GetNextMatchesTeam)
protectedRoutes.post('/next-matches', ValGetNextMatches.GetNextMatches)
protectedRoutes.post('/disable-match', ValDisableMatch.DisableMatch)

protectedRoutes.post('/all-matches', ValGetAllMatches.GetAllMatches)

router.use('/matches', protectedRoutes)

module.exports = router