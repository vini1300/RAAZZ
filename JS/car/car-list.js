obterDadosCarros().then(dados => {
    if (dados) {
        const catalogoDiv = document.getElementById("car-list");

        dados.forEach(carro => {
            const card = document.createElement('div');
            card.classList.add('card');

            const marca = document.createElement('h3');
            marca.classList.add('marca');
            marca.textContent = carro.marca

            const titulo = document.createElement('h3');
            titulo.classList.add('titulo');
            titulo.textContent = carro.nome;

            const divTitle = document.createElement('div');
            divTitle.classList.add('title-div-card');
            divTitle.appendChild(marca);
            divTitle.appendChild(titulo);

            const detalhes = document.createElement('div');
            detalhes.innerHTML = `
                <p>Ano: ${carro.ano}</p>
                <p>Preço: ${carro.preco}</p>`;

            card.appendChild(divTitle)
            card.appendChild(detalhes);

            catalogoDiv.appendChild(card);
        });
    } else {
        console.error('Não foi possível obter os dados dos carros para o catálogo.');
    }
});
