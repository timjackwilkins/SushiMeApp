
var sushiMe = {};

sushiMe.init = function(){

};

sushiMe.getLocation = function(){
	$.ajax({
		url: 'https://api.foursquare.com/v2/venues/explore',
		type: 'GET',
		datatype: 'json',
		data: {
			near: 'Toronto',
			query: 'sushi',
			
		}


	});
};

