$("form").submit((event)=> {
    $("#senha").val(md5($("#senha").val()))
    $("#repsenha").val(md5($("#repsenha").val()))
})