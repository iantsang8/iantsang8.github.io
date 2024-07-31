document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');

    function updateTimelineItem(item) {
        const rect = item.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const itemCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportHeight / 2;

        // Define the focus range (5% of viewport height)
        const focusRange = viewportHeight * 0.08;

        // Calculate the distance from the center of the focus range
        const distanceFromCenter = Math.abs(itemCenter - viewportCenter);

        // Calculate the opacity based on the distance from the center of the focus range
        let opacity = 1;
        if (distanceFromCenter > focusRange) {
            opacity = Math.max(0, 1 - (distanceFromCenter - focusRange) / (viewportHeight / 2 - focusRange));
        }

        // Calculate blur based on opacity
        const maxBlur = 1.5;
        const blur = maxBlur * (1 - opacity);

        const icon = item.querySelector('.timeline-icon');
        const leftContent = item.querySelector('.timeline-content.left');
        const rightContent = item.querySelector('.timeline-content.right');

        if (leftContent) leftContent.style.opacity = opacity;
        if (rightContent) rightContent.style.opacity = opacity;
        if (icon) icon.style.filter = `blur(${blur}px)`;
    }

    function handleScroll() {
        timelineItems.forEach(updateTimelineItem);
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Initial call

    // Handle "Read More" buttons
    const readMoreButtons = document.querySelectorAll('.read-more');
    const overlay = document.getElementById('overlay');
    const overlayContent = document.querySelector('.overlay-content');
    const overlayIcon = document.querySelector('.overlay-icon');
    const overlayText = document.querySelector('.overlay-text');
    const closeOverlay = document.getElementById('closeOverlay');

    readMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const timelineItem = button.closest('.timeline-item');
            const icon = timelineItem.querySelector('.timeline-icon img').cloneNode(true);
            const content = timelineItem.querySelector('.timeline-content.left h3').textContent;

            overlayIcon.innerHTML = '';
            overlayIcon.appendChild(icon);
            overlayText.textContent = content;

            overlay.classList.add('active');
            overlayContent.classList.add('animate');
            overlayIcon.classList.add('animate');
            overlayText.classList.add('animate');
        });
    });

    closeOverlay.addEventListener('click', () => {
        overlay.classList.remove('active');
        overlayIcon.classList.remove('animate');
        overlayText.classList.remove('animate');
    });
});