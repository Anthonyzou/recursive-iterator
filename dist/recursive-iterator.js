/*!
 * recursive-iterator v3.3.0
 * https://github.com/nervgh/recursive-iterator
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["RecursiveIterator"] = factory();
	else
		root["RecursiveIterator"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var lang_1 = __webpack_require__(1);
var EMPTY_STATE = {};
var RecursiveIterator = /** @class */ (function () {
    /**
     * @param {Object|Array} root
     * @param {Number} [bypassMode=0]
     * @param {Boolean} [ignoreCircular=false]
     * @param {Number} [maxDeep=100]
     */
    function RecursiveIterator(root, BYPASS_MODE, IGNORE_CIRCULAR, MAX_DEEP) {
        if (BYPASS_MODE === void 0) { BYPASS_MODE = 0; }
        if (IGNORE_CIRCULAR === void 0) { IGNORE_CIRCULAR = false; }
        if (MAX_DEEP === void 0) { MAX_DEEP = 100; }
        this.BYPASS_MODE = BYPASS_MODE;
        this.IGNORE_CIRCULAR = IGNORE_CIRCULAR;
        this.MAX_DEEP = MAX_DEEP;
        this.CACHE = [];
        this.QUEUE = [];
        this.STATE = this.getState(undefined, root, null);
    }
    /**
     * @returns {Object}
     */
    RecursiveIterator.prototype.next = function () {
        var _a = this.STATE || EMPTY_STATE, node = _a.node, path = _a.path, deep = _a.deep;
        if (this.MAX_DEEP > deep) {
            if (this.isNode(node)) {
                if (this.isCircular(node)) {
                    if (this.IGNORE_CIRCULAR) {
                        // skip
                    }
                    else {
                        throw new Error("Circular reference");
                    }
                }
                else {
                    if (this.onStepInto(this.STATE)) {
                        var descriptors = this.getStatesOfChildNodes(node, path, deep);
                        var method = this.BYPASS_MODE ? "push" : "unshift";
                        (_b = this.QUEUE)[method].apply(_b, descriptors);
                        this.CACHE.push(node);
                    }
                }
            }
        }
        var value = this.QUEUE.shift();
        var done = !value;
        this.STATE = value;
        if (done) {
            this.destroy();
        }
        return { value: value, done: done };
        var _b;
    };
    /**
     *
     */
    RecursiveIterator.prototype.destroy = function () {
        this.QUEUE.length = 0;
        this.CACHE.length = 0;
        this.STATE = null;
    };
    /**
     * @param {*} any
     * @returns {Boolean}
     */
    RecursiveIterator.prototype.isNode = function (any) {
        return lang_1.isObject(any);
    };
    /**
     * @param {*} any
     * @returns {Boolean}
     */
    RecursiveIterator.prototype.isLeaf = function (any) {
        return !this.isNode(any);
    };
    /**
     * @param {*} any
     * @returns {Boolean}
     */
    RecursiveIterator.prototype.isCircular = function (any) {
        return this.CACHE.indexOf(any) !== -1;
    };
    /**
     * Returns states of child nodes
     * @param {Object} node
     * @param {Array} path
     * @param {Number} deep
     * @returns {Array<Object>}
     */
    RecursiveIterator.prototype.getStatesOfChildNodes = function (node, path, deep) {
        var _this = this;
        return lang_1.getKeys(node).map(function (key) {
            return _this.getState(node, node[key], key, path.concat(key), deep + 1);
        });
    };
    /**
     * Returns state of node. Calls for each node
     * @param {Object} [parent]
     * @param {*} [node]
     * @param {String} [key]
     * @param {Array} [path]
     * @param {Number} [deep]
     * @returns {Object}
     */
    RecursiveIterator.prototype.getState = function (parent, node, key, path, deep) {
        if (path === void 0) { path = []; }
        if (deep === void 0) { deep = 0; }
        return { parent: parent, node: node, key: key, path: path, deep: deep };
    };
    /**
     * Callback
     * @param {Object} state
     * @returns {Boolean}
     */
    RecursiveIterator.prototype.onStepInto = function (state) {
        return true;
    };
    /**
     * @returns {RecursiveIterator}
     */
    RecursiveIterator.prototype[Symbol.iterator] = function () {
        return this;
    };
    return RecursiveIterator;
}());
module.exports = RecursiveIterator;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @param {*} any
 * @returns {Boolean}
 */
function isObject(any) {
    return any !== null && typeof any === "object";
}
exports.isObject = isObject;
/**
 * @param {*} any
 * @returns {Boolean}
 */
var isArray = Array.isArray;
exports.isArray = isArray;
/**
 * @param {*} any
 * @returns {Boolean}
 */
function isArrayLike(any) {
    if (!isObject(any))
        return false;
    if (!("length" in any))
        return false;
    var length = any.length;
    if (!isNumber(length))
        return false;
    if (length > 0) {
        return length - 1 in any;
    }
    else {
        for (var key in any) {
            return false;
        }
    }
}
exports.isArrayLike = isArrayLike;
/**
 * @param {*} any
 * @returns {Boolean}
 */
function isNumber(any) {
    return typeof any === "number";
}
exports.isNumber = isNumber;
/**
 * @param {Object|Array} object
 * @returns {Array<String>}
 */
function getKeys(object) {
    var keys_ = Object.keys(object);
    if (isArray(object)) {
        // skip sort
    }
    else if (isArrayLike(object)) {
        var index = keys_.indexOf("length");
        if (index > -1) {
            keys_.splice(index, 1);
        }
        // skip sort
    }
    else {
        // sort
        keys_.sort();
    }
    return keys_;
}
exports.getKeys = getKeys;


/***/ })
/******/ ]);
});
//# sourceMappingURL=recursive-iterator.js.map