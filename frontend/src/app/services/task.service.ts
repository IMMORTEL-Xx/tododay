import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from'../models/task.model'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  tasks: Task[] = [];
  
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:3000/task')
  }
}

