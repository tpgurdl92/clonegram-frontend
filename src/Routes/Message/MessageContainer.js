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
    const [myId, setMyId] = useState(null)
    const [toId, setToId] = useState("");
    const [newMessages, setNewMessages] = useState([]);
    const {data:newMessageData,error} = useSubscription(NEW_MESSAGE,{variables:{myId:"ck9nki5lq0abe0923k34zdof5"}});
    if(error){
        console.log(error);
    }
    const testEvent= (e) =>{
        console.log('ggg')
    }

    useEffect(()=>{console.log(listData)},[listData]);
    useEffect(()=>{
        console.log("newMessage");
        if(newMessageData!==undefined){
            const {newMessage} = newMessageData;
            console.log(newMessage);
            let tempListData =  listData;
            let idx=-1;
            console.log(tempListData);
            if(tempListData&&tempListData.seeRooms){
                idx= tempListData.seeRooms.findIndex((item)=>item.id===newMessage.room.id);
            }
            if(idx>-1){
                console.log("im in");
                console.log(tempListData.seeRooms[idx])
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
            console.log(tempListData);
            setListData(previous=>{return {...tempListData}});
            setTimeout(()=>scrollToBottomInit(),50);
        }
    },[newMessageData]);

    useEffect(()=>{
        console.log("refresh");
        console.log(roomData);
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
        setMyId(roomS.participantA.itsMe?roomS.participantA.id:roomS.participantB.id);
        
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
                    console.log(listData);
                    const {data:{createRoom}} = await createRoomMutation({variables:{toId:tempRoom.participantA.id,text:messageInput.value}});
                    tempRoom=createRoom;
                    tempRoom.messages=[];
                    let tempListData = listData;
                    console.log(createRoom);
                    const idx=tempListData.seeRooms.findIndex(item=>{
                        console.log(item.participantA.id);
                        console.log(item.participantB.id);
                        
                        return (item.id===tempRoomId);
                    });
                    console.log(tempListData);
                    console.log(idx);
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