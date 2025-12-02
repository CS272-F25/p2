document.addEventListener("DOMContentLoaded", () => {
    //create back button
    const btn = document.createElement("button");
    btn.id = "back-to-top";
    btn.textContent = "Top";
    btn.setAttribute("aria-label", "Back to top");
    btn.style.position = "fixed";
    btn.style.bottom = "40px";
    btn.style.right = "40px";
    btn.style.padding = "10px 15px";
    btn.style.fontSize = "18px";
    btn.style.display = "none";
    btn.classList.add("btn", "btn-primary");

    document.body.appendChild(btn);

    //scroll to top smoothly when clicked
    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth"});
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
    excerpt: "From Dumbo to the Battery, NYC's cant miss spots.",
    link: "posts/nycstaples.html"
  },
  {
    title: "New Movie Releases This Fall",
    image: "images/downtonfinale.jpg",
    excerpt: "Downton Abbey, Zootopia, Anniversary and more.",
    link: "posts/newmovies.html"
  }
];

// 2. Render posts
const container = document.getElementById("blog-posts");

blogPosts.forEach(post => {
  container.innerHTML += `
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
