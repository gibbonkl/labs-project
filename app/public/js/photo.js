// $uploadCrop = $('#cad_photo').croppie({
//     enableExif: true,
//     viewport: {
//         width: 200,
//         height: 200,
//         type: 'circle'
//     },
//     boundary: {
//         width: 500,
//         height: 500
//     }
// });
$("#cad_photo")click(function){
    
});
$uploadCrop = $("#cad_photo").croppie({
        enableExif: true,
        viewport: {
        width: 200,
        height: 200,
        type: "circle"
    }
});

  function demoUpload() {
    var $uploadCrop;

    function readFile(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
          $("#cad_photo").addClass("ready");
          $uploadCrop
            .croppie("bind", {
              url: e.target.result
            })
            .then(function() {
              console.log("jQuery bind complete");
            });
        };

        reader.readAsDataURL(input.files[0]);
      }
    }


$("#upload").on("change", function() {
    readFile(this);
});

$("#img_result").on("click", function(ev) {
    $uploadCrop
    .croppie("result", {
        type: "canvas",
        size: "viewport"
    })
    .then(function(resp) {
        popupResult({
        src: resp
        });
    });
});
}

function popupResult(result) {
	$('#btn_img').attr('src', result.src);
}
