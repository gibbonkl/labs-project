// funcionalidades de transição e mudança de inputs

function log() {
    $('#nav_form').addClass("slide-left");
    setTimeout(function() {
        $('#btn_log').addClass("hide");
        $('#btn_cad').removeClass("hide");

    }, 100);
    $('#nav_btn').addClass("slide-right");
}

function cad() {
    $('*').removeClass("slide-left");
    setTimeout(function() {
        $('#btn_log').removeClass("hide");
        $('#btn_cad').addClass("hide");
    }, 100);
    $('*').removeClass("slide-right");
}

// validação
function ehValido(dados) {
    console.log(dados)
    let valida = false;
    $.each(dados, function(index, value) {
        if ((value == '') || (value === null)) {
            $('#'+ index).addClass('invalid');
            valida = true;
            console.log(index);
        }
    });
    if (valida) {
        let toastHTML = '<span>Por favor, preencha todos os campos! </span><button class="btn-flat toast-action">OK</button>';
        M.toast({ html: toastHTML });
    }
    if (dados.senha != dados.repsenha) {
        $('#senha').addClass('invalid');
        $('#repsenha').addClass('invalid');
        let toastHTML = '<span>Ops... As senhas precisam ser iguais! </span><button class="btn-flat toast-action">OK</button>';
        M.toast({ html: toastHTML });
        $('#senha').val('');
        $('#repsenha').val('');
        valida = true;
    } 
    return valida;
}

function submit() {
    // e.preventDefault();
    var dados = {
        nome: $('#nome').val(),
        sobrenome: $('#sobrenome').val(),
        username: $('#username').val(),
        data_nascimento: $('#data_nascimento').val(),
        email: $('#email').val(),
        senha: $('#senha').val(),
        repsenha: $('#repsenha').val()
    };

    if (ehValido(dados))
        return;
    
    dados.senha = md5($('#senha').val());

    axios({
        method: 'post', 
        url: '/cadastro',
        data: dados,
    })
    .then(response => {
        M.toast({ html: "Cadastro efetuado com sucesso!", displayLenght:2500 });
    })
    .catch(error => {
        M.toast({ html: "Aconteceu um erro, por favor tente mais tarde!", displayLenght:2500 });
    })
}