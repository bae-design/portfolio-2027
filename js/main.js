(function () {
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  const menu = document.querySelector("[data-menu]");
  const toggle = document.querySelector("[data-menu-toggle]");
  if (menu && toggle) {
    const close = () => {
      menu.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("is-nav-open");
    };
    const open = () => {
      menu.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("is-nav-open");
    };
    toggle.addEventListener("click", () => {
      if (menu.hidden) open();
      else close();
    });
    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") close();
    });
  }

  document.querySelectorAll("[data-acc]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") === "true";
      document.querySelectorAll("[data-acc]").forEach((other) => {
        other.setAttribute("aria-expanded", "false");
        const panel = document.getElementById(other.getAttribute("aria-controls"));
        if (panel) panel.hidden = true;
      });
      if (!open) {
        btn.setAttribute("aria-expanded", "true");
        const panel = document.getElementById(btn.getAttribute("aria-controls"));
        if (panel) panel.hidden = false;
      }
    });
  });

  const cursor = document.querySelector("[data-cursor]");
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (cursor && fine && motionOk) {
    cursor.hidden = false;
    document.body.classList.add("has-cursor");
    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;
    window.addEventListener("pointermove", (event) => {
      x = event.clientX;
      y = event.clientY;
    }, { passive: true });
    const tick = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      cursor.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(tick);
    };
    tick();
  }
})();
