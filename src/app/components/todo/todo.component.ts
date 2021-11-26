import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';

const GET_TODOS = gql`
  query TodoQuery($options: PageQueryOptions) {
    todos(options: $options) {
      data {
        id
        title
        completed
        user {
          name
        }
      }
      meta {
        totalCount
      }
    }
  }
`;

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit, OnDestroy {
  loading = true;
  todos: any;
  totalItems: number | undefined;
  page = 1;
  limit = 9;

  private querySubscription: Subscription | undefined;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.getTodos();
  }

  ngOnDestroy() {
    if (this.querySubscription) this.querySubscription.unsubscribe();
  }

  handlePageChange(event: any): void {
    this.page = event;
    this.getTodos();
  }

  getTodos() {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: GET_TODOS,
        variables: {
          options: {
            paginate: {
              page: this.page,
              limit: this.limit,
            },
          },
        },
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.todos = data.todos.data;
        this.totalItems = data.todos.meta.totalCount;
      });
  }
}
