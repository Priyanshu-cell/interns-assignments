const fs = require('fs');
const readline = require('readline');


function levenshteinDistance(word1, word2) {
  const len1 = word1.length;
  const len2 = word2.length;
  const dp = Array(len1 + 1)
    .fill(null)
    .map(() => Array(len2 + 1).fill(0));

  for (let i = 0; i <= len1; i++) dp[i][0] = i;
  for (let j = 0; j <= len2; j++) dp[0][j] = j;

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = word1[i - 1] === word2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[len1][len2];
}


function loadWordsFromFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data
      .split(/\r?\n/)
      .map(word => word.trim().toLowerCase())
      .filter(word => word.length > 0); // Exclude empty strings
  } catch (error) {
    console.error('Error reading file:', error.message);
    process.exit(1);
  }
}


function findTopKMatches(input, words, k = 3) {
  const distances = words.map(word => ({
    word,
    distance: levenshteinDistance(input, word),
  }));

 
  return distances
    .sort((a, b) => a.distance - b.distance)
    .slice(0, k)
    .map(entry => entry.word);
}


function initializeInteractivePrompt(words) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Input >> ',
  });

  console.log('Type a word and press Enter to find approximate matches. Type "exit" to quit.');

  rl.prompt();

  rl.on('line', line => {
    const input = line.trim().toLowerCase();
    if (input === 'exit') {
      console.log('Goodbye!');
      rl.close();
      return;
    }

    if (input.length === 0) {
      console.log('Output >> Please enter a valid word.');
    } else {
      const suggestions = findTopKMatches(input, words, 3);
      console.log(`Output >> ${suggestions.join(', ')}`);
    }
    rl.prompt();
  });

  rl.on('close', () => {
    console.log('Exiting the program.');
    process.exit(0);
  });
}

// Main 
function main() {
  const filePath = './words.txt'; 
  console.log('Loading words from file...');
  const words = loadWordsFromFile(filePath);

  console.log(`${words.length} words loaded into memory.`);
  initializeInteractivePrompt(words);
}

main();
