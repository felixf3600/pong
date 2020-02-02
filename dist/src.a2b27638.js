// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles/game.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../../public/fonts/slkscr-webfont.eot":[["slkscr-webfont.ffa4090f.eot","public/fonts/slkscr-webfont.eot"],"public/fonts/slkscr-webfont.eot"],"./../../public/fonts/slkscr-webfont.woff":[["slkscr-webfont.1e0cef22.woff","public/fonts/slkscr-webfont.woff"],"public/fonts/slkscr-webfont.woff"],"./../../public/fonts/slkscr-webfont.ttf":[["slkscr-webfont.e002edc4.ttf","public/fonts/slkscr-webfont.ttf"],"public/fonts/slkscr-webfont.ttf"],"./../../public/fonts/slkscr-webfont.svg":[["slkscr-webfont.16d40719.svg","public/fonts/slkscr-webfont.svg"],"public/fonts/slkscr-webfont.svg"],"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/settings.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PADDLE_SPEED = exports.PLAYER_TWO_DOWN = exports.PLAYER_TWO_UP = exports.PLAYER_ONE_DOWN = exports.PLAYER_ONE_UP = exports.BALL_RADIUS = exports.PADDLE_GAP = exports.PADDLE_HEIGHT = exports.PADDLE_WIDTH = exports.GAME_HEIGHT = exports.GAME_WIDTH = exports.SVG_NS = void 0;
var SVG_NS = "http://www.w3.org/2000/svg";
exports.SVG_NS = SVG_NS;
var GAME_WIDTH = 512;
exports.GAME_WIDTH = GAME_WIDTH;
var GAME_HEIGHT = 256;
exports.GAME_HEIGHT = GAME_HEIGHT;
var PADDLE_WIDTH = 8;
exports.PADDLE_WIDTH = PADDLE_WIDTH;
var PADDLE_HEIGHT = 56;
exports.PADDLE_HEIGHT = PADDLE_HEIGHT;
var PADDLE_GAP = 10;
exports.PADDLE_GAP = PADDLE_GAP;
var BALL_RADIUS = 10;
exports.BALL_RADIUS = BALL_RADIUS;
var PLAYER_ONE_UP = "a";
exports.PLAYER_ONE_UP = PLAYER_ONE_UP;
var PLAYER_ONE_DOWN = "z";
exports.PLAYER_ONE_DOWN = PLAYER_ONE_DOWN;
var PLAYER_TWO_UP = "ArrowUp";
exports.PLAYER_TWO_UP = PLAYER_TWO_UP;
var PLAYER_TWO_DOWN = "ArrowDown";
exports.PLAYER_TWO_DOWN = PLAYER_TWO_DOWN;
var PADDLE_SPEED = 10;
exports.PADDLE_SPEED = PADDLE_SPEED;
},{}],"src/partials/Board.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _settings = require("../settings");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Board =
/*#__PURE__*/
function () {
  function Board(width, height) {
    _classCallCheck(this, Board);

    this.width = width;
    this.height = height;
  }

  _createClass(Board, [{
    key: "drawBoard",
    value: function drawBoard(svg) {
      var boardSvg = document.createElementNS(_settings.SVG_NS, "rect");
      boardSvg.setAttributeNS(null, "x", 0);
      boardSvg.setAttributeNS(null, "y", 0);
      boardSvg.setAttributeNS(null, "width", this.width);
      boardSvg.setAttributeNS(null, "height", this.height);
      boardSvg.setAttributeNS(null, "fill", "#353535");
      svg.appendChild(boardSvg);
    }
  }, {
    key: "drawCenterLine",
    value: function drawCenterLine(svg) {
      var centerLine = document.createElementNS(_settings.SVG_NS, "line");
      centerLine.setAttributeNS(null, "x1", this.width / 2);
      centerLine.setAttributeNS(null, "y1", 0);
      centerLine.setAttributeNS(null, "x2", this.width / 2);
      centerLine.setAttributeNS(null, "y2", this.height);
      centerLine.setAttributeNS(null, "stroke", "white");
      centerLine.setAttributeNS(null, "stroke-dasharray", "20 15");
      svg.appendChild(centerLine);
    }
  }, {
    key: "render",
    value: function render(svg) {
      this.drawBoard(svg);
      this.drawCenterLine(svg);
    }
  }]);

  return Board;
}();

