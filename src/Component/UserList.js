import React from "react";
import styled from "styled-components";
import FatText from "./FatText";
import Avatar from "./Avatar";
import FollowButton from "./FollowButton";
import { Link } from "react-router-dom";

const Container = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    height:100%;
    border-radius:5px;
`;

const Header = styled.header`
    ${props=>props.theme.whiteBox}
    height:45px;
    display:flex;
    justify-content:center;
    align-items:center;
    top:0;
    width:100%;
    border-radius:5px;
`;

const Users = styled.div`
    margin:5px 0px;
    height:100%;
    width:auto;
    display:flex;
    flex-direction:column;
    overflow-y:scroll;

`;
const User = styled.div`
    margin:7px 0px;
    margin-left:10px;
    display:flex;
    width:auto;
    height:55px;
`;
const UserInfo = styled.div`
    display:flex;
    flex-direction:column;
    width: 240px;
    margin-left:10px;

`;

const Bio = styled.span`
    color:${props=>props.theme.lightGreyColor};
`;
const ButtonWrapper = styled.span`
    width:75px;
`;

const ProfileLink = styled(Link)`
    color:black;
    text-decoration:none;
`;

export default ({type,users}) => {
    console.log(users);
    return(
        <Container>
            <Header>
                <FatText text={type} />
            </Header>
            <Users>
                {users.map(user=>(
                    <User key={user.id}>
                        <Avatar size="sm" url={user.avatar}/>
                        <UserInfo>
                            <ProfileLink to={user.username} >
                                <FatText text={user.username} />
                            </ProfileLink>
                            <Bio>{user.bio}</Bio>
                        </UserInfo>
                        <ButtonWrapper>
                            <FollowButton isFollowing={user.amIFollowing} id={user.id} />
                        </ButtonWrapper>
                    </User>
                ))}
            </Users>
        </Container>
    );
}