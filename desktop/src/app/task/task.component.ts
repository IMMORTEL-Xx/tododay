import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  urlRegex!: RegExp;
  taskFormGroup!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
              private router : Router,
              private taskService: TaskService){}
  
  ngOnInit(): void {
    this.taskFormGroup = this.fb.group({
        date: [null, [Validators.required]],
        name: [null, [Validators.required]],
        start: [null, [Validators.required]],
        end: [null],
        distractions: this.fb.array([]),
        coins: [0],
        description: [null]
    });
  }

  get f() { return this.taskFormGroup.controls; }

  startGame(){

    this.taskFormGroup.controls['start'].setValue(new Date());
    this.taskFormGroup.controls['date'].setValue(this.taskService.getDatePiped());

    if (this.taskFormGroup.valid){
      this.taskService.setTaskFormGroup(this.taskFormGroup);
      this.router.navigate(["game"]);
      window.electronAPI.closeWindows();
    }
    else{
      console.log("Invalid form");
    }
  }
  
}
