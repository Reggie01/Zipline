$(document).ready(function () {

    var twitchUsers = ["trumpsc", "freecodecamp", "brunofin", "nightblue3", "ratsmah", "Dota2ruhub"];

    var twitchUsersStatusObject = {};

    $("#btn_twitch_user").click(function () {
        var newTwitchUser = $('#twitch_user').val().toLowerCase().trim();

        if (twitchUsers.indexOf(newTwitchUser) === -1 && newTwitchUser !== "") {
            twitchUsers.push(newTwitchUser);
        }

        $('#twitch_user').val("");
        makeAjaxCall(newTwitchUser);

    });
    var twitchUsersOnlineElement = $("#twitch_users_online");
    var twitchUsersOffline = $("#twitch_users_offline");

    function getListElementsForTabs(status, element) {
        for (var user in twitchUsersStatusObject) {

            if (twitchUsersStatusObject[user]["status"] === status) {

                element.append(twitchUsersStatusObject[user]["domElement"]);
            }
        }
    }
    $('#myTabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show');
        //console.log(this.id);
        if (this.id === "online_tab") {

            getListElementsForTabs("online", twitchUsersOnlineElement);
        }
        if (this.id === "offline_tab") {
            getListElementsForTabs("offline", twitchUsersOffline);
        }
    });

    //TODO: this may need to be removed
    var tabs = {
        "online_tab" : [],
        "users_tab" : [],
        "offline_tab" : []
    };

    /* class names for online status check */
    var onlineStatus = {
        "online" : "media-object fa fa-check",
        "offline" : "media-object fa fa-times",
        "closed" : "media-object fa fa-exclamation-triangle"
    }

    function getOnlineStatus(status) {
        return onlineStatus[status];
    }

    function remvoveTwitchUserListFromDom(parent) {
        var unorderedList = $(parent);
        unorderedList.empty();
    }

    // createDomElement(tag, [classNames],{width: 222})
    function createDomElement(tag) {
        if (tag === undefined || tag === "") {
            return document.createElement("div");
        }
        var element = document.createElement(tag);
        /* check for additional argument passed */
        if (arguments[1] !== null) {
            var classNames = arguments[1];
            element.className = classNames.length > 0 ? classNames.join(" ") : "";
        }

        if (arguments[2] !== null) {

            var attributes = arguments[2];

            /* The obj is the name. names i.e src, width, height
            Turn name into a string. Then pass to setAttribute along with value for attribute.
             */
            for (var obj in attributes) {
                element.setAttribute(obj + "", attributes[obj]);
            }
        }

        return element;
    }

    var unorderedList = $("#twitch_user_all");

    function createListItems(user) {

        if (user.logo !== undefined) {

            var image = createDomElement("img", ["pull-left img-circle"], {
                    "src" : user.logo,
                    "width" : 200,
                    "height" : 150
                });
        } else {

            var image = createDomElement("img", ["pull-left img-circle"], {
                    "src" : "http://placehold.it/200x150"
                })
        }

        var a = createDomElement("a", [], {
                "href" : "#"
            });

        a.appendChild(image);

        var mediaLeft = createDomElement("div", ["media-left"]);
        mediaLeft.appendChild(a);

        var mediaHeadingTitle = document.createTextNode(user.name);
        var mediaHeading = createDomElement("h4", ["media-heading"]);
        mediaHeading.appendChild(mediaHeadingTitle);

        if (user.statusDetails !== "") {
            var statusDetailsText = document.createTextNode(user.statusDetails);
        } else {
            var statusDetailsText = document.createTextNode("");
        }

        var header6 = document.createElement("h6");
        header6.appendChild(statusDetailsText);
        var mediaBody = createDomElement("div", ["media-body"]);
        mediaBody.appendChild(mediaHeading);
        mediaBody.appendChild(header6);

        var statusHolder = createDomElement("a", [], {
                "href" : user.url,
                "target" : "_blank"
            });

        var icon = createDomElement("i", [getOnlineStatus(user.status)]);
        statusHolder.appendChild(icon);

        var mediaRight = createDomElement("div", ["media-right"]);
        mediaRight.appendChild(statusHolder);

        var media = createDomElement("div", ["media"]);
        media.appendChild(mediaLeft);
        media.appendChild(mediaBody);
        media.appendChild(mediaRight);

        var list = createDomElement("li", ["list-group-item"]);
        list.appendChild(media);

        unorderedList.append(list);

        user.domElement = list;

    }

    var Module = (function () {
        return {
            ajaxCall : function (url) {

                return $.ajax({
                    url : url,
                    jsonp : "callback"
                });
            }
        }
    })();

    function checkOnlineStatus(list) {
        var aList;
        var url;
        if (Array.isArray(list)) {
            var aList = list.map(function (user) {
                    url = "https://api.twitch.tv/kraken/streams/" + user + "?api_version=3";
                    return Module.ajaxCall(url);

                });
        } else {
            url = "https://api.twitch.tv/kraken/streams/" + list + "?api_version=3";

            return [Module.ajaxCall(url)];
        }

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

    function addUserToTwitchUsersStatusObject(user) {

        var twitchStreamer = {};

        if (user.error === null || user.error === undefined) {
            twitchStreamer.name = getName(user["_links"]["channel"]);
            if (Object.keys(twitchUsersStatusObject).indexOf(twitchStreamer.name) !== "") {
                var url = "http://www.twitch.tv/" + twitchStreamer.name;
                twitchStreamer["url"] = url;
                twitchStreamer.status = user["stream"] === null ? "offline" : "online";
                if (twitchStreamer.status === "online") {
                    twitchStreamer.statusDetails = user["stream"]["channel"]["status"];
                    twitchStreamer.logo = user["stream"]["channel"]["logo"];
                } else {
                    twitchStreamer.statusDetails = "";
                }
                twitchUsersStatusObject[twitchStreamer.name] = twitchStreamer;
            }
        } else {
            var messageArray = user.message.split(" ");
            messageArray[1] = messageArray[1].replace(/'/g, "");
            var userName = messageArray[1]
                var messageString = messageArray.join(" ");
            twitchStreamer.name = userName;
            twitchStreamer.status = "closed";
            twitchStreamer["url"] = "";
            twitchStreamer.statusDetails = messageString;
            twitchUsersStatusObject[twitchStreamer.name] = twitchStreamer;
        }

    }

    function getTwitchUsersAndAddToList(a) {

        var args = Array.prototype.slice.call(arguments);
        var i = 0,
        len = args.length;

        if (!Array.isArray(args[0])) {
            addUserToTwitchUsersStatusObject(args[0]);

        } else {

            for (i; i < len; i++) {
                addUserToTwitchUsersStatusObject(args[i][0]);
            }
        }

        //TODO: Check that this is written correctly
        //remvoveTwitchUserListFromDom("#twitch_user_list");

        if (len > 1) {
            for (var user in twitchUsersStatusObject) {
                createListItems(twitchUsersStatusObject[user]);
            }
        } else {
            createListItems(twitchUsersStatusObject[twitchStreamer.name]);
        }

    }
    function makeAjaxCall(users) {
        $.when.apply($, checkOnlineStatus(users)).
        then(getTwitchUsersAndAddToList).
        fail(function (xhr, status, errorThrown) {
            console.log("Sorry there was a problem.");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
        });
    }

    makeAjaxCall(twitchUsers);

});
