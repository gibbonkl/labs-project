"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DailyComponent = function (_Component) {
    _inherits(DailyComponent, _Component);

    function DailyComponent() {
        _classCallCheck(this, DailyComponent);

        return _possibleConstructorReturn(this, (DailyComponent.__proto__ || Object.getPrototypeOf(DailyComponent)).apply(this, arguments));
    }

    _createClass(DailyComponent, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "li",
                null,
                _react2.default.createElement(
                    "div",
                    { "class": "collapsible-header" },
                    _react2.default.createElement(
                        "i",
                        { "class": "material-icons" },
                        "face"
                    ),
                    _react2.default.createElement(
                        "span",
                        { "class": "span-margin" },
                        this.props.daily.user
                    ),
                    _react2.default.createElement(
                        "i",
                        { "class": "material-icons" },
                        "event"
                    ),
                    _react2.default.createElement(
                        "span",
                        { "class": "span-margin align-right" },
                        this.props.daily.data
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { "class": "collapsible-body grey lighten-3" },
                    _react2.default.createElement(
                        "span",
                        null,
                        "Ontem: ",
                        this.props.daily.corpo.ontem
                    ),
                    _react2.default.createElement("br", null),
                    _react2.default.createElement(
                        "span",
                        null,
                        "Hoje: ",
                        this.props.daily.corpo.hoje
                    ),
                    _react2.default.createElement("br", null),
                    _react2.default.createElement(
                        "span",
                        null,
                        "Impedimentos: ",
                        this.props.daily.corpo.impedimentos
                    )
                )
            );
        }
    }]);

    return DailyComponent;
}(_react.Component);

exports.default = DailyComponent;