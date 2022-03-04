const mealDetailsContent = document.querySelector('.meal-details-content');

console.log(window.location.href);

function fetchRecipe() {
  var url = window.location.href;
  var id = url.substring(url.lastIndexOf("=") + 1);
  // alert(id);

  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((data) => {
      html = "";
      if (data.meals) {
        // createFavItem(data);
        console.log("hello ", data.meals);
        data.meals.forEach((meal) => {
          html += `
           <div class = "meal-details-content">
          <h2 class = "recipe-title">${meal.strMeal}</h2>
          <p class = "recipe-category">${meal.strCategory}</p>
          <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
          </div>
          <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "Recipe">
          </div>
          <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
          </div>
        </div>
            `;
        });
        
        mealDetailsContent.innerHTML = html;
        mealDetailsContent.parentElement.classList.add('showRecipe');
      }
    });
}

fetchRecipe();