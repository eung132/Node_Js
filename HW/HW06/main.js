// Canvas Element 불러오기
var canvas = document.getElementById('GameScreenCanvas');
var ctx = canvas.getContext('2d');

var colors = ["red", "pink", "aliceblue"];

class HeartObject {
    constructor(col, radius, positionX, positionY, speedX, speedY, colorIndex, rotationSpeed) {
        this.color = colors[colorIndex];
        this.radius = radius;
        this.positionX = positionX;
        this.positionY = positionY;
        this.speedX = speedX;
        this.speedY = speedY;
        this.colorIndex = colorIndex;
        this.rotationSpeed = rotationSpeed;
    }

    draw() {
        ctx.save();
        ctx.translate(this.positionX, this.positionY); // 중심으로 이동
        ctx.rotate(this.rotationSpeed); // 회전 속도에 따라 회전
        ctx.beginPath();
        for (var angle = 0; angle < Math.PI * 2; angle += 0.01) {
            var x = this.radius * (16 * Math.pow(Math.sin(angle), 3));
            var y = -this.radius * (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));
            ctx.lineTo(x, y);
        }
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    update() {
        // 하트의 위치 업데이트
        this.positionX += this.speedX;
        this.positionY += this.speedY;
    }
}

var hearts = [];
var maxHearts = 100;

function drawHeart(event) {
    var mouseX = event.clientX - canvas.getBoundingClientRect().left;
    var mouseY = event.clientY - canvas.getBoundingClientRect().top;

    // 새로운 하트 생성
    if (hearts.length < maxHearts) { // 최대 하트 개수를 넘지 않도록 제한
        var speedX = Math.random() * 4 - 2; // 랜덤한 가로 이동 속도 선택
        var speedY = Math.random() * 4 - 2; // 랜덤한 세로 이동 속도 선택
        var colorIndex = Math.floor(Math.random() * colors.length);
        var radius = Math.random() * 1 + 0.5; // 반지름을 더 작은 범위로 설정
        var rotationSpeed = Math.random() * 3 - 2; // 랜덤한 회전 속도 선택
        var heart = new HeartObject("blue", radius, mouseX, mouseY, speedX, speedY, colorIndex, rotationSpeed);
        hearts.push(heart); // 배열에 추가
    }
}

canvas.addEventListener('mousemove', drawHeart);

// 애니메이션 함수
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 하트 배열 반복하면서 그리고 업데이트
    hearts.forEach(function (heart, index) {
        heart.draw();
        heart.update();

        // 화면 밖으로 나간 하트 제거
        if (heart.positionX < -heart.radius || heart.positionX > canvas.width + heart.radius || heart.positionY < -heart.radius || heart.positionY > canvas.height + heart.radius) {
            hearts.splice(index, 1);
        }
    });

    requestAnimationFrame(animate); // 다음 프레임 요청
}

animate(); // 애니메이션 시작
