"use strict";
let home = document.querySelector("#home-container");
let search = document.querySelector("#search");
let category = document.getElementsByClassName("category");
let homelink = document.getElementsByClassName("#home");
let data;
let pageNo = 1;
let currentLink = ``;

//reset
function reset() {
  pageNo = 1;
  $(".next").show();
  $(".prev").show();
  $(".pageNo").show();
}

//change Page
async function changePage(n) {
  try {
    home.innerHTML = "";
    pageNo += n;
    if (pageNo < 1) pageNo = 10;
    if (pageNo > 10) pageNo = 1;
    console.log(pageNo);
    $("#page").html(pageNo);

    console.log(`${currentLink}${pageNo}`);
    let response = await fetch(`${currentLink}${pageNo}`);
    data = await response.json();

    data.results.forEach((ele) => {
      createCard(ele);
    });
  } catch {
    home.innerHTML = _404();
  }
}

// Home Page
async function homepage() {
  try {
    home.innerHTML = "";
    reset();
    let response = await fetch(
      `https://api.consumet.org/anime/gogoanime/recent-episodes?type=1&page=${pageNo}`
    );

    data = await response.json();
    console.log(data);

    data.results.forEach((ele) => {
      createCard(ele);
    });
    currentLink = `https://api.consumet.org/anime/gogoanime/recent-episodes?type=1&page=`;
  } catch {
    console.log(error);
    home.innerHTML = _404();
  }
}
// Top Airing Page
async function topAiring() {
  try {
    reset();
    home.innerHTML = "";
    let response = await fetch(
      "https://api.consumet.org/anime/gogoanime/top-airing?type=1&page=" +
        pageNo
    );

    data = await response.json();
    data.results.forEach((ele) => {
      createCard(ele);
    });
    currentLink = `https://api.consumet.org/anime/gogoanime/top-airing?type=1&page=`;
  } catch {
    home.innerHTML = _404();
  }
}

// Recent Page
async function recentpage() {
  try {
    reset();
    home.innerHTML = "";
    let response = await fetch(
      `https://api.consumet.org/anime/gogoanime/recent-episodes?type=1&page=${pageNo +1}`
    );

    data = await response.json();
    data.results.forEach((ele) => {
      createCard(ele);
    });
    currentLink = `https://api.consumet.org/anime/gogoanime/recent-episodes?type=1&page=`;
  } catch {
    home.innerHTML = _404();
  }
}

// search page
async function searchpage() {
  try {
    reset();
    home.innerHTML = "";
    let response = await fetch(
      `https://api.consumet.org/anime/gogoanime/${search.value}?page=${pageNo}`
    );

    data = await response.json();
    data.results.forEach((ele) => {
      createCard(ele);
    });

    if (data.length == 0) {
      console.log("Yes");
      home.innerHTML = `didn't Find What You are Searching For`;
    }
    $(".next").hide();
    $(".prev").hide();
    $(".pageNo").hide();
  } catch {
    home.innerHTML = _404();
  }
}

//---------------------------------- category click event handler------------------------------------
$(".category").click(async function (e) {
  try {
    reset();
    let genre = e.currentTarget.innerHTML.toLowerCase();
    home.innerHTML = "";
    let response = await fetch(
      `https://gogoanime.consumet.stream/genre/${genre}`
    );

    data = await response.json();
    data.forEach((ele) => {
      createCard(ele);
    });
  } catch {
    home.innerHTML = _404();
  }
});

// -----------------------------------search button event handler-----------------------------------
search.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    document.getElementById("search-btn").click();
  }
});

function createCard(ele) {
  let card = document.createElement("div");
  card.classList.add(
    "card",
    "bg-dark",
    "col-md-2",
    "gold-border",
    "text-center"
  );
  card.innerHTML = `
      <img class="card-img-top img-fit" src="${ele.image}" alt="${ele.episodeId}" >
      
                        `;
  ele.hasOwnProperty("episodeNumber")
    ? //-------------------------------------------Home Page----------------------------------------
      (card.innerHTML += `<div class="card-body ">
  <h4 class="card-title f-0-8rem">${ele.title}</h4>
  <p class="card-text">Eps. ${ele.episodeNumber}</p>
  
  <a href="${ele.url}">
  </div>`)
    : ele.hasOwnProperty("releaseDate")
    ? //----------------------------------------Search Page--------------------------------

      (card.innerHTML += `<div class="card-body ">
    <h4 class="card-title f-0-8rem">${ele.title}</h4>
    <p class="card-text">${ele.releaseDate}</p>
    
    <a href="${ele.url}">
    </div>`)
    : ele.hasOwnProperty("latestEp")
    ? //-------------------------------------------Recent Page--------------------------------------

      (card.innerHTML += `<div class="card-body ">
    <h4 class="card-title f-0-8rem">${ele.title}</h4>
    <p class="card-text"> ${ele.latestEp}</p>
    
    <a href="${ele.url}">
    </div>`)
    : ele.hasOwnProperty("genres")
    ? (card.innerHTML += `
    <div class="card-body ">
    <h4 class="card-title f-0-8rem">${ele.title}</h4>
    <p class="card-text"> 
    <span class="text-dark badge bg-warning category">${ele.genres[0]}</span>
    <span class="text-dark badge bg-warning category">${ele.genres[1]}</span>
    <span class="text-dark badge bg-warning category">${ele.genres[2]}</span>
    </p>    
    <a href="${ele.url}">
    </div>
    `)
    : console.log("error");

  // var variable = (condition) ? (true block) : ((condition2) ? (true block2) : (else block2))
  home.appendChild(card);
}

function _404() {
  return `
    <div class="error-page">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>Sorry, the page you're looking for can't be found.</p>
    <a href="index.html">Go Home</a>
    <p>If still found this page then server might be down</p>

  </div>
<style>
    `;
}

home.addEventListener("load", homepage());
