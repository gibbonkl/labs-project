function log() {
    document.querySelector('#nav_form').classList.add("slide-left");
    setTimeout(function() {
        document.querySelector('#btn_log').classList.add("hide");
        document.querySelector('#btn_cad').classList.remove("hide");

    }, 100);
    document.querySelector('#nav_btn').classList.add("slide-right");
}

function cad() {
    document.querySelector('*').classList.remove("slide-left");
    setTimeout(function() {
        document.querySelector('#btn_log').classList.remove("hide");
        document.querySelector('#btn_cad').classList.add("hide");
    }, 100);
    document.querySelector('*').classList.remove("slide-right");
}

function submit(e) {
    e.preventDefault();

    var dados = {
        nome: document.querySelector('#login_name').value,
        sobrenome: document.querySelector('#login_lastname').value,
        data: document.querySelector('#login_data').value,
        email: document.querySelector('#login_email').value,
        senha: document.querySelector('#login_senha').value,
        repsenha: document.querySelector('#login_repsenha').value
    };

    fetch(url, {
            method: 'post',
            body: dados
        }).then(resposta => resposta.json())
        .then(data => data)
        .catch(erro => console.error(erro));


}