

// this is the Global Object
var sushiMe = {};


//this is the method with a function that gets called when the page loads
//and runs all other functions within the SushiMe object. 
sushiMe.init = function() {
	//Navigator finds the location of the user using geolocation data from the device  
	 navigator.geolocation.getCurrentPosition(function(success) {
	    sushiMe.Lat = success.coords.latitude;
	    sushiMe.Lon = success.coords.longitude;
		$('.mmm').click(function(e){
			//we prevent the click from refeshing page
			e.preventDefault();
			//this gets our position.
			sushiMe.getLocation(sushiMe.Lat, sushiMe.Lon);
			//this fades out no-header
			$('header').addClass('no-header');
			$('.gallery').removeClass('hide');
			$('.loading').removeClass('show');
			// $('.loading').fadeOut(4000);
			$('.gallery').fadeIn(4000);
			setTimeout(function() {
 			 $(".loading").fadeOut().empty();
			}, 4000);


		});
	});
};



//This is our ajax call. Its gets all of the data we will be using for our API. The parameters are using to store our current location.
sushiMe.getLocation = function(lat, lon) {
	$.ajax({
		url: 'https://api.foursquare.com/v2/venues/explore',
		type: 'GET',
		dataType: 'json',
		data: {
			radius: '8000',
			ll: lat + ',' + lon,
			query: 'sushi',
			client_id: 'XOI0MBH5POODQZDXXT2L3RA0A3Y23UNDLF2PHZY2XMQLGALS',
			client_secret: 'C2HKF12I24HKUXVDYYXYNZC2B25RFCW4YG5AZIZ5T531DZNA',
			v: '20150728', //???????
			limit: '6',
			venuePhotos: '1'
		},
		success: function(res) {
			//this is the function that stores our ajax data, 
			//and allows us to isolate the specified type that we want
			//and move it across function within the global object.
			//this also only runs if your ajax call is successful.
			console.log(res.response.groups[0].items);

			//this stores data for each location.
			var locations = res.response.groups[0].items;
			//we our locations variable as a parameter for the 
			//display function.
			sushiMe.displayLocation(locations);
		}


	});
}


//this is our specified function to take our data and display it on the page.

// venues === to locations
sushiMe.displayLocation = function(venues){
	// console.log(venues);

	//Loops through all the locations
	for (i = 0; i < venues.length; i++){
		//storing the combined links to the pictures
		var imgUrl = venues[i].venue.featuredPhotos.items[0].prefix + venues[i].venue.featuredPhotos.items[0].height + venues[i].venue.featuredPhotos.items[0].suffix;

		//this is outputting  specific venue properties for each location.
		console.log(venues[i].venue);

		var restId = venues[i].venue.id;
		//this takes us to the foursquare page of the venue
		var foursquareUrl = 'https://foursquare.com/v/' + restId;

		var $imgLink = $('<a href="#">');
		//taking our empty a tag and we are 
		//targeting its href and passing it our foursquare address.
		$imgLink.attr('href', foursquareUrl);	
		
		var $imageWrap = $("<figure>");


		var $sushiImage = $('<img>').addClass('sushi-image').attr('src', imgUrl);

		$imageWrap.append($sushiImage);

		$imgLink.append($imageWrap);

		var $totalRating = $('<p>').addClass('sushi-rating');

		var rating = Math.round(venues[i].venue.rating - 5);

		// for (x = 0; x < rating; x++){ 
		// 	//depending ont he total rating of our
		// 	// venue our loop will append an img of chopstick to $totalRating.
		// 	$totalRating.append($('<img>').attr('src', 'chopsticks.jpg').addClass('chopsticks'));
		// };

		var $overlayContainer = $('<div>').addClass('overlayContainer');


		

		var $name = $('<p>').addClass('placeName').text(venues[i].venue.name);
		//Create a DIV to put photo

		$imageWrap.append($overlayContainer);

		$overlayContainer.append($name);




		var $container = $('<figure>').addClass('sushi-results').append($totalRating, $imgLink);
		$('.gallery').append($container);

	}



};



$(document).ready(function(){
	sushiMe.init();

});


