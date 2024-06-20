const express = require('express')
const router = express.Router()



const ValEditQuinela = require('../../Controllers/Validations/Quinela/EditQuinela')
const ValGetStatistics = require('../../Controllers/Validations/Quinela/GetStatistics')


const protectedRoutes = express.Router()

protectedRoutes.post('/edit-quinela', ValEditQuinela.EditQuinela)
protectedRoutes.post('/statistics-quinela', ValGetStatistics.GetStatistics)

router.use('/quinela', protectedRoutes)

module.exports = router