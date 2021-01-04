//declaring important global variables
let gameStarted = false;
let cardCount = 0;
let moveCount = 0;
let correctMatches = 0;
let firstCard;
let secondCard;

//array of the donut images
const donuts = [
   {
      name: 'blue', 
      img: 'donuts/blue.png'
   },
   {
      name: 'orange-bite', 
      img: 'donuts/orange-bite.png'
   },
   {
      name: 'pink-bite', 
      img: 'donuts/pink-bite.png'
   },
   {
      name: 'pink', 
      img: 'donuts/pink.png'
   },
   {
      name: 'striped-bite', 
      img: 'donuts/striped-bite.png'
   },
   {
      name: 'yellow', 
      img: 'donuts/yellow.png'
   }
]

//creating the card class
class Card {
   constructor(selector, img){
      this.selector = document.querySelector(selector);
      this.img = img;
   }
   revealCard(){
      if(!this.selector.classList.contains('card-active') && cardCount === 0) {
         this.selector.classList.add('card-active');
         this.selector.style.backgroundImage = `url(${this.img})`;
         this.selector.style.transition = 'background-image 0.2s ease-in-out';
         cardCount = cardCount + 1;
         firstCard = this;
     } else if (!this.selector.classList.contains('card-active') && cardCount === 1){
         this.selector.classList.add('card-active');
         this.selector.style.backgroundImage = `url(${this.img})`;
         this.selector.style.transition = 'background-image 0.2s ease-in-out';

         cardCount = cardCount + 1;
         secondCard = this;
     }
   }
}

//assigning the buttons to variables
const start = document.querySelector('.start');
const reset = document.querySelector('.reset');
const moves = document.querySelector('.moves')

//creating the card objects
const card1 = new Card('.card1', undefined); 
const card2 = new Card('.card2', undefined); 
const card3 = new Card('.card3', undefined); 
const card4 = new Card('.card4', undefined); 
const card5 = new Card('.card5', undefined); 
const card6 = new Card('.card6', undefined); 
const card7 = new Card('.card7', undefined); 
const card8 = new Card('.card8', undefined); 
const card9 = new Card('.card9', undefined); 
const card10 = new Card('.card10', undefined); 
const card11 = new Card('.card11', undefined); 
const card12 = new Card('.card12', undefined); 

//turning them into an array
const cardArray1 = [card1, card3, card5, card7, card9, card11];
const cardArray2 = [card2, card4, card6, card8, card10, card12];
const cards = document.querySelectorAll('.card');
const cardArrayAll = [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, card12];

//shuffles the donut images
const shuffle = (arr) => {
  let i = arr.length, j, temp;
  while(--i > 0) {
    j = Math.floor(Math.random() * (i+1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp; 
  }
}

//assigns them to each card 
const assignCard = (cardArr, donutArr) => {
   for (let i = 0; i < cardArr.length; i++){
      cardArr[i].img = donutArr[i].img;
   }
}

//allows the user to start the game
//makes the cards full opacity and adds a cursor pointer
const revealBoard = () => {
   for (let i = 0 ; i < cards.length; i++){
      cards[i].style.cursor = 'pointer';
      cards[i].style.transition = "opacity 0.5s linear 0s";
      cards[i].style.opacity = '1';
   };
}

//adds game mechanics; what happens when a user matches two cards vs when they don't
const findMatch = () => {
   if(firstCard.img != secondCard.img && cardCount === 2){
      firstCard.selector.classList.remove('card-active');
      firstCard.selector.style.transition = 'background-image 0.2s ease-in-out';
      firstCard.selector.style.backgroundImage = 'url(donuts/back-of-card.png)';

      secondCard.selector.classList.remove('card-active');
      secondCard.selector.style.transition = 'background-image 0.2s ease-in-out';
      secondCard.selector.style.backgroundImage = 'url(donuts/back-of-card.png)';

      cardCount = 0;
      moveCount++;
      moves.innerText = `Moves: ${moveCount}`;
   } else if (firstCard.img === secondCard.img && cardCount === 2){
      firstCard.selector.style.opacity = '0.5';
      firstCard.selector.style.transition = 'opacity 0.2s ease-in-out';

      secondCard.selector.style.opacity = '0.5';
      secondCard.selector.style.transition = 'opacity 0.2s ease-in-out';
      
      cardCount = 0;
      moveCount++;
      correctMatches++;
      moves.innerText = `Moves: ${moveCount}`;
      setTimeout(function(){ youWin() }, 1200);
   }
}

//checks that the game has started and if so activates the card functions
//time out was added to allow time to show both cards and their transitions
const activeCard = (card) => {
   if(gameStarted){
      card.revealCard();
      if(cardCount === 2){
         setTimeout(function(){ findMatch() }, 1000); 
      }
   } 
}

//sends the user a message after they finish and closes the board
const youWin = () => {
   if(correctMatches === 6){
      alert('Congratulations you finished! Press "Start Game" to play again!');
      closeBoard();
      moveCount = 0;
      moves.innerText = `Moves: ${moveCount}`;
   }
}

//ends the game 
//lets the user know by grayng out the board and deactivationg the functions
const closeBoard = () => {
   gameStarted = false;
   for (let i = 0 ; i < cardArrayAll.length; i++){
      cardArrayAll[i].selector.style.cursor = 'auto';
      cardArrayAll[i].selector.style.opacity = '0.5';
      cardArrayAll[i].selector.style.transition = "opacity 0.5s linear 0s";
      cardArrayAll[i].selector.classList.remove('card-active')
      cardArrayAll[i].selector.style.backgroundImage = 'url(donuts/back-of-card.png)';
   };
}

//starts the game and activates the random card assignments
start.addEventListener('click', () => {
   if (!gameStarted){
      shuffle(donuts);
      assignCard(cardArray1, donuts);
      shuffle(donuts);
      assignCard(cardArray2, donuts);
      revealBoard();
      gameStarted = true;
   } 
});

//ends the game 
reset.addEventListener('click', () => {
   if (gameStarted) {
      closeBoard();
      moveCount = 0;
      moves.innerText = `Moves: ${moveCount}`;
   }
});






