$(document).ready(function() {
    $('.modal').modal({
        endingTop: '30%',
        opacity: 0.9,
        onCloseEnd: () => {
            $("#modal_email").val('');
            $(".progress").addClass('hide');
        }
    });
});

function recoveryPassword(e) {
    e.preventDefault();
    var data = {
        email: $("#modal_email").val()
    }
    $(".progress").removeClass('hide');

    fetch("/recuperar_senha", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => res.text())
        .then(message => {
            M.toast({ html: message, displayLength: 2000 })
            $("#modal_key").modal('close');
        })
        .catch(console.log);

}