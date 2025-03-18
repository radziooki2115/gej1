document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section");
    const dots = document.querySelectorAll(".dot");
    const container = document.querySelector(".container");
    let isScrolling = false;

    function updateSections() {
        let middleScreen = window.innerHeight / 2;
        let closestIndex = 0;
        let minDistance = Infinity;

        sections.forEach((section, i) => {
            const rect = section.getBoundingClientRect();
            let distance = Math.abs(rect.top + rect.height / 2 - middleScreen);

            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = i;
            }
        });

        sections.forEach((section, i) => {
            section.classList.toggle("visible", i === closestIndex);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === closestIndex);
        });
    }

    function smoothScroll() {
        if (isScrolling) return;
        isScrolling = true;

        let middleScreen = window.innerHeight / 2;
        let closestIndex = 0;
        let minDistance = Infinity;

        sections.forEach((section, i) => {
            const rect = section.getBoundingClientRect();
            let distance = Math.abs(rect.top + rect.height / 2 - middleScreen);

            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = i;
            }
        });

        sections[closestIndex].scrollIntoView({ behavior: "smooth", block: "start" });

        setTimeout(() => {
            isScrolling = false;
        }, 700);
    }

    container.addEventListener("scroll", () => {
        updateSections();
        clearTimeout(container.scrollTimeout);
        container.scrollTimeout = setTimeout(smoothScroll, 200);
    });

    updateSections();
});
