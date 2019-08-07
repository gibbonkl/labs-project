var tamanho = 1;

function listarDailiesData(data, pagina) {
    fetch(`https://reborn100contrato.azurewebsites.net/dailys/list/${data}/${pagina}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(response => {
            let paginacao = response.pop();
            tamanho = paginacao.totalPages;
            listarDailiesDOM(response);
            paginacaoView(pagina, data);
        })
        .catch((e) => console.log(e))
}

function animaLoad() {
    $(".progress").addClass('hide').hide('slow');
    $("#show_dailies").fadeIn('fast').removeClass('hide');
}

function showData() {
    $("#div_username").addClass('hide');
    $("#div_data").removeClass('hide');
    $("input[name='filter_username']").val('');
}

function listarDailiesDOM(dailyList) {
    if (dailyList.length == 0) M.toast({ html: "Sem daily notes neste dia! :(", displayLength: 3500 })
    animaLoad();
    $("#collapsible_daily").removeClass("hide");
    $("#collapsible_daily").html('');
    $('#collapsible_daily').html(dailyList.map(daily => dailyHTML(daily)).join(''));
}

function dailyHTML(daily) {
    return `<li id="${daily.id_daily}" class="data">
        <div class="collapsible-header">          
            <i class="material-icons margin-top-10">account_circle</i>
            <span class="span-margin data margin-top-10" data-name="${daily.owner}">${daily.owner}</span>
            <i class="material-icons margin-top-10">event</i>
            <span class="span-margin data align-right dia margin-top-10" data-date="${daily.date}">${removeTags(formatDate(daily.date))}</span>
        </div>
        <div class="collapsible-body grey lighten-3">
            <div class="row">
                <div class="col s10 word-wrap">
                    <span class="bold">Ontem: </span><span class="font-nunito">${removeTags(daily.yesterday)}</span><br>
                    <span class="bold">Hoje: </span><span class="font-nunito">${removeTags(daily.today)}</span><br>
                    <span class="bold">Impedimentos: </span><span class="font-nunito">${removeTags(daily.impediment)}</span>
                </div>
            </div>
        </div>
    </li>`;
}

function filtrar() {
    let data = $("input[name='filter_data']").val();
    let array = data.split('/');
    let novadata = '' + array[2] + '-' + array[1] + '-' + array[0]
    listarDailiesData(novadata, 1)
}

function paginacaoView(pagina, data) {
    let espaco = 2;
    let inicioJanela = pagina - espaco;
    let fimJanela = parseInt(pagina) + parseInt(espaco);

    if (inicioJanela < 1)
        inicioJanela = 1;
    if (fimJanela > tamanho)
        fimJanela = tamanho;

    $('.pagination').html(`<li class="waves-effect"><a onclick="paginacaoFetch('${1}', '${data}')" class="white-text"><i class="material-icons">chevron_left</i></a></li>`);
    for (let index = inicioJanela; index <= fimJanela; index++) {
        if (index == pagina)
            $('.pagination')
            .append(`<li class="active grey"><a onclick="paginacaoFetch('${index}', '${data}')">${index}</a></li>`);
        else
            $('.pagination')
            .append(`<li class="waves-effect"><a onclick="paginacaoFetch('${index}', '${data}')" class="white-text">${index}</a></li>`);
    }
    $('.pagination')
        .append(`<li class="waves-effect"><a onclick="paginacaoFetch('${tamanho}', '${data}')" class="white-text"><i class="material-icons">chevron_right</i></a></li>`);
}

function paginacaoFetch(pag, data) {
    pagina = parseInt(pag);
    listarDailiesData(data, pagina);
}