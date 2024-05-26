var canvas = document.getElementById('GameScreenCanvas');
var ctx = canvas.getContext('2d');

// 전역 변수 설정
var starX = canvas.width / 2; // 별의 x 좌표
var starY = canvas.height / 2; // 별의 y 좌표
var rotAngle = 0;
var heartX, heartY;
var collisionCount = 0; // 충돌 횟수
var circles = [];
var isHover = false;
var isClicked = false;
var isBtnVisible = true;
var speed = 10; // 이동 속도

// 초기 하트 위치 설정
function initHeartPosition() {
    if (heartX === undefined || heartY === undefined) {
        heartX = getRandomX();
        heartY = getRandomY();
    }
}

// 별 그리기 함수
function drawStar(ctx, x, y, radius, numPoints, innerRadiusRatio) {
    ctx.beginPath();
    var angle = (Math.PI / 2 + rotAngle) * 3;
    var step = Math.PI / numPoints;

    for (var i = 0; i < numPoints * 2; i++) {
        var outerX = x + Math.cos(angle) * radius;
        var outerY = y + Math.sin(angle) * radius;
        ctx.lineTo(outerX, outerY);
        angle += step;

        var innerX = x + Math.cos(angle) * radius * innerRadiusRatio;
        var innerY = y + Math.sin(angle) * radius * innerRadiusRatio;
        ctx.lineTo(innerX, innerY);
        angle += step;
    }
    ctx.closePath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.fillStyle = 'yellow';
    ctx.fill();
}

// 하트 그리기 함수
function drawHeart(ctx, x, y) {
    var size = 1;
    ctx.beginPath();
    ctx.moveTo(x, y - size / 2);

    for (var i = 0; i <= 180; i++) {
        var radian = i * Math.PI / 180;
        var heartX = x + size * (16 * Math.pow(Math.sin(radian), 3));
        var heartY = y - size * (13 * Math.cos(radian) - 5 * Math.cos(2 * radian) - 2 * Math.cos(3 * radian) - Math.cos(4 * radian));
        ctx.lineTo(heartX, heartY);
    }

    for (var i = 180; i <= 360; i++) {
        var radian = i * Math.PI / 180;
        var heartX = x + size * (16 * Math.pow(Math.sin(radian), 3));
        var heartY = y - size * (13 * Math.cos(radian) - 5 * Math.cos(2 * radian) - 2 * Math.cos(3 * radian) - Math.cos(4 * radian));
        ctx.lineTo(heartX, heartY);
    }

    ctx.closePath();
    ctx.fillStyle = 'red';
    ctx.fill();
}

// 원 그리기 및 이동 함수
function drawCircles(ctx) {
    const padding = 20;
    const targetX = ctx.canvas.width / 2;
    const targetY = ctx.canvas.height / 2;
    const speed = 0.5;

    function createCircle() {
        let x, y;

        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? -padding : ctx.canvas.width + padding;
            y = Math.random() * (ctx.canvas.height + 2 * padding) - padding;
        } else {
            x = Math.random() * (ctx.canvas.width + 2 * padding) - padding;
            y = Math.random() < 0.5 ? -padding : ctx.canvas.height + padding;
        }

        const radius = 10;
        circles.push({ x, y, radius });
    }

    function moveCircles() {
        for (let i = 0; i < circles.length; i++) {
            const circle = circles[i];
            const dx = targetX - circle.x;
            const dy = targetY - circle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > speed) {
                circle.x += dx / distance * speed;
                circle.y += dy / distance * speed;
            } else {
                circle.x = targetX;
                circle.y = targetY;
            }
        }
    }

    function checkCollision(circle, star) {
        const dx = circle.x - star.x;
        const dy = circle.y - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = circle.radius + 20;

        return distance < minDistance;
    }

    function resetGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        collisionCount = 0;
        heartX = undefined;
        heartY = undefined;
        isHover = false;
        isClicked = false;
        isBtnVisible = true;
        circles = [];
    }

    function draw() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        rotAngle += Math.PI / 200;
        ctx.rotate(rotAngle);
        drawStar(ctx, 0, 0 / 2, 20, 5, 0.5);
        ctx.restore();
        drawHeart(ctx, heartX, heartY);

        const circlesPerSecond = getRandomInt(5, 15);
        framesSinceLastCircle++;
        if (framesSinceLastCircle >= 60 / circlesPerSecond) {
            const numCircles = getRandomInt(1, 3);
            for (let i = 0; i < numCircles; i++) {
                createCircle();
            }
            framesSinceLastCircle = 0;
        }

        for (let i = 0; i < circles.length; i++) {
            const circle = circles[i];
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'black';
            ctx.fill();
            ctx.closePath();

            if (checkCollision(circle, { x: canvas.width / 2, y: canvas.height / 2 })) {
                circles.splice(i, 1);
                i--;
                collisionCount++;

                if (collisionCount === 3) {
                    resetGame();
                    drawBtn();
                    return;
                }
            }
        }

        moveCircles();
        requestAnimationFrame(draw);
    }

    var framesSinceLastCircle = 0;
    draw();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomX() {
    return Math.random() * canvas.width;
}

