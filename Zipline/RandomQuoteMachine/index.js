$(document).ready(function() {

    var tweetButton = document.getElementById('tweet-button');

    function postQuote() {
        $.ajax({
                url: "http://api.forismatic.com/api/1.0/",

                dataType: "jsonp",
                jsonpCallback: "callback",

                data: {
                    method: "getQuote",
                    format: "jsonp",
                    lang: "en",
                    jsonp: "callback"
                }
            }).
            // Work with the response
        done(function(response) {
            console.log(response); // server response
            $("#new-quote").html('"' + response.quoteText + '"');
            $("#author-quote").html(response.quoteAuthor);
            tweetButton.src = tweetButton.src.replace(/&text=[^&]+/, "&text=" + encodeURIComponent(response.quoteText + " - " + response.quoteAuthor));
        }).
        fail(function(xhr, status, errorThrown) {
                console.log("Sorry, there was a problem!");
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
                console.dir(xhr);
            }).
            // Code to run regardless of success or failure
        always(function(xhr, status) {
            //alert("The request is complete!");
            console.log(xhr);
        });
    }

    postQuote();

    $("#quote").click(function() {

        postQuote();

    });

});