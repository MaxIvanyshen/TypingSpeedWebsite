import { render } from "react-dom";
import Image from 'next/image';
import React from 'react';

var counter = 0, wrongCounter = 0, correctCounter = 0;
let fullText="";

function run() {
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
  var arr = ["hello", "dear", "friend", "world"];
  let colorParam = "color";
  let color = "red";
  for(let i=0; i<arr.length; i++) {
    if(arr[i] == text) {
      color = "green";
      correctCounter++;
      counter++;
      break;
    }
    else {
      continue;
    }
  }
  if(color == 'red') {
    counter++;
    wrongCounter++;
  }
  if(counter==1) {
    timer();
  }
  fullText=fullText+" "+text;
  if(fullText.length >= 25) {
    fullText=text;
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
  $('#showingText').html(fullText).css(colorParam, color);
}

function timer() {
  let time = 59;
  setInterval(() => {
    if(time>=10)
      $('.timerCountDown').html("0:" + time);
    if(time<10&&time>0)
      $('.timerCountDown').html("0:0"+time);
    time--;
    if(time==0) {
      $('.timerCountDown').html("0:00");
      finishCountDown();
    }
  },1000);
}

function finishCountDown() {
  counter=counter;
  wrongCounter=wrongCounter;
  correctCounter=correctCounter;
  console.log("count down finished!");
}

export default function Home() {
  return(
    <html>
      <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <title>TypingSpeed.io</title>
      </head>
      <body onClick={()=>run()}>
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
              <input type="text" id="textInput" className="textInput"></input>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}