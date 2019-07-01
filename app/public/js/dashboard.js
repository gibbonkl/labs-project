$(document).ready(function() {
    function dateConverter(date = new Date()) {
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    }

    fetch("/daily", {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    })
    $(".dropdown-trigger").dropdown({
        constrainWidth: false,
        coverTrigger: false,
        hover: true
    });
    $('.collapsible').collapsible({
        accordion: false
    });

});