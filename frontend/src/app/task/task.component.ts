import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
              private router : Router,){}
  
  ngOnInit(): void {
    this.taskFormGroup = this.fb.group({
        date: [null, [Validators.required]],
        name: [null, [Validators.required]],
        start: [null, [Validators.required]],
        end: [null, [Validators.required]],
        description: [null]
    });
  }

  onSubmitForm(){
    this.submitted = true;
    if(this.taskFormGroup.valid){
      console.log(this.taskFormGroup.value);
      this.router.navigate(["profil"]);
    }
    else{
      console.log("Invalid form");
    }
  }
}
