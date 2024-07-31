function toggleMenu() {
    var navLinks = document.querySelector('.nav-links');
    var closeBtn = document.querySelector('.close-btn');
    var menuHeader = document.querySelector('.menu-header');
    navLinks.classList.toggle('show');
    closeBtn.classList.toggle('show');
    menuHeader.classList.toggle('show');
}

function closeMenu() {
    var navLinks = document.querySelector('.nav-links');
    var closeBtn = document.querySelector('.close-btn');
    var menuHeader = document.querySelector('.menu-header');
    navLinks.classList.remove('show');
    closeBtn.classList.remove('show');
    menuHeader.classList.remove('show');
    var dropdownContent = document.getElementById('dropdown-content');
    var dropdown = document.getElementById('dropdown');
    var dropdownToggle = document.querySelector('.dropdown-toggle');
    
    dropdownContent.classList.remove('show');
    dropdown.classList.remove('show');
    dropdownToggle.classList.remove('active');
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
        var dropdown = document.getElementById('dropdown');
        var dropdownToggle = document.querySelector('.dropdown-toggle');
        
        dropdownContent.classList.toggle('show');
        dropdown.classList.toggle('show');
        dropdownToggle.classList.toggle('active');
    }
}

