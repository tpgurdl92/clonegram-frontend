import React from "react";
import styled from "styled-components";
import {Helmet} from "react-helmet";
import Loader from "../Loader";
import Avatar from "../Avatar";
import FatText from "../FatText";
import FollowButton from "../FollowButton";
import PostCard from "../PostCard";

const Wrapper = styled.div`
    min-height:100vh;
`;
const Header = styled.header`
    display:flex;
    align-items:center;
    justify-content:space-evenly;
    width:80%;
    margin:0 ;
    margin-bottom:40px;

`;

const HeaderColumn = styled.header``;

const UsernameRow = styled.div`
    display:flex;
    align-items:center;
`;

const Username = styled.span`
    font-size:26px;
    margin-right:5px;
    margin-bottom:10px;
    display:block;
`

const Counts = styled.ul`
    display:flex;
    margin:15px 0px;
`;

const Count = styled.li`
    font-size:16px;
    &:not(:last-child){
        margin-right:10px;
    }
`;

const FullName = styled(FatText)`
    font-size:14px;
`;


const Bio = styled.p`
    margin:15px 0px;
`;

const Posts =styled.div`
    display:grid;
    grid-template-columns: repeat(4, 200px);
    grid-template-rows:200px;
    grid-auto-rows:200px;
`;

export default ({loading,data}) =>{

    if(loading){
        return <Wrapper><Loader /></Wrapper>
    }else{
        console.log(data);
        const {seeUser:{
            id,
            avatar,
            username,
            firstName,
            lastName,
            fullName,
            amIFollowing,
            itsMe,
            bio,
            posts,
            followersCount,
            followingCount,
            postsCount,
            }} = data;
            
            return <Wrapper>
                    <Helmet>
                        <title>
                            {username} | Clonegram
                        </title>
                    </Helmet>
                    <Header>
                        <HeaderColumn> 
                            <Avatar size="lg" url={avatar}/>
                            
                        </HeaderColumn>
                        <HeaderColumn>
                        <UsernameRow>
                            <Username>{username}</Username>
                            {!itsMe && <FollowButton id={id} isFollowing={amIFollowing}/>}
                        </UsernameRow>
                        <Counts>
                            <Count>
                                <FatText text={String(postsCount)}/> posts
                            </Count>
                            <Count>
                                <FatText text={String(followersCount)}/> followers
                            </Count>
                            <Count>
                                <FatText text={String(followingCount)}/> following
                            </Count>
                        </Counts>
                        <FullName text={fullName} />
                        <Bio>{bio}(</Bio>
                        </HeaderColumn>
                    </Header>
                    <Posts>
                        {posts && posts.map(post => (<PostCard key={post.id} likeCount={post.likeCount} commentCount={post.commentCount} file={post.files[0]}/>))}
                    </Posts>
                    </Wrapper>
        }
    
};