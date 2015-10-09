$( document ).ready( function() {
    
    var str = "";
    
    var calcButtons = {
         1: 1,
         2: 2,
         3: 3,
         4: 4,
         5: 5,
         6: 6, 
         7: 7,
         8: 8,
         9: 9,
      "+": function(arr) ( return arr.reduce(function(elem) { return a + b; } )),
      "-": function() { },
      "\\": function() {},
      "x": function() {},
      ".": function() {},
     "=": function() {},
     "%": function() {},
    "CE": function() {},
    "CA": function(elem) { elem.val(); }
    }
    
    $( ".calc-wrapper" ).on("click", "button", function(e) {
        console.log(e);
        
        $( "input" ).val(e.target.innerText);
        
                
        str += e.target.innerText;
        
        
        console.log(str);
    })
} );