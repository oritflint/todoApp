import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Itodo } from 'src/app/models/todo.interface';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription()
  public todos: Array<Itodo> = []
  constructor(private todoService :TodoService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.todoService.getTodos().subscribe((data)=>
      this.todos = data
      )
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  public onItemClick(todo: Itodo): void{
    this.todos.forEach(item => {
      item.selected=false;
    });
    todo.selected=true;
    this.todoService.setSingleTodo(todo)
  }
}
