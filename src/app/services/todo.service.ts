import {Observable,  BehaviorSubject, Subject} from 'rxjs'
import { Injectable } from '@angular/core';
import { Itodo } from '../models/todo.interface';
import { ApiService } from './apiService.service';

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

  constructor(private apiService:ApiService) { }

  // private _todosSubject: BehaviorSubject<Array<Itodo>> = new BehaviorSubject(this.mock);
  // private _singleTodoSubject: BehaviorSubject<Itodo> = new BehaviorSubject(this.mock[0]);

  private _todosSubject: BehaviorSubject<Array<Itodo>> = new BehaviorSubject(this.todos);
  private _singleTodoSubject: BehaviorSubject<Itodo> = new BehaviorSubject(this.todos.length ? this.todos[0] : null);


  //GET LIST
  public getTodos(): Observable<Array<Itodo>> {

    if(!this._todosSubject.value.length){

      let JSONtodoList: string = ""
      
      ////////FETCH DATA FROM LOCALSTORAGE//////////
      //JSONtodoList = localStorage.getItem("todoList")
      
      // if(JSONtodoList){
      //   const curList: Itodo[] = JSON.parse(JSONtodoList)

      //   let i: number = 0
      //   while (curList[i].isArchived) {i++}
      //   curList[i].selected=true

      //   for (let j=i+1; j<curList.length; j++) {
      //     if(curList[j].selected){
      //       curList[j].selected=false
      //       break
      //     }
      //   }

      //   this._singleTodoSubject.next(curList[i])
      //   this._todosSubject.next(curList);
      // }

      ////////FETCH DATA FROM DATABASE//////////
      this.apiService.getData().subscribe(data=>{
        JSONtodoList = JSON.stringify(data)
      
        if(JSONtodoList){
          const curList: Itodo[] = JSON.parse(JSONtodoList)
          
          debugger
          let i: number = 0
          while (curList[i].isArchived) {i++}
          if(curList.length>i)
            curList[i].isSelected=true

          for (let j=i+1; j<curList.length; j++) {
            if(curList[j].isSelected){
              curList[j].isSelected=false
              break
            }
          }

          this._singleTodoSubject.next(curList[i])
          this._todosSubject.next(curList);
        }
    })

  }

    return this._todosSubject.asObservable();
  }


  //GET CURRENT ITEM
  public getSingleTodo(): Observable<Itodo> {
    return this._singleTodoSubject.asObservable();
  }


  //SET CURRENT ITEM
  public setSingleTodo(todo: Itodo): void{
    this._singleTodoSubject.next(todo);
  }


  //ADD ITEM
  public addNewTodo(newTodo: Itodo): void{

    const curList: Itodo[] = this._todosSubject.value;
    curList.forEach(todo => {
      todo.isSelected=false
    });
    curList.push(newTodo);
    const JSONtodoList: string = JSON.stringify(curList)
    
    this._todosSubject.next(curList)
    this.setSingleTodo(newTodo)
    
    this.apiService.AddItem(newTodo).subscribe()

    //localStorage.setItem("todoList", JSONtodoList)
  }



  public updateTodo(todoId: string, action: string): void {
    const curList: Itodo[] = this._todosSubject.value;
    const todoIndex :number = curList.findIndex((singleTodo)=> singleTodo.id = todoId)

    curList[todoIndex][action] = true

    const JSONtodoList: string = JSON.stringify(curList)
    this._todosSubject.next(curList)

    debugger
    this.apiService.UpdateItem(todoId, curList[todoIndex])
    //localStorage.setItem("todoList", JSONtodoList)
  }

  public initSelected(){

  }
}
