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
  while (uniquePicsArray[0] === uniquePicsArray[1]) {
    console.log('line 39 Duplicate Found');
    uniquePicsArray[1] = makeRandom();
  }
  //creating the 3rd number in the array and ensuring that it does not match the previous 2 indexes
  uniquePicsArray[2] = makeRandom();
  while (uniquePicsArray[2] === uniquePicsArray[1] || uniquePicsArray[2] === uniquePicsArray[0]) {
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

var names = [];
function voteEnd() {

  var ctx = document.getElementById('myChart').getContext('2d');
  var makingChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: '# of Votes',
        data: caclulatingVotes(),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
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
new Product('dragon');
new Product('scissors');
new Product('pen');
new Product('sweep');
new Product('water-can');
new Product('wine-glass');
new Product('tauntaun');
new Product('usb');

for (var i = 0; i < allProducts.length; i++) {
  names.push(allProducts[i].name);
}
console.log(names);
// this tells you not to repeat the same image more than once on the same page, and it also keeps track of the votes and increases each vote by one everytime
function handleClick() {
  var chosenImages = event.target.title;
  console.log('chosenImage: ', chosenImages);
  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].name === chosenImages) {
      allProducts[i].votes++;
      countingVotes++;
      console.log('countingVotes: ', countingVotes);
      while (countingVotes < 25) {
        renderProducts();
        return;
      }
      containerEl.removeEventListener('click', handleClick);
      containerEl.remove();
      caclulatingVotes();
      // makingChart.update();
      voteEnd();


    }
  }
}



function caclulatingVotes() {
  var voteTotals = [];
  for (var i = 0; i < allProducts.length; i++) {
    voteTotals.push(allProducts[i].votes);
  }


  console.log('VOTE TOTALS', voteTotals);
  return voteTotals;

}


// for (var i = 0; i < allProducts.length; i++) {
// allProducts[i].name + ' has ' + allProducts[i].votes + ' votes';
// }

// }





// countingVotes();
// I'm telling JavaScript that each time there's a click in the container handle the click by changing photos.
containerEl.addEventListener('click', handleClick);

//we are re rendering so that the code will run.
renderProducts();
