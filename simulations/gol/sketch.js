function make2DArray(c, r) {
    let arr = new Array(c);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(r);
    }
    return arr;
}

let grid;
let cols;
let rows;
let resolution = 4;

function setup() {
    createCanvas(displayWidth, displayHeight);
    cols = width / resolution;
    rows = height / resolution;

    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }
}

function draw() {
    background(170, 0, 255, 100);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;

            if (grid[i][j] == 1) {
                fill(0, 255, 0, 255);
                stroke(128, 128, 128, 0);
                rect(x, y, resolution - 1, resolution - 1);
            }
        }
    }

    let next = make2DArray(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {

            let state = grid[i][j];
            let neighbors = countNeighbors(grid, i, j);
            // Birth
            if (state == 0 && neighbors == 3) {
                next[i][j] = 1;
            }
            // Death
            else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                next[i][j] = 0;
            }
            // Survival
            else {
                next[i][j] = state;
            }
        }
    }

    grid = next;
}

function countNeighbors(g, x, y) {
    let sum = 0
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {

            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;

            sum += g[col][row]
        }
    }

    sum -= g[x][y];
    return sum;
}