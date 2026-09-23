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
    { src: "assets/gallery-01-city-fan.webp", title: "City skyline finale" },
    { src: "assets/gallery-02-rack-layout.webp", title: "Rack layout and fuse wiring" },
    { src: "assets/gallery-03-street-burst.webp", title: "Street-level burst" },
    { src: "assets/gallery-04-aerial-city.webp", title: "Aerial city display" },
    { src: "assets/gallery-05-brocade-rings.webp", title: "Brocade and ring shells" },
    { src: "assets/gallery-06-street-view.webp", title: "Show from the street" },
    { src: "assets/gallery-07-green-peony.webp", title: "Green peony bouquet" },
    { src: "assets/gallery-08-ground-fountain.webp", title: "Ground fountain close-up" },
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

const lazyPlaceholder =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const loadLazyElement = (element) => {
  const source = element.dataset.src;

  if (!source) {
    return;
  }

  element.src = source;
  delete element.dataset.src;
};

const lazyObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            loadLazyElement(entry.target);
            observer.unobserve(entry.target);
          });
        },
        { rootMargin: "200px 0px" }
      )
    : null;

const lazyEmbedObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            loadLazyElement(entry.target);
            observer.unobserve(entry.target);
          });
        },
        { rootMargin: "0px", threshold: 0.1 }
      )
    : null;

const observeLazy = (element) => {
  if (!element.dataset.src) {
    return;
  }

  const observer = element.tagName === "IFRAME" ? lazyEmbedObserver : lazyObserver;

  if (observer) {
    observer.observe(element);
  } else {
    loadLazyElement(element);
  }
};

document.querySelectorAll("[data-src]").forEach(observeLazy);

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

    const cards = pageItems.map((item) => {
      const card = document.createElement("article");
      const image = document.createElement("img");
      const label = document.createElement("span");

      card.className = `asset-card asset-card-${type}`;
      image.src = lazyPlaceholder;
      image.dataset.src = item.src;
      image.alt = item.name;
      image.decoding = "async";
      label.textContent = item.name;

      card.append(image, label);
      return card;
    });

    grid.replaceChildren(...cards);
    cards.forEach((card) => {
      const image = card.querySelector("img");

      if (image) {
        observeLazy(image);
      }
    });

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
