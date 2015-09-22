$(document).ready(function () {

    var twitchUsers = ["trumpsc", "freecodecamp"];
    var twitchUsersStatus = [];

    $("#btn_twitch_user").click(function () {
        
        twitchUsers.push($('#twitch_user').val().toLowerCase());
        $(twitch_user).text("");
        makeAjaxCall();
        console.log(twitchUsers);
    });

    function getOnlineStatus(status) {
        return status === "yes" ? "media-object fa fa-check" : "media-object fa fa-times";
    }
    
    function emptyTwitchElementList(parent) {
         var unorderedList = $(parent);
         unorderedList.empty();        
    }

    function createListItems(name, status) {
        var image = document.createElement("img");
        image.setAttribute("src", "http://www.designerstalk.com/forums/image.php?u=6430&dateline=1287752962");
        image.className = "pull-left img-rounded";

        var a = document.createElement("a");
        a.setAttribute("href", "#");

        a.appendChild(image);

        var mediaLeft = document.createElement("div");
        mediaLeft.className = "media-left";
        mediaLeft.appendChild(a);

        var mediaHeadingTitle = document.createTextNode(name);
        var mediaHeading = document.createElement("h4");
        mediaHeading.className = "media-heading";
        mediaHeading.appendChild(mediaHeadingTitle);
        var mediaBody = document.createElement("div");
        mediaBody.className = "media-body";
        mediaBody.appendChild(mediaHeading);

        var icon = document.createElement("i");
        icon.className = getOnlineStatus(status);

        var mediaRight = document.createElement("div");
        mediaRight.className = "media-right";
        mediaRight.appendChild(icon);

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
            //console.log(match);
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
            twitchStreamer.name = getName(args[i][0]["_links"]["channel"]);
            twitchStreamer.status = args[i][0]["stream"] === null ? "no" : "yes";
            twitchUsersStatus.push(twitchStreamer);
        }
        //console.log(twitchUsersStatus);
        var j = 0,
        len = twitchUsersStatus.length;
        
        emptyTwitchElementList("#twitch_user_list");
        
        twitchUsersStatus.forEach(function (user) {
            createListItems(user.name, user.status);
        });

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
