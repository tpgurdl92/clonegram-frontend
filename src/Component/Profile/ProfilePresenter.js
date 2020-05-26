import React, {useState} from "react";
import styled from "styled-components";
import {Helmet} from "react-helmet";
import Loader from "../Loader";
import Avatar from "../Avatar";
import FatText from "../FatText";
import FollowButton from "../FollowButton";
import PostCard from "../PostCard";
import Button from "../Button";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import UserList from "../UserList";

const Wrapper = styled.div`
    min-height:100vh;
`;
const Header = styled.header`
    display:flex;
    align-items:center;
    justify-content:space-evenly;
    width:80%;
    margin:0 ;
    margin-bottom:40px;

`;

const HeaderColumn = styled.header``;

const UsernameRow = styled.div`
    display:flex;
    align-items:center;
`;

const Username = styled.span`
    font-size:26px;
    margin-right:5px;
    margin-bottom:10px;
    display:block;
`

const Counts = styled.ul`
    display:flex;
    margin:15px 0px;
`;

const Count = styled.li`
    font-size:16px;
    &:not(:last-child){
        margin-right:10px;
    }
`;

const ClickableCount = styled(Count)`
    cursor:pointer;
`;

const FullName = styled(FatText)`
    font-size:14px;
`;


const Bio = styled.p`
    margin:15px 0px;
`;

const Posts =styled.div`
    display:grid;
    grid-template-columns: repeat(4, 200px);
    grid-template-rows:200px;
    grid-auto-rows:200px;
`;

const UserListModal = Modal.styled`
    width: 400px;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    opacity: ${props => props.opacity};
    transition: opacity linear 300ms;
    border-radius:5px;
`;
const FadingBackground = styled(BaseModalBackground)`
  opacity: ${props => props.opacity};
  transition: opacity linear 500ms;
`;

export default ({loading,data,logOut}) =>{

    const [isOpenA, setIsOpenA] = useState(false);
    const [opacityA, setOpacityA] = useState(0);
    const [isOpenB, setIsOpenB] = useState(false);
    const [opacityB, setOpacityB] = useState(0);
  
    function toggleModalA(e) {
      e.preventDefault();
      setIsOpenA(!isOpenA);
    }
    function toggleModalB(e) {
        e.preventDefault();
        setIsOpenB(!isOpenB);
      }
  
    function afterOpen(type) {
      setTimeout(() => {
          if(type==="A"){
            setOpacityA(1);
          }else{
              setOpacityB(1);
          }
      }, 10);
    }
  
    function beforeClose(type) {
      return new Promise(resolve => {
        if(type==="A"){
            setOpacityA(0);
        }else{
            setOpacityB(0);
        }
        setTimeout(resolve, 200);
      });
    }

    if(loading){
        return <Wrapper><Loader /></Wrapper>
    }else{
        console.log(data);
        const {seeUser:{
            id,
            avatar,
            username,
            firstName,
            lastName,
            fullName,
            amIFollowing,
            itsMe,
            bio,
            posts,
            following,
            followers,
            followersCount,
            followingCount,
            postsCount,
            }} = data;
            
            return (
            <ModalProvider backgroundComponent={FadingBackground}>
            <Wrapper>
                    <Helmet>
                        <title>
                            {username} | Clonegram
                        </title>
                    </Helmet>
                    <Header>
                        <HeaderColumn> 
                            <Avatar size="lg" url={avatar}/>
                            
                        </HeaderColumn>
                        <HeaderColumn>
                        <UsernameRow>
                            <Username>{username}</Username>
                            {itsMe? <Button onClick={logOut} text="Log Out"/>: <FollowButton id={id} isFollowing={amIFollowing}/>}
                        </UsernameRow>
                        <Counts>
                            <Count>
                                <FatText text={String(postsCount)}/> posts
                            </Count>
                            <ClickableCount onClick={toggleModalA}>
                                <FatText text={String(followersCount)}/> followers
                            </ClickableCount>
                            <ClickableCount onClick={toggleModalB}>
                                <FatText text={String(followingCount)}/> following
                            </ClickableCount>
                        </Counts>
                        <FullName text={fullName} />
                        <Bio>{bio}(</Bio>
                        </HeaderColumn>
                    </Header>
                    <Posts>
                        {posts && posts.map(post => (<PostCard key={post.id} {...post}/>))}
                    </Posts>
                    </Wrapper>
                    <UserListModal 
                         isOpen={isOpenA}
                         afterOpen={()=>afterOpen("A")}
                         beforeClose={()=>beforeClose("A")}
                         onBackgroundClick={toggleModalA}
                         onEscapeKeydown={toggleModalA}
                         opacity={opacityA}
                         backgroundProps={{ opacityA }}>
                        <UserList type="followers" users={followers} />
                    </UserListModal >
                    <UserListModal 
                         isOpen={isOpenB}
                         afterOpen={()=>afterOpen("B")}
                         beforeClose={()=>beforeClose("B")}
                         onBackgroundClick={toggleModalB}
                         onEscapeKeydown={toggleModalB}
                         opacity={opacityB}
                         backgroundProps={{ opacityB }}>
                        <UserList type="following" users={following}/>
                    </UserListModal>
                    </ModalProvider>);
        }
    
};