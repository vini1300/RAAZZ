// Funções de autenticação

function registerUser() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert('Por favor, preencha todos os campos');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido');
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const userExist = users.find(user => user.email === email);

    if (userExist) {
        alert('Este email já está registrado');
        return;
    }

    const newUser = {
        email: email,
        password: password,
        favorites: []
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert('Usuário registrado com sucesso!');
    window.location.href = 'login.html';
}

function loginUser() {
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert('Por favor, preencha todos os campos');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido');
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("Bem vindo à RAAZZ!");
        window.location.href = "car-list.html";
    } else {
        alert("Email ou senha incorretos");
    }
}

function checkLogin() {
    return JSON.parse(localStorage.getItem("currentUser"));
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = 'login.html';
}

function goToCarList() {
    window.location.href = "car-list.html";
}

// Função para alternar favoritos
function toggleFavorite(carId) {
    const user = checkLogin();
    if (!user) {
        alert('Faça login para adicionar favoritos');
        return;
    }

    if (!user.favorites) {
        user.favorites = [];
    }

    const index = user.favorites.indexOf(carId);
    if (index === -1) {
        user.favorites.push(carId);
    } else {
        user.favorites.splice(index, 1);
    }

    // Atualizar o usuário no localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex !== -1) {
        users[userIndex].favorites = user.favorites;
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(users[userIndex]));
    }

    alert('Favorito atualizado!');
}

// Tornar funções globais
globalThis.registerUser = registerUser;
globalThis.loginUser = loginUser;
globalThis.checkLogin = checkLogin;
globalThis.logout = logout;
globalThis.goToCarList = goToCarList;
globalThis.toggleFavorite = toggleFavorite;
