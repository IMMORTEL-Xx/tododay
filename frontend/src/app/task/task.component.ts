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
  timeLeft!: string;
  showCalendar = false;

  date = new Date();
  today = this.date.getDate();
  
  constructor(private taskService: TaskService){}


  ngOnInit() : void{
    this.taskService.getAllTasks().subscribe((res: any) =>{
      console.log(res);
      this.tasks = res;
    });
    this.timeLeftMidnight();
  }

  timeLeftMidnight(){
    const currentHour = this.date.getHours();
    const currentMinutes = this.date.getMinutes();

    const hoursLeft = 23 - currentHour;
    const minutesLeft = 60 - currentMinutes;

    if(minutesLeft < 60){
      this.timeLeft = `${hoursLeft} h ${minutesLeft} m`;
    }
    else{
      this.timeLeft = `${hoursLeft} h`;
    }
  }

  set dateSelected(value : Date) {
    
    if(value.getDate() != this.today ){
      this.timeLeft = "24 h"
      this.date = value;
      // this.timeLeft = new Date( 24, 0, 0).toString();
    }
    else{
      this.date = new Date();
      this.timeLeftMidnight();
    }
    this.showCalendar = !this.showCalendar;
  }

  addTask(){
    
  }

  
}
