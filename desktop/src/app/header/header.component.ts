import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  connected!: boolean;
  
  constructor(private tokenService: TokenService){}

  ngOnInit(): void {
    this.tokenService.isConnected$.subscribe(
      {
        next:(status : boolean)=>{
          this.connected= status;
        }
      });
  }


  logout(){
    this.tokenService.clearToken();
    this.connected = false;
  }
}
