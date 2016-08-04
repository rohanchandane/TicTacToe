import {Component} from '@angular/core';
import {Alert, NavController} from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  private currentUser: string;
  private positionArray: string[];
  private possibleWinningCombination: any[];
  private xUserMoves:number[];
  private oUserMoves:number[];
  private winner:string;
  private counter:number;
  private isXactive: boolean;
  private isOactive: boolean;



  constructor(private navCtrl: NavController) {
    this.initValues();
    this.possibleWinningCombination = [
      [1,2,3],
      [4,5,6],
      [7,8,9],
      [1,4,7],
      [2,5,8],
      [3,6,9],
      [1,5,9],
      [3,5,7]
    ];
  }

  initValues() {
    this.winner = null;
    this.currentUser = 'X';
    this.positionArray = [];
    this.xUserMoves = [];
    this.oUserMoves = [];
    this.counter = 0;
    this.isXactive = true;
    this.isOactive = false;
  }

  submitMove(event) {
    if(this.winner === null){
      this.positionArray[event.target.id - 1] = this.currentUser;

      if(this.currentUser === 'X') {
        this.xUserMoves.push(parseInt(event.target.id));
        this.checkWinningMoveForX();
      } else {
        this.oUserMoves.push(parseInt(event.target.id));
        this.checkWinningMoveForO();
      }
      
      if(this.xUserMoves.length + this.oUserMoves.length === 9 && this.winner === null) {
        this.doAlertDraw();
      } else {
        this.switchUser();
      }
    }
  }

  switchUser() {
    if(this.currentUser === 'X') {
      this.currentUser = 'O';
      this.isXactive = false;
      this.isOactive = true;
    } else {
      this.currentUser = 'X';
      this.isXactive = true;
      this.isOactive = false;
    }
  }


  checkWinningMoveForX() {
    if(this.xUserMoves.length > 2) {
      for (var item = 0; item < this.possibleWinningCombination.length; item++) {
        this.counter = 0;
        for (var winningMoves = 0; winningMoves < this.possibleWinningCombination[item].length; winningMoves++) {
          for (var moves = 0; moves < this.xUserMoves.length; moves++) {
            if (this.xUserMoves[moves] === this.possibleWinningCombination[item][winningMoves]) {
              this.counter++;
              break;
            }
          }
        }
        if (this.counter === 3) {
          this.winner = 'X';
          this.doAlertWinner();
          break;
        }
      }
    }
  }

  checkWinningMoveForO() {
    if(this.oUserMoves.length > 2) {
      for (var item = 0; item < this.possibleWinningCombination.length; item++) {
        this.counter = 0;
        for (var winningMoves = 0; winningMoves < this.possibleWinningCombination[item].length; winningMoves++) {
          for (var moves = 0; moves < this.oUserMoves.length; moves++) {
            if (this.oUserMoves[moves] === this.possibleWinningCombination[item][winningMoves]) {
              this.counter++;
              break;
            }
          }
        }
        if (this.counter === 3) {
          this.winner = 'O';
          this.doAlertWinner();
          break;
        }
      }
    }
  }

  doAlertWinner() {
    let alert = Alert.create({
      title: this.winner + ' Wins!',
      buttons: [
        {
          text: 'New Game',
          handler: () => {
            this.initValues();
          }
        }
      ]
    });
    this.navCtrl.present(alert);
  }

  doAlertDraw() {
    let alert = Alert.create({
      title: ' Game Draws!',
      buttons: [
        {
          text: 'New Game',
          handler: () => {
            this.initValues();
          }
        }
      ]
    });
    this.navCtrl.present(alert);
  }




}
