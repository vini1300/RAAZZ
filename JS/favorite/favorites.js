document.addEventListener("DOMContentLoaded", () => {
    const storedUser = JSON.parse(localStorage.getItem*(user));

    if(!storedUser) {
        window.location.href = "login.html";
    }
});