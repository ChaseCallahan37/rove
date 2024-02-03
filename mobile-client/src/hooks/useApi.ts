import { useState } from "react";

function useApi(apiCall: Function){
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [progress, setProgress] = useState()

    // @ts-ignore
    const request = async (...args) => {
        try{
        setLoading(true)
        console.log("BEFORE THE ACTUAL CALL");

        
        const result = await apiCall(...args)
        console.log("AFTER THE COALLLLL");
        
        setLoading(false)
        // @ts-ignore
        setProgress(null)
        if(!result.ok){
            console.log(result);
            return setError(true) 
        }                
        const resultData = await result.json()
        console.log(resultData);
        
        setError(false)
        setData(resultData)
    } catch(e){
        console.log(e);
        
    }
    }
    
    return {
        request,
        data,
        error,
        progress,
        loading
    }
}

export default useApi