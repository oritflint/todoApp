import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {NgForm} from '@angular/forms';
import { Itodo } from '../../models/todo.interface';
import { TodoService } from 'src/app/services/todo.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss']
})
export class NewTodoComponent {

  @ViewChild('f') form: NgForm;
  constructor(public dialogRef: MatDialogRef<NewTodoComponent>, public dialog: MatDialog, public todoService: TodoService) { }

  // closeDialog() {
  //   this.dialogRef.close('Pizza!');
  // }

  public onNewTodoSubmit(): void {

    if (this.form.valid){

        const srcForm = this.form.form.value
        const newTodo: Itodo = {
          id:uuidv4 (),
          title: srcForm.title,
          description: srcForm.description,
          isCompleted:false,
          isArchived:false,
          endDate: srcForm.date,
          selected: true
        };

        this.todoService.addNewTodo(newTodo)
          debugger
        this.dialog.closeAll();
        console.log("onsubmit:")
        console.log(this.form)
      }
    }

}
function uuid(): number {
  throw new Error('Function not implemented.');
}

