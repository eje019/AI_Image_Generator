const themeToggle = document.querySelector('.theme-toggle');

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

themeToggle.addEventListener('click', toggleTheme);