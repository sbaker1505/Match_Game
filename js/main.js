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
  $('#moves').html(move + ' Moves');
  console.log(move);
  if (move >= 3){
    $('.entypo-star:last-child').addClass('entypo-star-empty');
  };
  if (move >= 10){
    $('.entypo-star:nth-child(2)').addClass('entypo-star-empty');
  };
  if (move >= 14){
    $('.entypo-star:first-child').addClass('entypo-star-empty');
  };
});

// Stars
var stars = '<li class="entypo-star"></li>';
$('#star').html(stars.repeat(3));

// Time Stamp
var time = 0;
$('.card').click(function(){
  if (time === 0){
    setInterval(function(){
      $('#time').text('Time: '+ time +' sec.');
      time++;
    },1000);
  }
})

// On Click
var matchCheck = [];
$('.card').click(function(){
  $(this).addClass('selected').prop('disabled', true);
  matchCheck.push($(this).prop('name'));

  if(matchCheck.length === 2){
    $('.card').prop('disabled', true);
  }

  // Add Icon
  for (i = 0; i < cardSet.length; i++){
    if ($(this).prop('name') === cardSet[i].name){
        $(this).addClass('zocial-'+cardSet[i].class);
    }
  }

  setTimeout(function(){
    // Find Match
    if(matchCheck.length === 2){
      if(matchCheck[0] === matchCheck[1]){
        $('.selected').addClass('correct').removeClass('selected');
        $('.card:not(.correct)').prop('disabled', false);
        matchCheck = [];
      } else {
        $('.selected').addClass('wrong')
        setTimeout(function(){
          for (i = 0; i < cardSet.length; i++){
            $('.wrong').removeClass('zocial-'+cardSet[i].class);
          }
          $('.card:not(.correct)').prop('disabled', false).removeClass('wrong selected');
        }, 500);
        matchCheck = [];
      }
    }
  }, 1000);
});
