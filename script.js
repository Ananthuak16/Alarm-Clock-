// Analog Clock code
let hr = document.querySelector('#hr');
let min = document.querySelector('#min');
let sc = document.querySelector('#sc');

setInterval(() => {
    let day = new Date();
    let hh = day.getHours() * 30;
    let mm = day.getMinutes() * 6;
    let ss = day.getSeconds() * 6;

    hr.style.transform = `rotateZ(${hh + (mm / 12)}deg)`;
    min.style.transform = `rotateZ(${mm}deg)`;
    sc.style.transform = `rotateZ(${ss}deg)`;
}, 1000);

// Digital Clock code
let hours = document.getElementById('hours');
let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');
let ampm = document.getElementById('ampm');

setInterval(() => {
    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let am = h >= 12 ? "PM" : "AM";

    if (h > 12) {
        h = h - 12;
    }

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    hours.innerHTML = h;
    minutes.innerHTML = m;
    seconds.innerHTML = s;
    ampm.innerHTML = am;
}, 1000);

// Alarm Clock code
let alarmListArr = [];
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("#btn-setAlarm");
let alarmCount = 0;
let alarmTime;
// let ring = new Audio("audio/Alarm-ringtone.mp3");

function updateClock() {
    // Your clock update code here
    // ...

    for (let i = 0; i < alarmListArr.length; i++) {
        if (alarmListArr[i] == `${hours.innerHTML}:${minutes.innerHTML}:${seconds.innerHTML} ${ampm.innerHTML}`) {
            console.log("Alarm ringing...");
            // ring.load();
            // ring.play();

            // Use a JavaScript alert to stop the alarm
            if (window.confirm("Alarm is ringing. Do you want to stop it?")) {
                ring.pause();
            }
        }
    }
}

function initClock() {
    updateClock();
    window.setInterval(updateClock, 1000);
}

for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

function setAlarm() {
    document.querySelector("#alarm-h3").innerText = "Alarms";
    let time = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;

    if (time.includes("setHour") || time.includes("setMinute") || time.includes("AM/PM")) {
        alert("Please, Select Valid Input");
    } else {
        alarmCount++;
        document.querySelector(".alarmList").innerHTML += `
        <div class="alarmLog" id="alarm${alarmCount}">
            <span id="span${alarmCount}">${time}</span>
            <button class="btn-delete" id="${alarmCount}" onClick="deleteAlarm(this.id)">Delete</button>
        </div>`;
        alarmTime = time;
        alarmListArr.push(alarmTime);
    }
}

setAlarmBtn.addEventListener("click", setAlarm);

function deleteAlarm(click_id) {
    var element = document.getElementById("alarm" + click_id);
    var deleteIndex = alarmListArr.indexOf(document.querySelector("#span" + click_id).innerText);
    alarmListArr.splice(deleteIndex, 1);
    element.remove();
}

function stopAlarm() {
    ring.pause();
}

// Initialize the clocks and alarms
initClock();
