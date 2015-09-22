$(document).ready(function () {

    var twitchUsers = ["trumpsc", "freecodecamp"];

    var twitchUsersStatusObject = {};

    $("#btn_twitch_user").click(function () {
        var newTwitchUser = $('#twitch_user').val().toLowerCase().trim();

        if (twitchUsers.indexOf(newTwitchUser) === -1 && newTwitchUser !== "") {
            twitchUsers.push(newTwitchUser);
        }
        $('#twitch_user').val("");
        makeAjaxCall();

    });
    
    var onlineStatus = {
         "yes": "media-object fa fa-check",
         "no":  "media-object fa fa-times",
         "closed": "media-object fa fa-exclamation-triangle"
    }

    function getOnlineStatus(status) {
        return onlineStatus[status];
    }

    function emptyTwitchElementList(parent) {
        var unorderedList = $(parent);
        unorderedList.empty();
    }

    function createListItems(user) {

        var image = document.createElement("img");
        if(user.logo !== undefined){
             image.setAttribute("src", user.logo);
             image.setAttribute("width", 200);
             image.setAttribute("height", 150);
        } else {
             image.setAttribute("src", "http://placehold.it/200x150");
        }       
        image.className = "pull-left img-circle";

        var a = document.createElement("a");
        a.setAttribute("href", "#");

        a.appendChild(image);

        var mediaLeft = document.createElement("div");
        mediaLeft.className = "media-left";
        mediaLeft.appendChild(a);

        var mediaHeadingTitle = document.createTextNode(user.name);
        var mediaHeading = document.createElement("h4");
        mediaHeading.className = "media-heading";
        mediaHeading.appendChild(mediaHeadingTitle);

        if (user.statusDetails !== "") {
            var statusDetailsText = document.createTextNode(user.statusDetails);
        } else {
            var statusDetailsText = document.createTextNode("");
        }

        var header6 = document.createElement("h6");
        header6.appendChild(statusDetailsText);
        var mediaBody = document.createElement("div");
        mediaBody.className = "media-body";
        mediaBody.appendChild(mediaHeading);
        mediaBody.appendChild(header6);

        var icon = document.createElement("i");
        icon.className = getOnlineStatus(user.status);

        var statusHolder = document.createElement("a");
        statusHolder.setAttribute("href", user.url);
        statusHolder.setAttribute("target", "_blank");
        statusHolder.appendChild(icon);

        var mediaRight = document.createElement("div");
        mediaRight.className = "media-right";
        mediaRight.appendChild(statusHolder);

        var media = document.createElement("div");
        media.className = "media";
        media.appendChild(mediaLeft);
        media.appendChild(mediaBody);
        media.appendChild(mediaRight);

        var list = document.createElement("li");
        list.className = "list-group-item";
        list.appendChild(media);
        var unorderedList = $("#twitch_user_list");
        unorderedList.append(list);

    }

    function checkOnlineStatus(list) {

        var aList = list.map(function (user) {
                var url = "https://api.twitch.tv/kraken/streams/" + user + "?api_version=3";

                return $.ajax({
                    url : url,
                    jsonp : "callback"
                });

            });

        return aList;

    }

    $.ajaxSetup({
        type : "GET",
        dataType : "jsonp",
    });

    var matchChannelAndName = /(\/channels\/+)(.*)/;
    var listOfTwitchUsers = [];

    function getName(link) {

        var match;
        try {
            match = matchChannelAndName.exec(link);

            return match[match.length - 1];
        } catch (e) {
            console.log(e);
        }

    }
    function getTwitchUsersAndAddToList(a) {

        var args = Array.prototype.slice.call(arguments);

        var i = 0,
        len = args.length;
        for (i; i < len; i++) {
            var twitchStreamer = {};
            console.log(args[i][0]);
            
            if (args[i][0].error === null || args[i][0].error === undefined) {
                twitchStreamer.name = getName(args[i][0]["_links"]["channel"]);
                if (Object.keys(twitchUsersStatusObject).indexOf(twitchStreamer.name) !== "") {
                    var url = "http://www.twitch.tv/" + twitchStreamer.name;
                    twitchStreamer["url"] = url;
                    twitchStreamer.status = args[i][0]["stream"] === null ? "no" : "yes";
                    if (twitchStreamer.status === "yes") {
                        twitchStreamer.statusDetails = args[i][0]["stream"]["channel"]["status"];
                        twitchStreamer.logo = args[i][0]["stream"]["channel"]["logo"];
                    } else {
                        twitchStreamer.statusDetails = "";
                    }
                    twitchUsersStatusObject[twitchStreamer.name] = twitchStreamer;
                }
            } else {
                 var messageArray = args[i][0].message.split(" ");
                 messageArray[1] = messageArray[1].replace(/'/g, "");
                 var userName = messageArray[1]
                 var messageString = messageArray.join(" ");
                 twitchStreamer.name = userName;
                 twitchStreamer.status = "closed";
                  twitchStreamer["url"] = "";
                 twitchStreamer.statusDetails = messageString;
                 twitchUsersStatusObject[twitchStreamer.name] = twitchStreamer;
            }
            //console.log(twitchUsersStatusObject);
        }

        emptyTwitchElementList("#twitch_user_list");

        for (var user in twitchUsersStatusObject) {
            createListItems(twitchUsersStatusObject[user]);
        }

    }
    function makeAjaxCall() {
        $.when.apply($, checkOnlineStatus(twitchUsers)).
        then(getTwitchUsersAndAddToList).
        fail(function (xhr, status, errorThrown) {
            console.log("Sorry there was a problem.");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
        });
    }

    makeAjaxCall();

});
