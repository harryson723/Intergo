// variables para la ejecucion del servidor y sus procesos
const express = require("express");
const infoRouter = express.Router();

// gestor de bases de datos
const {
    consultDB,
    insertDB,
    updateDB,
    deleteDB
} = require("../modules/operationsDB");

// consultar todos los tipos de documento
infoRouter.get("/getInfoById/:id", (req, res) => {
    consultDB(`SELECT * FROM infocontacto WHERE FK_NIT = '${req.params.id}'`, res);
});


infoRouter.post('/insertInfo', (req, res) => {
    if(req.body) {
        let {
            NIT,
            correo,
            telefono
        } = req.body;
        let data = [correo, telefono, NIT];
        let query = "INSERT INTO infocontacto(correo, telefono, FK_NIT) VALUES" +
            " (?, ?, ?)";
        insertDB(query, data, res);
    } else  res.sendStatus(400);
});

infoRouter.put("/updateInfo", (req, res) => {
    if (req.body) {
        let {
            NIT,
            correo,
            telefono
        } = req.body;
        let data = [correo, telefono, NIT];
        let query = "UPDATE infocontacto SET correo=?, telefono=? WHERE FK_NIT = ?";
        updateDB(query, data, res);
    } else {
        res.sendStatus(400);
    }
});

module.exports = infoRouter;