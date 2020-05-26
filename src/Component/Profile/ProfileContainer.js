import React from "react";
import {GET_USER, LOG_OUT} from "./ProfileQueries";
import { withRouter } from "react-router-dom";
import {useQuery, useMutation} from "react-apollo-hooks";
import ProfilePresenter from "./ProfilePresenter";


export default withRouter(({match:{params:{username}}}) =>{
    const {data,loading} = useQuery(GET_USER, {variables:{username}});
    const [logOut] = useMutation(LOG_OUT);
    console.log(data);
    return <ProfilePresenter data={data} loading={loading} logOut={logOut}/>
    
});