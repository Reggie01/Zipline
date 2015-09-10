$(document).ready(function() {

    var start = null;
    var element = document.getElementById("SomeElementYouWantToAnimate");
    var elemMinutes = document.getElementsByClassName("pomodoro-time-minute")[0];
    var elemSeconds = document.getElementsByClassName("pomodoro-time-seconds")[0];
    var seconds = 0;
    var totalSeconds = +elemSeconds.textContent;
    var totalMinutes = +elemMinutes.textContent;
   
    function addZeros(match) {
        if(match.length < 2){
          return "0" + match;
        }
        return match;
    };
    
    function calculateSeconds(timePassed) {
          
       seconds = Math.floor(timePassed/1000) % 60;
       console.log(seconds);
       if(totalMinutes > 0 && seconds === 0){ 
          console.log("hello");
           --totalMinutes;
           totalSeconds = 59;
           console.log(totalMinutes);
           elemMinutes.textContent = (totalMinutes).toString();
           elemSeconds.textContent = addZeros((totalSeconds - seconds).toString());    
                                     
       } else {
           if(totalSeconds === 0 && totalMinutes <= 0){
               console.log("The end");
           } else {
                
                elemSeconds.textContent = addZeros((totalSeconds - seconds).toString());
               
           }                                  
       }       
    }
    
    function step(timestamp) {

        if (!start) start = timestamp;
        var progress = timestamp - start;
        element.style.left = Math.min(progress/10, 200) + "px";
        
       calculateSeconds(progress);
       
        if (progress < 120000) {
            id = window.requestAnimationFrame(step);
        }
    }


   var id = 0;
   $(".pomodoro").click(function() {      
      if(id) {
         window.cancelAnimationFrame(id);
         id = 0;
      } else { 
         id = window.requestAnimationFrame(step);
      }
      
   })
   
});