let recipes = [];

fetch('recipes.json')
  .then((res) => res.json())
  .then((data) => {
    recipes = data;
  });

document.getElementById('pickRecipes').addEventListener('click', () => {
  const container = document.getElementById('recipes');
  container.innerHTML = '';

  const shuffled = [...recipes].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 5);

  selected.forEach((recipe) => {
    const div = document.createElement('div');
    div.className = 'recipe';

    const header = document.createElement('div');
    header.className = 'recipe-header';
    header.textContent = recipe.title;

    const content = document.createElement('div');
    content.className = 'recipe-content';

    content.innerHTML = `
      <strong>Ingredients:</strong>
      <ul>${recipe.ingredients.map((i) => `<li>${i}</li>`).join('')}</ul>
      <strong>Instructions:</strong>
      <p>${recipe.instructions}</p>
    `;

    header.addEventListener('click', () => {
      content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });

    div.appendChild(header);
    div.appendChild(content);
    container.appendChild(div);
  });
});
