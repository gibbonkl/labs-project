'use strict';

var _ListDailiesComponent = require('./ListDailiesComponent');

var _ListDailiesComponent2 = _interopRequireDefault(_ListDailiesComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('aqui');
dailies = [{
    user: "albano",
    data: "01/01/2019",
    corpo: {
        ontem: "nada",
        hoje: "nadinha",
        impedimentos: "nops"
    }
}, {
    user: "albano",
    data: "01/01/2019",
    corpo: {
        ontem: "nada",
        hoje: "nadinha",
        impedimentos: "nops"
    }
}];

ReactDOM.render(React.createElement(_ListDailiesComponent2.default, { dailies: dailies }), document.getElementById('collapsible_daily'));