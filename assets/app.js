$(document).ready(function () {

    //1. Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.
    //    * We chose animals for our theme, but you can make a list to your own liking.
    var topics = ["pug", "beagle", "german shepherd", "bulldog", "pitbull"];
    var resultNum = 9;

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
            searchTerm + "&api_key=dc6zaTOxFJmzC&limit=" + resultNum;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var results = response.data;

            for (i = 0; i < resultNum; i++) {
                var dogDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating).addClass("my-0");
                dogImage = $("<img>").attr("src", results[i].images.fixed_height_still.url);
                dogImage.attr("data-still", results[i].images.fixed_height_still.url);
                dogImage.attr("data-animate", results[i].images.fixed_height.url);
                dogImage.attr("data-state", "still");
                dogImage.addClass("gif");
                dogDiv.addClass("my-3 col-lg-4");
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

    $(".gif").on("click", function () {
        var state = $(this).attr("data-state");
        var animated = $(this).attr("data-animate");
        var stilled = $(this).attr("data-still");
        
        if (state === "still") {
            $(this).attr("src", animated);
            $(this).attr("data-state", "animate");
            // console.log(state);
        } else {
            $(this).attr("src", stilled);
            $(this).attr("data-state", "still");
            // console.log(state);
        }
    });

    renderButtons();

    $(document).on("click", ".dog-button", renderDogs);


});