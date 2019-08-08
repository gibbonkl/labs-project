var time = 500;

function inserir() {
    Swal.mixin({
            input: 'text',
            confirmButtonText: 'Próximo &rarr;',
            reverseButtons: true,
            showCancelButton: true,
            cancelButtonColor: '#b3bac5',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false,
            progressSteps: ['1', '2', '3', '4'],
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
                input: null,
                title: 'Há algum impedimento?',
                html: 'Cadastrar daily<br/><br/>'+
                '<button id="nenhum" class="btn azul-swal rounded btn-swal">Não</button>'+
                '<button id="sim" class="btn cinza-swal rounded">Sim</button>',
                showCancelButton: false,
                showConfirmButton: false,
                onBeforeOpen: () => {
                    const content = Swal.getContent()
                    const $ = content.querySelector.bind(content)                
                    const nenhum = $('#nenhum')
                    const sim = $('#sim')                
                    nenhum.addEventListener('click', () => {
                        Swal.deleteQueueStep(3)
                        Swal.clickConfirm()
                    })                
                    sim.addEventListener('click', () => {
                        Swal.clickConfirm()
                    })
                }
            },
            {
                title: 'Qual é o impedimento?',
                text: 'Cadastrar daily'
            }
        ])
        .then(result => {
            let impedimento = 'Nenhum'
            if(result.value[3]) impedimento = result.value[3]
            return {
                'ontem': result.value[0],
                'hoje': result.value[1],
                'impedimento': impedimento
            }
        })
        .then(resultado => {
            fetch("/daily", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(resultado)
                })
                .then(response => response.json())
                .then(response => {
                    if (response.erro)
                        message('error', response.erro);
                    else {
                        response["permissao"] = true;
                        adicionarDailyDOM(response);
                        message('success', 'Daily registrada!')
                    }
                })
                .catch(() => setTimeout(() => { message('error', 'Unexpected Error') }, time))
        })
        .catch(() => { console.log });
}

function deletar(id) {
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
                    .then(response => response.json())
                    .then(response => {
                        if (response.error) {
                            message('error', response.erro)
                            return;
                        }
                        removerElementDOM(id);
                        message('success', 'Daily deletada!')
                    })
                    .catch(() => setTimeout(() => { message('error', 'Unexpected Error') }, time))
            }
        })
        .catch(console.log)
}
// Listar daily notes com data de hoje (default)
function listar() {
    fetch("/daily/default", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(dailies => listarDailiesDOM(dailies))
}
// function listar() {
//     fetch("/daily/data", {
//             method: "POST",
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 "filtro": dateConverter()
//             })
//         })
//         .then(response => response.json())
//         .then(dailies => listarDailiesDOM(dailies))
// }
function listarPorData(data) {
    fetch("/daily/data", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "filtro": data
            })
        })
        .then(response => response.json())
        .then(dailies => listarDailiesDOM(dailies))
}

function listarPorUser(name) {
    fetch("/daily/user", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "filtro": name
            })
        })
        .then(response => response.json())
        .then(dailies => {
            listarDailiesDOM(dailies);
        })
}

function filtrar() {
    let data = $("input[name='filter_data']").val();
    let name = $("input[name='filter_username']").val();
    if (name.length) listarPorUser(name)
    else data.length ? listarPorData(data) : listar()
}

function editar(id) {
    var obj = {
        ontem: $(`#${id} .ontem`).text(),
        hoje: $(`#${id} .hoje`).text(),
        imp: $(`#${id} .imp`).text()
    }
    Swal.mixin({
            input: 'text',
            confirmButtonText: 'Próximo &rarr;',
            showCancelButton: true,
            progressSteps: ['1', '2', '3', '4'],
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
                input: null,
                title: 'Há algum impedimento?',
                html: 'Cadastrar daily<br/><br/>'+
                '<button id="nenhum" class="btn azul-swal rounded btn-swal">Não</button>'+
                '<button id="sim" class="btn cinza-swal rounded">Sim</button>',
                showCancelButton: false,
                showConfirmButton: false,
                onBeforeOpen: () => {
                    const content = Swal.getContent()
                    const $ = content.querySelector.bind(content)                
                    const nenhum = $('#nenhum')
                    const sim = $('#sim')                
                    nenhum.addEventListener('click', () => {
                        Swal.deleteQueueStep(3)
                        Swal.clickConfirm()
                    })                
                    sim.addEventListener('click', () => {
                        Swal.clickConfirm()
                    })
                }
            },
            {
                title: 'Qual é o impedimento?',
                text: 'Editar daily',
                inputValue: obj.imp
            }
        ])
        .then((result) => {
            let impedimento = 'Nenhum'
            if(result.value[3]) impedimento = result.value[3]
            return {
                'ontem': result.value[0],
                'hoje': result.value[1],
                'impedimento': impedimento,
                '_id': id
            }
        })
        .then(resp => {

            fetch("/daily", {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(resp)
                })
                .then(response => response.json())
                .then(response => {
                    if (response.erro)
                        message('error', response.erro);
                    else {
                        $(`#${id} .ontem`).text(response.corpo.ontem).html();
                        $(`#${id} .hoje`).text(response.corpo.hoje).html();
                        $(`#${id} .imp`).text(response.corpo.impedimento).html();
                        message('success', 'Daily Editada!');
                    }
                })
                .catch(() => setTimeout(() => { message('error', 'Unexpected Error') }, time))

        })
        .catch(() => { console.log });
}

function message(type, title) {
    Swal.fire({
        position: 'center',
        type: type,
        title: title,
        showConfirmButton: true,
        timer: 1500
    })
}