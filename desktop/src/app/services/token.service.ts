import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  isConnected$ = new BehaviorSubject<boolean>(false)

  constructor(private router: Router) { }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  isLogged(): boolean {
    const token = localStorage.getItem('token');

    if(token){
      this.isConnected$.next(true)
    }
    return !! token;
  }

  getToken(): string | null{
    return localStorage.getItem('token');
  }

  clearToken(): void{
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
