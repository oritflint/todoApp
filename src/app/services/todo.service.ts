import {Observable,  BehaviorSubject} from 'rxjs'
import { Injectable } from '@angular/core';
import { Itodo } from '../models/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public mock: Itodo[] = [
    {
      "title":"Striped dolphin",
    "description":"Stenella coeruleoalba",
    "isCompleted":true,
    "isArchived":false,
    "endDate":"11/22/2021"
    },
  
    {
      "title":"Black-collared barbet",
      "description":"Lybius torquatus",
      "isCompleted":false,
      "isArchived":false,
      "endDate":"4/18/2022"
    },
  
    {
      "title":"Darwin ground finch",
      "description":"Geospiza sp.",
      "isCompleted":false,
      "isArchived":true,
      "endDate":"4/27/2022"
    },
    {"title":"Nyala","description":"Tragelaphus angasi","isCompleted":false,"isArchived":true,"endDate":"5/14/2022"},
    {"title":"Heron, black-crowned night","description":"Nycticorax nycticorax","isCompleted":false,"isArchived":false,"endDate":"5/24/2022"},
    {"title":"Eastern white pelican","description":"Pelecans onocratalus","isCompleted":false,"isArchived":false,"endDate":"12/13/2021"},
    {"title":"White-fronted bee-eater","description":"Merops bullockoides","isCompleted":true,"isArchived":false,"endDate":"3/26/2022"}
  ]

  constructor() { }

  private _todoSubject: BehaviorSubject<Array<Itodo>>=new BehaviorSubject(this.mock)

  public getTodos(): Observable<Array<Itodo>> {
    return this._todoSubject.asObservable()
  }
}
