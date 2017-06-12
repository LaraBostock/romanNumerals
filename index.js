
const numeralStrings = {  1:"I",
                          4:"IV",
                          5:"V",
                          9:"IX",
                          10:"X",
                          40:"XL",
                          50:"L",
                          90:"XC",
                          100:"C",
                          400:"CD",
                          500:"D",
                          900:"CM",
                          1000:"M"
                        };

const integerStrings = {  I:1,
                          IV:4,
                          V:5,
                          IX:9,
                          X:10,
                          XL:40,
                          L:50,
                          XC:90,
                          C:100,
                          CD:400,
                          D:500,
                          CM:900,
                          M:1000
                        };




function integerInput() {
  let integer = document.getElementById('integer').value;
  if (integer > 3999 || integer < 1) {
    window.alert("Error: Integer must be between 1 and 3999");
  }
  else {
    document.getElementById('numeralResult').value = convertInteger(integer);
  }
}

function numeralInput() {
  let numeral = document.getElementById('numeral').value;
  let match = numeral.match(/^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i);
  // 3999 max, so up to 3 'M's
  // group 1 - empty-900
  // group 2 - empty-90
  // group 3 - empty-9
  if (!match) {
    window.alert("Error: Please enter a valid Roman Numeral");
    document.getElementById('integerResult').value = " ";
  }
  else {
    document.getElementById('integerResult').value = convertNumeral(numeral);
  }
}

function convertInteger(integer) {
  let integerString = integer.toString();
  let romanNumeral = "";
  for (i=0; i < integerString.length; i++) {
    let positionChar = integerString.charAt(integerString.length-i-1);
    if (positionChar <= "3") {
      for (j=0; j < positionChar; j++) {
        romanNumeral = (numeralStrings[Math.pow(10, i)]) + romanNumeral;
      }
    }
    else if (positionChar > "5" && positionChar <= "8") {
      for (j=0; j < positionChar-5; j++) {
        romanNumeral = (numeralStrings[Math.pow(10, i)]) + romanNumeral;
      }
      romanNumeral = (numeralStrings[5*Math.pow(10, i)]) + romanNumeral;
    }
    else {
      romanNumeral = (numeralStrings[positionChar*(Math.pow(10, i))]) + romanNumeral;
    }
  }
  return romanNumeral;
}

function convertNumeral(numeral) {
  let previousChar = "";
  let currentChar = "";
  let finalInt = [];
  let isArray = false;
  for (i=0; i < numeral.length; i++) {
    currentChar = numeral.charAt(numeral.length-i-1).toUpperCase();
    if (i > 0) {
      let concatChars = currentChar + previousChar;
      if (currentChar != previousChar) {
        if (integerStrings[concatChars] != undefined) {
          finalInt.push(integerStrings[concatChars]);
          isArray = true;
        }
        else if (integerStrings[concatChars] === undefined) {
          if (isArray === true) {
            isArray = false;
            if (i == numeral.length-1) {
              finalInt.push(integerStrings[currentChar]);
            }
          }
          else {
            finalInt.push(integerStrings[previousChar]);
            if (i == numeral.length-1) {
              finalInt.push(integerStrings[currentChar]);
            }
          }
        }
      }
      else if (currentChar == previousChar) {
        finalInt.push(integerStrings[previousChar]);
        if (i == numeral.length-1) {
          finalInt.push(integerStrings[currentChar]);
        }
      }
      else {
        finalInt.push(integerStrings[currentChar]);
      }
      console.log(finalInt);
    }
    else if (numeral.length == 1) {
      finalInt.push(integerStrings[currentChar]);
    }
    previousChar = currentChar;
  }
  return finalInt.reduce((e, i) => e + i);
}
