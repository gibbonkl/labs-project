import { DailyController } from './DailyController.js';
import { DailyCrud } from './DailyCrud.js';

$(document).ready(function() {
    //listDailies();
    var dailyCrud = new DailyCrud();
    dailyCrud.listar();

    var dailyController = new DailyController();
    //dailyController.datePicker();
    
    $("#radio-one").click( () => console.log('radio one') );
    $("#radio-two").click( () => console.log('radio two')  );
    $("#filtro").click( () => {
        console.log($("i[name='deletarDaily']")) 
        // let data = $("input[name='filter_data']").val();
        // let name = $("input[name='filter_username']").val();
        // if(name.length) this.dailyCrud.listarPorUser(name)
        // else data.length ? this.dailyCrud.listarPorData(data) : this.dailyCrud.listar()
    });
    $("#inserir").click( () => console.log('inserir')  );
    
    $("i[name='deletarDaily']").click( () => {
        console.log('deletar' + $(this).closest('li').attr('id'));
    });
    //$("#editar").click(this.editar( $("#editar").closest('ul').attr('id')) );
});
