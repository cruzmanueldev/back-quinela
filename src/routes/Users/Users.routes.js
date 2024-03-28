const express = require('express')
const router = express.Router()

const ValAllUsers = require('../../Controllers/Validations/Users/AllUsers')
const ValCreateUser = require('../../Controllers/Validations/Users/CreateUser')

const protectedRoutes = express.Router()

protectedRoutes.post('/all', ValAllUsers.AllUsers)
protectedRoutes.post('/create', ValCreateUser.CreateUser)

router.use('/users', protectedRoutes)

module.exports = router