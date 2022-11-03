// variables para la ejecucion del servidor y sus procesos
const express = require("express");
const bussinesRouter = require("./routes/bussinesRouter");
const clientRouter = require("./routes/clientRouter");
const documentTypeRouter = require("./routes/documentTypeRouter");
const app = express();
const cors = require("cors");
const config = require("./config/config");
const jobsRouter = require("./routes/jobsRouter");
const path = require('path');
const skillsRouter = require("./routes/skillsRouter");
const infoRouter = require("./routes/infoRouter");
const ubicationRouter = require("./routes/ubicationRouter");
// sistema festor de archivos
const fileUpload = require('express-fileupload');
const socialMediaRouter = require("./routes/socialMediaRouter");
const vacantesRouter = require("./routes/vacantesRouter");
const conveniosRouter = require("./routes/conveniosRouter");


app.use(fileUpload())

app.use(cors(
    config.application.cors.server
));

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// rutas del sitio
app.use("/students", clientRouter);
app.use("/bussines", bussinesRouter);
app.use("/documentType", documentTypeRouter);
app.use("/jobs", jobsRouter);
app.use("/skills", skillsRouter);
app.use("/infoBussines", infoRouter);
app.use("/ubications", ubicationRouter);
app.use("/socialMedia", socialMediaRouter);
app.use("/vacantes", vacantesRouter);
app.use("/convenios", conveniosRouter);

// variables de entorno para la ejecucion
const PORT = process.env.PORT || 3500;

// encender el servidor en el puerto 3000 o el que de el provider
app.listen(PORT, () => {
    console.log("Escuchando");
});


