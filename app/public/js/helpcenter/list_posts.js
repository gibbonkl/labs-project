function animaLoad() {
    $(".progress").addClass('hide').hide('slow');
    $("#show_dailies").fadeIn('fast').removeClass('hide');
}

function render(dados){
    return `<div id="${dados._id}" class="topico">
        <a href="#" class="collection-item avatar">
            <img src="../public/img/user.png" alt="" class="circle">
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

function list_posts(){
    fetch("/helpCenter", {
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

function create_post(){

}

function enter_post(){

}