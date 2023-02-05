import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { LoginService } from '../services/login.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user!: User[];
  urlRegex!: RegExp;
  userFormGroup!: FormGroup;
  submitted = false;
  hide = true;
  keyPress = false;
  userNotExist = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private tokenService : TokenService,
              private loginService: LoginService){}

  ngOnInit(): void {
    this.urlRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$/
    this.userFormGroup = this.fb.group({
        email: [null, [Validators.required, Validators.pattern(this.urlRegex)]],
        password: [null, [Validators.required]],
    });
  }
  
  onLogin(){
    this.submitted = true;
    if(this.userFormGroup.valid){
      this.loginService.login(this.userFormGroup.value).subscribe(
        {
          next: (data: any) => {
            this.tokenService.saveToken(data.token);
            this.router.navigate(['day']);
          },
          error: (err: Error) =>{
            console.log(err);
            this.userNotExist = true;
          }
        }
      );
    }
    else{
      console.log("Invalid form")
    }
  }

  get f() { return this.userFormGroup.controls; }

  onEnterLogin(event: Event) {
      event.preventDefault();
      this.onLogin();
  }

  keyDown(event: Event) {
    this.hide = true;
    event.preventDefault();
    this.keyPress = true;
  }

  keyUp() {
    this.hide = true;
    if (this.keyPress) {
        this.onLogin();
        this.keyPress = false;
    }
}
}
