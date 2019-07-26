function editaPerfil(e) {
    var data = {
        senha: md5($("#card_senhaatual").val())
    }
    if (valido(data)) {
        fetch("/editar_perfil", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(res => res.text())
            .then(message => {
                M.toast({ html: message, displayLength: 2000 })
                $("#card_senhaatual").val('');
            })
            .catch(console.log);
    }
}
function valido(data) {
    let val = true;
    if (data.senha == '') {
        M.toast({ html: 'Senha inválida!' })
        val = false;
    }
    return val;
}