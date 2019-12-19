import gql from "graphql-tag";

export const CreateUserMutation = gql`
  mutation CreateUserMutation($data: CreateUserInput!) {
    createUser(data: $data) {
      user {
        id
      }
    }
  }
`;
