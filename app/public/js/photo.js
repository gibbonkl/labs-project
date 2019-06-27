//redimensiona usando o croppie
var $uploadCroppedPhoto
$uploadCroppedPhoto = $('#main-cropper').croppie({
    viewport: {
        width: 200,
        height: 200,
        type: 'circle'
    },
    boundary: {
        width: 220,
        height: 220
    },
    showZoomer: true,
    enableExif: true
});

//recorta a imagem
$(function() {
    function readFile(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $('#main-cropper').croppie('bind', {
                    url: e.target.result
                });
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#upload").change(function() {
        readFile(this);
        $("#page").removeClass('hide');
        $("#cad_image").addClass('hide');
    });

});

//mostra a foto depois do corte
$('.actionCrop').on('click', function(ev) {
    $uploadCroppedPhoto.croppie('result', {
        type: 'canvas',
        size: 'viewport'
    }).then(function(resp) {
        this.picture = $("#cad_image").attr('src', resp);
        $("#page").addClass('hide');
        $("#cad_image").removeClass('hide').show('slow');
        	var blobFile = $('#cad_image').attr('src');
          var formData = new FormData();
          formData.append("fileToUpload", blobFile);
        	$('#cad_image').val(formData);
    });
});

$("#cad_image").click(function() {
    $("input[id='upload']").click();
});
