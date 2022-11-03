// almacenar la imagen
const multer = require('multer');

const storage = multer.diskStorage({
    destination: "public/img/studentsImg", 
});

const upload = multer({ storage });

module.exports = upload;
