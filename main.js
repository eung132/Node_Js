// Canvas Element 불러오기
var canvas = document.getElementById('GameScreenCanvas');
var ctx = canvas.getContext('2d');

function drawNum(num, x, y) {
    switch (num) {
        case 0:
            ctx.beginPath();
            ctx.moveTo(x + 10, y + 10);
            ctx.lineTo(x + 40, y + 10);
            ctx.lineTo(x + 40, y + 70);
            ctx.lineTo(x + 10, y + 70);
            ctx.lineTo(x + 10, y + 10);
            ctx.closePath();
            break;
        case 1:
            ctx.beginPath();
            ctx.moveTo(x + 10, y + 10);
            ctx.lineTo(x + 10, y + 70);
            break;
        case 2:
            ctx.beginPath();
            ctx.moveTo(x + 10, y + 10);
            ctx.lineTo(x + 40, y + 10);
            ctx.lineTo(x + 40, y + 40);
            ctx.lineTo(x + 10, y + 40);
            ctx.lineTo(x + 10, y + 70);
            ctx.lineTo(x + 40, y + 70);
            break;
        case 3:
            ctx.beginPath();
            ctx.moveTo(x + 10, y + 10);
            ctx.lineTo(x + 40, y + 10);
            ctx.lineTo(x + 40, y + 70);
            ctx.lineTo(x + 10, y + 70);
            ctx.moveTo(x + 40, y + 40);
            ctx.lineTo(x + 10, y + 40);
            break;
        case 4:
            ctx.beginPath();
            ctx.moveTo(x + 10, y + 10);
            ctx.lineTo(x + 10, y + 40);
            ctx.lineTo(x + 40, y + 40);
            ctx.lineTo(x + 40, y + 10);
            ctx.lineTo(x + 40, y + 70);
            break;
        case 5:
            ctx.beginPath();
            ctx.moveTo(x + 40, y + 10);
            ctx.lineTo(x + 10, y + 10);
            ctx.lineTo(x + 10, y + 40);
            ctx.lineTo(x + 40, y + 40);
            ctx.lineTo(x + 40, y + 70);
            ctx.lineTo(x + 10, y + 70);
            break;
        case 6:
            ctx.beginPath();
            ctx.moveTo(x + 40, y + 10);
            ctx.lineTo(x + 10, y + 10);
            ctx.lineTo(x + 10, y + 70);
            ctx.lineTo(x + 40, y + 70);
            ctx.lineTo(x + 40, y + 40);
            ctx.lineTo(x + 10, y + 40);
            break;
        case 7:
            ctx.beginPath();
            ctx.moveTo(x + 10, y + 40);
            ctx.lineTo(x + 10, y + 10);
            ctx.lineTo(x + 40, y + 10);
            ctx.lineTo(x + 40, y + 70);
            break;
        case 8:
            ctx.beginPath();
            ctx.moveTo(x + 10, y + 10);
            ctx.lineTo(x + 40, y + 10);
            ctx.lineTo(x + 40, y + 70);
            ctx.lineTo(x + 10, y + 70);
            ctx.lineTo(x + 10, y + 10);
            ctx.moveTo(x + 10, y + 40);
            ctx.lineTo(x + 40, y + 40);
            break;
        case 9:
            ctx.beginPath();
            ctx.moveTo(x + 40, y + 40);
            ctx.lineTo(x + 10, y + 40);
            ctx.lineTo(x + 10, y + 10);
            ctx.lineTo(x + 40, y + 10);
            ctx.lineTo(x + 40, y + 70);
            ctx.lineTo(x + 10, y + 70);
            break;
        default:
            console.error("유효하지 않은 숫자입니다!");
            return;
    }
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function studentID() {
    clearCanvas();

    var input = prompt("숫자를 입력하세요:");
    var x = 10;
    var y = 10;
    var studentIDString = input.toString();

    for (i=0; i < studentIDString.length; i++) {
        var digit = parseInt(studentIDString.charAt(i));
        drawNum(digit, x, y);
        x += 50;
    }
}

studentID();

// (50, 300) (974,300) magenta 3
ctx.beginPath();
ctx.moveTo(50, 300);
ctx.lineTo(974, 300);
ctx.strokeStyle = 'magenta';
ctx.lineWidth = 3;
ctx.stroke();
ctx.closePath();
