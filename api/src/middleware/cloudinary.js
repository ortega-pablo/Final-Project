const cloudinary = require("cloudinary")


cloudinary.config({ 
    cloud_name: 'proyectofinalhenry', 
    api_key: '641248373572491', 
    api_secret: 'nb4S905I_l-RGity9hUJE7tImUk' 
  });

exports.uploads = (file,folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file,(result) => {
            resolve({
                url: result.url,
                id: result.public_id
            })
        },{
            resource_type: "auto",
            folder: folder
        })
    })
}