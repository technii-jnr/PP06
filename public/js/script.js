//Global variables
let words = [];
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Class for bouncing word objects
class BouncingWord {
    constructor(word, x, y, dx, dy, bgColor, textColor) {
        this.word = word;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.bgColor = bgColor;
        this.textColor = textColor;
        this.width = ctx.measureText(word).width + 20;
        this.height = 30;
    }

    draw() {
        ctx.fillStyle = this.bgColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.textColor;
        ctx.font = "20px Arial";
        ctx.fillText(this.word, this.x + 10, this.y + 22);
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x <= 0 || this.x + this.width >= canvas.width) {
            this.dx = -this.dx;
        }
        if (this.y <= 0 || this.y + this.height >= canvas.height) {
            this.dy = -this.dy;
        }

        this.draw();
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getContrastingColor(color) {
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#000000' : '#FFFFFF';
}

function launchWord() {
    fetch('/word')
        .then(response => response.text())
        .then(word => {
            const x = Math.random() * (canvas.width - 100);
            const y = Math.random() * (canvas.height - 30);
            const dx = (Math.random() - 0.5) * 10;
            const dy = (Math.random() - 0.5) * 10;
            const bgColor = getRandomColor();
            const textColor = getContrastingColor(bgColor);

            const bouncingWord = new BouncingWord(word, x, y, dx, dy, bgColor, textColor);
            words.push(bouncingWord);
        });
}

function drawLaunchButton() {
    ctx.fillStyle = '#008CBA';
    ctx.fillRect(canvas.width / 2 - 50, canvas.height / 2 - 25, 100, 50);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = "20px Arial";
    ctx.fillText("Launch", canvas.width / 2 - 30, canvas.height / 2 + 10);
}

canvas.addEventListener('click', function (event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (x >= canvas.width / 2 - 50 && x <= canvas.width / 2 + 50 && y >= canvas.height / 2 - 25 && y <= canvas.height / 2 + 25) {
        launchWord();
    }
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    words.forEach(word => word.update());
    drawLaunchButton();
    requestAnimationFrame(animate);
}

animate();
