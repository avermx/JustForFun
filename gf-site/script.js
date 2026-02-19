const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionContainer = document.getElementById('question');
const resultContainer = document.getElementById('result');
const pleadingText = document.getElementById('pleading-text');
const mainTitle = document.getElementById('main-title');
const mainGif = document.querySelector('.main-gif');

// Cute pleading messages
const sadMessages = [
    "No? Really? 😢",
    "Please reconsider! 🥺",
    "Don't break my heart! 💔",
    "I'll be very sad...",
    "Think about the bears! 🐻",
    "You can't catch me! 🏃‍♂️",
    "Pretty please? 🍒",
    "Are you sure? 😭",
    "Just click Yes! 💖"
];

// Function to move the "No" button
const moveNoBtn = () => {
    // 0. IMPORTANT: Move button to body if not already there
    // This allows it to break free from the container's coordinate system
    // (which is affected by transforms/animations)
    if (noBtn.parentNode !== document.body) {
        document.body.appendChild(noBtn);
    }
    
    // 1. Get viewport dimensions
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // 2. Get button dimensions
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // 3. Calculate random positions
    // We utilize a larger buffer and safe zone to ensure it never touches edges
    const buffer = 50; 
    
    // Use 90% of window dimensions to be super safe on mobile
    const safeWindowWidth = windowWidth * 0.9;
    const safeWindowHeight = windowHeight * 0.9;
    
    // Calculate max allowed positions
    const max_width = safeWindowWidth - btnWidth;
    const max_height = safeWindowHeight - btnHeight;
    
    // Ensure we don't return negative values
    // Random position between buffer (left/top) and max_width/height
    const randomX = Math.random() * (max_width - buffer) + buffer;
    const randomY = Math.random() * (max_height - buffer) + buffer;

    // Apply new position
    const newX = Math.max(buffer, Math.min(randomX, max_width));
    const newY = Math.max(buffer, Math.min(randomY, max_height));

    
    // 4. Set position to 'fixed' to allow movement anywhere on screen
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
    
    // 5. Change text to be cute/pleading
    const randomMsg = sadMessages[Math.floor(Math.random() * sadMessages.length)];
    pleadingText.textContent = randomMsg;
    pleadingText.style.color = '#e84118';
    pleadingText.style.fontWeight = '800'; // Make it bolder
};

// Event Listeners for "No" button
// Desktop: Mouseover makes it run
noBtn.addEventListener('mouseover', moveNoBtn);
// Mobile: Touchstart makes it run (so they can't tap it)
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent click
    moveNoBtn();
});
// Fallback Click (If they somehow click it)
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoBtn();
});

// YES Button Logic
yesBtn.addEventListener('click', () => {
    // Hide Question
    questionContainer.style.display = 'none';
    
    // Show Result
    resultContainer.classList.remove('hidden');
    
    // Confetti
    triggerConfetti();
    
    // Floating Hearts Burst
    createHearts(true); 
});

// Confetti Function
function triggerConfetti() {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

// Background Hearts Logic
function createHearts(burst = false) {
    const heartContainer = document.getElementById('heart-container');
    const symbols = ["❤️", "💖", "🌸", "🐻", "🧸"]; // Added some bear emojis too
    
    // If burst is true, create many hearts instantly
    let count = burst ? 50 : 1; 
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart-float');
            heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.animationDuration = Math.random() * 3 + 3 + "s"; // 3-6s
            heart.style.fontSize = Math.random() * 20 + 20 + "px";
            
            // Random horizontal drift
            // We can't easily do random keyframes in JS without substantial CSS string injection
            // So we rely on simple upward float for now
            
            heartContainer.appendChild(heart);
            
            // Cleanup
            setTimeout(() => {
                heart.remove();
            }, 6000);
        }, burst ? i * 50 : 0); // Stagger burst
    }
}

// Start background heart loop
setInterval(() => createHearts(), 400); 
