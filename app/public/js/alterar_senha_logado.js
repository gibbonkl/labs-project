function alterar_senha_logado(e){
    e.preventDefault();

    var list = document.getElementById("erros");
    while (list.hasChildNodes()) 
    {   
        list.removeChild(list.firstChild);
    }

    var data = {
        senha: document.querySelector("#card_senhaatual").value, 
        novasenha: document.querySelector("#card_novasenha").value,
        confirmacaosenha: document.querySelector("#card_confsenha").value
    }

    if(valido(data))
    {
        fetch("/alterar_senha",{
            method: "POST",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(data)
        })
        .then(res => res.text())
        .then(message => {

            M.toast({html: message, displayLength: 2000})
            document.querySelector("#card_senhaatual").value = '';
            document.querySelector("#card_novasenha").value = '';
            document.querySelector("#card_confsenha").value = '';
        })
        .catch(console.log);
    }

}   

function valido(data)
{
    let val = true;
    if(data.senha == '')
    {
        var node = document.createElement("li");                 
        var textnode = document.createTextNode("Senha inválida"); 
        node.appendChild(textnode);                              
        document.getElementById("erros").appendChild(node);
        val = false;     
    }
    if(data.novasenha == '')
    {
        var node = document.createElement("li");               
        var textnode = document.createTextNode("Nova Senha inválida");
        node.appendChild(textnode);                            
        document.getElementById("erros").appendChild(node);
        val = false;
    }
    if(data.confirmacaosenha == '')
    {
        var node = document.createElement("li");               
        var textnode = document.createTextNode("Confirmação de Senha inválida");
        node.appendChild(textnode);                            
        document.getElementById("erros").appendChild(node);
        val = false;
    }
    if(data.confirmacaosenha != data.novasenha)
    {
        var node = document.createElement("li");               
        var textnode = document.createTextNode("Erro ao Repetir Nova Senha");
        node.appendChild(textnode);                            
        document.getElementById("erros").appendChild(node);
        val = false;
    }

    return val;

}