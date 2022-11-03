import { createContext, useState } from "react";
import createFile from "../helper/createFile";
import createId from "../helper/createIds";
import { helpHttp } from "../helper/helpHttp";
import useGetInfo from "../hooks/useGetInfo";


const updateInfo = (info) => {
    let image = document.querySelector('.inputImg');
    let url = 'http://localhost:3500/bussines/editImg/';
    if (image.files.length > 0) {
        info.imagen = `http://localhost:3500/img/bussinesImg/${createFile(image, info.NIT, url)}`;
    }
    let options = {
        body: info,
        headers: {
            "content-type": "application/json"
        }
    };
    url = `http://localhost:3500/bussines/updateBussines/`;
    helpHttp().put(url, options).then((res) => {
        if (res.error) {
            alert('error');
        } else {
            alert('actualizado con exito');
        }
    });

};

const createAddress = (info) => {
    info.id = createId(5);
    let options = {
        body: info,
        headers: {
            "content-type": "application/json"
        }
    };
    let url = `http://localhost:3500/ubications/insertUbication/`;
    helpHttp().post(url, options).then((res) => {
        if (res.status === 512) {
            return createAddress(info);
        } else {

        }
    });
    return info.id;
};

const updateAddress = (info) => {
    let options = {
        body: info,
        headers: {
            "content-type": "application/json"
        }
    };
    let url = `http://localhost:3500/ubications/updateUbication/`;
    helpHttp().put(url, options).then((res) => {

    });
}

const createInfoContact = (info) => {
    let options = {
        body: info,
        headers: {
            "content-type": "application/json"
        }
    };
    let url = `http://localhost:3500/infoBussines/insertInfo/`;
    helpHttp().post(url, options).then((res) => {
        if (res.status === 512) {
            return createAddress(info);
        } else {

        }
    });
};

const updateInfoContact = (info) => {
    let options = {
        body: info,
        headers: {
            "content-type": "application/json"
        }
    };
    let url = `http://localhost:3500/infoBussines/updateInfo/`;
    helpHttp().put(url, options).then((res) => {

    });
};

const createSocialMedia = (info) => {
    let options = {
        body: info,
        headers: {
            "content-type": "application/json"
        }
    };
    let url = `http://localhost:3500/socialMedia/insertSocialMedia/`;
    helpHttp().post(url, options).then((res) => {
        if (res.status === 512) {
            return createAddress(info);
        } else {

        }
    });
};

const deleteVacanteById = (id) => {
    let url = `http://localhost:3500/vacantes/deleteVacante/${id}`;
    let options = {
        body: {id},
        headers: {
            "content-type": "application/json"
        }
    };
    helpHttp().del(url, options).then((res) => {

    });
}

const BussinesInfoContext = createContext();

const BussinesInfoProvider = ({ children }) => {

    const [formInfo, setFormInfo] = useState("");
    const [flagCreateAddress, setFlagCreateAddress] = useState(false);
    const [flagUpdateAddress, setFlagUpdateAddress] = useState(false);
    const [flagUpdateMail, setFlagUpdateMail] = useState(false);
    const [flagUpdatePhone, setFlagUpdatePhone] = useState(false);
    const [flagSocialMedia, setFlagSocialMedia] = useState(false);

    const data = {
        formInfo, setFormInfo,
        updateInfo, createAddress,
        flagCreateAddress, setFlagCreateAddress,
        flagUpdateAddress, setFlagUpdateAddress,
        flagUpdateMail, setFlagUpdateMail,
        flagUpdatePhone, setFlagUpdatePhone,
        flagSocialMedia, setFlagSocialMedia,
        updateAddress, createInfoContact, updateInfoContact,
        createSocialMedia, deleteVacanteById,
    };

    return (
        <BussinesInfoContext.Provider value={data}>
            {children}
        </BussinesInfoContext.Provider>
    );
};

export { BussinesInfoProvider };

export default BussinesInfoContext;