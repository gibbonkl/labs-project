//Crea el recuadro para recortar
var $uploadCroppedPhoto
$uploadCroppedPhoto = $('#main-cropper').croppie({
    viewport: { 
		width: 200, 
		height: 200,
		type: 'circle' 
	},
    boundary: { 
		width: 250, 
		height: 250 
	},
    showZoomer: true,
    enableExif: true
});

//Lee la imagen y la muestra para recortar
$(function() {
  function readFile(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('#main-cropper').croppie('bind', {
          url: e.target.result
        });
      }

      reader.readAsDataURL(input.files[0]);
    }
	}

  $("#upload").change(function(){
    readFile(this);
  });

});

//Muestra la imagen recortada
$('.actionCrop').on('click', function (ev) {
  $uploadCroppedPhoto.croppie('result', {
    type: 'canvas',
    size: 'viewport'
  }).then(function (resp) {
    this.picture = $("#resultado img");
    this.picture.attr('src', resp);
  });
});

// //Envia la imagen recortada en base64, hay que decodificarla del lado del servidor
// $('.subir').on('click', function (ev) {
//   	var blobFile = $('#resultado img').attr('src');
//     var formData = new FormData();
//     formData.append("fileToUpload", blobFile);
  
//     //Manda la imagen de forma asincronica, puede servir para
//     //otras cosas
//     $.ajax({
//        type: "POST",
//        data: formData,
//        processData: false,
//        contentType: false,
//        success: function(response) {
//            // .. do something
//        },
//        error: function(jqXHR, textStatus, errorMessage) {
//            console.log(errorMessage); // Optional
//        }
//     });
// });