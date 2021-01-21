function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

let grid;
let energy;
let cols;
let rows;
let gens = 1;
let resolution = 4;

function setup() {
    createCanvas(900, 900);
    cols = width / resolution;
    rows = height / resolution;

    grid = make2DArray(cols, rows);
    energy = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const r = floor(random(3));
            const e = floor(random(10));
            if (r == 2) {
                var a = 5;
            } else {
                a = r;
            }
            grid[i][j] = a;
            energy[i][j] = e;
        }
    }
}

function draw() {
    background(0);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;

            if (grid[i][j] == 1) {
                fill(0, 255, 0);
                rect(x, y, resolution - 1, resolution - 1);
            } else if (grid[i][j] == 5) {
                fill(255, 0, 0);
                rect(x, y, resolution - 1, resolution - 1);
            }
        }
    }

    let next = make2DArray(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {

            let state = grid[i][j];
            let neighbors = countNeighbors(grid, i, j);
            let py = neighbors[1];
            let pd = neighbors[0];
            if (state == 0 && py == 1) {
                if (floor(random(100)) == 0) {
                    next[i][j] = 1;
                } else {
                    next[i][j] = state;
                }
            } else if (state == 0 && pd == 1) {
                if (floor(random(100)) == 0) {
                    next[i][j] = 5;
                } else {
                    next[i][j] = state;
                }
            } else {
                if (floor(random(4)) == 0) {
                    next[i][j] = 0;
                    next[i + 1][j] = 5;
                } else if (floor(random(4)) == 1) {
                    next[i][j] = 0;
                    next[i - 1][j] = 5;
                } else if (floor(random(4)) == 2) {
                    next[i][j] = 0;
                    next[i][j + 1] = 5;
                } else if (floor(random(4)) == 3) {
                    next[i][j] = 0;
                    next[i][j - 1] = 5;
                }
            }
        }
    }
    gens += 1;

    grid = next;
}

function countNeighbors(grid, x, y) {
    let preds = 0;
    let preys = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {

            var col = (x + i + cols) % cols;
            var row = (y + j + rows) % rows;

            if (grid[col][row] == 5) {
                preds += 1;
            } else {
                preys += grid[col][row]
            }
        }
    }
    preds -= grid[x][y];
    preys -= grid[x][y];
    return [preds, preys];
}