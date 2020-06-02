import React from 'react';
import {gql} from "apollo-boost";
import styled,{ThemeProvider} from "styled-components" ;
import { HashRouter as Router} from "react-router-dom";
import GlobalStyles from "../Styles/GloabalStyles";
import Theme from '../Styles/Theme';
import AppRouter from './Routes';
import { useQuery } from 'react-apollo-hooks';
import Footer from './Footer';
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';

const QUERY = gql`
  {
    isLoggedIn @client
  }
`

const Wrapper = styled.div`
  padding-top:6rem;
  margin: 0 auto;
  max-width:${props=> props.theme.maxWidth};
  width:100%;
`;

export default () => {
  const {data:{isLoggedIn}} = useQuery(QUERY);
  
  return(
    <ThemeProvider theme={Theme}>
      <>
      <GlobalStyles />
      <Router>
        <>
        {isLoggedIn&&<Header/>}
        <Wrapper>
          <AppRouter isLoggedIn={isLoggedIn}/>
          <Footer /> 
        </Wrapper>
        </>
      </Router>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT}/>
      </>
    </ThemeProvider>
    );
}