/* Sound effects from http://www.freesfx.co.uk */
$(document).ready(function() {

    var elemMinutes = document.getElementsByClassName("pomodoro-time-minute")[0];
    var elemSeconds = document.getElementsByClassName("pomodoro-time-seconds")[0];
    
    // Timer Variables
    var startingMinutes = 25;
    var startingSeconds = 0;
    var canvasMinutes = startingMinutes;
    var canvasSeconds = startingSeconds;
    var breakOrSession = "Session";
    var amt = 0;
    
    var v = document.getElementsByTagName("audio")[0];
       
    function updateTimer() {
          
       if(canvasMinutes > 0 && canvasSeconds === 0){ 
       
           canvasSeconds = 59;           
           --canvasMinutes;     
           
       } else {
           if(canvasSeconds === 0 && canvasMinutes <= 0){
               console.log("The end");
               
               if(breakOrSession === "Session") {
                   
                    breakOrSession = "Break!";
                    canvasMinutes = parseInt(+$(".time-break-numeral").text());
                    canvasSeconds = 0;
                    v.play();
                    amt = 0;
                                                           
               }
               else if(breakOrSession === "Break!") {
                    breakOrSession = "Session";
                    canvasMinutes = parseInt(+$(".time-session-numeral").text());
                    canvasSeconds = 0;
                    v.play();
                    amt = 0;                    
               }
               
           } else {                
                --canvasSeconds;                                      
           }                                  
       }       
    }    
    
    function addZeros(match) {
        if(typeof match !== "string"){
         match = "" + match;
        }
        if(match.length < 2){
          return "0" + match;
        }
        return match;
    };
       
    // Canvas clock variables
            
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    var centerX = canvas.width  * .5;
    var centerY = canvas.height * .5;
    var width = canvas.width;
    var height = canvas.height;

    var radius = (height /2)  * .9;
    var full = radius * 2;
    
    var PIXEL_RATIO = (function () {
        var ctx = document.createElement("canvas").getContext("2d"),
             dpr = window.devicePixelRatio || 1,
             bsr = ctx.webkitBackingStorePixelRatio ||
                      ctx.mozBackingStorePixelRatio ||
                      ctx.msBackingStorePixelRatio ||
                      ctx.oBackingStorePixelRatio ||
                      ctx.backingStorePixelRatio || 1;

        return dpr / bsr;
    })();


    createHiDPICanvas = function(w, h, ratio) {
        if (!ratio) { ratio = PIXEL_RATIO; }
        var can = document.createElement("canvas");
        can.width = w * ratio;
        can.height = h * ratio;
        can.style.width = w + "px";
        can.style.height = h + "px";
        can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
        return can;
    }
    
    var myCanvas = createHiDPICanvas(500, 500);
    var context2 = myCanvas.getContext("2d");
    console.log(myCanvas);
    $(".cutom_canvas").append(myCanvas);
    
    function drawCanvasClock() {
       context.clearRect(0, 0, width, height);
       context.save();
       context.beginPath();
       context.arc(centerX, centerY, radius - 5, 0, 2 * Math.PI);
       context.clip();
       
       context.beginPath();
       context.fillStyle = "#FF6E40";
       context.fillRect(centerX - radius, centerY + radius, radius * 2, -amt);
       context.fill();
       
       context.beginPath();
       context.font = 'italic 30pt Roboto';
       context.fillStyle = "rgba(0, 0, 0, 0.54)";
       context.fillText(breakOrSession, centerX - 55, centerY - radius * .5);
       
       context.beginPath();
       context.font = "30pt Roboto";
       context.fillStyle = "rgba(0, 0, 0, 0.54)";
       context.fillText(canvasMinutes + " : " + addZeros(canvasSeconds), centerX - 55, centerY + radius * .5);
       
       context.restore();
       context.beginPath();
       context.arc(centerX, centerY, radius, 0, 2*Math.PI);
       context.strokeStyle = "#FF3D00";
       context.stroke();
       
       context2.clearRect(0, 0, width, height);
       context2.save();
       context2.beginPath();
       context2.arc(centerX, centerY, radius - 5, 0, 2 * Math.PI);
       context2.clip();
       
       context2.beginPath();
       context2.fillStyle = "#FF6E40";
       context2.fillRect(centerX - radius, centerY + radius, radius * 2, -amt);
       context2.fill();
       
       context2.beginPath();
       context2.font = 'italic 30pt Roboto';
       context2.fillStyle = "rgba(0, 0, 0, 0.54)";
       context2.fillText(breakOrSession, centerX - 55, centerY - radius * .5);
       
       context2.beginPath();
       context2.font = "30pt Roboto";
       context2.fillStyle = "rgba(0, 0, 0, 0.54)";
       context2.fillText(canvasMinutes + " : " + addZeros(canvasSeconds), centerX - 55, centerY + radius * .5);
       
       context2.restore();
       context2.beginPath();
       context2.arc(centerX, centerY, radius, 0, 2*Math.PI);
       context2.strokeStyle = "#FF3D00";
       context2.stroke();
       
       amt += 10;
       if(amt > full) amt = 0;
    }
    
    function drawhtmlClock() {
               
           elemSeconds.textContent = addZeros((canvasSeconds).toString()); 
           elemMinutes.textContent = (canvasMinutes).toString();
           $(".pomodoro-text").text(breakOrSession);                                      
       
    } 
    
    drawCanvasClock();
    
    function step(timestamp) {        
       updateTimer();           
       drawCanvasClock();
       drawhtmlClock();
    }
   
   var setIntervalID = 0;
   
   $(".time-session-minus").click(function() {
        var currentTime = parseInt($(".time-session-numeral").text());
        if(currentTime - 1 > 0){
         $(".time-session-numeral").text(currentTime - 1);
        
         canvasMinutes = +$(".time-session-numeral").text();
         amt = 0;
         drawCanvasClock();
         drawhtmlClock();

        }        
   });
   
   $(".time-session-plus").click(function() {
        var currentTime = parseInt($(".time-session-numeral").text());
        $(".time-session-numeral").text(currentTime + 1);
        
        canvasMinutes = +$(".time-session-numeral").text();
        amt = 0;
        drawCanvasClock();       
        drawhtmlClock();

   });
    
   $(".time-break-minus").click(function() {
        var currentTime = parseInt($(".time-break-numeral").text());
        if(currentTime - 1 >= 0){
         $(".time-break-numeral").text(currentTime - 1);
        }        
   });
   
   $(".time-break-plus").click(function() {
        var currentTime = parseInt($(".time-break-numeral").text());
        $(".time-break-numeral").text(currentTime + 1);
   });
   
   $(".reset").click(function() {
        $(".time-session-numeral").text("25");
       
        //canvas 
        canvasMinutes = 25;
        canvasSeconds = 0;
        breakOrSession = "Session";
        
        amt = 0;
        drawCanvasClock();
        drawhtmlClock();
        clearInterval(setIntervalID);
        setIntervalID = 0;
   });
   
   $(".stop").click(function() {
        clearInterval(setIntervalID);
        setIntervalID = 0;
   });
   
   $(".start").click(function() {
        
        if(setIntervalID === 0) {
            setIntervalID = setInterval(function() { step(); }, 1000);
        }
        
   });
});