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

  datePiped!: string | null;
  urlRegex!: RegExp;
  taskFormGroup!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
              private router : Router,
              private taskService: TaskService){}
  
  ngOnInit(): void {
    this.taskFormGroup = this.fb.group({
        date: [null, [Validators.required]],
        start: [null, [Validators.required]],
        end: [null, [Validators.required]],
        name: [null, [Validators.required]],
        description: [null]
    });
  }

  get f() { return this.taskFormGroup.controls; }

  onAddTask(){
    this.submitted = true;
    console.log(this.taskFormGroup.value);
    if(this.taskFormGroup.valid){
      this.taskService.addTask(this.taskFormGroup.value).subscribe(
        {
          next: () => {
            console.log(this.taskFormGroup.value);
            console.log("Task added")
            this.router.navigate(["day"]);
          },
          error: () => {
            console.log("Il y a une erreur lié à la requete")
          }
        }
      );
      console.log(this.taskFormGroup.value);
    }
    else{
      console.log("Invalid form");
    }
  }

  //ELECTRON binding
  changeWindows(){
    console.log(this.taskService.getTime());
    this.taskFormGroup.controls['start'].setValue(this.taskService.getTime());
    this.taskFormGroup.controls['date'].setValue(this.taskService.getDatePiped());
    this.taskFormGroup.controls['end'].setValue(0);
    this.datePiped = this.taskService.getDatePiped();
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
