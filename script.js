const canvas = document.getElementById('candyCanvas');
const ctx = canvas.getContext('2d');

// Canvasni ekran o'lchamlariga moslashtirish
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let candies = []; // Konfetlarni saqlash uchun massiv

// Tugma bosilganda konfetlar yaratish
function dropCandies() {
    // 100 ta konfet yaratish
    for (let i = 0; i < 100; i++) {
        const candy = createCandy();
        candies.push(candy);
    }

    // Konfetlarni pastga tushirishni boshlash
    animateCandies();
}

// Har bir konfetni yaratish
function createCandy() {
    return {
        x: Math.random() * canvas.width, // Tasodifiy joy
        y: -20, // Yuqoridan boshlash
        size: Math.random() * 5 + 5, // Kichik kattalik
        color: `hsl(${Math.random() * 360}, 100%, 70%)`, // Tasodifiy rang
        speed: Math.random() * 3 + 5, // Pastga tushish tezligi
        rotationSpeed: Math.random() * 0.1 + 0.05, // Aylanish tezligi
        rotation: 0 // Dastlabki aylanish burchagi
    };
}

// Konfetlarni animatsiya qilish
function animateCandies() {
    let animationFrame;

    function moveCandies() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Ekranni tozalash (har bir frame da)

        // Har bir konfetni harakatlantirish va aylantirish
        for (let i = 0; i < candies.length; i++) {
            const candy = candies[i];

            // Konfetni harakatlantirish
            candy.y += candy.speed;
            candy.rotation += candy.rotationSpeed; // Aylanishni yangilash

            // Konfetni chizish
            ctx.save();
            ctx.translate(candy.x, candy.y); // Konfetni tasodifiy joyga qo'yish
            ctx.rotate(candy.rotation); // Konfetti aylantirish
            ctx.beginPath();
            ctx.arc(0, 0, candy.size, 0, Math.PI * 2); // Konfetning shakli
            ctx.fillStyle = candy.color; // Tasodifiy rang
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }

        // Ekranning pastki qismiga yetib borgan konfetlarni olib tashlash
        candies = candies.filter(candy => candy.y - candy.size <= canvas.height);

        // Animatsiya davom ettiriladi
        animationFrame = requestAnimationFrame(moveCandies);
    }

    moveCandies(); // Animatsiyani boshlash
}