/* Sound effects from http://www.freesfx.co.uk */
$( document ).ready( function () {
    "use strict";

    var elemMinutes = document.getElementsByClassName( "pomodoro-time-minute" )[ 0 ];
    var elemSeconds = document.getElementsByClassName( "pomodoro-time-seconds" )[ 0 ];

    // Timer Variables
    var startingMinutes = 25;
    var startingSeconds = 0;
    var canvasMinutes = startingMinutes;
    var canvasSeconds = startingSeconds;
    var isBreakOrSession = "Session";
    var amt = 0;

    var v = document.getElementsByTagName( "audio" )[ 0 ];

    function updateTimer() {

        if ( canvasMinutes > 0 && canvasSeconds === 0 ) {

            canvasSeconds = 59;
            --canvasMinutes;

        } else {
            if ( canvasSeconds === 0 && canvasMinutes <= 0 ) {
                console.log( "The end" );

                if ( isBreakOrSession === "Session" ) {

                    isBreakOrSession = "Break!";
                    canvasMinutes = parseInt( +timeBreakNumeral$.text() );
                    canvasSeconds = 0;
                    v.play();
                    amt = 0;

                } else if ( isBreakOrSession === "Break!" ) {
                    isBreakOrSession = "Session";
                    canvasMinutes = parseInt( +timeSessionNumeral$.text() );
                    canvasSeconds = 0;
                    v.play();
                    amt = 0;
                }

            } else {
                --canvasSeconds;
            }
        }
    }

    function addZeros( match ) {
        if ( typeof match !== "string" ) {
            match = "" + match;
        }
        if ( match.length < 2 ) {
            return "0" + match;
        }
        return match;
    }

    /* http://stackoverflow.com/questions/15661339/how-do-i-fix-blurry-text-in-my-html5-canvas
    Formula to fix blurriness of canvas drawings in mobile devices */

    var PIXEL_RATIO = ( function () {
        var ctx = document.createElement( "canvas" ).getContext( "2d" ),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;

        return dpr / bsr;
    })();

    var createHiDPICanvas = function ( w, h, ratio ) {
        if ( !ratio ) {
            ratio = PIXEL_RATIO;
        }
        var can = document.createElement( "canvas" );
        can.width = w * ratio;
        can.height = h * ratio;
        can.style.width = w + "px";
        can.style.height = h + "px";
        can.getContext( "2d" ).setTransform( ratio, 0, 0, ratio, 0, 0 );
        return can;
    };

    var customCanvas = document.getElementsByClassName( 'custom_canvas' )[ 0 ];
    var canvasWidth = customCanvas.getClientRects()[ 0 ].width; //350;
    var canvasHeight = customCanvas.getClientRects()[ 0 ].width; //350;

    var canvas = createHiDPICanvas( canvasWidth, canvasHeight );
    
   
    
    var centerX = canvasWidth * 0.5;
    var centerY = canvasHeight * 0.5;
    var radius = (canvasHeight / 2) * 0.9;
    var full = radius * 2;
    var amtToFill = 0;

    var context = canvas.getContext( "2d" );
    var ctxTextWidth = context.measureText(isBreakOrSession).width;
    var ctxTimeTxtWidth;
    var ctxTimeTxt;
    
    function drawCanvasClock() {
        context.clearRect( 0, 0, canvasWidth, canvasHeight );
        context.save();
        context.beginPath();
        context.arc( centerX, centerY, radius - 5, 0, 2 * Math.PI );
        context.clip();

        context.beginPath();
        context.fillStyle = "#FF6E40";
        context.fillRect( centerX - radius, centerY + radius, radius * 2, -amt );
        context.fill();

        context.beginPath();
        context.font = "30px sans-serif";
        context.font = 'italic 30pt Roboto';
        context.fillStyle = "rgba(0,0,0,0.54)";
        ctxTextWidth = context.measureText(isBreakOrSession).width;
        context.fillText(isBreakOrSession, (canvasWidth- ctxTextWidth)/2, centerY - radius * 0.5);

        context.beginPath();
        //context.font = "30px sans-serif";
        context.font = "30pt Roboto";
        context.fillStyle = "rgba(0,0,0,0.54)";
        ctxTimeTxt = canvasMinutes + " : " + addZeros(canvasSeconds);
        ctxTimeTxtWidth = context.measureText(ctxTimeTxt).width;
        context.fillText( ctxTimeTxt, (canvasWidth - ctxTimeTxtWidth)/ 2, centerY + radius * 0.5 );

        context.restore();
        context.beginPath();
        context.arc( centerX, centerY, radius, 0, 2 * Math.PI );
        context.lineWidth = 2.0;
        context.strokeStyle = "#FF3D00";
        context.stroke();

        amt += amtToFill;
        if (amt > full)
            amt = 0;
    }

    drawCanvasClock();
    $( ".custom_canvas" ).append( canvas );

    function step( timestamp ) {

        updateTimer();
        /* console.log( canvasMinutes );
        console.log( "canvas seconds : " + canvasSeconds );
        console.log( "amtToFill: " + amtToFill ); */
        if ( !amtToFill || !canvasMinutes && !canvasSeconds ) {
            amtToFill = createAmtToAnimateClock( canvasMinutes, canvasSeconds );
        }

        drawCanvasClock();

    }

    function convertMinuteToSecs( minutes, seconds ) {
        return ( minutes * 60 ) + seconds;
    }

    function createAmtToAnimateClock( minutes, seconds ) {
        if (!minutes && !seconds) {
            return 0;
        }
        var secondsForAnimation = convertMinuteToSecs( minutes, seconds );
        return ( radius * 2 ) / secondsForAnimation;
    }

    var setIntervalID = 0;
    
    var timeSessionMinus$ = $( ".time-session-minus" );
    var timeSessionPlus$ = $( ".time-session-plus" );
    var timeSessionNumeral$ = $( ".time-session-numeral" );
    var timeBreakNumeral$ = $( ".time-break-numeral" );
    var timeBreakMinus$ = $( ".time-break-minus" );
    var timeBreakPlus$ = $( ".time-break-plus" );
    
    var operators = {
         "+": function(x,y) { return x + y; },
         "-": function(x,y) { return x - y; }
    }
    
    function adjustCanvasTime(text, operator, elem) {       
       var currentTime = parseInt( elem.text() );
       if ( operators[operator]( currentTime, 1) > 0) {       
           elem.text( operators[operator]( currentTime, 1) );           
       }
       
       if( isBreakOrSession === text ){      
       
           canvasMinutes = +elem.text();
           amt = 0;
           amtToFill = 0;
           drawCanvasClock();
           
        }     
    }
    
    timeSessionMinus$.click( function () {     
       adjustCanvasTime( "Session", "-", timeSessionNumeral$ );        
    });

    timeSessionPlus$.click( function () {      
       adjustCanvasTime( "Session", "+", timeSessionNumeral$ );
    });

    timeBreakMinus$.click(function () {
        adjustCanvasTime( "Break!", "-", timeBreakNumeral$ );
    });

    timeBreakPlus$.click( function () {       
        adjustCanvasTime( "Break!", "+", timeBreakNumeral$ );
    });

    $( ".reset" ).click(function () {
        addPropToButton(["disabled", false], timeSessionMinus$, timeSessionPlus$, timeBreakMinus$, timeBreakPlus$);
        timeSessionNumeral$.text( "25" );
        timeBreakNumeral$.text( "5" );
        //canvas
        canvasMinutes = 25;
        canvasSeconds = 0;
        isBreakOrSession = "Session";

        amt = 0;
        amtToFill = 0;
        drawCanvasClock();

        clearInterval( setIntervalID );
        setIntervalID = 0;
    });

    $( ".stop" ).click( function () {
        
        addPropToButton(["disabled", false], timeSessionMinus$, timeSessionPlus$, timeBreakMinus$, timeBreakPlus$);
        clearInterval( setIntervalID );
        setIntervalID = 0;
        
    });
   
   function addPropToButton(propArr, elem) {
        if(Array.prototype.slice.call(arguments).length > 1) {
             var args = Array.prototype.slice.call(arguments);
             var elems = args.slice(1);
             
             elems.forEach(function(elem){
                  elem.prop(propArr[0], propArr[1]);
             })
        } else {
            elem.prop("disabled", true);
        }
   }
    
    $( ".start" ).click( function () {
        
        addPropToButton(["disabled", true], timeSessionMinus$, timeSessionPlus$, timeBreakMinus$, timeBreakPlus$);
        
        if ( setIntervalID === 0 ) {
            setIntervalID = setInterval( function () {
                    step();
                }, 1000 );
        }

    });
});
