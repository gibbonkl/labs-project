function listarHelpcenter(pagina)
{
    fetch(`https://reborn100contrato.azurewebsites.net/helps/list/post/${pagina}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(response => {

        console.log(response);
    })
    .catch((e) => console.log(e))
}