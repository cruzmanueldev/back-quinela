const controller = {}
const UploadCloudinaryController = require('../../Helpers/Media/UploadMedia')
const fs = require('fs');

controller.CreateSelection = async (req, res) => {

    const {
        req_file
    } = req.files

    let statusCode  = 200
    let response    = true
    let message     = 'La seleccion se ha creado con exito'

    try{

        const id_file = await UploadCloudinaryController.UploadMedia(req_file.tempFilePath)

        fs.unlink(req_file.tempFilePath, err => {
            if (err) {
                console.error('Error al eliminar el archivo temporal:', err);
            }
        });

    }catch(err){
        statusCode  = 500
        response    = false
        message     = 'Ha ocurrido un error al crear la seleccion'
        console.log(err)
    }finally{
        res.status(statusCode)
            .json({
                response,
                message
            })
    }
}

module.exports = controller