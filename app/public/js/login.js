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
