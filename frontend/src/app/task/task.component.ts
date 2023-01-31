import { Component, OnInit } from '@angular/core';
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
        end: [null, [Validators.required]],
        description: [null]
    });
  }

  onAddTask(){
    this.submitted = true;
    if(this.taskFormGroup.valid){
      this.taskService.addTask(this.taskFormGroup.value).subscribe(
        {
          next: () => {
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
}
