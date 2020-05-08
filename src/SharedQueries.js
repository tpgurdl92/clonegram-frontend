import {gql} from "apollo-boost";

const ME = gql`
{
    me{
        username
    }
}
`;

export default ME;