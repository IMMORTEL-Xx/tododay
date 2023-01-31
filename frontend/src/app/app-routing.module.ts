import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DayComponent } from './day/day.component';
import { TaskComponent } from './task/task.component';
import { LoginGuard } from './guards/login.guard';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "day", component: DayComponent, canActivate: [LoginGuard]},
  {path: "task", component: TaskComponent, canActivate: [LoginGuard]},
  {path: "**", component: NotFoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
