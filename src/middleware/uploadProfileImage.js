const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, req.body.email+"profile-image"+path.extname(file.originalname));
    },
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname,'../data/images'));
    }

});

const upload = multer({storage:storage});
module.exports = upload;