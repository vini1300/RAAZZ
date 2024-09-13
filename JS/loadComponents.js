function loadComponent(id, file, selector) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.querySelector(selector).innerHTML = data;
        })
        .catch(error => console.log('Erro ao carregar o componente:', error));
}//Essa função carrega os componentes🫦


//Carrega os componentes principais aqui, componentes mais específicos devem ser incrementados no script da pagina desejada, por favor deixa organizadinho🫦
loadComponent('header-placeholder', 'components/header.html', '#header-placeholder'); //header
loadComponent('footer-placeholder', 'components/footer.html', '#footer-placeholder'); //footer
