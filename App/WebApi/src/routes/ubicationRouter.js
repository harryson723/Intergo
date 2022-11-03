// variables para la ejecucion del servidor y sus procesos
const express = require("express");
const ubicationRouter = express.Router();

// gestor de bases de datos
const {
    consultDB,
    insertDB,
    updateDB,
    deleteDB
} = require("../modules/operationsDB");

// consultar un departamento por id
ubicationRouter.get("/getDepartamentoById/:id", (req, res) => {
    consultDB(`SELECT * FROM departamentos WHERE idDepartamento = '${req.params.id}'`, res);
});

// consultar todos los departamentos
ubicationRouter.get("/getDepartamentos", (req, res) => {
    consultDB("SELECT * FROM departamentos", res);
});

// consultar todos los municipios por departamento
ubicationRouter.get("/getMunicipios/:id", (req, res) => {
    consultDB(`SELECT * FROM municipios WHERE FK_idDepartamento = ${req.params.id}`, res);
});

// consultar un municipio por id
ubicationRouter.get("/getMunicipioById/:id", (req, res) => {
    consultDB(`SELECT * FROM municipios WHERE idMunicipio = '${req.params.id}'`, res);
});

// consultar un municipio por id
ubicationRouter.get("/getUbicationById/:id", (req, res) => {
    consultDB(`SELECT * FROM ubicaciones WHERE idUbicacion = '${req.params.id}'`, res);
});

ubicationRouter.post('/insertUbication', (req, res) => {
    if(req.body) {
        let {
            id,
            direccion,
            municipio
        } = req.body;
        let data = [id, direccion, direccion, municipio];
        let query = "INSERT INTO ubicaciones(idUbicacion, descripcionDetallada, descripcion, FK_idMunicipio) VALUES" +
            " (?, ?, ?, ?)";
        insertDB(query, data, res);
    } else  res.sendStatus(400);
});

ubicationRouter.put("/updateUbication", (req, res) => {
    if (req.body) {
        let {
            direccion,
            municipio,
            id,
        } = req.body;
        let query = "UPDATE ubicaciones SET descripcion=?, descripcionDetallada=?, FK_idMunicipio=? WHERE idUbicacion = ?";
        let data = [direccion, direccion, municipio, id];
        console.log(direccion, municipio, id);
        updateDB(query, data, res);
    } else {
        res.sendStatus(400);
    }
});

module.exports = ubicationRouter;