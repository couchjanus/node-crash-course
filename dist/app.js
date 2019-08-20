"use strict";

var _chalk = _interopRequireDefault(require("chalk"));

var _server = _interopRequireDefault(require("./services/server"));

var _config = _interopRequireDefault(require("./config"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 *    Server Options
 */
var opts = {
  port: _config["default"].port,
  env: _config["default"].env,
  routes: _routes["default"]
  /**
   *    Start the Server
   */

};

_server["default"].start(opts).then(handleSuccess)["catch"](handleError);

function handleSuccess() {// Server is up and running properly
}

function handleError(error) {
  if (_typeof(error) == 'object') {
    console.log('Error:', error);
  } else {
    var exitIcon = _chalk["default"].bold.cyan("\u26A0");

    var exitMsg = _chalk["default"].cyan("Server shutting down ... ".concat(_chalk["default"].bold.italic("exiting now")));

    var message = "".concat(error, "\n\n  ").concat(exitIcon, "  ").concat(exitMsg, "\n");
    console.log("".concat(message, "\n").concat(_server["default"].logLineBreak(), "\n"));
  }

  process.exit(1);
}