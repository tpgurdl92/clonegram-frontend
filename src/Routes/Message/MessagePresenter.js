import React,{useState} from 'react'
import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import { Pen, Message } from '../../Component/Icons';
import FatText from '../../Component/FatText';
import Loader from '../../Component/Loader';
import Avatar from '../../Component/Avatar';
import {dateTransformer, dateTransformerForMSG} from "../../Utils";
import Button from '../../Component/Button';
import SearchUser from '../../Component/SearchUser';

const Wrapper = styled.div`
    width: 100%;
    height: 80vh;
    ${props=>props.theme.whiteBox}
    border-radius:4px;
    display:flex;
`;
const ListContainer = styled.div`
    flex:3.5;
    ${props=>props.theme.whiteBox}
    border-bottom-left-radius:4px;
    border-top-left-radius:4px;
`;
const RoomContainer = styled.div`
    flex:5.85;
    ${props=>props.theme.whiteBox}
    border-bottom-right-radius:4px;
    border-top-right-radius:4px;
    height:100%;
    
`;
const Header = styled.header`
    width:100%;
    height:60px;
    border-bottom:2px solid #e6e6e6;
    padding:0 20px;
    display:flex;
    flex:0 0 auto;
    align-items:center;
    justify-content:center; 
`;
const HeaderColumn = styled.div`
    margin:0px 100px;
`;
const RoomHeaderColumn= styled.div`
    margin:0px 12px;
`;
const ListBox = styled.div`
    padding :8px 0px;
    height:80%;
    overflow-y:auto;
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
`;
const ContentBox = styled.div`
    padding :8px 0px;
    overflow-y:auto;
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
    flex:0 1 470px;  
`;
const MsgBox = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
    width:100%;
`
const Footer = styled.footer`
    display:flex;
    justify-content:center;
    align-items:center;
    flex: 0 0 1;
`;

const ItemSpanBox = styled.span`
    cursor:pointer;
`;
const ItemDivBox = styled.div`
    margin: 8px 0px;
`;
const RoomInfo = styled.div`
    display:flex;
    padding:8px 14px;
    cursor:pointer;
    width:100%;
    
`;
const RommMeta = styled.div`
    display:flex;
    flex-direction:column;
    margin-left:12px;
`;
const UserName= styled.div`
`;
const LatestMessage = styled.div`
    margin-top:8px;
    color:${props=>props.theme.lightGreyColor};
`;
const MessageTime = styled.span`
    color:${props=>props.theme.lightGreyColor};
`;
const BeforeRoom = styled.div`
    display:flex;
    height:100%;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`
const MessageDate =styled.div`
    color:${props=>props.theme.lightGreyColor};
    margin:5px 0px;
`;
const MessageWrapper = styled.div`
    display:flex;
    width:100%;
    justify-content:flex-start;
`;
const AvatarBox =styled.div`
    width:24px;
    height:24px;
    margin:0px 12px;
    margin-top:5px;
    
`;
const MyMessageBox = styled.div`
    margin-left:auto;
    margin-right:12px;
    justify-self:flex-end;
    padding:10px 10px;
    margin-bottom:16px;
    background-color:${props=>props.theme.superLightGreyColor};
    border:1px solid ${props=>props.theme.lightGreyColor};
    border-radius:12px;
    
`;
const YourMessageBox = styled.div`
    margin:8px 12px;
    padding:10px 10px;
    border:1px solid ${props=>props.theme.lightGreyColor};
    border-radius:12px;
    text-align:center;
`;
const TextInputWrapper = styled.div`
    border:1px solid ${props=>props.theme.lightGreyColor};
    border-radius:20px;
    width:80%;
    height:40px;
`;
const Textarea = styled(TextareaAutosize)`
    background-color:white;
    border:1px solid ${props=>props.theme.lightGreyColor};
    border-radius:20px;
    width:90%;
    min-height:30px;
    max-height:90px;
    overflow-y:auto;
    resize:none;
    padding-left:10px;
    margin:5px 10px;
    ::placeholder{
        font-weight:600;
        color:${props=>props.theme.lightGreyColor};
    }
    font-size:18px;
    &:focus{
        outline:none;
    }
`;
const RoomWrapper =styled.div`
    height:100%;
    display:flex;
    flex-direction:column;
`;

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${props => props.opacity};
  transition: opacity linear 300ms;
  
`;

