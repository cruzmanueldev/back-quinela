const express = require('express')
const router = express.Router()



const ValCreateSelection = require('../../Controllers/Validations/Selections/CreateSelection')

const protectedRoutes = express.Router()

protectedRoutes.post('/create', ValCreateSelection.CreateSelection)

router.use('/selections', protectedRoutes)

module.exports = router