const controller = {}
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

controller.GetHistoryUser = async (req, res) => {

    const {
        req_usuid,
        req_tornid
    } = req.body

    let data = []
    let statusCode  = 200
    let response    = true
    let message     = 'Se ha obtenido el historial con exito'

    try{

        data = await prisma.pruprediccionusuarios.findMany({
            where : {
                usuid : req_usuid,
                pruparpartidos : {
                    parfinalizado   : true,
                    tornid : req_tornid
                }
            },
            select : {
                prugoleslocal   : true,
                prugolesvisita  : true,
                pruganador      : true,
                pruparpartidos : {
                    select : {
                        pargoleslocal   : true,
                        pargolesvisita  : true,
                        parganador      : true,
                        parlocal        : true,
                        parvisita       : true,
                        parlocalsel : {
                            select : {
                                selimagen   : true,
                                selabreviacion : true
                            }
                        },
                        parvisitasel : {
                            select : {
                                selimagen   : true, 
                                selabreviacion : true
                            }
                        },
                        parfecid : {
                            select : {
                                fecnombre : true
                            }
                        }
                    }
                }
            }
        })

        data.forEach(dat => {
            if(dat.pruparpartidos.parlocal == dat.pruparpartidos.parganador){
                dat['parganador'] = 1
            }else if(dat.pruparpartidos.parvisita == dat.pruparpartidos.parganador){
                dat['parganador'] = 2
            }else{
                dat['parganador'] = 0
            }
        });

    }catch(err){
        statusCode  = 500
        response    = false
        message     = 'Ha ocurrido un error al obtener el historial'
        console.log(err)
    }finally{
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