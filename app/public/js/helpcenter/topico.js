function animaLoad() {
    $(".progress").addClass('hide').hide('slow');
    $("#show_dailies").fadeIn('fast').removeClass('hide');
}

$(document).ready(function() {
    list_comments(topic_id())
});

function topic_id() {
    let href = window.location.href.split('/');
    return href[href.length - 1]
}

function render_comment(comment) {
    return `
		<div id="${comment._id}">
			<div class="div-margin col s12 divider"></div>
			<div class="col s12 white resposta">
				<div class="col s10">
					<span class="grey-text text-darken-1 div-margin nome-user-resposta"><i class="left material-icons">person</i>${comment.username}</span>
				</div>
				<div class="col s2">
					<span class="grey-text right">${comment.data}</h5>
				</div>  
				<div class="col s12 black-text corpo-resposta">
					${comment.corpo}
				</div>
			</div>
		</div>`
}

function list_comments(id) {
    fetch("/helpcenter/comments/" + id, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(response => {
            if (response.erro)
                console.log(response.erro)
            else
                return response
        })
        .then(response => response.comentarios)
        .then(comments => {
            animaLoad()
            $('#list_comments').html(comments.map(comment => render_comment(comment)).join(''));
        })
        .catch(console.log)
}

$("#comment_form").submit(function(event) {
    event.preventDefault();

    let body = {
        id_postagem: topic_id(),
        corpo: CKEDITOR.instances.corpo_comment.getData()
    }

    fetch("/helpcenter/comentario", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        //.then(response => console.log(response))
        //.then(response => {response['permissao'] = true; return response})
        .then(response => {
            $('#list_comments').append(render_comment(response));
            CKEDITOR.instances.corpo_comment.setData('<p>Digite aqui o conteúdo da sua resposta.</p>')
        })
        .catch(console.log);
});

function like() {

    let element = document.getElementById('like-button');

    let likes = parseInt(document.getElementById("number-likes").innerHTML)
    let like
    element.classList.contains('not-liked') ? like = 1 : like = -1

    fetch("/helpcenter/like", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: topic_id(), like: like })
        })
        .then(response => {
            if (response) {
                document.getElementById("number-likes").innerHTML = likes + like;
                if (like > 0) {
                    element.classList.remove('not-liked');
                    element.classList.add('bg-blue-compass');
                } else {
                    console.log("Liked")
                    element.classList.remove('bg-blue-compass');
                    element.classList.add('not-liked');

                }
            }

        })
        .catch(console.log);

}

function resolvido(id) {

    fetch("/helpcenter/resolvido", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: id })
        })
        .then(response => {
            if (response) {
                $("#resolvido-icone").removeClass("grey-text");
                $("#resolvido-icone").addClass("green-text");
                $('.btn-resolvido').addClass("grey");
                $('.btn-resolvido').removeClass("bg-blue-compass");
            }
        })
        .catch(console.log);
}

function edit_topic(id) {
    window.location.href = "/helpCenter/editar/" + id
}

function delete_topic() {

    id = topic_id();
    console.log(id);
    Swal.fire({
            title: 'Tem certeza que deseja excluir este topico?',
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
                fetch("/helpcenter", {
                        method: "DELETE",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ idpostagem: id })
                    })
                    .then(response => response.json())
                    .then(response => {
                        if (response.erro)
                            message('error', response.erro)
                        else {
                            Swal.fire({
                                    position: 'center',
                                    type: 'success',
                                    title: 'Topico Deletado!',
                                    showConfirmButton: true,
                                    timer: 1500
                                })
                                .then(res => forum());
                        }
                    })
                    .catch(message('error', 'Unexpected Error'))
            }
        })
        .catch(console.log)
}

function forum() {
    window.location.href = "/helpcenter";
}

function delete_comment(idC) {
    idP = topic_id();
    Swal.fire({
            title: 'Tem certeza que deseja excluir este topico?',
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
                fetch("/helpcenter/comentario", {
                        method: "DELETE",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ idpostagem: idP, idComentario: idC })
                    })
                    .then(response => response.json())
                    .then(response => {
                        if (response.erro)
                            message('error', response.erro)
                        else {
                            message('success', 'Topico Deletado!')
                            $(`#${idC}`).remove();
                        }
                    })
                    .catch(message('error', 'Unexpected Error'))
            }
        })
        .catch(console.log)
}

function edit_comment() {

}

CKEDITOR.replace('corpo_comment');

function message(type, title) {
    Swal.fire({
        position: 'center',
        type: type,
        title: title,
        showConfirmButton: true,
        timer: 1500
    })
}

/*script chip - escuta o click nas tags*/
$(".chip").click(function(element) {
    ($(this).hasClass("blue")) ? $(this).removeClass("blue"): $(this).addClass("blue")
        /*verifica se algum foi selecionado*/
});

function verificaTags() {
    $(".chip").each(function(value, index) {
        /*verifica quais chips foram selecionados*/
        const array = [];
        if ($(index).hasClass("blue")) {
            /*adiciona no array*/
            array.push($(index).text());
        }
        console.log(array);
    })
}