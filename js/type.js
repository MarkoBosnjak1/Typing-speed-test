var seconds = 1000 * 60; //1000 = 1 second in JS
var textarea = document.getElementById("textarea");
var header_pick = document.querySelectorAll(".header_title");
var timer;
var correct_words = 0;
var correct_characters = 0;
var oldValue = 0;
window.addEventListener("keypress", generator);
window.addEventListener("keydown", backspace);
//When a key is pressed in the text area, update the timer using myFunction
const words = ["next","fluttering","beneficial","remove","consist","stand","clam","believe","rare","luxuriant","clear","babies","exclude","parcel","giraffe","fragile","measure","show","eminent","hesitant","check","chubby","sass","stare","silent","existence","wire","suck","capable","encourage","property","hour","yarn","infect","drag","field","efficient","possible","railway","angry","increase","fish","purring","spread","mew","nutty","recognize","van","soothe","apple","shy","tent","finger","goldfish","thirsty","swell","convers","imported","empty","meet","spotty","bells","inlay","industry","address","complete","defective","detach","medical","vacation","near","wring","uttermost","lay","knowledge","select","unarmed","quarrelsome","lettuce","strain","education","sense","befall","friends","cannon","sow","quartz","change","hustle","creature","large","support","map","capture","store","fruit","scabble","condition","deny","spade",];
var leftover = [""];
var words_2 = shuffle(words);
var mistakes_in_word = 0;
var mistakes = 0;
shuffled_words = words_2.join(" ");
document.getElementById("textarea").innerHTML = shuffled_words;
var dont_repeat = false;


function myFunction() {
   if(seconds == 60000)
     timer = setInterval(myFunction, 1000)
   seconds -= 1000;
   document.getElementById("timer").innerHTML = seconds/1000;
   if ((seconds <= 10000) && (seconds >=50000) && don_repeat == false){
     document.getElementById("timer").style.color = "red";
     document.getElementById("timer").style.transition = "color 4s linear";
     dont_repeat = true;
   }
   if (seconds <= 0) {
    clearInterval(timer);
    console.log("VRIJEME ISTEKLO TNTN");
    window.removeEventListener("keypress",generator);
    window.removeEventListener("keydown",backspace);
    alert(`Time's up.
    WPM: ${correct_words}`)
   }
} //If seconds are equal or greater than 0, countdown until 1 minute has passed
//Else, clear the timer and alert user of how many words they type per minute

document.getElementById("timer").innerHTML= seconds/1000;

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  function generator(){
    if(document.getElementById("cpm").innerHTML == 0){myFunction();}
    var letter = String.fromCharCode(event.charCode);
    var code = event.keyCode;
    var f = document.getElementById("textarea").innerHTML;
    console.log(code);
    if(code == 32 && event.target == document.body) {
      event.preventDefault();
      if(mistakes_in_word == 0 && f[0]==" "){
        leftover = "";
        correct_words += 1;
        document.getElementById("wpm").innerHTML = correct_words;
         if(mistakes != 0){
          let tmp = correct_words/(correct_words+mistakes);
          console.log(tmp,correct_words,mistakes);
          tmp = tmp*100;
          tmp = parseInt(tmp);
          document.getElementById("accuracy").innerHTML = tmp;
         }
      } else { /* ako si upro space a nije tocno*/
          mistakes = mistakes + 1;
          console.log(correct_words);
          if(correct_words != 0){
            let tmp = correct_words/(correct_words+mistakes);
            console.log(tmp,correct_words,mistakes);
            tmp = tmp*100;
            tmp = parseInt(tmp);
            document.getElementById("accuracy").innerHTML = tmp;
          }
          mistakes_in_word = 0;
          leftover = "";
          for(let i=0;i<10;i++){
            if(f[0] != " "){
              f = f.substring(1);
            } else break;
          }
      }
      document.getElementById("garbage_text").innerHTML = leftover;
      document.getElementById("textarea").innerHTML = f;
    }
    if(code == 8 && event.target == document.body) {
      event.preventDefault()
    }
    var tmp;
    tmp = document.getElementById("textarea").innerHTML;
    var correct_letter = tmp[0];
    console.log(correct_letter);
    if(correct_letter == letter && mistakes_in_word == 0){
        leftover = leftover + letter;
        document.getElementById("garbage_text").innerHTML = leftover;
        correct_characters += 1;
        document.getElementById("cpm").innerHTML = correct_characters;
        var tmp_2 = tmp.slice(1);
        document.getElementById("textarea").innerHTML=tmp_2;
    } else {
      if(code != 8){
        mistakes_in_word = mistakes_in_word + 1;
        leftover = leftover + letter;
        document.getElementById("garbage_text").innerHTML = leftover;
        document.getElementById("garbage_text").style.textDecoration = "line-through";
      } 
    }
    if(mistakes_in_word == 0){
      document.getElementById("garbage_text").style.textDecoration = "none";
    }
  }

  function backspace(){
    var code_2 = event.keyCode;
    if((code_2 == 8) && (mistakes_in_word != 0)){
      leftover = leftover.substring(0, leftover.length-1);
      document.getElementById("garbage_text").innerHTML = leftover;
      mistakes_in_word = mistakes_in_word - 1;
      if(mistakes_in_word == 0){
        document.getElementById("garbage_text").style.textDecoration = "none";
      }
    }
  }
//navbar control !
header_pick.forEach(function(item,index){
    item.addEventListener("mouseover",function(){
      that = this;
      header_pick.forEach(function(item2){
        item2.style.color = "gray";
        item2.style.opacity = "0.5";
        that.style.transform = "scale(1.15,1.15)"
        that.style.color = "white";
        that.style.opacity = "1";
      });
    });
    item.addEventListener("mouseout",function(){
      that = this;
      header_pick.forEach(function(item3){
        item3.style.color="white";
        item3.style.opacity = "1";
        that.style.transform = "scale(1,1)";
      })
    })
  })

  window.addEventListener('scroll', function(e){

    // Get the new Value
    newValue = window.pageYOffset;

    //Subtract the two and conclude
    if(oldValue - newValue > 0){
      //scrolling up
      if ((newValue != 0) && (oldValue != 0)){
         document.getElementById("header").style.transform = "translateY(0em)";
         document.getElementById("header").style.transition = "transform 0.2s linear 0.05s";
      }
    } else if(oldValue - newValue < 0){
      //scrolling down
      document.getElementById("header").style.transform = "translateY(-5.5em)";
    }
    // Update the old value
    oldValue = newValue;
});