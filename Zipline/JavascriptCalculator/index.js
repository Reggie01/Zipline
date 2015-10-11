var calcModule = (function () {

    var calcVariables = [];
    
    function add(num) {
       return function(num2) {
            return num + num2;
       }
    }
    
    function subtract(num) {
         return function(num2) {
              return num - num2;
         }
    }
    
    function multiply(num) {
         return function(num2) {
              return num * num2;
         }
    }
    
    function divide(num) {
         return function(num2) {
              return num / num2;
         }
    }
    
    function modulo(num) {
       return function(num2) {
            return num%num2;
       }
    }
    
    function handleInput(str) {
        var updateStr = '';
        var isStrNum = !isNaN(+str);
        
        if (isStrNum) {
            if (calcVariables.length < 17) {
                if(calcVariables.length > 0){
                   if(typeof calcVariables[0] === "function") {
                       calcVariables[0] = calcVariables[0](+str);
                   } else {
                       calcVariables[0] = calcVariables[0] + str;
                   }                  
                } else {
                   calcVariables.push(str);
                }             
            }           
            return calcVariables.join("");
        }

        if (str === "C") {
            calcVariables = [];
            return "0";
        } else if (str === "CE") {
            if (calcVariables.length > 0) {
                if(!isNaN(+calcVariables.join(""))){
                     calcVariables = [];
                     return "0";
                }
                var re = /\+\-|\/|\*/g;
                if( re.test( calcVariables.join("") ) ) {
                     updateStr = calcVariables.join("");
                }
                
            } else {
                return "0";
            }
        } else if (str === ".") {
            console.log(calcVariables.length);
            if (calcVariables.length > 0) {
                if (calcVariables.join("").indexOf(".") !== -1) {
                    console.log(calcVariables);
                    return calcVariables.join("");
                }
                var calcVariable = calcVariables.join("");
                var isNum = !isNaN(+calcVariable);
                if (isNum) {
                    calcVariables[0] = calcVariables.join("") + str;
                    return calcVariables.join("");
                } else {
                    calcVariables.push("0" + str);
                    return "0" + str;
                }
            } else {
                calcVariables.push("0.");
                return "0" + str;
            }

        } else if (str === "+") {
            var currValue = +calcVariables.join("");
            calcVariables[0] = add(currValue);
            return currValue;
        }

        return updateStr;
    }

    function getCalcVariables() {
        return calcVariables;
    }

    return {
        handleInput : handleInput,
        getCalcVariables : getCalcVariables
    }
}
    ());

$(document).ready(function () {

    var input$ = $("input");
    input$.val("0");

    $(".calc-wrapper").on("click", "button", function (e) {

        str = e.target.innerText;
        console.log(str);
        console.log(calcModule.getCalcVariables());

        var newStr = calcModule.handleInput(str);

        console.log(calcModule.getCalcVariables());
        input$.val(newStr);
    })
});
