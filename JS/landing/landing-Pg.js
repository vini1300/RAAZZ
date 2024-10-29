function frase() {
  const frases = [
    "Encontre todas as informações que você precisa para fazer a escolha certa do seu primeiro carro.",
    "Escolher seu primeiro carro pode ser um desafio, mas estamos aqui para facilitar essa jornada.",
    "Quer fazer a escolha perfeita para o seu primeiro carro? Aqui você encontra todas as dicas e comparações.",
    "Não sabe por onde começar ao escolher seu primeiro carro? Nós temos as ferramentas para te ajudar."
  ];

  const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
  const subtituloElement = document.getElementById("subtitulo");
  if (subtituloElement) {
    subtituloElement.textContent = fraseAleatoria;
  } else {
    console.error('Elemento #subtitulo não encontrado.');
  }
}

function carregarDadosCarrosPaginaInicial() {
  obterDadosCarros() // Utiliza a função do JS global
    .then(carros => {
      if (carros) {
        // Armazenar no LocalStorage
        localStorage.setItem('carrosPopulares', JSON.stringify(carros));
        // Chamar a função para mostrar os carros
        mostrarCarrosPopulares();
      } else {
        console.error('Erro: Dados dos carros não disponíveis.');
      }
    })
    .catch(error => {
      console.error('Erro ao buscar os dados dos carros:', error);
    });
}

// Função para exibir os carros populares a partir do LocalStorage
function mostrarCarrosPopulares() {
  const carrosselContent = document.querySelector('.carros-populares .carrossel-content');

  const carrosPopulares = JSON.parse(localStorage.getItem('carrosPopulares'));

  carrosselContent.innerHTML = '';

  // Verificar se há carros para exibir
  if (carrosPopulares && carrosPopulares.length > 0) {
    carrosPopulares.slice(0, 10).forEach(carro => {

      const card = document.createElement('div');
      card.classList.add('carro-card');

      card.innerHTML = `
        <div class="vehicle-card-info">0
          <div class="vehicle-marca-nome">
            <h2 class="title-marca">${carro.marca}</h2>
            <h2 class="title-name">${carro.nome}</h2>
          </div>
          <img src="${carro.imagem}" alt="${carro.nome}" class="vehicle-image">
          <p class="price">${carro.preco}</p>
          <p class="details">${carro.ano}</p>
        </div>
      `;

      carrosselContent.appendChild(card);
    });
  } else {
    carrosselContent.innerHTML = '<p>Nenhum carro disponível.</p>';
  }
}



document.addEventListener('DOMContentLoaded', carregarDadosCarrosPaginaInicial);
