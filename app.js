'use strict';


// var totalVotes = document.getElementById('tallying votes');


// Here we are saying where were gettiing the photos from and saying the position in the container we'd like for them to have.
var leftImages = document.getElementById('left');
var rightImages = document.getElementById('right');
var centerImages = document.getElementById('center');

var containerEl = document.getElementById('image_container');

var countingVotes = 0;

var allProducts = [];

// This constructor function is saying what to do with the image, pushing all of them into an array when finished which then will generate photos
function Product(name) {
  this.name = name;
  this.path = `images/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
  allProducts.push(this);
}

function makeRandom() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProducts() {
  //create an array to hold unique indexes
  var uniquePicsArray = [];
  //assigns random values to uniquePicsArray index 1 and 2
  uniquePicsArray[0] = makeRandom();
  uniquePicsArray[1] = makeRandom();
  //here we are checking to see if you uniquePicsArray at index 1 is equal to index 2, if so reassign index 1 by calling makeRandom()
  while(uniquePicsArray[0] === uniquePicsArray[1]){
    console.log('line 39 Duplicate Found');
    uniquePicsArray[1] = makeRandom();
  }
  //creating the 3rd number in the array and ensuring that it does not match the previous 2 indexes
  uniquePicsArray[2] = makeRandom();
  while(uniquePicsArray[2] === uniquePicsArray[1] || uniquePicsArray[2] === uniquePicsArray[0] ){
    console.log('line 45 Duplicate Found');
    uniquePicsArray[2] = makeRandom();
  }
  //add views here
  allProducts[uniquePicsArray[0]].views++;
  //get a random index
  //display a product whose index is the random number
  leftImages.src = allProducts[uniquePicsArray[0]].path;
  leftImages.name = allProducts[uniquePicsArray[0]].name;
  leftImages.title = allProducts[uniquePicsArray[0]].name;

  //add views here
  allProducts[uniquePicsArray[1]].views++;
  rightImages.src = allProducts[uniquePicsArray[1]].path;
  rightImages.name = allProducts[uniquePicsArray[1]].name;
  rightImages.title = allProducts[uniquePicsArray[1]].name;

  // the center image will generate a third picture within the container
  allProducts[uniquePicsArray[2]].views++;
  centerImages.src = allProducts[uniquePicsArray[2]].path;
  centerImages.name = allProducts[uniquePicsArray[2]].name;
  centerImages.title = allProducts[uniquePicsArray[2]].name;
}

// These products will be pushed into the Array at the beginning of the code.
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');

// this tells you not to repeat the same image more than once on the same page, and it also keeps track of the votes and increases each vote by one everytime
function handleClick() {
  var chosenImages = event.target.title;
  console.log('chosenImage: ', chosenImages);
  for (var i =  0; i < allProducts.length; i++) {
    if (allProducts[i].name === chosenImages) {
      allProducts[i].votes++;
      countingVotes++;
      console.log('countingVotes: ', countingVotes);
      while (countingVotes < 5) {
        renderProducts();
        return;
      }
      containerEl.removeEventListener('click', handleClick);
      containerEl.remove();
      //function makeChart() gets called right here.
    }
  }
}

// I'm telling JavaScript that each time there's a click in the container handle the click by changing photos.
containerEl.addEventListener('click', handleClick);


//we are re rendering so that the code will run.
renderProducts();
