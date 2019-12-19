import gql from "graphql-tag";

export const UpdateUserMutation = gql`
  mutation UpdateUserMutation($id: String!, $data: UpdateUserInput!) {
    updateUser(id: $id, data: $data) {
      id
    }
  }
`;
