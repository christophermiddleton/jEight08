var sequenceKick = [1,0,0,1, 0,0,0,1, 0,0,0,1, 0,1,0,0];   //
var sequenceSnare = [0,0,0,0, 1,0,0,0, 0,1,0,0, 1,0,0,0];  // set default drum pattern here
var sequenceHat = [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,0,1];    //
var sequenceHat2 = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,1,0];   //
//var offset = [];

var i = 0; // current step to be played (starts at zero as used to iterate through arrays)
var l = sequenceKick.length;

var tempo = 115; //default tempo in BPM (NOTE the tempo value will need changing in the spinner tag also)

var play = false;

//var swing = false; //gives more human feel if set to true

var stepIntervalMS = 60000 / tempo / (l / 4); //calculates step length in ms

var offsetA = stepIntervalMS + (stepIntervalMS / 5);
var offsetB = stepIntervalMS - (stepIntervalMS / 5);

//offset.push(offsetA, offsetB);

console.log("step interval: " + stepIntervalMS);
console.log(offsetA);
console.log(offsetB);

var kick = new Audio('wav/kick.wav');
var hat = new Audio('wav/hat.wav');
var hat2 = new Audio('wav/hat2.wav');
var snare = new Audio('wav/snare.wav');

var loop = 1; //repeats sequence if set to 1

function iterator2() { //triggered when Play button is pressed
  kickPlay();
  snarePlay();
  hatPlay();
  hat2Play();
  if((++i<l) && play == true) { 
    setTimeout(iterator2, stepIntervalMS);
  }
  else if (loop == 1 && play == true) {
    setTimeout(iterator2, stepIntervalMS);
    i = 0;
  }
}

function iteratorSwing() {
  kickPlay();
  snarePlay();
  hatPlay();
  hat2Play();
  if((++i<l) && play == true) {
    //setTimeout(iteratorSwing, stepIntervalMS);
    if(i % 2 == 0) {
      setTimeout(iteratorSwing, offsetB);
    }
    else {
      setTimeout(iteratorSwing, offsetA);
    }
  }
  else if (loop == 1 && play == true) {
    setTimeout(iteratorSwing, stepIntervalMS);
    i = 0;
  }
}

function kickPlay() { //plays kick if it sees a 1
  if(sequenceKick[i] == "1") {
    $('#kick').addClass('boxOn');
      kick.pause();
      kick.currentTime=0;
      kick.play();
    }
  else {
    $('#kick').removeClass('boxOn');
  }
}

function hatPlay() { //plays hat if it sees a 1
  if(sequenceHat[i] == "1") {
      $('#hat').addClass('boxOn');
      hat.pause();
      hat.currentTime=0;
      hat.play();
    }
  else {
    $('#hat').removeClass('boxOn');
  }
}

function hat2Play() { //plays hat2 if it sees a 1
  if(sequenceHat2[i] == "1") {
      $('#hat2').addClass('boxOn');
      hat2.pause();
      hat2.currentTime=0;
      hat2.play();
    }
  else {
    $('#hat2').removeClass('boxOn');
  }
}

function snarePlay() { // plays snare if it sees a 1
  if(sequenceSnare[i] == "1") {
      $('#snare').addClass('boxOn');
      snare.pause();
      snare.currentTime=0;
      snare.play();
    }
  else {
    $('#snare').removeClass('boxOn');
  }
}

function populateLanes2() { // iterates through the 4 arrays and highlights lane divs accordingly
  for (var b = 0; b < sequenceKick.length; b++) {
    if(sequenceKick[b] == 1) {
      console.log(sequenceKick[b]);
      $('#k' + (b + 1)).addClass('boxOn');
    }
    else {
      $('#k' + (b + 1)).removeClass('boxOn');
    }
  }
  for (var b = 0; b < sequenceSnare.length; b++) {
    if(sequenceSnare[b] == 1) {
      console.log(sequenceSnare[b]);
      $('#s' + (b + 1)).addClass('boxOn');
    }
    else {
      $('#s' + (b + 1)).removeClass('boxOn');
    }
  }
  for (var b = 0; b < sequenceHat.length; b++) {
    if(sequenceHat[b] == 1) {
      console.log(sequenceHat[b]);
      $('#h' + (b + 1)).addClass('boxOn');
    }
    else {
      $('#h' + (b + 1)).removeClass('boxOn');
    }
  }
  for (var b = 0; b < sequenceHat2.length; b++) {
    if(sequenceHat2[b] == 1) {
      console.log(sequenceHat2[b]);
      $('#o' + (b + 1)).addClass('boxOn');
    }
    else {
      $('#o' + (b + 1)).removeClass('boxOn');
    }
  }
}

