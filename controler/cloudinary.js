const cloudinary = require('cloudinary')
//config
cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_UPLOAD_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_UPLOAD_SECRET
})

exports.upload = async (req, res) => {
  let result = await cloudinary.v2.uploader.upload(req.body.image, {
    use_filename: true,
    public_id: `${Date.now()}`,
    resource_type: "auto",
    unique_filename: false,
    eager: [
    { width: 300 },
    { width: 768} ]
  });
  //console.log(result);
  res.json({
    public_id: result.public_id,
    url: result.secure_url,
    url_mobile: result.eager[0].secure_url,
    url_ipad: result.eager[1].secure_url,
  });
};

exports.remove = (req, res) => {
  let image_id = req.body.public_id;
  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return res.json({ success: false, err });
    res.send("ok");
  });
};
