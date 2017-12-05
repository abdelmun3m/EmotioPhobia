


var Ball = function(_column,_width,_speed) {
	
		this.column = _column;
		this.width  = _width; 
		this.height  = _width;
		this.color = "";
		this.isflying = true;
		this.id = -1 ;

		this.positionX = this.column.index * this.width;
		this.positionY  = 0; 

		this.imgSrc = "../img/"+this.color+"png";
		
		this.speed = _speed;

		this.img = "";
		
		
		this.bottom = 0 ;



		this.createNewBall=function(flying){
			
			if(flying){
				this.drowBallTag();
				this.falling();
			}else{
				//Missing Ball intial PsitionY to get Top of Ball 
				// Go to Column set top of ball = the surface of its column then drow 
				this.column.addStaticBall(this);
				this.drowBallTag();
			}
		}

		this.drowBallTag=function(){
			this.img = GameBord.appendChild(document.createElement("img"));
			this.img.style.left = this.positionX+"px";
			this.img.style.top = this.positionY+"px";
			this. bottom = this.positionY + this.height;
			this.color = this.getRandomColor();
			this.img.style.background = this.color;
		}
		this.falling = function(){
			var t = this;
			var timer =setInterval(function(){
				if(t.bottom < t.column.surface ){
					t.moveDown();
				}else{
					clearInterval(timer);
					this.isflying = false;
					t.id = t.column.addBall(t);
					chickMatch(t);
				}
			}, 50);
			
			// the ball is falling from top to down 
		}
		this.moveDown=function(){

				//console.log("ball s ",this.bottom , this.column.surface);
				if(this.bottom < this.column.surface){
					this.positionY +=this.speed;
					this.bottom = this.positionY + this.height ;
					this.img.style.top = this.positionY+"px";
				}	
		}
		this.moveLeft=function(){
			if(this.column.index > 0){
				leftCol = columns[this.column.index-1];
				if(this.bottom < leftCol.surface){
					this.column = leftCol ;
					this.positionX -=this.width;
					this.img.style.left = this.positionX+"px";
				}
			}
		}


		this.moveRight = function(surface){

			//move ball to the right colum if in range of the board
			//increase left position of ball with the width of column
			if(this.column.index < 9){
				rightCol = columns[this.column.index+1];
				if(this.bottom < rightCol.surface){
					this.column = rightCol ;
					this.positionX +=this.width;
					this.img.style.left = this.positionX+"px";
				}
			}
		}
		this.removeBall = function(){
		//	console.log("this ball",this.column.index,id);
			GameBord.removeChild(this.img); 
		}

		this.getRandomColor = function(){

			//choose random color for new cearted ball  
			//TODO change Colors to images 
			//TODO range should be minnmum 5 

			var x= Math.ceil(Math.random()*3)
			
			randomColor = "";
			if(x == 1){
				randomColor = "red";
			}else if (x == 2) {
				randomColor = "blue";
			}else if (x == 3) {
				randomColor = "green";
			}
			return randomColor;
			//return "red";
		}



	
}