// variables para la ejecucion del servidor y sus procesos
const express = require("express");
const bussinesRouter = express.Router();

// gestor de bases de datos
const {
    consultDB,
    insertDB,
    updateDB,
    deleteDB
} = require("../modules/operationsDB");

// consultar todas las empresas
bussinesRouter.get("/getBussiness", (req, res) => {
    consultDB("SELECT * FROM empresas", res);
});

// consultar empresa 
bussinesRouter.get("/getBussines/:nit", (req, res) => {
    consultDB(`SELECT * FROM empresas where NIT = ${req.params.nit}`, res);
});

// anadir una nueva empresa
bussinesRouter.post("/insertBussines", (req, res) => {
    if (req.body) {
        let {
            nit,
            name,
            description,
            sector,
            pass
        } = req.body;
        let query = "INSERT INTO empresas (nit, nombreEmpresa, descripcion, "
            + "sectorEmpresa, contrasena) VALUES (?,?,?,?,?)";
        let data = [nit, name, description, sector, pass];
        insertDB(query, data, res);
    } else {
        res.sendStatus(400);
    }

});


// eliminar de la base de datos
bussinesRouter.delete("/:nit", (req, res) => {
    let query = "DELETE FROM empresa WHERE nit = ?";
    let data = req.params.nit;
    deleteDB(query, data);
    res.send("Eliminado con exito");
});

// editar de la empresa
bussinesRouter.put("/updateBussines", (req, res) => {
    if (req.body) {
        let {
            FK_ubicacion,
            NIT,
            imagen,
            descripcion,
        } = req.body;
        let query = "UPDATE empresas SET descripcion=?, imagen=?, FK_ubicacion=? WHERE NIT = ?";
        let data = [descripcion, imagen, FK_ubicacion, NIT];
        updateDB(query, data, res);
    } else {
        res.sendStatus(400);
    }
});

// crear imagen
bussinesRouter.put("/editImg", (req, res) => {
    let file = req.files.data;
    file.mv(`./src/public/img/bussinesImg/${file.name}`, err => {
        if (err) return res.status(500).send({ message: err })
        return res.status(200).send({ message: 'File upload' })

    });
});

module.exports = bussinesRouter;