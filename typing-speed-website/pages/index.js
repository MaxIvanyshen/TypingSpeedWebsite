import { render } from "react-dom";
import Image from 'next/image';
import React from 'react';

var counter = 0;

function clearInputField() {
  $('#textInput').val(null);
};

function saveText() {
  let text = $('#textInput').val();
  showText(text);
  clearInputField();
}

function showText(text) {
  var arr = ["hello", "world", "my", "dear", "friend", "lovely"];
  let colorParam = "color";
  let color = "red";
  for(let i=0; i<arr.length; i++) {
    if(arr[i] == text) {
      color = "green";
      counter++;
      break;
    }
    else {
      continue;
    }
  }
  console.log(counter);
  $('#showingText').html(text).css(colorParam, color);
}

export default function Home() {
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
              </div>
            </div>
            <div className="timer">
              <div className="circle"></div>
              <div id="countDown" class="countDown"></div>
              <h1 className="timerLabel">timer</h1>
            </div>
            <div className="wordsCounter">
              <div className="wordsCounterCircle"></div>
              <div id="countDown" class="countDown"></div>
              <h1 className="counterLabel">words counter</h1>
            </div>
            <div className="inputContainer">
              <input type="text" id="textInput" className="textInput"></input>
              <button id="button" className="button" onClick={()=>saveText()}>Submit</button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}