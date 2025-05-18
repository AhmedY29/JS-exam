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

let countriesContainer = document.getElementById("countries");
async function getCountries() {
  let res = await fetch("https://restcountries.com/v3.1/all");
  let data = await res.json();
  console.log(data);
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    let lang = "";
    for (const [key, value] of Object.entries(country.languages)) {
      lang += ` <span>${value}</span> `;
    }
    countriesContainer.innerHTML += `
              <div class="country d-flex flex-column justify-content-between bg-white rounded-2 shadow-sm p-3">
            <div class="country-title">
              <h4>${country.name.official}</h4>
            </div>
            <img class="object-fit-cover" src="${country.flags.png}" alt="${country.flags.alt}" width="200" />
            <div class="country-info">
              <h6>${country.name.common}</h6>
              <div class="d-flex justify-content-between">
                <h6>population: ${country.population}</h6>
                <h6>${country.region}</h6>
              </div>
              <div class="lan text-center">
                ${lang}
                

              </div>
            </div>

            <a class="btn btn-primary" href="${country.maps.googleMaps}" target="_blank">Google map</a>
          </div>
      `;
  });
}

getCountries();
