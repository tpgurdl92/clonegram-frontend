import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { useMutation, useQuery } from "react-apollo-hooks";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";
import { toast } from "react-toastify";
import  ME  from "../../SharedQueries";
import { dateTransformer } from "../../Utils";

const PostContainer = ({id, user, files, likeCount, isLiked, comment, createdAt, caption, location}) => {
    console.log(isLiked);
    const [isLikedS, setIsLiked] = useState(isLiked);
    const [likeCountS, setLikeCount] = useState(likeCount);
    const [currentItem, setCurrentItem] = useState(0);
    const [selfComments, setSelfComments] = useState([]);
    const commentI = useInput("");
    const {data:meQuery} = useQuery(ME);
    
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {variables:{postId:id}});
    const [addCommentMutation] = useMutation(ADD_COMMENT, {variables:{postId:id, text:commentI.value}});
    const slide = () =>{
        const totalFiles = files.length;
        if(currentItem === totalFiles-1){
            setTimeout(()=>setCurrentItem(0),3000);
        }else{
            setTimeout(()=>setCurrentItem(currentItem+1),3000);
        }
    }
    useEffect(()=>{
        slide();
    },[currentItem]);

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

    const event = document.createEvent("HTMLEvents");
    event.initEvent("change",true,false);
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
    const dateFromNow = dateTransformer(createdAt);
    return (
        <PostPresenter 
        user={user}
        files={files} 
        likeCount={likeCountS}
        isLiked={isLikedS} 
        comment={comment} 
        createdAt={dateFromNow}
        newComment={commentI}
        setIsLiked={setIsLiked}
        setLikeCount={setLikeCount}
        location={location}
        caption={caption}
        currentItem={currentItem}
        toggleLike={toggleLike}
        onKeyPress={onKeyPress}
        selfComments={selfComments}
        caption={caption}
        />
    );
}

PostContainer.propTypes={
    id :PropTypes.string.isRequired,
    user :PropTypes.shape({
        id:PropTypes.string.isRequired,
        avatar:PropTypes.string,
        username:PropTypes.string.isRequired,
    }).isRequired,
    files :PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.string.isRequired,
        url:PropTypes.string.isRequired
    })).isRequired,
    likeCount :PropTypes.number.isRequired,
    isLiked :PropTypes.bool.isRequired,
    comment :PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.string.isRequired,
        text:PropTypes.string.isRequired,
        user:PropTypes.shape({
            id:PropTypes.string.isRequired,
            username:PropTypes.string.isRequired,
        }).isRequired,
    })),
    createdAt :PropTypes.string.isRequired,
    caption:PropTypes.string.isRequired,
    location:PropTypes.string.isRequired,
}

export default PostContainer;