var calcModule = (function () {

    var calcVariables = [];

    function handleInput(str) {
        var updateStr = '';
        var isStrNum = !isNaN(str);
        if (isStrNum) {
            calcVariables.push(+str);
            return updateStr = calcVariables.join("");
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
                var calcVariable = calcVariables[calcVariables.length - 1];
                var isNum = isNaN(+calcVariable);
                if (!isNum) {
                    calcVariables.push(str);
                    return calcVariable + str;
                } else {
                    calcVariables.push("0" + str);
                    return "0" + str;
                }
            } else {
                calcVariables.push("0.");
                return "0" + str;
            }

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
