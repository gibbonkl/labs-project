    $(document).ready(function() {
        $.each(function(arg) {
            console.log(arg)
        });
    });



    function create() {
        Swal.mixin({
                input: 'text',
                confirmButtonText: 'Próximo &rarr;',
                showCancelButton: true,
                progressSteps: ['1', '2', '3']
            }).queue([{
                    title: 'O que você fez ontem?'
                },
                {
                    title: 'O que você fará hoje?',
                },
                {
                    title: 'Teve ou tem algum impedimento?',
                }
            ]).then((result) => {
                console.log(result)
                if (result.value) {
                    Swal.fire({
                        title: 'Excelente!',
                        html: 'Your answers: <pre><code>' +
                            JSON.stringify(result.value) +
                            '</code></pre>',
                        confirmButtonText: 'Registrar Daily! '
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
                    <span class="span-margin data align-right" data-date="${dados.data}">${dados.data}</span>
                </div>
                <div class="collapsible-body grey lighten-3">
                    <div class="row">
                        <div class="col s6">
                            <span>Ontem:</span><span class="ontem" data-ontem="${dados.corpo.ontem}">${dados.corpo.ontem}</span><br>
                            <span>Hoje:</span><span class="hoje" data-hoje="${dados.corpo.hoje}">${dados.corpo.hoje}</span><br>
                            <span>Impedimentos:</span><span class="impedimento" data-imp="${dados.corpo.impedimento}">${dados.corpo.impedimento}</span>
                        </div>
                        <div class="col s6">
                            <a class="btn-floating white right" href="#delete"><i class="material-icons black-text">delete</i></a>
                            <a class="btn-floating white right btn-margin-right" onclick="update('${dados._id}')" href="#edit"><i class="material-icons black-text">create</i></a>
                        </div>
                    </div>
                </div>
            </li>`

    }




    function update(id) {

        const { value: formValues } = Swal.fire({
                title: 'Edição de Daily',
                html: '<input id="edit-data" class="swal2-input">' +
                    '<input id="edit-ontem" class="swal2-input">' +
                    '<input id="edit-hoje" class="swal2-input">' +
                    '<input id="edit-impedimento" class="swal2-input">',
                focusConfirm: false,
                preConfirm: () => {
                    return {
                        data: $('#edit-data').val(),
                        ontem: $('#edit-ontem').val(),
                        hoje: $('#edit-hoje').val(),
                        impedimento: $('#edit-impedimento').val()
                    }

                }
            })
            .then(resp => {
                fetch("/daily", {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(resp)
                })

            })



        // if (formValues) {
        //     Swal.fire(JSON.stringify(formValues))
        // }

    }

    // function delete(id) {

    // }