// SignUp

function signup() {
  window.location.href = "signup/index.html";
}

// Download

function appleStore() {
  window.location.href = "https://www.apple.com/in/app-store/";
}

function playStore() {
  window.location.href = "https://play.google.com/store/games?hl=en-IN&code";
}

// footer

document.querySelectorAll(".contact")[0].addEventListener("click", function() {
  window.location.href = "https://twitter.com/explore";
});
document.querySelectorAll(".contact")[1].addEventListener("click", function() {
  window.location.href = "https://www.facebook.com/";
});
document.querySelectorAll(".contact")[2].addEventListener("click", function() {
  window.location.href = "https://www.instagram.com/";
});
document.querySelectorAll(".contact")[3].addEventListener("click", function() {
  window.location.href = "https://www.google.com/intl/en_in/gmail/about/";
});
