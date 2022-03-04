const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');


// Event listener for search button
searchBtn.addEventListener('click', getMealList);


// get meal list which we are search in search input.
function getMealList(){
  let searchInputTxt = document.getElementById('search-input').value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
  .then(response => response.json())
  .then(data => {
      let html = "";
      if(data.meals){
          data.meals.forEach(meal => {
              html += `
              <div class="meal-item" data-id = "${meal.idMeal}">
              <div class="meal-img">
                <img src="${meal.strMealThumb}" alt="Recipe">
              </div>
              <div class="meal-name">
                <h3>${meal.strMeal}</h3>
              </div>
              <div class="buttons">
                <button type="submit" class="recipe-btn button"> 
                <a href="mealDetails.html?id=${meal.idMeal}" value="${meal.idMeal}"> 
                <span><i class="fa-regular fa-file-lines"></i>
                </span> Get Recipe </a>
                </button>
                <button type="submit" onclick="functionToExecute(${meal.idMeal})" class="button"> 
                <span><i class="fa-solid fa-heart"></i></span> Add Favourite
                </button>
              </div>    
            </div>
              `;
          });
          mealList.classList.remove('notFound');
      } else{
          html = "Sorry, we didn't find any meal!";
          mealList.classList.add('notFound');
      }

      mealList.innerHTML = html;
  });
}

// fetch all recipe default when land on home page.
function fetchDefault() {
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    .then((Response) => Response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `<div class="meal-item" data-id = "${meal.idMeal}">
              <div class="meal-img">
                <img src="${meal.strMealThumb}" alt="Recipe">
              </div>
              <div class="meal-name">
                <h3>${meal.strMeal}</h3>
              </div>
              <div class="buttons">
                <button type="submit" class="recipe-btn button">
                <a href="mealDetails.html?id=${meal.idMeal}" value="${meal.idMeal}"> 
                <span><i class="fa-regular fa-file-lines"></i>
                </span> Get Recipe </a>
                </button>
                <button type="submit" onclick="functionToExecute(${meal.idMeal})" class="button"> 
                <span><i class="fa-solid fa-heart"></i></span> Add Favourite
                </button>
              </div>    
            </div>`;
        });
        mealList.innerHTML = html;
      }
    });
}

fetchDefault();




//if browser dosen't have 'meal-favourites' in local storage we create one
let fav = window.localStorage.getItem("meal-favourites");
if (!fav) {
  window.localStorage.setItem("meal-favourites", "");
}

function functionToExecute(id) {
  
  let items = window.localStorage.getItem("meal-favourites");

  //if id already present in local storage we do not add and return
  if (items.includes(id)) {
    window.alert("Already added to favourites!");
    return;
  }
  
  //appending the new id to the string
  items = items + " " + id;

  //updating the local storage
  window.localStorage.setItem("meal-favourites", items);
  window.alert("Item added to favourites");
}