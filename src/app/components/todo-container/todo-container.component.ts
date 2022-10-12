import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Itodo } from 'src/app/models/todo.interface';
import { TodoService } from 'src/app/services/todo.service';
import { NewTodoComponent } from '../new-todo/new-todo.component';

@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.scss']
})
export class TodoContainerComponent implements OnInit, OnDestroy {
  
  private subscription: Subscription = new Subscription()

  public todos: Array<Itodo>;
  public todo: Itodo;

  constructor(private todoService :TodoService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.subscription.add(
      this.todoService.getTodos().subscribe((data)=>
      this.todos = data
        )
      )  

    this.subscription.add(

      this.todoService.getSingleTodo().subscribe((data)=>
        this.todo = data
        )
      )
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  
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

