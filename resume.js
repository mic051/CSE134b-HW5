document.addEventListener('DOMContentLoaded', () => {
    console.log('print');
    let themeToggle = document.getElementById('themeToggle');
    let themeIcon = document.getElementById('themeIcon');
    let currentTheme = localStorage.getItem('data-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeIcon.src = "assets/sun-min.png";
    }

    else {
        themeIcon.src = "assets/moon.png";
    }

    themeToggle.addEventListener("click", () => {
        let newTheme = document.documentElement.getAttribute("data-theme");

        if (newTheme === "dark") {
            newTheme = "light";
        } 
        else {
            newTheme = "dark";
        }

        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("data-theme", newTheme);

        if (newTheme === 'dark') {
            themeIcon.src = "assets/sun-min.png";
        }
    
        else {
            themeIcon.src = "assets/moon.png";
        }
    });
});