import TYPES from "../actions/studentEditType";
import { helpHttp } from "../helper/helpHttp";

export const initialState = {
    userInfo: [],
    skills: [],
    jobs: [],
};

export function studentEditInfoReducer(state, action) {
    let api = helpHttp();
    switch (action.type) {
        case TYPES.EDIT_DESCRIPTION:
            return 0;
        case TYPES.EDIT_IMAGE:
            return 0;
        case TYPES.EDIT_HOJA:
            return 0;
        case TYPES.ADD_SKILL:
            return 0;
        case TYPES.ADD_JOB:
            state.jobs = [...state.jobs, action.payload];
            let formInfo = action.payload;
            console.log('formInfo');
            let options = {
                body: formInfo,
                headers: {
                    "content-type": "application/json"
                }
            };
            let url = `http://localhost:3500/jobs/insertJob/`;
            api.post(url, options).then((res) => {
                if(res.status === 512) {

                } else {
                    
                }
            });
            return state;
        case TYPES.DELETE_SKILL:
            return 0;
        case TYPES.DELETE_JOB:
            return 0;
        default:
            console.log("hoala");
            return 0;
    }
};