function dateConverter(date = new Date()) 
{
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

$(document).ready(function() {
    listarDailiesData(dateConverter(),1);
});