const express = require('express')
const router = express.Router()

const ValAllUsers = require('../../Controllers/Validations/Users/AllUsers')
const ValCreateUser = require('../../Controllers/Validations/Users/CreateUser')
const ValEditUser = require('../../Controllers/Validations/Users/EditUser')

const ValPositionsUsers = require('../../Controllers/Validations/Users/PositionsUsers')

const protectedRoutes = express.Router()

protectedRoutes.post('/all', ValAllUsers.AllUsers)
protectedRoutes.post('/create', ValCreateUser.CreateUser)
protectedRoutes.post('/edit', ValEditUser.EditUser)
protectedRoutes.post('/ranking', ValPositionsUsers.PositionsUsers)

router.use('/users', protectedRoutes)

module.exports = router