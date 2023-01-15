import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user!: User[];
  urlRegex!: RegExp;
  userFormGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.urlRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$/
    this.userFormGroup = this.fb.group({
        email: [null, [Validators.required, Validators.pattern(this.urlRegex)]],
        password: [null, [Validators.required,Validators.minLength(5)]],
    });
  }
  
  handleLogin(){}
}
