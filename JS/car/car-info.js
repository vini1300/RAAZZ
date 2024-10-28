
    // Função para carregar o JSON
fetch('carros.json')
.then(response => response.json()) // Converte a resposta para JSON
.then(data => {
    const carList = document.getElementById('car-list');
    
    data.forEach(car => {
        // Cria um elemento div para exibir cada carro
        const carDiv = document.createElement('div');
        carDiv.classList.add('car');

        // Insere as informações de cada carro no HTML
        carDiv.innerHTML = `
            <h2>${car.marca} ${car.nome} (${car.ano})</h2>
            <p><strong>Preço:</strong> ${car.preco}</p>
            <p><strong>Motor:</strong> ${car.tipoMotor} - ${car.potencia}</p>
            <p><strong>Consumo:</strong> ${car.consumo}</p>
            <p><strong>Aceleração 0-100 km/h:</strong> ${car.detalhes.aceleracao}</p>
            <p><strong>Descrição:</strong> ${car.descricao}</p>
            <img src="${car['img-thumb']}" alt="Imagem de ${car.nome}">
        `;

        carList.appendChild(carDiv);
    });
})
.catch(error => console.error('Erro ao carregar o arquivo JSON:', error));
