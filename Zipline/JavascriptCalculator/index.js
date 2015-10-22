var calcModule = (function () {

    var calcVariables = [];
    var acc = [];
    var keywords = "c ce";
   
    // TODO: Allow user to build double number before addtion.
    function handleInput(str) {
        var processedString = processString(str); 
        return processedString;         
    }
    function createTokens(){
         var variablesForTokenizer =  calcVariables.join(",").replace(/,/g,"").split(" ");
         console.log(variablesForTokenizer);
         return variablesForTokenizer.map(function(val){
              if(is_whitespace(val)) {
                   return "";
              }
              if(is_int(val)){
                   return {
                        type: "int",
                        val: +val
                   }
              }
              if(is_float(val)){
                   return {
                        type: "float",
                        val: parseFloat(val)
                   }
              }
              if(is_op(val)){
                   return {
                        type: "op",
                        val: val
                   }
              }
              if(is_keyword(val)){
                   return {
                        type:"keyword",
                        val: val
                   }
              }
         });
    }
    function is_whitespace(str){
        return / /.test(str);
    }    
    
    function is_keyword(str) {
        return /c|ce/.test(str);
    }
    
    function is_int(str){
         return /[0-9]+/.test(str);
    }   
    
    function is_float(str){
         return /[0-9]+.[0-9]+/.test(str);
    }
    
    function is_op(str) {
         return /[/*\-x+=]/.test(str);
    }
     
    function processString(str) {
         var re = /[/*\-x+=]|CE|C|ce|c/;
         return re.test(str) ? calcVariables.push(" " + str + " ") : calcVariables.push(str)
    }    

    function getCalcVariables() {
        return calcVariables.join(",").replace(/,/g, "");
    }

    return {
        handleInput : handleInput,
        getCalcVariables : getCalcVariables,
        createTokens: createTokens
    }
}
    ());

$(document).ready(function () {

    var input$ = $("input");
    input$.val("0");

    $(".calc-wrapper").on("click", "button", function (e) {
        var newStr,
        str = e.target.innerText;
        console.log("Str: "  + str);
        if(str.toLowerCase() === "x") {
         console.log("hello");
            newStr = calcModule.handleInput("*");
        } else {
             newStr = calcModule.handleInput(str.toLowerCase());
        }
         
        if(str === "=") {
             console.log(calcModule.getCalcVariables());
             console.log(calcModule.createTokens());
        }
               
        input$.val(newStr);
    })
});
