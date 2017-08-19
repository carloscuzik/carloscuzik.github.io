var x_dimension = 100; 
var y_dimension = 100;
var ant_dead = 200;
var ant_alive = 5;
var run_colony = false;
var list_ant_alive = [];
var matrix = [];


window.setInterval(function() {
    if(run_colony){
    	for(var i=0;i<ant_alive;i++){
    		ant_move(list_ant_alive[i]);
    	}
    	matrix_draw();
    }
}, 1);

function start_colony() {
	run_colony = true;
}

function pause_colony() {
	run_colony = false;
}

function run(){
	start_matrix();
	push_ant_dead();
	generate_positions_ants();
	matrix_draw();
}

function generate_positions_ants() {
	for(var i=0;i<ant_alive;i++){
		var x_aux = Math.floor((Math.random() * x_dimension));
		var y_aux = Math.floor((Math.random() * y_dimension));
		if(matrix[x_aux][y_aux] != 0){
			i--;
		}else{
			list_ant_alive.push({x:x_aux,y:y_aux});
		}
	}
}

function start_matrix() {
	for(var i=0;i<x_dimension;i++){
		var matrix_aux = []; 
		for(var j=0;j<y_dimension;j++){
			matrix_aux.push(0);
		}
		matrix.push(matrix_aux);
	}
}

function push_ant_dead() {
	for(var i=0;i<ant_dead;i++){
		var x = Math.floor((Math.random() * x_dimension));
		var y = Math.floor((Math.random() * y_dimension));
		if(matrix[x][y] != 0){
			i--;
		}else{
			matrix[x][y] = 1;
		}
	}
}

function matrix_draw(){
	var matrix_real = [];

	for(var i=0;i<x_dimension;i++){
		var matrix_aux = []; 
		for(var j=0;j<y_dimension;j++){
			matrix_aux.push(0);
		}
		matrix_real.push(matrix_aux);
	}

	for(var i=0;i<x_dimension;i++){
		for(var j=0;j<y_dimension;j++){
			matrix_real[i][j] = matrix[i][j];
		}
	}
	for(var i=0;i<ant_alive;i++){
		matrix_real[list_ant_alive[i].x][list_ant_alive[i].y] = 2;
	}

	var html_text = '';
	for(var i=0;i<x_dimension;i++){
		html_text += '<tr>';
		for(var j=0;j<y_dimension;j++){
			if(matrix_real[i][j] == 0){
				html_text += '<td class="earth">';
			}else if(matrix_real[i][j] == 1){
				html_text += '<td class="ant_dead">';
			}else if(matrix_real[i][j] == 2){
				html_text += '<td class="ant_alive">';
			}
			html_text += '</td>';
		}
		html_text += '</tr>';
	}
	document.getElementById('ant_colony').innerHTML = html_text;
}
/*
   0 1 2
   3 x 4
   5 6 7
*/
function ant_move(ant) {
	var aux_ant_x = ant.x;
	var aux_ant_y = ant.y;
	while(true){
		aux_ant_x = ant.x;
		aux_ant_y = ant.y;
		var direction = Math.floor((Math.random() * 9));
		switch(direction){
			case 0:
				aux_ant_x--;
				aux_ant_y--;
				break;
			case 1:
				aux_ant_x--;
				break;
			case 2:
				aux_ant_x++;
				aux_ant_y--;
				break;
			case 3:
				aux_ant_x--;
				break;
			case 4:
				aux_ant_x++;
				break;
			case 5:
				aux_ant_x--;
				aux_ant_y++;
				break;
			case 6:
				aux_ant_y++;
				break;
			case 7:
				aux_ant_x++;
				aux_ant_y++;
				break;
		}
		if(aux_ant_x<x_dimension && aux_ant_y<y_dimension && aux_ant_x > -1 && aux_ant_y > -1){
			break;
		}
	}
	ant.x = aux_ant_x;
	ant.y = aux_ant_y;
}