import { gql } from '@apollo/client';

const getUserFirstName = gql`
    query($id: ID!){
        getUserInfo(id: $id){
            first
        }
    }
`


export {getUserFirstName}