const express = require('express')
const router = express.Router()



const ValCreateSelection = require('../../Controllers/Validations/Selections/CreateSelection')
const ValGetSelections = require('../../Controllers/Validations/Selections/GetSelections')

const protectedRoutes = express.Router()

protectedRoutes.post('/create', ValCreateSelection.CreateSelection)
protectedRoutes.post('/all', ValGetSelections.GetSelections)


router.use('/selections', protectedRoutes)

module.exports = router