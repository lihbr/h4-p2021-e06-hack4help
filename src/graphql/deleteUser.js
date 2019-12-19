import gql from "graphql-tag";

export const DeleteUserMutation = gql`
  mutation DeleteUserMutation($id: String!) {
    deleteUser(id: $id) {
      id
    }
  }
`;
