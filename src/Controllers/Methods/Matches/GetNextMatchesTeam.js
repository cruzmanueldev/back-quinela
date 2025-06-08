const controller = {}
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

controller.GetNextMatchesTeam = async (req, res) => {

  const {
    req_selid,
    req_tornid
  } = req.body

  let data = []
  let statusCode = 200
  let response = true
  let message = 'La data se ha obtenido con exito'

  try {

    data = await prisma.parpartidos.findMany({
      where: {
        tornid: req_tornid,
        OR: [
          {
            parlocal: req_selid,
          },
          {
            parvisita: req_selid
          }
        ],
        parfinalizado: false
      },
      select: {
        parfecid: {
          select: {
            fecnombre: true,
          }
        },
        parfecha: true,
        parlocalsel: {
          select: {
            selid: true,
            selnombre: true,
            selimagen: true,
            selabreviacion: true
          }
        },
        parvisitasel: {
          select: {
            selid: true,
            selnombre: true,
            selimagen: true,
            selabreviacion: true
          }
        },
      }
    })

  } catch (err) {
    console.log(err)
    return res.status(500)
      .json({
        response: false,
        message: 'Ha ocurrido un error al obtener los siguientes partidos'
      })
  } finally {
    await prisma.$disconnect()
    res.status(statusCode)
      .json({
        response,
        message,
        data
      })
  }
}

module.exports = controller