exports.default = Board;
},{"../settings":"src/settings.js"}],"src/partials/Paddle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _settings = require("../settings");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Paddle =
/*#__PURE__*/
function () {
  function Paddle(boardHeight, width, height, x, y, keyUp, KeyDown, speed) {
    var _this = this;

    _classCallCheck(this, Paddle);

    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.score = 0;
    this.speed = speed;
    document.addEventListener("keydown", function (event) {
      // console.log(event.key);
      switch (event.key) {
        case keyUp:
          _this.movePaddle(-_this.speed);

          break;

        case KeyDown:
          _this.movePaddle(_this.speed);

          break;
        // default:
        //   break;
      }
    });
  }

  _createClass(Paddle, [{
    key: "getScore",
    value: function getScore() {
      return this.score;
    }
  }, {
    key: "getPaddlePosition",
    value: function getPaddlePosition() {
      var postion = {
        top: this.y,
        left: this.x,
        bottom: this.y + this.height,
        right: this.x + this.width
      };
      return postion;
    }
  }, {
    key: "paddleScore",
    value: function paddleScore() {
      this.score++;
    }
  }, {
    key: "movePaddle",
    value: function movePaddle(speed) {
      var nextSpace = this.y + speed;
      var maxBottom = nextSpace + this.height;

      if (nextSpace >= 0 && nextSpace <= maxBottom) {
        this.y = nextSpace;
      }
    }
  }, {
    key: "render",
    value: function render(svg) {
      var paddleSvg = document.createElementNS(_settings.SVG_NS, "rect");
      paddleSvg.setAttributeNS(null, "x", this.x);
      paddleSvg.setAttributeNS(null, "y", this.y);
      paddleSvg.setAttributeNS(null, "width", this.width);
      paddleSvg.setAttributeNS(null, "height", this.height);
      paddleSvg.setAttributeNS(null, "fill", "white");
      svg.appendChild(paddleSvg);
    }
  }]);

  return Paddle;
}();

exports.default = Paddle;
},{"../settings":"src/settings.js"}],"public/sounds/pong-01.wav":[function(require,module,exports) {
module.exports = "/pong-01.274dcf0a.wav";
},{}],"src/partials/Ball.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _settings = require("../settings");

var _pong = _interopRequireDefault(require("../../public/sounds/pong-01.wav"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Ball =
/*#__PURE__*/
function () {
  function Ball(radius, boardWidth, boardHeight) {
    _classCallCheck(this, Ball);

    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.speed = 10;
    this.radius = radius;
    this.direction = 1;
    this.reset();
    this.pingsound = new Audio(_pong.default);
  }

  _createClass(Ball, [{
    key: "changeDirection",
    value: function changeDirection(player1, player2) {
      scoreOne = player1.getScore();
      scoreTwo = player2.getScore();

      if (scoreOne > ScoreTwo) {
        this.direction = Math.abs(this.direction);
      } else if (scoreTwo > ScoreOne) {
        this.direction = Math.abs(this.direction) * -1;
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this.y = this.boardHeight / 2;
      this.x = this.boardWidth / 2;
      this.vy = 0;

      while (this.vy === 0) {
        this.vy = Math.floor(Math.random() * 10) - 5;
      }

      this.vx = (6 - Math.abs(this.vy)) * this.direction;
    }
  }, {
    key: "wallCollision",
    value: function wallCollision() {
      var ballLocation = {
        top: this.vy + this.y - this.radius,
        right: this.vx + this.x + this.radius,
        bottom: this.vy + this.y + this.radius,
        left: this.vx + this.x - this.radius
      };

      if (ballLocation.bottom >= this.boardHeight || ballLocation.top < 0) {
        this.vy = this.vy * -1;
        this.pingsound;
      }

      if (ballLocation.right >= this.boardWidth || ballLocation.left < 0) {
        this.reset();
      }
    }
  }, {
    key: "detectCollision",
    value: function detectCollision(position, position2, score) {
      if (position.left < position2.right) {
        if (position.bottom >= position2.top && position.top <= position2.bottom) {
          this.vx = this.vx * -1;
        } else {
          score.paddleScore();
          this.reset();
        }
      }
    }
  }, {
    key: "paddleCollision",
    value: function paddleCollision(paddle1, paddle2) {
      var ballPosition = {
        center: this.y + this.vy + this.vy,
        top: this.y + this.vy - this.radius,
        left: this.x + this.vx - this.radius,
        bottom: this.y + this.vy + this.radius,
        right: this.x + this.vx + this.radius
      };
      var playerOne = paddle1.getPaddlePosition();
      var playerTwo = paddle2.getPaddlePosition();

      if (this.vx < 0) {
        this.detectCollision(ballPosition, playerOne, paddle2);
      } else {
        playerTwo.right = playerTwo.left;
        ballPosition.left = ballPosition.right;
        this.detectCollision(playerTwo, ballPosition, paddle1);
      }

      this.changeDirection();
    }
  }, {
    key: "ballMove",
    value: function ballMove() {
      this.x = this.x + this.vx;
      this.y = this.y + this.vy;
    }
  }, {
    key: "render",
    value: function render(svg, paddle1, paddle2) {
      var circleSvg = document.createElementNS(_settings.SVG_NS, "circle");
      circleSvg.setAttributeNS(null, "cx", this.x);
      circleSvg.setAttributeNS(null, "cy", this.y);
      circleSvg.setAttributeNS(null, "r", this.radius);
      circleSvg.setAttributeNS(null, "fill", "white");
      svg.appendChild(circleSvg);
      this.wallCollision();
      this.paddleCollision(paddle1, paddle2);
      this.ballMove();
    }
  }]);

  return Ball;
}();

exports.default = Ball;
},{"../settings":"src/settings.js","../../public/sounds/pong-01.wav":"public/sounds/pong-01.wav"}],"src/partials/score.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _settings = require("../settings");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Score =
/*#__PURE__*/
function () {
  function Score(x, y, size) {
    _classCallCheck(this, Score);

    this.x = x;
    this.y = y;
    this.size = size;
  } // <!-- <text x="50" y="50" text-anchor="middle">SVG</text> -->


  _createClass(Score, [{
    key: "render",
    value: function render(svg, score) {
      var scoreSvg = document.createElementNS(_settings.SVG_NS, "text");
      scoreSvg.setAttributeNS(null, "x", this.x);
      scoreSvg.setAttributeNS(null, "y", this.y);
      scoreSvg.textContent = score;
      scoreSvg.setAttributeNS(null, "font-size", this.size);
      scoreSvg.setAttributeNS(null, "font-family", "'Silkscreen Web', monotype");
      scoreSvg.setAttributeNS(null, "fill", "white");
      svg.appendChild(scoreSvg);
    }
  }]);

  return Score;
}();

exports.default = Score;
},{"../settings":"src/settings.js"}],"src/partials/Game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _settings = require("../settings");

