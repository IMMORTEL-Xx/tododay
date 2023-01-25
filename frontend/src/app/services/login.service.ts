import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environements/environement';
import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url : string = environment.url;

  constructor(private http: HttpClient) { }

  login(user: User): Observable<Token> {
    return this.http.post<Token>(this.url+"user/login", user);
  }
  
}
