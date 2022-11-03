import { createContext, useState } from "react";
import createFile from "../helper/createFile";
import { helpHttp } from "../helper/helpHttp";

const createJob = (info) => {
    let options = {
        body: info,
        headers: {
            "content-type": "application/json"
        }
    };
    let url = `http://localhost:3500/jobs/insertJob/`;
    helpHttp().post(url, options).then((res) => {

    });
};

const createSkill = (info) => {
    let options = {
        body: info,
        headers: {
            "content-type": "application/json"
        }
    };
    let url = `http://localhost:3500/skills/insertSkill/`;
    helpHttp().post(url, options).then((res) => {

    });
};

const deleteJob = (id) => {

    let url = `http://localhost:3500/jobs/deleteJob/${id}`;
    helpHttp().del(url).then((res) => {
        return 0;
    });
};

const deleteSkill = (id) => {

    let url = `http://localhost:3500/skills/deleteSkill/${id}`;
    helpHttp().del(url).then((res) => {
        return 0;
    });
};




const updateInfo = (info) => {


    let image = document.querySelector('.inputImg');
    let pdf = document.querySelector('.inputPDF');

    let url = 'http://localhost:3500/students/editImg/';
    if (image.files.length > 0) {
        info.foto = `http://localhost:3500/img/studentImg/${createFile(image, info.idEstudiante, url)}`;
    }
    url = 'http://localhost:3500/students/editHojaVida/';
    if (pdf.files.length > 0) {
        info.hojaDeVida = `http://localhost:3500/hojasVida/${createFile(pdf, info.idEstudiante, url)}`;
    }
    let options = {
        body: info,
        headers: {
            "content-type": "application/json"
        }
    };
    url = `http://localhost:3500/students/updateStudent/`;
    helpHttp().put(url, options).then((res) => {
        if (res.error) {
            alert('error');
        } else {
            alert('actualizado con exito');
        }
    });

};

const StudentInfoContext = createContext();

const StudentInfoProvider = ({ children }) => {

    const [userId, setUserId] = useState("");
    const [formJobs, setFormJobs] = useState(false);
    const [formSkills, setFormSkills] = useState(false);
    const [jobsInfo, setJobsInfo] = useState([]);
    const [skillsInfo, setSkillsInfo] = useState([]);
    const [updateFlag, setupdateFlag] = useState(false);
    const [updateFlagSkill, setupdateFlagSkill] = useState(false);



    const data = {
        formJobs, setFormJobs,
        userId, setUserId,
        jobsInfo, setJobsInfo,
        updateFlag, setupdateFlag,
        formSkills, setFormSkills,
        skillsInfo, setSkillsInfo,
        updateFlagSkill, setupdateFlagSkill,
        createJob, deleteJob, updateInfo, createSkill, deleteSkill,
    };
    return (
        <StudentInfoContext.Provider value={data}>
            {children}
        </StudentInfoContext.Provider>
    );
}

export { StudentInfoProvider };

export default StudentInfoContext;