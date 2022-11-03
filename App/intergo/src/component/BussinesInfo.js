import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import BussinesInfoContext from "../context/BussinesInfoContext";
import UserContext from "../context/UserContext";
import addImage from "../helper/addImage";
import Loader from "./Loader";
import "../styles/bussinesInfo.scss";
import useGetInfo from "../hooks/useGetInfo";
import CreateAddressInfo from "./CreateAddressInfo";
import UpdateAddressInfo from "./UpdateAddressInfo";
import { helpHttp } from "../helper/helpHttp";
import getRequest from "../helper/getRequest";
import UpdatePhone from "./UpdatePhone";
import UpdateMail from "./UpdateMail";
import FormSocialMedia from "./FormSocialMedia";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";

const socialMediaLogo = [
    "", "fa-brands fa-square-twitter", "fa-brands fa-square-facebook",
    "fa-brands fa-square-instagram", "fa-brands fa-linkedin",
    "fa-brands fa-square-youtube"
];




const BussinesInfo = () => {
    const params = useParams();
    const { isLoading, setIsLoading, isStudent, setIsStudent } = useContext(UserContext);
    const { info: bussinesInfo } = useGetInfo(`http://localhost:3500/bussines/getBussines/${params.NIT}`, setIsLoading);
    const { info: contacInfo } = useGetInfo(`http://localhost:3500/infoBussines/getInfoById/${params.NIT}`, setIsLoading);
    const { info: vacantesInfo } = useGetInfo(`http://localhost:3500/vacantes/getVacanteByBussines/${params.NIT}`, setIsLoading);
    const [socialMediaInfo, setSocialMediaInfo] = useState([]);
    const [ubicationInfo, setUbicationInfo] = useState({});
    const [muniInfo, setMuniInfo] = useState({});
    const [deparInfo, setDeparInfo] = useState({});
    const location = useLocation();
    const [isOpen, openModal, closeModal] = useModal();
    const [currentJob, setCurrentJob] = useState("");


    const aplicateJob = id => {

        let options = {
            body: { idVacante: id },
            headers: {
                "content-type": "application/json"
            }
        };

        let url = `http://localhost:3500/students/updateVacante/${params.idUser}`

        helpHttp().put(url, options).then(res => {

        });
    };

    useEffect(() => {
        let url = `http://localhost:3500/ubications/getUbicationById/${bussinesInfo.FK_ubicacion}`;
        getRequest(url, setIsLoading, setUbicationInfo);
    }, [bussinesInfo.FK_ubicacion]);

    useEffect(() => {
        let url = `http://localhost:3500/ubications/getMunicipioById/${ubicationInfo.FK_idMunicipio}`;
        getRequest(url, setIsLoading, setMuniInfo);
    }, [ubicationInfo]);
    useEffect(() => {
        let url = `http://localhost:3500/ubications/getDepartamentoById/${muniInfo.FK_idDepartamento}`;
        getRequest(url, setIsLoading, setDeparInfo);
    }, [muniInfo]);


    useEffect(() => {
        let url = `http://localhost:3500/socialMedia/getSocialMediaById/${contacInfo.idInfo}`
        getRequest(url, setIsLoading, setSocialMediaInfo);

        if (location.pathname.toString().includes("studentSpace")) setIsStudent(true);
    }, [contacInfo]);

    const updateCurrentJob = e => {
        let url = `http://localhost:3500/vacantes/getVacanteById/${e.target.parentElement.id}`;
        getRequest(url, setIsLoading, setCurrentJob);
        openModal();
    };

    return (
        <div className="grid-2-2">
            {isLoading && <Loader />}
            <div className="description">
                <span>DESCRIPCION</span>
                <textarea name="descripcion" value={bussinesInfo.descripcion} rows="7"></textarea>
                <p>SECTOR: {bussinesInfo.sectorEmpresa && bussinesInfo.sectorEmpresa.toUpperCase()}</p>
            </div>
            <div className="imagen">
                {!isStudent && <NavLink to={`../edit/${params.NIT}`} className="btnEditInfo">EDITAR<i className="fa-solid fa-pen-to-square"></i></NavLink>}
                <div>
                    <img className="userImg" src={bussinesInfo.imagen ? bussinesInfo.imagen : "./img/logoGeneric.png"} alt="Imagen de usuario" />
                </div>

            </div>
            <div className="infoContactJob">
                <div className="divJobs">
                    <span>VACANTES</span>
                    <div className="jobsPost">
                        {!Array.isArray(vacantesInfo) && <span>{vacantesInfo.nombre}
                            {isStudent && <button onClick={() => aplicateJob(vacantesInfo.idVacante)}>APLICAR</button>}
                        </span>}
                        {vacantesInfo.length > 0 && vacantesInfo.map(v => <div key={v.idVacante}>
                            <span id={v.idVacante}>

                                <button onClick={updateCurrentJob}>{v.nombre}</button>

                                {isStudent && <button onClick={() => aplicateJob(v.idVacante)}>APLICAR</button>}
                            </span>
                        </div>)}
                    </div>
                </div>
                <div className="divInfoContact">
                    <span>INFORMACION DE CONTACTO</span>
                    <div className="infoContact">
                        <span>DIRECCION: </span>
                        <span>{ubicationInfo.descripcionDetallada} ({muniInfo.nombreMunicipio}, {deparInfo.nombreDepartamento})</span>
                        <span>CORREO: </span>
                        <span>{contacInfo.correo}</span>
                        <span>TELEFONO:</span>
                        <span>{contacInfo.telefono}</span>
                        <div className="infoSocialMedia">
                            <div>
                                <span>REDES SOCIALES: </span>
                                <div className="socialMedia">
                                    {!Array.isArray(socialMediaInfo) && <a key={socialMediaInfo.idRed} href={socialMediaInfo.url}><i className={socialMediaLogo[socialMediaInfo.FK_idTipoRed]}></i></a>}
                                    {socialMediaInfo.length > 0 && socialMediaInfo.map(s => <a key={s.idRed} href={s.url}><i className={socialMediaLogo[s.FK_idTipoRed]}></i></a>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div></div>
            <Modal isOpen={isOpen} closeModal={closeModal}>
                {currentJob && <div>
                    <h1>{currentJob.nombre}</h1>
                    <h3>{currentJob.fecha.substring(0, 10)}</h3>
                    <p>{currentJob.descripcion}</p>
                    <span>Cantidad de plazas: {currentJob.plazas}</span>
                </div>}
            </Modal>
        </div>
    );

}

export default BussinesInfo;