import {gql} from "apollo-boost";

export const GET_USER= gql` 
query seeUser($username:String!){
    seeUser(username:$username){
        id
        avatar
        username
        firstName
        lastName
        fullName
        amIFollowing
        itsMe
        bio
        followersCount
        followingCount
        following{
            id
            avatar
            username
            bio
            amIFollowing
        }
        followers{
            id
            avatar
            username
            bio
            amIFollowing
        }
        posts {
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
        postsCount
    }
}
`;

export const EDIT_AVATAR = gql`
    mutation editUser($avatar:String!){
        editUser(avatar:$avatar){
            avatar
        }
    }
`;

export const LOG_OUT = gql`
    mutation logUserOut{
        logUserOut @client
    }

`;