const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname == "profileImg") {
            cb(null,path.join(__dirname, '../uploads/images'))
        }
        else if (file.fieldname == "cv") {
            cb(null,path.join(__dirname, '../uploads/CV'))
        }else if (file.fieldname === "projectImg") {
            cb(null, path.join(__dirname, '../uploads/projectsImg'));
        }else {
            cb(new error('invalid File Field'))
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    }
})

module.exports = multer({storage});
