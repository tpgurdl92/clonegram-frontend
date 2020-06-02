import React, { useRef, useState } from "react";
import {GET_USER, LOG_OUT, EDIT_AVATAR} from "./ProfileQueries";
import { withRouter } from "react-router-dom";
import axios from "axios";
import {useQuery, useMutation} from "react-apollo-hooks";
import ProfilePresenter from "./ProfilePresenter";
import  { APOLLO_URI } from "../../Apollo/Client";

export default withRouter(({match:{params:{username}}}) =>{
    const [avatarS, setAvatar] = useState("");
    const {data,loading} = useQuery(GET_USER, {variables:{username}});
    const [editAvatarMutation] = useMutation(EDIT_AVATAR);
    const [logOut] = useMutation(LOG_OUT);
    const avatarRef = useRef();
    
    const onAvatarChange =async()=>{
        const data = new FormData();
        data.append("file",avatarRef.current.files[0]);
        try{
            const {data:{location}} = await axios.post(`${APOLLO_URI}/api/upload`,data,{
                headers:{
                    "content-type":"multipart/form-data"
                }
            });
            const {data:{editUser:{avatar}}} = await editAvatarMutation({variables:{avatar:location}});
            setAvatar(avatar);
        }catch(e){
            console.log(e)
        }
    }
    console.log(data);
    return <ProfilePresenter data={data} loading={loading} avatarS={avatarS} logOut={logOut} avatarRef={avatarRef} onAvatarChange={onAvatarChange}/>
    
});