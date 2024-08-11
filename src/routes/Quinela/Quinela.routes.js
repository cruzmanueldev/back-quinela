const express = require('express')
const router = express.Router()



const ValEditQuinela = require('../../Controllers/Validations/Quinela/EditQuinela')
const ValGetStatistics = require('../../Controllers/Validations/Quinela/GetStatistics')
const ValCloseQuinela = require('../../Controllers/Validations/Quinela/CloseQuinela')
const ValGetHistoryUser = require('../../Controllers/Validations/Quinela/GetHistoryUser')

const protectedRoutes = express.Router()

protectedRoutes.post('/edit-quinela', ValEditQuinela.EditQuinela)
protectedRoutes.post('/statistics-quinela', ValGetStatistics.GetStatistics)
protectedRoutes.post('/close-match', ValCloseQuinela.CloseQuinela)
protectedRoutes.post('/history-user', ValGetHistoryUser.GetHistoryUser)


router.use('/quinela', protectedRoutes)

module.exports = router