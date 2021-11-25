import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';

const GET_POSTS = gql`
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

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, OnDestroy {
  loading: boolean | undefined;
  posts: any;

  private querySubscription: Subscription | undefined;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: GET_POSTS,
        variables: {
          options: {
            paginate: {
              page: 1,
              limit: 5,
            },
          },
        },
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.posts = data.posts.data;
      });
  }

  ngOnDestroy() {
    if (this.querySubscription) this.querySubscription.unsubscribe();
  }
}
