const canvasEl = document.getElementById("canvas");
const canvasCtx = canvasEl.getContext('2d');

const zeroPad = (num, places) => String(num).padStart(places, '0');

function formatTime({ minutes, seconds }) {
  return `${zeroPad(minutes, 2)}:${zeroPad(seconds, 2)}`;
}

function calculateTime({ minutes, seconds }) {
  if (minutes === 0 && seconds === 0) {
    return {
      minutes: 0,
      seconds: 0,
    };
  } else if (seconds === 0) {
    return {
      minutes: minutes + 1,
      seconds: 59
    }
  } else {
    return {
      minutes: minutes,
      seconds: seconds + 1,
    };
  }
}

function writeToCanvas(text) {
  canvasCtx.font = ' 30px Open Sans';
  //anvasCtx.font = '52px serif';
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  canvasCtx.textAlign = 'center';
  canvasCtx.textBaseline = "middle";
  canvasCtx.fillStyle = "#fff";
  canvasCtx.fillText(text, canvas.width / 2, canvas.height / 2);
}
onPipWindowResize = (e) => {
  e.srcElement.height = 50
  e.srcElement.width = 50
  console.log(e);
}
async function createVideo() {
  const video = document.createElement('video');
  video.muted = true;
  video.srcObject = canvas.captureStream();
  video.play();
  video.addEventListener('loadedmetadata', () => {

    video.requestPictureInPicture().then((pictureInPictureWindow) => {
      pictureInPictureWindow.addEventListener("resize", onPipWindowResize, false);
    })
  });
}

function timer() {
  return {
    interval: null,
    error: null,
    time: {
      minutes: 25,
      seconds: 0,
    },
    init() {
      const text = formatTime(this.time);
      return () => {
        writeToCanvas(text);
        try {
          createVideo();
        } catch (err) {
          this.err = err.message;
        }
      }
    },
    start() {
      this.interval = setInterval(() => {
        const time = calculateTime(this.time);
        this.time = time;
        if (time.minutes === 0 && time.seconds === 0) {
          this.stop();
        }
        const text = formatTime(time);
        writeToCanvas(text);
      }, 1000);
    },
    stop() {
      clearInterval(this.interval);
      this.interval = null;
      this.time = {
        minutes: 25,
        seconds: 0,
      }
      const text = formatTime(this.time);
      writeToCanvas(text);
    },
    pause() {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
timer().init()
timer().start("dfghj")
setTimeout(() => { createVideo() }, 5000)
alert("1")
console.log(window);
window.onbeforeunload = function () {
  alert("2")
  return "Є незбережені зміни. Піти зі сторінки?";
};
window.addEventListener("unload", function () {
 alert("2")
});