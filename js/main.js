// Card Populate
var card = '<button class="card" type="button" name="%name%"></button>';
var cardSet = [{
    class: 'appstore',
    name: 'apple'
  },
  {
    class: 'android',
    name: 'robot'
  },
  {
    class: 'plancast',
    name: 'penguin'
  },
  {
    class: 'evernote',
    name: 'elephant'
  },
  {
    class: 'dribbble',
    name: 'basketball'
  },
  {
    class: 'drupal',
    name: 'masked'
  },
  {
    class: 'reddit',
    name: 'allien'
  },
  {
    class: 'pinboard',
    name: 'tack'
  }
];

// Format Cards and double
var cardArray = [];
cardSet.forEach(function(element) {
  var formattedCard = card.replace('%class%', element.class).replace('%name%', element.name);
  cardArray.push(formattedCard, formattedCard);
  return cardArray;
})

// Randomize Cards
cardArray.sort(function(a, b) {
  return 0.5 - Math.random()
});

// Add Cards to HTML
$('#game').prepend(cardArray);

// Stars
var stars = '<li class="entypo-star"></li>';
$('.star').html(stars.repeat(3));

// Stars change to empty stars based on number of moves
function starCount() {
  switch (move) {
    case 20:
      $('.star li:first-child').addClass('entypo-star-empty');
    case 16:
      $('.star li:nth-child(2)').addClass('entypo-star-empty');
    case 12:
      $('.star li:last-child').addClass('entypo-star-empty');
  }
}

// Time Stamp variables
var clock;
var time = 1;
var start = 0;

// start clock
function startClock() {
  clock = setInterval(function() {
    // add time to HTML and increment time
    $('#time').text(time + ' sec.');
    time++;
  }, 1000);
}

// game variables
var matchCheck = [];
var correctCards = 0;
var move = 0;

// On Click
$('.card').click(function() {

  // Start time on click of first card
  if (start === 0) {
    start++;
    startClock();
  }

  // Move count
  move += .5;
  $('#moves').html(Math.floor(move) + ' Moves');
  starCount();

  // adds class selected to card that is selected
  $(this).addClass('selected').prop('disabled', true);
  matchCheck.push($(this).prop('name'));

  // disables the selection of other cards while matching is being processed
  if (matchCheck.length === 2) {
    $('.card').prop('disabled', true);
  }

  // Add Icon to cards based on the property 'Name'
  for (i = 0; i < cardSet.length; i++) {
    if ($(this).prop('name') === cardSet[i].name) {
      $(this).addClass('zocial-' + cardSet[i].class);
    }
  }

  // delays the matching and adding of classes for animation of card to finish
  setTimeout(function() {

    // Find Match, if match is true add class of correct else add class wrong and removed class selected and wrong
    if (matchCheck.length === 2) {
      if (matchCheck[0] === matchCheck[1]) {
        $('.selected').addClass('correct').removeClass('selected');
        $('.card:not(.correct)').prop('disabled', false);
        matchCheck = [];
        correctCards++;

        // call stop clock function if all cards are correct
        if (correctCards === cardSet.length) {

          // stop clock
          clearInterval(clock);

          // popup window
          var popup = '<h3>Congratulations!!!</h3><p>You finished in ' + (time - 1) + ' sec.</p><p>Number of moves: ' + move + '</p>';
          $('#popup').prepend(popup).css('display', 'flex').addClass('show');
        }
      } else {
        $('.selected').addClass('wrong');

        // delays class removal so animation can complete
        setTimeout(function() {
          for (i = 0; i < cardSet.length; i++) {
            $('.wrong').removeClass('zocial-' + cardSet[i].class);
          }
          $('.card:not(.correct)').prop('disabled', false).removeClass('wrong selected');
        }, 500);
        matchCheck = [];
      }
    }
  }, 300);
});

// Reload page
$('.reset').click(function() {
  location.reload();
});
