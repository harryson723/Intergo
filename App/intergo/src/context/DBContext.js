import  { createContext } from 'react';
import { helpHttp } from '../helper/helpHttp';

const DBContext = createContext();

const {
    get,
    post,
    put,
    del,
} = helpHttp();

const DBProvider = ({ children }) => {

    const consultDB = (url) => {
        return get(url);
    };

    const data = {
        consultDB,
    };

    return (
        <DBContext.Provider value={data}>
            { children }
        </DBContext.Provider>
    );
};

export { DBProvider };

export default DBContext;

