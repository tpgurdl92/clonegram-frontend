import {useState, useEffect} from "react";
import { useSubscription } from "react-apollo-hooks";

export default (query,event,parameter) => {
    if(parameter===null||parameter===undefined) {
        return;
    }
    console.log('in useSub');
    const {data,error}=useSubscription(query);
    useEffect(()=>{
        event(data);
    },[data]);
}