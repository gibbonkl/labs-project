$(document).ready(function() {
    list_topics();
});

function animaLoad() {
    $(".progress").addClass('hide').hide('slow');
    $("#show_dailies").fadeIn('fast').removeClass('hide');
}

function render(dados){
    return `<div id="${dados._id}" class="topico" onclick="enter_topic('${dados._id}')">
        <a class="collection-item avatar">
            ${dados.imagem ?
                `<img class="circle" src="../public/uploads/${dados.imagem}">`:
                `<img src="../public/img/user.png" alt="" class="circle">`
            }
            <span class="black-text topico-nome">${dados.username}</span><br>
            <span class="black-text topico-titulo">${dados.titulo}</span><br>
            <span class="grey-text topico-data">${dados.data}</span>
            <span class="secondary-content">
                <i class="material-icons grey-text">thumb_up</i>
                <span class="material-icons number grey-text">${dados.numeroLikes}</span>
                <i class="material-icons grey-text">comment</i>
                <span class="material-icons number grey-text">${dados.numeroComentarios}</span>
            </span>
        </a>
    </div>`;
}

function list_topics(pagina=1){
    fetch("/helpCenter/filtroAtividade/"+pagina, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(posts => {
        animaLoad()
        $('#list-posts').html(posts.map(post => render(post)).join(''));
    })
    .catch(console.log);
}

function new_topic(){
    window.location.href = "helpcenter/novo";
}

function enter_topic(id){
    window.location.href = "helpCenter/topico/" + id
}