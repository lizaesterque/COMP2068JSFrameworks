// Import prompt
const prompt = require('prompt');

// Start the prompt
prompt.start();

// Use the prompt() npm package to ask the user to choose ROCK, PAPER, or SCISSORS and store their response as userSelection
console.log('Choose ROCK, PAPER, or SCISSORS:');


prompt.get(['userSelection'], (err, result) => {
  if (err) {
    console.error('Error during prompt:', err);
    return;
  }

  // Store the user's selection in upper case
  const userSelection = result.userSelection.toUpperCase();


  // Use the Math.random() function to generate a number as computerSelection
function generateComputer() {
  const randomNum = Math.random();

  if (randomNum >= 0 && randomNum <= 0.34) {
    return 'PAPER';
  } else if (randomNum > 0.34 && randomNum <= 0.67) {
    return 'SCISSORS';
  } else if (randomNum > 0.68 && randomNum <= 1.00) {
    return 'ROCK';
  }
}

 // Generate the computer's selection
  const computerSelection = generateComputer();

// Display both the userSelection and computerSelection variables using console.log()
  console.log('User selected:', userSelection);
  console.log('Computer selected:', computerSelection);


//  determine who wins the game using regular Rock, Paper, Scissors rules
function determineWinner(userSelection, computerSelection) {
  if (userSelection === computerSelection) {
    return 'It\'s a tie';
  } else if (
    (userSelection === 'ROCK' && computerSelection === 'SCISSORS') ||
    (userSelection === 'PAPER' && computerSelection === 'ROCK') ||
    (userSelection === 'SCISSORS' && computerSelection === 'PAPER')
  ) {
    return 'User Wins';
  } else {
    return 'Computer Wins';
  }
}

  // Determine the winner and display the outcome
  const resultMessage = determineWinner(userSelection, computerSelection);
  console.log(resultMessage);


});
