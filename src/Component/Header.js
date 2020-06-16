import React,{useState} from "react";
import styled from "styled-components";
import {Link, useHistory} from "react-router-dom";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import ME from "../SharedQueries";
import Input from "./Input";
import useInput from "../Hooks/useInput";
import { Compass, HeartEmpty, Person,Logo,Message } from "./Icons";
import { useQuery } from "react-apollo-hooks";
import Alarm from "./Alarm";

const Header = styled.header`
    width:100%;
    background-color:white;
    ${props=>props.theme.whiteBox};
    border:0;
    border-bottom:${props=>props.theme.boxBorder};
    margin-bottom:60px;
    display:flex;
    justify-content:center;
    align-items:center;
    padding:15px 0px;
    z-index:2;
    top:0px;
    position:fixed;
    margin-bottom:80px;
`;

const HeaderWrapper = styled.div`
    width:100%;
    max-width:${props=>props.theme.maxWidth};
    display:flex;
`;

const HeaderColumn = styled.div`
    width:33%;
    text-align:center;
      &:first-child{
        margin-right:auto;
        text-align:left
    }
    &:last-child{
        margin-left:auto;
        text-align:right;
    }
`;

const SearchInput = styled(Input)`
    width:70%;
    background-color:${props=>props.theme.bgColor};
    padding:5px;
    font-size:14px;
    border-radius:3px;
    height:auto;
    text-align:center;
    &::placeholder{
        opacity:0.8px;
        font-weight:200;
    }
`;

const HeaderLink = styled(Link)`
display:inline;
&:not(:last-child){
    margin-right:30px;
}
`;
const HeaderButton = styled.div`
    margin-right:30px;
    display:inline;
    cursor:pointer;
`;


const FadingBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 3;
  opacity:1;
  background-color:transparent;
`;

const AlarmlModal = Modal.styled`
    width: 500px;
    height: 400px;;
    left:200px;
    top:70px;
    position:absolute;
    opacity: ${props => props.opacity};
    background-color:red;
`;
const Box=styled.div`
    
`;

const FlexBox= styled.div`
    display:inline-flex;
    flex-direction:column;
    justify-content:center;


    align-items:center;
`;

const Triangle = styled.div`
    height: 14px;
    position: absolute;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    width: 14px;
    margin-top:5px;
    margin-left:-22px;    
    box-shadow:1px 1px 3px ${props=>props.theme.darkGreyColor};
    
`;
export default () => {
    const [alarmShown, setAlarmShown] = useState(false);
    const search = useInput("");
    const {data} = useQuery(ME);
    console.log(data);
    const history = useHistory();

    const [isOpen, setIsOpen] = useState(false);
    const [opacity, setOpacity] = useState(0);
    
    const toggleModal =()=>{
        setIsOpen(!isOpen);
    }
    
    const onSearchSubmit = (e) => {
        e.preventDefault();
        history.push(`/search?term=${search.value}`);
    }
    return (
        
        <Header>
            <HeaderWrapper>
                <HeaderColumn>
                <Link to="/">
                    <Logo />
                </Link>            
                </HeaderColumn>

                <HeaderColumn>
                    <form onSubmit={onSearchSubmit}>
                    <SearchInput {...search} required={false} placeholder="Search"/>
                    </form>
                </HeaderColumn>
                
                
                <HeaderColumn>
                    <HeaderLink to="/message">
                        <Message />
                    </HeaderLink>
                    <HeaderLink to="/explore">
                        <Compass/>
                    </HeaderLink>
                       
                            <FlexBox>
                                <HeaderButton onClick={toggleModal}>
                                    <HeartEmpty/>
                                </HeaderButton>
                                {isOpen&&
                                
                                    <Box>
                                <FadingBackground onClick={toggleModal} >
                                </FadingBackground>
                                    <Triangle/>
                                    <Alarm/>
                                </Box>
                                }
                            </FlexBox>
                       
                    {!data&& <HeaderLink to="/#">
                        <Person/>
                    </HeaderLink> }
                    {data&&data.me&& 
                    <HeaderLink to={data.me.username}>
                        <Person/>
                    </HeaderLink>   }           
                </HeaderColumn>
                
            </HeaderWrapper>
        </Header>
               
    );
}