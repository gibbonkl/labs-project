$(document).ready(function() {
    $(".dropdown-trigger").dropdown({
        constrainWidth: false,
        coverTrigger: false,
        hover: true
    });
    $('.collapsible').collapsible({
        accordion: false
    });

    fetch("/daily", {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(arg => {
            $.each(function(arg) {
                console.log(arg)
            });
        })
});