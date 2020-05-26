import React,{useState} from "react";
import styled from "styled-components";
import {useMutation} from "react-apollo-hooks";
import {TOGGLE_LIKE,ADD_COMMENT} from "./Post/PostQueries";
import TextareaAutosize from 'react-autosize-textarea';
import useInput from "../Hooks/useInput";
import {toast} from "react-toastify";
import Loader from "./Loader";
import Avatar from "./Avatar";
import FollowButton from "./FollowButton";
import FatText from "./FatText";
import { dateTransformer } from "../Utils";
import { HeartFull, HeartEmpty, Comment as CommentIcon, Save} from "./Icons";


const Container = styled.div`
     width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius:4px;
`;


const FilesContainer = styled.div`
    flex:5.6;
`
const File = styled.div`
    background-image:url(${props=>props.bg});
    background-size:cover;
    height:600px;
    background-repeat:no-repeat;
    background-position: center;
`;

const InfoContainer = styled.div`
    flex:4.4;
    height:600px;
    display:flex;
    flex-direction:column;
    

`

const Header = styled.header`
    
    ${props=>props.theme.whiteBox}
    height:4em;
    display:flex;
    align-items:center;
    justify-content:space-evenly;
`;

const ButtonCover = styled.div`
    width:75px;
`;

const CommentsBox = styled.div`
    ${props=>props.theme.whiteBox}
    display:flex;
    flex-direction:column;
    height:20em;
    overflow:scroll;
    ::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera*/
    }
`;
const CommentBox = styled.div`
    display:flex;
    margin:10px 10px;
    
`;
const Profile = styled.div`
    padding-left:5px;
    flex:1.5;
`;
const Comment = styled.div`
    flex:8.5;
    margin-left:10px;
    display:flex;
    flex-direction:column;
    
`;

const UserName = styled.a`
    font-weight:500px;
    margin-right:8px;
`;

const Meta = styled.div`
    padding:5px 0px;
    display:flex;
    flex-direction:column;
    span{
        display:flex;
        margin-left:10px;
    }
`;

const Timestamp = styled.span`
    font-weight:400;
    text-transform:uppercase;
    opacity:0.5;
    display:block;
    font-size:12px;
    margin:10px 0px;
    padding-bottom:10px;
`;

const Button = styled.span`
    cursor:pointer;
    
`;
const Buttons = styled.div`
    display:flex;
     ${Button}{
    
        margin-left:10px;
        &:last-child{
            margin-left:250px;
        }
    }
    margin-bottom:10px;

`;

const Textarea = styled(TextareaAutosize)`
    background-color:white;
    border:none;
    width:100%;
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

const CommentSection = styled.div`
    text-align:left;
    display:inline-block;
    word-break:break-all;
`;

const CommentSectionB = styled.div`
    display:flex;
`;


export default ({id, files,location,caption,user,comment,isLiked,likeCount,createdAt,updatedAt,commentCount,}) => {
    const [isLikedS, setIsLiked] = useState(isLiked);
    const [likeCountS, setLikeCount] = useState(likeCount);
    const [selfComments, setSelfComments] = useState([]);
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {variables:{postId:id}});
    const commentI = useInput("");
    const [addCommentMutation] = useMutation(ADD_COMMENT, {variables:{postId:id, text:commentI.value}});

    const toggleLike = async() => {
        if(isLikedS===true){
            setIsLiked(false);
            await updateLike();
            setLikeCount(likeCountS-1);
        }else{
            setIsLiked(true);
            await updateLike();
            setLikeCount(likeCountS+1);
        }
    }

    const updateLike = async() =>{
        try{
            await toggleLikeMutation()
        }catch{
            setIsLiked(!isLikedS);
            toast.error("Can't register like");
        }
    }

    const onKeyPress = async(e) => {
        const {keyCode} = e;
        if(keyCode===13){
            e.preventDefault();
            if(commentI.value===""){
                return;
            }
            e.target.value="";
            commentI.onChange(e);
            try{
                const {data:{addComment}}= await addCommentMutation();
                
                    console.log(addComment);
                    setSelfComments([...selfComments,addComment]);
            
                }catch(e){
                console.log(e.message);
                toast.error("Can't send comment");
            }
        }
        
    }

    return (
            <Container>
            <FilesContainer>
                  <File bg={files[0].url}/>  
            </FilesContainer>
            <InfoContainer>
                <Header>
                    <Avatar size={"sm"} url={user.avatar}/>
                    <FatText text={user.username} />
                    <ButtonCover>
                        <FollowButton id={user.id} isFollowing={user.amIFollowing}/>
                    </ButtonCover>
                </Header>
                <CommentsBox>
                    {comment.map(item=>(
                        <CommentBox key={item.id}>
                            <Profile>
                                <Avatar size={"sm"} url={item.user.avatar}/>
                            </Profile>
                            <Comment>
                                <CommentSection>
                                    <UserName>{item.user.username}</UserName>
                                    {item.text}
                                </CommentSection>
                                <CommentSection>
                                    <Timestamp>{dateTransformer(item.createdAt)}</Timestamp>
                                </CommentSection>
                            </Comment>
                        </CommentBox>
                    ))}
                    {selfComments.map(item => 
                        <CommentBox key={item.id}>
                            <Profile>
                                <Avatar size={"sm"} url={item.user.avatar}/>
                            </Profile>
                            <Comment>
                                <UserName text={item.user.username} />
                                <span>{item.text}</span>
                                <Timestamp>{dateTransformer(item.createdAt)}</Timestamp>
                            </Comment>
                        </CommentBox>)}
                </CommentsBox>
                <Meta>
                    <Buttons>
                        <Button onClick={toggleLike}>{isLiked? <HeartFull/> :<HeartEmpty/>}</Button>
                        <Button><CommentIcon/></Button>
                        <Button><Save/></Button>
                    </Buttons> 
                    <span><FatText text={likeCount===1? '1 like':`${likeCount} likes`}/></span>
                    <Timestamp>{dateTransformer(createdAt)}</Timestamp>
                </Meta>
                <Textarea placeholder={"Add a comment..."} value={commentI.value} onChange={commentI.onChange} onKeyDown={onKeyPress}/> 
            </InfoContainer>
            </Container>
            );
}