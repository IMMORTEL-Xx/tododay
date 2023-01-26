import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environements/environement';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private url : string = environment.url;
  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> { 
      return this.http.post<User>(this.url+"user/register", user);
    
  }
}
