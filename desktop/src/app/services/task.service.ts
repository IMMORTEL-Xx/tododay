import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environements/environement';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  private url : string = environment.url;
  tasks: Task[] = [];
  
  
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url + 'task')
  }

  // PAS FINI
  getAllTasksByDay(date: String | null): Observable<Task[]> {
    return this.http.get<Task[]>(this.url + 'task/' + date)
  }
  //

  addTask(task: Task): Observable<Task[]> {
    return this.http.post<Task[]>(this.url + 'task', task)
  }
  
}

