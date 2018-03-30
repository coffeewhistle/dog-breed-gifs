$(document).ready(function () {

    //1. Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.
    //    * We chose animals for our theme, but you can make a list to your own liking.
    var topics = ["pug", "beagle", "german shepherd", "bulldog", "pitbull"];

    // 2. Your app should take the topics in this array and create buttons in your HTML.
    // * Try using a loop that appends a button for each string in the array.

    function renderButtons() {
        $("#dogButtons").empty();
        for (i = 0; i < topics.length; i++) {
            var newBtn = $("<button>");
            newBtn.addClass("dog-button btn btn-secondary m-2");
            newBtn.attr("data-name", topics[i]);
            newBtn.text(topics[i]);
            $("#dogButtons").append(newBtn);
        }
    }

    function renderDogs() {
        $("#dogs").empty();
        var searchTerm = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            searchTerm + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var results = response.data;

            for (i = 0; i < 10; i++) {
                var dogDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating).addClass("my-0");
                dogImage = $("<img>").attr("src", results[i].images.fixed_height.url);
                dogDiv.addClass("my-3 col-4");
                dogDiv.append(p);
                dogDiv.append(dogImage);
                $("#dogs").append(dogDiv);
            }
        });
    }

    $("#addDog").on("click", function (event) {
        event.preventDefault();
        var dog = $("#dog-input").val().trim();
        topics.push(dog);
        renderButtons();
    });

    renderButtons();

    $(document).on("click", ".dog-button", renderDogs);


});