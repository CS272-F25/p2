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

//show or hide button based on scroll position
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
    });
});

<script src="app.js"></script>
