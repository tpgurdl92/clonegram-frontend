import React from "react";
import {gql} from "apollo-boost";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import Loader from "./Loader";
import Avatar  from "./Avatar";
import FatText from "./FatText";
import FollowButton from "./FollowButton";
import { dateTransformer } from "../Utils";

const Wrapper = styled.div`
    border-radius: 6px;
    position:fixed;
    width: 500px;
    height: 400px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    background-color:${props=>props.theme.whiteColor};
    margin-left:-440px;
    margin-top:10px;
    z-index:4;
    overflow-y:scroll;
    box-shadow:1px 1px 3px ${props=>props.theme.darkGreyColor};
    
`;
const Triangle = styled.div`
    width: 0;
    height: 0;
    top:0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 20px solid red;
`;
const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
    width:100%;
    height:100%;
`;
const ContentWrapper = styled.div`
    width:100%;
    &:after{
        margin-top:8px;
        margin-left:15%;
        content:'';
        display:block;
        border-bottom:1px solid ${prop=>prop.theme.lineGreyColor};
        width:80%;
    }
`;
const Content = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    margin-top:15px;
    justify-content:space-between;
`;
const EAvatar = styled(Avatar)`
    margin-left:15px;
`;
const Meta = styled.span`
    text-align:left;
    width:50%;
    margin-top:-8px;
    margin-left:-20px;
`;
const ButtonCover =styled.div`
    width:20%;
    margin-right:15px;
`;
const UserName = styled.div`
    color:black;
    font-weight:530;
    font-size:16px;
    padding-bottom:4px;
`;
const Date = styled.span`
    font-size:10px;
    color:${props=>props.theme.lightGreyColor};
    margin-left:20px;
`;
const ThinText =styled.span`
    font-size:12px;
    color:black;
    font-weight:450;
    display:inline-block;
`;

const ALARM = gql`
    query seeAlarm{
        seeAlarm{
            id
            type
            user{
                id
                username
                avatar
                amIFollowing
            }
            post{
                id
                files{
                    id
                    url

                }
            }
            createdAt

        }
    }
`;

export default () => {
    const {loading,data} =useQuery(ALARM);

    return(
        <Wrapper>
            {loading? 
                <Loader/>
                :
                <Container>
                    {data&&data.seeAlarm&&data.seeAlarm.map(item=>
                        <ContentWrapper key={item.id}>
                            <Content>
                                <EAvatar url={item.user.avatar} size={"sm"}/>
                                <Meta>
                                    <UserName>{item.user.username}</UserName>
                                    <ThinText>
                                        {item.type==="follow"&&"have followed you"  }
                                        {item.type==="like"&&"liked your post"  }
                                    </ThinText>
                                    <Date>{dateTransformer(item.createdAt)}</Date>
                                </Meta>
                                <ButtonCover>
                                    <FollowButton isFollowing={item.user.amIFollowing} id={item.user.id}/>
                                </ButtonCover>
                            </Content>
                        </ContentWrapper>
                    )}
                </Container>
            }            
        </Wrapper>
    );
}