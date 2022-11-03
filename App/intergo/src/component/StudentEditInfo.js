import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { helpHttp } from "../helper/helpHttp";
import Loader from "./Loader";
import "../styles/studentInfo.scss";
import { useParams } from "react-router-dom";
import CreateSkill from "./CreateSkill";
import StudentInfoContext from "../context/StudentInfoContext";
import addImage from "../helper/addImage";
import addPdf from "../helper/addHojaVida";
import CreateJob from "./CreateJob";
import getRequest from "../helper/getRequest";





const StudentEditInfo = () => {

    const { isLoading, setIsLoading } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState({});
    const params = useParams();
    const { formJobs, setFormJobs, updateFlag, setupdateFlag,
        formSkills, setFormSkills, skillsInfo, setSkillsInfo,
        setupdateFlagSkill, updateFlagSkill,
        jobsInfo, setJobsInfo, deleteJob, updateInfo, deleteSkill } = useContext(StudentInfoContext);

    const [bussines, setBussines] = useState({});
    const [vacante, setVacante] = useState({});
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
                } else alert('El usuario no existe');
            }
            setIsLoading(false);
        });


    }, [params.idUser]);

    useEffect(() => {
        let url = `http://localhost:3500/jobs/getJobs/${params.idUser}`;
        helpHttp().get(url).then(res => {
            if (res.error) {
                return res.error
            } else {
                if (res.length > 0) {
                    setJobsInfo(res);
                } else setJobsInfo([]);
            }
        });
    }, [updateFlag]);

    useEffect(() => {
        let url = `http://localhost:3500/skills/getSkills/${params.idUser}`;
        helpHttp().get(url).then(res => {
            if (res.error) {
                return res.error
            } else {
                if (res.length > 0) {
                    console.log('gola');
                    setSkillsInfo(res);
                } else setSkillsInfo([]);
            }
        });
    }, [updateFlagSkill]);


    const handleInfo = e => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
    };

    const deleteJobId = e => {
        deleteJob(e.target.parentElement.parentElement.id);
        setupdateFlag(!updateFlag);
    };

    const deleteSkillId = e => {
        console.log(e.target.parentElement.parentElement.id);
        deleteSkill(e.target.parentElement.parentElement.id);
        setupdateFlagSkill(!updateFlagSkill);
    };

    useEffect(() => {
        if (userInfo.FK_idVacante !== undefined) {
            let url = `http://localhost:3500/vacantes/getVacanteById/${userInfo.FK_idVacante}`;
            getRequest(url, setIsLoading, setVacante);
        }
    }, [userInfo]);

    useEffect(() => {
        if (vacante.FK_NIT) {
            let url = `http://localhost:3500/bussines/getBussines/${vacante.FK_NIT}`;
            getRequest(url, setIsLoading, setBussines);
        }
    }, [vacante]);

    return (
        <div className="grid-2-2">
            {isLoading && <Loader />}
            {formJobs && <CreateJob text="INGRESE UN CARGO" />}
            {formSkills && <CreateSkill text="INGRESE UNA HABILIDAD" />}
            <div className="description">
                <p>DESCRIPCION</p>
                <textarea name="descripcion" value={userInfo.descripcion} rows="7" onChange={handleInfo} maxLength="499"></textarea>
                <div className="jobs grid-1-2">
                    <button className="btnAddJobs" onClick={() => setFormJobs(true)}><i className="fa-solid fa-circle-plus"></i></button>
                    <div className="jobsInfo">
                        {jobsInfo.map((job, i) => <div key={job.idCargo} id={job.idCargo} className="jobInfo">
                            <span >{job.nombre}</span>
                            <button className="btnAddJobs" onClick={deleteJobId}><i className="fa-solid fa-trash"></i></button>
                        </div>)}
                    </div>
                </div>
            </div>
            <div className="imagen">
                <button className="btnEditInfo btnSaveInfo" onClick={() => updateInfo(userInfo)}>GUARDAR<i className="fa-solid fa-floppy-disk"></i></button>
                <div>
                    <button className="btnEditImg" onClick={addImage}><i className="fa-solid fa-pen-to-square"></i></button>
                    <img className="userImg" src={userInfo.foto ? userInfo.foto : "https://api.lorem.space/image/face?w=120&h=120"} alt="imagen de usuario" />
                </div>
            </div>
            <div className="empresas">
                <div >
                    <div className="divSkillAdd">
                        <p>Habilidades</p>
                        <button className="btnAddJobs" onClick={() => setFormSkills(true)}><i className="fa-solid fa-circle-plus"></i></button>
                    </div>
                    <div className="skills">
                        {skillsInfo.map((skill, i) => <div key={skill.idHabilidad} id={skill.idHabilidad} className="jobInfo">
                            <span >{skill.nombre}</span>
                            <button className="btnAddJobs" onClick={deleteSkillId}><i className="fa-solid fa-trash"></i></button>
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
            <div className="hojaVida">
                <button className="btnHojaVida" onClick={addPdf}><i className="fa-solid fa-circle-down"></i></button>
                <p>HOJA DE VIDA</p>
            </div>
            <form className="formImg hidden" method="POST" encType="multipart/form-data">
                <input type="file" name="image" accept="image/*" className="inputImg hidden" />
                <input type="file" name="pdfHojaVida" accept=".pdf" className="inputPDF hidden" />
            </form>
        </div>

    );
}

export default StudentEditInfo;