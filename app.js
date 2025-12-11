document.addEventListener("DOMContentLoaded", () => {
  //create back button
  const btn = document.createElement("button");
  btn.id = "back-to-top";
  btn.textContent = "Back to Top";
  btn.setAttribute("aria-label", "Back to Top");
  btn.style.position = "fixed";
  btn.style.bottom = "40px";
  btn.style.right = "40px";
  btn.style.padding = "10px 15px";
  btn.style.display = "none";
  btn.classList.add("btn", "btn-primary");

  document.body.appendChild(btn);

  //scroll to top smoothly when clicked
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  });
});

const blogPosts = [
  {
    title: "3 Can't Miss New York City Staples",
    image: "images/Dumbo.jpg",
    excerpt: "From Dumbo to the Battery, NYC's can't miss spots.",
    link: "posts/nycstaples.html",
    category: "travel",
  },
  {
    title: "New Movie Releases This Fall",
    image: "images/downtonfinale.jpg",
    excerpt: "Downton Abbey, Zootopia, Anniversary and more.",
    link: "posts/newmovies.html",
    category: "entertainment",
  },
];

// blog page content
const blogContainer = document.getElementById("blog-posts");
if (blogContainer) {
  const travelFilter = document.getElementById("travel-filter");
  const entertainmentFilter = document.getElementById("entertainment-filter");
  const fashionFilter = document.getElementById("fashion-filter");
  const clearFilter = document.getElementById("clear-filter");

  travelFilter.addEventListener("click", () => filterAndRender("travel"));
  entertainmentFilter.addEventListener("click", () => filterAndRender("entertainment"));
  fashionFilter.addEventListener("click", () => filterAndRender("fashion"));
  clearFilter.addEventListener("click", () => renderPosts(blogPosts));

  // initial render (no filter or page refresh)
  const blogPostsToDisplay = JSON.parse(sessionStorage.getItem("posts")) ?? blogPosts;
  renderPosts(blogPostsToDisplay);
}

function renderPosts(posts) {
  blogContainer.innerHTML = "";
  if (posts.length === 0) {
    blogContainer.innerHTML = `
    <div class="col text-center p-5">
      <p class="text-muted">No posts matching current filter</p>
    </div>
  `;
  } else {
    posts.forEach((post) => {
      blogContainer.innerHTML += `
        <div class="col-md-4">
          <div class="card h-100">
            <img src="${post.image}" class="card-img-top" alt="${post.title}">
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${post.excerpt}</p>
              <a href="${post.link}" class="btn btn-dark">Read More</a>
            </div>
          </div>
        </div>
      `;
    });
  }
}

function filterAndRender(category) {
  const filteredPosts = blogPosts.filter((post) => post.category === category);
  sessionStorage.setItem("posts", JSON.stringify(filteredPosts));
  renderPosts(filteredPosts);
}

// travel page content
const travelContainer = document.getElementById("travel-container");
if (travelContainer) {
  const cities = ["Paris", "Tokyo", "New_York_City", "Barcelona", "Sydney", "Palawan"];
  cities.forEach((city) => {
    const wikivoyageURL = `https://en.wikivoyage.org/w/api.php?action=query&prop=extracts&format=json&titles=${city}&origin=*`;
    const wikiImageURL = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=original&titles=${city}&origin=*`;

    // travel guide content
    fetch(wikivoyageURL)
      .then((res) => res.json())
      .then((travelData) => {
        const pageId = Object.keys(travelData.query.pages)[0];
        const fullText = travelData.query.pages[pageId].extract;
        const shortText = fullText.split(" ").slice(0, 25).join(" ") + " ...";

        // destination image
        fetch(wikiImageURL)
          .then((res) => res.json())
          .then((imageData) => {
            const imagePageId = Object.keys(imageData.query.pages)[0];
            const image = imageData.query.pages[imagePageId].original.source;

            // card to display
            const card = document.createElement("div");
            card.className = "col-md-6 mb-4";
            card.innerHTML = `
                            <div class="card h-100 shadow">
                                <img src="${image}" class="card-img-top" alt="${city}">
                                <div class="card-body">
                                    <h2 class="card-title">${city.replace(/_/g, " ")}</h2>
                                    <p class="card-text short-text">${shortText}</p>
                                    <div class="card-text full-text d-none">${fullText}</div>
                                    <button class="btn btn-link btn-sm read-more">Read More</button>
                                </div>
                            </div>
                        `;
            travelContainer.appendChild(card);

            // toggle button
            const btn = card.querySelector(".read-more");
            const short = card.querySelector(".short-text");
            const full = card.querySelector(".full-text");

            btn.addEventListener("click", () => {
              if (full.classList.contains("d-none")) {
                full.classList.remove("d-none");
                short.classList.add("d-none");
                btn.textContent = "Read Less";
              } else {
                full.classList.add("d-none");
                short.classList.remove("d-none");
                btn.textContent = "Read More";
              }
            });
          });
      });
  });
}

// contact page thank you pop-up
const form = document.getElementById("contact-form");
if (form) {
  const thanksCard = document.getElementById("thanks-card");
  const thanksMessage = document.getElementById("thanks-message");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // fake submission
    const name = document.getElementById("name").value;
    thanksMessage.textContent = `We received your email ${name}. We'll get back to you shortly!`;
    thanksCard.style.display = "block";
    form.reset();
  });
}
