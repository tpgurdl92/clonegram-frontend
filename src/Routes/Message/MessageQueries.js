import {gql} from 'apollo-boost';

export const NEW_MESSAGE = gql`
    subscription newMessage( $myId:String!){
        newMessage(myId:$myId){
            id
            text
            to{
                id
                username
                avatar
                itsMe
            }
            from{
                id
                username
                avatar
                itsMe
                
            }
            createdAt
            room{
                id
                participantA{
                    id
                    username
                    avatar
                    itsMe 
                }
                participantB{
                    id
                    username
                    avatar
                    itsMe 
                }
            }
        }
    }
`;

export const CREATE_ROOM = gql`
    mutation createRoom($toId:String $text:String){
            createRoom(toId:$toId, text:$text){
                id
            participantA{
                id
                username
                avatar
                itsMe
            }
            participantB{
                id
                username
                avatar
                itsMe
            }
            admissionA
            admissionB
            showMessageDateA
            showMessageDateB
            lastCheckTimeA
            lastCheckTimeB
            createdAt 
            updatedAt

            
        }
    }
`;

export const SEND_MESSAGE = gql`
    mutation sendMessage($roomId:String $text:String $toId:String){
        sendMessage(roomId:$roomId, text:$text, toId:$toId){
            
                id
                to{
                    id
                    username
                    avatar
                    itsMe
                }
                from{
                    id
                    username
                    avatar
                    itsMe
                }
                text
                createdAt
                room{
                    id
                }
            
            
            

        }
    }
`;

export const SEE_ROOMS = gql`
    query seeRooms{
        seeRooms{
            id
            participantA{
                id
                username
                avatar
                itsMe
            }
            participantB{
                id
                username
                avatar
                itsMe
            }
            admissionA
            admissionB
            showMessageDateA
            showMessageDateB
            lastCheckTimeA
            lastCheckTimeB
            messages{
                id
                to{
                    id
                    username
                    avatar
                    itsMe
                }
                from{
                    id
                    username
                    avatar
                    itsMe
                }
                text
                createdAt
                
            }
            createdAt 
            updatedAt

        }
    }
`;