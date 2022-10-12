import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss']
})
export class NewTodoComponent {

  constructor(public dialogRef: MatDialogRef<NewTodoComponent>) { }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }


}
