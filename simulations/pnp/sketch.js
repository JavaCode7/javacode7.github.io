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
let gens = 1;
let resolution = 4;

function setup() {
    createCanvas(displayWidth, displayHeight);
    cols = width / resolution;
    rows = height / resolution;

    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const r = floor(random(3));
            if (r == 2) {
                var a = 5;
            } else {
                a = r;
            }
            grid[i][j] = a;
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
            if (state == 5 && pd) {
                next[i][j] = 0;
            } else if (state == 1 && pd) {
                next[i][j] = 0;
            } else if (state == 5 && !py) {
                next[i][j] = 0;
            } else if (state == 0 && py == 3) {
                next[i][j] = 1;
            } else if (state == 0 && (pd == 2)) {
                if (floor(random(pd)) > 0) {
                    next[i][j] = 5;
                }
            } else {
                next[i][j] = state;
            }
        }
    }
    gens += 1;

    grid = next;
}

function countNeighbors(g, x, y) {
    let preds = 0;
    let preys = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {

            var col = (x + i + cols) % cols;
            var row = (y + j + rows) % rows;

            if (g[col][row] == 5) {
                preds += 1;
            } else {
                preys += g[col][row]
            }
        }
    }
    preds -= g[x][y];
    preys -= g[x][y];
    return [preds, preys];
}