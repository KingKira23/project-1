
// Global Vars
let drinkName = localStorage.getItem("drinkName");
let searchAlc = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + drinkName;
var drinkObj = new Array();

//  Functions
function Cocktail(name, container, ingredients, instructions, img) {
    this.name = name;
    this.container = container;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.img = img;
}

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


$.ajax({
    url: searchAlc,
    method: 'GET'
  }).then(function(ajaxResponse) {
    for (let i = 0; i < 4; i++) {
        let drinkId = ajaxResponse.drinks[i].idDrink;
        let searchURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId;
        $.ajax({
            url: searchURL,
            method: "GET"
        })
        .then(function(response) {
            //destructure the response object to discrete variables to use or display to the user
            ({ strDrink: drinkName, strInstructions: instructions, strGlass: glass, strDrinkThumb: drinkImg } = response.drinks[0]);
            let ingredientArr = buildIngredientsArray(response.drinks[0]);
            drinkObj[i] = new Cocktail(drinkName, glass, ingredientArr, instructions, drinkImg);
        });
    }
});

console.log(drinkObj);

$(".carousel-item").each(function(index) {
    console.log(this, index);
    console.log(drinkObj);
    console.log(drinkObj[index]);
    //$(this).css("background-image", `url(${drinkObj[index].img})`);
});

let options = {
    fullWidth: true
}

// Slider
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, options);
    $(".carousel").css({"height": "400px"});
});  

var instance = M.Carousel.init({
    fullWidth: true,
    indicators: true
});

document.addEventListener("keyup", function(event) {
    event.preventDefault();
    switch(event.keyCode) {
        case 39:
            instance.next();
        case 37:
            instance.prev();
        default:
            console.error("keyup eventListener");
            return;
    }
});




