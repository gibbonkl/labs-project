CKEDITOR.replace('corpo');
/*script chip - escuta o click nas tags*/
$(".chip").click(function(element) {
    ($(this).hasClass("select-chip")) ? $(this).removeClass("select-chip"): $(this).addClass("select-chip")
        /*verifica se algum foi selecionado*/
    verificaTags();
});

function verificaTags() {
    const array = [];
    $(".chip").each(function(value, index) {
        /*verifica quais chips foram selecionados*/
        if ($(index).hasClass("select-chip")) {
            array.push($(index).text());
        }
    })
    $("#tags").val(array);
    return array;
}