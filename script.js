const themeToggle = document.querySelector(".theme-toggle");
const promptInput = document.querySelector(".prompt-input");
const promptBtn = document.querySelector(".prompt-btn");
const promptForm = document.querySelector(".prompt-form");
const modelSelect = document.getElementById("model-select");
const countSelect = document.getElementById("count-select");
const ratioSelect = document.getElementById("ratio-select");
const gridGallery = document.querySelector(".gallery-grid");

const examplePrompts = [
  " Une forêt magique aux plantes lumineuses et aux maisons de fées parmi des champignons géants ",
  " Un vieux dirigeable steampunk flottant à travers des nuages ​​dorés au coucher du soleil ",
  " Une colonie martienne du futur avec des dômes de verre et des jardins sur fond de montagnes rouges ",
  " Un dragon dormant sur des pièces d'or dans une grotte de cristal ",
  " Un royaume sous-marin peuplé de sirènes et de bâtiments coralliens lumineux ",
  " Une île flottante avec des cascades se jetant dans les nuages ​​en contrebas ",
  " La maison d'une sorcière en automne, avec des herbes magiques dans le jardin ",
  " Un robot peignant dans un atelier ensoleillé, entouré de matériel d'artiste ",
  " Une bibliothèque magique avec des livres lumineux flottants et des escaliers en colimaçon ",
  " Un sanctuaire japonais pendant la saison des cerisiers en fleurs, avec des lanternes et des montagnes brumeuses ",
  " Une plage cosmique au sable lumineux et aux aurores boréales ",
  " Un marché médiéval avec des tentes colorées et des artistes de rue ",
  " Une ville cyberpunk avec des enseignes au néon et des voitures volantes la nuit ",
  " Une paisible forêt de bambous avec un temple ancien caché ",
  " Une tortue géante transportant un village sur son dos dans l'océan ",
];

// Appliquer le thème au chargement
(() => {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const isDarkTheme =
    savedTheme === "dark" || (!savedTheme && systemPrefersDark);
  document.body.classList.toggle("dark-mode", isDarkTheme);
  themeToggle.querySelector("i").className = isDarkTheme
    ? "fa-solid fa-sun"
    : "fa-solid fa-moon";
})();

// Switcher le thème
const toggleTheme = () => {
  const isDarkTheme = document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
  themeToggle.querySelector("i").className = isDarkTheme
    ? "fa-solid fa-sun"
    : "fa-solid fa-moon";
};

const createImageCards = (
  selectedModel,
  imageCount,
  aspectRatio,
  promptText
) => {
  gridGallery.innerHTML = "";

  // Calculer le ratio pour le CSS
  const [width, height] = aspectRatio.split('x');
  const ratioValue = width / height;
  
  for (let i = 0; i < imageCount; i++) {
    const card = document.createElement('div');
    card.className = 'img-card loading';
    card.id = `img-card-${Date.now() + i}`;
    
    // Appliquer le style inline POUR SURCHARGER le CSS
    card.style.aspectRatio = `${width} / ${height}`;
    card.style.width = '100%'; // S'assurer qu'il prend toute la largeur disponible
    
    card.innerHTML = `
      <div class="status-container">
        <div class="spinner"></div>
        <i class="fa-solid fa-triangle-exclamation"></i>
        <p class="status-text">Taille: ${aspectRatio}</p>
        <p>En cours...</p>
      </div>
      <img src="test.png" alt="" class="result-img">
      <div class="img-overlay">
        <button class="img-download-btn">
          <i class="fa-solid fa-download"></i>
        </button>
      </div>`;
    
    gridGallery.appendChild(card);
  }
  
  // Forcer un redimensionnement pour s'assurer que le CSS est appliqué
  setTimeout(() => {
    gridGallery.style.display = 'none';
    gridGallery.offsetHeight; // Trigger reflow
    gridGallery.style.display = 'grid';
  }, 10);
};

const handleFormSubmit = (e) => {
  e.preventDefault();

  const selectedModel = modelSelect.value;
  const imageCount = parseInt(countSelect.value) || 1;
  const aspectRatio = ratioSelect.value || "512x512";
  const promptText = promptInput.value.trim();

  // Validation
  if (!selectedModel) {
    alert("Veuillez sélectionner un modèle.");
    modelSelect.focus();
    return;
  }
  
  if (!countSelect.value) {
    alert("Veuillez sélectionner le nombre d'images.");
    countSelect.focus();
    return;
  }
  
  if (!aspectRatio) {
    alert("Veuillez sélectionner une taille.");
    ratioSelect.focus();
    return;
  }

  if (!promptText) {
    alert("Veuillez saisir une description pour générer l'image.");
    promptInput.focus();
    return;
  }

  console.log("Génération avec:", {
    modèle: selectedModel,
    images: imageCount,
    taille: aspectRatio
  });

  // code pour envoyer les données au backend ou à l'API
  createImageCards(selectedModel, imageCount, aspectRatio, promptText);
};

// Ajouter un prompt aléatoire
promptBtn.addEventListener("click", (e) => {
  e.preventDefault(); // ← CECI EST LA LIGNE IMPORTANTE
  const prompt =
    examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
  promptInput.value = prompt;
  promptInput.focus();
});

promptForm.addEventListener("submit", handleFormSubmit);
themeToggle.addEventListener("click", toggleTheme);