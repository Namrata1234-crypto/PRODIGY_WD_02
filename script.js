// script.js

// Stopwatch variables
let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCount = 0;
let lapList = [];

// DOM Elements
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapListElement = document.getElementById('lapList');

// Function to format time
function formatTime(ms) {
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const seconds = Math.floor((ms / 1000) % 60);
    const formatted = [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0'),
    ].join(':');
    return formatted;
}

// Function to start the stopwatch
function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1000);
        running = true;
    }
}

// Function to pause the stopwatch
function pauseStopwatch() {
    if (running) {
        clearInterval(tInterval);
        running = false;
    }
}

// Function to reset the stopwatch
function resetStopwatch() {
    clearInterval(tInterval);
    running = false;
    display.textContent = '00:00:00';
    lapList = [];
    lapListElement.innerHTML = '';
}

// Function to update the stopwatch display
function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.textContent = formatTime(difference);
}

// Function to add a lap
function addLap() {
    if (running) {
        lapCount++;
        const lapTime = formatTime(difference);
        lapList.push(`Lap ${lapCount}: ${lapTime}`);
        lapListElement.innerHTML = lapList.map(lap => `<li>${lap}</li>`).join('');
    }
}

// Event listeners for buttons
startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', addLap);
