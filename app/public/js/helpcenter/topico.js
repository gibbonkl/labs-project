var time = 500;

var editor = CKEDITOR.replace('corpo_comment');
editor.on('required', function(evt){
    editor.showNotification('Insira o conteúdo da resposta.', 'warning');
    evt.cancel();
});

$(document).ready(function() {
    list_comments(topic_id())
});

function animaLoad() {
    $(".progress").addClass('hide').hide('slow');
    $("#list_comments").fadeIn('fast').removeClass('hide');
}

   
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
					<span class="grey-text text-darken-1 div-margin nome-user-resposta user-resposta">${comment.username}<i class="left material-icons">person</i></span>
				</div>
				<div class="col s2">
					<span class="grey-text right">${comment.data}</h5>
				</div>  
				<div class="col s6 black-text corpo-resposta">
					${comment.corpo}
                </div>
                <div class="div-margin col s6 div-like-botao">
                <a id="like-button-c" class="btn-static waves-effect waves-light like like_comments  ${comment.likes.indexOf($("#comment_form .nome-user").html())>=0?"bg-blue-compass":"not-liked-c"}  
                ${$(".isDisabled").length? "isDisabled grey"  : ""} btn rounded like like-botao liked" onclick="like_comments('${comment._id}')">
                    <i class="left material-icons">thumb_up</i>
                    <span id="number-likes-c" class= "number-likes-c">${comment.likes.length}</span>
                </a>    
            </div>

                ${comment.permissao?
                `
                    <div class="right" style="margin-top: 20px">
                        <button class="btn-floating white" onclick="edit_comment('${comment._id}','${comment.username}')"><i class="material-icons black-text">edit</i></button>
                        <button class="btn-floating white" onclick="delete_comment('${comment._id}')"><i class="material-icons black-text">delete</i></button>
                    </div>
                `
                    :
                ''
                
                }
 
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
        .then(response => {response['permissao'] = true; return response})
        .then(response => {
            $('#list_comments').prepend(render_comment(response));
            CKEDITOR.instances.corpo_comment.setData('');
            window.location.href="#respostas";
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
                    element.classList.remove('bg-blue-compass');
                    element.classList.add('not-liked');

                }
            }

        })
        .catch(console.log);
}


function like_comments(id) {

    let idcomm = id;

    let element = $(`#${idcomm} #like-button-c`);
    console.log(element)
    let likes = parseInt($(`#${idcomm} #number-likes-c`).html())
    console.log(likes)
    let like
    element.hasClass('not-liked-c') ? like = 1 : like = -1



    fetch("/helpcenter/comentario/like", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: idcomm, like })
        })
        .then(response => {
            if (response) {
                $(`#${idcomm} #number-likes-c`).html(likes + like);
                if (like > 0) {
                    element.removeClass('not-liked-c');
                    element.addClass('bg-blue-compass');
                } else {
                    element.removeClass('bg-blue-compass');
                    element.addClass('not-liked-c');

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
                $('.btn-resolvido').addClass("green");
                $('.btn-resolvido').removeClass("bg-blue-compass");
            }
        })
        .catch(console.log);
}

function edit_topic(id) {
    window.location.href = "/helpCenter/editar/" + id
}

function delete_topic() {
    let id = topic_id();
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
                    .catch(() => setTimeout(() => { message('error', 'Houve um problema na comunicação :(') }, time))
            }
        })
        .catch(console.log)
}

function forum() {
    window.location.href = "/helpcenter";
}

function delete_comment(id) {
    let idPostagem = topic_id();
    let idComentario = id;

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
                        body: JSON.stringify({ idPostagem, idComentario })
                    })
                    .then(response => response.json())
                    .then(response => {
                        message('success', 'Topico Deletado!');
                        $(`#${idComentario}`).remove();
                    })
                    .catch(() => setTimeout(() => { message('error', 'Unexpected Error') }, time))
            }
        })
        .catch(console.log)
}

/*
 *   Função para renderizar os dados no modal genericamente
 *  e habilita o framework do CKeditor na abertura do modal;
 */
const renderEdit = (dados) => {
    $("#modal-form").html(`
        <div id="editcomm_form" class="div-margin col s12" value=${dados.comentario.id}>
            <div class="input-field col s12">
                <img src="../../public/img/user.png" alt="" class="circle avatar-user">
                <span class="grey-text text-darken-2 nome-user">${dados.comentario.username}</span>
            </div>
            <div>
                <textarea id="text_editcomm" rows="10" cols="80" required></textarea>
            </div>
            <div class="div-margin col s12 center">
                <button class="btn grey white-text rounded modal-close">Cancelar</button>
                <button id="btn-edit-comm" class="btn bg-blue-compass rounded" onclick="enviaEdit('${dados._id}', '${dados.comentario.id}')">Editar</button>
            </div>
        </div>
    `);
    CKEDITOR.replace('text_editcomm');
}

/*
 * Capta os dados necessário para edição no click do botão editar;
 * Quando a renderização de dados estiver completa, ele abre o modal evitando o delay;
 * Os dados são individuais de cada usuário que comentou.
 */
const edit_comment = (id, username) => {

    const dados = {
        _id: topic_id(),
        comentario: {
            id,
            username
        }
    };
    renderEdit(dados);
    $("#modal_editcomm").modal({
        opacity: 0.9,
        dismissible: false
    }).modal('open');

    let content = $(`#${id} .corpo-resposta`).html();
    CKEDITOR.instances['text_editcomm'].setData(content);

    return dados
}


/*
 * Envia os dados editados do comentário;
 * Seta a alteração no comentario;
 * Notifica o usuário da alteração e fecha o modal.
 */
function enviaEdit(_id, id) {
    let corpo = CKEDITOR.instances['text_editcomm'].getData();
    let dados = {
        _id: id,
        corpo
    }
    if(corpo!=''){
        //console.log(dados)
        fetch("/helpcenter/comentario", {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            })
            .then(response => {
                //console.log(response)
                $(`#${id} .corpo-resposta`).html(dados.corpo);
                M.toast({ html: "Comentário editado com sucesso!", displayLength: 2000 });
                $("#modal_editcomm").modal('close');

            })
            .catch(console.log)
    } else{        
        M.toast({ html: "Por favor insira sua resposta.", displayLength: 2000 });
    }
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