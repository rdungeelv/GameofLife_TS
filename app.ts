/** Conway's Game of Life in Typescript
 * BASIC RULES:
 *    Any live cell with fewer than two live neighbors dies, as if caused by under-population.
 *    Any live cell with two or three live neighbors lives on to the next generation.
 *    Any live cell with more than three live neighbors dies, as if by overcrowding.
 *    Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
 */

enum Dim {Width=5, Height=5}

var cells: boolean[][];
var tmp: boolean[][];
var iterations = 10;

function init_cells() {
    var i = 0;
    var j = 0;
    cells = [];
    tmp = [];
    for(i=0; i<Dim.Height; ++i) {
        cells[i] = [];
        tmp[i] = [];
        for(j=0; j<Dim.Width; ++j) {
            cells[i][j] = false;
        }
    }

    cells[2][3] = true;
    cells[3][3] = true;
    cells[4][3] = true;

}

/** Eight Total Neighbors
 * [h-1][w-1] [h-1][w] [h-1][w+1]
 * [h][w-1]       x      [h][w+1]
 * [h+1][w-1] [h+1][w] [h+1][w+1]
 */
function isAlive(h, w) {
    var neighbors = 0;

    if(h!=0 && w!=0 && cells[h-1][w-1] == true)                          {neighbors += 1}
    if(h!=0 && cells[h-1][w] == true)                                    {neighbors += 1}
    if(h!=0 && w!=(Dim.Width-1) && cells[h-1][w+1] == true)              {neighbors += 1}

    if(w!=0 && cells[h][w-1] == true)                                    {neighbors += 1}
    if(w!=(Dim.Width-1) && cells[h][w+1] == true)                        {neighbors += 1}

    if(h!=(Dim.Height-1) && cells[h+1][w-1] == true)                     {neighbors += 1}
    if(h!=(Dim.Height-1) && cells[h+1][w] == true)                       {neighbors += 1}
    if(h!=(Dim.Height-1) && w!=(Dim.Width-1) && cells[h+1][w+1] == true) {neighbors += 1}

    //console.log(h, ",", w, ",", neighbors);

    if(cells[h][w] == true) {
        if(neighbors < 2) {
            return false;
        } else if(neighbors > 3) {
            return false;
        } else if(neighbors >= 2 && neighbors <= 3) {
            return true;
        }
    } else {
        if(neighbors == 3) {
            return true;
        } else {
            return false;
        }
    }
}

function printCells() {
    var i = 0;
    var j = 0;
    var output = "\n";
    for(i=0; i<Dim.Height; i++) {
        for(j=0; j<Dim.Width; j++) {
            if(cells[i][j] == true) {
               output += "x";
            } else {
                output += ".";
            }
        }
        output += "\n";
    }
    console.log(output);
}

//MAIN
var count = 0;
init_cells();
printCells();

while(count < iterations) {
    for(var i=0; i<Dim.Height; i++) {
        for(var j=0; j<Dim.Width; j++) {
            tmp[i][j] = isAlive(i,j);
        }
    }

    //Swap Cells
    for(var i=0; i<Dim.Height; i++) {
        for(var j=0; j<Dim.Width; j++) {
            cells[i][j] = tmp[i][j];
        }
    }

    printCells();
    count += 1;
}
