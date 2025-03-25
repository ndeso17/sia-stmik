const listItems = document.querySelectorAll(".list");

function setActiveLink(event) {
  listItems.forEach((item) => item.classList.remove("active"));
  event.currentTarget.classList.add("active");
  console.log("Active item:", event.currentTarget); // Debugging
}

listItems.forEach((item) => {
  item.addEventListener("click", setActiveLink);
});
