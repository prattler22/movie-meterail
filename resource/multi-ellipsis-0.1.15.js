(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Ellipsis"] = factory();
	else
		root["Ellipsis"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function getJQuerySub() {
    function jQuerySub( selector, context ) {
        return new jQuerySub.fn.init( selector, context );
    }
    window.jQuery.extend( true, jQuerySub, this );
    jQuerySub.superclass = this;
    jQuerySub.fn = jQuerySub.prototype = this();
    jQuerySub.fn.constructor = jQuerySub;
    jQuerySub.sub = this.sub;
    jQuerySub.fn.init = function init( selector, context ) {
        var instance = window.jQuery.fn.init.call( this, selector, context, rootjQuerySub );
        return instance instanceof jQuerySub ?
            instance :
            jQuerySub( instance );
    };
    jQuerySub.fn.init.prototype = jQuerySub.fn;
    var rootjQuerySub = jQuerySub(document);
    return jQuerySub;
};


module.exports = getJQuerySub.call(window.jQuery)

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* eslint-disable */

//babel-external-helpers -l createClass -t umd > babel-external-helpers.js
(function(){
	var babelHelpers = {};

	//["typeof"]  prevent keyword property error at the <= IE 8
	babelHelpers["typeof"] = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
			return typeof obj;
		} : function (obj) {
			return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
		};

	babelHelpers.createClass = (function () {
		var isSupportedDefineProperty = !!Object.defineProperty;

		if (isSupportedDefineProperty) {	// IE8????????? DOM??? ???????????? ??????
			try {
				Object.defineProperty({}, "", {});
			} catch (e) {
				isSupportedDefineProperty = false;
			}
		}

		var getProperty;
		if (isSupportedDefineProperty) {
			getProperty = function (target, descriptor) {
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		} else {
			getProperty = function (target, descriptor) {
				target[descriptor.key] = descriptor.value;
			}
		}

		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;

				getProperty(target, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	})();


	babelHelpers.classCallCheck = function classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			// throw new TypeError("Cannot call a class as a function");
			// ????????? ????????? ?????? console??? ??????
			console.error("Cannot call a class as a function");
		}
	};

	babelHelpers.inherits = babelHelpers.inheritsLoose =  function (d, b) {
		for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
		function __() {
			this.constructor = d;
		}

		d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};

	babelHelpers.assertThisInitialized = function(self) {
		if (self === void 0) {
			console.error("this hasn't been initialised - super() hasn't been called");
		}

		return self;
	};

	babelHelpers.possibleConstructorReturn = function(self, call) {
		if (call && (typeof call === "object" || typeof call === "function")) {
			return call;
		}

		return babelHelpers.assertThisInitialized(self);
	};

	// es modules
	// babelHelpers.interopRequireDefault = function (obj) {
	// 	return obj && obj.__esModule ? obj : {
	// 		default: obj
	// 	};
	// };
	//
	// babelHelpers.interopRequireWildcard = function (obj) {
	// 	if (obj && obj.__esModule) {
	// 		return obj;
	// 	} else {
	// 		var newObj = {};
	//
	// 		if (obj != null) {
	// 			for (var key in obj) {
	// 				if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	// 			}
	// 		}
	//
	// 		newObj.default = obj;
	// 		return newObj;
	// 	}
	// };

	module.exports = babelHelpers;
})();


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($, jQuery) {var AbstractEllipsis =
/*#__PURE__*/
function () {
  /**
   * @private
   * @description Ellipsis???????????? ??????????????? ????????????
   * @classdesc ???????????? ???????????? ?????????.
   * @param {string | HTMLElement | JQuery<HTMLElement>} el
   * @param {Object} option
   * @param {boolean} option.rotation ????????? ????????? ????????? ??????
   * @param {string} option.ellipsisSign ????????? ?????????
   * @since 0.1.0
   */
  function AbstractEllipsis(el, option) {
    var _this = this;

    if (option === void 0) {
      option = {};
    }

    this.options = $.extend(true, {
      ellipsisSign: "...",
      rotation: true,
      resize: true
    }, option);
    this.$el = $(el);
    this.init();

    if (this.options.rotation !== false) {
      this.attachRotationEvent();
    }

    if (this.options.resize !== false) {
      this.attachResizeEvent();
    }

    $(window).on("pageshow", function (e) {
      // zepto?????? originalEvent????????? ??????.
      var persisted = e.originalEvent ? e.originalEvent.persisted : e.persisted; // ????????? ???????????? '????????? ?????? > ????????? ?????? > ??????'??? ?????? ???????????? ??????????????? ??????

      persisted && _this.revert().work();
    });
  }
  /**
   * @private
   * @description ????????? ???????????? ????????? ????????????.
   * @return {Ellipsis} ?????? ????????????.
   * @since 0.1.0
   */


  var _proto = AbstractEllipsis.prototype;

  _proto.attachRotationEvent = function attachRotationEvent() {
    var _this2 = this;

    this.onRotate = function () {
      if (_this2.isApplied) {
        // ????????? ???????????? ???????????? ?????? ?????????
        _this2.revert().work();
      } else {
        // ??????????????? ??????
        _this2.work().expand();
      }
    };

    var rotateType = "orientationchange"; // jquery??? egjs??? rotate ????????? ??????????????? ????????? ????????? ????????? ????????????.

    try {
      if (jQuery.event.special.rotate) {
        rotateType = "rotate";
      }
    } catch (e) {}

    this.onOrientationChange = function (e) {
      if (e.type === "orientationchange") {
        // 'orientationchange' event??? html??? ????????? ?????? ?????? ???????????? ??? ??????. ??????????????? ?????? 100ms delay??? ??????.
        setTimeout(function () {
          _this2.revert().work();
        }, 100);
      } else {
        _this2.revert().work();
      }
    };

    $(window).on(rotateType, this.onOrientationChange);
    $(window).on("rotate", this.onRotate);
  };

  _proto.attachResizeEvent = function attachResizeEvent() {
    var _this3 = this;

    this.onResize = function (e) {
      _this3.revert().work();
    };

    $(window).on("resize", this.onResize);
  }
  /**
   * @public
   * @description ?????? ???????????? ????????????.
   * @since 0.1.1
   */
  ;

  _proto.expand = function expand() {
    this.revert(); // ????????? ????????? ?????? ????????? ??????

    this.setStyleVisible();
  };

  _proto.detachRotationEvent = function detachRotationEvent() {
    $(window).off("rotate", this.onRotate);
  };

  _proto.detachOrientationChange = function detachOrientationChange() {
    var rotateType = "orientationchange"; // jquery??? egjs??? rotate ????????? ??????????????? ????????? ????????? ????????? ????????????.

    try {
      if (jQuery.event.special.rotate) {
        rotateType = "rotate";
      }
    } catch (e) {}

    $(window).off(rotateType, this.onOrientationChange);
  };

  _proto.detachResizeEvent = function detachResizeEvent() {
    $(window).off("resize", this.onResize);
  }
  /**
   * @private
   * @return {Ellipsis} ?????? ????????????.
   * @since 0.1.0
   */
  ;

  _proto.init = function init() {
    this.items = this.getItems();
    this.originalHeight = this.getAreaHeight();
    this.originalCss = this.$el.attr("style") || "";
    this.originalHtml = this.getOriginalHTML();
    this.mountChild();
    this.work();
    return this;
  }
  /**
   * ?????? ????????? ???????????? ???????????? ?????? HTML ????????? ????????????.
   * @protected
   * @return {String} ?????? ????????? html ?????????
   * @since 0.1.4
   */
  ;

  _proto.getOriginalHTML = function getOriginalHTML() {
    return this.$el.html();
  };

  _proto.mountChild = function mountChild() {
    this.$tail = this.$el.find("._tail");
  }
  /**
   * ???????????? ????????? ????????????.
   * @public
   * @return {Ellipsis} ?????? ????????????.
   * @since 0.1.0
   */
  ;

  _proto.revert = function revert() {
    this.revertItem();
    this.isApplied = false;
    return this;
  }
  /**
   * ????????? ?????? ?????? ???????????? ?????? ????????? ????????????.
   * ??????: html ???????????? ????????? ???????????? ?????? ????????? ????????? ??????
   * mountChild??? ?????? ?????? ????????? ?????? ???????????? ?????????.
   * @private
   * @since 0.1.1
   */
  ;

  _proto.revertItem = function revertItem() {
    this.$el.html(this.originalHtml);
    this.mountChild();
  };

  _proto.destroy = function destroy() {
    this.revert();
    this.detachRotationEvent();
    this.$el = null;
    this.$tail = null;
    this.isApplied = null;
    this.items = null;
    this.originalCss = null;
    this.originalHeight = null;
    this.originalHtml = null;
  }
  /**
   * @private
   * @description ??????????????? ???????????? ????????????.
   * @return {number} ??????????????? ?????????.
   * @since 0.1.0
   */
  ;

  _proto.getAreaHeight = function getAreaHeight() {
    return parseInt(this.$el.css("max-height"), 10);
  }
  /**
   * @private
   * @description ????????? ????????? ?????? ????????? ??????????????? ???????????? ????????????.
   * @since 0.1.7
   */
  ;

  _proto.setStyleVisible = function setStyleVisible() {
    var notFixedWidth = this.options.notFixedWidth; // max-height??? ????????? ??? ???????????? ???????????? ????????? ???????????? ??????.
    // (???????????? ???????????? ??????????????? ???)
    // ??????????????? ???????????? ?????? ????????? ????????? ???????????? ?????? 'max-height: none'??????
    // 'max-height: 99999px'??????

    var el = this.$el.get(0);
    var paddingAttendants = parseFloat(this.$el.css("padding-right")) + parseFloat(this.$el.css("padding-left"));
    var width = el ? el.getBoundingClientRect().width - paddingAttendants : 0 + "px";
    this.$el.css($.extend(true, {
      overflow: "visible",
      "max-height": "99999px"
    }, notFixedWidth ? {} : {
      width: width
    }));
    this.$tail.css("vertical-align", "top");
  }
  /**
   * @private
   * @description ?????????????????? ????????????.
   * @since 0.1.7
   */
  ;

  _proto.setOriginalStyle = function setOriginalStyle() {
    this.$el.attr("style", this.originalCss);
    this.$tail.css("vertical-align", "");
  }
  /**
   * ???????????? ????????????.
   * @public
   * @return {Ellipsis} ?????? ????????????.
   * @since 0.1.7
   */
  ;

  _proto.work = function work() {
    if (!this.items || !this.items.length) {
      return this;
    }

    this.setStyleVisible();
    this.isApplied = true;
    var isOverflow = this.checkOverflow();

    if (!isOverflow) {
      this.$tail.css("display", "none");
      this.setOriginalStyle();
      return this;
    }

    this.renderEllipsisSign();
    this.$tail.css("display", "");
    this.crop(this.items.length, isOverflow, parseInt(this.items.length / 2, 10)); // ?????? ???????????? ??????

    this.setOriginalStyle();
    return this;
  }
  /**
   * @private
   * @description ???????????? ?????? ????????? ????????? ????????? ???????????????..
   * @param {number} len ?????? ???????????? ?????? ???????????? ?????????
   * @param {boolean} isOverflow ????????? ????????? ?????? ????????? ??????
   * @param {number} adjustLen ????????? ??????
   * @return {Ellipsis} ?????? ????????????.
   * @since 0.1.0
   */
  ;

  _proto.crop = function crop(len, isOverflow, adjustLen) {
    var visibleLen = len + (isOverflow ? -1 : 1) * adjustLen;

    if (len < 0 && visibleLen < 0) {
      // ???????????? ??????
      return this;
    }

    this.renderItem(this.left(visibleLen + 1));
    var isNextOverflow = this.checkOverflow();
    this.renderItem(this.left(visibleLen));
    var curOverflow = this.checkOverflow();

    if (isNextOverflow && !curOverflow) {
      return this;
    }

    this.crop(visibleLen, curOverflow, Math.ceil(adjustLen / 2));
    return this;
  }
  /**
   * @private
   * @description ????????? ????????? ??????????????? ??????.
   * @return {boolean} ????????? ??????????????? ??????.
   * @since 0.1.0
   */
  ;

  _proto.checkOverflow = function checkOverflow() {
    return this.$el.height() > this.originalHeight;
  }
  /**
   * ????????????????????? ????????? ??????
   * @protected
   * @description ??? ????????? ?????? ?????? ????????? ????????? ??????
   * @since 0.1.0
   */
  ;

  _proto.getItems = function getItems() {
    return this;
  }
  /**
   * ????????????????????? ????????? ??????
   * @protected
   * @description ??????????????? ???????????? ????????? ????????? ????????? ??? ??????
   * @param {number} visibleLen ????????? ?????? ????????? ??????
   * @since 0.1.0
   */
  ;

  _proto.left = function left(visibleLen) {
    return this;
  }
  /**
   * ????????????????????? ????????? ??????
   * @protected
   * @description ????????? ????????? ???????????? ????????? ???????????? ?????? ??????
   * @since 0.1.0
   */
  ;

  _proto.renderEllipsisSign = function renderEllipsisSign() {
    return this;
  }
  /**
   * ????????????????????? ????????? ??????
   * @protected
   * @description ????????? ????????? ????????? ???????????? ????????? ??????
   * @param {*} item ????????? ???????????? ????????? ??????
   * @since 0.1.0
   */
  ;

  _proto.renderItem = function renderItem(item) {
    return this;
  };

  return AbstractEllipsis;
}();

module.exports = AbstractEllipsis;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0), __webpack_require__(0)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var TextEllipsis = __webpack_require__(4);

var HtmlTextEllipsis = __webpack_require__(5);

var PairEllipsis = __webpack_require__(6);

var TagEllipsis = __webpack_require__(8);

var PrevEllipsis = __webpack_require__(9);

module.exports = {
  TextEllipsis: TextEllipsis,
  HtmlTextEllipsis: HtmlTextEllipsis,
  TagEllipsis: TagEllipsis,
  PairEllipsis: PairEllipsis,
  PrevEllipsis: PrevEllipsis
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(babelHelpers) {var AbstractEllipsis = __webpack_require__(2);
/**
 * TextEllipsis
 *
 * ????????? ??? ????????? ?????? ?????? ?????? ?????? ?????????.
 *
 * v0.1.0 - 2019.02.19
 * ?????? ?????? ??????
 * @extends AbstractEllipsis
 */


var TextEllipsis =
/*#__PURE__*/
function (_AbstractEllipsis) {
  babelHelpers.inheritsLoose(TextEllipsis, _AbstractEllipsis);

  function TextEllipsis() {
    return _AbstractEllipsis.apply(this, arguments) || this;
  }

  var _proto = TextEllipsis.prototype;

  /**
   * @private
   * @description ??? ????????? ?????? ?????? ????????? ????????? ??????
   * @return {string}
   */
  _proto.getItems = function getItems() {
    return this.$el.find("._text").eq(0).text();
  }
  /**
   * @private
   * @description ???????????? visibleLen ????????? ????????? ??????
   * @param {number} visibleLen
   * @return {string}
   */
  ;

  _proto.left = function left(visibleLen) {
    return this.items.slice(0, visibleLen);
  }
  /**
   * @private
   * @description ??????????????? ????????? ????????? ?????? ??????.
   * @param {string} item ?????? ?????? ????????? ?????????
   * @return {Ellipsis} ?????? ????????????.
   */
  ;

  _proto.renderItem = function renderItem(item) {
    var ellipsisSign = this.options.ellipsisSign;
    this.$el.find("._text").text("" + item + ellipsisSign);
    return this;
  };

  _proto.getOriginalHTML = function getOriginalHTML() {
    return this.$el.find("._text").text();
  };

  _proto.revertItem = function revertItem() {
    this.$el.find("._text").text(this.originalHtml);
  };

  return TextEllipsis;
}(AbstractEllipsis);

module.exports = TextEllipsis;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(babelHelpers) {var AbstractEllipsis = __webpack_require__(2);
/**
 * HtmlTextEllipsis
 *
 * ????????? ??? ????????? ?????? ?????? ?????? ?????? ?????????.
 *
 * v0.1.0 - 2019.02.19
 * ?????? ?????? ??????
 * @extends AbstractEllipsis
 */


var HtmlTextEllipsis =
/*#__PURE__*/
function (_AbstractEllipsis) {
  babelHelpers.inheritsLoose(HtmlTextEllipsis, _AbstractEllipsis);

  function HtmlTextEllipsis() {
    return _AbstractEllipsis.apply(this, arguments) || this;
  }

  var _proto = HtmlTextEllipsis.prototype;

  /**
   * @private
   * @description ??? ????????? ?????? ?????? ????????? ????????? ??????
   * @return {string}
   */
  _proto.getItems = function getItems() {
    // ._text??? ????????? ????????? ????????? ?????? ??????????????? ?????? ??? ?????? ????????? ??????
    return this.$el.find("._text").eq(0).html();
  }
  /**
   * ?????? ????????? ???????????? ???????????? ?????? HTML ????????? ????????????.
   * @protected
   * @return {String} ?????? ????????? html ?????????
   * @since 0.1.4
   */
  ;

  _proto.getOriginalHTML = function getOriginalHTML() {
    return this.getItems();
  }
  /**
   * ????????? ????????? ????????? ?????? ????????? ????????????.
   * @private
   * @since 0.1.4
   */
  ;

  _proto.revertItem = function revertItem() {
    this.$el.find("._text").html(this.originalHtml);
  }
  /**
   * @private
   * @description ???????????? visibleLen ????????? ????????? ??????
   * @param {number} visibleLen
   * @return {string}
   */
  ;

  _proto.left = function left(visibleLen) {
    return this.items.slice(0, visibleLen);
  }
  /**
   * @private
   * @description ??????????????? ????????? ????????? ?????? ??????.
   * @param {string} item ?????? ?????? ????????? ?????????
   * @return {Ellipsis} ?????? ????????????.
   */
  ;

  _proto.renderItem = function renderItem(item) {
    var ellipsisSign = this.options.ellipsisSign;
    var $text = this.$el.find("._text"); // auto closing??? ellipsisSign??? ????????? ellipsisSign??? ??????????????? ????????? ??????

    $text.html("" + item); // auto closing ?????? ellipsisSign??? ???????????????.

    $text.html("" + $text.html() + ellipsisSign);
    return this;
  };

  return HtmlTextEllipsis;
}(AbstractEllipsis);

module.exports = HtmlTextEllipsis;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(babelHelpers, $) {var AbstractEllipsis = __webpack_require__(2);

var chunk = __webpack_require__(7);
/**
 * PairEllipsis
 * 
 * ?????? ????????? ??? ????????? ?????? ?????? ?????? ?????? ?????????.
 * 
 * v0.1.0 - 2019.02.19
 * ?????? ?????? ??????
 * 
 * @extends AbstractEllipsis
 */


var PairEllipsis =
/*#__PURE__*/
function (_AbstractEllipsis) {
  babelHelpers.inheritsLoose(PairEllipsis, _AbstractEllipsis);

  function PairEllipsis() {
    return _AbstractEllipsis.apply(this, arguments) || this;
  }

  var _proto = PairEllipsis.prototype;

  /**
   * @private
   * @description ??? ????????? ?????? ?????? ????????? ????????? ??????
   * @return {Array[]} 
   */
  _proto.getItems = function getItems() {
    return chunk(this.$el.find("._key, ._value").map(function (_, e) {
      return $(e);
    }), 2);
  }
  /**
   * @private
   * @description ???????????? visibleLen ????????? ????????? ??????
   * @param {number} visibleLen
   * @return {Array[]} 
   */
  ;

  _proto.left = function left(visibleLen) {
    return this.items.slice(0, visibleLen);
  }
  /**
   * @private
   * @description ????????? ????????? ???????????? ?????? ?????? ??????
   * @return {PairEllipsis} ?????? ????????????.
   */
  ;

  _proto.renderEllipsisSign = function renderEllipsisSign() {
    var ellipsisSign = this.options.ellipsisSign;
    var lastItem = this.items[this.items.length - 1];

    if (lastItem[1]) {
      lastItem[1].after(ellipsisSign);
    } else if (lastItem[0]) {
      lastItem[0].after(ellipsisSign);
    }

    return this;
  }
  /**
   * @private
   * @description ??????????????? ????????? ????????? ????????????.
   * @param {Array[]} item ?????? ?????? ????????? ?????? 
   * @return {PairEllipsis} ?????? ????????????.
   */
  ;

  _proto.renderItem = function renderItem(item) {
    this.items.forEach(function (_ref, i) {
      var $key = _ref[0],
          $value = _ref[1];

      if (i < item.length) {
        $key && $key.show();
        $value && $value.show();
      } else {
        $key && $key.hide();
        $value && $value.hide();
      }
    });
    return this;
  };

  return PairEllipsis;
}(AbstractEllipsis);

module.exports = PairEllipsis;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1), __webpack_require__(0)))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeCeil = Math.ceil,
    nativeMax = Math.max;

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Creates an array of elements split into groups the length of `size`.
 * If `array` can't be split evenly, the final chunk will be the remaining
 * elements.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to process.
 * @param {number} [size=1] The length of each chunk
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the new array of chunks.
 * @example
 *
 * _.chunk(['a', 'b', 'c', 'd'], 2);
 * // => [['a', 'b'], ['c', 'd']]
 *
 * _.chunk(['a', 'b', 'c', 'd'], 3);
 * // => [['a', 'b', 'c'], ['d']]
 */
function chunk(array, size, guard) {
  if ((guard ? isIterateeCall(array, size, guard) : size === undefined)) {
    size = 1;
  } else {
    size = nativeMax(toInteger(size), 0);
  }
  var length = array ? array.length : 0;
  if (!length || size < 1) {
    return [];
  }
  var index = 0,
      resIndex = 0,
      result = Array(nativeCeil(length / size));

  while (index < length) {
    result[resIndex++] = baseSlice(array, index, (index += size));
  }
  return result;
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = chunk;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(babelHelpers, $) {var AbstractEllipsis = __webpack_require__(2);
/**
 * TagEllipsis
 * 
 * ????????? ??? ????????? ?????? ?????? ?????? ?????? ?????????.
 * 
 * v0.1.0 - 2019.02.19
 * ?????? ?????? ??????
 *
 * @extends AbstractEllipsis
 */


var TagEllipsis =
/*#__PURE__*/
function (_AbstractEllipsis) {
  babelHelpers.inheritsLoose(TagEllipsis, _AbstractEllipsis);

  function TagEllipsis() {
    return _AbstractEllipsis.apply(this, arguments) || this;
  }

  var _proto = TagEllipsis.prototype;

  /**
   * @private
   * @description ??? ????????? ?????? ?????? ????????? ????????? ??????
   * @return {JQuery<JQuery[]>} 
   */
  _proto.getItems = function getItems() {
    return this.$el.find("._tag").map(function (i, e) {
      return $(e);
    });
  }
  /**
   * @private
   * @description ???????????? visibleLen ????????? ????????? ??????
   * @param {number} visibleLen
   * @return {JQuery<JQuery[]>} 
   */
  ;

  _proto.left = function left(visibleLen) {
    return this.items.slice(0, visibleLen);
  }
  /**
   * @private
   * @description ????????? ????????? ???????????? ?????? ?????? ??????
   * @return {Ellipsis} ?????? ????????????.
   */
  ;

  _proto.renderEllipsisSign = function renderEllipsisSign() {
    var ellipsisSign = this.options.ellipsisSign;
    this.items[this.items.length - 1].after(ellipsisSign);
    return this;
  }
  /**
   * @private
   * @description ????????? ???????????? ???????????? ????????????.
   * DOM??? ???????????? ?????? this.$el.html ????????? ?????? 
   * override??? ?????? ?????? tag??? ?????? ???????????? ???????????? ??????
   */
  ;

  _proto.revertItem = function revertItem() {
    this.items.each(function (i, tag) {
      $(tag).show();
    });
  }
  /**
   * @private
   * @description ??????????????? ????????? ????????? ????????????.
   * @param {JQuery<JQuery[]>} item ?????? ?????? ????????? ?????? 
   * @return {Ellipsis} ?????? ????????????.
   */
  ;

  _proto.renderItem = function renderItem(item) {
    this.items.each(function (i, $tag) {
      if (i < item.length) {
        $tag.show();
      } else {
        $tag.hide();
      }
    });
    return this;
  };

  return TagEllipsis;
}(AbstractEllipsis);

module.exports = TagEllipsis;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1), __webpack_require__(0)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {var __WEBPACK_AMD_DEFINE_RESULT__;!function(t){!function(t,e){ true&&module.exports?module.exports=e(): true?!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){return e()}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):undefined}(0,function(){var e=0,i=eg.Class.extend(eg.Component,{construct:function(i,n){var s;this.option({ellipsisSign:"...",handleRotateEvent:!0}),this.option(n||{}),s=t(i),s.get(0)&&(s.attr("data-ellipsis-managed",e++),this._el=s.get(0),this._$el=s,this._text=s.find("._text").text(),this._style=s.attr("style")),this.work(),s.on("click","._unomit",t.proxy(this,"_onUnomitClick"))},isOmitted:function(){return"true"===t(this._el).attr("data-ellipsis-omitted")},destroy:function(){t(this._el).off("click","._unomit",this._onUnomitClick),this._el=this._text=null},row:function(){return Math.floor(this._el.clientHeight/this._oneLineHeight)},revert:function(){return t(this._el).attr("style",this._style).attr("data-ellipsis-row",this.row()).attr("data-ellipsis-omitted","false").find("._text").text(this._text),this},work:function(){if(this._el){var e=t(this._el).attr("style",this._style).find("._text").text(this._text).end(),i=e.find("._text"),n=e.find("._tail"),s=e.get(0).getBoundingClientRect().width||parseInt(e.css("width"),10),r=parseFloat(e.css("padding-left"))+parseFloat(e.css("padding-right")),o=e.height(),l=t(this._el.cloneNode(!0)),a=t(l.find("._text")),h=a.text(),u=t(l.find("._tail")),c=o<1,d="hidden"!==e.css("overflow")&&"visible"!==e.css("overflow"),f=!a.get(0),p=o<e.css("max-height","99999px").height();e.attr("style",this._style);var g=!1;if(!(c||d||f)){if(l.css({position:"absolute",overflow:"visible"}).css({height:"auto","max-height":"99999px",width:s-r+"px"}),e.after(l).attr("data-ellipsis-omitted",g),p&&this._reduce(o,l,a,a.text()))for(h=a.text();h.length&&l.height()>o;)h=h.substr(0,h.length-1),a.text(h+this.option("ellipsisSign")),u.get(0)&&(u.css("display",""),n.css("display","")),!g&&e.attr("data-ellipsis-omitted","true"),g=!0;return i.text(a.text()),a.text("A"),this._oneLineHeight=l.height(),e.attr("data-ellipsis-row",this.row()),l.remove(),this}}},unomit:function(){return this.revert(),t(this._el).css("max-height","99999px").attr("data-ellipsis-omitted","false"),t(this._el).find("._tail").hide(),this},_reduce:function(t,e,i,n){var s=Math.ceil(n.length/2),r=n.substr(0,s),o=n.substr(s);return i.text(r),e.height()>t?this._reduce(t,e,i,r):this._grow(t,e,i,r,o)},_grow:function(t,e,i,n,s){var r=Math.ceil(s.length/2),o=s.substr(0,r),l=s.substr(r);return i.text(n+o),!(e.height()<=t)||this._grow(t,e,i,n+o,l)},_onUnomitClick:function(t){t.preventDefault(),this.unomit()}}),n=[],s=function(t){t&&t.option("handleRotateEvent")&&t.revert().work()},r=function(t){n.forEach(s)},o=function(t){t.originalEvent.persisted&&n.forEach(s)};return t(window).on("rotate",r),t(window).on("pageshow",o),{work:function(e,s){var r=t(e),o=r.length>2?r:r.hasClass("_ellipsis")?r:r.find("._ellipsis");return Array.prototype.push.apply(n,t.grep(o.map(function(e,r){var o=n[parseInt(t(r).attr("data-ellipsis-managed"),10)];return o?(o.revert().work(),null):new i(r,s)}),function(t){return!!t})),this},unomit:function(){return t.map(n,function(t){t.unomit()}),this},get:function(e){return arguments.length?(e=t.isNumeric(e)?e:t(e).attr("data-ellipsis-managed"),n[parseInt(e,10)]):n.concat()},rows:function(){return t.map(n,function(t){return t.row()})},revert:function(){return t.map(n,function(t){t.revert()}),this},destroy:function(){return t.map(n,function(t){t.destroy()}),this},reset:function(){return n.length=e=0,this},VERSION:"4.0.1"}})}(jQuery);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0)))

/***/ })
/******/ ]);
});