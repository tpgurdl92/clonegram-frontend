import {gql} from "apollo-boost";

export const RECOMMEND_FOLLOWING = gql`
    query friends{
        recommendFollowing{
            id
            avatar
            username
            amIFollowing
            itsMe
        }
    }
`;

export const RECOMMEND_FEED = gql`
    query feeds{
        recommendFeed{
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