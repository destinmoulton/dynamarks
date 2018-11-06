/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/kernel/kernel.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/lodash/lodash.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/lodash.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || Function(\"return this\")() || (1, eval)(\"this\");\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL2dsb2JhbC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanM/OTg1YyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSwgZXZhbCkoXCJ0aGlzXCIpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/webpack/buildin/global.js\n");

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(module) {\n\tif (!module.webpackPolyfill) {\n\t\tmodule.deprecate = function() {};\n\t\tmodule.paths = [];\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL21vZHVsZS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanM/MWRjNSJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/webpack/buildin/module.js\n");

/***/ }),

/***/ "./src/common/dispatcher.ts":
/*!**********************************!*\
  !*** ./src/common/dispatcher.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar _ = __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\");\n/**\n * Dispatcher is a pseudo publisher (ie pub/sub)\n */\nvar Dispatcher = /** @class */ (function () {\n    function Dispatcher() {\n        this.subscriptions = {};\n        this.subscriptions = {};\n    }\n    Dispatcher.prototype.subscribe = function (topic, subscriber) {\n        if (!_.has(this.subscriptions, topic))\n            this.subscriptions[topic] = [];\n        this.subscriptions[topic].push(subscriber);\n    };\n    Dispatcher.prototype.dispatch = function (msg) {\n        if (!_.has(this.subscriptions, msg.topic)) {\n            console.error(\"dispatch() :: topic does not exist\", msg);\n            return;\n        }\n        this.subscriptions[msg.topic].forEach(function (sub) {\n            sub(msg);\n        });\n    };\n    return Dispatcher;\n}());\nexports.default = Dispatcher;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tbW9uL2Rpc3BhdGNoZXIudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL2Rpc3BhdGNoZXIudHM/MGVlNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcblxuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSBcIi4vdHlwZXNcIjtcblxuLyoqXG4gKiBEaXNwYXRjaGVyIGlzIGEgcHNldWRvIHB1Ymxpc2hlciAoaWUgcHViL3N1YilcbiAqL1xuY2xhc3MgRGlzcGF0Y2hlciBpbXBsZW1lbnRzIHR5cGVzLklEaXNwYXRjaGVyIHtcbiAgICBzdWJzY3JpcHRpb25zOiB0eXBlcy5URGlzcGF0Y2hTdWJzY3JpcHRpb25zID0ge307XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zID0ge307XG4gICAgfVxuXG4gICAgc3Vic2NyaWJlKHRvcGljOiBzdHJpbmcsIHN1YnNjcmliZXI6IHR5cGVzLlREaXNwYXRjaFN1YnNjcmliZXIpIHtcbiAgICAgICAgaWYgKCFfLmhhcyh0aGlzLnN1YnNjcmlwdGlvbnMsIHRvcGljKSkgdGhpcy5zdWJzY3JpcHRpb25zW3RvcGljXSA9IFtdO1xuXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uc1t0b3BpY10ucHVzaChzdWJzY3JpYmVyKTtcbiAgICB9XG5cbiAgICBkaXNwYXRjaChtc2c6IHR5cGVzLklEaXNwYXRjaE1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKCFfLmhhcyh0aGlzLnN1YnNjcmlwdGlvbnMsIG1zZy50b3BpYykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJkaXNwYXRjaCgpIDo6IHRvcGljIGRvZXMgbm90IGV4aXN0XCIsIG1zZyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnNbbXNnLnRvcGljXS5mb3JFYWNoKFxuICAgICAgICAgICAgKHN1YjogdHlwZXMuVERpc3BhdGNoU3Vic2NyaWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIHN1Yihtc2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGlzcGF0Y2hlcjtcbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUlBOztBQUVBO0FBQ0E7QUFHQTtBQUZBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBRUE7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/common/dispatcher.ts\n");

/***/ }),

/***/ "./src/common/types.ts":
/*!*****************************!*\
  !*** ./src/common/types.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar EKernelStatus;\n(function (EKernelStatus) {\n    EKernelStatus[EKernelStatus[\"Unconfigured\"] = 0] = \"Unconfigured\";\n    EKernelStatus[EKernelStatus[\"Synchronizing\"] = 1] = \"Synchronizing\";\n    EKernelStatus[EKernelStatus[\"OK\"] = 2] = \"OK\";\n})(EKernelStatus = exports.EKernelStatus || (exports.EKernelStatus = {}));\n//\n// END ClientMessenger Types\n// -------------------------\n// ----------------\n// Dispatcher Types\n//\nvar IDispatcher = /** @class */ (function () {\n    function IDispatcher() {\n    }\n    return IDispatcher;\n}());\nexports.IDispatcher = IDispatcher;\n//\n// END Redux Types\n// ---------------\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tbW9uL3R5cGVzLnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi90eXBlcy50cz9mZjJjIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBlbnVtIEVLZXJuZWxTdGF0dXMge1xuICAgIFVuY29uZmlndXJlZCxcbiAgICBTeW5jaHJvbml6aW5nLFxuICAgIE9LXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gQ2xpZW50TWVzc2VuZ2VyIFR5cGVzXG4vL1xuZXhwb3J0IGludGVyZmFjZSBJQ2xpZW50TWVzc2VuZ2VyIHtcbiAgICBjaGFubmVsOiBhbnk7XG4gICAgZGlzcGF0Y2hlcjogSURpc3BhdGNoZXI7XG4gICAgc2VuZDogKG1zZzogSURpc3BhdGNoTWVzc2FnZSkgPT4gdm9pZDtcbn1cbi8vXG4vLyBFTkQgQ2xpZW50TWVzc2VuZ2VyIFR5cGVzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS1cbi8vIERpc3BhdGNoZXIgVHlwZXNcbi8vXG5leHBvcnQgY2xhc3MgSURpc3BhdGNoZXIge1xuICAgIHN1YnNjcmlwdGlvbnM6IFREaXNwYXRjaFN1YnNjcmlwdGlvbnM7XG4gICAgc3Vic2NyaWJlOiAodG9waWM6IHN0cmluZywgc3Vic2NyaWJlcjogVERpc3BhdGNoU3Vic2NyaWJlcikgPT4gdm9pZDtcbiAgICBkaXNwYXRjaDogKG1zZzogSURpc3BhdGNoTWVzc2FnZSkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRGlzcGF0Y2hNZXNzYWdlIHtcbiAgICB0b3BpYzogc3RyaW5nO1xuICAgIGFjdGlvbjogc3RyaW5nO1xuICAgIHBheWxvYWQ/OiBhbnk7XG59XG5cbmV4cG9ydCB0eXBlIFREaXNwYXRjaFN1YnNjcmliZXIgPSAobXNnOiBJRGlzcGF0Y2hNZXNzYWdlKSA9PiB2b2lkO1xuXG5leHBvcnQgaW50ZXJmYWNlIFREaXNwYXRjaFN1YnNjcmlwdGlvbnMge1xuICAgIFtrZXk6IHN0cmluZ106IFREaXNwYXRjaFN1YnNjcmliZXJbXTtcbn1cbi8vXG4vLyBFTkQgRGlzcGF0Y2hlciBUeXBlc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gLS0tLS0tLS0tLS0tLS1cbi8vIEJvb2ttYXJrIFR5cGVzXG4vL1xuZXhwb3J0IGludGVyZmFjZSBJTG9jYWxCb29rbWFyayB7XG4gICAgY2hpbGRyZW46IHN0cmluZ1tdO1xuICAgIGRhdGVBZGRlZDogbnVtYmVyO1xuICAgIGRhdGVHcm91cE1vZGlmaWVkOiBudW1iZXI7XG4gICAgaWQ6IHN0cmluZztcbiAgICBpbmRleDogbnVtYmVyO1xuICAgIHBhcmVudElkOiBzdHJpbmc7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICB1cmw6IHN0cmluZztcbn1cbi8vXG4vLyBFTkQgQm9va21hcmsgVHlwZXNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyAtLS0tLS0tLS0tLS0tLVxuLy8gRHluYWxpc3QgdHlwZXNcbi8vXG5leHBvcnQgaW50ZXJmYWNlIElEeW5hbGlzdERvY3VtZW50IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIHBlcm1pc3Npb246IG51bWJlcjtcbiAgICBjb2xsYXBzZWQ/OiBib29sZWFuO1xuICAgIGNoaWxkcmVuPzogc3RyaW5nW107XG59XG4vL1xuLy8gRU5EIER5bmFsaXN0IFR5cGVzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gLS0tLS0tLS0tLS1cbi8vIFJlZHV4IFR5cGVzXG4vL1xuZXhwb3J0IGludGVyZmFjZSBJRGlzcGF0Y2gge1xuICAgIDxSPihcbiAgICAgICAgYXN5bmNBY3Rpb246IChkaXNwYXRjaDogSURpc3BhdGNoLCBnZXRTdGF0ZTogKCkgPT4gSVJvb3RTdG9yZVN0YXRlKSA9PiBSXG4gICAgKTogUjtcbiAgICA8Uj4oYXN5bmNBY3Rpb246IChkaXNwYXRjaDogSURpc3BhdGNoKSA9PiBSKTogUjtcbiAgICAvLyAobmV2ZXJBY3Rpb246IChkaXNwYXRjaDogRGlzcGF0Y2gsIGdldFN0YXRlOiAoKSA9PiBHZXRTdGF0ZSkgPT4gbmV2ZXIpOiBuZXZlcjtcbiAgICAoYWN0aW9uOiBvYmplY3QpOiB2b2lkO1xuICAgIC8vIChhY3Rpb246IFRodW5rKTogOyAvLyB0aHVua3MgaW4gdGhpcyBhcHAgbXVzdCByZXR1cm4gYSBwcm9taXNlXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUdldFN0YXRlIHtcbiAgICAoKTogSVJvb3RTdG9yZVN0YXRlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTZXR0aW5nc1N0YXRlIHtcbiAgICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVJvb3RTdG9yZVN0YXRlIHtcbiAgICBzZXR0aW5nc1N0b3JlOiBJU2V0dGluZ3NTdGF0ZTtcbn1cbi8vXG4vLyBFTkQgUmVkdXggVHlwZXNcbi8vIC0tLS0tLS0tLS0tLS0tLVxuIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFJQTtBQUFBO0FBQUE7QUFKQTtBQTZFQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/common/types.ts\n");

/***/ }),

