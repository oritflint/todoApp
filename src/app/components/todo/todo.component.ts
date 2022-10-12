import { Component, OnInit, OnDestroy } from '@angular/core';
import { Itodo } from 'src/app/models/todo.interface';
import { TodoService } from 'src/app/services/todo.service';
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {

  constructor(private todoService: TodoService) { }

  private subscription: Subscription = new Subscription()
  public todo: Itodo;

  ngOnInit(): void {
    this.subscription.add(

    this.todoService.getSingleTodo().subscribe((data)=>
      this.todo = data
      )
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onComplete(){
    this.todo.isCompleted=true;
  }

  onArchive(){
    this.todo.isArchived=true;
  }
}
