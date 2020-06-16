import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Text = styled.span`
    font-weight:${props=>props.weight};
    color:${props=>props.color};
    font-size:${props=>props.size?props.size:null}px;
`;

const FatText = ({weight=600, color="black",text,size, className}) => <Text size={size} weight={weight} color={color} className={className}>{text}</Text>

FatText.propTypes = {
    text: PropTypes.string.isRequired
}

export default FatText;