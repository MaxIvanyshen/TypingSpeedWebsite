import { render } from "react-dom";
import Image from 'next/image';
import React from 'react';

const words = require("../public/text/words.json");

var counter = 0, wrongCounter = 0, correctCounter = 0;
let fullText="";
let textToType="";
let showed=0;

let arr = words.text.split(" ");
let randomArr=[];

function randomIndex(min, max) {
  return min+Math.floor((max-min)*Math.random());
}

function nextText() {
  if(showed==0) {

    for(var i=0; i<arr.length; ++i) {
      let r = randomIndex(1, arr.length)
      textToType=textToType+arr[r]+" ";
      randomArr[i]=r;
    }

    $("#showingText").html(textToType);
    showed++;
  }
}

function checkSpacePress() {
  nextText();
  $('#textInput').keydown((e)=>{
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
  let wordNumber=0;
  let color = "red";
  // for(let i=0; i<arr.length; ++i) {
  //   if(text == arr[i]) {
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
  }
  if(counter==1) {
    timer();
  }
  fullText=fullText+" "+text;
  if(fullText.length == "") {
    $("#showingText").nextText();
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
}

function timer() {
  let time = 59;
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
  $("#textInput").css("pointer-events", "none");
  calculateWPM();
}

function calculateWPM() {
  let wpm = Math.floor((((counter/5) - wrongCounter)/1), 0);
  console.log(wpm);
  showResult(wpm);
}

function showResult(wpm) {
  $(".arrow").css("display", "unset");
}

export default function Home(jsonFile) {
  return(
    <html>
      <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <title>TypingSpeed.io</title>
      </head>
      <body>
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
                {/* <h3 className="typingTextLabel">You typed: </h3> */}
                <h3 className="typingText"></h3>
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
            <div className="arrowContainer">
              <div className="arrow bounce"></div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
