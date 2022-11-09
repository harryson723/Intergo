import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { helpHttp } from "../helper/helpHttp";
import Loader from "./Loader";
import "../styles/studentInfo.scss";
import { NavLink, useParams } from "react-router-dom";
import getRequest from "../helper/getRequest";
import BussinesInfo from "./BussinesInfo";

const StudentInfo = () => {

    const { isLoading, setIsLoading } = useContext(UserContext);
    const [jobsInfo, setJobsInfo] = useState([]);
    const [skillsInfo, setSkillsInfo] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [bussines, setBussines] = useState({});
    const [vacante, setVacante] = useState({});
    const params = useParams();
    useEffect(() => {
        let url = `http://localhost:3500/students/getStudent/${params.idUser}`;
        helpHttp().get(url).then(res => {
            setIsLoading(true);
            if (res.error) {
                return res.error
            } else {
                if (res.length > 0) {
                    setUserInfo(res[0]);
                    url = `http://localhost:3500/jobs/getJobs/${params.idUser}`;
                    helpHttp().get(url).then(res => {
                        if (res.error) {
                            return res.error
                        } else {
                            if (res.length > 0) {
                                setJobsInfo(res);
                            } else setJobsInfo([]);
                        }
                    });
                    url = `http://localhost:3500/skills/getSkills/${params.idUser}`;
                    helpHttp().get(url).then(res => {
                        if (res.error) {
                            return res.error
                        } else {
                            if (res.length > 0) {
                                setSkillsInfo(res);
                            } else setSkillsInfo([]);
                        }
                    });
                } else alert('El usuario no existe');
            }
            setIsLoading(false);
        });
    }, [params.idUser]);

    useEffect(() => {
        if (userInfo.FK_idVacante !== undefined) {
            let url = `http://localhost:3500/vacantes/getVacanteById/${userInfo.FK_idVacante}`;
            getRequest(url, setIsLoading, setVacante);
        }
    }, [userInfo]);

    useEffect(() => {
        if(vacante.FK_NIT) {
            let url = `http://localhost:3500/bussines/getBussines/${vacante.FK_NIT}`;
            getRequest(url, setIsLoading, setBussines);
        }
    }, [vacante]);

    return (
        <div className="grid-2-2">
            {isLoading && <Loader />}
            <div className="description">
                <p>DESCRIPCION</p>
                <textarea value={userInfo.descripcion} rows="7"></textarea>
                <div className="jobs">
                    <div className="jobsInfo">
                        {jobsInfo.map((job, i) => <div key={job.idCargo} id={job.idCargo} className="jobInfo jobPost">
                            <span >{job.nombre}</span>
                        </div>)}
                    </div>
                </div>
            </div>
            <div className="imagen">
               {!params.NIT &&  <NavLink to={`../edit/${params.idUser}`} className="btnEditInfo">EDITAR<i className="fa-solid fa-pen-to-square"></i></NavLink>}
                <img className="userImg" src={userInfo.foto ? userInfo.foto : "https://api.lorem.space/image/face?w=120&h=120"} alt="Imagen de usuario" />
            </div>
            <div className="empresas">
                <div>
                    <p>HABILIDADES</p>
                    <div className="skills">
                        {skillsInfo.map((skill, i) => <div key={skill.idHabilidad} id={skill.idHabilidad} className="jobInfo jobPost">
                            <span >{skill.nombre}</span>
                        </div>)}
                    </div>
                </div>
                <div>
                    <p>EMPRESA EN PROCESO</p>
                    <div className="divBussines">
                        <h1>{bussines.nombreEmpresa}</h1>
                    </div>
                </div>
            </div>
            <div>
                <a className="hojaVida" href={userInfo.hojaDeVida} target="_blank" rel="noreferrer" >
                    <i className="fa-solid fa-circle-down"></i>
                </a>
                <p>HOJA DE VIDA</p>
            </div>
        </div>

    );
}

export default StudentInfo;