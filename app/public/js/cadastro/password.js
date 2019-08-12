$("form").submit((event) => {
    $(".active").each(function(element, value) {
        let input = $(value).attr('id');
        const flag = false;

        if (input) {
            $(this).addClass("invalid");
            flag = true;
        } else {
            $(this).addClass("valid");
        }
    })
    if (flag) {
        M.toast({ html: "Ops.. você deve preencher todos campos corretamente!", displayLength: 3500 });
    }

    event.preventDefault();
    $("#senha").val(md5($("#senha").val()))
    $("#repsenha").val(md5($("#repsenha").val()))
})