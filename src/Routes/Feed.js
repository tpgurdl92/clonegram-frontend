import React from "react";
import {Helmet} from "react-helmet";
import styled from "styled-components";
import {gql} from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Component/Loader";
import Post from "../Component/Post";

const FEED_QUERY = gql`
{
    seeFeed{
        id
        location
        caption
        user{
            id
            username
            avatar
        }
        files{
            id
            url
        }
        likeCount
        isLiked
        comment{
            id
            text
            user{
                id
                username
            }
        }
        createdAt
    }
}
`;

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    min-height:60vh;
`;

export default () => {
    const {data, loading} = useQuery(FEED_QUERY);
    console.log(data);
    return(
        <Wrapper>
            <Helmet><title>Feed | Clonegram</title></Helmet>
            {loading &&<Loader/>}
            {!loading&& data &&data.seeFeed&& data.seeFeed.map(post => <Post key={post.id} id={post.id} user={post.user} files={post.files} comment={post.comment} likeCount={post.likeCount} isLiked={post.isLiked} createdAt={post.createdAt} caption={post.caption} location={post.location}/>)}
        </Wrapper>
    );
    
}