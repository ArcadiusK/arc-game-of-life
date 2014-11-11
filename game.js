function GameOfLife(width,height) {
  this.width = width;
  this.height = height;
}

GameOfLife.prototype.createAndShowBoard = function () {
  // create <table> element
  var goltable = document.createElement("tbody");
  
  // build Table HTML
  var tablehtml = '';
  for (var h=0; h<this.height; h++) {
    tablehtml += "<tr id='row+" + h + "'>";
    for (var w=0; w<this.width; w++) {
      tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";

    }
    tablehtml += "</tr>";
  }
  goltable.innerHTML = tablehtml;
  
  // add table to the #board element
  var board = document.getElementById('board');
  board.appendChild(goltable);
  
  // once html elements are added to the page, attach events to them
  this.setupBoardEvents();
};

GameOfLife.prototype.setupBoardEvents = function() {
  // each board cell has an CSS id in the format of: "x-y" 
  // where x is the x-coordinate and y the y-coordinate
  // use this fact to loop through all the ids and assign
  // them "on-click" events that allow a user to click on 
  // cells to setup the initial state of the game
  // before clicking "Step" or "Auto-Play"
  
  // clicking on a cell should toggle the cell between "alive" & "dead"
  // for ex: an "alive" cell be colored "blue", a dead cell could stay white
  
  // EXAMPLE FOR ONE CELL
  // Here is how we would catch a click event on just the 0-0 cell
  // You need to add the click event on EVERY cell on the board
  
var game = this;
var button = document.getElementById("step");
button.onclick = function(){game.step.call(game);}
//button.onclick = game.step;
var button = document.getElementById("auto");
button.onclick = function(){game.enableAutoPlay.call(game);};
var button = document.getElementById("pause");
button.onclick = function(){game.pause.call(game);};
var button = document.getElementById("reset");
button.onclick = function(){game.reset.call(game);};
var button = document.getElementById("clear");
button.onclick = function(){game.clear.call(game);};

  var onCellClick = function (e) {
    // coordinates of cell, in case you need them
    //var coord_array = this.id.split('-');
    //var coord_hash = {x: coord_array[0], y: coord_array[1]};
    
    // how to set the style of the cell when it's clicked
    if (this.getAttribute('data-status') == 'dead') {
      this.className = "alive";
      this.setAttribute('data-status', 'alive');
    } else {
      this.className = "dead";
      this.setAttribute('data-status', 'dead');
    }
  };
  
 // var cell00 = document.getElementById('0-0');
 // cell00.onclick = onCellClick;

for (var w=0; w<this.width; w++) {
  for (var h=0; h<this.height; h++) {
     var cell = document.getElementById(w+'-'+h);
     cell.onclick = onCellClick;
  }
}

};


var arcsize;
GameOfLife.prototype.step = function () {
  // Here is where you want to loop through all the cells
  // on the board and determine, based on it's neighbors,
  // whether the cell should be dead or alive in the next
  // evolution of the game

arcsize= document.getElementById('size').text;




  var newstate = [];
//console.log(this)
  for (var w=0; w<this.width; w++) {    
    for (var h=0; h<this.height; h++) {
      var number_of_neighbors = 0;
      var cell=document.getElementById(w+'-'+h);
      for (var i=-1; i<=1; i++) {
        for (var j=-1; j<=1; j++) {
          var neighbor = document.getElementById((w+i)+'-'+(h+j));
          if ((neighbor != null) && (neighbor.getAttribute('data-status') == 'alive') && (i+"-"+j != "0-0")) {
        //  console.log(i+'-'+j);
        number_of_neighbors++;

      }

    }
  }
 // console.log(number_of_neighbors);
 if ((number_of_neighbors===3) && (cell.getAttribute('data-status') == 'dead')) {
  newstate.push([w,h,"alive"])
 // console.log(newstate); 
} else if ((number_of_neighbors<2) && (cell.getAttribute('data-status') == 'alive')) {
  newstate.push([w,h,"dead"])
} else if ((number_of_neighbors>3) && (cell.getAttribute('data-status') == 'alive')) {
    newstate.push([w,h,"dead"])
}
}
} 

for (var key in newstate) {
  var cell=document.getElementById(newstate[key][0]+"-"+newstate[key][1]);
  cell.className = newstate[key][2];
   cell.setAttribute('data-status', newstate[key][2]);
}
  console.log("clicked")
newstate=[];

};
var s;
GameOfLife.prototype.enableAutoPlay = function () {
  // Start Auto-Play by running the 'step' function
  // automatically repeatedly every fixed time interval
  
var arcgame = this;
s = setInterval(arcgame.step.bind(arcgame), 500);
  
};


GameOfLife.prototype.pause = function () {
clearInterval(s);
  };

  GameOfLife.prototype.reset = function () {
 for (var w=0; w<this.width; w++) {    
    for (var h=0; h<this.height; h++) {
         var cell=document.getElementById(w+'-'+h);
           if (Math.random()<=0.5) {
           cell.className = 'dead';
           cell.setAttribute('data-status', 'dead');
       } else {
         cell.className = 'alive';
           cell.setAttribute('data-status', 'alive');
       }
     }
     }
  };

GameOfLife.prototype.clear = function () {
for (var w=0; w<this.width; w++) {    
    for (var h=0; h<this.height; h++) {
         var cell=document.getElementById(w+'-'+h);
           cell.className = 'dead';
           cell.setAttribute('data-status', 'dead');
         }
       }
   this.pause();    
  };



var gol = new GameOfLife(10,10);
gol.createAndShowBoard();

