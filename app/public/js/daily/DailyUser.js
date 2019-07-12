import { DailyController } from './DailyController';
import { DailyCrud } from './DailyCrud';

class DailyUser
{
    constructor()
    {
        dailyController = new DailyController();
        dailyCrud       = new DailyCrud();
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
        dailyController.showData();
    }

    showUser()
    {
        dailyController.showUser();
    }
}

let start = new DailyUser();