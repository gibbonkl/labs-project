function inserir()
{
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
    ])
    .then( result => {
        return {
            'ontem': result.value[0],
            'hoje': result.value[1],
            'impedimento': result.value[2]
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

            if(response.erro)
                message('error', response.erro);
            else
            {
                adicionarDailyDOM(response);
                message('succes', 'Daily registrada!')
            }
        })
        .catch(message('error', 'Unexpected Error'))
    })
    .catch(() => {console.log});
        
}



function deletar(id)
{
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

                if(response.erro)
                    message('error', response.erro)
                else
                {
                    removerElementDOM(id);
                    message('succes', 'A Sua Daily Foi Deletada!')
                }
            })
            .catch(message('error', 'Unexpected Error'))
            
        }
    })
    .catch(console.log)
}

function listar()
{
    fetch("/daily/data", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "filtro": dateConverter()
        })
    })
    .then(response => response.json())
    .then(dailies => {
        listarDailiesDOM(dailies);
    })
    .catch(console.log)
}

function listarPorData(data)
{
    fetch("/daily/data", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            filtro: data
        })
    })
    .then(response => response.json())
    .then(dailies => listarDailiesDOM(dailies))
}

function listarPorUser(name)
{
    fetch("/daily/user", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            filtro:name
        })
    })
    .then(response => response.json())
    .then(dailies => {
        listarDailiesDOM(dailies);
    })
}

function filtrar(){
    let data = $("input[name='filter_data']").val();
    let name = $("input[name='filter_username']").val();
    if(name.length) listarPorUser(name)
    else data.length? listarPorData(data) : listar()

}

function editar(id)
{
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
            .then(response => response.json())
            .then(response => {
                
                console.log(response.corpo.ontem);
                console.log($("#" + id + " .ontem").html());
                if(response.erro)
                    message('error', response.erro);
                else
                {
                    $("#" + id + " .ontem").html(response.corpo.ontem);
                    $("#" + id + " .hoje").html(response.corpo.hoje);
                    $("#" + id + " .imp").html(response.corpo.impedimento);
                    message('succes', 'Daily Editada!');
                }
                
            })
            .catch(message('error', 'Unexpected Error'))
            
        })
        .catch(() => {console.log});
}

function message(type, title)
{
    Swal.fire({
        position: 'center',
        type: type,
        title: title,
        showConfirmButton: true,
        timer: 1500
    })
}