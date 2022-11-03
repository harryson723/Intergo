import { useState } from 'react';

import "../styles/errorForm.scss";

const ErrorForm = ({ errors, show, setErrorsForm }) => {
    const [divShow, setDivShow] = useState(show);
    const btnClick = e => {
        setDivShow("hidden");
        setErrorsForm([]);
    };
    return ( 
        <div className={`divError ${divShow}`}>
            <button className="btnClose" onClick={btnClick}>X</button>
            {errors.map((e, i) => <p key={i}>{e}</p>)}
        </div>
     );
}
 
export default ErrorForm;