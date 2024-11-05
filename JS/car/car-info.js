document.addEventListener('DOMContentLoaded', function() {
    // Obtém o ID do carro da URL
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');

    if (!carId) {
        console.error('ID do carro não encontrado na URL');
        return;
    }

    // Carrega os dados do carro
    fetch('JSON/carros.json')
        .then(response => response.json())
        .then(data => {
            const car = data.find(c => c.id === parseInt(carId));
            if (car) {
                atualizarInformacoesCarro(car);
            } else {
                console.error('Carro não encontrado');
            }
        })
        .catch(error => console.error('Erro ao carregar dados do carro:', error));
});

function atualizarInformacoesCarro(car) {
    // Atualiza o título
    document.querySelector('.card h2').textContent = `${car.marca} ${car.nome}`;

    // Atualiza a imagem
    document.querySelector('.container-img img').src = car.imgthumb || car['img-thumb'];

    // Atualiza informações mecânicas
    const mecanica = document.querySelector('.section:nth-child(2) .row');
    mecanica.innerHTML = `
        <div class="column">0-100<br>${car.detalhes.aceleracao}</div>
        <div class="column">Cavalaria<br>${car.potencia}</div>
        <div class="column">Torque<br>${car.detalhes.torque}</div>
        <div class="column">Câmbio<br>${car.detalhes.tipoCambio}</div>
        <div class="column">Tração<br>${car.detalhes.tracao}</div>
    `;

    // Atualiza dimensões
    const dimensoes = document.querySelector('.section:nth-child(3) .row');
    dimensoes.innerHTML = `
        <div class="column">Peso<br>${car.detalhes.peso}</div>
        <div class="column">Dimensões<br>${car.detalhes.dimensoes}</div>
        <div class="column">Porta-malas<br>${car.detalhes.capacidadePortaMalas}</div>
    `;

    // Atualiza conforto
    const conforto = document.querySelector('.section:nth-child(4) .row');
    conforto.innerHTML = `
        <div class="column">Lugares<br>${car.detalhes.numeroAssentos}</div>
        <div class="column">Suspensão<br>${car.detalhes.suspensao}</div>
        <div class="column">Freios<br>${car.detalhes.freios}</div>
    `;

    // Atualiza gastos
    const gastos = document.querySelector('.section:nth-child(5) .row');
    gastos.innerHTML = `
        <div class="column">Consumo<br>${car.consumo}</div>
        <div class="column">Manutenção<br>${car.detalhes.manutencao}</div>
        <div class="column">Preço<br>${car.preco}</div>
    `;
}