var _Board = _interopRequireDefault(require("./Board"));

var _Paddle = _interopRequireDefault(require("./Paddle"));

var _Ball = _interopRequireDefault(require("./Ball"));

var _score = _interopRequireDefault(require("./score"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game =
/*#__PURE__*/
function () {
  function Game(element) {
    var _this = this;

    _classCallCheck(this, Game);

    this.gameElement = document.getElementById(element);
    this.board = new _Board.default(_settings.GAME_WIDTH, _settings.GAME_HEIGHT);
    this.paddle1 = new _Paddle.default(_settings.GAME_HEIGHT, _settings.PADDLE_WIDTH, _settings.PADDLE_HEIGHT, _settings.PADDLE_GAP, (_settings.GAME_HEIGHT - _settings.PADDLE_HEIGHT) / 2, _settings.PLAYER_ONE_UP, _settings.PLAYER_ONE_DOWN, _settings.PADDLE_SPEED);
    this.paddle2 = new _Paddle.default(_settings.GAME_HEIGHT, _settings.PADDLE_WIDTH, _settings.PADDLE_HEIGHT, _settings.GAME_WIDTH - _settings.PADDLE_WIDTH - _settings.PADDLE_GAP, (_settings.GAME_HEIGHT - _settings.PADDLE_HEIGHT) / 2, _settings.PLAYER_TWO_UP, _settings.PLAYER_TWO_DOWN, _settings.PADDLE_SPEED);
    this.pause = false;
    this.score1 = new _score.default(_settings.GAME_WIDTH / 2 - 50, 30, 30);
    this.score2 = new _score.default(_settings.GAME_WIDTH / 2 + 25, 30, 30);
    this.ball1 = new _Ball.default(_settings.BALL_RADIUS, _settings.GAME_WIDTH, _settings.GAME_HEIGHT);
    document.addEventListener("keydown", function (event) {
      if (event.key === " ") {
        _this.pause = !_this.pause;
      }
    });
  }

  _createClass(Game, [{
    key: "resetScreen",
    value: function resetScreen(svg) {
      svg.setAttributeNS(null, "width", _settings.GAME_WIDTH);
      svg.setAttributeNS(null, "height", _settings.GAME_HEIGHT);
      svg.setAttributeNS(null, "viewBox", "0 0 ".concat(_settings.GAME_WIDTH, " ").concat(_settings.GAME_HEIGHT));
      this.gameElement.appendChild(svg);
    }
  }, {
    key: "render",
    value: function render() {
      if (this.pause !== false) {
        this.gameElement.innerHTML = "";
        var svg = document.createElementNS(_settings.SVG_NS, "svg");
        this.resetScreen(svg);
        this.board.render(svg);
        this.paddle1.render(svg);
        this.paddle2.render(svg);
        this.ball1.render(svg, this.paddle1, this.paddle2);
        this.score1.render(svg, this.paddle1.getScore());
        this.score2.render(svg, this.paddle2.getScore());
      } // More code goes here....

    }
  }]);

  return Game;
}();

exports.default = Game;
},{"../settings":"src/settings.js","./Board":"src/partials/Board.js","./Paddle":"src/partials/Paddle.js","./Ball":"src/partials/Ball.js","./score":"src/partials/score.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles/game.css");

var _Game = _interopRequireDefault(require("./partials/Game"));

var _settings = require("./settings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create a game instance
var game = new _Game.default("game", _settings.GAME_WIDTH, _settings.GAME_HEIGHT);

(function gameLoop() {
  game.render();
  requestAnimationFrame(gameLoop);
})();
},{"./styles/game.css":"src/styles/game.css","./partials/Game":"src/partials/Game.js","./settings":"src/settings.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49353" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map