/***/ "./src/kernel/kernel.ts":
/*!******************************!*\
  !*** ./src/kernel/kernel.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * kernel.ts\n *\n * @author Destin Moulton\n * @license MIT\n *\n * To be run as a background process in the manifest.json.\n */\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar clientmessenger_1 = __webpack_require__(/*! ./lib/clientmessenger */ \"./src/kernel/lib/clientmessenger.ts\");\nvar localbookmarks_1 = __webpack_require__(/*! ./lib/localbookmarks */ \"./src/kernel/lib/localbookmarks.ts\");\nvar dispatcher_1 = __webpack_require__(/*! ../common/dispatcher */ \"./src/common/dispatcher.ts\");\nvar status_1 = __webpack_require__(/*! ./status */ \"./src/kernel/status.ts\");\nvar Kernel = /** @class */ (function () {\n    function Kernel() {\n        this.localbookmarks = null;\n        this.dispatcher = null;\n        this.messenger = null;\n        this.status = null;\n        this.localbookmarks = new localbookmarks_1.default();\n        this.dispatcher = new dispatcher_1.default();\n        this.messenger = new clientmessenger_1.default(this.dispatcher);\n        this.status = new status_1.default(this.dispatcher, this.messenger);\n    }\n    return Kernel;\n}());\n// Initialize the kernel\nnew Kernel();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMva2VybmVsL2tlcm5lbC50cy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9rZXJuZWwva2VybmVsLnRzP2IzNDgiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBrZXJuZWwudHNcbiAqXG4gKiBAYXV0aG9yIERlc3RpbiBNb3VsdG9uXG4gKiBAbGljZW5zZSBNSVRcbiAqXG4gKiBUbyBiZSBydW4gYXMgYSBiYWNrZ3JvdW5kIHByb2Nlc3MgaW4gdGhlIG1hbmlmZXN0Lmpzb24uXG4gKi9cblxuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSBcIi4uL2NvbW1vbi90eXBlc1wiO1xuXG5pbXBvcnQgQ2xpZW50TWVzc2VuZ2VyIGZyb20gXCIuL2xpYi9jbGllbnRtZXNzZW5nZXJcIjtcbmltcG9ydCBMb2NhbEJvb2ttYXJrcyBmcm9tIFwiLi9saWIvbG9jYWxib29rbWFya3NcIjtcbmltcG9ydCBEaXNwYXRjaGVyIGZyb20gXCIuLi9jb21tb24vZGlzcGF0Y2hlclwiO1xuaW1wb3J0IFN0YXR1cyBmcm9tIFwiLi9zdGF0dXNcIjtcblxuY2xhc3MgS2VybmVsIHtcbiAgICBsb2NhbGJvb2ttYXJrczogTG9jYWxCb29rbWFya3MgPSBudWxsO1xuICAgIGRpc3BhdGNoZXI6IERpc3BhdGNoZXIgPSBudWxsO1xuICAgIG1lc3NlbmdlcjogQ2xpZW50TWVzc2VuZ2VyID0gbnVsbDtcbiAgICBzdGF0dXM6IFN0YXR1cyA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5sb2NhbGJvb2ttYXJrcyA9IG5ldyBMb2NhbEJvb2ttYXJrcygpO1xuICAgICAgICB0aGlzLmRpc3BhdGNoZXIgPSBuZXcgRGlzcGF0Y2hlcigpO1xuICAgICAgICB0aGlzLm1lc3NlbmdlciA9IG5ldyBDbGllbnRNZXNzZW5nZXIodGhpcy5kaXNwYXRjaGVyKTtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBuZXcgU3RhdHVzKHRoaXMuZGlzcGF0Y2hlciwgdGhpcy5tZXNzZW5nZXIpO1xuICAgIH1cbn1cblxuLy8gSW5pdGlhbGl6ZSB0aGUga2VybmVsXG5uZXcgS2VybmVsKCk7XG4iXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OztBQU9BOztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFNQTtBQUxBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/kernel/kernel.ts\n");

