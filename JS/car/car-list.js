document.addEventListener('DOMContentLoaded', function() {
    const marcaSelecionada = localStorage.getItem('marcaSelecionada');
    
    obterDadosCarros().then(dados => {
        if (dados) {    
            // Filtra os carros se houver uma marca selecionada
            const carrosFiltrados = marcaSelecionada 
                ? dados.filter(carro => carro.marca.toUpperCase() === marcaSelecionada.toUpperCase())
                : dados;

            const catalogoDiv = document.getElementById("car-list");
            catalogoDiv.innerHTML = ''; // Limpa o conteúdo anterior

            carrosFiltrados.forEach(carro => {
                const card = document.createElement('div');
                card.classList.add('card');

                // Verifica se o usuário está logado
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

                // Adiciona botão de favorito se usuário estiver logado
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

                // Adiciona evento de clique no card para ver mais detalhes
                card.onclick = (e) => {
                    // Previne o evento de clique se clicar no botão de favorito
                    if (e.target.classList.contains('fav-button')) {
                        return;
                    }
                    window.location.href = `car-info.html?id=${carro.id}`;
                };

                card.appendChild(divTitle);
                card.appendChild(detalhes);
                catalogoDiv.appendChild(card);
            });

            // Limpa a marca selecionada após usar
            localStorage.removeItem('marcaSelecionada');
        } else {
            console.error('Não foi possível obter os dados dos carros para o catálogo.');
        }
    });
});

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

    localStorage.setItem('currentUser', JSON.stringify(user));
} 