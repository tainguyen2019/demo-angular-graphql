import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { MatDialog } from '@angular/material/dialog';

import { COMPLETE_TODO, DELETE_TODO, GET_TODOS } from 'src/app/graphql/todo';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';

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

  @Input() enableActions: boolean = true;
  @Input() enablePaginator: boolean = true;

  private querySubscription: Subscription | undefined;

  constructor(private apollo: Apollo, public dialog: MatDialog) {}

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

  deleteTodo(todoId: string): void {
    this.apollo
      .mutate({
        mutation: DELETE_TODO,
        variables: {
          id: todoId,
        },
      })
      .subscribe(
        ({ data }) => {
          console.log(`delete todo response`, data);
        },
        (error) => {
          console.log('there was an error sending the query', error);
        }
      );
  }

  completeTodo(todoId: string): void {
    this.apollo
      .mutate({
        mutation: COMPLETE_TODO,
        variables: {
          id: todoId,
          input: {
            completed: true,
          },
        },
      })
      .subscribe(
        ({ data }) => {
          console.log(`delete todo response`, data);
        },
        (error) => {
          console.log('there was an error sending the query', error);
        }
      );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      data: {
        id: `${this.totalItems! + 1}`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  createTodo(): void {
    this.openDialog();
  }
}
