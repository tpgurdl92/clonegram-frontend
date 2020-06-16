import React,{useState}  from "react";
import {Helmet} from "react-helmet";
import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import Input from "../../Component/Input";
import Button from "../../Component/Button";
import Guide from "../../Component/Guide";

const Wrapper = styled.div`
    height:80vh;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
`;
const Box = styled.div`
    ${props=>props.theme.whiteBox}
    border-radius:0px;
    width:100%;
    max-width: 350px;
`;

const StateChanger = styled(Box)`
    text-align:center;
    padding:20px 0px;
`;
const GuideBox = styled(Box)`
    margin-top:16px;
    text-align:center;
    padding:20px 0px;
`
const GuideButton = styled.div`
    display:inline-block;
    border:none;
    color:${props=>props.theme.blueColor};
    cursor:pointer;
`;

const Link = styled.span`
    color:${props=>props.theme.blueColor};
    cursor:pointer;
`;

const Form = styled(Box)`
    padding:40px;
    padding-bottom:30px;
    margin-bottom:15px;
    form{
        width:100%;
        input {
            width:100%;
            &:not(:last-child){
                margin-bottom:7px;
            }
        }
        button{
            margin-top:15px;
        }
    }
`;

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${props => props.opacity};
  transition: opacity linear 500ms;
`;


const GuideModal = Modal.styled`
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
export default ({
    action,
    username,
    firstName,
    lastName,
    email,
    setAction,
    onSubmit,
    secret,
}) => {
    
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

    return (
        <ModalProvider backgroundComponent={FadingBackground}>
        <Wrapper>

            <Form>
                {action==="logIn"&&
                (<>
                <Helmet><title>Log In | Clonegram</title></Helmet>
                <form  onSubmit={onSubmit}>
                    <Input placeholder={"Email"} {...email} type="email"/>
                    
                    <Button text={"login"}/>
                </form></>)}
                {action==="signUp"&&
                (
                <> 
                <Helmet><title>Sign Up | Clonegram</title></Helmet>   
                    <form onSubmit={onSubmit}>
                    <Input placeholder={"First name"} {...firstName}/>
                    <Input placeholder={"Last name"} {...lastName}/>
                    <Input placeholder={"Email"} {...email} type="email"/>
                    <Input placeholder={"Username"} {...username}/>
                    
                    <Button text={"Sign up"}/>
                </form>
                </>)}
                {action==="confirm"&&
                (<>
                    <Helmet><title>Confirm | Clonegram</title></Helmet>
                    <form onSubmit={onSubmit}>
                    <Input placeholder="Paste your secret" required {...secret}/>
                    <Button text={"Confirm"}/>
                    </form>
                </>)}
            </Form>
            {action!=="confirm"&&(
                <StateChanger>
                {action==="logIn" ?(
                <>
                    Don't have an account? <Link onClick={()=>setAction("signUp")}>Sign up </Link>
                </>
                ):(
                <>
                    Have an account? <Link onClick={()=>setAction("logIn")}> Log in</Link>
                </>
                )}
                </StateChanger>
            )}
            {action==="logIn"&&
                <GuideBox>
                    please read this <GuideButton onClick={toggleModal}>guide</GuideButton>
                </GuideBox>}
        </Wrapper>
        <GuideModal
            isOpen={isOpen}
            afterOpen={afterOpen}
            beforeClose={beforeClose}
            onBackgroundClick={toggleModal}
            onEscapeKeydown={toggleModal}
            opacity={opacity}
            backgroundProps={{ opacity }}
        >
            <Guide toggleModal={toggleModal}/>
        </GuideModal>
        </ModalProvider>
            );
}