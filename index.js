// Grid size and cell size
var cellSize = 10;
var gridSize = {
    width: 60,
    height: 40
};

// Create initial grid with random cells
var grid = [];
for (var x = 0; x < gridSize.width; x++) {
    grid[x] = [];
    for (var y = 0; y < gridSize.height; y++) {
        grid[x][y] = Math.round(Math.random());
    }
}

// Draw the initial grid
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
for (var x = 0; x < gridSize.width; x++) {
    for (var y = 0; y < gridSize.height; y++) {
        if (grid[x][y] == 1) {
            ctx.fillStyle = 'black';
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}

// Function to update the grid on each iteration
function update() {
    var newGrid = [];
    for (var x = 0; x < gridSize.width; x++) {
        newGrid[x] = [];
        for (var y = 0; y < gridSize.height; y++) {
            var neighbors = countNeighbors(x, y);
            if (grid[x][y] == 1 && (neighbors < 2 || neighbors > 3)) {
                newGrid[x][y] = 0; // The cell dies
            } else if (grid[x][y] == 0 && neighbors == 3) {
                newGrid[x][y] = 1; // A cell is born
            } else {
                newGrid[x][y] = grid[x][y]; // The cell remains
            }
        }
    }
    grid = newGrid;
}

// Function to count neighboring cells of a given position
function countNeighbors(x, y) {
    var count = 0;
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            if (i == 0 && j == 0) continue;
            var nx = x + i;
            var ny = y + j;
            if (nx < 0) nx += gridSize.width;
            if (nx >= gridSize.width) nx -= gridSize.width;
            if (ny < 0) ny += gridSize.height;
            if (ny >= gridSize.height) ny -= gridSize.height;
            if (grid[nx][ny] == 1) count++;
        }
    }
    return count;

}

// Function to draw the updated grid
function draw() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var x = 0; x < gridSize.width; x++) {
        for (var y = 0; y < gridSize.height; y++) {
            if (grid[x][y] == 1) {
                ctx.fillStyle = 'black';
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }
}

// Function to update and draw the grid on each iteration
function gameLoop() {
    update();
    draw();
}

// Start the main game loop
setInterval(gameLoop, 100);

// This code creates the initial grid with random cells, and on each iteration of the main game loop, updates the grid according to the rules of Conway's Game of Life and draws it on the canvas. The loop repeats every 100 milliseconds (10 times per second) using the setInterval() function.
// It's important to note that this code doesn't use any external libraries and is a simple implementation of the game, so there are many ways to improve it and make it more efficient or functional.
