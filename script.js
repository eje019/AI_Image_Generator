const themeToggle = document.querySelector('.theme-toggle');

//switcher le thème et l'icône
const toggleTheme = () => {
    const isDarkTheme = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    themeToggle.querySelector('i').className = isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";
}

themeToggle.addEventListener('click', toggleTheme);