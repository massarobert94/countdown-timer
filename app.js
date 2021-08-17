const hoursElement = document.querySelector('#hours');
const minutesElement = document.querySelector('#minutes');
const secondsElement = document.querySelector('#seconds');
const btnStart = document.querySelector('.btn-start');
const btnPause = document.querySelector('.btn-pause');
const btnStop = document.querySelector('.btn-stop');
const btnReset = document.querySelector('.btn-reset');
let interval;
let pause= false;
let totalSeconds = 0;
let totalSecondsBackup = 0;

init();

function init() {
    btnPause.style.display = 'none';
    btnStop.style.display = 'none';
    btnReset.style.display = 'none';

    btnStart.addEventListener('click', () => {
        const hours = parseInt(hoursElement.value);
        const minutes = parseInt(minutesElement.value);
        const seconds = parseInt(secondsElement.value);
    
        console.log(hours, minutes, seconds);
    
        totalSecondsBackup = totalSeconds = hours * 60 * 60 + minutes * 60 + seconds;
        if (totalSeconds < 0){
            return;
        }
        startTimer();

        btnPause.style.display = 'inline-block';
        btnStop.style.display = 'inline-block';
        btnReset.style.display = 'inline-block';
        btnStart.style.display = 'none';
    })
    btnPause.addEventListener('click', () => {
        pause = !pause;
        if(pause){
            btnPause.innerText = 'Resume';
        } else {
            btnPause.innerText = 'Pause';
        }
    })
    btnReset.addEventListener('click', () => {
        totalSeconds = totalSecondsBackup;
        updateInputs();
    })
    btnStop.addEventListener('click', () => {
        stopTimer();
        totalSeconds = totalSecondsBackup;
        updateInputs();
        pause = false;

        btnPause.style.display = 'none';
        btnStop.style.display = 'none';
        btnReset.style.display = 'none';
        btnStart.style.display = 'inline-block';
    })
}

function startTimer() {
    interval = setInterval(() => {

        if (pause) return;
        totalSeconds--;
        updateInputs(totalSeconds);
        
        if (totalSeconds<= 0) {
            stopTimer();
        }
    }, 1000)
}

function stopTimer() {
    clearInterval(interval);
}

function updateInputs() {
    const hours = Math.floor(totalSeconds / 60 / 60);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    hoursElement.value = hours;
    minutesElement.value = minutes;
    secondsElement.value = seconds;


}