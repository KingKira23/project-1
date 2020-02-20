// using Cocktail DB api to request a random cocktail:

let randomCocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php?api-key=1";
let searchCocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?api-key=1&s=";
// let youtubeAPIKey = "AIzaSyC1DlLmv-ouNQJzBC-RC-jYzsLttiPumR0";

let ingredientsArr = [];

//get random cocktail
$.ajax({
    url: randomCocktailURL,
    method: "GET"
  })
    .then(function (response) {
        //console.log(response.drinks[0]);
        //destructure the response object to discrete variables to use or display to the user
        ({ idDrink, strDrink: drinkName, strInstructions: instructions, strDrinkThumb } = response.drinks[0]);
        buildIngredientsArray(response.drinks[0]);
});

//get specific cocktail
let searchURL = searchCocktailURL + "Audios motherfucker";

$.ajax({
    url: searchURL,
    method: "GET"
  })
    .then(function (response) {
        console.log(response);
        //destructure the response object to discrete variables to use or display to the user
        //({ idDrink, strDrink: drinkName, strInstructions: instructions, strDrinkThumb } = response.drinks[0]);
        //console.log(idDrink, name, instructions);
        //buildIngredientsArray(response.drinks[0]);
    });

function setIngredients(ingredientsArray) {
  ingredientsArray.forEach(function(value, index) {
    $("#cocktailIngredients").append(`<li>${value[0]} - ${value[1]}.</li>`);
  })
}

function buildIngredientsArray(drinkObj){
  ingredientsArr = [];
  for (let i = 1; i < 15; i++){
    let ingredient = "strIngredient" + i;
    let measurement = "strMeasure" + i;
    if (drinkObj[ingredient] === null){
      return;
    }
    ingredientsArr.push([drinkObj[ingredient], drinkObj[measurement]]);    
  }
  //console.log(ingredientsArr);
  setIngredients(ingredientsArr);
}

function setVid() {
  videoURL += videoId;
  let nextVideo = $(`<iframe width="100%" height="100%" src=${videoURL} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
  $("#carouselOne").append(nextVideo);
  

}

//adds content to the page 
function displayTheCocktail(){

}

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});

let searchName = name;
let youtubeAPIKey = "AIzaSyC1DlLmv-ouNQJzBC-RC-jYzsLttiPumR0";

let videoSearchURL = "https://www.googleapis.com/youtube/v3/search?maxResults=5&part=snippet&q=" + searchName + "+cocktails+recipe&key=" + youtubeAPIKey;

let videoURL = "https://www.youtube.com/embed/";

$.ajax({
  url: videoSearchURL,
  method: "GET"
})
.then(function (response) {
  videoId = response.items[2].id.videoId;
  setVid();
});

var instance = M.Carousel.init({
  fullWidth: true,
  indicators: true
});
