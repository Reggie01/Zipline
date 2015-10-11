var results = {
    total: 0,
    bad: 0
  };

  console.log(calcModule);
  
function test(nameOfTest, then, expected) {
    results.total++;
    var result = calcModule.handleInput(then);
    if (result !== expected) {
      results.bad++;
      console.log(nameOfTest + "Expected " + expected +
        ", but was " + result);
    }
  }
  
  // testing for numbers
  test( "Test input 0: ", "0", "0");
  test("Test input 100: ", "100", "0100");
  test("Test clear input: ","C", "0");
  test("Test input 100: ","100", "100");
  test("Test input 1: ", "1", "1001");
  test("Test input CE: ", "CE", "0");
  test("Test input period  : ", ".", "0.");
  test("Test repetitive period input : ",".", "0.");
  test("Test input 1: ", "1", "0.1");
  test("Test input 0: ", "0", "0.10");
  test("Test input . : ", ".", "0.10");
  test("Test input 2: ", "2", "0.102");
  test("Test input CE: ", "CE", "0");  
  test("Test 1: ", "1", "1");
  test("Test . : ", ".", "1.");
  test("Test input 2 : ", "2", "1.2");
  test("Test input 3: ", "3", "1.23");
  test("Test input C", "C", "0"); 
  
  console.log("Of " + results.total + " tests, " +
    results.bad + " failed, " +
    (results.total - results.bad) + " passed.");