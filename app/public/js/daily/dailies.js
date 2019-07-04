$(document).ready(function() {
            function dateConverter(date = new Date()) {
                return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
            }

            fetch("/daily/data", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "filtro": dateConverter()
                    })
                })
                .then(response => response.json())
                .then(dailies =>
                    $('#collapsible_daily').html(dailies.map(daily =>
                            `<li id="${daily._id}" class="data">
                <div class="collapsible-header">
                    <i class="material-icons">face</i>
                    <span class="span-margin data" data-name="${daily.usuario}">${daily.usuario}</span>
                    <i class="material-icons">event</i>
                    <span class="span-margin data align-right dia" data-date="${daily.data}">${daily.data}</span>
                </div>
                <div class="collapsible-body grey lighten-3">
                    <div class="row">
                        <div class="col s6">
                            <span>Ontem:</span><span class="ontem" data-ontem="${daily.corpo.ontem}">${daily.corpo.ontem}</span><br>
                            <span>Hoje:</span><span class="hoje" data-hoje="${daily.corpo.hoje}">${daily.corpo.hoje}</span><br>
                            <span>Impedimentos:</span><span class="impedimento" data-imp="${daily.corpo.impedimento}">${daily.corpo.impedimento}</span>
                        </div>
                        ${daily.permissao?
                        `<div class="col s6">
                            <a class="btn-floating white right" href="#delete" onclick="remove('${daily._id}')"><i class="material-icons black-text">delete</i></a>
                            <a class="btn-floating white right btn-margin-right" onclick="update('${daily._id}')" href="#edit"><i class="material-icons black-text">create</i></a>
                        </div>`
                        :
                        ``
                        }
                    </div>
                </div>
            </li>`
        ).join(''))
    )
    .catch(console.log)
    
    $(".dropdown-trigger").dropdown({
        constrainWidth: false,
        coverTrigger: false,
        hover: true
    });
    $('.collapsible').collapsible({
        accordion: false
    });

});