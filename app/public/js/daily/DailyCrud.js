import { DailyController } from './DailyController';

class DailyCrud
{
    constructor()
    {
        dailyController = new DailyController();
        this.listar();
    }

    criar()
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
        .then(response => this.dailyController.adicionarDailyDOM(response))
        .catch(console.log);
    }

    editar()
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
                .then(resp => {

                    $("#" + id + " .ontem").html(resp.ontem);
                    $("#" + id + " .hoje").html(resp.hoje);
                    $("#" + id + " .imp").html(resp.impedimento);

                    Swal.fire({
                        position: 'center',
                        type: 'success',
                        title: 'Daily Editada!',
                        showConfirmButton: true,
                        timer: 1500
                    })
                })
                .catch(() => {

                    Swal.fire({
                        position: 'center',
                        type: 'error',
                        title: 'Não Foi Possível Editar a Daily no Momento!',
                        showConfirmButton: true,
                        timer: 1500
                    })
                })
                
            })
            .catch(resp => {
                Swal.close();
            })
    }

    deletar(id)
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
                .then(resp => {

                    this.dailyController.removerElementDOM(id);
                    Swal.fire(
                        'Excluida!',
                        'A sua daily foi deletada!',
                        'success'
                    )
                })
                .catch(() => {

                    
                    Swal.fire({
                        position: 'center',
                        type: 'error',
                        title: 'Não Foi Possível Deletar A Daily No Momento!',
                        showConfirmButton: true,
                        timer: 1500
                    })
                })
                return resp;
            }
        })
        .then((result) => {
            if (result.value) {
                
            }
        })
        .catch((result) => {
            Swal.close();
        })
    }

    listar()
    {
        fetch("/daily/data", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "filtro": this.dailyController.dateConverter()
            })
        })
        .then(response => response.json())
        .then(dailies => {
            this.dailyController.listarDailiesDOM(dailies);
        })
        .catch(console.log)
    }

    listarPorData()
    {
        fetch("/daily/data", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                filtro: data
            })
        })
        .then(response => response.json())
        .then(dailies => {
            this.dailyController.listarDailiesDOM(dailies);
        })
    }

    listarPorUser()
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
            this.dailyController.listarDailiesDOM(dailies);
        })
    }
}

export { DailyCrud };