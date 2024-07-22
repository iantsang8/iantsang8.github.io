function toggleMenu() {
    var navLinks = document.querySelector('.nav-links');
    var closeBtn = document.querySelector('.close-btn');
    var menuHeader = document.querySelector('.menu-header');
    navLinks.classList.toggle('show');
    closeBtn.classList.toggle('show');
    menuHeader.classList.toggle('show');
    var dropdownContent = document.getElementById('dropdown-content');
    dropdownContent.classList.remove('show');
}

function closeMenu() {
    var navLinks = document.querySelector('.nav-links');
    var closeBtn = document.querySelector('.close-btn');
    var menuHeader = document.querySelector('.menu-header');
    navLinks.classList.remove('show');
    closeBtn.classList.remove('show');
    menuHeader.classList.remove('show');
    var dropdownContent = document.getElementById('dropdown-content');
    dropdownContent.classList.remove('show');
}

function checkWidth() {
    if (window.innerWidth > 768) {
        closeMenu();
    }
}

function toggleDropdown(event) {
    if (window.innerWidth <= 768) {
        event.preventDefault();
        var dropdownContent = document.getElementById('dropdown-content');
        dropdownContent.classList.toggle('show');
    }
}

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

// Start the typing effect when the window loads
window.onload = startTyping;

window.addEventListener('resize', checkWidth);

checkWidth();
