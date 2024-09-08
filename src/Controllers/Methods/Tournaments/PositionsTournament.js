const controller = {}
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

controller.PositionsTournament = async (req, res) => {

    const {
        tornid
    } = req.body

    let statusCode  = 200
    let response    = true
    let message     = 'Se han obtenido los torneos con exito'
    let data        = []

    try{

        const hasGroup = tornid == 1 ? true : false

        // const matches = await prisma.parpartidos.findMany({
        //     where : {
        //         tornid      : tornid,
        //     }
        // })

        if(hasGroup){

            let dataGroups = []

            const groups = await prisma.grugrupos.findMany({})

            const teams = await prisma.selselecciones.findMany({})

            groups.forEach(group => {
                dataGroups.push({
                    gruid       : group.gruid,
                    grunombre   : group.grunombre,
                    data        : []
                })
            });


            for await( const team of teams){
                const group = await prisma.parpartidos.findFirst({
                    where : {
                        tornid : 1,
                        OR : [
                            {
                                parlocal : team.selid
                            },
                            {
                                parvisita : team.selid
                            }
                        ]
                    }
                })

                const matches = await prisma.parpartidos.findMany({
                    where : {
                        OR : [
                            {
                                parlocal : team.selid
                            },
                            {
                                parvisita : team.selid
                            }
                        ],
                        tornid : tornid
                    }
                })

                team['pj'] = matches.filter(mat  => mat.parfinalizado == true).length
                team['pg'] = matches.filter(mat  => mat.parganador == team.selid).length
                team['pp'] = matches.filter(mat  => mat.parganador != team.selid && mat.parganador != null && mat.parfinalizado == true).length
                team['pe'] = team['pj'] - team['pg'] - team['pp']
                const ptsWin    = (matches.filter(mat  => mat.parganador == team.selid && mat.parfinalizado == true).length)*3
                const ptsDraw   = (matches.filter(mat  => mat.parganador == null && mat.parfinalizado == true).length)
                team['ptos'] = ptsWin + ptsDraw

                const gf = matches.reduce((acc, match) => {
                    if (match.parlocal === team.selid) {
                      return acc + match.pargoleslocal;
                    } else if (match.parvisita === team.selid) {
                        return acc + match.pargolesvisita;
                    }else{
                        return acc;
                    }
                }, 0);
    
                const gc = matches.reduce((acc, match) => {
                    if (match.parlocal === team.selid) {
                      return acc + match.pargolesvisita;
                    } else if (match.parvisita === team.selid) {
                        return acc + match.pargoleslocal;
                    }else{
                        return acc;
                    }
                }, 0);
                
                team['dg']   = gf+':'+gc
                team['dfg']  = gf - gc
                team['gf']   = gf - gc

                const indexGroup = dataGroups.findIndex(gro => gro.gruid == group.gruid)
                dataGroups[indexGroup]['data'].push(team)
            }

            dataGroups.forEach(data => {
                data.data.sort((a, b) => {
                    if (a.ptos !== b.ptos) {
                        return b.ptos - a.ptos;
                    } else {
                        if (a.dfg !== b.dfg) {
                            return b.dfg - a.dfg;
                        } else {
                            return b.gf - a.gf;
                        }
                    }
                });
            });

            data = dataGroups

        }else{
            const teams = await prisma.selselecciones.findMany({
                where : {
                    selconmebol : true
                }
            })
    
            for await( const tem of teams){
                const matches = await prisma.parpartidos.findMany({
                    where : {
                        OR : [
                            {
                                parlocal : tem.selid
                            },
                            {
                                parvisita : tem.selid
                            }
                        ],
                        tornid : tornid
                    }
                })
                tem['pj'] = matches.filter(mat  => mat.parfinalizado == true).length
                tem['pg'] = matches.filter(mat  => mat.parganador == tem.selid).length
                tem['pp'] = matches.filter(mat  => mat.parganador != tem.selid && mat.parganador != null && mat.parfinalizado == true).length

                tem['pe'] = tem['pj'] - tem['pg'] - tem['pp']
                const ptsWin    = (matches.filter(mat  => mat.parganador == tem.selid && mat.parfinalizado == true).length)*3
                const ptsDraw   = (matches.filter(mat  => mat.parganador == null && mat.parfinalizado == true).length)
                tem['ptos'] = ptsWin + ptsDraw

                if(tem.selid == 6){
                    tem['ptos'] = tem['ptos'] - 3
                }
                const gf = matches.reduce((acc, match) => {
                    if (match.parlocal === tem.selid) {
                      return acc + match.pargoleslocal;
                    } else if (match.parvisita === tem.selid) {
                        return acc + match.pargolesvisita;
                    }else{
                        return acc;
                    }
                }, 0);
    
                const gc = matches.reduce((acc, match) => {
                    if (match.parlocal === tem.selid) {
                      return acc + match.pargolesvisita;
                    } else if (match.parvisita === tem.selid) {
                        return acc + match.pargoleslocal;
                    }else{
                        return acc;
                    }
                }, 0);
                
                tem['dg']   = gf+':'+gc
                tem['dfg']  = gf - gc
                tem['gf']   = gf - gc
    
                tem['lastMatches'] = await prisma.parpartidos.findMany({
                    where : {
                        tornid : tornid,
                        OR : [
                            {
                                parlocal : tem.selid,
                            },
                            {
                                parvisita : tem.selid
                            }
                        ],
                        parfinalizado : true
                    },
                    select : {
                        pargoleslocal : true,
                        pargolesvisita : true,
                        parganador : true,
                        parlocalsel : {
                            select : {
                                selabreviacion : true,
                                selimagen : true
                            }
                        },
                        parvisitasel : {
                            select : {
                                selabreviacion : true,
                                selimagen : true
                            }
                        }
                    },
                    orderBy : [{ partid : 'desc' }],
                    take : 3
                })
                tem['nextMatch'] = await prisma.parpartidos.findFirst({
                    where : {
                        tornid : tornid,
                        OR : [
                            {
                                parlocal : tem.selid,
                            },
                            {
                                parvisita : tem.selid
                            }
                        ],
                        parfinalizado : false
                    },
                    select : {
                        fecid : true,
                        parlocalsel : {
                            select : {
                                selabreviacion : true,
                                selimagen : true
                            }
                        },
                        parvisitasel : {
                            select : {
                                selabreviacion : true,
                                selimagen : true
                            }
                        }
                    },
                    orderBy : [{ partid : 'asc' }],
                })
            }
    
            teams.sort((a, b) => {
                if (a.ptos !== b.ptos) {
                    return b.ptos - a.ptos;
                } else {
                    if (a.dfg !== b.dfg) {
                        return b.dfg - a.dfg;
                    } else {
                        return b.gf - a.gf;
                    }
                }
            });
            data = teams

        }

    }catch(err){
        statusCode  = 500
        response    = false
        message     = 'Ha ocurrido un error al obtener la tabla de posiciones'
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
