var pagina = 1;
var tamanho = 1;

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
            ${dados.resolvido ? `<i class="material-icons green-text" value="${dados.resolvido}">check_circle</i>` : 
                `<i class="material-icons grey-text" value="${dados.resolvido}">check_circle</i>`}
                <span class="material-icons number grey-text"></span>
                <i class="material-icons grey-text">thumb_up</i>
                <span class="material-icons number grey-text">${dados.numeroLikes}</span>
                <i class="material-icons grey-text">comment</i>
                <span class="material-icons number grey-text">${dados.numeroComentarios}</span>
            </span>
            <div class="right">            
                ${dados.tags.map(tag => `<i class="chip">${tag}</i>`).join("")}
                <span class="material-icons number"></span>
            </div>
        </a>
    </div>`;
}

function list_topics(){
    fetch("/helpCenter/filtroAtividade/"+pagina, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(posts => {
        if(posts.erro)
            console.log(posts.erro);
        else
        {
            animaLoad()
            $('#list-posts').html(posts.postagens.map(post => render(post)).join(''));
            tamanho = posts.count;
            paginacaoView('list_topics');
        }
    })
    .catch(console.log);
}

function new_topic(){
    window.location.href = "/helpcenter/novo";
}

function enter_topic(id){
    window.location.href = "/helpCenter/topico/" + id
}

function paginacaoView(fList)
{
    let espaco = 2;
    let inicioJanela = pagina - espaco;
    let fimJanela = parseInt(pagina) + parseInt(espaco);

    if(inicioJanela < 1)
        inicioJanela = 1;
    if(fimJanela > tamanho)
        fimJanela = tamanho;

    $('.pagination').html(`<li class="waves-effect"><a onclick="paginacaoFetch('${1}', '${fList}')" class="white-text"><i class="material-icons">chevron_left</i></a></li>`);
    for (let index = inicioJanela; index <= fimJanela; index++) 
    {
        if(index == pagina)
            $('.pagination')
            .append(`<li class="active grey"><a onclick="paginacaoFetch('${index}', '${fList}')">${index}</a></li>`);
        else
            $('.pagination')
            .append(`<li class="waves-effect"><a onclick="paginacaoFetch('${index}', '${fList}')" class="white-text">${index}</a></li>`);
    }
    $('.pagination')
    .append(`<li class="waves-effect"><a onclick="paginacaoFetch('${tamanho}', '${fList}')" class="white-text"><i class="material-icons">chevron_right</i></a></li>`);
}

function paginacaoFetch(pag, fList)
{
    pagina = parseInt(pag);
    if(fList == 'list_topics')
        list_topics();
}