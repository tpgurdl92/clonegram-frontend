import React from "react";
import styled from "styled-components";
import {Link, useHistory} from "react-router-dom";
import ME from "../SharedQueries";
import Input from "./Input";
import useInput from "../Hooks/useInput";
import { Compass, HeartEmpty, Person,Logo } from "./Icons";
import { useQuery } from "react-apollo-hooks";

const Header = styled.header`
    width:100%;
    background-color:white;
    ${props=>props.theme.whiteBox};
    border:0;
    border-bottom:${props=>props.theme.boxBorder};
    margin-bottom:60px;
    display:flex;
    justify-content:center;
    align-items:center;
    padding:25px 0px;
    z-index:2;
`;

const HeaderWrapper = styled.div`
    width:100%;
    max-width:${props=>props.theme.maxWidth};
    display:flex;
`;

const HeaderColumn = styled.div`
    width:33%;
    text-align:center;
      &:first-child{
        margin-right:auto;
        text-align:left
    }
    &:last-child{
        margin-left:auto;
        text-align:right;
    }
`;

const SearchInput = styled(Input)`
    width:70%;
    background-color:${props=>props.theme.bgColor};
    padding:5px;
    font-size:14px;
    border-radius:3px;
    height:auto;
    text-align:center;
    &::placeholder{
        opacity:0.8px;
        font-weight:200;
    }
`;

const HeaderLink = styled(Link)`
&:not(:last-child){
    margin-right:30px;
}
`;

export default () => {
    const search = useInput("");
    const {data} = useQuery(ME);
    console.log(data);
    const history = useHistory();
    const onSearchSubmit = (e) => {
        e.preventDefault();
        history.push(`/search?term=${search.value}`);
    }
    return (
        <Header>
            <HeaderWrapper>
                <HeaderColumn>
                <Link to="/">
                    <Logo />
                </Link>            
                </HeaderColumn>
                <HeaderColumn>
                    <form onSubmit={onSearchSubmit}>
                    <SearchInput {...search} required={false} placeholder="Search"/>
                    </form>
                </HeaderColumn>
                <HeaderColumn>
                    <HeaderLink to="/explore">
                        <Compass/>
                    </HeaderLink>
                    <HeaderLink to="/notifications">
                        <HeartEmpty/>
                    </HeaderLink>     
                    {!data? <HeaderLink to="/#">
                        <Person/>
                    </HeaderLink> :<HeaderLink to={data.me.username}>
                        <Person/>
                    </HeaderLink>   }           
                </HeaderColumn>
                
            </HeaderWrapper>
        </Header>
    );
}