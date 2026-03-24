/**
 * Docs page scroll-spy & search filter
 */
(function () {
  "use strict";

  // Scroll-spy: highlight active sidebar link based on visible section
  var sections = document.querySelectorAll("[data-category]");
  var links = document.querySelectorAll(".docs-sidebar-link");

  if (sections.length && links.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute("id");
            links.forEach(function (link) {
              link.classList.toggle(
                "active",
                link.getAttribute("data-target") === id
              );
            });
          }
        });
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });

    // Smooth scroll on sidebar link click
    links.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var target = document.getElementById(
          this.getAttribute("data-target")
        );
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  // Simple search filter
  var searchInput = document.getElementById("docsSearch");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      var query = this.value.toLowerCase().trim();
      var cards = document.querySelectorAll(".docs-feature-card");
      var categorySections = document.querySelectorAll(".docs-category");

      cards.forEach(function (card) {
        var text = card.textContent.toLowerCase();
        var col = card.closest(".docs-feature-col");
        if (col) {
          col.style.display = !query || text.indexOf(query) !== -1 ? "" : "none";
        }
      });

      // Hide category headers if all their cards are hidden
      categorySections.forEach(function (section) {
        var visibleCards = section.querySelectorAll(
          '.docs-feature-col:not([style*="display: none"])'
        );
        section.style.display = visibleCards.length === 0 && query ? "none" : "";
      });
    });
  }
})();
