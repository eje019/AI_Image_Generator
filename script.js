const themeToggleBtn = document.querySelector('.theme-toggle');

//switcher le thème et l'icône
const toggleTheme = () => {
    const isDarkTheme = document.body.classList.toggle('dark-mode');
    themeToggleBtn.querySelector('i').className = isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";
}


themeToggleBtn.addEventListener('click', () => {

});