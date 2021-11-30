import { gql } from 'apollo-angular';

export const GET_POSTS = gql`
  query PostQuery($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
        body
      }
      meta {
        totalCount
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePostMutation($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      title
      body
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      body
    }
  }
`;
