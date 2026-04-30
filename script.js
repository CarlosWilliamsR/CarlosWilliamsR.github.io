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
            if (e.target.closest('.os-controls') || win.classList.contains('maximized')) return;

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

        // -----------------------------------------
        // Linux-like window controls (Min/Max/Close)
        // -----------------------------------------
        const controlsContainer = win.querySelector('.os-controls');
        if (controlsContainer) {
            controlsContainer.innerHTML = `
                <span class="ctrl-min" style="cursor:pointer" title="Minimizar">_</span>
                <span class="ctrl-max" style="cursor:pointer" title="Maximizar">◻</span>
                <span class="ctrl-close" style="cursor:pointer" title="Cerrar">✕</span>
            `;

            const content = win.querySelector('.os-content');
            
            // Minimize
            controlsContainer.querySelector('.ctrl-min').addEventListener('click', (e) => {
                e.stopPropagation();
                if (content.style.display === 'none') {
                    content.style.display = 'block';
                    win.style.height = 'auto';
                } else {
                    content.style.display = 'none';
                    win.style.height = 'auto';
                }
            });

            // Maximize
            controlsContainer.querySelector('.ctrl-max').addEventListener('click', (e) => {
                e.stopPropagation();
                if (win.classList.contains('maximized')) {
                    win.classList.remove('maximized');
                    win.style.position = 'relative';
                    win.style.left = '0';
                    win.style.top = '0';
                    win.style.width = 'auto';
                    win.style.height = 'auto';
                } else {
                    win.classList.add('maximized');
                    win.style.position = 'fixed';
                    win.style.left = '5vw';
                    win.style.top = '5vh';
                    win.style.width = '90vw';
                    win.style.height = '90vh';
                    win.style.zIndex = zIndexCounter++;
                }
            });

            // Close
            controlsContainer.querySelector('.ctrl-close').addEventListener('click', (e) => {
                e.stopPropagation();
                win.style.display = 'none';
            });
        }
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
