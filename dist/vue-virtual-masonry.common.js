module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "0b4e":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("b7e4");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("6f55e9a8", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "24fb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "499e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ addStylesClient; });

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesClient.js
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ "60fa":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VirtualMasonry_vue_vue_type_style_index_0_id_39771eeb_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0b4e");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VirtualMasonry_vue_vue_type_style_index_0_id_39771eeb_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VirtualMasonry_vue_vue_type_style_index_0_id_39771eeb_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "b7e4":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".masonry-container[data-v-39771eeb]{position:relative;-webkit-overflow-scrolling:touch}.masonry-container .masonry-item[data-v-39771eeb]{position:absolute;left:0;top:0}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./src/config.js
var config_options = {
  additionalDistance: 500
};
/* harmony default export */ var config = ({
  options: config_options
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3d60cbb9-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VirtualMasonry.vue?vue&type=template&id=39771eeb&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"container",staticClass:"masonry-container",style:(_vm.containerStyle)},[(_vm.displayItems.length)?_vm._l((_vm.displayItems),function(item,index){return _c('div',{key:index,staticClass:"masonry-item",style:(_vm.getItemStyles(item._masonryIndex))},[_vm._t("default",null,{"data":item,"position":Object.assign({}, _vm.positionMap[item._masonryIndex],
          {colWidth: _vm.colWidth})})],2)}):_vm._e()],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/VirtualMasonry.vue?vue&type=template&id=39771eeb&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VirtualMasonry.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var GROUP_SIZE = 600;
/* harmony default export */ var VirtualMasonryvue_type_script_lang_js_ = ({
  props: {
    itemHeightGetter: {
      type: Function,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    colWidth: {
      type: Number,
      required: true
    },
    col: {
      type: Number,
      default: 0
    },
    gap: {
      type: Number,
      default: 16
    },
    fit: {
      type: Boolean,
      default: false
    },
    rowsPerSection: {
      type: Number,
      default: 3
    },
    groupSize: {
      type: Number,
      default: GROUP_SIZE
    }
  },
  data: function data() {
    return {
      positionMap: {},
      widthStore: {},
      heightStore: {},
      group: {},
      inGroup: {},
      sections: [{}],
      sectionsIdx: 0,
      displayItems: [],
      storedItemsLength: 0,
      currentSectionCount: 0,
      containerWidth: 0,
      maxHeight: 0,
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight,
      scrollTop: document.documentElement.scrollTop,
      containerOffset: 0,
      additionalDistance: config.options.additionalDistance
    };
  },
  computed: {
    columns: function columns() {
      if (this.col) {
        return this.col;
      } else {
        return Math.floor((this.containerWidth + this.gap) / (this.colWidth + this.gap));
      }
    },
    containerFitWidth: function containerFitWidth() {
      return this.col * this.colWidth + (this.col - 1) * this.gap;
    },
    containerStyle: function containerStyle() {
      var width = this.fit && this.col ? "".concat(this.containerFitWidth, "px") : null;
      var height = "".concat(this.maxHeight || 0, "px");
      return {
        width: width,
        height: height
      };
    }
  },
  watch: {
    items: 'itemsChanged',
    columns: 'columnsChanged',
    colWidth: 'colWidthChanged',
    screenWidth: function screenWidth(value) {
      var _this = this;

      if (this.resizeTimer) {
        clearTimeout(this.resizeTimer);
      }

      this.resizeTimer = setTimeout(function () {
        _this.screenWidthChanged(value);
      }, 300);
    }
  },
  created: function created() {
    this.resetWidthStore();
    this.resetHeightStore();
    this.resetPositionMap();
    window.addEventListener('resize', this.handleWindowResize);
    window.addEventListener('scroll', this.handleWindowScroll, {
      passive: true
    });
  },
  mounted: function mounted() {
    this.containerWidth = this.getContainerWidth();
    this.containerOffset = this.getContainerOffset();
    this.renderMasonry();
  },
  updated: function updated() {
    this.containerWidth = this.getContainerWidth();
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize);
    window.removeEventListener('scroll', this.handleWindowScroll);
  },
  methods: {
    // waterfall container
    getContainerWidth: function getContainerWidth() {
      if (this.fit && this.col) {
        return this.containerFitWidth;
      }

      if (this.$refs.container) {
        return this.$refs.container.offsetWidth;
      } else {
        return 0;
      }
    },
    getContainerOffset: function getContainerOffset() {
      if (!this.$refs.container) {
        return;
      }

      var bodyRect = document.documentElement.getBoundingClientRect();
      var elRect = this.$refs.container.getBoundingClientRect();
      return elRect.top - bodyRect.top;
    },
    getItemStyles: function getItemStyles(idx) {
      return {
        width: "".concat(this.colWidth, "px"),
        height: "".concat(this.positionMap[idx].height, "px"),
        transform: "translateX(".concat(this.positionMap[idx].left, "px) translateY(").concat(this.positionMap[idx].top, "px)")
      };
    },
    // waterfall items
    itemsChanged: function itemsChanged() {
      if (this.items.length <= this.storedItemsLength) {
        this.renderMasonry();
      } else {
        this.computePosition();
        this.setMaxHeight();
        this.setDisplay();
      }

      this.storedItemsLength = this.items.length;
    },
    columnsChanged: function columnsChanged() {
      this.renderMasonry();
    },
    colWidthChanged: function colWidthChanged() {
      this.renderMasonry();
    },
    screenWidthChanged: function screenWidthChanged() {
      this.containerWidth = this.getContainerWidth();
    },
    renderMasonry: function renderMasonry() {
      this.resetGroup();
      this.resetSections();
      this.resetWidthStore();
      this.resetHeightStore();
      this.resetPositionMap();
      this.setMaxHeight();
      this.setDisplay();
    },
    setDisplay: function setDisplay() {
      var _this2 = this;

      var countPerSection = this.rowsPerSection * this.columns;
      var showCondHead = this.scrollTop - this.additionalDistance;
      var showCondTail = this.scrollTop + this.screenHeight + this.additionalDistance;
      var start = Math.floor(showCondHead / this.groupSize);
      var end = Math.floor(showCondTail / this.groupSize);
      var list = [];
      var inList = {};

      for (var i = start; i <= end; i++) {
        if (!this.group[i]) {
          continue;
        }

        for (var j = 0; j < this.group[i].length; j++) {
          var idx = this.group[i][j];

          if (inList[idx]) {
            continue;
          }

          list = list.concat(this.items.slice(idx * countPerSection, (idx + 1) * countPerSection));
          inList[idx] = true;
        }
      }

      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(function () {
          _this2.displayItems = list;

          _this2.$forceUpdate();
        });
      } else {
        this.displayItems = list;
        this.$forceUpdate();
      }
    },
    resetWidthStore: function resetWidthStore() {
      this.widthStore = {};

      for (var i = 0; i < this.columns; i++) {
        this.widthStore[i] = (this.colWidth + this.gap) * i;
      }
    },
    resetHeightStore: function resetHeightStore() {
      this.heightStore = {};

      for (var i = 0; i < this.columns; i++) {
        this.heightStore[i] = 0;
      }
    },
    resetPositionMap: function resetPositionMap() {
      this.displayItems = [];
      this.positionMap = {};
      this.computePosition();
    },
    resetGroup: function resetGroup() {
      this.group = {};
      this.inGroup = {};
    },
    resetSections: function resetSections() {
      this.sections = [{}];
      this.currentSectionCount = 0;
    },
    computePosition: function computePosition() {
      var _this3 = this;

      if (!this.widthStore || !this.heightStore || !this.columns) {
        return;
      }

      var countPerSection = this.columns * this.rowsPerSection;
      this.items.forEach(function (item, index) {
        // ignore computed
        var mapKey = index; // eslint-disable-next-line no-param-reassign

        item._masonryIndex = index;

        if (_this3.positionMap[mapKey]) {
          return;
        }

        _this3.$set(_this3.positionMap, mapKey, {}); // compute load height


        var h = _this3.itemHeightGetter(item);

        _this3.$set(_this3.positionMap[mapKey], 'height', h); // compute position


        var left;
        var top;
        var storeIdx;

        if (index < _this3.columns) {
          left = _this3.widthStore[index];
          top = 0;
          storeIdx = index;
        } else {
          var minHeightIdx = _this3.getMinHeightCol();

          left = _this3.widthStore[minHeightIdx];
          top = _this3.heightStore[minHeightIdx];
          storeIdx = minHeightIdx;
        } // check section count


        if (_this3.currentSectionCount < countPerSection) {
          _this3.currentSectionCount += 1;
        } else {
          _this3.currentSectionCount = 1;

          _this3.sections.push({});
        } // set position


        _this3.$set(_this3.positionMap[mapKey], 'left', left);

        _this3.$set(_this3.positionMap[mapKey], 'top', top);

        _this3.heightStore[storeIdx] += h + _this3.gap; // set position to section

        var sectionIdx = _this3.sections.length - 1;
        var _this3$sections$secti = _this3.sections[sectionIdx],
            head = _this3$sections$secti.head,
            tail = _this3$sections$secti.tail;

        if (typeof head === 'undefined' || top < head) {
          _this3.sections[sectionIdx].head = top;
        }

        var bottom = top + h;

        if (typeof tail === 'undefined' || bottom > tail) {
          _this3.sections[sectionIdx].tail = bottom;
        }
      });
      this.sections.forEach(function (section, idx) {
        // 把所有的section放到groupMap里面
        if (_this3.inGroup[idx]) {
          return;
        }

        var head = section.head,
            tail = section.tail;

        if (typeof head === 'undefined' || typeof tail === 'undefined') {
          return;
        }

        var start = Math.floor(head / _this3.groupSize);
        var end = Math.floor(tail / _this3.groupSize);

        for (var i = start; i <= end; i++) {
          if (!_this3.group[i]) {
            _this3.group[i] = [];
          }

          _this3.group[i].push(idx);
        }

        _this3.inGroup[idx] = true;
      });
    },
    getMinHeightCol: function getMinHeightCol() {
      var min = Number.MAX_VALUE;
      var minIndex = 0;

      for (var i = 0; i < this.columns; i++) {
        if (this.heightStore[i] < min) {
          min = this.heightStore[i];
          minIndex = i;
        }
      }

      return minIndex;
    },
    getMaxHeight: function getMaxHeight() {
      var max = 0;

      for (var i = 0; i < this.columns; i++) {
        if (this.heightStore[i] > max) {
          max = this.heightStore[i];
        }
      }

      return max;
    },
    setMaxHeight: function setMaxHeight() {
      this.maxHeight = this.getMaxHeight();
    },
    // window event handler
    handleWindowResize: function handleWindowResize() {
      this.screenWidth = document.documentElement.clientWidth;
      this.screenHeight = document.documentElement.clientHeight;
      this.containerOffset = this.getContainerOffset();
    },
    handleWindowScroll: function handleWindowScroll() {
      this.handleScroll();
    },
    handleScroll: function handleScroll() {
      var _this4 = this;

      var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (timeout && this.lastScroll && Date.now() - this.lastScroll < 200) {
        return;
      }

      if (timeout) {
        if (this.scrollTimer) {
          clearTimeout(this.scrollTimer);
        }

        this.scrollTimer = setTimeout(function () {
          _this4.handleScroll.apply(_this4, [true]);
        }, 200);
      }

      this.lastScroll = Date.now();
      this.containerOffset = this.getContainerOffset();
      this.scrollTop = document.documentElement.scrollTop - this.containerOffset;
      this.setDisplay();
    }
  }
});
// CONCATENATED MODULE: ./src/components/VirtualMasonry.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VirtualMasonryvue_type_script_lang_js_ = (VirtualMasonryvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/VirtualMasonry.vue?vue&type=style&index=0&id=39771eeb&lang=less&scoped=true&
var VirtualMasonryvue_type_style_index_0_id_39771eeb_lang_less_scoped_true_ = __webpack_require__("60fa");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/VirtualMasonry.vue






/* normalize component */

var component = normalizeComponent(
  components_VirtualMasonryvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "39771eeb",
  null
  
)

/* harmony default export */ var VirtualMasonry = (component.exports);
// CONCATENATED MODULE: ./src/libEntry.js


var lib = {
  install: function install(Vue, options) {
    if (options) {
      Object.assign(config.options, options);
    }

    Vue.component('VirtualMasonry', VirtualMasonry);
  }
};
/* harmony default export */ var libEntry = (lib);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (libEntry);



/***/ })

/******/ });
//# sourceMappingURL=vue-virtual-masonry.common.js.map