// Função para criar o header
async function createHeader() {
    const header = document.createElement('header');
    header.id = 'header';
    header.classList.add('header');

    // Botão de menu toggle
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '&#9776;';

    // Div da logo
    const logoDiv = document.createElement('div');
    logoDiv.className = 'logo';
    const logoImg = document.createElement('img');
    logoImg.src = 'images/logo.png';
    logoImg.alt = 'RAAZZ';
    logoDiv.appendChild(logoImg);

    // Navegação
    const nav = document.createElement('nav');
    const ul = document.createElement('ul');
    ul.className = 'nav-menu';

    // Verifica se usuário está logado para mostrar/esconder links
    const currentUser = checkLogin();
    const links = [
        { href: 'landing-pg.html', text: 'Inicio' },
        { href: 'car-list.html', text: 'Catalogo' },
        { href: '#suporte', text: 'Suporte' }
    ];

    // Adiciona link de favoritos apenas se estiver logado
    if (currentUser) {
        links.push({ href: 'favoritos.html', text: 'Favoritos' });
    }

    links.forEach(link => {
        const li = document.createElement('li');
        li.className = 'nav-item';
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.text;
        a.className = 'nav-link';
        li.appendChild(a);
        ul.appendChild(li);
    });

    nav.appendChild(ul);

    // Div de login e registro
    const loginRegDiv = document.createElement('div');
    loginRegDiv.className = 'login-reg-div';

    if (currentUser) {
        // Se estiver logado, mostra email e botão de logout
        const userEmail = document.createElement('span');
        userEmail.textContent = currentUser.email;
        userEmail.className = 'user-email';

        const logoutBtn = document.createElement('button');
        logoutBtn.textContent = 'Logout';
        logoutBtn.className = 'logout-button';
        logoutBtn.onclick = logout;
        
        loginRegDiv.appendChild(userEmail);
        loginRegDiv.appendChild(logoutBtn);
    } else {
        // Se não estiver logado, mostra botões de login e registro
        const botaoLogin = document.createElement('button');
        botaoLogin.id = 'botaoLogin';
        botaoLogin.textContent = 'Login';
        botaoLogin.className = 'login-button';
        botaoLogin.onclick = () => window.location.href = "login.html";

        const botaoRegistro = document.createElement('button');
        botaoRegistro.id = 'botaoRegistro';
        botaoRegistro.textContent = 'Registro';
        botaoRegistro.className = 'register-button';
        botaoRegistro.onclick = () => window.location.href = "register.html";

        loginRegDiv.appendChild(botaoLogin);
        loginRegDiv.appendChild(botaoRegistro);
    }

    // Adicionar todos os elementos ao header
    header.appendChild(menuToggle);
    header.appendChild(logoDiv);
    header.appendChild(nav);
    header.appendChild(loginRegDiv);

    // Adicionar o header ao corpo do documento
    document.body.prepend(header);

    // Evento para alternar menu (toggle menu)
    menuToggle.addEventListener('click', () => {
        ul.classList.toggle('active');
    });
}

// Função para esconder/mostrar o header ao rolar
async function handleScroll() {
    let lastScrollY = window.scrollY;
    const header = document.getElementById('header');
    let timeoutId;

    window.addEventListener('scroll', () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            if (window.scrollY > lastScrollY) {
                header.classList.add('hide');
            } else {
                header.classList.remove('hide');
            }
            lastScrollY = window.scrollY;
        }, 300);
    });
}

// Função para criar o footer
async function createFooter() {
    const footer = document.createElement("footer");

    const logoDiv = document.createElement("div");
    logoDiv.className = "logo-2";

    const logoImg = document.createElement("img");
    logoImg.src = "images/logo.png";
    logoImg.alt = "RAAZZ";
    logoDiv.appendChild(logoImg);

    const nav = document.createElement("nav");
    const ul = document.createElement("ul");

    const links = [
        { href: "#contato", text: "Contato" },
        { href: "#sobre", text: "Sobre a RAAZZ" },
        { href: "#suporte", text: "Suporte" },
        { href: "#catalogo", text: "Catálogo" }
    ];

    links.forEach(link => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = link.text;
        li.appendChild(a);
        ul.appendChild(li);
    });

    nav.appendChild(ul);
    footer.appendChild(logoDiv);
    footer.appendChild(nav);
    document.body.appendChild(footer);
}

// Função para obter dados dos carros
async function obterDadosCarros() {
    try {
        const resposta = await fetch('JSON/carros.json');
        if (!resposta.ok) {
            throw new Error('Erro ao buscar os dados: ' + resposta.statusText);
        }
        return await resposta.json();
    } catch (erro) {
        console.error('Erro ao obter dados dos carros:', erro);
        return null;
    }
}

// Tornar funções globais
globalThis.obterDadosCarros = obterDadosCarros;

// Executar funções de inicialização
createHeader();
createFooter();
handleScroll();