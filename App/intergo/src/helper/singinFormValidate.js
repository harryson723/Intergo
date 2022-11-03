const  singinFormValidate = (formInfo) => {
    let errors = [];
    let mailRegx = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    if(formInfo.code === "") {
        errors.push("Error debe ingresar un codigo");
    }
    if(formInfo.firtsName === "") {
        errors.push("Error debe ingresar un nombre");
    }
    if(formInfo.lastName === "") {
        errors.push("Error debe ingresar un apellido");
    }
    if(formInfo.documentNumber === "") {
        errors.push("Error debe ingresar un numero de documento");
    }
    if(formInfo.email === "") {
        errors.push("Error debe ingresar un correo");
    }
    if(formInfo.pass === "") {
        errors.push("Error debe ingresar una contraseña");
    }
    if(formInfo.confirmPass === "") {
        errors.push("Error debe ingresar una contraseña");
    }

    if(isNaN(formInfo.code)) {
        errors.push("Error ingrese un codigo valido (unicamente numeros 1000235263)");
    } 
    if(formInfo.code.length > 20) {
        errors.push("Error ingrese un codigo valido (debe contener menos de 20 caracteres)");
    }
    if(formInfo.firtsName.length > 50) {
        errors.push("Error ingrese un nombre/s valido (debe contener menos de 50 caracteres)");
    }
    if(formInfo.lastName.length > 50) {
        errors.push("Error ingrese un apellido/s valido (debe contener menos de 50 caracteres)");
    }
    if(!mailRegx.test(formInfo.email)) {
        errors.push("Error ingrese un email valido (ejemplo correo@dominio.com)");
    }
    if(formInfo.email.length > 50) {
        errors.push("Error ingrese un email valido (debe contener menos de 50 caracteres)");
    }
    if(formInfo.pass !== formInfo.confirmPass) {
        errors.push("Error las dos contraseñas deben conincidir");
    }
    if(formInfo.pass.length > 15) {
        errors.push("Error ingrese una contraseña valida (debe contener menos de 15 caracteres)");
    }
    
    return errors;
};

export default singinFormValidate;