import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "./Avatar"
import FatText from "./FatText";
import FollowButton from "./FollowButton";
import { Link } from "react-router-dom";

const Card =styled.div`
    ${props => props.theme.whiteBox}
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:20px;
`;

const EAvatar = styled(Avatar)`
    margin-bottom:15px;
`;

const ELink = styled(Link)`
    color:inherit;
    margin-bottom:10px;
`;

const Reason = styled.span`
    color:${props=>props.theme.darkGreyColor};
    font-weight:500;
    margin-bottom:15px;
`;

const UserCard = ({id, username, isFollowing, url,itsMe,reason=""}) => 
(<Card>
    <EAvatar  url={url} size={"md"}/>
    <ELink to ={`/${username}`} ><FatText text={username} /></ELink>
    <Reason >{reason}</Reason>
    {!itsMe && <FollowButton isFollowing={isFollowing} id={id} />}
</Card>);

UserCard.propTypes ={
    id:PropTypes.string.isRequired,
    username:PropTypes.string.isRequired,
    isFollowing:PropTypes.bool.isRequired,
    url:PropTypes.string.isRequired,
    itsMe:PropTypes.bool.isRequired,
    reason:PropTypes.string,
}

export default UserCard