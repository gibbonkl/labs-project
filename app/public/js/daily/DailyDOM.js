function dailyHTML(daily)
{
    return `<li id="${daily._id}" class="data">
        <div class="collapsible-header">
            ${daily.imagem ?
                `<img class="circle resize-daily" src="../public/uploads/${daily.imagem}">`
                : `<i class="material-icons">face</i>`
            }            
            <span class="span-margin data margin-top-10" data-name="${daily.usuario}">${daily.usuario}</span>
            <i class="material-icons margin-top-10">event</i>
            <span class="span-margin data align-right dia margin-top-10" data-date="${daily.data}">${daily.data}</span>
        </div>
        <div class="collapsible-body grey lighten-3">
            <div class="row">
                <div class="col s6">
                <span class="bold ">  O que você fez ontem: </span><span class="ontem">${daily.corpo.ontem}</span><br>
                <span class="bold"> O que fará Hoje: </span><span class="hoje">${daily.corpo.hoje}</span><br>
                <span class="bold"> Impedimentos: </span><span class="imp">${daily.corpo.impedimento}</span>
                </div>
                ${daily.permissao ?
                    `<div class="col s6">
                        <a class="btn-floating white right" onclick="deletar('${daily._id}')" ><i  class="material-icons black-text">delete</i></a>
                        <a class="btn-floating white right btn-margin-right" onclick="editar('${daily._id}')"><i class="material-icons black-text">create</i></a>
                    </div>`
                    : ``
                }
            </div>
        </div>
    </li>`;
}

function adicionarDailyDOM(daily)
{
    animaLoad();
    limparTelaSemResultado();
    $('#collapsible_daily').append(dailyHTML(daily));
}

function removerElementDOM(id)
{
    $('#' + id).remove();
}

function mensagemParaPesquisaSemResultado()
{
    //$('#collapsible_daily').html('');
    //$('#show_dailies').append(`<div id="dirt"> <h4>Sua Busca Não Encontrou Resultados ... </h4></div>`);
    $("#collapsible_daily").addClass("hide");
    M.toast({html: 'Nenhuma daily encontrada.',displayLength: 2000})
}

function limparTelaSemResultado()
{
    removerElementDOM('dirt');
}

function listarDailiesDOM(dailyList)
{
    animaLoad();
    limparTelaSemResultado();
    if(dailyList.length > 0)
    {
        $("#collapsible_daily").removeClass("hide");
        $('#collapsible_daily').html(dailyList.map(daily => dailyHTML(daily)).join(''));
    }
    else 
    {
        mensagemParaPesquisaSemResultado();
    }
}

// function procurarDailyPorUserDOM(user, data){
//     if($('span[data-name="'+ user +'"]').length && $('span[data-date="'+ data +'"]').length){
//         $('#inserir').attr("disabled", true);
//     }
// }

function dateConverter(date = new Date()) 
{
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
}

function animaLoad() 
{
    $(".progress").addClass('hide').hide('slow');
    $("#show_dailies").fadeIn('fast').removeClass('hide');
}

function showData()
{
    $("#div_username").addClass('hide');
    $("#div_data").removeClass('hide');
    $("input[name='filter_username']").val('');
}

function showUser(){
    $("#div_username").removeClass('hide');
    $("#div_data").addClass('hide');
    $("input[name='filter_data']").val('');
}

function datePicker()
{
    $('.collapsible').collapsible({
        accordion: false
    });
    $('.tooltipped').tooltip();
    $('.datepicker').datepicker({
        i18n: {
        months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
        weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        weekdaysAbbrev: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        today: 'Hoje',
        clear: 'Limpar',
        cancel: 'Sair',
        done: 'Confirmar',
        labelMonthNext: 'Próximo mês',
        labelMonthPrev: 'Mês anterior',
        labelMonthSelect: 'Selecione um mês',
        labelYearSelect: 'Selecione um ano',
        selectMonths: true,
        selectYears: 15,
        },
        format: 'd/m/yyyy',
        container: 'body',
    });
}