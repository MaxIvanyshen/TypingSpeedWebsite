import { render } from "react-dom";
import Image from 'next/image';
import React from 'react';

const words = require("../public/text/words.json");

var counter = 0, wrongCounter = 0, correctCounter = 0;
let fullText="";
let textToType="";
let showed=0;
let wordNumber=0;
let keyPress=0;

let arr = words.words.split(" ");
let randomArr=[];

function randomIndex(min, max) {
  return min+Math.floor((max-min)*Math.random());
}

function nextText() {
  if(showed==0) {
    for(var i=0; i<arr.length; ++i) {
      let r = randomIndex(1, arr.length);
      let randomElem = arr[r];
      textToType=textToType+randomElem+" ";
      randomArr[i]=randomElem;
    }
    $("#showingText").html(textToType);
    showed++;
  }
}

function checkSpacePress() {
  let id = 2;
  document.cookie="user=Max";
  document.cookie="id="+(id+1);
  alert(document.cookie);
  $('#textInput').keydown((e)=>{    
    if(keyPress==0 && e.code!="Space") {
      timer();
      keyPress++;
    }
    keyPress++;
    let code = e.code;
    if(code == "Space") {
      showText($('#textInput').val());
      clearInputField();
      e.preventDefault();
    }
  });
}

function clearInputField() {
  $('#textInput').val(null);
}

function showText(text) {
  let color = "red";
  // for(let i=0; i<randomArr.length; ++i) {
  //   if(text == randomArr[i]) {
  //     color="green";
  //     correctCounter++;
  //     counter++;
  //     break;
  //   }
  // }
  if(text==randomArr[wordNumber]) {
    color="green";
    correctCounter++;
    wordNumber++;
    counter++;
  }
  if(color == 'red') {
    counter++;
    wrongCounter++;
    wordNumber++;
  }
  if(counter == randomArr.length) {
    showed=0;
    nextText();
  }
  if(counter>=10) {    
    $('#counter').html(counter).css("color", "black");
    $('#counter').html(counter).css("left", "228.5%");
  }
  if(counter>=100) {    
    $('#counter').html(counter).css("color", "black");
    $('#counter').html(counter).css("left", "219.25%");
  }
  else {
    $('#counter').html(counter).css("color", "black");
  }
  console.log("Correct: " + correctCounter + "\n" + "Wrong: " + wrongCounter);
  $(".typingText").html(text).css("color", color).css("position", "relative").css("left", "5%");
}

function timer() {
  let time = 5;
  setInterval(() => {
    if(time>=10)
      $('.timerCountDown').html("0:" + time);
    if(time<10&&time>0)
      $('.timerCountDown').html("0:0"+time);
    if(time==0) {
      $('.timerCountDown').html("0:00");
      $("#counter").html("0").css("left", "237.5%");
      finishCountDown();
    }
    time--;
  },1000);
}

function finishCountDown() {
  $("#textInput").css("disabled", "disabled");
  $("#showingText").html(null);
  $(".typingText").html(null);
  calculateWPM();
}

function calculateWPM() {
  let wpm = Math.floor((((keyPress/5) - wrongCounter)/1), 0);
  console.log(wpm);
  showResult(wpm);
}

function showChart(labels) {  
  var ctx = document.getElementById('typingChart').getContext('2d');
  labels.length--;
  labels.push("July");
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: labels,
        datasets: [{
            label: 'Your Typing Speed Diagram: ',
            backgroundColor: '#FFC814',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },

    //  Configuration options go here
      options: {}
    }
  );
}

function showResult(wpm) {
  $(".arrow").css("display", "unset");
  $(".wpmContainer").css("position", "absolute").css("left", "48.75%").css("top", "115%");
  let labels =  ['January', 'February', 'March', 'April', 'May', 'June'];
  showChart(labels);
  $(".wpmRectangle").css("visibility", "visible");
  $(".wpm").html("WPM: "+wpm+"\nCorrect typed words: "+correctCounter+"\nWrong typed words: "+wrongCounter+"\nKeypresses: "+keyPress);
}

export default function Home() {
  return(
    <html>
      <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
        <title>TypingSpeed.io</title>
      </head>
      <body onLoad={() => nextText()}>
        <header>
          <h2 className="headerName">
            TypingSpeed.io
          </h2>
        </header>
        <div className="posterContainer">
          <div className="keyboard">
            <Image
              src="/mainImg.jpg"
              width={1920}
              height={248}
              objectFit="cover"
            /> 
            <h1 className="typeFaster">Type Faster!</h1>
          </div>
          <div className="mainContainer">
            <div className="rectangles">
              <div className="rectangle"></div>
              <div className="smallRectangle">
                <h3 id="showingText"></h3>
                <div className="showingTypingText">
                  <th className="typingTextContainer">
                    <h3 className="textYouTyped">You typed: </h3>
                    <h3 className="typingText"></h3>
                  </th>
                </div>                
              </div>
            </div>
            <div className="timer">
              <div className="circle"></div>
              <div className="timerCountDown">1:00</div>
              <h1 className="timerLabel">timer</h1>
            </div>
            <div className="wordsCounter">
              <div className="wordsCounterCircle"></div>
              <div id="countDown" className="countDown"></div>
              <h3 id="counter">0</h3>
              <h1 className="counterLabel">words counter</h1>
            </div>
            <div className="inputContainer">
              <input type="text" id="textInput" onClick={()=>checkSpacePress()} className="textInput"></input>
            </div>
            <div className="wpmContainer">
              <div className="wpmRectangle">
                <div className="diagram">
                  <canvas id="typingChart"></canvas>
                </div>
                <h4 className="wpm"></h4>
              </div>
            </div>
            <div className="arrowContainer">
              <div className="arrow bounce"></div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
