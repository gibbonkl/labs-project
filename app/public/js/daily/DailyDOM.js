function dailyHTML(daily) {
    console.log(daily)
    return `<li id="${daily._id}" class="data">
        <div class="collapsible-header">
            ${daily.imagem ?
                `<img class="circle resize-daily" src="../public/uploads/${daily.imagem}">`
                : `<img src="../public/img/user.png" alt="" class="circle resize-daily">`
            }            
            <span class="span-margin data margin-top-10" data-name="${daily.usuario}">${daily.usuario}</span>
            <i class="material-icons margin-top-10">event</i>
            <span class="span-margin data align-right dia margin-top-10" data-date="${daily.data}">${daily.data}</span>
        </div>
        <div class="collapsible-body grey lighten-3">
            <div class="row">
                <div class="col s10 word-wrap">
                    <span class="bold">Ontem: </span><span class="font-nunito ontem">${removeTags(daily.corpo.ontem)}</span><br>
                    <span class="bold">Hoje: </span><span class="font-nunito hoje">${removeTags(daily.corpo.hoje)}</span><br>
                    <span class="bold">Impedimentos: </span><span class="font-nunito imp">${removeTags(daily.corpo.impedimento)}</span>
                </div>
                ${daily.permissao ?
                    `<div class="col s2">
                        <a class="btn-floating white right" onclick="deletar('${daily._id}')" ><i  class="material-icons black-text">delete</i></a>
                        <a class="btn-floating white right btn-margin-right" onclick="editar('${daily._id}')"><i class="material-icons black-text">create</i></a>
                    </div>`
                    : ``
                }
            </div>
        </div>
    </li>`;
}
function adicionarDailyDOM(daily){
    animaLoad();
    limparTelaSemResultado();
    $("#collapsible_daily").removeClass("hide");
    $('#collapsible_daily').append(dailyHTML(daily));
}
function removerElementDOM(id){
    $('#' + id).remove();
}
function mensagemParaPesquisaSemResultado(){
    $("#collapsible_daily").addClass("hide");
    M.toast({html: 'Nenhuma daily encontrada.',displayLength: 2000})
}
function limparTelaSemResultado(){
    removerElementDOM('dirt');
}
function listarDailiesDOM(dailyList){
    animaLoad();
    limparTelaSemResultado();
    if(dailyList.length > 0){
        $("#collapsible_daily").removeClass("hide");
        $('#collapsible_daily').html(dailyList.map(daily => dailyHTML(daily)).join(''));
    }
    else{
        mensagemParaPesquisaSemResultado();
    }
}
function dateConverter(date = new Date()){
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
}
function animaLoad(){
    $(".progress").addClass('hide').hide('slow');
    $("#show_dailies").fadeIn('fast').removeClass('hide');
}
function showData(){
    $("#div_username").addClass('hide');
    $("#div_data").removeClass('hide');
    $("input[name='filter_username']").val('');
}
function showUser(){
    $("#div_username").removeClass('hide');
    $("#div_data").addClass('hide');
    $("input[name='filter_data']").val('');
}