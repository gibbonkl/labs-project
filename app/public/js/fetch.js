function recoveryPassword(e){
    e.preventDefault();
    var data = {
        username: document.querySelector("#modal_username").value, 
        email: document.querySelector("#modal_email").value
    }
    fetch("/recuperar_senha",{
        method: "POST",
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(data)
    })
        .then(res => res.ok? document.querySelector(".row").append("Email enviado"):document.querySelector(".row").append("Email não pode ser enviado."))
        .catch(console.log);

}