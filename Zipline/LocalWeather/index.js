$(document).ready(function() {

    var weatherConditionCodes = {
        200: {
            "meaning": "thunderstorm with light rain",
            icon: "wi-owm-200",
            "condition": "thunderstorm"
        },
        201: {
            "meaning": "thunderstorm with rain",
            icon: "wi-owm-201",
            "condition": "thunderstorm"
        },
        202: {
            "meaning": "thunder with heavy rain",
            icon: "wi-owm-202",
            "condition": "thunderstorm"
        },
        210: {
            "meaning": "light thunderstorm",
            icon: "wi-owm-210",
            "condition": "thunderstorm"
        },
        211: {
            "meaning": "thunderstorm",
            icon: "wi-owm-211",
            "condition": "thunderstorm"
        },
        212: {
            "meaning": "heavy thunderstorm",
            icon: "wi-owm-212",
            "condition": "thunderstorm"
        },
        221: {
            "meaning": "ragged thunderstorm",
            icon: "wi-owm-221",
            "condition": "thunderstorm"
        },
        230: {
            "meaning": "thunderstorm with light drizzle",
            icon: "wi-owm-230",
            "condition": "thunderstorm"
        },
        231: {
            "meaining": "thunderstorm with drizzle",
            icon: "wi-owm-231",
            "condition": "thunderstorm"
        },
        232: {
            "meaning": "thunderstorm with heavy drizzle",
            icon: "wi-owm-232",
            "condition": "thunderstorm"
        },
        300: {
            "meaning": "light intensity drizzle",
            icon: "wi-owm-300",
            "condition": "drizzle"
        },
        301: {
            "meaning": "drizzle",
            icon: "wi-owm-301",
            "condition": "drizzle"
        },
        302: {
            "meaning": "heavy intensity drizzle",
            icon: "wi-owm-302",
            "condition": "drizzle"
        },
        310: {
            "meaning": "drizzle rain",
            icon: "wi-owm-310",
            "condition": "drizzle"
        },
        311: {
            "meaning": "drizzle rain",
            icon: "wi-owm-311",
            "condition": "drizzle"
        },
        312: {
            "meaning": "heavy intensity drizzle rain",
            icon: "wi-owm-312",
            "condition": "drizzle"
        },
        313: {
            "meaning": "shower rain and drizzle",
            icon: "wi-owm-313",
            "condition": "drizzle"
        },
        314: {
            "meaning": "heavy shower rain and drizzle",
            icon: "wi-owm-314",
            "condition": "drizzle"
        },
        321: {
            "meaning": "shower drizzle",
            icon: "wi-owm-321",
            "condition": "drizzle"
        },
        500: {
            "meaning": "light rain",
            icon: "wi-owm-500",
            "condition": "rain"
        },
        501: {
            "meaning": "moderate rain",
            icon: "wi-owm-501",
            "condition": "rain"
        },
        502: {
            "meaning": "heavy intensity rain",
            icon: "wi-owm-502",
            "condition": "rain"
        },
        503: {
            "meaning": "very heavy rain",
            icon: "wi-owm-503",
            "condition": "rain"
        },
        504: {
            "meaning": "extreme rain",
            icon: "wi-owm-504",
            "condition": "rain"
        },
        511: {
            "meaning": "freezing rain",
            icon: "wi-owm-511",
            "condition": "rain"
        },
        520: {
            "meaning": "light intensity shower rain",
            icon: "wi-owm-520",
            "condition": "rain"
        },
        521: {
            "meaning": "shower rain",
            icon: "wi-owm-521",
            "condition": "rain"
        },
        522: {
            "meaning": "heavy intensity shower rain",
            icon: "wi-owm-522",
            "condition": "rain"
        },
        531: {
            "meaning": "ragged shower rain",
            icon: "wi-owm-531",
            "condition": "rain"
        },
        600: {
            "meaning": "light snow",
            icon: "wi-owm-600",
            "condition": "snow"
        },
        601: {
            "meaning": "snow",
            icon: "wi-owm-601",
            "condition": "snow"
        },
        602: {
            "meaning": "heavy snow",
            icon: "wi-owm-602",
            "condition": "snow"
        },
        611: {
            "meaning": "sleet",
            icon: "wi-owm-611",
            "condition": "snow"
        },
        612: {
            "meaning": "shower sleet",
            icon: "wi-owm-612",
            "condition": "snow"
        },
        615: {
            "meaning": "light shower snow",
            icon: "wi-owm-615",
            "condition": "snow"
        },
        616: {
            "meaning": "rain and snow",
            icon: "wi-owm-616",
            "condition": "snow"
        },
        620: {
            "meaning": "light shower snow",
            icon: "wi-owm-620",
            "condition": "snow"
        },
        621: {
            "meaning": "shower snow",
            icon: "wi-owm-621",
            "condition": "snow"
        },
        622: {
            "meaning": "heavy shower snow",
            icon: "wi-owm-622",
            "condition": "snow"
        },
        701: {
            "meaning": "mist",
            icon: "wi-owm-701",
            "condition": "atmosphere"
        },
        711: {
            "meaning": "smoke",
            icon: "wi-owm-711",
            "condition": "atmosphere"
        },
        721: {
            "meaning": "haze",
            icon: "wi-owm-721",
            "condition": "atmosphere"
        },
        731: {
            "meaning": "sand, dust whirls",
            icon: "wi-owm-731",
            "condition": "atmosphere"
        },
        741: {
            "meaning": "fog",
            icon: "wi-owm-741",
            "condition": "atmosphere"
        },
        751: {
            "meaning": "sand",
            icon: "wi-sandstorm",
            "condition": "atmosphere"
        },
        761: {
            "meaning": "dust",
            icon: "wi-owm-761",
            "condition": "atmosphere"
        },
        762: {
            "meaning": "volcanic ash",
            icon: "wi-owm-762",
            "condition": "atmosphere"
        },
        771: {
            "meaning": "squalls",
            icon: "wi-owm-771",
            "condition": "atmosphere"
        },
        781: {
            "meaning": "tornado",
            icon: "wi-owm-781",
            "condition": "atmosphere"
        },
        800: {
            "meaning": "clear sky",
            icon: "wi-owm-800",
            "condition": "clouds"
        },
        801: {
            "meaning": "few clouds",
            icon: "wi-owm-801",
            "condition": "clouds"
        },
        802: {
            "meaning": "few clouds",
            icon: "wi-owm-802",
            "condition": "clouds"
        },
        803: {
            "meaning": "broken clouds",
            icon: "wi-owm-803",
            "condition": "clouds"
        },
        804: {
            "meaning": "overcast clouds",
            icon: "wi-owm-804",
            "condition": "clouds"
        },
        900: {
            "meaning": "tornado",
            icon: "wi-owm-900",
            "condition": "extreme"
        },
        901: {
            "meaning": "tropical storm",
            icon: "wi-owm-901",
            "condition": "extreme"
        },
        902: {
            "meaning": "hurricane",
            icon: "wi-owm-902",
            "condition": "extreme"
        },
        903: {
            "meaning": "cold",
            icon: "wi-owm-903",
            "condition": "extreme"
        },
        904: {
            "meaning": "hot",
            icon: "wi-owm-904",
            "condition": "extreme"
        },
        905: {
            "meaning": "windy",
            icon: "wi-owm-905",
            "condition": "extreme"
        },
        906: {
            "meaning": "hail",
            icon: "wi-owm-906",
            "condition": "extreme"
        },
        951: {
            "meaning": "calm",
            icon: "",
            "condition": "additional"
        },
        952: {
            "meaning": "light breeze",
            icon: "",
            "condition": "additional"
        },
        953: {
            "meaning": "gentle breeze",
            icon: "",
            "condition": "additional"
        },
        954: {
            "meaning": "moderate breeze",
            icon: "",
            "condition": "additional"
        },
        955: {
            "meaning": "fresh breeze",
            icon: "",
            "condition": "additional"
        },
        956: {
            "meaning": "strong breeze",
            icon: "wi-strong-wind",
            "condition": "additional"
        },
        957: {
            "meaning": "high wind, near gale",
            icon: "wi-owm-957",
            "condition": "additional"
        },
        958: {
            "meaning": "gale",
            icon: "wi-gale-warning",
            "condition": "additional"
        },
        959: {
            "meaning": "severe gale",
            icon: "wi-gale-warning",
            "condition": "additional"
        },
        960: {
            "meaning": "storm",
            icon: "wi-thunderstorm",
            "condition": "additional"
        },
        961: {
            "meaning": "violent storm",
            icon: "",
            "condition": "additional"
        },
        962: {
            "meaning": "hurricane",
            icon: "wi-owm-902",
            "condition": "additional"
        }
    };

    var weatherPictures = {
        thunderstorm: "https://github.com/Reggie01/Zipline/blob/master/Zipline/LocalWeather/images/3EPA01FY99.jpg?raw=true",
        drizzle: "https://github.com/Reggie01/Zipline/blob/master/Zipline/LocalWeather/images/E0A7D9FEC0.jpg?raw=true",
        rain: "https://github.com/Reggie01/Zipline/blob/master/Zipline/LocalWeather/images/WVJQXASGV2.jpg?raw=true",
        snow: "https://github.com/Reggie01/Zipline/blob/master/Zipline/LocalWeather/images/0HG4V8BOLU.jpg?raw=true",
        atmosphere: "",
        clouds: "https://github.com/Reggie01/Zipline/blob/master/Zipline/LocalWeather/images/G0HQJZEF3L.jpg?raw=true",
        extreme: "",
        additional: "",
        default: "",
    };
    
    var getWeatherCondition = function weatherCondition(weatherCodes) {
       if(weatherCodes !== "clouds") {
          $(".weather-city").css("color", "black");
          $(".wi").css("color", "black");
          $(".weather-temp").css("color", "black");
          $("#weather-conditions").css("color", "black");
          
       }
       
    };
    
    var windImages = {
        0: {
            icon: "wi wi-wind towards-0-deg",
            text: "n"
        },
        23: {
            icon: "wi wi-wind towards-23-deg",
            text: "nne"
        },
        45: {
            icon: "wi wi-wind towards-45-deg",
            text: "ne"
        },
        68: {
            icon: "wi wi-wind towards-68-deg",
            text: "ene"
        },
        90: {
            icon: "wi wi-wind towards-90-deg",
            text: "e"
        },
        113: {
            icon: "wi wi-wind towards-113-deg",
            text: "ese"
        },
        135: {
            icon: "wi wi-wind towards-135-deg",
            text: "se"
        },
        158: {
            icon: "wi wi-wind towards-158-deg",
            text: "sse"
        },
        180: {
            icon: "wi wi-wind towards-180-deg",
            text: "s"
        },
        203: {
            icon: "wi wi-wind towards-203-deg",
            text: "ssw"
        },
        225: {
            icon: "wi wi-wind towards-225-deg",
            text: "sw"
        },
        248: {
            icon: "wi wi-wind towards-248-deg",
            text: "wsw"
        },
        270: {
            icon: "wi wi-wind towards-270-deg",
            text: "w"
        },
        293: {
            icon: "wi wi-wind towards-293-deg",
            text: "wnw"
        },
        313: {
            icon: "wi wi-wind towards-313-deg",
            text: "nw"
        },
        336: {
            icon: "wi wi-wind towards-336-deg",
            text: "nnw"
        },
    };
    
    var getWindImage = function getWindImg(windspeed) {
       if (windspeed === undefined || windspeed === null ) return windImages[0];
       if (windspeed >= 0 && windspeed < 23 ) return windImages["0"];
       if (windspeed >= 23 && windspeed < 45 ) return windImages["23"];
       if (windspeed >= 45 && windspeed < 68 ) return windImages["45"];
       if (windspeed >= 68 && windspeed < 90 ) return windImages["68"];
       if (windspeed >= 90 && windspeed < 113 ) return windImages["90"];
       if (windspeed >= 113 && windspeed < 135 ) return windImages["113"];
       if (windspeed >= 135 && windspeed < 158 ) return windImages["135"];
       if (windspeed >= 158 && windspeed < 180 ) return windImages["158"];
       if (windspeed >= 180 && windspeed < 203 ) return windImages["180"];
       if (windspeed >= 203 && windspeed < 225 ) return windImages["203"];
       if (windspeed >= 225 && windspeed < 248 ) return windImages["225"];
       if (windspeed >= 248 && windspeed < 270 ) return windImages["248"];
       if (windspeed >= 270 && windspeed < 293 ) return windImages["270"];
       if (windspeed >= 293 && windspeed < 313 ) return windImages["293"];
       if (windspeed >= 313 && windspeed < 336 ) return windImages["313"];     
    }; 
        
    var weatherTemp = {};  
        
    var KelvinToFarenheit = function(temp) {
        /* (K - 273.15) * 1.8 + 32 = Kelvin to Fahrenheit formula */
        weatherTemp.fahrenheit = Math.ceil((temp - 273.15) * 1.8 + 32);
        weatherTemp.celsius = Math.ceil((weatherTemp.fahrenheit -32)*5/9);
        return weatherTemp.fahrenheit;
    };
    
    var windSpds = {};
    
    var windSpdConverter = function windConverter(mps) {
         // mps * km/1000m *60s/min * 60min/hr or 1mps = 3.6kph
         var kph = mps * 3.6;
         windSpds.kph = kph.toFixed(2) + " kph";
         // 0.621371mi / 1 km
         var mph = kph * .621371;
         windSpds.mph = mph.toFixed(2) + " mph";
         return mph.toFixed(2);
    }
    
    function getWeather(geo) {
        var geoLocation = geo.loc.split(",");
        var latitude = geoLocation[0];
        var longitude = geoLocation[1];

        $.ajax({
            url: openWeatherURL.replace(/lat=[^A]+/, "lat=" + encodeURIComponent(latitude) + "&lon=" + encodeURIComponent(longitude) + "&")
        }).
        done(function(response) {

            var city = response["city"]["name"];
            var country = response["city"]["country"];

            var currentTemp = KelvinToFarenheit((response["list"][0]["main"]["temp"]));
     
            var humidity = response["list"][0]["main"]["humidity"];
            var windSpd = response["list"][0]["wind"]["speed"];
            var mph = windSpdConverter(windSpd);
            var windDegree = response["list"][0]["wind"]["deg"];
            var weatherID = response["list"][0]["weather"][0]["id"];
            var weatherCondition = weatherConditionCodes[weatherID]["meaning"];
            weatherCondition = weatherCondition[0].toUpperCase() + weatherCondition.substring(1);
            var weatherIcon = weatherConditionCodes[weatherID]["icon"];
            var weatherPicture = weatherPictures[weatherConditionCodes[weatherID]["condition"]];

            var windText = getWindImage(windDegree)["icon"];
                  
            $("body").removeClass().addClass("weather-background");
            $(".weather-city").append(city + ", " + country);
            $("body").css("background-image", "url("+weatherPicture+")");
            $(".weather-icon").removeClass().addClass("wi " + weatherIcon);
            $(".weather-temp").append(currentTemp);
            $("#weather-conditions").append(weatherCondition);
            $(".weather-wind-speed").append(mph);
            $(".weather-humidity-percent").append(humidity + "%");
            $(".weather-wind-direction-js").append("<i class='"+windText+"'></i>");
                       
            $(".weather").removeClass("hide");

        }).
        fail(function(xhr, status, errorThrown) {
            console.log("Sorry there was a problem.");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
        }).
        always(function(xhr, status) {
            console.log("The request is completed.");
        });
    };

    function getGeoCoords() {
        return $.ajax({
                url: "http://ipinfo.io"
            }).
        fail(function(xhr, status, errorThrown) {
            console.log("Sorry, there was a problem");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
        }).
        always(function(xhr, status) {
            //alert("The request is completed.");
        });

    };

    var openWeatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&APPID=841fa5fa76dc867d0918d734c2f82f48";

        $.ajaxSetup({
            type: 'GET',
            dataType: " jsonp"
        });
    
      getGeoCoords().then(getWeather);
        
      function replaceTempandWindText(weatherUnit, windSpdUnit){
            $('.weather-temp').text("");
            $('.weather-temp').text(weatherTemp[weatherUnit]);
            $('.current-image').removeClass().addClass("current-image wi wi-"+weatherUnit);
            $(".weather-wind-speed").text("");
            $(".weather-wind-speed").text(windSpds[windSpdUnit]); 
      }
      
     $(".weather-fahrenheit").click(function() {
         
         if($("#weather-degree").hasClass("wi-celsius")) {
                 
            replaceTempandWindText("fahrenheit", "mph");                 
    
            $(".weather-celsius").removeClass("green");
            $(this).addClass("green");
         }
         
      });
        
        $(".weather-celsius").click(function() {
           if($("#weather-degree").hasClass("wi-fahrenheit")) {
            
            replaceTempandWindText("celsius", "kph");  

            $(".weather-fahrenheit").removeClass("green");
            $(this).addClass("green");
           }
           
        });
    
});