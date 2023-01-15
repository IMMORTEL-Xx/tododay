import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../models/task.model'
import { TaskService } from '../services/task.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  tasks!: Task[];
  
  date = new FormControl(new Date()).value;
  date1 = new Date();
  
  constructor(private taskService: TaskService){}

  ngOnInit() : void{
    this.taskService.getAllTasks().subscribe((res: any) =>{
      console.log(res)
      this.tasks = res
    });
  }

  changeDate() {
    console.log(this.date);
    // let newDate = new Date("2000-01-12T00:00:00");
    // this.date.setValue(newDate);
    // console.log(this.date.value);
  }

  
}
