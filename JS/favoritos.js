document.addEventListener('DOMContentLoaded', function() {
    const user = checkLogin();
    
    // Verifica se o usuário está logado
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    carregarFavoritos();
});

function carregarFavoritos() {
    const user = checkLogin();
    const favoritosDiv = document.getElementById('favoritos-list');
    const semFavoritosDiv = document.getElementById('sem-favoritos');

    // Verifica se o usuário tem favoritos
    if (!user.favorites || user.favorites.length === 0) {
        favoritosDiv.classList.add('hidden');
        semFavoritosDiv.classList.remove('hidden');
        return;
    }

    // Obtém todos os carros e filtra apenas os favoritos
    obterDadosCarros().then(carros => {
        if (carros) {
            const carrosFavoritos = carros.filter(carro => 
                user.favorites.includes(carro.id)
            );

            favoritosDiv.innerHTML = '';

            carrosFavoritos.forEach(carro => {
                const card = document.createElement('div');
                card.classList.add('card');

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

                const favButton = document.createElement('button');
                favButton.classList.add('fav-button');
                favButton.innerHTML = '❤️';
                favButton.onclick = (e) => {
                    e.stopPropagation();
                    removerFavorito(carro.id);
                    card.remove();
                    
                    // Verifica se ainda existem favoritos
                    if (favoritosDiv.children.length === 0) {
                        favoritosDiv.classList.add('hidden');
                        semFavoritosDiv.classList.remove('hidden');
                    }
                };
                divTitle.appendChild(favButton);

                const detalhes = document.createElement('div');
                detalhes.classList.add('detalhes-card');
                detalhes.innerHTML = `
                    <p>Ano: ${carro.ano}</p>
                    <p>Preço: ${carro.preco}</p>`;

                card.onclick = (e) => {
                    if (!e.target.classList.contains('fav-button')) {
                        window.location.href = `car-info.html?id=${carro.id}`;
                    }
                };

                card.appendChild(divTitle);
                card.appendChild(detalhes);
                favoritosDiv.appendChild(card);
            });

            favoritosDiv.classList.remove('hidden');
            semFavoritosDiv.classList.add('hidden');
        }
    });
}

function removerFavorito(carId) {
    const user = checkLogin();
    if (!user) return;

    const index = user.favorites.indexOf(carId);
    if (index !== -1) {
        user.favorites.splice(index, 1);
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
} 