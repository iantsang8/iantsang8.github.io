function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            entry.target.classList.remove('is-hidden');
        } else {
            entry.target.classList.remove('is-visible');
            entry.target.classList.add('is-hidden');
        }
    });
}

const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: '0px', // This will trigger the effect slightly before the element is fully visible/invisible
    threshold: 0
});

const observerAbout = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
});

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
    const animatedProfile = document.querySelectorAll('.animate-profile');
    animatedProfile.forEach(el => observer.observe(el));
    const animatedAbout = document.querySelectorAll('.animate-about');
    animatedAbout.forEach(el => observerAbout.observe(el));
});