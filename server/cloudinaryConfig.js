const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dppn7c2ef',
  api_key: '736163249684689',
  api_secret: 'moCmIBKfuKpKQj8fBYhfs-FCZaE'
});

//test upload image in cloudinary server
cloudinary.uploader.upload('./testpic.jpg', (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result);
    }
  });

module.exports = cloudinary;