import {Observable,  BehaviorSubject, Subject} from 'rxjs'
import { Injectable } from '@angular/core';
import { Itodo } from '../models/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // public mock: Itodo[] = [
  //   {
  //     id:1,
  //     title:"Striped dolphin",
  //     description:"Stenella coeruleoalba",
  //     isCompleted:false,
  //     isArchived:false,
  //     endDate:"11/22/2021",
  //     selected: true
  //   },
  
  //   {
  //     id:2,
  //     title:"Black-collared barbet",
  //     description:"Lybius torquatus",
  //     isCompleted:false,
  //     isArchived:false,
  //     endDate:"4/18/2022",
  //     selected: false
  //   },
  
  //   {
  //     id:3,
  //     title:"Darwin ground finch",
  //     description:"Geospiza sp.",
  //     isCompleted:false,
  //     isArchived:false,
  //     endDate:"4/27/2022",
  //     selected: false
  //   },
  //   {
  //     id:4,
  //     title:"Nyala",
  //     description:"Tragelaphus angasi",
  //     isCompleted:false,
  //     isArchived:false,
  //     endDate:"5/14/2022",
  //     selected: false
  //   },
  //   {
  //       id:5,
  //       title:"Heron, black-crowned night",
  //       description:"Nycticorax nycticorax",
  //       isCompleted:false,
  //       isArchived:false,
  //       endDate:"5/24/2022",
  //       selected: false
  //   },
  //   {
  //         id:6,
  //       title:"Eastern white pelican",
  //       description:"Pelecans onocratalus",
  //       isCompleted:false,
  //       isArchived:false,
  //       endDate:"12/13/2021",
  //       selected: false
  //   },
  //   {
  //     id:7,
  //     title:"White-fronted bee-eater",
  //     description:"Merops bullockoides",
  //     isCompleted:false,
  //     isArchived:false,
  //     endDate:"3/26/2022",
  //     selected: false
  //   }
  // ]

  private todos: Itodo[] = []

  constructor() { }

  // private _todosSubject: BehaviorSubject<Array<Itodo>> = new BehaviorSubject(this.mock);
  // private _singleTodoSubject: BehaviorSubject<Itodo> = new BehaviorSubject(this.mock[0]);

  private _todosSubject: BehaviorSubject<Array<Itodo>> = new BehaviorSubject(this.todos);
  private _singleTodoSubject: BehaviorSubject<Itodo> = new BehaviorSubject(this.todos.length ? this.todos[0] : null);

  public getTodos(): Observable<Array<Itodo>> {
    if(!this._todosSubject.value.length){
      const JSONtodoList: string = localStorage.getItem("todoList")
      
      if(JSONtodoList){
        const curList: Itodo[] = JSON.parse(JSONtodoList)

        let i: number = 0
        while (curList[i].isArchived) {i++}
        curList[i].selected=true

        for (let j=i+1; j<curList.length; j++) {
          if(curList[j].selected){
            curList[j].selected=false
            break
          }
        }

        this._singleTodoSubject.next(curList[i])
        this._todosSubject.next(curList);
      }
    }
    return this._todosSubject.asObservable();
  }


  public getSingleTodo(): Observable<Itodo> {
    return this._singleTodoSubject.asObservable();
  }

  public setSingleTodo(todo: Itodo): void{
    this._singleTodoSubject.next(todo);
  }

  public addNewTodo(newTodo: Itodo): void{

    const curList: Itodo[] = this._todosSubject.value;
    curList.forEach(todo => {
      todo.selected=false
    });
    curList.push(newTodo);
    const JSONtodoList: string = JSON.stringify(curList)
    
    this._todosSubject.next(curList)
    this.setSingleTodo(newTodo)
    localStorage.setItem("todoList", JSONtodoList)
  }

  public updateTodo(todoId: string, action: string): void {
    const curList: Itodo[] = this._todosSubject.value;
    const todoIndex :number = curList.findIndex((singleTodo)=> singleTodo.id = todoId)

    curList[todoIndex][action] = true

    const JSONtodoList: string = JSON.stringify(curList)
    this._todosSubject.next(curList)
    localStorage.setItem("todoList", JSONtodoList)
  }

  public initSelected(){

  }
}
