// variables para la ejecucion del servidor y sus procesos
const express = require("express");
const vacantesRouter = express.Router();

// gestor de bases de datos
const {
    consultDB,
    insertDB,
    updateDB,
    deleteDB
} = require("../modules/operationsDB");
const upload = require("../modules/uploadImg");

// conseguir todos las vacante en la base de datos
vacantesRouter.get("/getVacantes", (req, res) => {
    consultDB("SELECT * FROM vacantes", res);
});

// conseguir una vacante
vacantesRouter.get("/getVacanteById/:id", (req, res) => {
    consultDB(`SELECT * FROM vacantes where idVacante = ${req.params.id}`, res);
});

// conseguir todas las vacantes de una empresa
vacantesRouter.get("/getVacanteByBussines/:NIT", (req, res) => {
    consultDB(`SELECT * FROM vacantes where FK_NIT = ${req.params.NIT}`, res);
});


// insertar clientes en la base de datos
vacantesRouter.post("/insertVacante", (req, res) => {
    if (req.body) {
        let {
            nombre,
            descripcion,
            fecha,
            plazas,
            NIT,
        } = req.body;
        let query = "INSERT INTO vacantes( nombre, descripcion, fecha, plazas, FK_NIT) VALUES (?, ?, ?, ?, ?)";
        let data = [nombre, descripcion, fecha, plazas, NIT];
        insertDB(query, data, res);
    } else {
        res.sendStatus(400);
    }

});

vacantesRouter.put("/updateStudent", (req, res) => {
    if (req.body) {
        let {
            idEstudiante,
            hojaDeVida,
            descripcion,
            foto,
        } = req.body;
        let query = "UPDATE estudinates SET hojaDevida=?, foto=?, descripcion=? WHERE idEstudiante = ?";
        let data = [hojaDeVida, foto, descripcion, idEstudiante];
        updateDB(query, data, res);
    } else {
        res.sendStatus(400);
    }
});


// eliminar un cliente
vacantesRouter.delete("/deleteVacante/:id", (req, res) => {
    let query = "DELETE FROM vacantes WHERE idVacante = ?";
    let data = req.params.id;
    deleteDB(query, data);
    res.send("Eliminado con exito");
});

module.exports = vacantesRouter;