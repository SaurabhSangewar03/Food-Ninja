//fetching the favourite item ids from local storage and converting it into an array
let item = window.localStorage.getItem("meal-favourites").split(/(\s+)/);
item.filter(function (e) {
  return e.trim().length > 0;
});
//fetching all the favourite meals from ids stored in local storage
for (let id of item) {
  getMeal(id);
}


//this function fetches a meal with a specific id
function getMeal(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(response => response.json())
    .then(data => {
      if (data.meals) {
        createFavItem(data);
      }
    });
}

function createFavItem(res) {
  for (res of res.meals) {
    // HTML code for the individual search result/food item
    var foodItem = `<div class="meal-item">
    <div class="meal-img">
      <img src="${res.strMealThumb}" alt="Recipe">
    </div>
    <div class="meal-name">
      <h3>${res.strMeal}</h3>
    </div>
    <div class="buttons">
    <button type="submit" class="recipe-btn"> 
    <a href="mealDetails.html?id=${res.idMeal}" value="${res.idMeal}"> 
      <span><i class="fa-regular fa-file-lines"></i>
      </span> Get Recipe </a>
  </button>
  <button type="submit" class="favorite-button" id="${res.idMeal}"> <span><i class="fa-solid fa-xmark"></i></span> Remove Favourite
  </button>
    </div>    
  </div>`;
    // appending the result to the root 'recipie-list' div
    let recipieList = document.getElementById("favouriteMeal");
    recipieList.innerHTML = foodItem + recipieList.innerHTML;
  }
}





//handling click event on the 'favourite-button' to unmark an item as favourite
document.body.addEventListener("click", function (event) {
  //if the targeted div is 'favourite-button'
  if (event.target.getAttribute("class") == "favorite-button") {
    //finding the id of the current food item
    let id = event.target.getAttribute("id");
    //finding it's index in the item array
    let index = item.indexOf(id);

    //removing item from the array
    item.splice(index, 1);

    //creating the updated list of favourite items in a space sperated string
    let items = "";
    for (let i of item) {
      items = items + " " + i;
    }
    //storing the updated string in local storage
    window.localStorage.setItem("meal-favourites", items);
    
    //refreshing the page
    location.reload();
  }
});
