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

let registerForm = document.getElementById("register-form");
let regUserName = document.getElementById("form-username");
let regEmail = document.getElementById("form-email");
let regPassword = document.getElementById("form-password");
let regConfirmPassword = document.getElementById("form-confirm-password");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  console.log(
    regUserName.value,
    regEmail.value,
    regPassword.value,
    regConfirmPassword.value
  );

  const users = await handleGetUsers();

  console.log(users);

  let userExist = users.find((user) => user.username == regUserName.value);
  let emailExist = users.find((user) => user.email == regEmail.value);

  if (userExist) {
    Swal.fire({
      title: "User Already Exist",
      text: "",
      icon: "error",
    });
    return;
  }
  if (emailExist) {
    Swal.fire({
      title: "Email Already Exist",
      text: "",
      icon: "error",
    });
    return;
  }

  if (regPassword.value != regConfirmPassword.value) {
    Swal.fire({
      title: "Passwords aren't Match",
      text: "",
      icon: "error",
    });
    return;
  }

  let newUser = {
    username: regUserName.value.toLowerCase(),
    email: regEmail.value.toLowerCase(),
    password: regPassword.value,
  };
  console.log(newUser);
  await handleCreateUser(newUser);
});

async function handleGetUsers() {
  try {
    let res = await fetch("https://68298cea6075e87073a6ca1f.mockapi.io/users");
    let users = await res.json();
    return users;
  } catch (error) {
    console.log("Error in Get Users", error);
  }
}
async function handleCreateUser(user) {
  try {
    let res = await fetch("https://68298cea6075e87073a6ca1f.mockapi.io/users", {
      method: "POST",
      body: JSON.stringify({
        username: user.username,
        email: user.email,
        password: user.password,
      }),
      headers: { "Content-type": "application/json" },
    });
    if (res.ok) {
      Swal.fire({
        title: "Register Successfully",
        text: "After 5s We Will Redirect You to Login Page ...",
        icon: "success",
      });
      setTimeout(() => {
        window.location.href = "./login.html";
      }, 5000);
    }
  } catch (error) {
    console.error("Error in Register: ", error);
  }
}
