function submit() {

    var dados = {
        username: document.querySelector('#login_email').value,
        senha: document.querySelector('#login_senha').value
    };

    
    var data = new FormData();
    data.append( "json", JSON.stringify( dados ) );

    // fetch('http://localhost:1337/login', {
    //     method: 'post',
    //     headers: {
    //         'Accept': 'application/json, text/plain, */*',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(dados)
    //     });
        // .then(res=>res.json())
        // .then(res => console.log(res));

    (async () => {
        const rawResponse = await fetch('http://localhost:1337/login', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        const content = await rawResponse;
        location.reload();
        console.log(content);
        })();
}