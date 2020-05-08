import React from "react";
import styled from "styled-components";
import Button from "../Button";

export default ({isFollowing, onClick}) => <Button onClick={onClick} text={isFollowing? "Unfollow":"Follow"}/>