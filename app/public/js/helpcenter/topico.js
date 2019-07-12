function animaLoad() {
    $(".progress").addClass('hide').hide('slow');
    $("#show_dailies").fadeIn('fast').removeClass('hide');
}

$(document).ready(function() {
	list_comments(topic_id())
});

function topic_id(){
	let href = window.location.href.split('/');
	return href[href.length-1]
}

function render_comment(comment){
	return `
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
		</div>`
}

function list_comments(id){
    fetch("/helpcenter/comments/" + id, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
		})
		.then(response => response.json())
		.then(response => response.comentarios)
        .then(comments => {
            animaLoad()
            $('#list_comments').html(comments.map(comment => render_comment(comment)).join(''));
        })
        .catch(console.log)
}

$("#comment_form").submit(function( event ) {
	event.preventDefault();

	let body = {id_postagem: topic_id(),
			corpo: CKEDITOR.instances.corpo_comment.getData()}
	
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
	console.log(element.classList.contains('not-liked'))
	element.classList.contains('not-liked') ? like = 1 : like = -1
	console.log(like)

	fetch("/helpcenter/like", {
			method: "POST",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({_id:topic_id(), like: like})
		})
		.then(response => {
			if(response) {
				document.getElementById("number-likes").innerHTML = likes + like;
				if(like>0){
					console.log("Not-liked")
					element.classList.remove('not-liked');
					element.classList.add('bg-blue-compass');
				} 
				else{
					console.log("Liked")
					element.classList.remove('bg-blue-compass') ;
					element.classList.add('not-liked');

				}
			}

		})
		.catch(console.log);

}

function edit_topic(){

}

function delete_topic(){

}

function delete_comment(){

}

function edit_comment(){

}

var config = {
    //extraPlugins: 'codesnippet, widget',
    codeSnippet_theme: 'monokai_sublime',
    height: 356,
    removePlugins: 'wsc',
    removeButtons: 'Outdent,Indent,Cut,Copy,Paste,PasteFromWord,Anchor,Styles,Specialchar',
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
      },
      {
        "name": "links",
        "groups": ["links"]
      },
      {
        "name": "paragraph",
        "groups": ["list", "blocks"]
      },
      {
        "name": "document",
        "groups": ["mode"]
      },
      {
        "name": "insert",
        "groups": ["insert"]
      },
      {
        "name": "about",
        "groups": ["about"]
      }
    ]
}
CKEDITOR.replace('corpo_comment', config);