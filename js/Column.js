




var Column = function(_surface,_width,_index){


	this.surface = _surface;
	this.width = _width;
	this.height = _width;
	this.index =_index;
	this.balls = [];


	this.removeBall = function(row){
		//delete ball Object from column
		//if this ball is in the array 
		//but the surface of column to to the buttom of the removed ball 
		if(row >= 0 && row in this.balls){
			
			this.balls[row].removeBall(); 
			this.surface = this.balls[row].bottom;
			console.log("surface ",this.surface);
			delete this.balls.splice(row,1);	
			//this.column.normalize(row);
		}
		
		//checkIfGameEnded();
	}
	this.addBall = function(ball){

		//get ball created randomly in this column which
		//movied down until reach it's column surface 
		//then added to column's balls array  
		//then increase surface of this column
		
		//checkIfGameEnded();
	
		if(!GameEnded){
			var id = this.balls.length;
			this.balls.push(ball);
			this.increaseSurface();
			//chickMatch();
			if(checkIfGameEnded)
			CurrentBall = creatrRandomBall(true,-1);
		}
		
		
		
		return id;
	}


		
	this.addStaticBall=function(ball){	

		//get ball created randomly in this columu
		//to add this ball in this colum to intialize the game 
		//with not empty bord
		//update the bassed ball top Position to be the surface after added ball 
		ball.index = this.balls.length;
		this.balls.push(ball);
		this.increaseSurface();
		ball.positionY = this.surface;
	}

	this.increaseSurface = function(){
		//move surface up 
		this.surface -=this.height;
	}
	this.dcreaseSurface = function(){

		//move surface down 

		this.surface +=this.height;
	}

	this.normalize = function(nrow){
		


		//start from -nrow- the deleted ball index
		//set column surface to the buttom of deleted ball
		//if it is not the top of its column 
		//start to move all balls above it


		var tempBall = this.balls[nrow];

		if(nrow in this.balls && this.balls.length > 0){

			var col = this;
			var timer = setInterval(function(){
			  	if(col.balls[nrow].bottom < col.surface) {
				  	
				  	for(var i = nrow ; i < col.balls.length ; i++){
				  		col.balls[i].moveDown();
			  		}

				}else{
					clearInterval(timer);
					for(var i = nrow ; i < col.balls.length ; i++){
				  		col.increaseSurface();
			  		}
			  		//TODO try to check match of each ball moved to new position 
				}

				},30);
		}

	}
}