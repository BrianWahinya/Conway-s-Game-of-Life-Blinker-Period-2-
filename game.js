console.time('Time')    //checks how long the JS file takes to execute.

/*@Author:  Brian Wahinya.
  @Task:    Game of Life using John Conway's Rules.
  @Version: Blinker-Period 2 (Version 0.0.1).
  @Language: Javascript ES6(2015).
  @Assumptions: Highlighted in the Index Page.
  @Date:    February, 7, 2019.
*/

/*Point to note: 
  1. In ES6 the use of CONST keyword can be used wisely without
  repetition especially when declaring Functions and Variables.
  This is possible by use of New Lines and Function Scopes.
  But caution must be taken to avoid redeclaring or redefining them.
  2. The use of SemiColon is also carefully avoided through usage of New Lines and Commas.   
*/

//Declare and define Global Variables
const canvasSize = 150,
      rowCellsNumber = 5,
      gridsPerSecond = 3,
      cellSize = canvasSize / rowCellsNumber,
      cellBoundaryColor = 'grey';


//Once the window loads, the buttons are loaded
window.onload = () => {  
  const btnStart = document.getElementById("startGameBtn");
  btnStart.style.visibility = "visible";
  const btnAssum = document.getElementById("assumptionsBtn");
  btnAssum.style.visibility = "visible";  
}

//onclicking Start Button it creates a canvas and starts the game
const startGame = () => {
  const canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        grid = getOriginalGrid();
    rateToNextState(ctx, grid);
}

/*  create an Original Grid from which the other grids will be mapped from
    Note: I represents Rows in the grid
          J represents Columns in the grid
*/
const getOriginalGrid = () => {
  const grid = new Array(rowCellsNumber)
  //console.log(grid)
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(rowCellsNumber)
      for (let j = 0; j < grid.length; j++) {

        //To generate random patterns use:     
        // grid[i][j] = Math.floor(Math.random() * 2)

        //To generate a pre-determined grid for the Blinker pattern
        //use the Tenary operator or the If Else statement below

        ( i === 2 && (j === 2 || j === 1 || j === 3)) ? grid[i][j] = 1 : grid[i][j] = 0;

        // if( i === 2 && (j === 2 || j === 1 || j === 3)){
        //   grid[i][j] = 1;                
        // }else{
        //   grid[i][j] = 0;
        // }

        //End of pre-determined pattern
      }    
  }  
  return grid;    
}

//count the number of neighbors around each cell
const countNeighbors = (grid, x, y) => {
  let sum = 0;
  const cellRows = grid.length,
        cellCols = grid.length;
  //iterate over neighbors on all sides.
  //The negative math's operator is crucial for neighbors on the left of the cell
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      const row = (x + i + cellRows) % cellRows,
            col = (y + j + cellCols) % cellCols;
      sum += grid[row][col];      
    }
  }
  sum -= grid[x][y];  
  return sum;
}

//create a next grid which will be mapped from the original grid
//this grid will always follow the Conway Game of Life rules each cycle of its generation
const getNextGrid = (grid) => {
  const nextGrid = new Array(grid.length)
  //console.log(nextGrid)
  //generate a 2d array to create next generation
  for (let i = 0; i < grid.length; i++) {
    nextGrid[i] = new Array(grid.length)
    for (let j = 0; j < nextGrid[i].length; j++) {
      //check the neighbors of each cell
      const aliveCells = grid[i][j],      
            neighbors = countNeighbors(grid, i, j);

      //input the Game of Life rules over every cell that is looped
      //0 represents DEAD while 1 represents ALIVE

      //Rule 1: If a cell is DEAD has 3 ALIVE neighbors
      if (aliveCells === 0 && neighbors === 3)
      //Set cell to ALIVE
      { nextGrid[i][j] = 1}

      //Rule 2: If a cell is ALIVE and has less than 2 or more than 3 neighbors
      else if ( (aliveCells === 1) && (neighbors < 2 || neighbors > 3) )
      //Set cell to DEAD
      { nextGrid[i][j] = 0 }

      //All the other states generate ALIVE cells 
      else { nextGrid[i][j] = aliveCells};
    }
  }
  return nextGrid;
}

//draw the Grid on the canvas
const drawGrid = (ctx, grid) => {
  ctx.strokeStyle = cellBoundaryColor;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      const aliveCells = grid[i][j]      
      //alive Cells color or pattern
      if (aliveCells) {
        ctx.fillRect( i * (cellSize * 1.16), j * (cellSize * 1.16), cellSize/3, cellSize/3)        
      }
        ctx.strokeRect( i * cellSize, j * cellSize, cellSize, cellSize)      
    }
  }
}

//modify the rate of transition from one grid to the other by creating a timer
const rateToNextState = (ctx, grid) => {
  ctx.clearRect(0, 0, canvasSize, canvasSize);
  drawGrid(ctx, grid);
  const gridOfNextGeneration = getNextGrid(grid);
  setTimeout(() => {
    requestAnimationFrame(() => rateToNextState(ctx, gridOfNextGeneration))}, 1000 / gridsPerSecond)
}

//Modal Assumptions Content
const modalContent = () => {
  const modal = document.getElementById("asumModal"),
        span = document.getElementsByClassName("close")[0];
  modal.style.display = "block"
  span.onclick = () =>{
    modal.style.display = "none"
  }
  window.onclick = (event) => {
    (event.target == modal)?(modal.style.display = "none"): null ;
  }
}

console.timeEnd('Time')
