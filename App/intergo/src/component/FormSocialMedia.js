import { useContext, useState } from "react";
import BussinesInfoContext from "../context/BussinesInfoContext";
import UserContext from "../context/UserContext";
import useGetInfo from "../hooks/useGetInfo";

const initialState = {
    idTipoRed: 1,
    url: "",
    idInfo: 0
}

const FormSocialMedia = ({ idInfo }) => {
    const { isLoading, setIsLoading } = useContext(UserContext);
    const [formInfo, setFormInfo] = useState(initialState);
    const { flagSocialMedia, setFlagSocialMedia, createSocialMedia, } = useContext(BussinesInfoContext);
    const { info: socialMediaType, setInfo: setSocialMediaType } = useGetInfo(`http://localhost:3500/socialMedia/getSocialMediaType/`, setIsLoading);

    const handelInput = (e) => {
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        });
    };

    const close = () => {
        formInfo.idInfo = idInfo;
        createSocialMedia(formInfo);
        setFlagSocialMedia(!flagSocialMedia);
    };

    return (
        <div className="divPerro">
            <form className="formAdd">
                <div>
                    <label htmlFor="selectRed">TIPO DE RED SOCIAL</label>
                    <select id="selectRed" value={formInfo.idTipoRed} onChange={handelInput} name="idTipoRed">
                        {socialMediaType.map(s => <option key={s.idTipoRed} value={s.idTipoRed}>{s.nombreTipoRed}</option>)}
                    </select>
                    <label htmlFor="inputUrl">LINK DE LA RED SOCIAL</label>
                    <input id="inputUrl" value={formInfo.url} onChange={handelInput} name="url" />
                    <button className="btnAddGeneric" onClick={close}>AGREGAR</button>
                </div>
            </form>
        </div>
    );
}

export default FormSocialMedia;