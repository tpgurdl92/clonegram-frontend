import React from "react";
import Swiper from "react-id-swiper";
import 'swiper/css/swiper.css'
import styled from "styled-components";
import Loader from "../../Component/Loader";
import FatText from "../../Component/FatText";
import UserCard from "../../Component/UserCard";
import PostCard from "../../Component/PostCard";

const MainContainer = styled.div`
    flex-direction:column;
    justify-content:center;

`;

const FollowingContainer = styled.div``;
const FollowingHeader = styled.div`
    display:flex;
`;
const FollowingContents = styled.div`
    margin-top:15px;
    max-height:200px;
`;

const FollowingContent = styled.div`
    margin-left:5px;
    margin-right:5px;
    width:180px;
    height:200px;
`;
const FeedContainer =styled.div`
    margin-top:30px;
`;
const FeedHeader =styled.div`
    display:flex;
`;
const FeedContents = styled.div`
    margin-top:15px;
    display:grid;
    grid-template-columns:repeat(3,300px);
    grid-template-rows:300px;
    grid-auto-rows:300px;
`;
const FeedContent = styled.div`
    width:300px;
`;

const Title = styled(FatText)`
    color:${props=>props.theme.darkGreyColor};
    font-size:25px;
`;

const Error = styled(FatText)`
    color:${props=>props.theme.blackColor};
    font-size:30px;
`;

export default ({dataFollowing,loadingFollowing,dataFeed,loadingFeed}) => {
    
    console.log(dataFeed);
    const swiperConf = {
        slidesPerView: 4.5,
        direction:"horizontal",
        spaceBetween: 0,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        
        },
        rebuildOnUpdate: true  ,
        observer: true,
        shouldSwiperUpdate:true,
      }

    return(
        <MainContainer>
            <FollowingContainer>
                <FollowingHeader>
                    <Title text={"Follow Recommendation"}/>
                    
                </FollowingHeader>
                <FollowingContents>
                    {loadingFollowing?
                        <Loader/>
                        :
                        dataFollowing&&dataFollowing.recommendFollowing&&
                        dataFollowing.recommendFollowing.length===0 ?
                            <Error text="there is no recommendation" /> 
                            :
                            <Swiper  {...swiperConf} shouldSwiperUpdate>
                                {dataFollowing.recommendFollowing.map(item=>
                                    <FollowingContent key={item.id} >
                                    <UserCard 
                                        id={item.id} 
                                        username={item.username} 
                                        isFollowing={item.amIFollowing} 
                                        url={item.avatar}
                                        itsMe={item.itsMe}
                                        reason={"following you"}
                                        />
                                    </FollowingContent>
                                )}
                            </Swiper>
                        }    
                </FollowingContents>
            </FollowingContainer>
            <FeedContainer>
                <FeedHeader>
                    <Title text="Hot Feed"/>
                </FeedHeader>
                <FeedContents>
                {loadingFeed?
                        <Loader/>
                        :
                        dataFeed&&dataFeed.recommendFeed&&
                        dataFeed.recommendFeed.length===0 ?
                            <Error text="there is no recommendation" /> 
                            :

                                dataFeed.recommendFeed.map(item=>
                                    <FeedContent>
                                        <PostCard key={item.id} {...item} />    
                                    </FeedContent>    
                                )
                        }    
                </FeedContents>
            </FeedContainer>
        </MainContainer>);
}