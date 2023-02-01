import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../models/task.model'
import { TaskService } from '../services/task.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
  
  taskList!: Task[];
  taskListByDay!: Task[];
  timeLeft!: string;
  showCalendar = false;

  date = new Date();
  today = this.date.getDate();
  options = {year: 'numeric', day: 'numeric', month: 'numeric'};
  
  constructor(private taskService: TaskService,
              private datePipe: DatePipe){}

  ngOnInit() : void{
    console.log(this.datePipe.transform(this.date, "yyyy-MM-dd"));
    this.getAllTasks();
    this.getAllTasksByDay();
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
    
    if(value.getDate() == this.today ){
      this.date = new Date();
      this.timeLeftMidnight();
    }
    else{
      this.timeLeft = "24 h"
      this.date = value;
      // this.timeLeft = new Date( 24, 0, 0).toString();
    }
    this.showCalendar = !this.showCalendar;
  }

  getAllTasks(){
    this.taskService.getAllTasks().subscribe((res: any) =>{
      this.taskList = res;
      console.log(this.taskList);
    });
  }
  
  getAllTasksByDay(){
    this.taskService.getAllTasksByDay(this.datePipe.transform(this.date, "yyyy-MM-dd")).subscribe((res: any) =>{
      this.taskListByDay = res;
      console.log(this.taskListByDay);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.taskListByDay, event.previousIndex, event.currentIndex);
  }

  //ELECTRON binding
  closeWindows(){
    window.electronAPI.closeWindows();
  }

  // changeTitle(): void {
  //   window.electronAPI.setTitle("VAMOS A LA PLAYA");
  //   window.electronAPI.setXPosition(300);
  // }



}
