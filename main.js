```javascript
document.addEventListener("DOMContentLoaded", function () {

    // =========================================
    // 1. NAVBAR AND SCROLL PROGRESS
    // =========================================

    const navbar = document.getElementById("navbar");
    const progress = document.getElementById("scrollProgress");

    function handleScroll() {
        if (navbar) {
            navbar.classList.toggle("scrolled", window.scrollY > 60);
        }

        if (progress) {
            const maxScroll =
                document.documentElement.scrollHeight -
                window.innerHeight;

            const percentage = maxScroll > 0
                ? (window.scrollY / maxScroll) * 100
                : 0;

            progress.style.width = percentage + "%";
        }
    }

    window.addEventListener("scroll", handleScroll, {
        passive: true
    });

    handleScroll();


    // =========================================
    // 2. MOBILE NAVIGATION
    // =========================================

    const menuBtn = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("active");

            menuBtn.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("active");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });
        });
    }


    // =========================================
    // 3. SCROLL REVEAL ANIMATIONS
    // =========================================

    const revealTargets = document.querySelectorAll(
        ".section-header, " +
        ".intro-box, " +
        ".story-grid, " +
        ".event-card, " +
        ".gallery-item, " +
        ".quote-box, " +
        ".venue-card, " +
        ".contact-info, " +
        ".contact-form"
    );

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    revealTargets.forEach(function (element, index) {
        element.classList.add("reveal");

        element.style.transitionDelay =
            (index % 3) * 90 + "ms";
    });

    if (
        "IntersectionObserver" in window &&
        !reduceMotion
    ) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealTargets.forEach(function (element) {
            observer.observe(element);
        });
    } else {
        revealTargets.forEach(function (element) {
            element.classList.add("revealed");
        });
    }


    // =========================================
    // 4. WEDDING COUNTDOWN
    // =========================================

    // Target: 24 November 2026, 10:30 AM IST.
    const targetDate = new Date(
        "2026-11-24T10:30:00+05:30"
    ).getTime();

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    const messageElement =
        document.getElementById("countdownMessage");

    // Check the HTML element IDs.
    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {
        console.error(
            "Countdown could not start. Check the IDs " +
            "'days', 'hours', 'minutes', and 'seconds' " +
            "in index.html."
        );
    } else {

        const previousValues = {};

        function updateCountdown() {
            const now = Date.now();
            const difference = targetDate - now;

            // Wedding date/time has arrived.
            if (difference <= 0) {
                daysElement.textContent = "00";
                hoursElement.textContent = "00";
                minutesElement.textContent = "00";
                secondsElement.textContent = "00";

                if (messageElement) {
                    messageElement.textContent =
                        "The big day is here! " +
                        "Let the celebrations begin! ♡";
                }

                return;
            }

            // Calculate the remaining time.
            const values = {
                days: Math.floor(
                    difference / 86400000
                ),

                hours: Math.floor(
                    (difference % 86400000) / 3600000
                ),

                minutes: Math.floor(
                    (difference % 3600000) / 60000
                ),

                seconds: Math.floor(
                    (difference % 60000) / 1000
                )
            };

            const elements = {
                days: daysElement,
                hours: hoursElement,
                minutes: minutesElement,
                seconds: secondsElement
            };

            // Update the displayed numbers.
            Object.keys(values).forEach(function (key) {
                const element = elements[key];

                const newValue = String(
                    values[key]
                ).padStart(2, "0");

                if (previousValues[key] !== newValue) {
                    element.textContent = newValue;

                    // Animate the number when it changes.
                    const card = element.closest(".time-card");

                    if (
                        card &&
                        previousValues[key] !== undefined &&
                        !reduceMotion
                    ) {
                        card.classList.remove("tick");

                        void card.offsetWidth;

                        card.classList.add("tick");

                        window.setTimeout(function () {
                            card.classList.remove("tick");
                        }, 250);
                    }

                    previousValues[key] = newValue;
                }
            });

            if (messageElement) {
                messageElement.textContent =
                    "Every second brings us closer to forever.";
            }
        }

        // Display the countdown immediately.
        updateCountdown();

        // Refresh it every second.
        window.setInterval(updateCountdown, 1000);

        console.log(
            "Wedding countdown started successfully."
        );
    }


    // =========================================
    // 5. WEBSITE INITIALIZATION
    // =========================================

    console.log("Wedding website JavaScript loaded.");

});
```