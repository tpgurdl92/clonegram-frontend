import React from "react";
import {withRouter} from "react-router-dom";
import SearchPresenter from "./SearchPresenter";
import { useQuery } from "react-apollo-hooks";
import { SEARCH } from "./SearchQueries";

export default withRouter(({location:{search}})=>{
    const term = search.split("=")[1];
    console.log(term);
    const result = useQuery(SEARCH,{
        skip:(term ===""||term===undefined),
        variables:{
            term:term,
            action:"TERM"
        }
    });
    const {data, loading} =result;
    console.log(result);
    
    return <SearchPresenter searchTerm={term} loading={loading} data={data}/>;
    
});

