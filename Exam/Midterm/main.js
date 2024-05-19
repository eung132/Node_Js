var canvas = document.getElementById('GameScreenCanvas');
var ctx = canvas.getContext('2d');

function gamescreen()
{
    // 별과 하트를 그리는 함수 호출
    drawStar(ctx, starX, starY, 20, 5, 0.5);
    // 하트의 위치가 아직 설정되지 않았다면 랜덤 위치에서 생성
    if (heartX === undefined || heartY === undefined) {
        heartX = getRandomX();
        heartY = getRandomY();
    }
    
    drawHeart(ctx, heartX, heartY);

    drawCircles(ctx);
}

var starX = canvas.width / 2; // 별의 x 좌표
var starY = canvas.height / 2; // 별의 y 좌표

function drawStar(ctx, x, y, radius, numPoints, innerRadiusRatio)
{
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

var heartX, heartY; // 하트의 위치 변수를 전역으로 선언

function drawHeart(ctx, x, y)
{
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

function drawCircles(ctx) {
    const padding = 20; // 바깥 여백
    const targetX = ctx.canvas.width / 2; // 중앙 X 좌표
    const targetY = ctx.canvas.height / 2; // 중앙 Y 좌표
    const speed = 1; // 이동 속도
    const circles = []; // 원들을 저장할 배열
    let framesSinceLastCircle = 0; // 마지막 원을 생성한 이후의 프레임 수
    const minCirclesPerSecond = 5; // 최소 초당 원 생성 횟수
    const maxCirclesPerSecond = 15; // 최대 초당 원 생성 횟수

    // 원을 매 프레임마다 생성하는 함수
    function createCircle() {
        let x, y;

        // 랜덤하게 캔버스 바깥의 위치를 선택
        if (Math.random() < 0.5) {
            // 상하좌우 중에서 랜덤하게 선택
            x = Math.random() < 0.5 ? -padding : ctx.canvas.width + padding;
            y = Math.random() * (ctx.canvas.height + 2 * padding) - padding; // 상단과 하단에도 생성
        } else {
            // 상하좌우 중에서 랜덤하게 선택
            x = Math.random() * (ctx.canvas.width + 2 * padding) - padding; // 좌우에만 생성
            y = Math.random() < 0.5 ? -padding : ctx.canvas.height + padding;
        }

        const radius = 10; // 작은 원의 반지름
        circles.push({ x, y, radius }); // 원을 배열에 추가
    }

// 매 프레임마다 호출되는 함수
function moveCircles()
{
    for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];

        // 중앙으로 이동
        const dx = targetX - circle.x;
        const dy = targetY - circle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > speed) {
            // 이동할 거리가 speed보다 클 경우, speed 만큼 이동
            circle.x += dx / distance * speed;
            circle.y += dy / distance * speed;
        } else {
            // 이동할 거리가 speed보다 작을 경우, 중앙으로 이동
            circle.x = targetX;
            circle.y = targetY;
        }
    }
}

function checkCollision(circle, star)
{
    const dx = circle.x - star.x;
    const dy = circle.y - star.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = circle.radius + 20; // 별의 반지름은 20으로 가정

    return distance < minDistance;
}

function resetGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 지우기
    collisionCount = 0; // 충돌 횟수 초기화
    heartX = undefined; // 하트의 x 좌표 초기화
    heartY = undefined; // 하트의 y 좌표 초기화
    isHover = false;
    isClicked = false;
    isBtnVisible = true; // 버튼 숨기기
}


var collisionCount = 0; // 충돌 횟수를 기록하는 변수

function draw() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // 별과 하트 그리기
    drawStar(ctx, canvas.width / 2, canvas.height / 2, 20, 5, 0.5);
    drawHeart(ctx, heartX, heartY);

    // 초당 원 생성 횟수를 랜덤하게 선택
    const circlesPerSecond = getRandomInt(minCirclesPerSecond, maxCirclesPerSecond);

    // 초당 원 생성 횟수에 맞게 원 생성
    framesSinceLastCircle++;
    if (framesSinceLastCircle >= 60 / circlesPerSecond) {
        const numCircles = getRandomInt(1, 3); // 한 번에 생성될 원의 개수를 1에서 3 사이에서 랜덤하게 선택
        for (let i = 0; i < numCircles; i++) {
            createCircle();
        }
        framesSinceLastCircle = 0;
    }

    // 모든 원을 그림
    for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.closePath();

        // 별과 원이 닿았는지 확인
        if (checkCollision(circle, { x: canvas.width / 2, y: canvas.height / 2 })) {
            // 닿으면 해당 원을 배열에서 제거
            circles.splice(i, 1);
            i--; // 배열의 크기가 줄었으므로 인덱스를 하나 줄여줍니다.
            collisionCount++; // 충돌 횟수 증가

            // 충돌 횟수가 3회인 경우 게임 초기화
            if (collisionCount === 3) {
                resetGame(); // 게임 초기화
                drawBtn(); // 버튼 다시 그리기
                return; // draw 함수 종료
            }
        }
    }

    moveCircles(); // 원 이동
    requestAnimationFrame(draw); // 다음 프레임 요청
}
draw();
}



function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomX()
{
    return Math.random() * canvas.width;
}

function getRandomY()
{
    return Math.random() * canvas.height;
}

// 버튼 상태를 추적하는 변수
var isHover = false;
var isClicked = false;
var isBtnVisible = true;

function drawBtn()
{
    if (isBtnVisible)
    {
        ctx.beginPath();
        ctx.rect(180, 600, (canvas.width - 250) / 2, canvas.height - 750);
        // 마우스가 버튼 위에 있을 때와 클릭되었을 때의 색상 설정
        ctx.fillStyle = isClicked ? 'rgb(0, 32, 96)' : (isHover ? 'rgb(248, 203, 178)' : 'gray');
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.fill();
        ctx.closePath();
        ctx.stroke();

        // 텍스트 추가
        ctx.font = '20px Arial'; // 글꼴 및 크기 설정
        ctx.fillStyle = 'white'; // 텍스트 색상 설정
        ctx.textAlign = 'center'; // 가운데 정렬
        ctx.textBaseline = 'middle'; // 중앙 정렬
        ctx.fillText('시작', canvas.width / 2, 627); // 텍스트 그리기
    }
}

// 마우스 이벤트 리스너 추가
canvas.addEventListener('mousemove', function (e) {
    // 마우스 이벤트가 버튼 영역 안에 있는지 확인
    if (e.offsetX >= 180 && e.offsetX <= 180 + (canvas.width - 250) / 2 &&
        e.offsetY >= 600 && e.offsetY <= canvas.height - 150) {
        isHover = true;
    } else {
        isHover = false;
    }
    // 버튼 다시 그리기
    drawBtn();
});

canvas.addEventListener('click', function (e) {
    // 마우스 클릭 이벤트가 버튼 영역 안에 있는지 확인
    if (e.offsetX >= 180 && e.offsetX <= 180 + (canvas.width - 250) / 2 &&
        e.offsetY >= 600 && e.offsetY <= canvas.height - 150) {
        isClicked = true; // 클릭 상태 변경

        drawBtn();

        // 1초 뒤에 gamescreen 함수 호출
        setTimeout(function ()
        {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            isBtnVisible = false; // 버튼 숨기기
            gamescreen(); // gamescreen 함수 호출
        }, 1000);
    }
});

drawBtn();