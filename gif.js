var topics = ["happy", "sad", "angry", "bored", "excited", "disappointed", "lonely"];
        
function displayGifs() {
    
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" 
                    + topic + "&api_key=7LEWext6HxRcpPUFUgtw5GRncmgRGyRy&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        console.log(response);

        var results = response.data;

        for (var i=0; i < results.length; i++) {
            var a = $("<a>");
            var image = $("<img>");
            var rating = $("<a>").text("rating: " + results[i].rating);
            rating.addClass("rating");
            image.attr("src", results[i].images.fixed_height.url);
            a.append(image);
            a.append(rating);
            $("#gifs").prepend(a);

        }
    })
    
};

function renderButton() {
    $("#buttons").empty();

    for (var i = 0; i < topics.length; i++) {
        var buttons = $("<button>");
        buttons.addClass("gifButtons");
        buttons.attr("data-name", topics[i]);
        buttons.text(topics[i]);
        $("#buttons").append(buttons);
    }
};

$("#submitButton").on("click", function(event) {
    event.preventDefault();
    var searchInput = $("#search").val().trim();
    topics.push(searchInput);

    renderButton();
});


$(document).on("click", ".gifButtons", displayGifs);

renderButton();