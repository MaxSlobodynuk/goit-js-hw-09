const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');


startBtn.addEventListener('click', startColorChange);
stopBtn.addEventListener('click', stopColorChange);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}


function startColorChange() {
    startBtn.disabled = true;
    colorChangeInterval = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function stopColorChange() {
    clearInterval(colorChangeInterval);
    startBtn.disabled = false;
}