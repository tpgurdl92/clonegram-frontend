import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types"
import FatText from "../../Component/FatText";
import Loader from "../../Component/Loader";
import UserCard from "../../Component/UserCard";
import PostCard from "../../Component/PostCard";

const Wrapper = styled.div`
    min-height:80vh;
    text-align:center;

`;

const Section = styled.div`
    display:grid;
    grid-gap:25px;
    grid-template-columns: repeat(4, 180px);
    grid-template-rows:200px;
    grid-auto-rows:200px;
    margin-bottom:50px;
`;

const PostSection =styled.div`
    display: grid;
  grid-template-columns: repeat(3, 300px);
  grid-template-rows:300px;
  grid-template-rows:300px;
`;
const PostCover =styled.div`
   width:300px;
`;

const SearchPresenter = ({searchTerm,loading, data})=>{
    if(searchTerm===undefined||searchTerm===""){
        return <Wrapper><FatText text={"Search For Something"}/></Wrapper>
    }else if(data && data.searchUser && data.searchPost){
        return (<Wrapper>
                    <Section>
                       {data.searchUser.length ===0 ?  
                       <FatText  text={"No Users Found"} />:
                       data.searchUser.map(user=> <UserCard key ={user.id} id={user.id} username={user.username} isFollowing={user.amIFollowing} url={user.avatar} itsMe={user.itsMe}/>)
                       }
                    </Section>
                    <PostSection>
                        {data.searchPost.length ===0 ?  
                       <FatText  text={"No Posts Found"} />:
                            data.searchPost.map(post=> 
                                <PostCover  key={post.id}>
                                    <PostCard  
                                    {...post}
                                    />
                                </PostCover>    
                            )
                       }
                    </PostSection>
                </Wrapper>)
    }else if(loading){
        return <Wrapper><Loader /></Wrapper>
    }else{
        return "Please search again"
    }
};

SearchPresenter.propTypes = {
    searchTerm:PropTypes.string,
    loading:PropTypes.bool
}

export default SearchPresenter;

