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

let loginForm = document.getElementById("login-form");
let loginEmail = document.getElementById("login-email");
let loginPassword = document.getElementById("login-password");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Validation

  if (!loginEmail.value.trim()) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Please Fill filed",
    });
    return;
  }
  if (!loginPassword.value.trim()) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Please Fill filed",
    });
    return;
  }

  // Get Users And Check

  let users = await handleGetUsers();

  let userExist = users.find(
    (user) =>
      user.email == loginEmail.value && user.password == loginPassword.value
  );
  if (userExist) {
    Swal.fire({
      title: "Login Successfully",
      text: "After 5s We Will Redirect You to Countries Page ...",
      icon: "success",
    });
    console.log(userExist.username, "aaaa");
    localStorage.setItem("user-account-name", userExist.username);
    setTimeout(() => {
      window.location.href = "./index.html";
    }, 5000);
  }
});

async function handleGetUsers() {
  try {
    let res = await fetch("https://68298cea6075e87073a6ca1f.mockapi.io/users");
    let users = await res.json();
    return users;
  } catch (error) {
    console.log("Error in Get Users ", error);
  }
}
