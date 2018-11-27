var container = document.createElement("div");
container.classList.add("gamecontainer");
var field = document.createElement("div");
field.classList.add("field");
for(let i = 0; i < 3; i++){
  for(let j = 0; j < 3; j++){
    var cell = document.createElement("div");
    cell.classList.add("cell");
    cell.coords = {"x": j, "y" : i};
    cell.addEventListener("click",tryToGo);
    field.appendChild(cell);
  }
}
container.appendChild(field);
var currentPlayer = 1;
var players =["","Marsians","Human"];
var infoBlock = document.createElement("div");
infoBlock.classList.add("info");
infoBlock.innerHTML ="Attak " + players[currentPlayer];
container.appendChild(infoBlock);
var reset = document.createElement("button");
reset.innerHTML ="Play again!";
reset.style.width = "100%";
reset.style.display = "none";
container.appendChild(reset);
document.getElementById("game").appendChild(container);
var game = [
  [0,0,0],
  [0,0,0],
  [0,0,0],
];
var state = 1;
var info = "";
var counter = 0;
function tryToGo() {  
  var x = this.coords.x;  
  var y = this.coords.y;  
  if (game[y][x] == 0) {  
    counter++;   
    game[y][x] = currentPlayer;  
    this.classList.add("cell_" + currentPlayer);  
    state = getState();  
    if (state == 2) {  
      currentPlayer = (currentPlayer == 1) ? 2 : 1;  
      infoBlock.innerHTML = "Attak " + players[currentPlayer];  
    }   
    else if (state == 3) {  
      infoBlock.innerHTML = "Game over! Winners: " + players[currentPlayer];
      reset.style.display = "block";
    }  
    else if (state == 4) {  
      infoBlock.innerHTML = "Game over! Draw!";
      reset.style.display = "block";  
    }  
    if (state > 2) {  
      var cells = document.getElementsByClassName("cell");  
      for (var i = 0; i < cells.length; i++) {  
        cells[i].removeEventListener("click", tryToGo);  
      }  
    }  
  }  
}  
function getState(){
  for (let i= 0; i < 3; i ++){
    if(game[i][0] != 0 && game[i][0]  == game[i][1] &&  game[i][0]  == game[i][2])
      return 3;
    if(game[0][i] != 0 && game[0][i]  == game[1][i] &&  game[0][i]  == game[2][i])
      return 3;
  }
  if(game[0][0] != 0 && game[0][0]  == game[1][1] &&  game[0][0]  == game[2][2])
    return 3;
  if(game[0][2] != 0 && game[0][2]  == game[1][1] &&  game[0][2]  == game[2][0])
    return 3;
  if(counter == 9){
    return 4;
  }
  return 2;
}


reset.onclick = function () {
    location.reload();
}