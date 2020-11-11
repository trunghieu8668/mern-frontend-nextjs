require('dotenv').config();
const Image = require('next-images')
module.exports = Image({
  loader: 'cloudinary'
});