const SearchUserModal = Modal.styled`
    width: 400px;
    height: 360px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    opacity: ${props => props.opacity};
    transition: opacity linear 500ms;
    border-radius:10px;
    
`;
export default ({setListData,newMessages,messagesEndRef,onKeyPress,messageInput,onRoomClick,selectedRoom,listLoading,listData}) => {
    let messageDate =null;
    const [isOpen, setIsOpen] = useState(false);
    const [opacity, setOpacity] = useState(0);

    function toggleModal(e) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  
    function afterOpen() {
      setTimeout(() => {
        setOpacity(1);
      }, 10);
    }
  
    function beforeClose() {
      return new Promise(resolve => {
        setOpacity(0);
        setTimeout(resolve, 200);
      });
    }
    return(
        <ModalProvider backgroundComponent={FadingBackground}>
        <Wrapper>
                <ListContainer widthFlex={3.5}>
                    <Header>
                        <HeaderColumn >
                            <FatText text="Direct" />
                        </HeaderColumn>
                        
                        <ItemSpanBox onClick={toggleModal}><Pen /></ItemSpanBox>
                        
                    </Header>
                    <ListBox>
                        {listLoading?
                            <Loader/>
                        :<> 
                          
                            {listData&&listData.seeRooms&&listData.seeRooms.map(room=>
                                <RoomInfo key={room.id} onClick={()=>onRoomClick({room})}>
                                    <Avatar size="md" url={room.participantA.itsMe?room.participantB.avatar:room.participantA.avatar} />
                                    <RommMeta>
                                        <UserName>{room.participantA.itsMe?room.participantB.username:room.participantA.username}</UserName>
                                        <LatestMessage>
                                            {newMessages.length>0?
                                                newMessages[newMessages.length-1].text +" ・ "
                                                :
                                                room.messages.length>0?
                                                    room.messages[room.messages.length-1].text+" ・ "
                                                :
                                                ""
                                            }
                                            
                                            {room&&room.messages&&room.messages.length>0&&dateTransformerForMSG(room.messages[room.messages.length-1].createdAt)}
                                        </LatestMessage>
                                        
                                    </RommMeta>
                                </RoomInfo>)}
                            </>
                        }
                    </ListBox>
                </ListContainer>
                <RoomContainer widthFlex={5.5}>
                    
                        {!selectedRoom?
                            <BeforeRoom>
                                <ItemDivBox>
                                    <Message size={100}/>
                                </ItemDivBox>
                                <ItemDivBox>
                                    <FatText weight={500} size={40} color='black' text='My Message' />
                                </ItemDivBox>
                                <ItemDivBox>
                                    <FatText weight={450} size={30} color={props=>props.theme.lightGreyColor} text='Send your message'/>
                                </ItemDivBox>
                                <ItemDivBox>
                                    <Button text='Send Message' onClick={toggleModal} />
                                </ItemDivBox>
                            </BeforeRoom>
                        :
                        <RoomWrapper>
                            <Header>
                                <RoomHeaderColumn>
                                    <Avatar size="sm" url={selectedRoom.participantA.itsMe?selectedRoom.participantB.avatar:selectedRoom.participantA.avatar} />
                                </RoomHeaderColumn>
                                <UserName>{selectedRoom.participantA.itsMe?selectedRoom.participantB.username:selectedRoom.participantA.username}</UserName>
                            </Header>
                            <ContentBox>
                                {selectedRoom.messages.map(message=>{
                                    if(messageDate!==dateTransformerForMSG(message.createdAt)){
                                        messageDate = dateTransformerForMSG(message.createdAt);
                                        return(
                                            <MsgBox key={message.id}>
                                                <MessageDate >{messageDate}</MessageDate>
                                                <MessageWrapper >
                                                    <AvatarBox>{message.avatarFLG&&<Avatar size="sm" url={message.from.avatar}/>}</AvatarBox>
                                                {message.to.itsMe?
                                                    <YourMessageBox>{message.text}</YourMessageBox>
                                                :
                                                    <MyMessageBox>{message.text}</MyMessageBox>
                                                }
                                                </MessageWrapper>
                                            </MsgBox>
                                        );
                                    }
                                    return (
                                        <MessageWrapper key={message.id}>
                                                <AvatarBox>{message.avatarFLG&&<Avatar size="sm" url={message.from.avatar}/>}</AvatarBox>
                                            {message.to.itsMe?
                                                <YourMessageBox>{message.text}</YourMessageBox>
                                            :
                                                <MyMessageBox>{message.text}</MyMessageBox>
                                            }
                                            
                                        </MessageWrapper>
                                        
                                        
                                    );
                                })}
                                <div ref={messagesEndRef}/>
                            </ContentBox>
                            <Footer>
                                
                                <Textarea placeholder={"Write a message..."} value={messageInput.value} onChange={messageInput.onChange} onKeyDown={onKeyPress}/>
                                
                            </Footer>
                        </RoomWrapper>
                        }
                    
                </RoomContainer>
        </Wrapper>
        <SearchUserModal
            isOpen={isOpen}
            afterOpen={afterOpen}
            beforeClose={beforeClose}
            onBackgroundClick={toggleModal}
            onEscapeKeydown={toggleModal}
            opacity={opacity}
            backgroundProps={{ opacity }}
        >
            <SearchUser setListData={setListData}onRoomClick={onRoomClick}listData={listData}  toggleModal={toggleModal}/>
        </SearchUserModal >
        </ModalProvider>
    );

}
