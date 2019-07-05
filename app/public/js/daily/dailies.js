$(document).ready(function() {
    listDailies()
    $(".dropdown-trigger").dropdown({
        constrainWidth: false,
        coverTrigger: false
    });
    $('.collapsible').collapsible({
        accordion: false
    });

});