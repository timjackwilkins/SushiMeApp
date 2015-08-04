function actuallyLoggingThings(x, y, z){
	console.log('I have parameters')
	console.log(x);
	alert(y);
	document.write(z);
}


function thiShitIsLocal(){
	var one = 'the thing I will console.log';
	var two = 'the thing I will alert';
	var three = 'the thing I will document write';
}

function doingNothing(){
	console.log('I have no paramemters and no idea what any of these variables are')
	console.log(x);
	alert(y);
	document.write(z);
}

doingNothing();