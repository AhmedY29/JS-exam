let loginBtns = document.getElementById("btn");
let welcomeDiv = document.getElementById("Welcome-div");
let welcomeMsg = document.getElementById("Welcome-msg");

let username = localStorage.getItem("user-account-name");

function handleShowName() {
  if (username) {
    welcomeDiv.style.display = "block !important";
    welcomeDiv.className = "nav-item dropdown";
    welcomeMsg.innerText = `Welcome ${username} 👋🏻`;
  } else {
    loginBtns.style.display = "block !important";
    loginBtns.className = "d-block";
  }
}
handleShowName();

function handleLogout() {
  localStorage.clear();
  window.location.href = "./index.html";
  handleShowName();
}

function handleCheckLoginMuseum() {
  if (!username) {
    Swal.fire({
      icon: "error",
      title: "You have to Login",
    });
    return;
  } else {
    window.location.href = "./museum.html";
  }
}
function handleCheckLoginCountries() {
  if (!username) {
    Swal.fire({
      icon: "error",
      title: "You have to Login",
    });
    return;
  } else {
    window.location.href = "./countries.html";
  }
}
