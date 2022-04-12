import { useEffect, useState } from "react";

export const useMapboxCredentials = () => {
    const [state, setState] = useState(null);

    const token = process.env.REACT_APP_PRIVATE_ACCESS_TOKEN;
    const gateway = process.env.REACT_APP_MAPBOX_GATEWAY_URL;
    const version = process.env.REACT_APP_MAPBOX_GATEWAY_VERSION;
    const user =  process.env.REACT_APP_MAPBOX_GATEWAY_USER;


    const getCredentials = async () => {

        const url = gateway + "/uploads/" + version + "/" + user + "/credentials?access_token=" + token;

        const response = await fetch(url);

        const data = await response.json();

        setState(data)
    }


    useEffect( () => {
        getCredentials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return state;
}

export default useMapboxCredentials;
