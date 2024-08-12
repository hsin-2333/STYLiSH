const url = "https://api.appworks-school.tw/api/1.0/products/";

if (!window.navigator.onLine) {
  window.alert("Hi, please check your internet connection and try again.");
}

const category = new URLSearchParams(window.location.search).get("category");

let currentPaging = 0;
let isApiLoading = false;

const validCategories = ["men", "women", "accessories"];
const productUrl = validCategories.includes(category)
  ? url + category + "?paging=" + currentPaging
  : url + "all" + "?paging=" + currentPaging;

const productsContainer = document.querySelector(".product-container");

const showLoadingStatus = () => {
  const loadingElement = document.createElement("div");
  loadingElement.id = "loading";
  loadingElement.innerHTML = `<img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="loading" href="/product.html"/>`;
  productsContainer.appendChild(loadingElement);
};

const removeLoadingStatus = () => {
  const loadingElement = document.getElementById("loading");
  if (loadingElement) {
    productsContainer.removeChild(loadingElement);
  }
};

const activateCategoryLinks = () => {
  const categoryLink = document.querySelector(`a[href*='?category=${category}']`);
  if (categoryLink) {
    categoryLink.classList.add("categories-active");
  }
};

const showNoResult = () => {
  productsContainer.innerHTML = `
  <span style="font-weight: bold;">No results found.</span>
  <br><p>Try checking your spelling or using more general terms.</p>
  `;
};

const createProductItem = (product, index) => {
  const productItem = document.createElement("div");
  productItem.classList.add("product");
  const colors = product.colors;
  productItem.innerHTML = `
  <div class="product" id="product${index}">
  <a href="/product?id=${product.id}">
    <img src="${product.main_image}" alt="product" />
    <div class="product-dots">
      ${colors.map((color) => `<span class="p-dot" style="background-color: #${color.code}"></span>`).join("")}
    </div>
    <div class="product-info">
      <div class="product-name">${product.title}</div>
      <div class="product-price">TWD.${product.price}</div>
    </div>
  </a>  
  </div>
`;
  return productItem;
};

async function fetchProducts(url, isSearch = false) {
  if (isApiLoading) return;
  showLoadingStatus();

  isApiLoading = true;
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(7000),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log("Success:", data);

    if (isSearch) {
      productsContainer.innerHTML = "";
      if (data.data.length === 0) {
        showNoResult();
      }
    }

    if (data.data.length > 0) {
      data.data.forEach((product, index) => {
        const productItem = createProductItem(product, index);
        productsContainer.appendChild(productItem);
      });
    }

    currentPaging = data.next_paging;

    activateCategoryLinks();
  } catch (error) {
    if (error.name === "TimeoutError") {
      const productsContainer = document.querySelector(".product-container");
      productsContainer.innerHTML = `<h2> Sorry, the request timed out. Please try again later </h2>`;
    } else if (error.name === "AbortError") {
      console.error("Fetch aborted by user action (browser stop button, closing tab, etc.");
    } else {
      console.error("Error:", error);
    }
  } finally {
    isApiLoading = false;
    removeLoadingStatus();
  }
}

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    console.log("scroll to bottom");
    if (currentPaging) {
      const newUrl = validCategories.includes(category)
        ? url + category + "?paging=" + currentPaging
        : url + "all" + "?paging=" + currentPaging;
      fetchProducts(newUrl);
      console.log("newUrl=" + newUrl);
      currentPaging += 1;
    }
  }
});

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    console.log("scroll to bottom");
    if (currentPaging) {
      currentPaging += 1;
      const newUrl = validCategories.includes(category)
        ? url + category + "?paging=" + currentPaging
        : url + "all" + "?paging=" + currentPaging;
      fetchProducts(newUrl);
      console.log("newUrl=" + newUrl);
    }
  }
});

const mobileSearchButton = document.querySelector(".top-row button"); //mopbile search button
const inputWrapper = document.querySelector(".input-wrapper"); //web search
const searchInput = document.getElementById("searchInput");

mobileSearchButton.addEventListener("click", (event) => {
  event.preventDefault();
  mobileSearchButton.style.display = "none";
  inputWrapper.classList.add("input-wrapper-active");

  if (searchInput) {
    searchInput.focus();
  }
});

searchInput.addEventListener("keypress", (event) => {
  if (!event.repeat && event.key === "Enter") {
    console.log("Enter key pressed");
    const searchValue = searchInput.value;
    const searchUrl = url + "search?keyword=" + searchValue;

    const currentUrl = new URL(window.location.href);
    currentUrl.search = "";
    currentUrl.searchParams.set("keyword", searchValue);
    window.history.pushState({}, "", currentUrl);

    fetchProducts(searchUrl, true);
  }
});

