// Função para criar o header
async function createHeader() {
    // Criar o elemento
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

    const links = [
        { href: 'landing-pg.html', text: 'Inicio' },
        { href: 'car-list.html', text: 'Catalogo' },
        { href: '#suporte', text: 'Suporte' },
        { href: 'favorites.html', text: 'Favoritos' },
    ];

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

    const botaoLogin = document.createElement('button');
    botaoLogin.id = 'botaoLogin';
    botaoLogin.textContent = 'Login';
    botaoLogin.className = 'login-button';

    const botaoRegistro = document.createElement('button');
    botaoRegistro.id = 'botaoRegistro';
    botaoRegistro.textContent = 'Registro';
    botaoRegistro.className = 'register-button';

    loginRegDiv.appendChild(botaoLogin);
    loginRegDiv.appendChild(botaoRegistro);

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

// Função para esconder/mostrar o header ao rolar a página (com debounce)
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
                // Scroll para baixo - esconder o header
                header.classList.add('hide');
            } else {
                // Scroll para cima - mostrar o header
                header.classList.remove('hide');
            }
            lastScrollY = window.scrollY;
        }, 300);
    });
}


async function createFooter() {
    const footer = document.createElement("footer");

    // Creating the logo container
    const logoDiv = document.createElement("div");
    logoDiv.className = "logo-2";

    const logoImg = document.createElement("img");
    logoImg.src = "images/logo.png";
    logoImg.alt = "RAAZZ"; // Logo da empresa
    logoDiv.appendChild(logoImg);

    // Creating the navigation
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

    // Appending the logo and navigation to the footer
    footer.appendChild(logoDiv);
    footer.appendChild(nav);

    // Appending the footer to the body
    document.body.appendChild(footer);
}


// Função para obter dados do carros.json de forma global
async function obterDadosCarros() {
    try {
      // Fazendo uma requisição para obter o arquivo carros.json
      const resposta = await fetch('JSON/carros.json');
      
      // Verificando se a requisição foi bem-sucedida
      if (!resposta.ok) {
        throw new Error('Erro ao buscar os dados: ' + resposta.statusText);
      }
  
      // Convertendo a resposta para JSON
      const dados = await resposta.json();
      
      // Retornando os dados para serem usados
      return dados;
    } catch (erro) {
      console.error('Erro ao obter dados dos carros:', erro);
      return null;
    }
  }
  
  // Exemplo de como tornar essa função acessível globalmente
  globalThis.obterDadosCarros = obterDadosCarros;


// Executar as funções
createHeader();
createFooter();
handleScroll();




function goToCarList() {
    window.location.href = "car-list.html";
}
