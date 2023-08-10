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
  try{
  home.innerHTML = "";
  pageNo += n;
  if (pageNo < 1) pageNo = 10;
  if (pageNo > 10) pageNo = 1;
  console.log(pageNo);
  $("#page").html(pageNo);
  let response = await fetch(`${currentLink}` + pageNo);

  data = await response.json();

  data.forEach((ele) => {
    createCard(ele);
  });

  console.log(currentLink, pageNo);}
  catch{
    home.innerHTML=_404()
  }
}

// Home Page
async function homepage() {
  try
  {home.innerHTML = "";
  reset();
  let response = await fetch(
    `https://gogoanime.consumet.stream/recent-release`
  );

  data = await response.json();
  data.forEach((ele) => {
    createCard(ele);
  });
  currentLink = `https://gogoanime.consumet.stream/recent-release?type=1&page=`;}
  catch {
    home.innerHTML=_404()
  }
}
// Popular Page
async function popularpage() {
 
 try{ reset();
  home.innerHTML = "";
  let response = await fetch(
    "https://gogoanime.consumet.stream/popular?type=1&page=" + pageNo
  );

  data = await response.json();
  data.forEach((ele) => {
    createCard(ele);
  });
  currentLink = `https://gogoanime.consumet.stream/popular?type=1&page=`;}
  catch{
    home.innerHTML=_404()
  }
}
// Movies page
async function moviespage() {
  try{
  reset();
  home.innerHTML = "";
  let response = await fetch(
    "https://gogoanime.consumet.stream/anime-movies?page=" + pageNo
  );

  data = await response.json();
  data.forEach((ele) => {
    createCard(ele);
  });
  currentLink = `https://gogoanime.consumet.stream/anime-movies?page=`;}
  catch{
    home.innerHTML=_404()
  }
}
// Recent Page
async function recentpage() {
  try {reset();
  home.innerHTML = "";
  let response = await fetch(
    "https://gogoanime.consumet.stream/top-airing?page=" + pageNo
  );

  data = await response.json();
  data.forEach((ele) => {
    createCard(ele);
  });
  currentLink = `https://gogoanime.consumet.stream/top-airing?page=`;}
  catch{
    home.innerHTML=_404()
  }
}
// search page
async function searchpage() {
  try{reset();
  home.innerHTML = "";
  let response = await fetch(
    `https://api.consumet.org/anime/gogoanime/${search.value}&page=` + pageNo
  );

  data = await response.json();
  data.forEach((ele) => {
    createCard(ele);
  });

  if (data.length==0){
    console.log("Yes");
    home.innerHTML=`didn't Find What You are Searching For`
  }
  $(".next").hide();
  $(".prev").hide();
  $('.pageNo').hide()}
  catch{
    home.innerHTML=_404()
  }
}

//---------------------------------- category click event handler------------------------------------
$(".category").click(async function (e) {
  try{
  reset();
  let genre = e.currentTarget.innerHTML.toLowerCase();
  home.innerHTML = "";
  let response = await fetch(`https://gogoanime.consumet.stream/genre/${genre}`);

  data = await response.json();
  data.forEach((ele) => {
    createCard(ele);
  });}
  catch{
    home.innerHTML=_404()
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
      <img class="card-img-top img-fit" src="${ele.animeImg}" alt="${ele.animeId}" >
      
                        `;
  ele.hasOwnProperty("episodeNum")
    ? //-------------------------------------------Home Page----------------------------------------
      (card.innerHTML += `<div class="card-body ">
  <h4 class="card-title f-0-8rem">${ele.animeTitle}</h4>
  <p class="card-text">Eps. ${ele.episodeNum}</p>
  
  <a href="${ele.episodeUrl}">
  </div>`)
    : ele.hasOwnProperty("releasedDate")
    ? //----------------------------------------Movies & Popular Page--------------------------------

      (card.innerHTML += `<div class="card-body ">
    <h4 class="card-title f-0-8rem">${ele.animeTitle}</h4>
    <p class="card-text">Released Date<br> ${ele.releasedDate}</p>
    
    <a href="${ele.animeUrl}">
    </div>`)
    : ele.hasOwnProperty("latestEp")
    ? //-------------------------------------------Recent Page--------------------------------------

      (card.innerHTML += `<div class="card-body ">
    <h4 class="card-title f-0-8rem">${ele.animeTitle}</h4>
    <p class="card-text"> ${ele.latestEp}</p>
    
    <a href="${ele.animeUrl}">
    </div>`)
    : ele.hasOwnProperty("status")
    ? //-------------------------------------------Search Page-------------------------------------
      (card.innerHTML += `<div class="card-body ">
    <h4 class="card-title f-0-8rem">${ele.animeTitle}</h4>
    <p class="card-text"> ${ele.status}</p>
    
    <a href="${ele.animeUrl}">
    </div>`)
    : console.log("error");

  // var variable = (condition) ? (true block) : ((condition2) ? (true block2) : (else block2))
  home.appendChild(card);
}

function _404(){
  return (
    `
    <div class="error-page">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>Sorry, the page you're looking for can't be found.</p>
    <a href="index.html">Go Home</a>
    <p>If still found this page then server might be down</p>

  </div>
<style>
    `
  )
}

home.addEventListener("load", homepage());
