//  This object will house all of the variables and logic used by the GIF app
var GifTastic = {

    //  This array contains all of the buttons that will be available when the page is loaded
    gifTopics: [
        'cats',
        'dogs',
        'turtles',
        'birds',
    ],

    userTopic: "",

    //  This function will dynamically create buttons from the gifTopics array.  As new topics are entered by the user, this function will clear all current buttons and repopulate the targetted div
    buttonMaker: function () {
        $("#gif-topics-div").empty();
        for (i = 0; i < this.gifTopics.length; i++) {
            var a = $("<button>");
            a.addClass("waves-effect waves-light btn topic");
            a.attr("gif-topic-text", this.gifTopics[i]);
            // Setting the text of the button to our answers
            a.html(this.gifTopics[i]);
            $("#gif-topics-div").append(a);
            console.log('button ' + i + ' created!');
        }
    },

    //  This functions sets a listener function on the search button.  When a user enters a new search topic, the value 
    addTopic: function () {
        $(document).on("click", "#user-submit-btn", function () {
            GifTastic.userTopic = $("#user_search").val().trim().toLowerCase();
            console.log(GifTastic.userTopic);

            // This will only add the topic if it is not currently in the gifTopics array
            if (GifTastic.gifTopics.indexOf(GifTastic.userTopic) === -1) {
                GifTastic.gifTopics.push(GifTastic.userTopic);
                GifTastic.buttonMaker();
            }
        });
    },

    getGIFs: function () {
        $(document).on("click", ".topic", function () {
            var currentTopic = $(this).attr("gif-topic-text");
            // This will determine how many GIFs are generated
            var queryLimit = 10;
            var apiKEY = "WDFSdZEIcI6VAE8y880eQ6yC8etvDZhF";
            // Adding the above variables to the API query URL
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + currentTopic + "&api_key=" + apiKEY + "&limit=" + queryLimit;

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                $('.carousel').carousel('destroy');
                $("#gif-carousel").empty();
                console.log(response);
                for (i = 0; i < queryLimit; i++) {
                    $("#gif-carousel").append(
                        `
                        <a class="carousel-item">
                            <p class="center">
                                Rating: ${response.data[i].rating}
                            </p>
                            <br>
                            <img src="https://media.giphy.com/media/${response.data[i].id}/giphy.gif" alt="${response.data[i].title}"/>
                        </a>
            
                        `
                    );
                }
                $('.carousel').carousel();
            });
        });
    },
};

//  Setting these functions to begin when the document loads
//  Without embedding these in the document.ready function, 
// they will execute before the jQuery script can be loaded
$(document).ready(function () {
    GifTastic.buttonMaker();
    GifTastic.addTopic();
    GifTastic.getGIFs();
});
