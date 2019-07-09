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
CKEDITOR.replace( 'editor1', config);