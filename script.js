const API_KEY = "275d58779ccf4e22af03e792e8819fff";
const recipeList = document.getElementById("recipe-list");
const loadMoreBtn = document.getElementById("load-more");

let currentRecipes = [];

async function getRecipes(number = 6) {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random?number=${number}&apiKey=${API_KEY}`
  );
  const data = await response.json();
  return data.recipes;
}

function displayRecipes(recipes, append = false) {
  if (!append) {
    recipeList.innerHTML = "";
    currentRecipes = [];
  }

  recipes.forEach(recipe => {
    currentRecipes.push(recipe);
    const li = document.createElement("li");
    li.className = "recipe-item";

    const img = document.createElement("img");
    img.src = recipe.image;

    const title = document.createElement("h2");
    title.textContent = recipe.title;

    const ingredients = document.createElement("p");
    ingredients.innerHTML =
      "<strong>Ingredients:</strong> " +
      recipe.extendedIngredients
        .map(i => i.original)
        .join(", ");

    const link = document.createElement("a");
    link.href = recipe.sourceUrl;
    link.target = "_blank";
    link.textContent = "View Recipe";

    li.append(img, title, ingredients, link);
    recipeList.appendChild(li);
  });
}

async function init() {
  const recipes = await getRecipes();
  displayRecipes(recipes);
}

loadMoreBtn.addEventListener("click", async () => {
  loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
  loadMoreBtn.disabled = true;
  const recipes = await getRecipes(6);
  displayRecipes(recipes, true);
  loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Recipes';
  loadMoreBtn.disabled = false;
});

init();