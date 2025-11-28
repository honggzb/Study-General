'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//JSX - Javascript XML

// let visiblility = false;

// const toggleVisibility = () => {
//     visiblility = !visiblility;
//     render();
// };

// var appRoot = document.getElementById('app');
// const render = () => {
//     const template = (
//         <div>
//             <h1>Visiblity Toggle</h1>
//             <button onClick={toggleVisibility}>
//                 {visiblility ? 'Hide Details' : 'Show details'}
//             </button>
//             { visiblility && (<div><p>Hey. These are some details you can now see!</p></div>) }
//         </div>);
//     ReactDOM.render(template, appRoot);
// }

// render();

// class sample

var ToggleVisible = function (_React$Component) {
    _inherits(ToggleVisible, _React$Component);

    function ToggleVisible(props) {
        _classCallCheck(this, ToggleVisible);

        var _this = _possibleConstructorReturn(this, (ToggleVisible.__proto__ || Object.getPrototypeOf(ToggleVisible)).call(this, props));

        _this.toggleV = _this.toggleV.bind(_this);
        _this.state = {
            visiblility: false
        };
        return _this;
    }

    _createClass(ToggleVisible, [{
        key: 'toggleV',
        value: function toggleV() {
            this.setState(function (prevState) {
                return { visiblility: !prevState.visiblility };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h1',
                    null,
                    'Visiblity Toggle'
                ),
                React.createElement(
                    'button',
                    { onClick: this.toggleV },
                    this.state.visiblility ? 'Hide Details' : 'Show details'
                ),
                this.state.visiblility && React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'p',
                        null,
                        'Hey. These are some details you can now see!'
                    )
                )
            );
        }
    }]);

    return ToggleVisible;
}(React.Component);

ReactDOM.render(React.createElement(ToggleVisible, null), document.getElementById('app'));
