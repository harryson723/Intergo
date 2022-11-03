import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorForm from '../component/ErrorForm';
import Loader from '../component/Loader';
import { helpHttp } from '../helper/helpHttp';
import singinFormValidate from '../helper/singinFormValidate';
import "../styles/styleForm.scss";

const initialForm = {
    code: "",
    firtsName: "",
    lastName: "",
    documentType: "1",
    documentNumber: "",
    email: "",
    pass: "",
    confirmPass: "",
};

const SigninFormStudent = () => {

    const [formInfo, setFormInfo] = useState(initialForm);
    const [documentTypeInfo, setDocumentTypeInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorsForm, setErrorsForm] = useState([]);
    const navigate = useNavigate();
    let url = "http://localhost:3500/documentType";
    let api = helpHttp();

    useEffect(() => {
        api.get(url).then((res) => {
            setIsLoading(true);
            if (!res.error) {
                setDocumentTypeInfo(res);
            } else {
                setDocumentTypeInfo([]);
            }
            setIsLoading(false);
        });
    }, [url, api]);

    const handleInput = e => {
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        let errors = singinFormValidate(formInfo);
        if (errors.length === 0) {
            let options = {
                body: formInfo,
                headers: {
                    "content-type": "application/json"
                }
            };
            setIsLoading(true);
            let url = "http://localhost:3500/students/insertStudent";
            api.post(url, options).then(res => {
                if (res.status === 512) {
                    setIsLoading(true);
                    setErrorsForm(["Error el estudiante ya existe"]);
                }
                else {
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
                    <label htmlFor="code">CODIGO ESTUDIANTE: </label>
                    <input id="code" name="code" value={formInfo.code} onChange={handleInput} />
                    <label htmlFor="firtsName">NOMBRES: </label>
                    <input id="firtsName" name="firtsName" value={formInfo.firtsName} onChange={handleInput} />
                    <label htmlFor="lastName">APELLIDOS: </label>
                    <input id="lastName" name="lastName" value={formInfo.lastName} onChange={handleInput} />
                    <label htmlFor="documentType">TIPO DE DOCUMENTO: </label>
                    <select id="documentType" name="documentType" onChange={handleInput}>
                        {documentTypeInfo.length > 0 ?
                            documentTypeInfo.map((e) => <option value={e.idTipoDocumento} key={e.idTipoDocumento}>{e.tipoDocumento.toUpperCase()}</option>) :
                            <option value="">CARGANDO OPCIONES</option>
                        }
                    </select>
                    <label htmlFor="documentNumber">NUMERO DE DOCUMENTO: </label>
                    <input id="documentNumber" name="documentNumber" value={formInfo.documentNumber} onChange={handleInput} />
                    <label htmlFor="email">CORREO: </label>
                    <input id="email" name="email" value={formInfo.email} onChange={handleInput} />
                    <label htmlFor="pass">CONTRASEÑA: </label>
                    <input type="password" id="pass" name="pass" value={formInfo.pass} onChange={handleInput} />
                    <label htmlFor="confirmPass">CONFIRMAR CONTRASEÑA: </label>
                    <input type="password" id="confirmPass" name="confirmPass" value={formInfo.confirmPass} onChange={handleInput} />
                    <div className="conteinerButton">
                        <div>
                            <input type="submit" onClick={handleSubmit} value="REGISTRAR ESTUDIANTES" />
                            <Link className="linkButton" to="/">INICIAR SESION</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SigninFormStudent;