// Toggle sidebar dari hamburger
const hamburger = document.querySelector(".hamburger");
const sidebar = document.querySelector("#sidebar");
const toggleLogo = document.querySelector("#toggle-logo");
const contenpage = document.getElementById("contentpage");
console.log("Contenpage : ", contenpage);
hamburger.addEventListener("click", function () {
  sidebar.classList.toggle("expand");
  hamburger.classList.toggle("is-active");
  if (sidebar.classList.contains("expand")) {
    contenpage.classList.remove("contentpage");
    contenpage.classList.add("pagecontent");
  } else {
    contenpage.classList.remove("pagecontent");
    contenpage.classList.add("contentpage");
  }
});

toggleLogo.addEventListener("click", function () {
  sidebar.classList.toggle("expand");
  hamburger.classList.toggle("is-active");
  if (sidebar.classList.contains("expand")) {
    contenpage.classList.remove("contentpage");
    contenpage.classList.add("pagecontent");
  } else {
    contenpage.classList.remove("pagecontent");
    contenpage.classList.add("contentpage");
  }
});

// Toggle search window
const searchIcon = document.querySelector(".search");
const searchWindow = document.querySelector(".search-window");

if (!searchIcon || !searchWindow) {
  console.error("Search icon atau search window tidak ditemukan di DOM!");
}

searchIcon.addEventListener("click", function (e) {
  e.stopPropagation();
  searchWindow.classList.toggle("active");
  console.log(
    "Search window toggled:",
    searchWindow.classList.contains("active") ? "Opened" : "Closed"
  );
});

searchWindow.addEventListener("click", function (e) {
  e.stopPropagation();
});

document.addEventListener("click", function (e) {
  if (!searchIcon.contains(e.target) && !searchWindow.contains(e.target)) {
    searchWindow.classList.remove("active");
    console.log("Search window closed due to click outside");
  }
});

// Toggle chat window dari chat-item
const inboxIcon = document.querySelector(".inbox");
const chatWindow = document.querySelector(".chat-window");
const closeChat = document.querySelector(".close-chat");
const chatMarkReadBtn = document.querySelector(".chat-actions .mark-read");
const chatViewAllBtn = document.querySelector(".chat-actions .view-all");
const chatItems = document.querySelectorAll(".chat-item");

inboxIcon.addEventListener("click", function (e) {
  e.stopPropagation();
});

chatItems.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.stopPropagation();
    chatWindow.classList.add("active");
    console.log("Chat window opened from chat item");
  });
});

closeChat.addEventListener("click", function () {
  chatWindow.classList.remove("active");
  console.log("Chat window closed");
});

chatMarkReadBtn.addEventListener("click", function () {
  document.querySelector(".count-chat").textContent = "0";
  alert("Semua chat ditandai sebagai dibaca!");
});

chatViewAllBtn.addEventListener("click", function () {
  chatItems.forEach((item) => item.classList.remove("hidden"));
});

// Toggle notif dropdown dan redirect
const notifIcon = document.querySelector(".notif");
const notifItems = document.querySelectorAll(".notif-item");
const notifMarkReadBtn = document.querySelector(".notif-actions .mark-read");
const notifViewAllBtn = document.querySelector(".notif-actions .view-all");

notifIcon.addEventListener("click", function (e) {
  e.stopPropagation();
});

notifItems.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.stopPropagation();
    const url = item.getAttribute("data-url");
    if (url) {
      window.location.href = url;
      console.log("Redirecting to:", url);
    }
  });
});

notifMarkReadBtn.addEventListener("click", function () {
  document.querySelector(".count-notif").textContent = "0";
  alert("Semua notifikasi ditandai sebagai dibaca!");
});

notifViewAllBtn.addEventListener("click", function () {
  notifItems.forEach((item) => item.classList.remove("hidden"));
});
