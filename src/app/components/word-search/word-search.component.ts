import { GridService } from "./../../services/grid.service";
import { Component, OnInit } from "@angular/core";
import { take } from "rxjs/operators";
import { WordService } from "src/app/services/word.service";

@Component({
  selector: "app-word-search",
  templateUrl: "./word-search.component.html",
  styleUrls: ["./word-search.component.css"],
})
export class WordSearchComponent implements OnInit {
  gridsList: string[][];
  words: string[];
  findings: string[] = [];
  message: string = '';

  constructor(
    private gridService: GridService,
    private wordService: WordService
  ) {}

  ngOnInit(): void {
    this.gridService
      .getGrids()
      .pipe(take(1))
      .subscribe(
        (grids: string[][]) => (this.gridsList = grids),
        err => this.message = `HTTP Error, Grid`
      );

    this.wordService
      .getWords()
      .pipe(take(1))
      .subscribe(
        (words: string[]) => (this.words = words),
        err => this.message = `HTTP Error, Word`
      );
  }

  search2D(grid: string[][], row: number, col: number, word: string, rowLength: number, colLength: number): number[] {
    // eight directions
    let x: number[] = [-1, -1, -1, 0, 0, 1, 1, 1];
    let y: number[] = [-1, 0, 1, -1, 1, -1, 0, 1];

    // If first character of word doesn't match starting point in given grid.
    if (grid[row][col] != word[0]) return [];

    let wordLen: number = word.length;

    // Search word in all 8 directions. starting from (row, col)
    for (let dir = 0; dir < 8; dir++) {
      // Initialize starting point for current direction
      let index: number;
      let rd: number = row + x[dir];
      let cd: number = col + y[dir];

      // First character is already checked, match remaining characters
      for (index = 1; index < wordLen; index++) {
        // If out of bound break
        // if (rd >= this.rowLength || rd < 0 || cd >= this.colLength || cd < 0) break;
        if (rd >= rowLength || rd < 0 || cd >= colLength || cd < 0) break;

        // If not matched, break
        if (grid[rd][cd] != word[index]) break;

        // Moving in particular direction
        rd += x[dir];
        cd += y[dir];
      }

      // If all character matched, then value of must be equal to length of word
      if (index == wordLen) {
        // subtract previous move to have the last char coordinate
        const xCoor: number = rd -= x[dir];
        const yCoor: number = cd -= y[dir];
        return [xCoor, yCoor];
      }
    }
    return [];
  }

  searchWord(): void {
    if (!this.gridsList || this.gridsList.length === 0) {
      this.message = 'Empty Grid';
      return;
    }

    this.findings = [];
    const rowLength: number = this.gridsList.length;

    this.words.forEach(word => {
      for (let row = 0; row < rowLength; row++) {

        const colLength: number = this.gridsList[row].length;

        for (let col = 0; col < colLength; col++) {

          const result = this.search2D(this.gridsList, row, col, word, rowLength, colLength);
          if (result.length === 2) {
            const displayMsg: string = `${word} found at (${row}, ${col}) to (${result[0]}, ${result[1]})`;
            this.findings = [...this.findings, displayMsg];
          }

        }
      }
    })

    if (!this.findings || this.findings.length === 0) {
      this.message = 'Not found';
    }
  }
}
