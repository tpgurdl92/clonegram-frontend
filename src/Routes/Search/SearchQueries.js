import {gql} from "apollo-boost";

export const SEARCH= gql`
    query searchPost($term:String!, $action:ACTIONS!){
        searchPost(term:$term, action:$action){
            id, 
            files{
                url
            },
            location,
            caption,
            user{
                id
                username
                avatar
                amIFollowing
            },
            comment{
                id
                text
                user{
                    avatar
                    username
                }
                createdAt
            },
            isLiked,
            likeCount,
            createdAt,
            updatedAt,
            commentCount,
        }
        searchUser(term:$term){
            id
            avatar
            username
            amIFollowing
            itsMe
        }
    }
`;

