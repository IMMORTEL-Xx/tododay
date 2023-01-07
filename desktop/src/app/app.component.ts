import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('coin') gifElement!: ElementRef;

  audio = new Audio();
  coinHeight: string = "100";
  title: string = 'test-desktop-electron-app';
  playing: boolean = false;
  timeAnimation: number = 1370
  time: string = "00:00";
  sec: number = 0;
  min: number = 0;
  zeroSec: string = "0";
  coinSec: number = 300;
  secModulo!: number;
  progress: number = 0;
  progressSec: number = 100/this.coinSec;

  ngOnInit(): void {
    this.audio.src = './assets/coinSound.mp3';
  }

  playSound() {
    this.audio.play();
  }

  changeProgress(){
    (this.sec < this.coinSec) ? this.sec += 1 : this.sec = 1;
    (this.progress < 100) ? this.progress += this.progressSec : this.progress = this.progressSec;
    if(this.sec >= this.coinSec){
      this.playSound();
      this.runGif();
      
    }
    this.min = Math.floor(this.sec/60);
    this.secModulo = this.sec % 60;
    (this.secModulo < 10) ? this.zeroSec=`0${this.secModulo}` : this.zeroSec=`${this.secModulo}`;
    this.time = `0${this.min}:${this.zeroSec}`;
  }

  changeTitle(text: string): void {
    window.electronAPI.setTitle(text);
    window.electronAPI.setXPosition(300);
  }
  
  runGif(){
    this.gifElement.nativeElement.src = './assets/coin.gif';
    this.gifElement.nativeElement.style.display = 'block';
    
    setTimeout(()=>{
      this.gifElement.nativeElement.src = "";
      this.gifElement.nativeElement.style.display = "none";
    }, (this.timeAnimation));
  }

  start(){
    setInterval(()=>{
      this.changeProgress();
    }, (1000))
  }



  showMotivation(){
    // this.mainWindow.setPosition(300, 300);
  }

  addDistraction(){
    console.log("dac");
  }
  
}
