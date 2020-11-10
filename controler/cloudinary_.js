const cloudinary = require('cloudinary')
const _ = require('lodash');
const Q = require("q")

//config
cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_UPLOAD_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_UPLOAD_SECRET
})

exports.upload = (file) => {
  console.log('exports.upload', file);
  return new Q.Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(file, {use_filename: true, resource_type: "auto"}, (err, res) => {
            if (err) {
                //console.log('cloudinary err:', err);
                reject(err);
            } else {
                console.log('cloudinary res:', res);
                return resolve(
                  res.secure_url
                );
            }
        });
    });
}
