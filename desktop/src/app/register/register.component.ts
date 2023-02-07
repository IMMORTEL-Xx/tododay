import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  
  user!: User[];
  urlRegex!: RegExp;
  registerFormGroup!: FormGroup;
  submitted = false;
  hide = true;
  hide2 = true;
  keyPress = false;
  emailExist = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private registerService: RegisterService) { }
  
  ngOnInit(): void {
    this.urlRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$/;
    this.registerFormGroup = this.fb.group({
        email: [null, [Validators.required, Validators.pattern(this.urlRegex)]],
        password: [null, [Validators.required, Validators.minLength(3)]],
        confirmPassword: [null, [Validators.required]]
      }
      ,{
        validator : this.matchValidator('password', 'confirmPassword')
      }
    );
  }

  get f() { return this.registerFormGroup.controls; }

  onRegister() {
    this.emailExist = false;
    this.submitted = true;
    if (this.registerFormGroup.valid) {
      this.registerService.register(this.registerFormGroup.value).subscribe(
        {
          next: () => {
            this.router.navigate(["login"]);
          },
          error: () => {
            this.emailExist = true;
            setTimeout(() =>  this.emailExist = false , 4000);
            console.log("email exist " + this.emailExist);
          }
        }
      );
      console.log(this.registerFormGroup.value);
    }
    else {
      console.log("Invalid form");
    }
  }

  matchValidator(password: string, confirmPassword: string){
    return (formGroup: FormGroup) => {
      const passwordCtrl = formGroup.controls[password];
      const confirmPasswordCtrl = formGroup.controls[confirmPassword];

      if(confirmPasswordCtrl.errors && confirmPasswordCtrl.errors['matchValidator']) {
        return
      }

      if(passwordCtrl.value!== confirmPasswordCtrl.value) {
        confirmPasswordCtrl.setErrors({confirmedValidator: true})
      }
      else{
        confirmPasswordCtrl.setErrors(null);
      }
    }
  }

  focusNextInput(event: Event) {
    event.preventDefault();
    [this.hide, this.hide2] = [true, true];
    this.passwordInput.nativeElement.focus();
  }

  keyDown(event: Event, text: string){
    [this.hide, this.hide2] = [true, true];

    if(text == 'register'){
      event.preventDefault();
    }

    this.keyPress = true;
  }

  keyUp(text: string) {
    [this.hide, this.hide2] = [true, true];

    if (this.keyPress) {
        if(text == 'register'){
          this.onRegister()
        }
        this.keyPress = false;
    }
  }
}
