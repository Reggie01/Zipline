/* Sound effects from http://www.freesfx.co.uk */
$(document).ready(function() {

    var elemMinutes = document.getElementsByClassName("pomodoro-time-minute")[0];
    var elemSeconds = document.getElementsByClassName("pomodoro-time-seconds")[0];
    var totalSeconds = +elemSeconds.textContent;
    var totalMinutes = +elemMinutes.textContent;
    var v = document.getElementsByTagName("audio")[0];
    
    function addZeros(match) {
        if(match.length < 2){
          return "0" + match;
        }
        return match;
    };
    
    function calculateSeconds() {
          
       if(totalMinutes > 0 && +elemSeconds.textContent === 0){ 
           totalSeconds = 59;
           elemSeconds.textContent = (totalSeconds).toString(); 
           --totalMinutes;
           elemMinutes.textContent = (totalMinutes).toString();
                                                  
       } else {
           if(+elemSeconds.textContent === 0 && totalMinutes <= 0){
               console.log("The end");
               
               if($(".pomodoro-text").text() === "Session") {
                    $(".pomodoro-text").text("");
                    $(".pomodoro-text").text("Break!");
                    $(".pomodoro-time-minute").text($(".time-break-numeral").text());
                    totalMinutes = parseInt(+$(".pomodoro-time-minute").text());
                    console.log(document.getElementsByTagName("audio"));                   
                    v.play();
               }
               else if($(".pomodoro-text").text() === "Break!") {
                    $(".pomodoro-text").text("Session");
                    $(".pomodoro-time-minute").text($(".time-break-numeral").text());
                    totalMinutes = parseInt(+$(".pomodoro-time-minute").text());
                    v.play();
               }
               
           } else {                
                elemSeconds.textContent = addZeros((--totalSeconds).toString());               
           }                                  
       }       
    }
    
    
    // Draw variables
    var pomodoro = document.getElementById("pomodoro");
    var pomodoroWidth = pomodoro.getClientRects()[0].width;
    var pomodoroHeight = pomodoro.getClientRects()[0].height;
    
    
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    canvas.width = pomodoroWidth *.95;
    canvas.height = pomodoroHeight * .95;
    var centerX = canvas.width  * .5;
    var centerY = canvas.height * .5;
    var width = canvas.width;
    var height = canvas.height;
    var radius = (width -10) * .5;
    var full = radius * 2;
    var amt = 0;
    
    function draw() {
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
       context.font = 'italic 30pt Calibri';
       context.fillStyle = "#ccc";
       context.fillText('Session', centerX - 55, centerY - radius * .5);
       
       context.beginPath();
       context.font = "italic 30pt Calibri";
       context.fillText($(".pomodoro-time-minute").text() + " : " + $(".pomodoro-time-seconds").text(), centerX - 55, centerY + radius * .5);
       
       context.restore();
       context.beginPath();
       context.arc(centerX, centerY, radius, 0, 2*Math.PI);
       context.strokeStyle = "#FF3D00";
       context.stroke();
       
       amt += 10;
       if(amt > full) amt = 0;
    }
    
    draw();
    
    function step(timestamp) {        
       calculateSeconds();           
       draw();
    }
   
   var id = 0;
  
   $(".pomodoro").click(function() {    
      if(id) {
           clearInterval(id);
           id = 0;
      } else {
           id = setInterval(function() { 
   
           step(); }, 1000);
      }
      
   });
   
   $(".time-session-minus").click(function() {
        var currentTime = parseInt($(".time-session-numeral").text());
        if(currentTime - 1 > 0){
         $(".time-session-numeral").text(currentTime - 1);
         $(".pomodoro-time-minute").text($(".time-session-numeral").text());
         totalMinutes =  $(".pomodoro-time-minute").text();
        }        
   });
   
   $(".time-session-plus").click(function() {
        var currentTime = parseInt($(".time-session-numeral").text());
        $(".time-session-numeral").text(currentTime + 1);
        $(".pomodoro-time-minute").text($(".time-session-numeral").text());
        totalMinutes =  $(".pomodoro-time-minute").text(); 
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
        $(".pomodoro-time-minute").text("25");
        $(".pomodoro-time-seconds").text("00"); 
        totalMinutes =  $(".pomodoro-time-minute").text(); 
        draw();
   });
   
   $(".stop").click(function() {
        clearInterval(id);
        id = 0;
   });
   
   $(".start").click(function() {
        id = setInterval(function() { step(); }, 1000);
   });
});