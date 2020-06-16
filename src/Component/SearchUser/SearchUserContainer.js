import React,{useState} from "react";
import useInput from "../../Hooks/useInput";
import { useQuery } from "react-apollo-hooks";
import { SEARCH_USER } from "./SearchUserQueries";
import SearchUserPresenter from "./SearchUserPresenter";
import { getNullableType } from "graphql";

export default ({setListData,onRoomClick,listData,setCreatedRoom,toggleModal}) => {
    const searchInput = useInput("");
    const [recipients,setRecipients] = useState([]);
    const {loading, data,refetch} = useQuery(SEARCH_USER,{variables:{term:searchInput.value},skip:searchInput.value===""});
    const cancelCheck = (user) => {
        let tempRecipients = recipients;
        const deleteIdx =tempRecipients.findIndex((item)=>item.id===user.id);
        tempRecipients.splice(deleteIdx,1);
        setRecipients([...tempRecipients]);
    }
    const handleCheckBox = (e,user) => {
       if(e.target.checked){ 
        setRecipients(previous=>[...previous,user]);
       }else{
        let tempRecipients = recipients;
        const deleteIdx =tempRecipients.findIndex((item)=>item.id===user.id);
        tempRecipients.splice(deleteIdx,1);
        setRecipients([...tempRecipients]);
       }
    }
    const createTempRoom = () => {
        let isRoomCreated = false;
        let existRoom=null;
        console.log(recipients);
        const recipientList=recipients.filter(item=>{
            if(listData&&listData.seeRooms){
                listData.seeRooms.forEach(room => {
                    if(room.participantA.id===item.id||room.participantB.id===item.id){
                        existRoom= room;
                        console.log("find exist room");
                    }
                });
            }      
            if(existRoom){
                return false;
            }      
            return true;
        }).map(item=>
            {   
                isRoomCreated=true;
                console.log("add room");
                return {
                    id:"k",
                    participantA:{
                        id:item.id,
                        username:item.username,
                        avatar:item.avatar,
                        itsMe:false
                    },
                    participantB:{
                        id:"",
                        username:"",
                        avatar:"",
                        itsMe:true
                    },
                    messages:[],
                    admissionA:true,
                    admissionB:true,
                    lastCheckTimeA:"",
                    lastCheckTimeB:"",
                }
            }
        )
        if(isRoomCreated){
            
            let tempListData= listData;
            tempListData.seeRooms=[...listData.seeRooms,...recipientList]
            console.log(tempListData)
            setListData(tempListData);
            //setCreatedRoom(previous=>[...previous,...recipientList]);
        }else if(existRoom){
            onRoomClick({room:existRoom});
        }  
    }
    return (<SearchUserPresenter createTempRoom={createTempRoom} cancelCheck={cancelCheck} handleCheckBox={handleCheckBox} recipients={recipients} toggleModal={toggleModal} loading={loading} data={data} searchInput={searchInput}/>);
}