var results = {
    total: 0,
    bad: 0
  };

  //console.log(calcModule);
  
function test(nameOfTest, fn, input, expected) {
    results.total++;
    fn(input);  
    var result = calcModule.getCalcVariables();
    console.log(input);
    if (result !== expected) {
      results.bad++;
      console.log(nameOfTest + "Expected " + expected + ", but was " + result);
    }
  }
  
  // testing for numbers
  test( "Test input 0: ", calcModule.handleInput, "0", "0");

  
  console.log("Of " + results.total + " tests, " +
    results.bad + " failed, " +
    (results.total - results.bad) + " passed.");