function getRandomY() {
    return Math.random() * canvas.height;
}

function drawBtn() {
    if (isBtnVisible) {
        ctx.beginPath();
        ctx.rect(180, 600, (canvas.width - 250) / 2, canvas.height - 750);
        ctx.fillStyle = isClicked ? 'rgb(0, 32, 96)' : (isHover ? 'rgb(248, 203, 178)' : 'gray');
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.fill();
        ctx.closePath();
        ctx.stroke();

        ctx.font = '20px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('시작', canvas.width / 2, 627);
    }
}

canvas.addEventListener('mousemove', function (e) {
    if (e.offsetX >= 180 && e.offsetX <= 180 + (canvas.width - 250) / 2 &&
        e.offsetY >= 600 && e.offsetY <= canvas.height - 150) {
        isHover = true;
    } else {
        isHover = false;
    }
    drawBtn();
});

canvas.addEventListener('click', function (e) {
    if (e.offsetX >= 180 && e.offsetX <= 180 + (canvas.width - 250) / 2 &&
        e.offsetY >= 600 && e.offsetY <= canvas.height - 150) {
        isClicked = true;

        drawBtn();

        setTimeout(function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            isBtnVisible = false;
            gamescreen();
        }, 1000);
    }
});

// 상태 변수 설정
var moveUp = false;
var moveDown = false;
var moveLeft = false;
var moveRight = false;

// 키를 눌렀을 때 상태를 변경하는 이벤트 리스너 추가
document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp') {
        moveUp = true;
    } else if (e.key === 'ArrowDown') {
        moveDown = true;
    } else if (e.key === 'ArrowLeft') {
        moveLeft = true;
    } else if (e.key === 'ArrowRight') {
        moveRight = true;
    }
});

// 키를 뗐을 때 상태를 변경하는 이벤트 리스너 추가
document.addEventListener('keyup', function (e) {
    if (e.key === 'ArrowUp') {
        moveUp = false;
    } else if (e.key === 'ArrowDown') {
        moveDown = false;
    } else if (e.key === 'ArrowLeft') {
        moveLeft = false;
    } else if (e.key === 'ArrowRight') {
        moveRight = false;
    }
});


function moveStar()
{
    if (moveUp && moveLeft) {
        heartX += speed;
        heartY += speed;
        circles.forEach(circle => circle.x += speed);
        circles.forEach(circle => circle.y += speed);
    } else if (moveUp && moveRight) {
        heartX -= speed;
        heartY += speed;
        circles.forEach(circle => circle.x -= speed);
        circles.forEach(circle => circle.y += speed);
    } else if (moveDown && moveLeft) {
        heartX += speed;
        heartY -= speed;
        circles.forEach(circle => circle.x += speed);
        circles.forEach(circle => circle.y -= speed);
    } else if (moveDown && moveRight) {
        heartX -= speed;
        heartY -= speed;
        circles.forEach(circle => circle.x -= speed);
        circles.forEach(circle => circle.y -= speed);
    } else if (moveUp) {
        heartY += speed;
        circles.forEach(circle => circle.y += speed);
    } else if (moveDown) {
        heartY -= speed;
        circles.forEach(circle => circle.y -= speed);
    } else if (moveLeft) {
        heartX += speed;
        circles.forEach(circle => circle.x += speed);
    } else if (moveRight) {
        heartX -= speed;
        circles.forEach(circle => circle.x -= speed);
    }
};

function gamescreen()
{
    initHeartPosition();
    drawCircles(ctx);
}
document.addEventListener('keydown', function (e)
{
    moveStar();
    draw();
});

drawBtn();