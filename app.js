let recipes = [];

async function loadRecipes() {
  const res = await fetch('recipes.json');
  recipes = await res.json();
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function renderRecipes(list) {
  const container = document.getElementById('recipeList');
  container.innerHTML = '';

  list.forEach((recipe) => {
    const card = document.createElement('div');
    card.className = 'recipe';

    const header = document.createElement('div');
    header.className = 'recipe-header';
    header.innerHTML = `${recipe.title} <span>▼</span>`;

    const content = document.createElement('div');
    content.className = 'recipe-content';

    content.innerHTML = `
<div class="recipe-content-inner">
<strong>Ingredients</strong>
<ul>
${recipe.ingredients.map((i) => `<li>${i}</li>`).join('')}
</ul>

<strong>Instructions</strong>
<p>${recipe.instructions}</p>
</div>
`;

    header.onclick = () => {
      const open = content.style.maxHeight;
      document.querySelectorAll('.recipe-content').forEach((c) => (c.style.maxHeight = null));

      if (!open) {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    };

    card.appendChild(header);
    card.appendChild(content);

    container.appendChild(card);
  });
}

document.getElementById('generateBtn').onclick = () => {
  const randomFive = shuffle([...recipes]).slice(0, 5);
  renderRecipes(randomFive);
};

loadRecipes();
