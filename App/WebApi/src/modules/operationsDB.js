const connection = require("./ConnectDB.js");
// operaciones de consulta a la base de datos de manera general
const consultDB = (query, res) => {
    connection.query(query, (error, results) => {
        if (error) {
            console.log(error.sqlMessage);
            return res.sendStatus(512);
        }
        res.json(results);
    });
};

// operacion de insercion de nuevos datos a la base de datos
const insertDB = (query, data, res) => {
    connection.query(query, data, (error) => {
        if (error) {
            if (error.sqlMessage == "Duplicate entry '1' for key 'PRIMARY'") return res.sendStatus(512);
                return res.sendStatus(400);
        }
        return res.sendStatus(200);
    });
};

// operacion de actualiar la informacion de la base de datos
const updateDB = (query, data, res) => {
    connection.query(query, data, (error) => {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        }
        res.sendStatus(200);
    });
};

// operacion de eliminar un registro en la base de datos
const deleteDB = (query, data) => {
    connection.query(query, data, (error) => {
        if (error) return error;
        console.log("eliminado");
    });
};

module.exports = {
    consultDB,
    insertDB,
    updateDB,
    deleteDB,
};