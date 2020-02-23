
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

function drinkRange(drink) {
    
    let randyRange;
    switch (drink) {
        case "Tequila":
            randyRange = 19;
            break;
        case "Vodka":
            randyRange = 79;
            break;
        case "Rum":
            randyRange = 13;
            break;
        case "Gin":
            randyRange = 90;
            break;
        default:
            randyRange = 14;
            break;
    }
    return randyRange;
}


$.ajax({
    url: searchAlc,
    method: 'GET'
  }).then(function(ajaxResponse) {

    let randyRange = drinkRange(drinkName);
    let randyNum = Math.floor(Math.random() * randyRange) + 1;

    for (let i = 0; i < 4; i++) {
        let drinkId = ajaxResponse.drinks[i+randyNum].idDrink;
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
 
            $($(".carousel-item")[i]).css("background-image", `url(${drinkImg})`);
            genList(drinkObj[i])
        });
    }
});

let options = {
    fullWidth: true
}


function genList(obj) {
    $("#ingredients").empty();
    $("#ingredients").append(`<h3>${obj.name}</h3>`);
    $("#ingredients").append(`<li class='collection-item'>${obj.container}</li>`);
    obj.ingredients.forEach(function(elArr, i) {
        if (elArr[1] === null) {
            elArr[1] = "Your touch."
        }
        $("#ingredients").append(`<li class='collection-item'>${elArr[0]} : ${elArr[1]}`);
    });
    $("#ingredients").append(`<li class='collection-item'>${obj.instructions}</li>`);
}


document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, options);
    $(".carousel").css({"height": "400px"});
    
    let i = 0;
    document.addEventListener("keyup", function(event) {
        event.preventDefault();
        switch(event.keyCode) {
            case 39:
                instances[0].next();
                if (drinkObj.length) {
                    i++;
                    if (i >= 4) {
                        i = 0;
                    }    
                    genList(drinkObj[i]);
                }
                break;
            default:
                console.error("keyup eventListener");
                break;
        }
    });
});  

$(document).on("click", ".brand-logo", function(response) {
    window.location.href="../index.html";
});
