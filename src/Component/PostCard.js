import React,{useState} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { HeartFull,CommentFull } from "./Icons";
import { Link } from "react-router-dom";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import PostCardDetail from "./PostCardDetail";

const Overlay = styled.div`
    background-color:rgba(0, 0 ,0,0.6);
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    opacity:0;
    transition: opacity .3s linear;
    svg {
        fill:white;
    }
`; 

const Container = styled.div`
    background-image: url(${props=>props.bg});
    background-size: cover;
    background-repeat:no-repeat;
    background-position: center;
    &:hover{
        ${Overlay}{
            opacity:1;
        }
    }
    cursor:pointer;
`;
   
const Number = styled.div`
    color:white;
    display:flex;
    align-items:center;
    &:first-child{
        margin-right:30px;
    }
`;

const NumberText = styled.span`
    margin-left:10px;
    font-size:16px;
`

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${props => props.opacity};
  transition: opacity linear 500ms;
`;

const PostDetailModal = Modal.styled`
    width: 800px;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    opacity: ${props => props.opacity};
    transition: opacity linear 500ms;
    
`;

export const PostCard  =(props) => {
    console.log(props);
    const {id,likeCount, commentCount, files} = props;
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
            <Container bg={files[0].url} onClick={toggleModal}>
                <Overlay>
                    <Number>
                        <HeartFull/>
                        <NumberText>{likeCount}</NumberText>
                    </Number>
                    <Number>
                        <CommentFull/>
                        <NumberText>{commentCount}</NumberText>
                    </Number>
                </Overlay>
            </Container>
            <PostDetailModal 
                isOpen={isOpen}
                afterOpen={afterOpen}
                beforeClose={beforeClose}
                onBackgroundClick={toggleModal}
                onEscapeKeydown={toggleModal}
                opacity={opacity}
                backgroundProps={{ opacity }}
            >
                <PostCardDetail {...props}/>
            </PostDetailModal>
        </ModalProvider>

    );
}

PostCard.propTypes = {
    likeCount:PropTypes.number.isRequired, 
    commentCount:PropTypes.number.isRequired, 
    files:PropTypes.array.isRequired
}

export default PostCard;