import { gql } from 'apollo-angular';

export const GET_DASHBOARD = gql`
  query DashboardQuery($options: PageQueryOptions) {
    todoData: todos(options: $options) {
      meta {
        totalCount
      }
    }
    postData: posts(options: $options) {
      meta {
        totalCount
      }
    }
    photoData: photos(options: $options) {
      meta {
        totalCount
      }
    }
    albumData: albums(options: $options) {
      meta {
        totalCount
      }
    }
  }
`;
