import { NavLink } from "react-router-dom";
import { helpHttp } from "../helper/helpHttp";
import "../styles/StudentAplicated.scss";

const deleteStudent = (id) => {
    console.log(id);
    let options = {
        body: {idEstudiante: id},
        headers: {
            "content-type": "application/json"
        }
    };
    let url = `http://localhost:3500/students/updateVacante/`;
    helpHttp().put(url, options).then((res) => {
        if (res.status === 512) {
        } else {
            window.location.reload(false);
        }
    });
};

const StudentAplicated = ({ e, NIT,}) => {
    console.log(e);
    return (
        <div className="divStudentAplicated">
            <span>Nombre: {e.nombres} {e.apellidos}</span>
            <span>correo: {e.correo}</span>
            <span>Vacante: {e.nombre}</span>
            <NavLink to={`../student/${NIT}/${e.idEstudiante}`}>Ver perfil</NavLink>
            <button onClick={() => deleteStudent(e.idEstudiante, )}>RECHAZAR</button>
        </div>);
}

export default StudentAplicated;