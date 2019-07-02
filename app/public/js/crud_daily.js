function create() {
    Swal.mixin({
            input: 'text',
            confirmButtonText: 'Próximo &rarr;',
            showCancelButton: true,
            progressSteps: ['1', '2', '3']
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
            console.log(result)
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
                            <span class="bold">Ontem: </span><span class="ontem" data-ontem="${dados.corpo.ontem}">${dados.corpo.ontem}</span><br>
                            <span class="bold">Hoje: </span><span class="hoje" data-hoje="${dados.corpo.hoje}">${dados.corpo.hoje}</span><br>
                            <span class="bold">Impedimentos: </span><span class="impedimento" data-imp="${dados.corpo.impedimento}">${dados.corpo.impedimento}</span>
                        </div>
                        <div class="col s6">
                            <a class="btn-floating white right" onclick="remove('${dados._id}')" href="#delete"><i class="material-icons black-text">delete</i></a>
                            <a class="btn-floating white right btn-margin-right" onclick="update('${dados._id}')" href="#edit"><i class="material-icons black-text">create</i></a>
                        </div>
                    </div>
                </div>
            </li>`
}

function remove(id) {
    Swal.fire({
        title: 'Tem certeza que deseja excluir a daily?',
        text: "Você não poderá reverter",
        type: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Excluir'

    }).then((result) => {
        if (result.value) {
            Swal.fire(
                'Excluida!',
                'A sua daily foi deletada!',
                'success'
            )
            $('#' + id).remove(); //remove a li do collapsible
        }
    })


}

function update(id) {
    Swal.mixin({
            input: 'text',
            confirmButtonText: 'Próximo &rarr;',
            showCancelButton: true,
            progressSteps: ['1', '2', '3']
        }).queue([{
                title: 'O que você fez ontem?',
                text: 'Editar daily'
            },
            {
                title: 'O que você fará hoje?',
                text: 'Editar daily'
            },
            {
                title: 'Há algum impedimento?',
                text: 'Editar daily'
            }
        ]).then((result) => {
            console.log(result)
            if (result.value) {
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Daily editada!',
                    showConfirmButton: true,
                    timer: 1500
                })
                return {
                    'ontem': result.value[0],
                    'hoje': result.value[1],
                    'impedimento': result.value[2]
                }
            }
        })
        .then(resp => {
            fetch("/daily", {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    // data: var teste = $('#5d1a22ea4eb4f449ec3d7528 .data').eq(0).html(), 
                    corpo: resp
                })
            })

        })
        // if (formValues) {
        //     Swal.fire(JSON.stringify(formValues))
        // }
}

function get(id) {}