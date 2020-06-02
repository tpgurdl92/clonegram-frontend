import React, {useState, useEffect} from "react";
import styled from "styled-components";
import LinesEllipsis from 'react-lines-ellipsis'
import FatText from "../FatText";
import Avatar from "../Avatar";
import TextareaAutosize from 'react-autosize-textarea';
import { HeartFull, HeartEmpty, Comment as CommentIcon} from "../Icons";
import { Link } from "react-router-dom";

const Post = styled.div`
    ${props =>props.theme.whiteBox}
    width:100%;
    max-width:600px;
    margin-bottom:25px;
    user-select:none;
    a{
        color:inherit;
    }
`;

const Header = styled.header`
    padding:15px;
    display:flex;
    align-items:center;
`;

const Usercolumn = styled.div`
    margin-left:1opx;
`;

const Location = styled.span`
    display:block;
    margin-top:5px;
    font-size:12px;
`;

const Files = styled.div`
    position:relative;
    padding-top:100%;
    display:flex;
    flex-direction:column;
    align-items:stretch;
    flex-shrink:0;
    
`;
const File = styled.div`
    max-width:100%;
    width:100%;
    height:600px;
    position:absolute;
    top:0px;
    background-image:url(${props=>props.src});
    background-size:cover;
    background-position:center;
    opacity:${props=>props.showing? 1: 0};
    transition:opacity .5s linear;
`;
const Meta = styled.div`
    padding:15px;
`;
const Button = styled.span`
    cursor:pointer;
`;
const Buttons = styled.div`
     ${Button}{
        &:first-child{
            margin-right:10px;
        }
    }
    margin-bottom:10px;
`;

const Timestamp = styled.span`
    font-weight:400;
    text-transform:uppercase;
    opacity:0.5;
    display:block;
    font-size:12px;
    margin:10px 0px;
    padding-bottom:10px;
    border-bottom:${props=>props.theme.lightGreyColor} 1px solid;
`;

const Textarea = styled(TextareaAutosize)`
    background-color:white;
    border:none;
    width:90%;
    resize:none;
    ::placeholder{
        font-weight:600;
        color:${props=>props.theme.lightGreyColor};
    }
    font-size:14px;
    &:focus{
        outline:none;
    }
`;

const Comments = styled.ul`
    margin-top: 10px;
    
`;
const Comment = styled.li`
    vertical-align:top;
    margin-bottom: 7px;
    span{
        margin-right:5px;
    }
`;
const UsernameBox =styled.span`
    margin-right:8px;
    font-weight:550;
    font-size:18px;
    text-align:center;
`;
const EllipsisText = styled.span`
    word-break:${props=>props.isOpen===true?'break-all':'keep-all'};
    width:400px;
    overflow:hidden;
    line-height:22px;
`;
const EllipsisBox = styled.span`
    margin-left:5px;
    color:${props=>props.theme.lightGreyColor};
    cursor:pointer;
`;
const CommentText = styled.span`
    display:inline-block;
    white-space: nowrap;
    overflow:hidden;
    width:400px;
    margin-bottom:-5px;
`;
const OverFlowText = styled.span`
`;

const CommentEllipsis = ({item}) =>{
    const [isOpen, setIsOpen] = useState(false);
    const isOverFlow = item.text.length>40;
    const Ellipsis = () =>{
        const onClick=() =>{
            setIsOpen(!isOpen);
        }
        return (<EllipsisBox onClick={onClick}>{'더 보기'}</EllipsisBox>);
    }
    return (<>
                <EllipsisText isOverFlow={isOverFlow} isOpen={isOpen}>
                    <UsernameBox>{item.user.username}</UsernameBox>
                    {isOpen===false?
                        <CommentText>{item.text}</CommentText>
                        :
                        <OverFlowText>{item.text}</OverFlowText>
                    }
                    {isOverFlow&&!isOpen&&<Ellipsis/>}
                </EllipsisText>
            </>

    );
}

export default ({user:{username,avatar},location,files,isLiked,likeCount,createdAt,newComment,currentItem,toggleLike,onKeyPress,comment,selfComments,caption}) => (
    <Post>
        <Header>
            <Avatar size="sm" url={avatar} />
            <Usercolumn>
                <Link to={`/${username}`}>
                <FatText text={username}/> 
                </Link>  
                <Location>{location}</Location> 
            </Usercolumn>
        </Header>
        <Files>
            {files&&files.map((file,index) => <File key={file.id} id={file.id} src={file.url} showing={index===currentItem} />)}
        </Files>
        <Meta>
            <Buttons>
                <Button onClick={toggleLike}>{isLiked? <HeartFull/> :<HeartEmpty/>}</Button>
                <Button><CommentIcon/></Button>
            </Buttons>
            <FatText text={likeCount===1? '1 like':`${likeCount} likes`}/>
            {comment && (<Comments>
                {comment.map(item => 
                <Comment key={item.id}>
                   <CommentEllipsis item={item}/>
                </Comment>)}
                {selfComments.map(item => 
                <Comment key={item.id}>
                    <FatText text={item.user.username}/>
                    <LinesEllipsis text={item.text} maxLine='1'/>
                </Comment>)}
            </Comments>)}
            <Timestamp>{createdAt}</Timestamp>
            <form></form>
            <Textarea placeholder={"Add a comment..."} value={newComment.value} onChange={newComment.onChange} onKeyDown={onKeyPress}/>
        </Meta>
    </Post>
)