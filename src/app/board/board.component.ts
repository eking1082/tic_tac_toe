import { Component, NgModule, OnInit } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})

export class BoardComponent implements OnInit {
  cells!: any[];
  playerPiece!: string;
  cpuPiece!: string;
  xIsNext!: boolean;
  winner!: string;

  constructor() { }

  ngOnInit(): void {
    this.reset();
  }

  reset() {
    this.cells = Array(9).fill(null);
    this.winner = '';
    this.xIsNext = true;
    this.playerPiece = this.playerPiece == 'X' ? 'O' : 'X';
    this.cpuPiece = this.playerPiece == 'X' ? 'O' : 'X';
  }

  get isPlayerTurn() {
    return this.playerPiece == 'X' ? this.xIsNext : !this.xIsNext;
  }

  playerMove(index: number) {
    if (
      this.isPlayerTurn &&
      !this.winner &&
      !this.cells[index]
    ) {
      this.cells.splice(index, 1, this.playerPiece);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.checkForWinner();

    if (!this.winner) {
      this.cpuMove();
    }
  }

  cpuMove() {
    var cpu_moved = false;

    while (!cpu_moved) {
      var index = Math.floor(Math.random() * 9);

      if (!this.cells[index]) {
        this.cells.splice(index, 1, this.cpuPiece);
        this.xIsNext = !this.xIsNext;
        cpu_moved = true;
      }
    }

    this.winner = this.checkForWinner();
  }

  checkForWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (
        this.cells[a] &&
        this.cells[a] === this.cells[b] &&
        this.cells[a] === this.cells[c]
      ) {
        return this.cells[a];
      }
    }

    return null;
  }

}
