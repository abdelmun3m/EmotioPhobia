

window.addEventListener("load",function(){



	var Name = window.location.href.split("?")[1].split("&")[0].split("=")[1];
	var Level = window.location.href.split("?")[1].split("&")[1].split("=")[1];


	if(Name){

		welcome.innerText = "Welcome "+ Name;
		StartButton.style.display = "display";
		//StartGame();


		if(Level == 1){
			objectSpeed = 5 ;
		}else if(Level == 2){
			objectSpeed = 8;
		}else if(Level == 3){
			objectSpeed = 10; 
		}
		StartButton.onclick = function(){
			StartGame();

			setTimeout(function(){
				CurrentBall = creatrRandomBall(true,-1);
			}, 500);

		startTimer();	
		StartButton.disabled = "true";	
		};
	}else{


		StartButton.style.display = "none";
	}




});





function StartGame(){


	for(i =0 ; i < gameColumnsNumber ; i++){

		columns[i] = new Column(intialsurface,elementWidth,i);

		var randomStaticBallinColumn = Math.ceil(Math.random() * 3 );
		for(var j = 0 ; j <  randomStaticBallinColumn ; j++) 
			creatrRandomBall(false,i)//static Ball 
	}
	

		window.addEventListener("keydown",function(event){
				
				if(event.keyCode == 32 ){//space
					
					//CurrentBall = creatrRandomBall(true,-1);//create flaying ball in random colum 

				}else if(event.keyCode == 39){//right
					CurrentBall.moveRight();
				}else if (event.keyCode == 37) {//left
					CurrentBall.moveLeft()
				}else if (event.keyCode == 40) {//down
					CurrentBall.moveDown()
				}
				else{
					console.log("key : ",event.keyCode);
				}
		});
	
}




creatrRandomBall = function(flying,col){

	if(col == -1){
		 col = Math.floor(Math.random()*gameColumnsNumber);
	}
	var temp = new Ball(columns[col],elementWidth,objectSpeed);
	temp.createNewBall(flying);//if True flying Ball False static ball 
	return temp;
}




