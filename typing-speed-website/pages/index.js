import { render } from "react-dom";
import Image from 'next/image'

export default function Home() {
  return(
    <html>
      <head>
        <title>TypoingSpeed.io</title>
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
          </div>
          <div className="mainContainer">
            <div className="rectangle"></div>
            <div className="smallRectangle"></div>
            <div class="timer">
              <div class="circle"></div>
              <div id="countDown" class="countDown"></div>
              <h1 class="timerLabel">timer</h1>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}