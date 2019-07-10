$(document).ready(function() {
    load_topic();
});

function load_topic(){

}

function edit_topic(){

}

function delete_topic(){

}

function list_comments(){
    
}

function insert_comment(){

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
CKEDITOR.replace('corpo-coment', config);