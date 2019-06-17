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

function submit() {
    // e.preventDefault();

    var dados = {
        nome: document.querySelector('#login_name').value,
        sobrenome: document.querySelector('#login_lastname').value,
        username: document.querySelector('#login_login').value,
        data_nasc: document.querySelector('#login_date').value,
        email: document.querySelector('#login_email').value,
        senha: document.querySelector('#login_senha').value
    };

    $.ajax({
            url: '/cadastro',
            method: 'post',
            data: dados
        })
        .done(function(res) 
        {
            if (res.success) 
            {
                console.log('id from ajax call is', res);
                window.location.reload();
            } 
            else 
            {
            console.log('error...ajax');
            }
        });
    }
