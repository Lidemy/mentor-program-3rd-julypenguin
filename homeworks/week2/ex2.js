//#是牆壁，.是可以走的路，走到出口最少需要幾步

var column = 1
var row = 0
var maze = []
var start = 0
function walkingStep(n) {
  
  for(var i=0 ; i<n.length ; i++){
    for(var j=0 ; j<n[i].length ; j++){
      n[i][j].indexOf('.') ===0 ? maze.push(j) : maze.push(50)   
    }
  }
  for(var k=0 ; k<11 ; k++){
    if(maze[k] < 50) start = k
      
    down()
    right()
    down()
    left()
  }
  var steps = column + row
  console.log(steps)
}

function down() {
  while( (maze[start]+maze[start+11]) <50 ){
      column++
      start += 11
    }
}

function right() {
  while( (maze[start]+maze[start+1]) <50 ){
      row++
      start++
    }
}

function left() {
  while( (maze[start]+maze[start-1]) <50 ){
      row++
      start--
    }
}



/*walkingStep(
[
	'\n#.########',
	'\n#........#',
	'\n########.#',
	'\n#........#',
	'\n#.########',
	'\n#........#',
	'\n########.#',
	'\n#........#',
	'\n#.######.#',
	'\n########.#\n'
])*/

walkingStep(
[
	'\n#.########',
	'\n#........#',
	'\n#........#',
	'\n#........#',
	'\n#........#',
	'\n#........#',
	'\n#........#',
	'\n#........#',
	'\n#........#',
	'\n########.#\n'
])



	
