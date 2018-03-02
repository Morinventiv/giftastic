
var movieList = ['Star Wars', 'Guardians of the Galaxy', 'Avatar', 'Batteries Not Included', 'Water World', 'Willow', 'Lord of the Rings', 'Harry Potter'];

var apiKey = 'dc6zaTOxFJmzC';
var movie = '';
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=" + apiKey + "&limit=10";

$.ajax({
	url: queryURL,
	method: 'GET'
}).then(function(response) {
	console.log(response);
});

 // display movie buttons
 function makeButtons() {

	// empty to avoid repeat buttons
	$("#movieButtons").empty();

	// Loop through the movieList array
	for (var i = 0; i < movieList.length; i++) {
		// get buttons for each movie
		var btn = $("<button>");
		btn.addClass("movie");
		btn.attr("data-name", movieList[i]);
		btn.text(movieList[i]);

		// place buttons on the page
		$("#movieButtons").append(btn);
	}

	$("#add-movie").on("click", function(event) {
		//makes form not refresh on 'submit'
		event.preventDefault();

		// get new movie from input box
		var movie = $("#movie-input").val().trim();
		// add new movie to movieList array
		movieList.push(movie);

		// calling makeButtons which handles the processing of our movie array
		makeButtons();
	});
 }

 //call functions
 makeButtons();