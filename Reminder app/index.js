const display = document.getElementById('clock');
const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
audio.loop = true;
let alarmTime = null;
let alarmTimeout = null;

function updateTime() {
    const date = new Date();

    const hour = formatTime(date.getHours());
    const minutes = formatTime(date.getMinutes());
    const seconds = formatTime(date.getSeconds());

    display.innerText=`${hour} : ${minutes} : ${seconds}`;
}

function formatTime(time) {
    if ( time < 10 ) {
        return '0' + time;
    }
    return time;
}

function setAlarmTime(value) {
    const currentDate = new Date();  // Get the current date
    const timeValues = value.split(":");  // Split the time string into hours and minutes
    currentDate.setHours(parseInt(timeValues[0], 10));  // Set the hours
    currentDate.setMinutes(parseInt(timeValues[1], 10));  // Set the minutes

    // For type="time", set seconds to 0
    currentDate.setSeconds(0);

    alarmTime = currentDate;
    console.log(alarmTime);
}

function setAlarm() {
    if (alarmTime) {
        const current = new Date();
        const timeToAlarm = alarmTime;

        if (timeToAlarm > current) {
            const timeout = timeToAlarm.getTime() - current.getTime();
            alarmTimeout = setTimeout(() => {
                audio.play();
                alert('GA NAAR HUIS');
            }, timeout);

            alert('Alarm gezet.');
        }
    }
}

function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alarm uit.');
    }
}

setInterval(updateTime, 1000);
