class CrudDaily {

    constructor() {
        this.Id = $(this).attr('data-id');
    }

    function create() {
        Swal.mixin({
            input: 'text',
            confirmButtonText: 'Próximo &rarr;',
            showCancelButton: true,
            progressSteps: ['1', '2', '3']
        }).queue([
            {
                title: 'O que você fez ontem?'
            },
            {
                title:'O que você fará hoje?',
            },
            {
                title: 'Teve ou tem algum impedimento?',
            } 
        ]).then((result) => {
            if(result.value=== '') { 
                return !value && 'Você precisar escrever alguma coisa!'
            } else {
                Swal.fire({
                    title: 'Excelente!',
                    html:
                    'Your answers: <pre><code>' +
                        JSON.stringify(result.value) +
                    '</code></pre>',
                    confirmButtonText: 'Registrar Daily! '
                })
            }
        })
    }

    function update(id) {
        
    }
    function delete(id) {
        
    }
    function lista() {
        
    }
}