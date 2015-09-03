$(document).ready(function() {
  
  var weatherConditionCodes = {
    200: { "meaning": "thunderstorm with light rain", icon: "wi-owm-200"},
    201: { "meaning": "thunderstorm with rain", icon: "wi-owm-201"},
    202: { "meaning": "thunder with heavy rain", icon: "wi-owm-202"},
    210: { "meaning": "light thunderstorm", icon: "wi-owm-210"},
    211: {"meaning": "thunderstorm", icon: "wi-owm-211"},
    212: { "meaning": "heavy thunderstorm", icon: "wi-owm-212"},
    221: { "meaning": "ragged thunderstorm", icon: "wi-owm-221"},
    230: { "meaning": "thunderstorm with light drizzle", icon: "wi-owm-230"},
    231: { "meaining": "thunderstorm with drizzle", icon: "wi-owm-231"},
    232: { "meaning": "thunderstorm with heavy drizzle", icon: "wi-owm-232"},
    300: { "meaning": "light intensity drizzle", icon: "wi-owm-300"},
    301: { "meaning": "drizzle", icon: "wi-owm-301"},
    302: { "meaning": "heavy intensity drizzle", icon: "wi-owm-302"},
    310: { "meaning": "drizzle rain", icon:"wi-owm-310"},
    311: { "meaning": "drizzle rain", icon: "wi-owm-311"},
    312: { "meaning": "heavy intensity drizzle rain", icon: "wi-owm-312"},
    313: { "meaning": "shower rain and drizzle", icon: "wi-owm-313"},
    314: { "meaning": "heavy shower rain and drizzle", icon: "wi-owm-314"},
    321: { "meaning": "shower drizzle", icon: "wi-owm-321"},
    500: { "meaning": "light rain", icon: "wi-owm-500"},
    501: { "meaning": "moderate rain", icon: "wi-owm-501"},
    502: { "meaning": "heavy intensity rain", icon: "wi-owm-502"},
    503: { "meaning": "very heavy rain", icon: "wi-owm-503"},
    504: { "meaning": "extreme rain", icon: "wi-owm-504"},
    511: { "meaning": "freezing rain", icon: "wi-owm-511"}, 
    520: { "meaning": "light intensity shower rain", icon: "wi-owm-520"},
    521: { "meaning": "shower rain", icon: "wi-owm-521"},
    522: { "meaning": "heavy intensity shower rain", icon: "wi-owm-522"}, 
    531: { "meaning": "ragged shower rain", icon: "wi-owm-531"}, 
    600: { "meaning": "light snow", icon: "wi-owm-600"},
    601: { "meaning": "snow", icon: "wi-owm-601"},
    602: { "meaning": "heavy snow", icon: "wi-owm-602"},
    611: { "meaning": "sleet", icon: "wi-owm-611"},
    612: { "meaning": "shower sleet", icon: "wi-owm-612"},
    615: { "meaning": "light shower snow", icon: "wi-owm-615"},
    616: { "meaning": "rain and snow", icon: "wi-owm-616"},
    620: { "meaning": "light shower snow", icon: "wi-owm-620"},
    621: { "meaning": "shower snow", icon: "wi-owm-621"},
    622: { "meaning": "heavy shower snow", icon: "wi-owm-622"},
    701: { "meaning": "mist", icon: "wi-owm-701"},
    711: { "meaning": "smoke", icon: "wi-owm-711"},
    721: { "meaning": "haze", icon: "wi-owm-721"}, 
    731: { "meaning": "sand, dust whirls", icon: "wi-owm-731"},
    741: { "meaning": "fog", icon: "wi-owm-741"},
    751: { "meaning": "sand", icon: "wi-sandstorm"},
    761: { "meaning": "dust", icon: "wi-owm-761"},
    762: { "meaning": "volcanic ash", icon: "wi-owm-762"},
    771: { "meaning": "squalls", icon: "wi-owm-771"},
    781: { "meaning": "tornado", icon: "wi-owm-781"},
    800: { "meaning": "clear sky", icon: "wi-owm-800"},
    801: { "meaning": "few clouds", icon: "wi-owm-801"}, 
    802: { "meaning": "few clouds", icon: "wi-owm-802"}, 
    803: { "meaning": "broken clouds", icon: "wi-owm-803"},
    804: { "meaning": "overcast clouds", icon: "wi-owm-804"}, 
    900: { "meaning": "tornado", icon: "wi-owm-900"},
    901: { "meaning": "tropical storm", icon: "wi-owm-901"},
    902: { "meaning": "hurricane", icon: "wi-owm-902"},
    903: { "meaning": "cold", icon: "wi-owm-903"},
    904: { "meaning": "hot", icon: "wi-owm-904"},
    905: { "meaning": "windy", icon: "wi-owm-905"},
    906: { "meaning": "hail", icon: "wi-owm-906"},
    951: { "meaning": "calm", icon: ""},
    952: { "meaning": "light breeze", icon: ""},
    953: { "meaning": "gentle breeze", icon: ""},
    954: { "meaning": "moderate breeze", icon: ""},
    955: { "meaning": "fresh breeze", icon: ""},
    956: { "meaning": "strong breeze", icon: "wi-strong-wind"},
    957: { "meaning": "high wind, near gale", icon: "wi-owm-957"},
    958: { "meaning": "gale", icon: "wi-gale-warning"},
    959: { "meaning": "severe gale", icon: "wi-gale-warning" },
    960: { "meaning": "storm", icon: "wi-thunderstorm"},
    961: { "meaning": "violent storm", icon: ""},
    962: { "meaning": "hurricane", icon: "wi-owm-902"}
  }


  $("#click").click(function() {
     
     var url = "http://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&APPID=841fa5fa76dc867d0918d734c2f82f48";
     
     $.ajaxSetup({
        type: 'GET',
        dataType: " jsonp"
     });
     
     function getWeather(geo) {
        var geoLocation = geo.loc.split(",");
        var latitude = geoLocation[0];
        var longitude = geoLocation[1];

        $.ajax({
          url:  url.replace(/lat=[^A]+/, "lat=" + encodeURIComponent(latitude) + "&lon="  + encodeURIComponent(longitude) + "&")
        }).
         done(function(response) {
          
          var city = response["city"]["name"];
          var country = response["city"]["country"];
          
          var KelvinToFarenheit = (1/-457.87) ;
          
          var currentTemp = KelvinToFarenheit * (response["list"][0]["main"]["temp"]);
          var currentTime = new Date(response["list"][0]["dt"]).toISOString();
          var humidity = response["list"][0]["humidity"];
          var windSpd = response["list"][0]["wind"]["speed"];
          var windDegree = response["list"][0]["wind"]["deg"];
          var weatherID = response["list"][0]["weather"][0]["id"];
          var weatherCondition = weatherConditionCodes[weatherID]["meaning"];
          var weatherIcon = weatherConditionCodes[weatherID]["icon"];
          
          $(".weather-city").html("<span>" + city + ", " + country+"</span>");
          $(".weather-conditions").html("<span>" +weatherCondition+ "</span>");
          $(".weather-wind").html("<span>"+ windSpd + "</span>");
          $("i").removeClass().addClass("wi " + weatherIcon);
          $(".weather-temp").html("<span>" + currentTemp + "</span>");
          
          console.log(geo);
          console.log(response);
       }).
       fail(function(xhr, status, errorThrown){
        console.log("Sorry there was a problem.");
        console.log("Error: " + errorThrown);
        console.log("Status: " + status);
        console.dir(xhr);
       }).
       always(function(xhr, status) {
        alert("The request is completed.");
       });
     }
     
     function getGeoCoords() {
        return $.ajax({
         url: "http://ipinfo.io"
        }).
       /*done(function(response) {
         console.log(response.ip, response.country, response.city, response.loc);
       }). */
        fail(function(xhr, status, errorThrown){
        console.log("Sorry, there was a problem");
        console.log("Error: " + errorThrown);
        console.log("Status: " + status);
        console.dir(xhr);
      }).
      always(function(xhr, status) {
        //alert("The request is completed.");
      });
      
     }
     
     
     getGeoCoords().then(getWeather)
          
  });
});