// Make OS windows draggable
document.addEventListener("DOMContentLoaded", () => {
    const windows = document.querySelectorAll('.os-window');
    let zIndexCounter = 10;

    windows.forEach(win => {
        const titleBar = win.querySelector('.os-bar');
        if (!titleBar) return;

        // Set initial styles for dragging
        win.style.position = 'relative';
        
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;

        titleBar.style.cursor = 'grab';

        titleBar.addEventListener('mousedown', (e) => {
            isDragging = true;
            win.style.zIndex = zIndexCounter++;
            titleBar.style.cursor = 'grabbing';
            win.style.transition = 'none';

            startX = e.clientX;
            startY = e.clientY;

            const style = window.getComputedStyle(win);
            initialLeft = parseInt(style.left, 10) || 0;
            initialTop = parseInt(style.top, 10) || 0;

            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            win.style.left = `${initialLeft + dx}px`;
            win.style.top = `${initialTop + dy}px`;
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                titleBar.style.cursor = 'grab';
                win.style.transition = 'transform 0.2s, border-color 0.2s';
            }
        });
    });

    // Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const projectImages = document.querySelectorAll('.project-img');

    if (lightbox && lightboxImg && closeBtn) {
        projectImages.forEach(img => {
            img.addEventListener('click', function() {
                lightbox.style.display = 'flex';
                lightboxImg.src = this.src;
            });
        });

        // Close on click of close button
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        // Close on click outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }
});
