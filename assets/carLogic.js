

let drinkName = localStorage.getItem("drinkName");
let searchAlc = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + drinkName;

$.ajax({
    url: searchAlc,
    method: 'GET'
  }).then(function(ajaxResponse) {
    console.log(ajaxResponse);
})