function reply_click(obj) { //reads id from lane div when clicked and turns off/on in array accordingly.
  var id = obj.id.substring(1, 3);
  var drum = obj.id.substring(0, 1);
  console.log('drum: ' + drum);
  if(drum == "k") {
    if(sequenceKick[id-1] == 1) {
      sequenceKick[id-1] = 0;
      $('#' + drum + id).removeClass('boxOn');
      console.log(sequenceKick[id-1]);
    }
    else {
      sequenceKick[id-1] = 1;
      $('#'+ drum + id).addClass('boxOn');
      console.log(sequenceKick[id-1]);
    }
  }
  else if(drum == "s") {
    if(sequenceSnare[id-1] == 1) {
      sequenceSnare[id-1] = 0;
      $('#' + drum + id).removeClass('boxOn');
      console.log(sequenceSnare[id-1]);
    }
    else {
      sequenceSnare[id-1] = 1;
      $('#'+ drum + id).addClass('boxOn');
      console.log(sequenceSnare[id-1]);
    }
  }
  else if(drum == "h") {
    if(sequenceHat[id-1] == 1) {
      sequenceHat[id-1] = 0;
      $('#' + drum + id).removeClass('boxOn');
    }
    else {
      sequenceHat[id-1] = 1;
      $('#'+ drum + id).addClass('boxOn');
    }
  }
  else if(drum == "o") {
    if(sequenceHat2[id-1] == 1) {
      sequenceHat2[id-1] = 0;
      $('#' + drum + id).removeClass('boxOn');
    }
    else {
      sequenceHat2[id-1] = 1;
      $('#'+ drum + id).addClass('boxOn');
    }
  }
}

function resetLanes() {
    sequenceKick = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    sequenceSnare = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    sequenceHat = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    sequenceHat2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    console.log(sequenceKick);
    populateLanes2();
}

$(document).ready(function() {
  populateLanes2();

  $('#kick').click(function() {  //plays kick when pad is clicked
    kick.currentTime=0;
    kick.play();
    $('#kick').addClass('boxOn');
    setTimeout(function() {
      $('#kick').removeClass('boxOn');
    }, 200);
  });

  $('#snare').click(function() {  //plays snare when pad is clicked
    snare.currentTime=0;
    snare.play();
    $('#snare').addClass('boxOn');
    setTimeout(function() {
      $('#snare').removeClass('boxOn');
    }, 200);
  });  

  $('#hat').click(function() {  //plays hat when pad is clicked
    hat.currentTime=0;
    hat.play();
    $('#hat').addClass('boxOn');
    setTimeout(function() {
      $('#hat').removeClass('boxOn');
    }, 200);
  });

  $('#hat2').click(function() {  //plays hat2 when pad is clicked
    hat2.currentTime=0;
    hat2.play();
    $('#hat2').addClass('boxOn');
    setTimeout(function() {
      $('#hat2').removeClass('boxOn');
    }, 200);
  }); 

  $('#play').click(function() {  //plays sequence when Play button is clicked (only when play == false)
    if (play == false) {
      play = true;
      i = 0;
      iterator2();
    }
  });
  
  $('#stop').click(function() {
    play = false;
    setTimeout(function() {
      $('#kick').removeClass('boxOn');
      $('#snare').removeClass('boxOn');
      $('#hat').removeClass('boxOn');
      $('#hat2').removeClass('boxOn');
    }, stepIntervalMS);
  });
  
  $('#reset').click(function() {
    resetLanes();
  });

  $('#tempo').click(function() {
    tempo = $(this).val();
    console.log(tempo);
    stepIntervalMS = 60000 / tempo / (l / 4);
    offsetA = stepIntervalMS + (stepIntervalMS / 3);
    offsetB = stepIntervalMS - (stepIntervalMS / 3);
  });

  $(document).keypress(function(e) { //allows drum sounds to be triggered using Q, W, E & R keys
    switch(e.which) {
      case 113: //plays kick when Q is pressed
        kick.currentTime=0;
        kick.play();
        $('#kick').addClass('boxOn');
        setTimeout(function() {
          $('#kick').removeClass('boxOn');
        }, 150);
        break;
      case 119: //plays snare when W is pressed
        snare.currentTime=0;
        snare.play();
        $('#snare').addClass('boxOn');
        setTimeout(function() {
          $('#snare').removeClass('boxOn');
        }, 150);
        break;
      case 101: //plays hat when E is pressed
        hat.currentTime=0;
        hat.play();
        $('#hat').addClass('boxOn');
        setTimeout(function() {
          $('#hat').removeClass('boxOn');
        }, 150);
        break;
      case 114: //plays hat2 when R is pressed
        hat2.currentTime=0;
        hat2.play();
        $('#hat2').addClass('boxOn');
        setTimeout(function() {
          $('#hat2').removeClass('boxOn');
        }, 150);
        break;
    }
  });
});

