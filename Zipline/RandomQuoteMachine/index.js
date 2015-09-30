$(document).ready(function() {
    "use strict";
    
    var AjaxErrorHandler = (function() {
         return{
             errorHandler : function(xhr, status, errorThrown) {
                 console.log("Sorry, there was a problem!");
                 console.log("Error: " + errorThrown);
                 console.log("Status: " + status);
                 console.dir(xhr);
             } ,
             alwaysHandler : function(xhr, status) {
                 //console.log(xhr);
             }
         };
    })();
    
    var TweetModule = (function(ajaxHandler) {
       var tweetButton = document.getElementById('tweet-button');
       var ajaxCall = function() {
            return $.ajax({
                url: "http://api.forismatic.com/api/1.0/",

                dataType: "jsonp",
                jsonpCallback: "callback",

                data: {
                    method: "getQuote",
                    format: "jsonp",
                    lang: "en",
                    jsonp: "callback"
                }
            });
       }; 
       return {
            updateDom : function(response) {
                $("#new-quote").html('"' + response.quoteText + '"');
                $("#author-quote").html(response.quoteAuthor);
                tweetButton.src = tweetButton.src.replace(/&text=[^&]+/, "&text=" + encodeURIComponent(response.quoteText + " - " + response.quoteAuthor));
            },
            getAjaxCall : function() {
                 return ajaxCall();
            },
           getQuote: function postQuote() {
               TweetModule.getAjaxCall().
               done(TweetModule.updateDom).
               fail(ajaxHandler.errorHandler).
               always(ajaxHandler.alwaysHandler);
           }  
       };
    })(AjaxErrorHandler);

    TweetModule.getQuote();

    $("#quote").click(function(e) {
        e.preventDefault();
        TweetModule.getQuote();
    });

});