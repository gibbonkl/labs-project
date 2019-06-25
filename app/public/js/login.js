$(document).ready(function() {
    $('.modal').modal({
        startingTop: '10vh',
        opacity: 0.8,
        onCloseEnd: function(){
            $("#modal_username").val('');
            $("#modal_email").val('');
        }
    });
});
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
        .then(res => res.text())
        .then(message => {
            M.toast({html: message, displayLength: 2000})
            $("#modal_key").modal('close'); 
        })
        .catch(console.log);

}   
