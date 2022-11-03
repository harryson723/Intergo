const signinFormBussinessValidate = (formInfo) => {
    let errors = []; 
    if (formInfo.nit === "") {
        errors.push("Error debe ingresar un NIT");
    }
    if (formInfo.name === "") {
        errors.push("Error debe ingresar un nombre");
    }

    if (formInfo.description === "") {
        errors.push("Error debe ingresar una descripcion");
    }
    if (formInfo.pass === "") {
        errors.push("Error debe ingresar una contraseña");
    }
    if (formInfo.confirmPass === "") {
        errors.push("Error debe ingresar una contraseña");
    }

    if (isNaN(formInfo.nit)) {
        errors.push("Error ingrese un NIT valido (unicamente numeros 1000235263)");
    }
    if (formInfo.nit.length > 15) {
        errors.push("Error ingrese un nit valido (debe contener menos de 15 caracteres)");
    }
    if (formInfo.name.length > 20) {
        errors.push("Error ingrese un nombre valido (debe contener menos de 20 caracteres)");
    }
    if (formInfo.description.length > 250) {
        errors.push("Error ingrese una descripcion valida (debe contener menos de 250 caracteres)");
    }
       if (formInfo.pass !== formInfo.confirmPass) {
        errors.push("Error las dos contraseñas deben conincidir");
    }
    if (formInfo.pass.length > 15) {
        errors.push("Error ingrese una contraseña valida (debe contener menos de 15 caracteres)");
    }
    return errors;
};

export default signinFormBussinessValidate;