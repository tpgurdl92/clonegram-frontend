import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { HeartFull,CommentFull } from "./Icons";
import { Link } from "react-router-dom";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";

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

export const PostCard  =({likeCount, commentCount, file}) => {

    return (
        
        <Container bg={file.url}>
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

    );
}

PostCard.propTypes = {
    likeCount:PropTypes.number.isRequired, 
    commentCount:PropTypes.number.isRequired, 
    file:PropTypes.object.isRequired
}

export default PostCard;