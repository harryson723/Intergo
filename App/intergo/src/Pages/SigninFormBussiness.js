import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorForm from '../component/ErrorForm';
import Loader from '../component/Loader';
import { helpHttp } from '../helper/helpHttp';
import signinFormBussinessValidate from '../helper/signinFormBussinesValidate';
import "../styles/styleForm.scss";

const initialForm = {
    nit: "",
    name: "",
    description: "",
    sector: "tecnologias de informacion",
    pass: "",
    confirmPass: "",
};

const sector = ["tecnologias de informacion", "agropecuario", "industria",
    "educacion", "comercio exterior", "comercio y servicios", "construccion"];

const SigninFormBussiness = () => {

    const [formInfo, setFormInfo] = useState(initialForm);
    const [isLoading, setIsLoading] = useState(false);
    const [errorsForm, setErrorsForm] = useState([]);
    const navigate = useNavigate();

    let api = helpHttp();

    const handleInput = e => {
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        let errors = signinFormBussinessValidate(formInfo);
        if (errors.length === 0) {
            let options = {
                body: formInfo,
                headers: {
                    "content-type": "application/json"
                }
            };
            setIsLoading(true);
            let url = "http://localhost:3500/bussines/insertBussines";
            api.post(url, options).then(res => {
                if (res.status === 512) {
                    setIsLoading(true);
                    setErrorsForm(["Error la empresa ya existe"]);
                } else {
                    alert("Registro exitoso");
                    navigate("/");
                }
            });

        } else {
            setErrorsForm(errors);
        }
    };
    return (
        <div className="conteiner">
            <div className="conteinerThings">
                {isLoading && <Loader />}
                {errorsForm.length > 0 && <ErrorForm errors={errorsForm} show="" setErrorsForm={setErrorsForm} />}
                <form>
                    <label htmlFor="nit">NIT: </label>
                    <input id="nit" name="nit" value={formInfo.nit} onChange={handleInput} />
                    <label htmlFor="name">NOMBRE DE LA EMPRESA: </label>
                    <input id="name" name="name" value={formInfo.name} onChange={handleInput} />
                    <label htmlFor="description">DESCRIPCION DE LA EMPRESA: </label>
                    <textarea id="description" name="description" value={formInfo.description} onChange={handleInput} rows="8"></textarea>
                    <label htmlFor="documentType">TIPO DE DOCUMENTO: </label>
                    <select id="sector" name="sector" onChange={handleInput}>
                        {sector.map((element, i) => <option value={element} key={i}>{element.toUpperCase()}</option>)}
                    </select>
                    <label htmlFor="pass">CONTRASEÑA: </label>
                    <input type="password" id="pass" name="pass" value={formInfo.pass} onChange={handleInput} />
                    <label htmlFor="confirmPass">CONFIRMAR CONTRASEÑA: </label>
                    <input type="password" id="confirmPass" name="confirmPass" value={formInfo.confirmPass} onChange={handleInput} />
                    <div className="conteinerButton">
                        <div>
                            <input type="submit" onClick={handleSubmit} value="REGISTRAR EMPRESA" />
                            <Link className="linkButton" to="/">INICIAR SESION</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SigninFormBussiness;