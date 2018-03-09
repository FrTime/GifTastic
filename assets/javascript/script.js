
// This object will house all of the variables and logic used by the GIF app
var GifTastic = {

    // This array contains all of the buttons that will be available when the page is loaded
    gifTopics: [
        'cats',
        'dogs',
        'cars',
        'planes',
    ],

    buttonMaker: function () {
        for (i = 0; i < this.gifTopics.length; i++) {
            var $btn = $(
                `
                <button class="btn waves-effect waves-light topic> ${GifTastic.gifTopics[i]} </button>
                `
            );
            $(".giftopics").append($btn);
            console.log('button ' + i + ' created!');
        }
    },

};

GifTastic.buttonMaker();
