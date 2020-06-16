import React from "react";
import styled from "styled-components";
import FatText from "../FatText";
import {Esc,BlueEsc} from "../Icons";
import Loader from "../Loader";
import Avatar from "../Avatar";
import Checkbox from '@material-ui/core/Checkbox';

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    width:100%;
    height:100%;
`;
const Header = styled.header`
    margin-top:8px;
    padding: 0px 8px;
    width:100%;
    height:30px;
    display:flex;
    justify-content:space-between;
    border-bottom: ${props=>props.theme.boxBorder};
`;
const ReceiverContainer = styled.div`
    display:flex;
    width:100%;
    height:120px;
    border-bottom: ${props=>props.theme.boxBorder};
`;
const ReceiverTitle = styled.div`
    flex:1.25;
    display:flex;
    align-items:center;
    padding:5px 15px;
    font-weight:650;
    font-size:15px;
`;
const ReceiverBox = styled.div`
    flex:8.75;
    display:flex;
    flex-direction:column;
    align-items:center;

`;
const SelectionContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    overflow-x:hidden;
    width:100%;
    min-height:205px;
    overflow-y:scroll;
`;
const Button =styled.div`
    cursor:pointer;
`;
const Input = styled.input`
    border:none;
`;
const UserColumn = styled.div`
    display:flex;
    width:100%;
    align-items:center;
    padding:7px 10px;
`;
const UserInfo = styled.div`
    display:flex;
    flex-direction:column;
    width:65%;
    margin:0px 10px;
`;
const EmptyBox = styled.div`
    overflow-y:scroll;
    height:85px;
    width:100%;  
`;
const UserNameCard = styled.div`
    display:inline-flex;
    color:${props=>props.theme.blueColor};
    background-color:${props=>props.theme.lightBlueColor};
    border-radius:5px;
    padding:5px 10px;
    margin:5px 7px;
`; 
export default ({createTempRoom,cancelCheck,recipients,handleCheckBox,loading, data, toggleModal,searchInput}) => {
    return (
    <Wrapper>
        <Header>
            <Button onClick={(e)=>toggleModal(e)}>
                <Esc size={16}/>
            </Button>
            <FatText text="New Message"/>
            <Button onClick={(e)=>{
                    createTempRoom();
                    toggleModal(e);
                    }   
                }>
                <FatText text="Next" color={"#3897f0"}/>
            </Button>
        </Header>
        <ReceiverContainer>
            <ReceiverTitle>{"To."}</ReceiverTitle>
            <ReceiverBox>
                {recipients.length===0?
                    <EmptyBox/>
                    :
                    <EmptyBox>
                        {recipients.map(item=>(
                            <UserNameCard key={item.id}>
                                {item.username}
                                &nbsp; &nbsp; 
                                <Button onClick={()=>cancelCheck(item)}>
                                    <BlueEsc />
                                </Button>
                            </UserNameCard>
                        ))
                        }
                    </EmptyBox>
                }
                <Input placeholder="Search..." {...searchInput}/>
            </ReceiverBox>
        </ReceiverContainer>
        <SelectionContainer>
            {searchInput.value===""?
                "please search"
            :
                loading?
                    <Loader/>
                    :
                    data&&data.searchUser&&data.searchUser.map(item=>
                        <UserColumn key={item.id}>
                            <Avatar size="sm" url={item.avatar} />
                            <UserInfo>
                                <FatText text={item.username}/>
                                <FatText text={item.bio}/>
                            </UserInfo>
                            <Checkbox checked={recipients.findIndex((i)=>i.id===item.id)>-1}color="primary" id={item.id} username={item.username} onChange={(e)=>handleCheckBox(e,item)}/>
                        </UserColumn>
                        
                        )
            }
        </SelectionContainer>
    </Wrapper>
    );
}