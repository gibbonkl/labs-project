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
    let valida = false;

    $.each(dados, function(index, value) {
        if ((value == '') || (value === null)) {
            console.log(index);
            $('#login_' + index).addClass('invalid');
            valida = true;
        }
    });
    if (valida) {
        let toastHTML = '<span>Por favor, preencha todos os campos! </span><button class="btn-flat toast-action">OK</button>';
        M.toast({ html: toastHTML });
    }
    if (dados.key != dados.repkey) {
        $('#login_key').addClass('invalid');
        $('#login_repkey').addClass('invalid');
        let toastHTML = '<span>Ops... As senhas precisam ser iguais! </span><button class="btn-flat toast-action">OK</button>';
        M.toast({ html: toastHTML });
        $('#login_key').val('');
        $('#login_repkey').val('');
        valida = true;
    }
    return valida;
}


function submit() {
    // e.preventDefault();
    var dados = {
        name: $('#login_name').val(),
        lastname: $('#login_lastname').val(),
        username: $('#login_username').val(),
        date: $('#login_date').val(),
        email: $('#login_email').val(),
        key: md5($('#login_key').val()),
        repkey: md5($('#login_repkey').val())
    };

    if (ehValido(dados))
        return;

    $.ajax({
        url: '/cadastro',
        data: dados,
        type: "post",
        done: (resp) => {
            M.Toast({ html: "Cadastrado efetuado!", displayLenght: 2000 });
            window.location.reload(3000);
        },
        error: () => {
            console.log("error");
        }
    });
}