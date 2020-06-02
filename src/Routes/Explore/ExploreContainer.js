import React from "react";
import {useQuery} from "react-apollo-hooks";
import ExplorePresenter from "./ExplorePresenter";
import {RECOMMEND_FEED,RECOMMEND_FOLLOWING} from "./ExploreQueries";


export default () =>{
    const {data:dataFollowing,loading:loadingFollowing} = useQuery(RECOMMEND_FOLLOWING);
    const {data:dataFeed,loading:loadingFeed} = useQuery(RECOMMEND_FEED);
    return (<ExplorePresenter dataFeed={dataFeed} loadingFeed={loadingFeed}dataFollowing={dataFollowing} loadingFollowing={loadingFollowing}/>);
}