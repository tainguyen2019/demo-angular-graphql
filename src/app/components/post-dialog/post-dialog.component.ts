import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Apollo } from 'apollo-angular';

import { UPDATE_POST, CREATE_POST } from 'src/app/graphql/post';

export interface DialogData {
  action: string;
  id: string;
  title: string;
  body: string;
}

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss'],
})
export class PostDialogComponent {
  formData: any;

  constructor(
    private apollo: Apollo,
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.formData = { ...data };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    let { id, title, body } = this.formData;
    title = title.trim();
    body = body.trim();
    if (!title) {
      this.formData = { ...this.formData, title };
    }
    if (!body) {
      this.formData = { ...this.formData, body };
    }
    if (title && body) {
      const mutationQuery =
        this.data.action === 'edit' ? UPDATE_POST : CREATE_POST;
      this.apollo
        .mutate({
          mutation: mutationQuery,
          variables: {
            id,
            input: { title, body },
          },
        })
        .subscribe(
          ({ data }) => {
            console.log(`${this.data.action} post response`, data);
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
