import { useEffect, useState } from "react";
import { helpHttp } from "../helper/helpHttp";

const useGetInfo = (url, setIsLoading) => {
    const [info, setInfo] = useState([]);
    useEffect(() => {
        helpHttp().get(url).then(res => {
            setIsLoading(true);
            if (res.error) {
                return res.error
            } else {
                if (res.length > 0) {
                    if(res.length === 1) {
                        setInfo(res[0]);
                    } else {
                        setInfo(res);   
                    }
                }                
            }
            setIsLoading(false);
        });
    }, [url]);

    return { info, setInfo };
}

export default useGetInfo;
 
