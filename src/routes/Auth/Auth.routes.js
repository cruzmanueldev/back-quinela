const express = require('express')
const router = express.Router()

const ValLoginUser = require('../../Controllers/Validations/Auth/LoginUser')
const ValValidateUser = require('../../Controllers/Validations/Auth/ValidateUser')


const protectedRoutes = express.Router()

protectedRoutes.post('/login', ValLoginUser.LoginUser)
protectedRoutes.post('/validate-user', ValValidateUser.ValidateUser)

router.use('/auth', protectedRoutes)

module.exports = router