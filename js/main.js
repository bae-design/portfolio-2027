(function () {
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const preview = document.querySelector("[data-preview]");
  const stage = preview?.querySelector("[data-preview-stage]");
  if (preview && stage) {
    document.querySelectorAll("[data-preview-src]").forEach((row) => {
      row.addEventListener("mouseenter", () => {
        const id = row.getAttribute("data-preview-src");
        stage.dataset.active = id || "";
        preview.classList.add("is-visible");
      });
      row.addEventListener("mouseleave", () => {
        preview.classList.remove("is-visible");
      });
    });
  }
})();
