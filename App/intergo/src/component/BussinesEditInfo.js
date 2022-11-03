import { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
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

const socialMediaLogo = [
    "", "fa-brands fa-square-twitter", "fa-brands fa-square-facebook",
    "fa-brands fa-square-instagram", "fa-brands fa-linkedin",
    "fa-brands fa-square-youtube"
];

const BussinesEditInfo = () => {
    const params = useParams();
    const { isLoading, setIsLoading } = useContext(UserContext);
    const { updateInfo, flagCreateAddress, setFlagCreateAddress,
        formInfo, flagUpdateAddress, setFlagUpdateAddress,
        flagUpdateMail, flagUpdatePhone, setFlagUpdateMail, setFlagUpdatePhone,
        flagSocialMedia, setFlagSocialMedia, deleteVacanteById } = useContext(BussinesInfoContext);
    const { info: bussinesInfo, setInfo: setBussinesInfo } = useGetInfo(`http://localhost:3500/bussines/getBussines/${params.NIT}`, setIsLoading);
    const { info: vacantesInfo } = useGetInfo(`http://localhost:3500/vacantes/getVacanteByBussines/${params.NIT}`, setIsLoading);
    const { info: contacInfo, setInfo: setContacInfo } = useGetInfo(`http://localhost:3500/infoBussines/getInfoById/${params.NIT}`, setIsLoading);
    const [socialMediaInfo, setSocialMediaInfo] = useState([]);
    const [ubicationInfo, setUbicationInfo] = useState({});
    const [muniInfo, setMuniInfo] = useState({});
    const [deparInfo, setDeparInfo] = useState({});
    const handleInfo = e => {
        setBussinesInfo({
            ...bussinesInfo,
            [e.target.name]: e.target.value,
        });
    };

    const deleteVacante = e => {
        deleteVacanteById(e.target.parentElement.parentElement.id);
    };

    useEffect(() => {
        if (formInfo !== "") {
            setBussinesInfo({
                ...bussinesInfo,
                FK_ubicacion: formInfo,
            });
            updateInfo(bussinesInfo);
        }
    }, [formInfo]);

    useEffect(() => {
        let url = `http://localhost:3500/ubications/getUbicationById/${bussinesInfo.FK_ubicacion}`;
        getRequest(url, setIsLoading, setUbicationInfo);
    }, [bussinesInfo.FK_ubicacion, flagUpdateAddress, flagCreateAddress]);

    useEffect(() => {
        let url = `http://localhost:3500/ubications/getMunicipioById/${ubicationInfo.FK_idMunicipio}`;
        getRequest(url, setIsLoading, setMuniInfo);
    }, [ubicationInfo]);
    useEffect(() => {
        let url = `http://localhost:3500/ubications/getDepartamentoById/${muniInfo.FK_idDepartamento}`;
        getRequest(url, setIsLoading, setDeparInfo);
    }, [muniInfo]);



    useEffect(() => {
        let url = `http://localhost:3500/infoBussines/getInfoById/${bussinesInfo.NIT}`;
        getRequest(url, setIsLoading, setContacInfo);
    }, [flagUpdateMail, flagUpdatePhone]);

    useEffect(() => {
        let url = `http://localhost:3500/socialMedia/getSocialMediaById/${contacInfo.idInfo}`
        getRequest(url, setIsLoading, setSocialMediaInfo);
    }, [contacInfo, flagSocialMedia]);



    return (
        <div className="grid-2-2">
            {isLoading && <Loader />}
            {flagCreateAddress && <CreateAddressInfo NIT={bussinesInfo.NIT} />}
            {flagUpdateAddress && <UpdateAddressInfo NIT={bussinesInfo.NIT} />}
            {flagUpdatePhone && <UpdatePhone NIT={bussinesInfo.NIT} contacInfo={contacInfo} />}
            {flagUpdateMail && <UpdateMail NIT={bussinesInfo.NIT} contacInfo={contacInfo} />}
            {flagSocialMedia && <FormSocialMedia idInfo={contacInfo.idInfo} />}
            <div className="description">
                <span>DESCRIPCION</span>
                <textarea name="descripcion" value={bussinesInfo.descripcion} rows="7" onChange={handleInfo}></textarea>
                <p>SECTOR: {bussinesInfo.sectorEmpresa && bussinesInfo.sectorEmpresa.toUpperCase()}</p>
            </div>
            <div className="imagen">
                <button className="btnEditInfo btnSaveInfo" onClick={() => updateInfo(bussinesInfo)}>GUARDAR<i className="fa-solid fa-floppy-disk"></i></button>
                <div>
                    <button className="btnEditImg" onClick={addImage}><i className="fa-solid fa-pen-to-square"></i></button>
                    <img className="userImg" src={bussinesInfo.imagen ? bussinesInfo.imagen : "./img/logoGeneric.png"} alt="Imagen de usuario" />
                </div>

            </div>
            <div className="infoContactJob">
                <div className="divJobs">
                    <span>VACANTES</span>
                    <div className="jobsPost">
                        {!Array.isArray(vacantesInfo) && <span id={vacantesInfo.idVacante}>{vacantesInfo.nombre}<button className="btnAddSocialMedia" onClick={deleteVacante}><i className="fa-solid fa-trash"></i></button></span>}
                        {vacantesInfo.length > 0 && vacantesInfo.map(v => <span key={v.idVacante} id={v.idVacante}>{v.nombre}<button className="btnAddSocialMedia" onClick={deleteVacante}><i className="fa-solid fa-trash"></i></button></span>)}
                    </div>
                </div>
                <div className="divInfoContact">
                    <span>INFORMACION DE CONTACTO</span>
                    <div className="infoContact">
                        <span>DIRECCION: {bussinesInfo.FK_ubicacion === null ?
                            <button className="btnAddSocialMedia" onClick={() => setFlagCreateAddress(true)}><i className="fa-solid fa-circle-plus"></i></button> :
                            <button className="btnAddSocialMedia" onClick={() => setFlagUpdateAddress(true)}><i className="fa-solid fa-pen-to-square"></i></button>}</span>
                        <span>{ubicationInfo.descripcionDetallada} ({muniInfo.nombreMunicipio}, {deparInfo.nombreDepartamento})</span>
                        <span>CORREO: {contacInfo.length === 0 || contacInfo.correo === null ?
                            <button className="btnAddSocialMedia" onClick={() => setFlagUpdateMail(true)}><i className="fa-solid fa-circle-plus"></i></button> :
                            <button className="btnAddSocialMedia" onClick={() => setFlagUpdateMail(true)}><i className="fa-solid fa-pen-to-square"></i></button>}</span>
                        <span>{contacInfo.correo}</span>
                        <span>TELEFONO: {contacInfo.length === 0 || contacInfo.telefono === null ?
                            <button className="btnAddSocialMedia" onClick={() => setFlagUpdatePhone(true)}><i className="fa-solid fa-circle-plus"></i></button> :
                            <button className="btnAddSocialMedia" onClick={() => setFlagUpdatePhone(true)}><i className="fa-solid fa-pen-to-square"></i></button>}</span>
                        <span>{contacInfo.telefono}</span>
                        <div className="infoSocialMedia">
                            <div>
                                <span>REDES SOCIALES: <button className="btnAddSocialMedia" onClick={() => setFlagSocialMedia(true)}><i className="fa-solid fa-circle-plus"></i></button></span>
                                <div className="socialMedia">
                                    {!Array.isArray(socialMediaInfo) && <a key={socialMediaInfo.idRed} href={socialMediaInfo.url}><i className={socialMediaLogo[socialMediaInfo.FK_idTipoRed]}></i></a>}
                                    {socialMediaInfo.length > 0 && socialMediaInfo.map(s => <a key={s.idRed} href={s.url}><i className={socialMediaLogo[s.FK_idTipoRed]}></i></a>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>

            </div>
            <form className="formImg hidden" method="POST" encType="multipart/form-data">
                <input type="file" name="image" accept="image/*" className="inputImg hidden" />
            </form>
        </div>
    );
}

export default BussinesEditInfo;