searchInput.addEventListener("blur", (event) => {
  event.preventDefault();
  inputWrapper.classList.remove("input-wrapper-active");
  mobileSearchButton.style.display = "block";
});

document.addEventListener("DOMContentLoaded", () => {
  const searchValue = new URLSearchParams(window.location.search).get("keyword");
  if (searchValue) {
    searchInput.value = searchValue;
    const searchUrl = url + "search?keyword=" + searchValue;
    console.log("searchValue:", searchValue);
    console.log("searchUrl:", searchUrl);
    fetchProducts(searchUrl, true);
  } else {
    fetchProducts(productUrl);
  }
});

// --- carousel part using compaigns API ---

const createCarouselItem = (carousel) => {
  const carouselItem = document.createElement("div");
  carouselItem.classList.add("carousel-cell");
  if (carousel.id === 1) {
    carouselItem.classList.add("carousel-cell--active");
  }
  carouselItem.id = `carousel-${carousel.id}`;
  carouselItem.innerHTML = `
    <a href="/product?id=${carousel.product_id}">
      <img src="${carousel.picture}" alt="carousel-img-${carousel.id}" />
    </a>
  `;
  return carouselItem;
};

const fetchCarouselAPI = async () => {
  const carouselUrl = "https://api.appworks-school.tw/api/1.0/marketing/campaigns";
  const carouselContainer = document.querySelector(".carousel");
  const carouselDots = document.querySelector(".carousel-dots");
  try {
    const response = await fetch(carouselUrl);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log("Success:", data);

    data.data.forEach((carousel) => {
      const carouselItem = createCarouselItem(carousel);
      carouselContainer.appendChild(carouselItem);
    });

    for (let i = 0; i < data.data.length; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      dot.dataset.pic = `carousel-${i + 1}`;
      carouselDots.appendChild(dot);
    }

    const carouselText = document.querySelector(".carousel-text");
    carouselText.innerHTML = data.data[0].story;

    initializeCarousel(data.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

const startAutoSwitch = (carousel, currentIndex, carouselCells, data, carouselText) => {
  return setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % carouselCells.length;
    updateCarousel(carousel, carouselCells, carouselText, data, currentIndex.value);
  }, 5000);
};

const updateCarouselSize = (carouselCells) => {
  const containerWidth = document.querySelector(".carousel-container").offsetWidth;
  carouselCells.forEach((cell) => {
    cell.style.width = `${containerWidth}px`;
  });
};

const updateCarousel = (carousel, carouselCells, carouselText, data, currentIndex) => {
  const offset = -currentIndex * 100;
  carousel.style.transform = `translateX(${offset}%)`;
  carouselText.innerHTML = data[currentIndex].story;
  const carouselDots = document.querySelectorAll(".dot");

  carouselCells.forEach((cell) => {
    cell.classList.remove("carousel-cell--active");
  });
  carouselDots.forEach((dot) => {
    dot.classList.remove("dot-active");
  });

  const currentCell = carousel.querySelector(`#carousel-${data[currentIndex].id}`);
  currentCell.classList.add("carousel-cell--active");

  const currentDot = document.querySelector(`[data-pic=carousel-${currentIndex + 1}]`);
  currentDot.classList.add("dot-active");
};

const initializeCarousel = (data) => {
  const carousel = document.querySelector(".carousel");
  const carouselCells = document.querySelectorAll(".carousel-cell");
  const carouselDots = document.querySelectorAll(".dot");
  const carouselText = document.querySelector(".carousel-text");

  let currentIndex = { value: 0 };

  carouselDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex.value = index;
      updateCarousel(carousel, carouselCells, carouselText, data, currentIndex.value);
    });
  });

  updateCarouselSize(carouselCells);
  window.addEventListener("resize", () => updateCarouselSize(carouselCells));

  updateCarousel(carousel, carouselCells, carouselText, data, currentIndex.value);
  startAutoSwitch(carousel, currentIndex, carouselCells, data, carouselText);
};

fetchCarouselAPI();

// --- cart quantity part ---
document.addEventListener("DOMContentLoaded", () => {
  const savedCartDetails = localStorage.getItem("chosenProductDetails");
  const cartItems = savedCartDetails ? JSON.parse(savedCartDetails) : [];
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const cartQuantity = document.querySelector(".cart-quantity");
  cartQuantity.innerHTML = totalQuantity;
});
