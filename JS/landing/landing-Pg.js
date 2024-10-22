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
