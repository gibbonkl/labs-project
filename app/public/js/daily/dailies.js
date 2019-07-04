$(document).ready(function() {
    listDailies()
    $(".dropdown-trigger").dropdown({
        constrainWidth: false,
        coverTrigger: false,
        hover: true
    });
    $('.collapsible').collapsible({
        accordion: false
    });

});