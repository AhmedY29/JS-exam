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

let apiKey = `d8d9da90-7630-4382-b92c-2fae2d2080e2`;

let apiUrl = `https://api.harvardartmuseums.org/object?apikey=${apiKey}`;

let container = document.getElementById("museum");
async function handleGetMuseumObjects() {
  try {
    let res = await fetch(`${apiUrl}`);
    let data = res.json();
    return data;
  } catch (error) {
    console.log("Error in Get Museum objects: ", error);
  }
}

async function showObjectsInUI() {
  let data = await handleGetMuseumObjects();
  // console.log(data.records);
  container.innerHTML = "";
  data.records.forEach((data) => {
    console.log(data);
    container.innerHTML += `
      
          <div class="country d-flex  flex-column justify-content-between bg-white rounded-2 shadow-sm p-3">
          <img
            src="${!data.primaryimageurl ? "notfound" : data.primaryimageurl}"
            alt="country-img"
            width="200"
            class="rounded-2"
          />
          ${!data.primaryimageurl ? "There are No Photo" : ""}
          <div class="country-info mt-1">
            <h6>${data.title}</h6>
            <div class="d-flex justify-content-between">
              <h6>${data.people[0].name}</h6>
              <h6 class="fw-light">${data.dateoffirstpageview}</h6>
            </div>
          </div>
        </div>`;
  });
}

showObjectsInUI();
