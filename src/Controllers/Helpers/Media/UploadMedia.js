const controller = {}
const cloudinary = require('../../../config')

controller.UploadMedia = async (file) => {

    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };
  
    try {

        const result = await cloudinary.uploader.upload(file, options);
        return { response : true, id :result.public_id };
    } catch (error) {
        console.error(error);
        return { response : false }
    }
}

module.exports = controller