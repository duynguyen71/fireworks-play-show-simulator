const yearElement = document.querySelector("#current-year");

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const gallerySlider = document.querySelector("[data-gallery-slider]");

if (gallerySlider) {
  const slides = [
    { src: "assets/01_compressed.png", title: "Festival field setup" },
    { src: "assets/02_v2-c" + "mpr.png", title: "Build mode planning" },
    { src: "assets/03_.png", title: "Rack placement workflow" },
    { src: "assets/04_.png", title: "Play show mode" },
    { src: "assets/05-c" + "mpr.png", title: "Cue and fuse preparation" },
    { src: "assets/06_.png", title: "Shell effect preview" },
    { src: "assets/07_.png", title: "Show playback timing" },
    { src: "assets/08-cmpr.png", title: "Rack menu" },
    { src: "assets/09-cmpr.png", title: "Layered firework effects" },
    { src: "assets/10_.png", title: "Finale composition" },
    { src: "assets/11-cmpr.png", title: "Wide show view" },
    { src: "assets/12_.png", title: "Production field detail" },
    { src: "assets/13_.png", title: "Finale show playback" },
    { src: "assets/14-cmpr.png", title: "Saved show playback" },
    { src: "assets/15-cmpr.png", title: "Fireworks Show library" },
  ];

  const sliderImage = gallerySlider.querySelector("[data-slider-image]");
  const sliderCount = gallerySlider.querySelector("[data-slider-count]");
  const sliderTitle = gallerySlider.querySelector("[data-slider-title]");
  const prevButton = gallerySlider.querySelector("[data-slider-prev]");
  const nextButton = gallerySlider.querySelector("[data-slider-next]");
  const thumbButtons = Array.from(gallerySlider.querySelectorAll("[data-slide-index]"));
  let activeIndex = 0;

  const setActiveSlide = (nextIndex) => {
    activeIndex = (nextIndex + slides.length) % slides.length;
    const slide = slides[activeIndex];

    if (sliderImage) {
      sliderImage.src = slide.src;
      sliderImage.alt = `${slide.title} screenshot`;
    }

    if (sliderCount) {
      sliderCount.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${slides.length}`;
    }

    if (sliderTitle) {
      sliderTitle.textContent = slide.title;
    }

    thumbButtons.forEach((button) => {
      const isActive = Number(button.dataset.slideIndex) === activeIndex;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-current", isActive ? "true" : "false");
    });
  };

  prevButton?.addEventListener("click", () => setActiveSlide(activeIndex - 1));
  nextButton?.addEventListener("click", () => setActiveSlide(activeIndex + 1));

  thumbButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveSlide(Number(button.dataset.slideIndex));
    });
  });

  gallerySlider.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setActiveSlide(activeIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      setActiveSlide(activeIndex + 1);
    }
  });

  setActiveSlide(activeIndex);
}

const arsenalItems = window.arsenalItems || {};

const getAssetPageSize = () => {
  if (window.matchMedia("(max-width: 640px)").matches) {
    return 4;
  }

  if (window.matchMedia("(max-width: 980px)").matches) {
    return 8;
  }

  return 10;
};

Object.entries(arsenalItems).forEach(([type, items]) => {
  const grid = document.querySelector(`[data-asset-grid="${type}"]`);
  const summary = document.querySelector(`[data-page-summary="${type}"]`);
  const previousButton = document.querySelector(`[data-page-prev="${type}"]`);
  const nextButton = document.querySelector(`[data-page-next="${type}"]`);

  if (!grid || !summary || !previousButton || !nextButton) {
    return;
  }

  let pageIndex = 0;
  let assetPageSize = getAssetPageSize();
  const getPageCount = () => Math.ceil(items.length / assetPageSize);

  const renderPage = () => {
    assetPageSize = getAssetPageSize();
    const pageCount = getPageCount();
    pageIndex = Math.min(pageIndex, pageCount - 1);
    const pageItems = items.slice(pageIndex * assetPageSize, (pageIndex + 1) * assetPageSize);

    grid.replaceChildren(
      ...pageItems.map((item) => {
        const card = document.createElement("article");
        const image = document.createElement("img");
        const label = document.createElement("span");

        card.className = `asset-card asset-card-${type}`;
        image.src = item.src;
        image.alt = item.name;
        image.loading = "lazy";
        label.textContent = item.name;

        card.append(image, label);
        return card;
      })
    );

    summary.textContent = `${pageIndex + 1} / ${pageCount}`;
    previousButton.disabled = pageIndex === 0;
    nextButton.disabled = pageIndex === pageCount - 1;
  };

  previousButton.addEventListener("click", () => {
    pageIndex = Math.max(0, pageIndex - 1);
    renderPage();
  });

  nextButton.addEventListener("click", () => {
    pageIndex = Math.min(getPageCount() - 1, pageIndex + 1);
    renderPage();
  });

  renderPage();
  window.addEventListener("resize", renderPage);
});
