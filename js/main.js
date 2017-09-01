// Card Populate
var card = '<button class="card" type="button" name="%name%"></button>';
var cardSet = [
              {class:  'appstore',  name:   'apple'},
              {class:  'android',   name:   'robot'},
              {class:  'plancast',  name:   'penguin'},
              {class:  'evernote',  name:   'elephant'},
              {class:  'dribbble',  name:   'basketball'},
              {class:  'drupal',    name:   'masked'},
              {class:  'reddit',    name:   'allien'},
              {class:  'pinboard',  name:   'tack'}
              ];

// Format Cards and double
var cardArray = [];
cardSet.forEach(function(element){
  var formattedCard = card.replace('%class%', element.class).replace('%name%', element.name);
  cardArray.push(formattedCard, formattedCard);
  return cardArray;
})

// Randomize Cards
cardArray.sort(function(a, b){return 0.5 - Math.random()});

// Add Cards to HTML
$('#game').prepend(cardArray);

// Move count
var move = 0;
$('.card').click(function(){
  move += .5;
  $('#moves').html(Math.floor(move) + ' Moves');
  // Stars change to empty stars based on number of moves
  if (move === 3){
    $('.entypo-star:last-child').addClass('entypo-star-empty');
  } else if (move === 10){
    $('.entypo-star:nth-child(2)').addClass('entypo-star-empty');
  } else if (move === 14){
    $('.entypo-star:first-child').addClass('entypo-star-empty');
  }
});

// Stars
var stars = '<li class="entypo-star"></li>';
$('#star').html(stars.repeat(3));

// Time Stamp
var clock;
var time = 0;
var start = 0;
// Start time on click of first card
$('.card').click(function(){
  if (start === 0) {
    start++;
    startClock();
  }
})
// start clock
function startClock() {
  clock = setInterval(addTime, 1000);
}
// add time to HTML and increment time
function addTime() {
  $('#time').text(time +' sec.');
  time++;
}
// stop clock
function stopTime() {
  clearInterval(clock);
}
// call stop clock function if all cards are correct
if (correctCards === cardSet.length) {
  stopTime();
}

// On Click
var matchCheck = [];
var correctCards = 0;
$('.card').click(function(){

  // Start time on click of first card
  if (start === 0) {
    start++;
    startClock();
  }

  // adds class selected to card that is selected
  $(this).addClass('selected').prop('disabled', true);
  matchCheck.push($(this).prop('name'));
  // disables the selection of other cards while matching is being processed
  if(matchCheck.length === 2){
    $('.card').prop('disabled', true);
  }

  // Add Icon to cards based on the property 'Name'
  for (i = 0; i < cardSet.length; i++){
    if ($(this).prop('name') === cardSet[i].name){
        $(this).addClass('zocial-'+cardSet[i].class);
    }
  }

  // delays the matching and adding of classes for animation of card to finish
  setTimeout(function(){
    // Find Match, if match is true add class of correct else add class wrong and removed class selected and wrong
    if(matchCheck.length === 2){
      if(matchCheck[0] === matchCheck[1]){
        $('.selected').addClass('correct').removeClass('selected');
        $('.card:not(.correct)').prop('disabled', false);
        matchCheck = [];
        correctCards++;
        console.log(correctCards)
      } else {
        $('.selected').addClass('wrong');
        // delays class removal so animation can complete
        setTimeout(function(){
          for (i = 0; i < cardSet.length; i++){
            $('.wrong').removeClass('zocial-'+cardSet[i].class);
          }
          $('.card:not(.correct)').prop('disabled', false).removeClass('wrong selected');
        }, 500);
        matchCheck = [];
      }
    }
  }, 300);
});

// Reload page
$('.reset').click(function(){
  location.reload();
});
