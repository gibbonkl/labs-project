let listDailies = require('./ListDailiesComponent')

dailies = [{
            user:"albano",
            data:"01/01/2019",
            corpo:{
                ontem:"nada",
                hoje:"nadinha",
                impedimentos:"nops"
            }
        },
        {
            user:"albano",
            data:"01/01/2019",
            corpo:{
                ontem:"nada",
                hoje:"nadinha",
                impedimentos:"nops"
            }
        }];

let element = '<listDailies dailies={dailies}/>';
ReactDOM.render(
    element,
    document.getElementById('listDailies')
);