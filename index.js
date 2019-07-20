import _ from 'lodash';

const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const winningRow = (arr) => {
    const rowSum = _.sumBy(arr, n => Math.pow(2, n - 1));
    return rowSum === 511;
}

const isSolved = (puzzle) => {
    return puzzle.filter(row => !winningRow(row)).length === 0;
}

const getColumnArray = (puzzle, idx) => {
    return puzzle.map(row => row[idx]);
}

const getGridArray = (puzzle, x, y) => {
    const floorX = Math.floor(x / 3) * 3;
    const floorY = Math.floor(y / 3) * 3;

    const arr = [];

    for (let i = floorX; i < floorX + 3; i++) {
        for (let j = floorY; j < floorY + 3; j++) {
            arr.push(puzzle[j][i]);
        }
    }

    return arr;
}

const digit = (puzzle, x, y) => {
    if (puzzle[y][x] !== 0) return puzzle[y][x];

    const row = puzzle[y];
    const column = getColumnArray(puzzle, x);
    const grid = getGridArray(puzzle, x, y);

    const knowns = row.concat(column, grid).filter(d => d !== 0);
    const possibilities = DIGITS.filter(item => !knowns.includes(item));

    return possibilities.length === 1
        ? possibilities[0]
        : 0;
}

export const SudokuSolver = (puzzle) => {
    const start = new Date().getTime();
    console.log(start);

    while (!isSolved(puzzle)) {
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                puzzle[y][x] = digit(puzzle, x, y);
            }
        }
    }
    const end = new Date().getTime();
    console.log(end);
    console.log(end - start);

    return puzzle;
}
