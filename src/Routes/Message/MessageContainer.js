import React, { useRef, useEffect } from 'react';
import {SEE_ROOMS, SEND_MESSAGE,NEW_MESSAGE, CREATE_ROOM} from './MessageQueries';
import { useQuery, useMutation, useSubscription } from 'react-apollo-hooks';
import MessagePresenter from './MessagePresenter';
import { useState } from 'react';
import useInput from '../../Hooks/useInput';
import { toast } from 'react-toastify';



export default () => {
    const messageInput = useInput("");
    const messagesEndRef= useRef(null);
    const {loading:listLoading,data:roomData} =useQuery(SEE_ROOMS);
    const [listData, setListData] = useState({seeRooms:[]});
    const [createRoomMutation] = useMutation(CREATE_ROOM);
    const [sendMessageMutation] = useMutation(SEND_MESSAGE);
    const [room, setRoom] = useState(null);
    const [toId, setToId] = useState("");
    const [newMessages, setNewMessages] = useState([]);
    const {data:newMessageData,error} = useSubscription(NEW_MESSAGE);

    useEffect(()=>{console.log(listData)},[listData]);
    useEffect(()=>{
        if(newMessageData!==undefined){
            const {newMessage} = newMessageData;
            let tempListData =  listData;
            let idx=-1;
            if(tempListData&&tempListData.seeRooms){
                idx= tempListData.seeRooms.findIndex((item)=>item.id===newMessage.room.id);
            }
            if(idx>-1){
                tempListData.seeRooms[idx].messages.push({...newMessage});
            }else{
                const addRoom={
                    id:newMessage.room.id,
                    participantA:room.participantA,
                    participantB:room.participantB,
                    messages:[newMessage]
                };
                tempListData.seeRooms.push(addRoom);
            }
            setListData(previous=>{return {...tempListData}});
            setTimeout(()=>scrollToBottomInit(),50);
        }
    },[newMessageData]);

    useEffect(()=>{
        if(roomData!==undefined&&roomData.seeRooms.length!==0){
            setListData(roomData);
        }
    },[roomData])
    useEffect(()=>scrollToBottomInit(),[room]);
    
    const onRoomClick = (selectedRoom) => {
        const {room:roomS} = selectedRoom
        setToId(roomS.participantA.itsMe? roomS.participantB.id:roomS.participantA.id);
        for(let i=0;i<roomS.messages.length;i++){
            if(roomS.messages[i].to.itsMe){
                if(i<roomS.messages.length-1&&roomS.messages[i+1].from.itsMe){
                    roomS.messages[i].avatarFLG=true;
                }
            }
        }
        setRoom(roomS);
       
        
    }
    const scrollToBottomInit = () =>{
        if(room===null) return;
        messagesEndRef.current.scrollIntoView({ behavior:"auto",block: 'end', inline: 'start' });
    }
    
    const onKeyPress = async(e)=>{
        const {keyCode} = e;
        if(keyCode===13){
            e.preventDefault();
            if(messageInput.value===""){
                return;
            }
            e.target.value="";
            messageInput.onChange(e);
            try{
                
                let tempRoom = room;
                let tempRoomId= tempRoom.id;
                if(tempRoomId.includes("createRoom")){
                    const {data:{createRoom}} = await createRoomMutation({variables:{toId:tempRoom.participantA.id,text:messageInput.value}});
                    tempRoom=createRoom;
                    tempRoom.messages=[];
                    let tempListData = listData;
                    const idx=tempListData.seeRooms.findIndex(item=>{          
                        return (item.id===tempRoomId);
                    });
                   tempListData.seeRooms[idx] = {...tempRoom}
                    setListData(previous=>tempListData);
                } 
                const {data:{sendMessage}} = await sendMessageMutation({variables:{roomId:tempRoom.id, text:messageInput.value,toId:toId}})
                tempRoom.messages.push({...sendMessage})
                setRoom({...tempRoom});
            }catch(e){
                console.log(e);
                toast.error("Can't send a meesage");
            }
        }
    }

    return (
        <MessagePresenter setListData={setListData} newMessages={newMessages} messagesEndRef={messagesEndRef} onKeyPress={onKeyPress} messageInput={messageInput}onRoomClick={onRoomClick} selectedRoom={room} listLoading={listLoading} listData={listData}/>
    )
}