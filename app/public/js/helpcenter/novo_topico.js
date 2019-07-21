CKEDITOR.replace('corpo');

/*script chip - Seta cores nas tags no click*/
$(".chip").click(function(element) {
    ($(this).hasClass("select-chip")) ? $(this).removeClass("select-chip"): $(this).addClass("select-chip")
    verificaTags();
});

/*script chip - Envia tags escolhidas*/
function verificaTags() {
    const array = [];
    $(".chip").each(function(value, index) {
            /*verifica quais chips foram selecionados e adiciona no array*/
            if ($(index).hasClass("select-chip")) {
                array.push($(index).text());
            }
        })
        /*Preenche os valores no input hidden */
    $("#tags").val(array);
    return array;
}