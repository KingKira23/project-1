// using Cocktail DB api to request a random cocktail:

let randomCocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php?api-key=1";

//get random cocktail
$.ajax({
  url: randomCocktailURL,
  method: "GET"
})
  .then(function (response) {
    console.log(response.drinks[0]);
    //destructure the response object to discrete variables to use or display to the user
    ({ idDrink, strDrink: name, strInstructions: instructions, strDrinkThumb } = response.drinks[0]);
    console.log(idDrink, name, instructions);
  });


//@@todo - response object has 15 ingredient properties and 15 corresponding measurement properties. Need to write a function to pair these up and omit all 'null' values
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});

var instance = M.Carousel.init({
  fullWidth: true,
  indicators: true
});
