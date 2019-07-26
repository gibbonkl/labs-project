function alteraSenha(e) {
    // e.preventDefault();
    var data = {
        senha: md5($("#card_senhaatual").val()),
        novasenha: md5($("#card_novasenha").val()),
        confirmacaosenha: md5($("#card_confsenha").val())
    }
    if (valido(data)) {
        fetch("/alterar_senha", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => res.text())
        .then(message => {
            M.toast({ html: message, displayLength: 2000 })
            $("#card_senhaatual").val('');
            $("#card_novasenha").val('');
            $("#card_confsenha").val('');
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
    if (data.novasenha == '') {
        M.toast({ html: 'Nova Senha inválida!' })
        val = false;
    }
    if (data.confirmacaosenha == '') {
        M.toast({ html: 'Confirmação de Senha inválida!' })
        val = false;
    }
    if (data.confirmacaosenha != data.novasenha) {
        M.toast({ html: 'Erro ao Repetir Nova Senha' })
        val = false;
    }
    return val;
}