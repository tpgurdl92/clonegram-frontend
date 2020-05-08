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
        posts {
            id
            files{
                url
            }
            likeCount
            commentCount
        }
        postsCount
    }
}
`;