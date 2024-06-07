const express = require('express')
const router = express.Router()



const ValEditQuinela = require('../../Controllers/Validations/Quinela/EditQuinela')

const protectedRoutes = express.Router()

protectedRoutes.post('/edit-quinela', ValEditQuinela.EditQuinela)


router.use('/quinela', protectedRoutes)

module.exports = router