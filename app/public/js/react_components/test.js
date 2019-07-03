import ListDailiesComponent from './ListDailiesComponent'

console.log('aqui')
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

ReactDOM.render(
    <ListDailiesComponent dailies={dailies}/>,
    document.getElementById('collapsible_daily')
);