chickMatch = function(ball){



	//marke balls that should be removed which match with the current ball
	//get all matches then loop again to delete marked balls in each column 	
	var col = ball.column.index ; 
	var row = ball.id ;	

	

//-----------------------check horizontal--------------------------------------------
	
	var vStart = col ; 
	var vEnd = col ;
	while ( vEnd < 9   && (row in columns[vEnd+1].balls) ) {
		if( ball.color === columns[vEnd+1].balls[row].color){
				vEnd++ ;
		}else{
			break;
		}
	}

	while (vStart > 0 && (row in columns[vStart-1].balls) ){
		if( ball.color ===  columns[vStart-1].balls[row].color) {
			vStart--;
		}else{
			break;
		}
	}
//----------------------------------check vertical --------------------------------
	//console.log("row",row);
	var sDown = row;
	var eDown = row;

	while (sDown  > 0 && sDown in columns[col].balls){
		if( ball.color ===  columns[col].balls[sDown - 1].color) {
			sDown--;
		}else{
			break;
		}
	}

	while (eDown  < columns[col].balls.length-2 && eDown in columns[col].balls){
		if( ball.color ===  columns[col].balls[eDown + 1].color) {
			eDown++;
		}else{
			break;
		}
	}



//------------------------------check diagonal----------------------up to down--------
	var dStart1 = col;
	var dEnd1 = col;
	
	for(var i = 1 ; i <=2 ; i++ ){
		var x = col -i  ; 
		var y = row  + i ;
		if(x in columns){
			if(y in columns[x].balls){
				//console.log(columns[x].balls[y].color);
				if(ball.color === columns[x].balls[y].color) {
					dStart1--;
				}else{
					break;
				}
			}else{break;}
		}
	}
	
	for(var i = 1 ; i <=2 ; i++ ){
		var x = col +i  ; 
		var y = row  - i ;
		if(x in columns){
			if(y in columns[x].balls){
				if(ball.color === columns[x].balls[y].color){ 
					dEnd1++;
				}else{
					break;
				}
			}else{break;}
		}
	}

//-----------------------------------------------down to up diagonal------------

	var dStart2 = col;
	var dEnd2 = col;
	for(var i = 1 ; i <=2 ; i++ ){
		var x = col +i  ; 
		var y = row  + i ;
		if(x in columns){
			if(y in columns[x].balls){
				if(ball.color === columns[x].balls[y].color) {
					dEnd2++;
				}else{break;}
			}else{break;}
		}
	}

	for(var i = 1 ; i <=2 ; i++ ){
		var x = col - i ; 
		var y = row - i ;
		if(x in columns){
			if(y in columns[x].balls){
				if(ball.color === columns[x].balls[y].color){
					
					dStart2--;
				}else{break;}
			}else{break;}
		}
	}



//---------------------------------------------------------------------------




	
	var flag = 0;
	//for(var i = col-2 ; i <= col + 2 ; i++){
	for(var i = 0 ; i <= 9 ; i++){
		//loop on every column in range -2 -> +2 of current ball 
		//remove aech ball in this column which is marked as removed 
		if(!(i in columns)) continue;

		if( (dEnd2 - dStart2 > 1) && i >= dStart2 && i != col && i <= dEnd2){
			flag = 1;
			console.log('remove horizontal',dEnd2 , dStart2);
			/*columns[i].removeBall( (row + (i-col)));
			columns[i].normalize((row + (i-col)));*/
			onDeletedAnimation(i,(row + (i-col)));

		}


		if( (dEnd1 - dStart1 > 1) && i >= dStart1 && i != col && i <= dEnd1){
			flag = 1;
			console.log('remove diagonal 1',dEnd1 , dStart1);
			/*columns[i].removeBall( (row + (col-i)));
			columns[i].normalize((row + (col-i)));*/
			onDeletedAnimation(i,(row + (col-i)));

		}


		if(row in columns[i].balls){
			if( ((vEnd-vStart) > 1) && i >= vStart&& i != col && i <= vEnd){
				flag = 1;
				console.log('remove diagonal 2',vEnd-vStart);
				/*columns[i].removeBall(row);
				columns[i].normalize(row);*/
				onDeletedAnimation(i,row );
			}
		}


	}

	if( (eDown - sDown > 1) ){	
			flag = 0;

			var matchNum = columns[col].balls[row].color;
			for(var i = eDown ; i >= sDown ; i--){
				console.log('remove down',sDown,eDown);
				//columns[col].removeBall(i);
				onDeletedAnimation(col,i);
			}
			addMatch(matchNum-1);
			//columns[col].normalize(sDown);
	}

	if(flag){
		console.log('remove ball');
		var matchNum = columns[col].balls[row].color;
		addMatch(matchNum-1);
		console.log(matches);
		/*columns[col].removeBall(row);
		columns[col].normalize(row);*/
		onDeletedAnimation(col,row);
	}




	checkIfGameEnded();


}



checkIfGameEnded = function(){
	//this function check if board is empty or if any colum if full of balls 
	//to stop the game 



		var NumberofEmbtyColumns = 0;

		columns.forEach(function(elm){
			if(elm.balls.length == 0) 
				{
					NumberofEmbtyColumns++;
				}
			if(elm.surface <= 0){
				//GameEnded = true;
				endGame(1);//user lose the game 
			};
		});

		if(NumberofEmbtyColumns >= gameColumnsNumber ){
			//GameEnded = true;
			endGame(2);//user finished the game and won
		}

		return GameEnded;
}




endGame=function(lose){
	GameEnded = true;
	clearInterval(clockTimer);
	CurrentBall = null;
	if(lose == 1){
		alert("Sorry! You lose the game");
	}else if(lose == 2){
		alert("you Won");
	}else if(lose == 3){

		alert("Time Out");
	}
}

onDeletedAnimation=function(col , row){


	//change Imag of deleted balls before delete
	columns[col].balls[row].changeImageOnRemove();

	setTimeout(function(){
		columns[col].removeBall(row);
		columns[col].normalize(row);
	}, 500);

}



addMatch=function(match){

	//change the counter of matchesd balls and uptdate UI  
	
	matchValuesDivs = document.getElementsByClassName("matchesVAlue");
	matchValuesDivs[match].innerText = ++matches[match];

}



startTimer =  function(){

	var second = 0;
	var mint = 0;
	


	if(clockTimer != null){
		return ;
	}

	clockTimer = setInterval(function(){
		second++;
	if(second > 59){
		mint++;
		second = 0 ;
	}

	Ssecond = second ; 
	Smint = mint;
	if(second < 10){
		Ssecond = "0"+second;
	}

	/*if(mint < 10){
		Smint = "0"+mint;
	}*/
	if(mint >= gameTimerDuration){
		/*clearInterval(clockTimer);
		GameEnded = true;*/
		endGame(3);//time out

	}


	timer.innerText = Smint + " : " + Ssecond;

	},1000);


}








