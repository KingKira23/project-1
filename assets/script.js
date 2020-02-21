// using Cocktail DB api to request a specific cocktail:
$("form").on("submit", function (event) {
  event.preventDefault()

  let userSearch = $("#search").val()
  // $("input").empty()

  cocktail(userSearch)
  
})
// let userSearch = userInput
// console.log(userSearch)

let randomCocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php?api-key=1";
let searchCocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?api-key=1&s=";
//let youtubeAPIKey = "AIzaSyC1DlLmv-ouNQJzBC-RC-jYzsLttiPumR0";
let youtubeAPIKey = "AIzaSyDAHB6N3SeKwl3z3xVIV1DOTwqp3gTAxa8";

function Cocktail(name, id, ingredients, instructions, img) {
  this.name = name;
  this.id = id;
  this.ingredients = ingredients;
  this.instructions = instructions;
  this.image = img;
}

// for Searchbar
function getDrinkName() {
  $("#search").val();
}

//get random cocktail
$.ajax({
  url: randomCocktailURL,
  method: "GET"
})
  .then(function (response) {
    //destructure the response object to discrete variables to use or display to the user
    ({ idDrink, strDrink: drinkName, strInstructions: instructions, strDrinkThumb } = response.drinks[0]);
    let ingredientArr = buildIngredientsArray(response.drinks[0]);
    let nextDrink = new Cocktail(drinkName, idDrink, ingredientArr, instructions, strDrinkThumb);
    displayTheCocktail(nextDrink);
  });

//get specific cocktail
function cocktail(userSearch) {

  let searchURL = searchCocktailURL + userSearch;
  $.ajax({
    url: searchURL,
    method: "GET"
  })
    .then(function (response) {
      //destructure the response object to discrete variables to use or display to the user
      ({ idDrink, strDrink: drinkName, strInstructions: instructions, strDrinkThumb } = response.drinks[0]);
      let ingredientArr = buildIngredientsArray(response.drinks[0]);
      let nextDrink = new Cocktail(drinkName, idDrink, ingredientArr, instructions, strDrinkThumb);
      displayTheCocktail(nextDrink);
    });
}

function buildIngredientsArray(drinkObj) {
  let ingredientsArr = [];
  for (let i = 1; i < 15; i++) {
    let ingredient = "strIngredient" + i;
    let measurement = "strMeasure" + i;
    if (drinkObj[ingredient] === null) {
      return ingredientsArr;
    }
    ingredientsArr.push([drinkObj[ingredient], drinkObj[measurement]]);
  }
}

function setVid(videoId) {
  let videoURL = "https://www.youtube.com/embed/";
  videoURL += videoId;
  let carouselTile = $("<div>");
  carouselTile.attr("class", "carousel-item");
  let nextVideo = 
  $(`<iframe width="100%" height="100%" src=${videoURL} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
  $("#carouselOne").append(carouselTile); 
  carouselTile.append(nextVideo);
  console.log(carouselTile);


}

//adds content to the page 
function displayTheCocktail(drinkObj){
  var cocktailheading= $("#cocktailhead").text(drinkObj.name);
  $("#ingredients").text(drinkObj.ingredients);
  $("#instruction").text(drinkObj.instructions);
  function displayingredients(){
    for (i=0; i < drinkObj.ingredients.length; i++){
      //console.log(drinkObj.ingredients[i]);
      var ingredientname= drinkObj.ingredients[i][0];
      var ingredientmeasure= drinkObj.ingredients[i][1];
      if (ingredientmeasure===null) {
        ingredientmeasure= "to-taste"
      }
      $("#ingredients").append(ingredientname);
      $("#instruction").append(ingredientmeasure);
    }
  }
  $("#cocktailimg").attr("src", drinkObj.image);

  displayingredients();
  getVideos(drinkObj.name);
}

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});


function getVideos(name) {

  let videoSearchURL = "https://www.googleapis.com/youtube/v3/search?maxResults=5&part=snippet&q=" + name + "+cocktails+recipe&key=" + youtubeAPIKey;


  $.ajax({
    url: videoSearchURL,
    method: "GET"
  })
  .then(function (response) {
    for (let i = 0; i < 5; i++){
      let videoId = response.items[i].id.videoId;
      setVid(videoId);
    }
    $('.carousel').carousel({
      fullWidth: true,
      indicators: true
    });

  });
  
  var instance = M.Carousel.init({
    fullWidth: true,
    indicators: true
  });
  
}

$(document).on("click", ".drinkBtn", function(response) {
  let drinkName = $(this).text();
  localStorage.setItem("drinkName", drinkName); 
  window.location.href="./assets/cocktails.html";
});
