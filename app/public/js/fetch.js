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
        .then(res => 
            M.toast({html: res.body, displayLength: 2000})
        )
        .catch(console.log);

}   