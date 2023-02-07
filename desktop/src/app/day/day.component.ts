import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TimePipe } from '../pipes/time.pipe';



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
  today: number = this.date.getDate();
  datePiped!: string | null;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    setInterval(() => {
      this.date = new Date();
    }, 1000);

    this.getAllTasks();
    this.getAllTasksByDay();
    this.timeLeftMidnight();
  }

  timeLeftMidnight() {
    const currentHour = this.date.getHours();
    const currentMinutes = this.date.getMinutes();

    const hoursLeft = 23 - currentHour;
    const minutesLeft = 60 - currentMinutes;

    if (minutesLeft < 60) {
      this.timeLeft = `${hoursLeft} h ${minutesLeft} m`;
    }
    else {
      this.timeLeft = `${hoursLeft} h`;
    }
  }

  set dateSelected(value: Date) {

    if (value.getDate() == this.today) {
      this.date = new Date();
      this.timeLeftMidnight();
    }
    else {
      this.timeLeft = "24 h";
      this.date = value;
      // this.timeLeft = new Date( 24, 0, 0).toString();
    }
    this.showCalendar = !this.showCalendar;
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe((res: any) => {
      this.taskList = res;
      console.log(this.taskList);
    });
  }

  getAllTasksByDay() {
    this.datePiped = this.taskService.getDatePiped();
    this.taskService.getAllTasksByDay(this.datePiped).subscribe((res: any) => {
      this.taskListByDay = res;
      console.log(this.taskListByDay);
    });
  }

  getTimeElapsed(startTime: Date, endTime: Date) {
    const diff = startTime.getTime() - endTime.getTime();

    const sec = Math.floor(diff / 1000);
    const min = Math.floor(sec / 60);
    const hour = Math.floor(min / 60);

    console.log(hour + ':' + min % 60 + ':' + sec % 60);
    return hour + ':' + min % 60 + ':' + sec % 60
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.taskListByDay, event.previousIndex, event.currentIndex);
  }

}
