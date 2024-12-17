const readline = require('readline');

const palindrome = (n) => {
  let i = 0;
  let j = n.length - 1;
  while (i <= j) {
    if (n[i] === n[j]) {
      i++;
      j--;
    } else {
      return "this is not palindrome";
    }
  }
  return "this is palindrome";
};

// Set up readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt user for input
rl.question("Enter a string: ", (val) => {
  console.log(palindrome(val));
  rl.close();
});
