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
    
    function step(timestamp) {        
       calculateSeconds();           
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
});