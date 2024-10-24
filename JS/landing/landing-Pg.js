function frase() {
  // Array de frases
  const frases = [
    "Encontre todas as informações que você precisa para fazer a escolha certa do seu primeiro carro.",
    "Escolher seu primeiro carro pode ser um desafio, mas estamos aqui para facilitar essa jornada.",
    "Quer fazer a escolha perfeita para o seu primeiro carro? Aqui você encontra todas as dicas e comparações.",
    "Não sabe por onde começar ao escolher seu primeiro carro? Nós temos as ferramentas para te ajudar."
  ];

  // Selecionar uma frase aleatória
  const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];

  // Exibir a frase no elemento com o ID 'subtitulo'
  const subtituloElement = document.getElementById("subtitulo");
  if (subtituloElement) {
    subtituloElement.textContent = fraseAleatoria;
  } else {
    console.error('Elemento #subtitulo não encontrado.');
  }
}

//togle-menu
function menu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  } else {
    console.error('Elemento .menu-toggle ou nav ul não encontrado.');
  }
}
menu();

//scroll
function scroll() {
  let lastScrollY = window.scrollY;
  const header = document.getElementById("header");

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > lastScrollY) {
        // Scroll para baixo - esconder o header
        header.classList.add("hide");
      } else {
        // Scroll para cima - mostrar o header
        header.classList.remove("hide");
      }
      lastScrollY = window.scrollY;
    });
  } else {
    console.error('Elemento #header não encontrado.');
  }
}
scroll();


function mostrarCarrosPopulares() {
  const carrosselContent = document.querySelector('.carros-populares .carrossel-content');

  // Verificar se o elemento existe
  if (!carrosselContent) {
    console.error('Elemento .carros-populares .carrossel-content não encontrado.');
    return;
  }

  // Carregar os dados do LocalStorage
  const carrosPopulares = JSON.parse(localStorage.getItem('carrosPopulares'));

  // Limpar qualquer conteúdo existente no carrossel
  carrosselContent.innerHTML = '';

  // Verificar se há carros para exibir
  if (carrosPopulares && carrosPopulares.length > 0) {
    carrosPopulares.forEach(carro => {
      // Criando o elemento do card
      const card = document.createElement('div');
      card.classList.add('carro-card');

      // Adicionando o conteúdo do carro
      card.innerHTML = `
        <div class="vehicle-card-info">
          <div class="vehicle-marca-nome">
            <h2 class="title-marca">\${carro.marca}</h2>
            <h2 class="title-name">\${carro.nome}</h2>
          </div>
          <p class="price">\${carro.preco}</p>
          <p class="details">\${carro.ano}</p>
        </div>
      `;

      // Adicionando o card ao carrossel
      carrosselContent.appendChild(card);
    });
  } else {
    carrosselContent.innerHTML = '<p>Nenhum carro disponível.</p>';
  }
}

function carregarDados() {
  if (!localStorage.getItem('carrosPopulares')) {
    fetch('carros.json')
      .then(response => response.json())
      .then(data => {
        // Armazena os dados no localStorage
        localStorage.setItem('carrosPopulares', JSON.stringify(data));

        // Chama a função para mostrar os carros
        mostrarCarrosPopulares();
      })
      .catch(error => {
        console.error('Erro ao carregar os dados:', error);
        const carrosselContent = document.querySelector('.carros-populares .carrossel-content');
        if (carrosselContent) {
          carrosselContent.innerHTML = '<p>Erro ao carregar os carros. Tente novamente mais tarde.</p>';
        }
      });
  } else {
    mostrarCarrosPopulares();
  }
}

// Chama a função carregarDados ao carregar a página
carregarDados();
