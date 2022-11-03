CREATE TABLE departamentos (
	idDepartamento varchar(2) primary key,
	nombreDepartamento varchar(60)
);

CREATE TABLE municipios	 (
	idMunicipio varchar(4) primary key,
	nombreMunicipio varchar(50),
	FK_idDepartamento varchar(2) foreign key references departamentos(idDepartamento)
);
CREATE TABLE ubicaciones (
	idUbicacion varchar(5) primary key,
	descripcionDetallada varchar(200),
	descripcion varchar(50),
	FK_idMunicipio varchar(4) foreign key references municipios(idMUnicipio)
);
CREATE TABLE sedeUniversidad (
	idSede varchar(2) primary key,
	nombre varchar(20),
	FK_ubicacion varchar(5) foreign key references ubicaciones(idUbicacion)
);
CREATE TABLE empresas (
	NIT varchar(15) primary key,
	descripcion varchar(250),
	imagen varchar(100),
	sectorEmpresa varchar(40),
	nombreEmpresa varchar(20),
	FK_ubicacion varchar(5) foreign key references ubicaciones(idUbicacion)
);

CREATE TABLE cargosBuscados (
	idCargo int identity primary key,
	nombreCargo varchar(30),
	descripcion varchar(250),
	FK_NIT varchar(15) foreign key references empresas(NIT)
);

CREATE TABLE infoContacto (
	idInfo int identity primary key,
	correo varchar(50),
	telefono varchar(15),
	FK_NIT varchar(15) foreign key references empresas(NIT)
);

CREATE TABLE tipoRed (
	idTipoRed varchar(1) primary key,
	nombreTipoRed varchar(30)
);

CREATE TABLE redesSociales (
	idRed int identity primary key,
	url varchar(200),
	FK_idTipoRed varchar(1) foreign key references tipoRed(idTipoRed),
	FK_idInfo int foreign key references infoContacto(idInfo)  
);
CREATE TABLE convenios (
	codigo varchar(20) primary key,
	objeto varchar(200),
	fechaInicio dateTime,
	fechaFinal dateTime,
	FK_NIT varchar(15) foreign key references empresas(NIT),
	FK_idSede varchar(2) foreign key references sedeUniversidad(idSede)
);

CREATE TABLE vacantes (
	idVacante int identity primary key,
	nombre varchar(50),
	descripcion varchar(250),
	fecha datetime,
	plazas int,
	FK_NIT varchar(15) foreign key references empresas(NIT)
);

CREATE TABLE tipoDocumento (
	idTipoDocumento varchar(1) primary key,
	tipoDocumento varchar(20)
);

CREATE TABLE carrera (
	idCarrera varchar(2) primary key,
	semestres varchar(2),
	pensum varchar(200),
	descripcion varchar(250),
	nombre varchar(30)
);
CREATE TABLE carreraSede (
	FK_idSede varchar(2) foreign key references sedeUniversidad(idSede),
	FK_idCarrera varchar(2) foreign key references carrera(idCarrera),
	CONSTRAINT PK_carreraSede primary key (FK_idSede, FK_idCarrera),
	 
);
CREATE TABLE estudinates (
	idEstudiante varchar(20) primary key,
	foto varchar(100),
	hojaDeVida varchar(100),
	semestreCursa varchar(2),
	numeroDocumento varchar(15),
	nombres varchar(50),
	apellidos varchar(50),
	correo varchar(50),
	FK_tipoDocumento varchar(1) foreign key references tipoDocumento(idTipoDocumento),
	FK_idVacante int foreign key references vacantes(idVacante),
	FK_idCarrera varchar(2) foreign key references carrera(idCarrera)
);
