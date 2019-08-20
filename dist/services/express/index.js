"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.start = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _chalk = _interopRequireDefault(require("chalk"));

var _morgan = _interopRequireDefault(require("morgan"));

var _errorhandler = _interopRequireDefault(require("errorhandler"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cookieParser = require('cookie-parser');

var flash = require('express-flash');

var csrf = require('csurf');

var start = function start(_ref) {
  var routes = _ref.routes,
      _ref$port = _ref.port,
      port = _ref$port === void 0 ? 3000 : _ref$port,
      _ref$env = _ref.env,
      env = _ref$env === void 0 ? 'development' : _ref$env;
  return function () {
    return new Promise(function (resolve, reject) {
      var app = (0, _express["default"])();
      app.set('port', port);
      app.use((0, _morgan["default"])('dev'));
      app.use('/static', _express["default"]["static"](__dirname + '/../../public/assets'));
      app.set('views', _path["default"].join(__dirname, '/../../views'));
      app.set('view engine', 'pug');
      app.use(_bodyParser["default"].json());
      app.use(_bodyParser["default"].urlencoded({
        extended: false
      }));
      app.use(cookieParser());
      app.use(csrf({
        cookie: true
      }));
      app.use(function (req, res, next) {
        res.locals.csrfToken = req.csrfToken();
        next();
      });

      if (env === 'development') {
        app.use((0, _errorhandler["default"])());
      }

      app.use(routes);
      app.listen(app.get('port'), function () {
        return resolve(successMessage({
          port: port
        }));
      });
    });
  };
};

exports.start = start;
var _default = {
  start: start
};
exports["default"] = _default;

function successMessage(vars) {
  var icon = _chalk["default"].bold.green('✔︎');

  var url = _chalk["default"].green.bold.underline("http://localhost:".concat(vars.port));

  var stopMsg = _chalk["default"].dim.italic("     Press CTRL-C to stop");

  var message = "  ".concat(icon, "  API server running at ").concat(url, "\n\n").concat(stopMsg, "\n");
  return message;
}