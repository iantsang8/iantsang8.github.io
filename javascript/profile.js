const typingPhrases = ["ECE Student", "Electrical Engineer", "Computer Engineer"];
let currentPhraseIndex = 0;

function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
        document.getElementById("typing-text").innerHTML = text.substring(0, i+1) + '<span aria-hidden="true"></span>';
        setTimeout(function() {
            typeWriter(text, i + 1, fnCallback)
        }, 75);
    } else if (typeof fnCallback == 'function') {
        setTimeout(fnCallback, 700);
    }
}

function startTyping() {
    let currentPhrase = typingPhrases[currentPhraseIndex];
    typeWriter(currentPhrase, 0, function() {
        setTimeout(eraseText, 700);
    });
}

function eraseText() {
    let currentText = document.getElementById("typing-text").textContent;
    if (currentText.length > 0) {
        document.getElementById("typing-text").innerHTML = currentText.substring(0, currentText.length - 1) + '<span aria-hidden="true"></span>';
        setTimeout(eraseText, 50);
    } else {
        currentPhraseIndex = (currentPhraseIndex + 1) % typingPhrases.length;
        setTimeout(startTyping, 200);
    }
}

// typing animation
window.addEventListener('load', startTyping);

window.addEventListener('resize', checkWidth);

checkWidth();

window.addEventListener('scroll', function() {
    var navbar = document.querySelector('.navbar--sticky');
    if (window.scrollY >= 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// for image tilt
const image = document.querySelector("#profile img");
let imageRect = image.getBoundingClientRect();

image.addEventListener("mouseenter", () => {
    imageRect = image.getBoundingClientRect();
});

image.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX - imageRect.left;
    const mouseY = e.clientY - imageRect.top;
    
    const centerX = imageRect.width / 2;
    const centerY = imageRect.height / 2;
    
    const percentX = (mouseX - centerX) / centerX;
    const percentY = -((mouseY - centerY) / centerY);
    
    const tiltX = percentY * 20; // Tilt on X-axis (vertical movement)
    const tiltY = percentX * 20; // Tilt on Y-axis (horizontal movement)
    
    image.style.transform = `
        translate(-50%, -50%)
        perspective(1000px)
        rotateX(${tiltX}deg)
        rotateY(${tiltY}deg)
        scale3d(1.05, 1.05, 1.05)
    `;
});

image.addEventListener("mouseleave", () => {
    image.style.transform = "translate(-50%, -50%) perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
});
