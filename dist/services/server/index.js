"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _chalk = _interopRequireDefault(require("chalk"));

var _config = _interopRequireDefault(require("./../../config"));

var _express = _interopRequireDefault(require("./../express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  start: function start(opts) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      _this.init(opts.env).then(console.log).then(_express["default"].start(opts)).then(console.log).then(_this.done).then(console.log).then(resolve)["catch"](function (err) {
        return reject(err);
      });
    });
  },
  errorHandler: function errorHandler(err) {
    process.exit(console.log('Error?!', err));
  },
  init: function init() {
    var _this2 = this;

    var env = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'development';
    return new Promise(function (resolve, reject) {
      var header = _this2.logLineBreak('\n\n');

      var envText = _chalk["default"].bold(_lodash["default"].toUpper(env));

      var text = "     API Server Started in ".concat(envText, " mode");

      var footer = _this2.logLineBreak();

      var message = "".concat(header).concat(text, "\n").concat(footer);
      return resolve(message);
    });
  },
  done: function done() {
    var message = "".concat(logLineBreak(), "\n");
    return message;
  },
  logLineBreak: logLineBreak
};
exports["default"] = _default;

function logLineBreak() {
  var pre = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var post = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '\n';

  var character = _lodash["default"].repeat("\u2014", 85);

  return _chalk["default"].white.dim("".concat(pre + character + post));
}