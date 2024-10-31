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

  if (carrosPopulares && carrosPopulares.length > 0) {
    carrosPopulares.slice(0, 10).forEach(carro => {
      const card = document.createElement('div');
      card.classList.add('card');

      const user = checkLogin();
      const isFavorite = user && user.favorites && user.favorites.includes(carro.id);

      const marca = document.createElement('h3');
      marca.classList.add('marca');
      marca.textContent = carro.marca;

      const titulo = document.createElement('h3');
      titulo.classList.add('titulo');
      titulo.textContent = carro.nome;

      const divTitle = document.createElement('div');
      divTitle.classList.add('title-div-card');
      divTitle.appendChild(marca);
      divTitle.appendChild(titulo);

      if (user) {
        const favButton = document.createElement('button');
        favButton.classList.add('fav-button');
        favButton.innerHTML = isFavorite ? '❤️' : '🤍';
        favButton.onclick = () => {
          toggleFavorite(carro.id);
          favButton.innerHTML = favButton.innerHTML === '🤍' ? '❤️' : '🤍';
        };
        divTitle.appendChild(favButton);
      }

      const detalhes = document.createElement('div');
      detalhes.classList.add('detalhes-card');
      detalhes.innerHTML = `
        <p>Ano: ${carro.ano}</p>
        <p>Preço: ${carro.preco}</p>`;

      card.onclick = (e) => {
        if (e.target.classList.contains('fav-button')) {
          return;
        }
        window.location.href = `car-info.html?id=${carro.id}`;
      };

      card.appendChild(divTitle);
      card.appendChild(detalhes);
      carrosselContent.appendChild(card);
    });
  } else {
    carrosselContent.innerHTML = '<p>Nenhum carro disponível.</p>';
  }
}



document.addEventListener('DOMContentLoaded', carregarDadosCarrosPaginaInicial);
