// for character eye movements
// for character eye movements
document.addEventListener('mousemove', (e) => {
    const eyes = document.querySelectorAll('.pupil');
    /*
    eyes.forEach(eye => {
        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;
        
        const angleRad = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
        const angleDeg = angleRad * 180 / Math.PI;
        
        const distance = Math.min(5, Math.sqrt(Math.pow(e.clientX - eyeCenterX, 2) + Math.pow(e.clientY - eyeCenterY, 2)) / 10);
        
        const pupilX = Math.cos(angleRad) * distance;
        const pupilY = Math.sin(angleRad) * distance;
        
        eye.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
        */
    const eye1 = eyes[0].getBoundingClientRect()
    const eye1CenterX = eye1.left + eye1.width / 2;
    const eye1CenterY = eye1.top + eye1.height / 2;
    const eye2 = eyes[1].getBoundingClientRect()
    const eye2CenterX = eye2.left + eye2.width / 2;
    const eye2CenterY = eye2.top + eye2.height / 2;

    const eyeCenterX = (eye1CenterX + eye2CenterX)/2;
    const eyeCenterY = (eye1CenterY + eye2CenterY)/2;

    const angleRad = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
    const angleDeg = angleRad * 180 / Math.PI;
    
    const distance = Math.min(5, Math.sqrt(Math.pow(e.clientX - eyeCenterX, 2) + Math.pow(e.clientY - eyeCenterY, 2)) / 10);
    
    const pupilX = Math.cos(angleRad) * distance;
    const pupilY = Math.sin(angleRad) * distance;


    eyes[0].style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    eyes[1].style.transform = `translate(${pupilX*0.85}px, ${pupilY*0.85}px)`;
});

window.addEventListener('load', () => {
    const eyes = document.querySelectorAll('.pupil');
    eyes.forEach(eye => {
        eye.style.transform = `translate(0px, 0px)`;
    });
}
);

// Function to change pupil color based on Slider 1
// Function to change pupil color based on Slider 1
function changePupilColor() {
    const slider = document.getElementById('slider1');
    const pupils = document.querySelectorAll('.pupil');

    const sliderPercentage = slider.value / 100;
    
    // Convert slider value (0-100) to hue (0-360)
    const hue = Math.floor(slider.value * 3.6);
    
    const saturation = Math.floor(sliderPercentage * 100);

    // Adjust lightness based on slider value to start from black
    const lightness = slider.value * 0.5; // This will start from 0% (black) to 50% (full color)
    
    // Set the new color for all pupils
    pupils.forEach(pupil => {
        pupil.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    });
}

// Add event listener to Slider 1
document.getElementById('slider1').addEventListener('input', changePupilColor);

// Initial call to set color when page loads
changePupilColor();

// Function to change frame background color based on Slider 2
function changeFrameBackground() {
    const slider = document.getElementById('slider2');
    const frame = document.querySelector('.frame');
    
    // Convert slider value (0-100) to a percentage
    const sliderPercentage = slider.value / 100;
    
    // Start with no hue (gray) and gradually introduce hue
    const hue = Math.floor(sliderPercentage * 360);
    
    // Start with 0% saturation (gray) and gradually increase to 100%
    const saturation = Math.floor(sliderPercentage * 100);
    
    // Start from dark gray (20% lightness) to a midtone (50% lightness)
    const lightness = 20 + (sliderPercentage * 30);
    
    // Set the new background color for the frame
    frame.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// Add event listener to Slider 2
document.getElementById('slider2').addEventListener('input', changeFrameBackground);

// Initial call to set background color when page loads
changeFrameBackground();

// Add this new function for the bouncing effect
function addBounceEffect(element) {
    element.classList.add('bounce');
    setTimeout(() => {
        element.classList.remove('bounce');
    }, 500); // Remove the class after the animation duration
}

// Modify the existing code for the frame
const frame = document.querySelector('.frame');
frame.addEventListener('click', (e) => {
    // Bounce the frame image
    const frameImg = document.querySelector('.frameimg');
    const frameImgShadow = document.querySelector('.frameimg-shadow');
    addBounceEffect(frameImg);
    addBounceEffect(frameImgShadow);

    /* Bounce the pupils
    const pupils = document.querySelectorAll('.pupil');
    pupils.forEach(pupil => addBounceEffect(pupil));
    */

    // Bounce the circles
    const circles = document.querySelectorAll('.circle1, .circle2');
    circles.forEach(circle => addBounceEffect(circle));
});
