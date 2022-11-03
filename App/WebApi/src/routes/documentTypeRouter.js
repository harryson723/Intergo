// variables para la ejecucion del servidor y sus procesos
const express = require("express");
const documentTypeRouter = express.Router();

// gestor de bases de datos
const {
    consultDB,
    insertDB,
    updateDB,
    deleteDB
} = require("../modules/operationsDB");

// consultar todos los tipos de documento
documentTypeRouter.get("/", (req, res) => {
    consultDB("SELECT * FROM tipoDocumento", res);
});

module.exports = documentTypeRouter;



