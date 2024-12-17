const fs = require('fs');
const path = require('path');
const math = require('mathjs');

const inputFilePath = path.join(__dirname, 'input.txt');
const outputFilePath = path.join(__dirname, 'output.txt');

const processFile = () => {
  fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading the input file:", err);
      return;
    }


    const expressions = data.trim().split('\n');


    const results = expressions.map(expr => {
      try {
        const cleanedExpr = expr.replace(/=/g, '').trim();
        const result = math.evaluate(cleanedExpr);
        return `${expr} = ${result}`;
      } catch (error) {
        return `${expr} = Error evaluating expression`;
      }
    });


    fs.writeFile(outputFilePath, results.join('\n'), 'utf8', (err) => {
      if (err) {
        console.error("Error writing to the output file:", err);
      } else {
        console.log(`Results successfully written to ${outputFilePath}`);
      }
    });
  });
};


processFile();
