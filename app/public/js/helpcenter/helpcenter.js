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
        </a>
    </div>`;
}

function list_topics(busca='atividade', dados='') {

    let endpoint = '';
    if(dados) endpoint = busca + '/' + dados + '/' + pagina;
    else endpoint = busca + '/' + pagina;
    
    fetch("/helpCenter/" + endpoint, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(posts => {
            if (posts.erro)
                console.log(posts.erro);
            else {
                if(posts.postagens.length > 0) {
                    animaLoad()
                    $("#list-posts").removeClass("hide");
                    $('#list-posts').html(posts.postagens.map(post => render(post)).join(''));
                    tamanho = posts.count;
                    paginacaoView(busca, dados);
                }
                else {
                    $("#list-posts").addClass("hide");
                    M.toast({html: 'Nenhum tópico encontrado.',displayLength: 2000})
                }
            }
        })
        .catch(console.log);
}

function new_topic() {
    window.location.href = "/helpcenter/novo";
}

function enter_topic(id) {
    window.location.href = "/helpCenter/topico/" + id
}

function paginacaoView(busca, dados) {
    let espaco = 2;
    let inicioJanela = pagina - espaco;
    let fimJanela = parseInt(pagina) + parseInt(espaco);

    if (inicioJanela < 1)
        inicioJanela = 1;
    if (fimJanela > tamanho)
        fimJanela = tamanho;

    $('.pagination').html(`<li class="waves-effect"><a onclick="paginacaoFetch('${1}', '${busca}', '${dados}')" class="white-text"><i class="material-icons">chevron_left</i></a></li>`);
    for (let index = inicioJanela; index <= fimJanela; index++) {
        if (index == pagina)
            $('.pagination')
            .append(`<li class="active grey"><a onclick="paginacaoFetch('${index}', '${busca}', '${dados}')">${index}</a></li>`);
        else
            $('.pagination')
            .append(`<li class="waves-effect"><a onclick="paginacaoFetch('${index}', '${busca}', '${dados}')" class="white-text">${index}</a></li>`);
    }
    $('.pagination')
        .append(`<li class="waves-effect"><a onclick="paginacaoFetch('${tamanho}', '${busca}', '${dados}')" class="white-text"><i class="material-icons">chevron_right</i></a></li>`);
}

function paginacaoFetch(pag, busca, dados) {
    pagina = parseInt(pag);
    list_topics(busca, dados);
}

function searchOp() {
    tamanho = 0;
    pagina = 1;
    
    let option = $('select#search_select').val();

    $(".input-search").addClass('hide');
    $("#div_" + option).removeClass('hide');

    $('.input-field').children().val('');
}

function buscar(){
    let option = $('select#search_select').val();
    let value = ''
    if (option == 'tag') {
        let chips = []
        let array = M.Chips.getInstance($('.chips')).chipsData;
        array.forEach(element => {
            chips.push(element.tag);
        });
        value = chips.join('+');
    }
    else {value  = $("#div_" + option).children().val();}

    value != '' ? list_topics(option, value.replace(/\//g, '-')) 
                : list_topics()
}