module.exports = function(app) {

    Swal.mixin({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '3']
      }).queue([
        {
          title: 'Question 1',
          text: 'O que você fez ontem?'
        },
        {
          title: 'Question 2',
          text:'O que você fará hoje?',
        },
        {
        title: 'Question 3',
        text: 'Teve ou tem algum impedimento?',
        } 
      ]).then((result) => {
        if(value=== '') { return !value && 'Você precisar escrever alguma coisa!'
          
      } else { Swal.fire({
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