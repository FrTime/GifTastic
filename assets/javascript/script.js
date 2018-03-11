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

    stillGifs: {
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
        9: "",
    },

    animatedGifs: {
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
        9: "",
    },

    gifTitle: {
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
        9: "",
    },

    //  This function will dynamically create buttons from the gifTopics array.  As new topics are entered by the user, this function will clear all current buttons and repopulate the targetted div with the current topics.
    buttonMaker: function () {
        $("#gif-topics-div").empty();
        for (i = 0; i < this.gifTopics.length; i++) {
            var a = $("<button>");
            a.addClass("waves-effect waves-light btn topic");
            //  Adding an attribute that can be called later in an API query 
            a.attr("gif-topic-text", this.gifTopics[i]);
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

    //  This function will populate the carousel with GIFs relating to the topic clicked
    getGIFs: function () {
        $(document).on("click", ".topic", function () {
            //  Using the attribute tag as the text for an API query
            var currentTopic = $(this).attr("gif-topic-text");
            //  This will determine how many GIFs are generated
            var queryLimit = 10;
            var apiKEY = "WDFSdZEIcI6VAE8y880eQ6yC8etvDZhF";
            //  Adding the above variables to the API query URL
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + currentTopic + "&api_key=" + apiKEY + "&limit=" + queryLimit;
            //  The below AJAX function will request 10 GIFs of the chosen topic from the server and return them as JSON objects
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                //  Clearing and emptying the carousel on every click so that it can be repopulated
                $('.carousel').carousel('destroy');
                $("#gif-carousel").empty();
                console.log(response);
                //  This function will cycle through each of the GIFs as they are retrieved from the server
                for (i = 0; i < queryLimit; i++) {
                    //  Saving the URLs for both still and animated images to local variables so they can be called elsewhere
                    GifTastic.stillGifs[i] = response.data[i].images.original_still.url
                    GifTastic.animatedGifs[i] = response.data[i].images.original.url
                    //  Adding each GIF to the carousel with the associated variables pulled from the JSON object, all GIFs are initally set to still images
                    $("#gif-carousel").append(
                        `
                        <a class="carousel-item">
                            <p class="center">
                                Rating: ${response.data[i].rating}
                            </p>
                            <br>
                            <img class="gif gif-${i}" id=${i} src="${GifTastic.stillGifs[i]}" alt="${response.data[i].title}"/>
                        </a>
            
                        `
                    );

                }
                //  Setting the first GIF added to an animated image as it will be the active image when the carousel is loaded
                $(".gif-0").attr('src', GifTastic.animatedGifs[0]);
                console.log("setting to animated");
                //  Initializing the carousel
                $('.carousel').carousel();
                //  This function (defined next) will allow for each GIF that is clicked to become animated
                GifTastic.animateGifs();
            });
        });
    },

    //  This function will cycle through the gifs inside of the carousel and set each image source to a still image.  After setting all of the GIFs to a still image, the GIF that was clicked is set to an animated image.
    animateGifs: function () {
        $(".gif").on('click', function () {
            console.log("id = " + $(this).attr('id'));
            for (i = 0; i < 10; i++) {
                $(".gif-" + i).attr('src', GifTastic.stillGifs[i]);
            };
            //  Using the ID of the image to correspond to the associated index within the animatedGifs array.
            $(this).attr('src', GifTastic.animatedGifs[$(this).attr('id')]);
        });
    },
};

//  Setting these functions to begin when the document loads
//  Without embedding these in the document.ready function they will execute before the jQuery script can be loaded
$(document).ready(function () {
    GifTastic.buttonMaker();
    GifTastic.addTopic();
    GifTastic.getGIFs();
});
