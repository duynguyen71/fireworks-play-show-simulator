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

const arsenalItems = {
  racks: [
    { src: "assets/rack-small-1x1.png", name: "Small 1x1" },
    { src: "assets/rack-small-1x10.png", name: "Small 1x10" },
    { src: "assets/rack-small-4x7.png", name: "Small 4x7" },
    { src: "assets/rack-small-angled-4x2.png", name: "Small Angled 4x2" },
    { src: "assets/rack-small-angled-5x3.png", name: "Small Angled 5x3" },
    { src: "assets/rack-small-centerfansplit-4x7.png", name: "Small Center Fan Split 4x7" },
    { src: "assets/rack-small-centerfansplit-8x3.png", name: "Small Center Fan Split 8x3" },
    { src: "assets/rack-small-spreadout-1x5.png", name: "Small Spread Out 1x5" },
    { src: "assets/rack-small-vfan-6x2.png", name: "Small V Fan 6x2" },
    { src: "assets/rack-medium-1x1.png", name: "Medium 1x1" },
    { src: "assets/rack-medium-1x6.png", name: "Medium 1x6" },
    { src: "assets/rack-medium-1x10.png", name: "Medium 1x10" },
    { src: "assets/rack-medium-2x6.png", name: "Medium 2x6" },
    { src: "assets/rack-medium-2x10.png", name: "Medium 2x10" },
    { src: "assets/rack-medium-3x4.png", name: "Medium 3x4" },
    { src: "assets/rack-medium-4x4.png", name: "Medium 4x4" },
    { src: "assets/rack-medium-4x7.png", name: "Medium 4x7" },
    { src: "assets/rack-medium-8x3.png", name: "Medium 8x3" },
    { src: "assets/rack-medium-10x5.png", name: "Medium 10x5" },
    { src: "assets/rack-medium-cakebox-5x5.png", name: "Medium Cake Box 5x5" },
    { src: "assets/rack-medium-centerfansplit-3x8.png", name: "Medium Center Fan Split 3x8" },
    { src: "assets/rack-medium-spreadout-1x6.png", name: "Medium Spread Out 1x6" },
    { src: "assets/rack-medium-zigzag-1x12.png", name: "Medium ZigZag 1x12" },
    { src: "assets/rack-large-1x6.png", name: "Large 1x6" },
    { src: "assets/rack-largeplus-8x3.png", name: "LargePlus 8x3" },
    { src: "assets/rack-xlarge-1x1.png", name: "XLarge 1x1" },
    { src: "assets/rack-xlarge-1x5.png", name: "XLarge 1x5" },
    { src: "assets/rack-massive-1x1.png", name: "Massive 1x1" },
    { src: "assets/rack-massive-1x5.png", name: "Massive 1x5" },
  ],
  shells: [
    { src: "assets/shell-blue-dahila-150m.png", name: "6\" Blue Dahlia" },
    { src: "assets/shell-blue-ring-with-red-ghost-shell-150m.png", name: "6\" Blue Ring\nwith Red GhostShell" },
    { src: "assets/shell-comet-100m.png", name: "Red Comet" },
    { src: "assets/shell-gold-brocade-100m.png", name: "4\" Gold Brocade" },
    { src: "assets/shell-gold-brocade-220m.png", name: "8\" Gold Brocade" },
    { src: "assets/shell-gold-brocade-450m.png", name: "16\" Gold Brocade" },
    { src: "assets/shell-gold-chrysanthemum-180m.png", name: "8\" Glitter Gold Chrysanthemum\nwith Blue Pistil" },
    { src: "assets/shell-gold-crackle-110m.png", name: "5\" Gold Crackle" },
    { src: "assets/shell-gold-horsetail-40m.png", name: "6\" Gold Horsetail" },
    { src: "assets/shell-gold-willow-with-red-ring-150m.png", name: "6\" Gold Willow\nwith Red Ring" },
    { src: "assets/shell-mine-80m.png", name: "Silver Mine" },
    { src: "assets/shell-red-blue-ghost-shell-80m.png", name: "4\" Blue Red GhostShell" },
    { src: "assets/shell-red-crossette-90m.png", name: "4\" Red Crossette" },
    { src: "assets/shell-red-dahlia-with-strobe-pistil-180m.png", name: "8\" Red Dahlia\nwith White Strobe Pistil" },
    { src: "assets/shell-red-peony-200m.png", name: "8\" Red Peony" },
    { src: "assets/shell-titanium-salute-20m.png", name: "2\" Titanium Salute" },
    { src: "assets/shell-white-strobe-150m.png", name: "6\" White Strobe" },
  ],
};

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

  const renderPage = () => {
    assetPageSize = getAssetPageSize();
    const pageCount = Math.ceil(items.length / assetPageSize);
    pageIndex = Math.min(pageIndex, pageCount - 1);
    const pageItems = items.slice(pageIndex * assetPageSize, (pageIndex + 1) * assetPageSize);

    grid.replaceChildren(
      ...pageItems.map((item) => {
        const card = document.createElement("article");
        const image = document.createElement("img");
        const label = document.createElement("span");

        card.className = `asset-card asset-card-${type}`;
        image.src = item.src;
        image.alt = `${item.name} thumbnail`;
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
    pageIndex = Math.min(pageCount - 1, pageIndex + 1);
    renderPage();
  });

  renderPage();
  window.addEventListener("resize", renderPage);
});
