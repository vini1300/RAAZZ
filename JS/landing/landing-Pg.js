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
document.getElementById("subtitulo").textContent = fraseAleatoria;


// Função para carregar os dados do JSON e salvar no LocalStorage
function carregarDadosCarros() {
  fetch('JSON/carros.json') // Caminho relativo do JS para o JSON
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o arquivo JSON');
      }
      return response.json();
    })
    .then(carros => {
      // Armazenar no LocalStorage
      localStorage.setItem('carrosPopulares', JSON.stringify(carros));
      // Chamar a função para mostrar os carros
      mostrarCarrosPopulares();
    })
    .catch(error => {
      console.error('Erro ao buscar os dados dos carros:', error);
    });
}

// Chamando a função ao carregar a página

// Função para exibir os carros populares a partir do LocalStorage
function mostrarCarrosPopulares() {
  const carrosselContent = document.querySelector('.carros-populares .carrossel-content');

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
        <img src="${carro['img-thumb']}" alt="${carro.nome}" style="width:150px; height:150px">
        <div class="vehicle-card-info">
          <div class="vehicle-marca-nome">
            <h2 class="title-marca">${carro.marca}</h2>
            <h2 class="title-name">${carro.nome}</h2>
          </div>
          <p class="price">${carro.preco}</p>
          <p class="details">${carro.ano}</p>
        </div>
      `;

      // Adicionando o card ao carrossel
      carrosselContent.appendChild(card);
    });
  } else {
    carrosselContent.innerHTML = '<p>Nenhum carro disponível.</p>';
  }
}

// Chamar a função para carregar os dados e exibir os carros ao carregar a página
document.addEventListener('DOMContentLoaded', carregarDadosCarros);