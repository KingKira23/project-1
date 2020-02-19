// using Cocktail DB api to request a random cocktail:

let randomCocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php?api-key=1";
//let searchCocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php?api-key=1";
let ingredientsArr = [];

//get random cocktail
$.ajax({
    url: randomCocktailURL,
    method: "GET"
  })
    .then(function (response) {
        //console.log(response.drinks[0]);
        //destructure the response object to discrete variables to use or display to the user
        ({ idDrink, strDrink: name, strInstructions: instructions, strDrinkThumb } = response.drinks[0]);
        //console.log(idDrink, name, instructions);
        buildIngredientsArray(response.drinks[0]);
    });


    //@@todo - response object has 15 ingredient properties and 15 corresponding measurement properties. Need to write a function to pair these up and omit all 'null' values

function buildIngredientsArray(drinkObj){
  ingredientsArr = [];
  for (let i = 1; i < 15; i++){
    let ingredient = "strIngredient" + i;
    let measurement = "strMeasure" + i;
    if (drinkObj[ingredient] === null){
      return;
    }
    //console.log(drinkObj[ingredient]);
    ingredientsArr.push([drinkObj[ingredient], drinkObj[measurement]]);    
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});
