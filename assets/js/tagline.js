/**
 * Tagline JS for Hero Section
 * Implements mode "paired" for rotational tagline with anti-CLS measures
 */
document.addEventListener('DOMContentLoaded', () => {
    // Check for user reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const heroTagline = document.querySelector('.hero-tagline');
    if (!heroTagline) return;

    const spanA = document.querySelector('.tag-rot.tag-a');
    const spanB = document.querySelector('.tag-rot.tag-b');
    const spanC = document.querySelector('.tag-rot.tag-c');

    if (!spanA || !spanB || !spanC) return;

    // Load data words arrays
    let wordsA = [];
    let wordsB = [];
    let wordsC = [];

    try {
        wordsA = JSON.parse(spanA.getAttribute('data-words')) || [];
        wordsB = JSON.parse(spanB.getAttribute('data-words')) || [];
        wordsC = JSON.parse(spanC.getAttribute('data-words')) || [];
    } catch (e) {
        console.error('Error parsing tag words', e);
        return;
    }

    const computedStyles = getComputedStyle(heroTagline);
    const cssRollMs = computedStyles.getPropertyValue('--roll-ms').trim();
    const rollMs = parseInt(cssRollMs.replace('ms', '')) || 650;

    // Fallback holds (we can define a default)
    const holdMs = 4200;

    if (wordsA.length === 0 || wordsB.length === 0 || wordsC.length === 0) return;

    function buildSlot(span, words) {
        return {
            span,
            words,
            currentIndex: 0,
            items: null,
            itemHeight: 0,
            isAnimating: false
        };
    }

    const slotA = buildSlot(spanA, wordsA);
    const slotB = buildSlot(spanB, wordsB);
    const slotC = buildSlot(spanC, wordsC);

    const slots = [slotA, slotB, slotC];

    function ensureItems(slot) {
        if (slot.items) return slot.items;
        const items = document.createElement('span');
        items.className = 'tag-rot__items';
        slot.span.textContent = '';
        slot.span.appendChild(items);
        slot.items = items;
        return items;
    }

    function measureItemHeight(slot) {
        const probe = document.createElement('span');
        probe.className = 'tag-rot__item';
        probe.style.visibility = 'hidden';
        probe.style.position = 'absolute';
        probe.style.whiteSpace = 'nowrap';
        probe.textContent = 'Hg';
        slot.span.appendChild(probe);
        const rect = probe.getBoundingClientRect();
        slot.span.removeChild(probe);

        const fallbackLineHeight = (() => {
            const lh = parseFloat(getComputedStyle(slot.span).lineHeight);
            if (!Number.isNaN(lh) && lh > 0) return lh;
            const fs = parseFloat(getComputedStyle(slot.span).fontSize) || 16;
            return fs * 1.2;
        })();

        const lineHeightPx = parseFloat(getComputedStyle(heroTagline).lineHeight) || fallbackLineHeight;
        const stepHeight = Math.max(1, Math.ceil(lineHeightPx));
        slot.itemHeight = stepHeight;
        slot.span.style.setProperty('--roll-item', `${stepHeight}px`);
    }

    function renderSingle(slot) {
        const items = ensureItems(slot);
        items.style.transition = 'none';
        items.style.transform = 'translateY(0)';
        items.textContent = '';
        const item = document.createElement('span');
        item.className = 'tag-rot__item';
        item.textContent = slot.words[slot.currentIndex];
        items.appendChild(item);
        items.offsetHeight;
        items.style.transition = '';
    }

    function renderSequence(slot, sequence) {
        const items = ensureItems(slot);
        items.textContent = '';
        sequence.forEach(word => {
            const item = document.createElement('span');
            item.className = 'tag-rot__item';
            item.textContent = word;
            items.appendChild(item);
        });
    }

    function buildSequence(words, startIndex, steps) {
        const len = words.length;
        const sequence = [];
        for (let i = 0; i <= steps; i += 1) {
            sequence.push(words[(startIndex + i) % len]);
        }
        return sequence;
    }

    function updateAllMetrics() {
        slots.forEach(slot => {
            measureItemHeight(slot);
            renderSingle(slot);
        });
    }

    updateAllMetrics();

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(updateAllMetrics);
    } else {
        window.addEventListener('load', updateAllMetrics);
    }

    window.addEventListener('resize', updateAllMetrics);



    // Reduced motion shortcut (unless explicitly overridden)
    const ignoreReducedMotion = heroTagline.dataset.ignoreReducedMotion === 'true';
    if (prefersReducedMotion && !ignoreReducedMotion) {
        return; // Halt rotation mechanics
    }

    // R5 - Anti-CLS logic (measuring max width)
    function measureMaxWidth(wordsList, baseElement) {
        // Create an offscreen invisible measurement container to clone baseline styling
        const calcSpan = document.createElement('span');

        // Match essential styling
        calcSpan.style.font = getComputedStyle(baseElement).font;
        calcSpan.style.letterSpacing = getComputedStyle(baseElement).letterSpacing;
        calcSpan.style.textTransform = getComputedStyle(baseElement).textTransform;
        calcSpan.style.visibility = 'hidden';
        calcSpan.style.position = 'absolute';
        calcSpan.style.whiteSpace = 'nowrap';
        calcSpan.style.pointerEvents = 'none';

        document.body.appendChild(calcSpan);

        let maxWidth = 0;
        wordsList.forEach(word => {
            calcSpan.textContent = word;
            // Get precise floating point width for safety gap
            const width = calcSpan.getBoundingClientRect().width;
            if (width > maxWidth) {
                maxWidth = width;
            }
        });

        document.body.removeChild(calcSpan);
        // Setting a tiny fraction over the max width prevents sub-pixel wrapping issues
        return maxWidth + 1;
    }

    // Assign max widths via manual flush. Use a slight timeout to ensure web fonts render
    // ideally window.onload but standard timeout covers most scenarios
    setTimeout(() => {
        spanA.style.minWidth = measureMaxWidth(wordsA, spanA) + 'px';
        spanB.style.minWidth = measureMaxWidth(wordsB, spanB) + 'px';
        spanC.style.minWidth = measureMaxWidth(wordsC, spanC) + 'px';
    }, 100);

    function spinSlot(slot, targetIndex) {
        if (slot.isAnimating) return;
        slot.isAnimating = true;

        const len = slot.words.length;
        if (len < 2) {
            slot.isAnimating = false;
            return;
        }

        if (!slot.itemHeight) measureItemHeight(slot);

        let delta = (targetIndex - slot.currentIndex + len) % len;
        if (delta === 0) delta = len;

        const loops = 1 + Math.floor(Math.random() * 2);
        const steps = loops * len + delta;
        const sequence = buildSequence(slot.words, slot.currentIndex, steps);

        renderSequence(slot, sequence);
        slot.items.style.transition = `transform ${rollMs}ms cubic-bezier(0.2, 0.7, 0.2, 1)`;
        slot.items.style.transform = 'translateY(0)';
        slot.items.offsetHeight;
        slot.items.style.transform = `translateY(-${steps * slot.itemHeight}px)`;

        setTimeout(() => {
            slot.currentIndex = targetIndex;
            renderSingle(slot);
            slot.isAnimating = false;

            heroTagline.setAttribute(
                'aria-label',
                `The ${slotA.words[slotA.currentIndex]} ${slotB.words[slotB.currentIndex]} for ${slotC.words[slotC.currentIndex]}`
            );
        }, rollMs + 30);
    }

    function applyChange() {
        const candidates = slots.filter(slot => slot.words.length > 1);
        const picked = candidates.length ? candidates[Math.floor(Math.random() * candidates.length)] : null;

        if (!picked) return;

        let target = picked.currentIndex;
        while (target === picked.currentIndex) {
            target = Math.floor(Math.random() * picked.words.length);
        }

        spinSlot(picked, target);
    }

    // Set loop heartbeat
    let intervalId = setInterval(applyChange, holdMs);

    // Optional U2: Pause on hover
    heroTagline.addEventListener('mouseenter', () => clearInterval(intervalId));
    heroTagline.addEventListener('mouseleave', () => intervalId = setInterval(applyChange, holdMs));
});
