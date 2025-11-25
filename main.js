/* Simple carousel: auto + dots */
(function () {
  const slides = document.getElementById("slides");
  const dots = document.querySelectorAll(".dot");
  const total = slides.children.length;
  let idx = 0;
  let timer = null;

  function goTo(i) {
    idx = (i + total) % total;
    slides.style.transform = "translateX(" + -idx * 100 + "%)";
    dots.forEach((d) => d.classList.remove("active"));
    dots[idx].classList.add("active");
  }

  dots.forEach((d) => {
    d.addEventListener("click", () => {
      goTo(Number(d.dataset.index));
      resetAuto();
    });
  });

  function next() {
    goTo(idx + 1);
  }
  function resetAuto() {
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }
  timer = setInterval(next, 5000);

  // pause on hover
  const carousel = document.querySelector(".carousel");
  carousel.addEventListener("mouseenter", () => clearInterval(timer));
  carousel.addEventListener("mouseleave", resetAuto);

  // init
  goTo(0);
})();

/* Image modal for gallery */
(function () {
  const items = document.querySelectorAll(".gallery .card-img");
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");
  const close = document.getElementById("closeModal");

  items.forEach((a) => {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      const src = this.dataset.src || this.querySelector("img").src;
      modalImg.src = src;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
    });
  });

  close.addEventListener("click", () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    modalImg.src = "";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      close.click();
    }
  });
})();

/* Smooth scroll for nav links */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id === "#") return;
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // set active
      document
        .querySelectorAll("nav a")
        .forEach((x) => x.classList.remove("active"));
      const navA = document.querySelector('nav a[href="' + id + '"]');
      if (navA) navA.classList.add("active");
    }
  });
});
