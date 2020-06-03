import {gql} from "apollo-boost";

const ME = gql`
{
    me{
        id
        username
    }
}
`;

export default ME;