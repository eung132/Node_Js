var canvas = document.getElementById('GameScreenCanvas');
var ctx = canvas.getContext('2d');


canvas.addEventListener('mousedown', function(event) {
    var rect = canvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;

     // 클릭한 위치가 버튼의 영역 안에 있다면
     if (mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight) {
        ctx.fillStyle = 'rgb(0, 32, 96)';
        ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
        
        // 클릭 시 1초 후 별과 하트를 그리는 함수 호출
        setTimeout(function() {
            drawCanvas(); // 버튼을 다시 그리기 위해 캔버스 전체를 그립니다.
            gamescreen(); // 별과 하트를 그리는 함수 호출
        }, 1000);
    }
});

// 버튼 위치 및 크기 설정
var buttonWidth = 100;
var buttonHeight = 50;
var buttonX = (canvas.width - buttonWidth) / 2;
var buttonY = (canvas.height - buttonHeight) / 2 + 200;

// 버튼 그리기 함수
function drawButton(ctx, x, y, width, height, isHover) {
    if (isHover) {
        ctx.fillStyle = 'rgb(248, 203, 178)';
    } else {
        ctx.fillStyle = 'gainsboro';
    }
    ctx.fillRect(x, y, width, height);

    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    var textX = x + (width - ctx.measureText('시작').width) / 2;
    var textY = y + (height + 20) / 2; // 텍스트의 높이는 20px로 가정
    ctx.fillText('시작', textX, textY);
}

// 버튼의 상태 (호버 여부)를 나타내는 변수
var isButtonHover = false;

// 버튼 이벤트 처리
canvas.addEventListener('mousemove', function(event) {
    var rect = canvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;

    // 호버된 위치가 버튼의 영역 안에 있는지 확인
    isButtonHover = (mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight);
    // 캔버스를 다시 그려 호버 상태를 반영
    drawCanvas();
});

canvas.addEventListener('mousedown', function(event) {
    var rect = canvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;

    // 클릭한 위치가 버튼의 영역 안에 있다면
    if (mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight) {
        ctx.fillStyle = 'rgb(0, 32, 96)';
        ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
        
        // 클릭 시 실행할 함수 호출
        gamescreen();
    }
});

// 캔버스 그리기 함수
function drawCanvas() {
    // 캔버스를 클리어
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 버튼 그리기
    drawButton(ctx, buttonX, buttonY, buttonWidth, buttonHeight, isButtonHover);
}

// 캔버스 그리기 초기 호출
drawCanvas();

function gamescreen()
{
    // 별과 하트를 그리는 함수 호출
    drawStar(ctx, canvas.width / 2, canvas.height / 2, 20, 5, 0.5);
    drawHeart(ctx, getRandomX(), getRandomY());
}

function drawStar(ctx, x, y, radius, numPoints, innerRadiusRatio) {
    ctx.beginPath();
    var angle = (Math.PI / 2) * 3; // 별의 시작 각도
    var step = Math.PI / numPoints; // 한 꼭지점에서 다음 꼭지점까지의 각도 차이

    for (var i = 0; i < numPoints * 2; i++) {
        var outerX = x + Math.cos(angle) * radius; // 외부 꼭지점의 x 좌표
        var outerY = y + Math.sin(angle) * radius; // 외부 꼭지점의 y 좌표
        ctx.lineTo(outerX, outerY); // 현재 위치에서 외부 꼭지점까지 선 그리기
        angle += step; // 다음 꼭지점으로 각도 이동

        var innerX = x + Math.cos(angle) * radius * innerRadiusRatio; // 내부 꼭지점의 x 좌표
        var innerY = y + Math.sin(angle) * radius * innerRadiusRatio; // 내부 꼭지점의 y 좌표
        ctx.lineTo(innerX, innerY); // 외부 꼭지점에서 내부 꼭지점까지 선 그리기
        angle += step; // 다음 외부 꼭지점으로 각도 이동
    }

    ctx.closePath(); // 별을 닫기
    ctx.lineWidth = 2; // 스트로크 너비를 2로 설정
    ctx.strokeStyle = 'black'; // 스트로크 색상을 검정색으로 설정
    ctx.stroke(); // 스트로크를 그립니다.
    ctx.fillStyle = 'yellow'; // 채우기 색상을 노란색으로 설정
    ctx.fill(); // 채우기를 그립니다.
}

function drawHeart(ctx, x, y) {
    var size = 1;

    ctx.beginPath();
    ctx.moveTo(x, y - size / 2);

    // 위쪽 부분 그리기
    for (var i = 0; i <= 180; i++) {
        var radian = i * Math.PI / 180;
        var heartX = x + size * (16 * Math.pow(Math.sin(radian), 3));
        var heartY = y - size * (13 * Math.cos(radian) - 5 * Math.cos(2 * radian) - 2 * Math.cos(3 * radian) - Math.cos(4 * radian));
        ctx.lineTo(heartX, heartY);
    }

    // 아래쪽 부분 그리기
    for (var i = 180; i <= 360; i++) {
        var radian = i * Math.PI / 180;
        var heartX = x + size * (16 * Math.pow(Math.sin(radian), 3));
        var heartY = y - size * (13 * Math.cos(radian) - 5 * Math.cos(2 * radian) - 2 * Math.cos(3 * radian) - Math.cos(4 * radian));
        ctx.lineTo(heartX, heartY);
    }

    ctx.closePath();
    ctx.fillStyle = 'red'; // 채우기 색상을 빨간색으로 설정
    ctx.fill(); // 채우기를 그립니다.
}

function getRandomX() {
    return Math.random() * canvas.width;
}

function getRandomY() {
    return Math.random() * canvas.height;
}


