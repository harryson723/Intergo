import { helpHttp } from "./helpHttp";

const getRequest = (url, setIsLoading, setInfo) => {
    helpHttp().get(url).then(res => {
            setIsLoading(true);
            if (res.error) {
                return res.error
            } else {
                if (res.length > 0) {
                   if(res.length === 1)  setInfo(res[0]);
                   else  setInfo(res);
                }
            }
            setIsLoading(false);
        });
        setIsLoading(false);
};

export default getRequest;