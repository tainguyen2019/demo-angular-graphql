import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Apollo } from 'apollo-angular';

import { CREATE_TODO } from 'src/app/graphql/todo';

export interface DialogData {
  id: string;
  title: string;
}

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.scss'],
})
export class TodoDialogComponent implements OnInit {
  formData: any;

  constructor(
    private apollo: Apollo,
    public dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.formData = { ...data };
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    let { id, title } = this.formData;
    title = title.trim();
    if (!title) {
      this.formData = { ...this.formData, title };
    }

    if (title) {
      this.apollo
        .mutate({
          mutation: CREATE_TODO,
          variables: {
            id,
            input: { title, completed: false },
          },
        })
        .subscribe(
          ({ data }) => {
            console.log(`create todo response`, data);
            this.dialogRef.close();
          },
          (error) => {
            console.log('there was an error sending the query', error);
            this.dialogRef.close();
          }
        );
    }
  }
}
