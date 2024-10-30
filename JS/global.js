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
        { href: 'favoritos.html', text: 'Favoritos' },
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

    botaoLogin.addEventListener("click", () => {
        window.location.href = "login.html";
    })

    const botaoRegistro = document.createElement('button');
    botaoRegistro.id = 'botaoRegistro';
    botaoRegistro.textContent = 'Registro';
    botaoRegistro.className = 'register-button';

    botaoRegistro.addEventListener("click", () => {
        window.location.href = "register.html";
    })

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

//sessão de login



function registerUser() { //função para registro de usuário

    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("password").value;
    
    if (email && password) { // se o email e usuário foram preenchidos ele salva os dados em local storage
        const user = {
            email: email,
            password: password
        }
        localStorage.setItem("user", JSON.stringify(user));
        alert('usuario registrado com suceso')
    } else {
        alert('erro ao registrar')
    }
}

function loginUser() { //função para login do usuário
    
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("password").value;

    const storedUser = JSON.parse(localStorage.getItem("storedUser")) //cria uma variável que puxa o usuário criado no local storage

    if (storedUser) {
        if (email == storedUser.email && password == storedUser.password) { //compara a entrada de login do usuário com as informações salvas
            alert("bem vindo a RAAZZ");
            window.location.href = "car-list.html"; //direciona o usuário para o restante do site
        } else {
            alert("senha ou email incorretos")
        }
    } else {
        alert("usuario nao encontrado");
    }

    if(storedUser) {
        links.push({href: 'favoritos.html', text: 'Favoritos'});
    }
    if(!storedUser) {
        window.location.href = "login.html";
    }
}