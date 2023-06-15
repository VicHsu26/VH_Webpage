  // Word list
const wordList = [
  { word: 'Violin', definition: 'A string instrument with four strings, played with a bow, and held against the player\'s shoulder.' },
  { word: 'Bow', definition: 'A long, slightly curved wooden stick with horsehair stretched between its ends, used to play the violin by drawing it across the strings.' },
  { word: 'Strings', definition: 'The four thin, usually metal, strings stretched across the body of the violin, tuned to specific pitches (G, D, A, and E).' },
  { word: 'Fholes', definition: 'The two "f"-shaped openings on the front of the violin, which allow the sound to resonate and escape from the instrument.' },
  { word: 'Scroll', definition: 'The carved, ornamental headpiece at the top of the neck of the violin.' },
  { word: 'Neck', definition: 'The long, narrow piece of wood that extends from the body of the violin and supports the fingerboard.' },
  { word: 'Fingerboard', definition: 'The smooth, flat strip of wood located on top of the neck, where the violinist presses down the strings to change the pitch.' },
  { word: 'Pegbox', definition: 'The box-shaped part at the top of the neck, containing the pegs that are used to tune the strings.' },
  { word: 'Tailpiece', definition: 'The wooden or metal piece attached to the end of the violin, where the strings are attached and adjusted.' },
  { word: 'Chinrest', definition: 'A small, contoured piece of wood or plastic attached to the left side of the violin body, providing support and comfort for the player\'s chin and jaw.' },
  { word: 'Bridge', definition: 'A small, curved piece of wood that stands upright between the F-holes, supporting the strings and transmitting their vibrations to the body of the violin.' },
  { word: 'Soundpost', definition: 'A small wooden dowel placed inside the violin, between the top and back plates, to help transmit vibrations and improve the instrument\'s sound.' },
  { word: 'Tailgut', definition: 'A cord or wire that connects the tailpiece to the end button and helps support the tension of the strings.' },
  { word: 'Bowhair', definition: 'The horsehair attached to the bow, which interacts with the strings to produce sound when the bow is drawn across them.' }
];


let selectedWord = '';
let guessedLetters = [];
let remainingGuesses = 6;


const hangmanImg = document.getElementById('hangman-img');
const wordContainer = document.getElementById('word-container');
const lettersContainer = document.getElementById('letters-container');
const newGameBtn = document.getElementById('new-game-btn');


function initializeGame() {

  selectedWord = wordList[Math.floor(Math.random() * wordList.length)].word.toUpperCase();
  

  guessedLetters = [];
  remainingGuesses = 6;
  

  wordContainer.innerHTML = '';
  lettersContainer.innerHTML = '';
  

  for (let i = 0; i < selectedWord.length; i++) {
    const placeholder = document.createElement('span');
    placeholder.textContent = '_';
    wordContainer.appendChild(placeholder);
  }
  

  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const button = document.createElement('button');
    button.textContent = letter;
    button.addEventListener('click', () => guessLetter(letter));
    lettersContainer.appendChild(button);
  }
  

  newGameBtn.disabled = false;
}


function guessLetter(letter) {
  if (guessedLetters.includes(letter)) {
    return; 
  }
  
  guessedLetters.push(letter);
  
  const placeholders = wordContainer.querySelectorAll('span');
  let letterFound = false;
  
  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === letter) {
      placeholders[i].textContent = letter;
      letterFound = true;
    }
  }
  
  if (!letterFound) {
    remainingGuesses--;
    hangmanImg.src = `hangman_${6 - remainingGuesses}.png`;
  }
  
  if (remainingGuesses === 0) {
    endGame(false);
  } else if (checkWordGuessed()) {
    endGame(true);
  }
}


function checkWordGuessed() {
  const placeholders = wordContainer.querySelectorAll('span');
  for (let i = 0; i < placeholders.length; i++) {
    if (placeholders[i].textContent === '_') {
      return false;
    }
  }
  return true;
}


function endGame(wordGuessed) {
  for (const button of lettersContainer.querySelectorAll('button')) {
    button.disabled = true;
  }
  newGameBtn.disabled = false;
  
  if (wordGuessed) {
    const definition = wordList.find(item => item.word.toUpperCase() === selectedWord).definition;
    alert(`Congratulations! You guessed the word "${selectedWord}"!\n\nDefinition: ${definition}`);
  } else {
    alert(`Game over! The word was "${selectedWord}".`);
  }
}


newGameBtn.addEventListener('click', initializeGame);


initializeGame();
