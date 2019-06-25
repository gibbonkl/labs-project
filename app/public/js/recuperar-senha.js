function changePassword(e){
    e.preventDefault();
    let tmp = location.href.split("=");
    let hash = tmp[1];
    var data = {
        newPassword: document.querySelector("#card_novasenha").value, 
    }
    fetch(`/recuperar_senha/${hash}`,{
        method: "POST",
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(data)
    })
        .then(res => res.text())
        .then(message => {
            M.toast({html: message, displayLength: 2000});
            setTimeout(()=> window.location.href = "/login",3000);
        })
        .catch(error =>{
            M.toast({html: error,displayLength: 2000})
        });

}   