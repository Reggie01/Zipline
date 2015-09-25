$(document).ready(function () {

    var twitchStreamers = ["trumpsc", "freecodecamp", "brunofin", "nightblue3", "ratsmah", "Dota2ruhub"];
    var allTwitchStreamers = {};
    var twitchStreamersOnlineElement = $("#twitch_users_online");
    var twitchStreamersOfflineElement = $("#twitch_users_offline");
    var allTwitchStreamersElement = $("#twitch_users_all");

    $("#btn_twitch_user").click(function (e) {
        e.preventDefault();
        var newTwitchStreamer = $('#twitch_user').val().toLowerCase().trim();
        console.log(twitchStreamers);
        if (twitchStreamers.indexOf(newTwitchStreamer) === -1 && newTwitchStreamer !== "") {
            twitchStreamers.push(newTwitchStreamer);
            makeAjaxCall(newTwitchStreamer);
        }

        $('#twitch_user').val("");

    });
    
    //TODO: this may need to be removed
    var tabs = {
        "online_tab" : function() { setListElementsForTabs("online", twitchStreamersOnlineElement) },
        "offline_tab" : function() { setListElementsForTabs("offline", twitchStreamersOfflineElement) },
        "all_users_tab" : function() { setListElementsForTabs("all_users_tab", allTwitchStreamersElement) }
    };

    function setListElementsForTabs(status, element) {
        if (status === "all_users_tab") {
            for (var user in allTwitchStreamers) {              
                console.log(user);
                      element.append(allTwitchStreamers[user]["domElement"]);    
            }
        } else {
            for (var user in allTwitchStreamers) {
                if (allTwitchStreamers[user]["status"] === status) {
                    element.append(allTwitchStreamers[user]["domElement"]);
                }
            }
        }
    }
    $('#myTabs a').click(function (e) {
        //e.preventDefault()
        $(this).tab('show');
        tabs[this.id]();
    });

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
            element.className = classNames.length > 0 ? classNames.join(" ").replace(/,/g, "") : "";
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

    function createListItems(user) {

        if (user.logo !== undefined) {
            var image = createDomElement("img", ["img-circle", "img-responsive", "center-block"], { "src" : user.logo });
        } else {
            var image = createDomElement("img", ["img-circle", "img-responsive", "center-block"], { "src" : "http://placehold.it/150x150" });
        }

        var a = createDomElement("a", [], {
                "href" : "#"
            });

        a.appendChild(image);

        var mediaLeft = createDomElement("div", ["col-xs-12 col-sm-4"]);
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
        var mediaBody = createDomElement("div", ["col-xs-12 col-sm-4"]);
        mediaBody.appendChild(mediaHeading);
        mediaBody.appendChild(header6);

        var statusHolder = createDomElement("a", [], {
                "href" : user.url,
                "target" : "_blank"
            });

        var icon = createDomElement("i", [getOnlineStatus(user.status)]);
        var statusTextElement = document.createTextNode(user.status);
        var spanElementForStatusTextElement = document.createElement("span");
        spanElementForStatusTextElement.appendChild(statusTextElement);
        statusHolder.appendChild(icon);
        statusHolder.appendChild(spanElementForStatusTextElement);

        var mediaRight = createDomElement("div", ["col-xs-12 col-sm-4"]);
        mediaRight.appendChild(statusHolder);

        var media = createDomElement("div", ["media"]);
        media.appendChild(mediaLeft);
        media.appendChild(mediaBody);
        media.appendChild(mediaRight);

        var list = createDomElement("li", ["list-group-item row"]);
        list.appendChild(media);

        allTwitchStreamersElement.append(list);

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

    function addStreamerToAlllTwitchStreamers(user) {

        var twitchStreamer = {};

        if (user.error === null || user.error === undefined) {
            twitchStreamer.name = getName(user["_links"]["channel"]);
            if (Object.keys(allTwitchStreamers).indexOf(twitchStreamer.name) !== "") {
                var url = "http://www.twitch.tv/" + twitchStreamer.name;
                twitchStreamer["url"] = url;
                twitchStreamer.status = user["stream"] === null ? "offline" : "online";
                if (twitchStreamer.status === "online") {
                    twitchStreamer.statusDetails = user["stream"]["channel"]["status"];
                    twitchStreamer.logo = user["stream"]["channel"]["logo"];
                } else {
                    twitchStreamer.statusDetails = "";
                }
                allTwitchStreamers[twitchStreamer.name] = twitchStreamer;
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
            allTwitchStreamers[twitchStreamer.name] = twitchStreamer;
        }

        return twitchStreamer.name;
    }

    function getTwitchUsersAndAddToList(a) {

        var args = Array.prototype.slice.call(arguments);
        var i = 0,
        len = args.length;

        var names = [];
        if (!Array.isArray(args[0])) {
            names.push(addStreamerToAlllTwitchStreamers(args[0]));

        } else {

            for (i; i < len; i++) {
                names.push(addStreamerToAlllTwitchStreamers(args[i][0]));
            }
        }

        //TODO: Check that this is written correctly
        //remvoveTwitchUserListFromDom("#twitch_user_list");

        if (Array.isArray(args[0])) {

            names.forEach(function (name) {
                createListItems(allTwitchStreamers[name]);
            });
        } else {
            createListItems(allTwitchStreamers[names[0]]);
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

    makeAjaxCall(twitchStreamers);

});
