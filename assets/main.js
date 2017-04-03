let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let message = document.getElementById('message');
let code = document.getElementById('code');

setHiddenFields();

function guess() {
    let input = document.getElementById('user-guess');

    //add functionality to guess function here
    if(!answer.value | !attempt.value ) {
      setHiddenFields();
    }
    if(validateInput(input.value)){
      attempt.value++;
    } else{
      return false;
    }

    var guessResult = getResults(input.value);

    if(guessResult){
      setMessage("You Win! :)");
      showAnswer(guessResult);
      showReplay();
    } else if (!guessResult & attempt >= 10){
      setMessage("You Lose! :()");
      showAnswer(guessResult);
      showReplay();
    } else {
      setMessage("Incorrect, try again.");
    }
}

//implement new functions here
function setHiddenFields(){
  attempt.value = 0;
  answer.value = Math.floor(Math.random() * 9999).toString();
  while(answer.value.length < 4) {
    answer.value = '0' + answer.value;
  }

}

function setMessage(messageIn){
  message.innerHTML = messageIn;
}

function validateInput(guess){
  if(guess.length == 4){
      return true;
  } else {
    setMessage('Guesses must be exactly 4 characters long.');
    return false;
  }
}

function getResults(guess){

  var correctAnswers = 0;
  var resultElements = '<div class="row"><span class="col-md-6">' + guess + '</span><div class="col-md-6">';
  var guessNumbers = guess.split('');
  var answerNumbers = answer.value.split('');
  for (i = 0; i < guessNumbers.length; i++) {
    console.log(guessNumbers[i]);
    if(guessNumbers[i] == answerNumbers[i]){
      correctAnswers++;
      resultElements += '<span class="glyphicon glyphicon-ok"></span>';
    } else if(answerNumbers.indexOf(guessNumbers[i]) != -1){
      resultElements += '<span class="glyphicon glyphicon-transfer"></span>';
    } else{
      resultElements += '<span class="glyphicon glyphicon-remove"></span>';
    }
  }
  resultElements += '</div>'
  results.innerHTML = (resultElements);
  if (correctAnswers == 4) {
    return true;
  } else {
    return false;
  }
}


function showAnswer(win){
  code.innerHTML = answer.value;
  if (win) {
    code.className += " success";
  } else {
    code.className += " failure";
  }
}

function showReplay(){
  document.getElementById('guessing-div').style.display = 'none';
  document.getElementById('replay-div').style.display = 'block';
}
