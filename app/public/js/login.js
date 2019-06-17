function submit() {

    var dados = {
        email: document.querySelector('#login_email').value,
        senha: document.querySelector('#login_senha').value
    };

    $.ajax({
            url: '/login',
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