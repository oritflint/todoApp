import { Component } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NewTodoComponent } from './components/new-todo/new-todo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todoApp';


  constructor(public dialog: MatDialog) {}


  public openDialog(): void {
    const dialogRef = this.dialog.open(NewTodoComponent, {
      width: '250px',
      // data: {name: this.name, animal: this.animal},
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); // Pizza!
    });
  }

  

}


