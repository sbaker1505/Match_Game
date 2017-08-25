// Card Populate
var card = '<button class="card zocial-%class%" type="button" name="%name%"></button>';
var cardSet = [{
  class:  'appstore',
  name:   'apple'
},{
  class:  'android',
  name:   'robot'
},{
  class:  'plancast',
  name:   'penguin'
},{
  class:  'evernote',
  name:   'elephant'
}];

var cardArray = [];
cardSet.forEach(function(element){
  var formattedCard = card.replace('%name%', element.name);
  cardArray.push(formattedCard, formattedCard);
  return cardArray;
})

// .replace('%class%', element.class)

// Randomize Cards
cardArray.sort(function(a, b){return 0.5 - Math.random()});

// Add Cards to HTML
$('#game').append(cardArray);

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


// Find Match
var matchCheck = [];
$('.card').click(function(){
  $(this).addClass('selected').prop('disabled', true);
  matchCheck.push($(this).prop('name'));
  console.log(matchCheck);
  if(matchCheck.length === 2){
    if(matchCheck[0] === matchCheck[1]){
      $('.selected').addClass('correct').removeClass('selected');
      matchCheck = [];
    } else {
      $('.selected').addClass('wrong').prop('disabled', false).removeClass('wrong selected');
      matchCheck = [];
    }
  }
});

// Rotation
// $('.card').click(function showCard(){
//   var name = this.prop('name');
//   for (var i=0;i<cardSet.length;i++){
//     if (name === cardSet[i].name){
//       this.replace('%class%', cardSet[i].class);
//     }
//   }
// });

$('.card').click(function(){
  for (i = 0; i < cardSet.length; i++){
    if ($(this).prop('name') === cardSet[i].name){
       $(this).removeClass("zocial-%class%").addClass('zocial-'+cardSet[i].class);
      // $(this).replace('%class%', cardSet[i].class);
    }
  }
});
