import PropTypes from "prop-types";
import React from "react";
import {  Route, Switch,Redirect } from "react-router-dom";
import Feed from "../Routes/Feed";
import Auth from "../Routes/Auth";
import Explore from "../Routes/Explore";
import Profile from "../Routes/Profile";
import Search from "../Routes/Search";

const LoggedInRoutes = () => (
    <Switch>
        <Route exact path="/" component={Feed}/>
        <Route path="/explore" component={Profile}/>
        <Route path="/search" component={Search}/>
        <Route path="/:username" component={Profile} />    
        <Redirect from="*" to="/" />
    </Switch>
);

const LoggedOutRoutes = () => (
    <Switch>
        <Route exact path="/" component={Auth}/>
        <Redirect from="*" to="/" />
    </Switch>
)

const AppRouter = ({isLoggedIn}) => (isLoggedIn? <LoggedInRoutes /> : <LoggedOutRoutes />);

AppRouter.propTypes= {
    isLoggedIn:PropTypes.bool.isRequired
}
export default AppRouter;;