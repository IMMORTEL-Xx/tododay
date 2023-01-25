import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DayComponent } from './day/day.component';
import { TaskComponent } from './task/task.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "day", component: DayComponent, canActivate: [LoginGuard]},
  {path: "task", component: TaskComponent, canActivate: [LoginGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
