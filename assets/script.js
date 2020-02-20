// using Cocktail DB api to request a random cocktail:

let randomCocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php?api-key=1";
let searchCocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?api-key=1&s=";
// let youtubeAPIKey = "AIzaSyC1DlLmv-ouNQJzBC-RC-jYzsLttiPumR0";

function Cocktail(name, id, ingredients, instructions, img ) {
  this.name = name;
  this.id = id;
  this.ingredients = ingredients;
  this.instructions = instructions;
  this.image = img;
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
let searchURL = searchCocktailURL + "white russian";
$.ajax({
    url: searchURL,
    method: "GET"
  })
    .then(function (response) {
        console.log(response);
        //destructure the response object to discrete variables to use or display to the user
        ({ idDrink, strDrink: drinkName, strInstructions: instructions, strDrinkThumb } = response.drinks[0]);
        let ingredientArr = buildIngredientsArray(response.drinks[0]);
        let nextDrink = new Cocktail(drinkName, idDrink, ingredientArr, instructions, strDrinkThumb);
        displayTheCocktail(nextDrink);
  });

  function buildIngredientsArray(drinkObj){
    let ingredientsArr = [];
    for (let i = 1; i < 15; i++){
      let ingredient = "strIngredient" + i;
      let measurement = "strMeasure" + i;
      if (drinkObj[ingredient] === null){
        return ingredientsArr;
      }
      ingredientsArr.push([drinkObj[ingredient], drinkObj[measurement]]);    
    }
  }

    function setIngredients(ingredientsArray) {
  ingredientsArray.forEach(function(value, index) {
    $("#cocktailIngredients").append(`<li>${value[0]} - ${value[1]}.</li>`);
  })
}

function setVid(videoId) {
  let videoURL = "https://www.youtube.com/embed/";
  videoURL += videoId;
  let nextVideo = $(`<iframe width="100%" height="100%" src=${videoURL} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
  $("#carousel").append(nextVideo);
}

//adds content to the page 
function displayTheCocktail(drinkObj){

  getVideos(drinkObj.name);

}

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});


function getVideos(name){

  let videoSearchURL = "https://www.googleapis.com/youtube/v3/search?maxResults=5&part=snippet&q=" + name + "+cocktails+recipe&key=" + youtubeAPIKey;

  
  $.ajax({
    url: videoSearchURL,
    method: "GET"
  })
  .then(function (response) {
    let videoId = response.items[2].id.videoId;
    setVid(videoId);
  });

}



var instance = M.Carousel.init({
  fullWidth: true,
  indicators: true
});
