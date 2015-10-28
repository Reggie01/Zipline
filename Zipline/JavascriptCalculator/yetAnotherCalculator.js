/*Optional this could be placed inside of an associative array insted.*/
var INTEGER = "INTEGER",
            PLUS = "PLUS",
             EOF = "EOF",
             MINUS = "MINUS";
 var token_map = {
    "-": MINUS,
    "+": PLUS
 }            
function Token(type, val){
    this.type = type;
    this.val = val;
}

Token.prototype.toString = function() {
  return "Token( type: " + this.type + ", value: " + this.val + " )";
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw
function TokenNotFoundException(currentChar) {
   this.val = currentChar;
   this.message = " :Token type not found";
   this.toString = function() {
      return " " + this.val + this.message;
   }
}

function Interpreter(text){
   this.text = text;
   this.pos = 0;
   this.current_token;
}

/*Could create a class for error handling since error handling will involve a variety of behaviors*/
Interpreter.prototype.error = function(currentChar) {
    throw new TokenNotFoundException(currentChar);
}

Interpreter.prototype.getNextToken = function() {
   text = this.text;
   
   if (this.pos > text.length - 1) {
      return new Token(EOF, undefined);
   }
   
   /*optional string index is to use bracket notation. Beware! Bracket notation not available for IE7 and below */
   currentChar = text.charAt(this.pos);
   
   if(isWhiteSpace(currentChar)){
      this.pos += 1;
      return this.getNextToken();
   }
   
   if(isInt(currentChar)) {
      this.pos += 1;
      return new Token(INTEGER, +currentChar);
   }
   
   if(isOp(currentChar)) {
      this.pos += 1;
      return new Token(token_map[currentChar], currentChar);
   }
      
   this.error(currentChar);
}

Interpreter.prototype.eat = function(token_type) {
  if(this.current_token.type === token_type) {
     this.current_token = this.getNextToken();
  } else {
     this.error(token_type);
  }  
}

Interpreter.prototype.sum = function(arr) {

   var str = "";
   arr.forEach(function(elem) {
      str += elem.val;
   });
   return str;
}

Interpreter.prototype.expr = function() {
   this.current_token = this.getNextToken();  // curr this.pos = 0
   var left = [];
   while(this.current_token.type === "INTEGER") {
       left.push(this.current_token);   // curr this.pos = 1
       this.eat(this.current_token.type);
   }
                                     
   var op = this.current_token;
   this.eat(op.type);                                 
   
   var right = [];
   while(this.current_token.type === "INTEGER") {
       right.push(this.current_token);   
       this.eat(this.current_token.type);
   }
   
   var leftTotal = +this.sum(left);
   var rightTotal = +this.sum(right);
   if(op.type == MINUS) {
      var result = leftTotal - rightTotal;
   } else if(op.type == PLUS) {
      var result = leftTotal + rightTotal;
   }
   return result;
}

function isInt(str){
  return /[0-9]+/.test(str);
}

function isOp(str){
  return /\+|\-/.test(str);
}

function isWhiteSpace(str){
 return /\s/.test(str);
}

function init(str) {
   var interpreter = new Interpreter(str);
   var result = interpreter.expr();
   console.log(result);
}

/* Test Suite 
    Todo: Seperate test from program
*/

var results = {
    total: 0,
    bad: 0
  };
  
function test(nameOfTest, fn, input, expected) {
    results.total++;   
    if(arguments.length < 4) {
       var result = fn;
       expected = arguments[2];
    } else {
       var result =  fn(input);  
    }    
    //console.log(result);
    if (result !== expected) {
      results.bad++;
      console.log(nameOfTest + "Expected " + expected +
        ", but was " + result);
    }
}
  
  // testing for numbers
  test( "Test input 0 is an Integer: ", isInt, "0", true);  
  test( "Test input 0 is an Integer: ", isInt, "a", false);  
  test( "Test input 0 is an Integer: ", isInt, "A", false);  
  test( "Test input - is an Operater: ", isOp, "-", true);  
  test( "Test input + is an Operater: ", isOp, "+", true);  
  test( "Test input / is an Operater: ", isOp, "/", false);  
  test( "Test input * is an Operater: ", isOp, "*", false);  
  
  // Set up for test Token
  var first = new Token(INTEGER, 1);
  test("Test token toString method: ", first.toString(), "Token( type: INTEGER, value: 1 )");
  // Set up test for Interpreter
  var interpreter1 = new Interpreter("3+5");
  test("Test Interpreter give you a new token: ", new Interpreter("3+5").getNextToken().toString(), "Token( type: INTEGER, value: 3 )" );
  test("Test Interpreter give you a new token: ", new Interpreter("4+5").getNextToken().toString(), "Token( type: INTEGER, value: 4 )" );
  test("Test Interpreter give you a new token: ", interpreter1.getNextToken().toString(), "Token( type: INTEGER, value: 3 )" );
  test("Test Interpreter give you a new token: ", interpreter1.getNextToken().toString(), "Token( type: PLUS, value: + )" );
  
  var interpreter2 = new Interpreter("3-5");
  test("Test Interpreter give you a new token: ", interpreter2.getNextToken().toString(), "Token( type: INTEGER, value: 3 )" );
  //test("Test Interpreter give you a new token: ", interpreter2.getNextToken().toString(), "throw new TokenNotFoundException(currentChar);" );
   
  console.log("Of " + results.total + " tests, " + results.bad + " failed, " + (results.total - results.bad) + " passed.");
  

/* End of testing */
init("3+2");
init("11+22");
init(" 3 +      2");
init("1+2");
init("3-2");
init("4   -  2");