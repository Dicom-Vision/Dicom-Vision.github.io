/**
 * Tagline JS for Hero Section
 * - Pen blocks use the CodePen swap effect
 */
document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const penBlock = document.querySelector('.hero-pen-block');
    const penIgnoreMotion = penBlock && penBlock.dataset.ignoreReducedMotion === 'true';

    const shouldAnimate = !prefersReducedMotion || penIgnoreMotion;
    const penChanges = document.querySelectorAll('.pen-change');
    if (penChanges.length && shouldAnimate) {
        runPenChanges(penChanges);
    }
});

function runPenChanges(penChanges) {
    const timeout = 2000;
    const animationTimeout = 300;
    const maxMargin = 0.9;

    function setupPenChange(change) {
        const oldText = change.querySelector('.old');
        if (!oldText) return;

        let words = [];
        try {
            words = JSON.parse(change.getAttribute('data-words')) || [];
        } catch (e) {
            words = [];
        }

        if (!words.length) {
            const fallback = oldText.textContent.trim();
            words = fallback ? [fallback] : [];
        }

        if (words.length < 2) return;

        const newText = document.createElement('span');
        newText.setAttribute('aria-hidden', 'true');
        newText.className = 'new';
        newText.innerHTML = words[1];

        change.insertBefore(newText, oldText);

        return {
            change,
            words,
            oldText,
            newText,
            currentHeadline: 0,
            isAnimating: false
        };
    }

    const slots = [];
    penChanges.forEach(change => {
        const slot = setupPenChange(change);
        if (slot) slots.push(slot);
    });

    if (!slots.length) return;

    function animateOnce(slot) {
        if (slot.isAnimating) return;
        slot.isAnimating = true;

        const { words, oldText, newText } = slot;
        const nextIndex = (slot.currentHeadline + 1) % words.length;
        const afterNextIndex = (slot.currentHeadline + 2) % words.length;

        oldText.innerHTML = words[slot.currentHeadline];
        newText.innerHTML = words[nextIndex];

        const startTime = Date.now();

        const frame = () => {
            const delta = Date.now() - startTime;
            const ratio = Math.min(delta / animationTimeout, 1);
            const targetWidth = newText.scrollWidth;
            const oldWidth = oldText.scrollWidth;
            const difference = targetWidth - oldWidth;
            const halfWidth = `${(difference * ratio) / 2}px`;

            oldText.style.marginLeft = halfWidth;
            oldText.style.marginRight = halfWidth;
            oldText.style.opacity = 1 - ratio;
            newText.style.opacity = ratio;
            newText.style.left = `${(difference * (ratio - 1)) / 2}px`;
            newText.style.bottom = `${maxMargin * (1 - ratio)}em`;
            oldText.style.top = `${maxMargin * ratio}em`;

            if (ratio < 1) {
                window.requestAnimationFrame(frame);
                return;
            }

            oldText.innerHTML = words[nextIndex];
            newText.innerHTML = words[afterNextIndex];

            oldText.style.marginLeft = '0px';
            oldText.style.marginRight = '0px';
            oldText.style.opacity = '1';
            newText.style.opacity = '0';
            oldText.style.top = '0px';
            newText.style.bottom = `${maxMargin}em`;
            newText.style.left = '0px';

            slot.currentHeadline = nextIndex;
            slot.isAnimating = false;
        };

        window.requestAnimationFrame(frame);
    }

    function pickRandomSlot() {
        if (!slots.length) return null;
        const available = slots.filter(slot => !slot.isAnimating && slot.words.length > 1);
        if (!available.length) return null;
        return available[Math.floor(Math.random() * available.length)];
    }

    setInterval(() => {
        const slot = pickRandomSlot();
        if (slot) animateOnce(slot);
    }, timeout);
}
