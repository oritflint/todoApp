import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Itodo } from 'src/app/models/todo.interface';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @Input() todos: Array<Itodo> = []
  constructor(private todoService :TodoService) { }

  ngOnInit(): void {
    console.log("getSingleTodo", this.todoService.getSingleTodo())
    console.log("getTodos", this.todoService.getTodos())
  }


  public onItemClick(todo: Itodo): void{
    this.todos.forEach(item => {
      item.isSelected=false;
    });
    todo.isSelected=true;
    this.todoService.setSingleTodo(todo)
  }
}
