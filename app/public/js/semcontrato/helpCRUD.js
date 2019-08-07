var pagina = 1;
var tamanho = 1;

function listarHelpcenter(pagina) {
    fetch(`https://reborn100contrato.azurewebsites.net/helps/list/post/${pagina}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(response => {

            let paginacao = response.pop();
            tamanho = paginacao.totalPages;

            animaLoad();
            $("#list-posts").removeClass("hide");
            $('#list-posts').html('');
            $('#list-posts').html(response.map(posts => render(posts)).join(''));

            paginacaoView(pagina);
        })
        .catch((e) => console.log(e))
}

$(document).ready(function() {
    $('#search_select').val("data").change();
    listarHelpcenter(1);
});

function animaLoad() {
    $(".progress").addClass('hide').hide('slow');
    $("#topics_section").fadeIn('fast').removeClass('hide');
}

function render(dados) {
    console.log(dados)
    return `<div id="${dados._id}" class="topico" onclick="enter_topic('${dados._id}')">
        <a class="collection-item avatar">
            <img src="../public/img/user.png" alt="" class="circle">
            <span class="black-text topico-nome">${removeTags(dados.owner)}</span><br>
            <span class="black-text topico-titulo">${removeTags(dados.title)}</span><br>
            <span class="grey-text topico-data">${removeTags(formatDate(dados.date))}</span>
            <span class="secondary-content">
        </a>
    </<span>
</div>`;
}

function paginacaoView(pagina) {
    let espaco = 2;
    let inicioJanela = pagina - espaco;
    let fimJanela = parseInt(pagina) + parseInt(espaco);

    if (inicioJanela < 1)
        inicioJanela = 1;
    if (fimJanela > tamanho)
        fimJanela = tamanho;

    $('.pagination').html(`<li class="waves-effect"><a onclick="paginacaoFetch('${1}')" class="white-text"><i class="material-icons">chevron_left</i></a></li>`);
    for (let index = inicioJanela; index <= fimJanela; index++) {
        if (index == pagina)
            $('.pagination')
            .append(`<li class="active grey"><a onclick="paginacaoFetch('${index}')">${index}</a></li>`);
        else
            $('.pagination')
            .append(`<li class="waves-effect"><a onclick="paginacaoFetch('${index}')" class="white-text">${index}</a></li>`);
    }
    $('.pagination')
        .append(`<li class="waves-effect"><a onclick="paginacaoFetch('${tamanho}')" class="white-text"><i class="material-icons">chevron_right</i></a></li>`);
}

function paginacaoFetch(pag) {
    pagina = parseInt(pag);
    listarHelpcenter(pagina);
}

function searchOp() {
    tamanho = 0;
    pagina = 1;

    let option = $('select#search_select').val();

    $(".input-search").addClass('hide');
    $("#div_" + option).removeClass('hide');

    $('.input-field').children().val('');
    $("select#search_select").formSelect();
}

function buscar() {

    let option = $('select#search_select').val();
    value = ''

    if (option == 'tag') {
        let chips = []
        let array = M.Chips.getInstance($('.chips')).chipsData;
        array.forEach(element => {
            chips.push(element.tag);
        });
        value = chips.join('+');
    } else {
        value = $("#div_" + option).children().val();
    }

    value != '' ? list_topics(option, value.replace(/\//g, '-')) :
        list_topics()
}


// function buscaTags(params, tags) {
//     params.map(function(index){
//         if(index.tags[0].split(',').includes(tags)){
//             console.log(index);
//         };
//     });
// }