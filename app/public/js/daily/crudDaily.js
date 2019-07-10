function animaLoad() {
    $(".progress").addClass('hide').hide('slow');
    $("#show_dailies").fadeIn('fast').removeClass('hide');
}

function create() {
    Swal.mixin({
            input: 'text',
            confirmButtonText: 'Próximo &rarr;',
            reverseButtons: true,
            showCancelButton: true,
            cancelButtonColor: '#b3bac5',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false,
            progressSteps: ['1', '2', '3'],
            inputValidator: (value) => {
                if (!value) {
                    return 'Você precisa preencher o campo!'
                }
            }
        }).queue([{
                title: 'O que você fez ontem?',
                text: 'Cadastrar daily'
            },
            {
                title: 'O que você fará hoje?',
                text: 'Cadastrar daily'
            },
            {
                title: 'Há algum impedimento?',
                text: 'Cadastrar daily'
            }
        ]).then((result) => {
            if (result.value) {
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Daily registrada!',
                    showConfirmButton: true,
                    timer: 1500
                })
                return {
                    'ontem': result.value[0],
                    'hoje': result.value[1],
                    'impedimento': result.value[2]
                }
            } else {
                return false;
            }
        })
        .then(resultado =>
            fetch("/daily", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resultado)
            })
        )
        .then(response => response.json())
        .then(response => {response['permissao'] = true; return response})
        .then(response => $('#collapsible_daily').append(render(response)))
        .catch(console.log);
}

function render(dados) {
    
    return `<li id="${dados._id}" class="data">
                <div class="collapsible-header">
                    <i class="material-icons">face</i>
                    <span class="span-margin data" data-name="${dados.usuario}">${dados.usuario}</span>
                    <i class="material-icons">event</i>
                    <span class="span-margin data align-right dia" data-date="${dados.data}">${dados.data}</span>
                </div>
                <div class="collapsible-body grey lighten-3">
                    <div class="row">
                        <div class="col s6">
                            <span class="bold">Ontem: </span><span class="ontem">${dados.corpo.ontem}</span><br>
                            <span class="bold">Hoje: </span><span class="hoje">${dados.corpo.hoje}</span><br>
                            <span class="bold">Impedimentos: </span><span class="imp">${dados.corpo.impedimento}</span>
                        </div>
                        ${dados.permissao ?
                            `<div class="col s6">
                                <a class="btn-floating white right" onclick="remove('${dados._id}')"><i class="material-icons black-text">delete</i></a>
                                <a class="btn-floating white right btn-margin-right" onclick="update('${dados._id}')"><i class="material-icons black-text">create</i></a>
                            </div>`
                            : ``
                        }
                    </div>
                </div>
            </li>`;
}

function dateConverter(date = new Date()) {
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
}

function listDailies() {

    fetch("/daily/data", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "filtro": dateConverter()
            })
        })
        .then(response => response.json())
        .then(dailies => {
            animaLoad()
            $('#collapsible_daily').html(dailies.map(daily => render(daily)).join(''));
        })
        .catch(console.log)
}

function remove(id) {
    Swal.fire({
            title: 'Tem certeza que deseja excluir a daily?',
            text: "Você não poderá reverter",
            type: 'warning',
            reverseButtons: true,
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Deletar',
            cancelButtonColor: '#b3bac5',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false
        })
        .then(resp => {
            if (resp.value) {
                fetch("/daily", {
                    method: "DELETE",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ daily_id: id })
                })
                return resp;
            }
        })
        .then((result) => {
            if (result.value) {
                $('#' + id).remove(); //remove a li do collapsible
                Swal.fire(
                    'Excluida!',
                    'A sua daily foi deletada!',
                    'success'
                )
            }
        })
        .catch((result) => {
            Swal.close();
        })
}

function update(id) {
    var obj = {
        ontem: $("#" + id + " .ontem").html(),
        hoje: $("#" + id + " .hoje").html(),
        imp: $("#" + id + " .imp").html()
    }

    Swal.mixin({
            input: 'text',
            confirmButtonText: 'Próximo &rarr;',
            showCancelButton: true,
            progressSteps: ['1', '2', '3'],
            cancelButtonColor: '#b3bac5',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false,
            reverseButtons: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'Você precisa preencher o campo!'
                }
            }
        }).queue([{
                title: 'O que você fez ontem?',
                text: 'Editar daily',
                inputValue: obj.ontem
            },
            {
                title: 'O que você fará hoje?',
                text: 'Editar daily',
                inputValue: obj.hoje
            },
            {
                title: 'Há algum impedimento?',
                text: 'Editar daily',
                inputValue: obj.imp
            }
        ])
        .then((result) => {
            return {
                'ontem': result.value[0],
                'hoje': result.value[1],
                'impedimento': result.value[2],
                '_id': id
            }
        })
        .then(resp => {
            fetch("/daily", {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resp)
            })
            return resp;
        })
        .then(resp => {
            $("#" + id + " .ontem").html(resp.ontem);
            $("#" + id + " .hoje").html(resp.hoje);
            $("#" + id + " .imp").html(resp.impedimento);

            Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Daily editada!',
                showConfirmButton: true,
                timer: 1500
            })
        })
        .catch(resp => {
            Swal.close();
        })
}

function showData(){
    $("#div_username").addClass('hide');
    $("#div_data").removeClass('hide');
    
}
function showUser(){
    $("#div_username").removeClass('hide');
    $("#div_data").addClass('hide');
}