/***/ }),

/***/ "./src/kernel/lib/clientmessenger.ts":
/*!*******************************************!*\
  !*** ./src/kernel/lib/clientmessenger.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar lodash_1 = __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\");\n/**\n * Setup the runtime messaging system for communicating\n * with the client/react application.\n *\n *  - Listen for messages\n *  - Dispatch messages\n */\nvar ClientMessenger = /** @class */ (function () {\n    function ClientMessenger(dispatcher) {\n        var _this = this;\n        this.channel = null;\n        this.dispatcher = null;\n        this.handleMessage = function (msg) {\n            if (!lodash_1.has(msg, \"topic\") || !lodash_1.has(msg, \"action\")) {\n                _this.channel.postMessage({\n                    error: \"No topic or action provided in message.\",\n                    original: msg\n                });\n                return;\n            }\n            _this.dispatcher.dispatch(msg);\n        };\n        this.listenForMessages = function (port) {\n            if (port.name !== \"dynamarks\")\n                return;\n            _this.channel = port;\n            _this.channel.onMessage.addListener(function (msg) {\n                _this.handleMessage(msg);\n            });\n        };\n        this.channel = null;\n        this.dispatcher = dispatcher;\n        this.initializeEvents();\n    }\n    ClientMessenger.prototype.initializeEvents = function () {\n        browser.runtime.onConnect.addListener(this.listenForMessages);\n        browser.runtime.onMessage.addListener(this.handleMessage);\n    };\n    ClientMessenger.prototype.send = function (msg) {\n        return this.channel.postMessage(msg);\n    };\n    return ClientMessenger;\n}());\nexports.default = ClientMessenger;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMva2VybmVsL2xpYi9jbGllbnRtZXNzZW5nZXIudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMva2VybmVsL2xpYi9jbGllbnRtZXNzZW5nZXIudHM/ZWIwNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoYXMgfSBmcm9tIFwibG9kYXNoXCI7XG5pbXBvcnQgRGlzcGF0Y2hlciBmcm9tIFwiLi4vLi4vY29tbW9uL2Rpc3BhdGNoZXJcIjtcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gXCIuLi8uLi9jb21tb24vdHlwZXNcIjtcblxuLyoqXG4gKiBTZXR1cCB0aGUgcnVudGltZSBtZXNzYWdpbmcgc3lzdGVtIGZvciBjb21tdW5pY2F0aW5nXG4gKiB3aXRoIHRoZSBjbGllbnQvcmVhY3QgYXBwbGljYXRpb24uXG4gKlxuICogIC0gTGlzdGVuIGZvciBtZXNzYWdlc1xuICogIC0gRGlzcGF0Y2ggbWVzc2FnZXNcbiAqL1xuY2xhc3MgQ2xpZW50TWVzc2VuZ2VyIGltcGxlbWVudHMgdHlwZXMuSUNsaWVudE1lc3NlbmdlciB7XG4gICAgY2hhbm5lbDogYW55ID0gbnVsbDtcbiAgICBkaXNwYXRjaGVyOiB0eXBlcy5JRGlzcGF0Y2hlciA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihkaXNwYXRjaGVyOiBEaXNwYXRjaGVyKSB7XG4gICAgICAgIHRoaXMuY2hhbm5lbCA9IG51bGw7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hlciA9IGRpc3BhdGNoZXI7XG5cbiAgICAgICAgdGhpcy5pbml0aWFsaXplRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZUV2ZW50cygpIHtcbiAgICAgICAgYnJvd3Nlci5ydW50aW1lLm9uQ29ubmVjdC5hZGRMaXN0ZW5lcih0aGlzLmxpc3RlbkZvck1lc3NhZ2VzKTtcbiAgICAgICAgYnJvd3Nlci5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcih0aGlzLmhhbmRsZU1lc3NhZ2UpO1xuICAgIH1cblxuICAgIHNlbmQobXNnOiB0eXBlcy5JRGlzcGF0Y2hNZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5uZWwucG9zdE1lc3NhZ2UobXNnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZU1lc3NhZ2UgPSAobXNnOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKCFoYXMobXNnLCBcInRvcGljXCIpIHx8ICFoYXMobXNnLCBcImFjdGlvblwiKSkge1xuICAgICAgICAgICAgdGhpcy5jaGFubmVsLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICBlcnJvcjogXCJObyB0b3BpYyBvciBhY3Rpb24gcHJvdmlkZWQgaW4gbWVzc2FnZS5cIixcbiAgICAgICAgICAgICAgICBvcmlnaW5hbDogbXNnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRpc3BhdGNoZXIuZGlzcGF0Y2gobXNnKTtcbiAgICB9O1xuXG4gICAgbGlzdGVuRm9yTWVzc2FnZXMgPSAocG9ydDogYW55KSA9PiB7XG4gICAgICAgIGlmIChwb3J0Lm5hbWUgIT09IFwiZHluYW1hcmtzXCIpIHJldHVybjtcblxuICAgICAgICB0aGlzLmNoYW5uZWwgPSBwb3J0O1xuICAgICAgICB0aGlzLmNoYW5uZWwub25NZXNzYWdlLmFkZExpc3RlbmVyKChtc2c6IGFueSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVNZXNzYWdlKG1zZyk7XG4gICAgICAgIH0pO1xuICAgIH07XG59XG5leHBvcnQgZGVmYXVsdCBDbGllbnRNZXNzZW5nZXI7XG4iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFJQTs7Ozs7O0FBTUE7QUFDQTtBQUlBO0FBQUE7QUFIQTtBQUNBO0FBa0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWpDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBcUJBO0FBQUE7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/kernel/lib/clientmessenger.ts\n");

/***/ }),

/***/ "./src/kernel/lib/localbookmarks.ts":
/*!******************************************!*\
  !*** ./src/kernel/lib/localbookmarks.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar lodash_1 = __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\");\nvar LocalBookmarks = /** @class */ (function () {\n    function LocalBookmarks() {\n    }\n    LocalBookmarks.prototype.getTree = function () {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0: return [4 /*yield*/, browser.bookmarks.getTree()];\n                    case 1: return [2 /*return*/, _a.sent()];\n                }\n            });\n        });\n    };\n    LocalBookmarks.prototype.pluckById = function (id) {\n        return __awaiter(this, void 0, void 0, function () {\n            var bmks, result;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0: return [4 /*yield*/, this.getTree()];\n                    case 1:\n                        bmks = _a.sent();\n                        console.log(\"bmks\", bmks);\n                        result = [];\n                        this.flattenBookmarks(bmks[0], result);\n                        console.log(\"flat\", result);\n                        return [2 /*return*/, lodash_1.map(lodash_1.flatten(bmks), id)];\n                }\n            });\n        });\n    };\n    LocalBookmarks.prototype.flattenBookmarks = function (node, result) {\n        var _this = this;\n        var children = [];\n        if (lodash_1.has(node, \"children\")) {\n            // group or folder\n            node.children.forEach(function (child) {\n                children.push(_this.flattenBookmarks(child, result));\n            });\n        }\n        // bookmark\n        result.push({\n            children: children,\n            dateAdded: node.dateAdded || 0,\n            dateGroupModified: node.dateGroupModified || 0,\n            id: node.id,\n            index: node.index || -1,\n            parentId: node.parentId || \"\",\n            title: node.title,\n            url: node.url || \"\"\n        });\n        return node.id;\n    };\n    return LocalBookmarks;\n}());\nexports.default = LocalBookmarks;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMva2VybmVsL2xpYi9sb2NhbGJvb2ttYXJrcy50cy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9rZXJuZWwvbGliL2xvY2FsYm9va21hcmtzLnRzP2NmZGUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZmxhdHRlbiwgaGFzLCBtYXAgfSBmcm9tIFwibG9kYXNoXCI7XG5cbmltcG9ydCBib29rbWFya2lkcyBmcm9tIFwiLi4vY29uc3RhbnRzL2Jvb2ttYXJraWRzXCI7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGVzXCI7XG5cbmNsYXNzIExvY2FsQm9va21hcmtzIHtcbiAgICBhc3luYyBnZXRUcmVlKCkge1xuICAgICAgICByZXR1cm4gYXdhaXQgYnJvd3Nlci5ib29rbWFya3MuZ2V0VHJlZSgpO1xuICAgIH1cblxuICAgIGFzeW5jIHBsdWNrQnlJZChpZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGJta3MgPSBhd2FpdCB0aGlzLmdldFRyZWUoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJibWtzXCIsIGJta3MpO1xuICAgICAgICBsZXQgcmVzdWx0OiB0eXBlcy5JTG9jYWxCb29rbWFya1tdID0gW107XG4gICAgICAgIHRoaXMuZmxhdHRlbkJvb2ttYXJrcyhibWtzWzBdLCByZXN1bHQpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImZsYXRcIiwgcmVzdWx0KTtcbiAgICAgICAgcmV0dXJuIG1hcChmbGF0dGVuKGJta3MpLCBpZCk7XG4gICAgfVxuXG4gICAgZmxhdHRlbkJvb2ttYXJrcyhcbiAgICAgICAgbm9kZTogYnJvd3Nlci5ib29rbWFya3MuQm9va21hcmtUcmVlTm9kZSxcbiAgICAgICAgcmVzdWx0OiB0eXBlcy5JTG9jYWxCb29rbWFya1tdXG4gICAgKSB7XG4gICAgICAgIGxldCBjaGlsZHJlbjogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgaWYgKGhhcyhub2RlLCBcImNoaWxkcmVuXCIpKSB7XG4gICAgICAgICAgICAvLyBncm91cCBvciBmb2xkZXJcbiAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaCh0aGlzLmZsYXR0ZW5Cb29rbWFya3MoY2hpbGQsIHJlc3VsdCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gYm9va21hcmtcbiAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgY2hpbGRyZW4sXG4gICAgICAgICAgICBkYXRlQWRkZWQ6IG5vZGUuZGF0ZUFkZGVkIHx8IDAsXG4gICAgICAgICAgICBkYXRlR3JvdXBNb2RpZmllZDogbm9kZS5kYXRlR3JvdXBNb2RpZmllZCB8fCAwLFxuICAgICAgICAgICAgaWQ6IG5vZGUuaWQsXG4gICAgICAgICAgICBpbmRleDogbm9kZS5pbmRleCB8fCAtMSxcbiAgICAgICAgICAgIHBhcmVudElkOiBub2RlLnBhcmVudElkIHx8IFwiXCIsXG4gICAgICAgICAgICB0aXRsZTogbm9kZS50aXRsZSxcbiAgICAgICAgICAgIHVybDogbm9kZS51cmwgfHwgXCJcIlxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbm9kZS5pZDtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBMb2NhbEJvb2ttYXJrcztcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBS0E7QUFBQTtBQXVDQTtBQXRDQTs7OztBQUNBO0FBQUE7Ozs7QUFDQTtBQUVBOzs7OztBQUNBOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUNBO0FBRUE7QUFBQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/kernel/lib/localbookmarks.ts\n");

/***/ }),

/***/ "./src/kernel/status.ts":
/*!******************************!*\
  !*** ./src/kernel/status.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar types = __webpack_require__(/*! ../common/types */ \"./src/common/types.ts\");\n/**\n * Container for the kernel status.\n */\nvar Status = /** @class */ (function () {\n    function Status(dispatcher, messenger) {\n        var _this = this;\n        this._handleDispatch = function (msg) {\n            switch (msg.action) {\n                case \"get\":\n                    var message = {\n                        topic: \"status\",\n                        action: \"get.result\",\n                        data: _this.get()\n                    };\n                    return _this.messenger.send(message);\n            }\n        };\n        this.currentStatus = types.EKernelStatus.Unconfigured;\n        this.dispatcher = dispatcher;\n        this.messenger = messenger;\n        this.dispatcher.subscribe(\"status\", this._handleDispatch);\n    }\n    Status.prototype.set = function (newStatus) {\n        this.currentStatus = newStatus;\n    };\n    Status.prototype.get = function () {\n        return this.currentStatus;\n    };\n    return Status;\n}());\nexports.default = Status;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMva2VybmVsL3N0YXR1cy50cy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9rZXJuZWwvc3RhdHVzLnRzP2JkM2MiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdHlwZXMgZnJvbSBcIi4uL2NvbW1vbi90eXBlc1wiO1xuXG4vKipcbiAqIENvbnRhaW5lciBmb3IgdGhlIGtlcm5lbCBzdGF0dXMuXG4gKi9cbmNsYXNzIFN0YXR1cyB7XG4gICAgY3VycmVudFN0YXR1czogdHlwZXMuRUtlcm5lbFN0YXR1cztcbiAgICBkaXNwYXRjaGVyOiB0eXBlcy5JRGlzcGF0Y2hlcjtcbiAgICBtZXNzZW5nZXI6IHR5cGVzLklDbGllbnRNZXNzZW5nZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZGlzcGF0Y2hlcjogdHlwZXMuSURpc3BhdGNoZXIsXG4gICAgICAgIG1lc3NlbmdlcjogdHlwZXMuSUNsaWVudE1lc3NlbmdlclxuICAgICkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0dXMgPSB0eXBlcy5FS2VybmVsU3RhdHVzLlVuY29uZmlndXJlZDtcbiAgICAgICAgdGhpcy5kaXNwYXRjaGVyID0gZGlzcGF0Y2hlcjtcbiAgICAgICAgdGhpcy5tZXNzZW5nZXIgPSBtZXNzZW5nZXI7XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaGVyLnN1YnNjcmliZShcInN0YXR1c1wiLCB0aGlzLl9oYW5kbGVEaXNwYXRjaCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaGFuZGxlRGlzcGF0Y2ggPSAobXNnOiB0eXBlcy5JRGlzcGF0Y2hNZXNzYWdlKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobXNnLmFjdGlvbikge1xuICAgICAgICAgICAgY2FzZSBcImdldFwiOlxuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcGljOiBcInN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IFwiZ2V0LnJlc3VsdFwiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLmdldCgpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tZXNzZW5nZXIuc2VuZChtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBzZXQobmV3U3RhdHVzOiB0eXBlcy5FS2VybmVsU3RhdHVzKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXR1cyA9IG5ld1N0YXR1cztcbiAgICB9XG5cbiAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRTdGF0dXM7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdGF0dXM7XG4iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFFQTs7QUFFQTtBQUNBO0FBS0E7QUFBQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFqQkE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQWNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/kernel/status.ts\n");

/***/ })

/******/ });