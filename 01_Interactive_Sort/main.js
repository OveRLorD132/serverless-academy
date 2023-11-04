let readline = require("readline");

let { stdin: input, stdout: output } = require("process");

let read = readline.createInterface({ input, output });

beginSorting();

function beginSorting() {
  read.question("Hihi, enter 10 words or digits deviding them in spaces: ", (answer) => {
    let elements = answer.trim().split(/\s+/);
    let words = [];
    let digits = [];
    elements.map((elem) => {
      if (+elem) elem = +elem;
      if (typeof elem === "number") digits.push(elem);
      else words.push(elem);
    });
    read.question(`How would you like to sort values?
    1. Words by name (from A to Z)
    2. Show digits from the smallest
    3. Show digits from the biggest
    4. Words by quantity of letters
    5. Only unique words
    6. Only unique values
    Select (1-6) and press ENTER: `,
    (num) => {
      if (num.match(/exit/i)) {
        console.log("Good bye! Come back!");
        read.close();
        return;
      }
      if (!+num || +num > 6 || +num < 1) {
        console.log("Invalid input");
        beginSorting();
      }
      switch (+num) {
        case 1:
          console.log(words.sort((a, b) => a.localeCompare(b)));
          break;
        case 2:
          console.log(digits.sort((a, b) => a - b));
          break;
        case 3:
          console.log(digits.sort((a, b) => b - a));
          break;
        case 4:
          console.log(words.sort((a, b) => a.length - b.length));
          break;
        case 5:
          let sortedWords = new Set(words);
          console.log(Array.from(sortedWords));
          break;
        case 6:
          let sortedElements = new Set(elements);
          console.log(Array.from(sortedElements));
        default:
          break;
        }
        beginSorting();
      });
    }
  );
}
