const themeToggle = document.querySelector('.theme-toggle');
const promptInput = document.querySelector('.prompt-input');
const promptBtn = document.querySelector('.prompt-btn');


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

" Une tortue géante transportant un village sur son dos dans l'océan "];

//appliquer le thème au chargement de la page en fonction de la preference ou dus systeme
(() => {
    //vérifier le thème enregistré dans le localStorage
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; 
    
    const isDarkTheme = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    document.body.classList.toggle('dark-mode', isDarkTheme);
    themeToggle.querySelector('i').className = isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";
})();

//switcher le thème et l'icône
const toggleTheme = () => {
    const isDarkTheme = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    themeToggle.querySelector('i').className = isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";
}

//ajouter un prompt aléatoire dans le champ de saisie et le focusser
promptBtn.addEventListener('click', () => {
    const promptInput = document.getElementById('prompt-input');
    const prompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
    promptInput.value = prompt;
    promptInput.focus();
});

themeToggle.addEventListener('click', toggleTheme);