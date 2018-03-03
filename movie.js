$(document).ready(function () {
	var movieList = ['Star Wars', 'Guardians of the Galaxy', 'Avatar', 'Goonies', 'Water World', 'Willow', 'Lord of the Rings', 'Harry Potter'];

	function movieBtnInfo() {

		$("#moviePics").empty();
		var movie = $(this).attr("data-name");
		var apiKey = 'dc6zaTOxFJmzC';
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=" + apiKey + "&limit=10";

		$.ajax({
			url: queryURL,
			method: 'GET'
		}).then(function (response) {
			console.log(response);
			for (let i = 0; i < response.data.length; i++) {
				var movieData = response.data[i];
				console.log(movieData.rating);
				console.log(movieData.images.fixed_height_still.url);
				console.log(movieData.images.fixed_height.url);


				//create a div to hold my movie giff
				var movieDiv = $('<div class="movie-gif">');

				//pull the rating and add it to a pTag
				var rating = movieData.rating;
				var pTagRating = $('<p>').text('Rating: ' + rating);

				//append the rating pTag to the movieDiv
				movieDiv.append(pTagRating);

				//pull the url from the response and add it to an img tag
				var imgUrlStill = movieData.images.fixed_width_still.url;
				var imgUrlAnimate = movieData.images.fixed_width.url;

				//create an img element to store the gif
				var gifImage = $('<img>').attr('src', imgUrlStill);
				gifImage.attr('data-still', imgUrlStill);
				gifImage.attr('data-animate', imgUrlAnimate);
				gifImage.attr('data-state', 'still');
				gifImage.addClass('gif');
				gifImage.addClass('img-thumbnail');

				//append the gif image to the movieDiv
				movieDiv.append(gifImage);

				//place the completed movieDiv on the page
				$('#moviePics').append(movieDiv);
			}
			$(".gif").on("click", function () {

				//set data-state to a variable of the gif that was clicked
				var state = $(this).attr("data-state");

				// If the state is still, change src to its data-animate value and set the image's data-state to animate.
				if (state === "still") {
					$(this).attr("src", $(this).attr("data-animate"));
					$(this).attr("data-state", "animate");
				}
				// Else set src to still value
				else {
					$(this).attr("src", $(this).attr("data-still"));
					$(this).attr("data-state", "still");
				}
			});
		});
	}

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
	}
	$("#add-movie").on("click", function (event) {
		//makes form not refresh on 'submit'
		event.preventDefault();

		// get new movie from input box
		var movie = $("#movie-input").val().trim();

		// add new movie to movieList array
		movieList.push(movie);

		// calling makeButtons function
		makeButtons();
		$("#movie-input").val("");
	});

	//on-click event listener to run movieBtnInfo function only when a button is clicked that has the class of .movie
	$(document).on("click", ".movie", movieBtnInfo);

	//call functions
	makeButtons();

	//document.ready end brackets
});