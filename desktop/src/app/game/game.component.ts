import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnDestroy {
  //prendre la référence de l'élement de la balise image #coin
  @ViewChild('coin') gifElement!: ElementRef;

  audioCoin = new Audio();
  audioArrow = new Audio();
  srcCoin = './assets/coin.gif'
  srcArrow = './assets/arrow.gif'
  coinHeight: string = "100";
  arrowHeight: string = "100";
  title: string = 'test-desktop-electron-app';
  playing: boolean = false;
  timeAnimation: number = 1370;
  time: string = "00:00";
  sec: number = 0;
  min: number = 0;
  zeroSec: string = "0";
  coinSec: number = 10; //300
  secModulo!: number;
  progress: number = 0;
  progressSec: number = 100 / this.coinSec;
  coinInterval: any;
  deepBackground = false;
  taskFormGroup!: FormGroup;

  constructor(public router: Router,
    private taskService: TaskService) { }

  ngOnInit(): void {
    this.audioCoin.src = './assets/coinSound.mp3';
    this.audioArrow.src= './assets/error.mp3';
    this.taskFormGroup = this.taskService.getTaskFormGroup();
    this.start();
  }

  changeProgress() {
    (this.sec < this.coinSec) ? this.sec += 1 : this.sec = 1;
    (this.progress < 100) ? this.progress += this.progressSec : this.progress = this.progressSec;
    if (this.sec >= this.coinSec) {
      this.audioCoin.play();
      this.runGif(this.srcCoin);

    }
    this.min = Math.floor(this.sec / 60);
    this.secModulo = this.sec % 60;
    (this.secModulo < 10) ? this.zeroSec = `0${this.secModulo}` : this.zeroSec = `${this.secModulo}`;
    this.time = `0${this.min}:${this.zeroSec}`;
  }

  changeTitle(text: string): void {
    window.electronAPI.setTitle(text);
    window.electronAPI.setXPosition(300);
  }

  runGif(srcGif: string) {
    this.gifElement.nativeElement.src = srcGif;
    this.gifElement.nativeElement.style.display = 'block';

    setTimeout(() => {
      this.gifElement.nativeElement.src = "";
      this.gifElement.nativeElement.style.display = "none";
    }, (this.timeAnimation));
  }

  start() {
    this.coinInterval = setInterval(() => {
      this.changeProgress();
    }, (1000));
  }

  onAddDistraction() {
    this.audioArrow.play();
    this.runGif(this.srcArrow);
  }

  ngOnDestroy() {
    clearInterval(this.coinInterval);
    this.deepBackground = false;
  }

  onAddTask() {
    this.taskFormGroup.controls['end'].setValue(this.taskService.getTime());
    
    this.taskService.addTask(this.taskFormGroup.value).subscribe(
      {
        next: () => {
          this.router.navigate(["day"]);
          window.electronAPI.setWindows();
          console.log("Task added");
        },
        error: () => {
          console.log("Il y a une erreur lié à la requete");
        }
      }
    );
    console.log(this.taskFormGroup.value);
    
  }
}
