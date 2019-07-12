import { DailyController } from './DailyController.js';
import { DailyCrud } from './DailyCrud.js';

class DailyUser
{
    constructor()
    {
        this.dailyController = new DailyController();
        this.dailyCrud       = new DailyCrud();
    }

    listeners()
    {
        $("#radio-one").click(this.showData());
        $("#radio-two").click(this.showUser());
        $("#filtro").click(this.filtrar());
        $("#create").click(this.inserir());
        //$("#remove").click(this.deletar( $("#remove").closest('ul').attr('id')) );
        //$("#editar").click(this.editar( $("#editar").closest('ul').attr('id')) );
    }
    filtrar()
    {
        let data = $("input[name='filter_data']").val();
        let name = $("input[name='filter_username']").val();
        if(name.length) this.dailyCrud.listarPorUser(name)
        else data.length ? this.dailyCrud.listarPorData(data) : this.dailyCrud.listar()
    }

    showData()
    {

        this.dailyController.showData();
    }

    showUser()
    {
        this.dailyController.showUser();
    }

    inserir()
    {
        this.dailyCrud.inserir();
    }

    deletar()
    {
        this.dailyCrud.deletar(id);
    }

    editar()
    {
        this.dailyCrud.editar(id);
    }
}

let daily = new DailyUser();
daily.listeners();