require('source-map-support/register');
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./nuxt.config.js":
/*!************************!*\
  !*** ./nuxt.config.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [{
      charset: 'utf-8'
    }, {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    }, {
      hid: 'description',
      name: 'description',
      content: 'Nuxt.js project'
    }],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  /*
  ** Global CSS
  */
  css: ['~assets/css/main.css'],

  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#3B8070'
  },

  /*
  ** Nuxt.js modules
  */
  modules: [// Doc: https://github.com/nuxt-community/axios-module#usage
  '@nuxtjs/axios'],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLINT on save
     */
    extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }

  }
};

/***/ }),

/***/ "./server/index.js":
/*!*************************!*\
  !*** ./server/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa */ "koa");
/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nuxt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nuxt */ "nuxt");
/* harmony import */ var nuxt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nuxt__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _interface_hotSearch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interface/hotSearch */ "./server/interface/hotSearch.js");
/* harmony import */ var _interface_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./interface/search */ "./server/interface/search.js");





async function start() {
  const app = new koa__WEBPACK_IMPORTED_MODULE_0___default.a();
  const host = process.env.HOST || '127.0.0.1';
  const port = process.env.PORT || 3000; // Import and Set Nuxt.js options

  const config = __webpack_require__(/*! ../nuxt.config.js */ "./nuxt.config.js");

  config.dev = !(app.env === 'production'); // Instantiate nuxt.js

  const nuxt = new nuxt__WEBPACK_IMPORTED_MODULE_1__["Nuxt"](config); // Build in development

  if (config.dev) {
    const builder = new nuxt__WEBPACK_IMPORTED_MODULE_1__["Builder"](nuxt);
    await builder.build();
  }

  app.use(_interface_hotSearch__WEBPACK_IMPORTED_MODULE_2__["default"].routes()).use(_interface_hotSearch__WEBPACK_IMPORTED_MODULE_2__["default"].allowedMethods());
  app.use(_interface_search__WEBPACK_IMPORTED_MODULE_3__["default"].routes()).use(_interface_search__WEBPACK_IMPORTED_MODULE_3__["default"].allowedMethods());
  app.use(ctx => {
    ctx.status = 200;
    ctx.respond = false; // Mark request as handled for Koa

    ctx.req.ctx = ctx; // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash

    nuxt.render(ctx.req, ctx.res);
  });
  app.listen(port, host);
  console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console
}

start();

/***/ }),

/***/ "./server/interface/hotSearch.js":
/*!***************************************!*\
  !*** ./server/interface/hotSearch.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);
 // import https from 'https'

const router = new koa_router__WEBPACK_IMPORTED_MODULE_0___default.a({
  prefix: '/hotSearch'
}); // 首页热搜榜接口

router.get('/hotList', async ctx => {
  ctx.body = {
    hotList: [{
      num: '1',
      numRed: true,
      content: '13省份局部大到暴雨',
      hot: true,
      // 是否是热门搜索
      new: false,
      // 是否是新晋搜索
      heat: '486.6'
    }, {
      num: '2',
      numRed: true,
      content: '广州惊现七蒂睡莲',
      hot: true,
      new: false,
      heat: '415.3'
    }, {
      num: '3',
      numRed: true,
      content: '胡锡进谈不明原因肺炎',
      hot: false,
      new: false,
      heat: '409.2'
    }, {
      num: '4',
      numRed: false,
      content: '香港新增42例新冠肺炎',
      hot: false,
      new: false,
      heat: '323.9'
    }, {
      num: '5',
      numRed: false,
      content: '央行谈超10万元转账',
      hot: false,
      new: true,
      heat: '319.2'
    }, {
      num: '6',
      numRed: false,
      content: '字节跳动前端训练营',
      hot: true,
      new: false,
      heat: '316.6'
    }, {
      num: '7',
      numRed: false,
      content: '黄健翔回击王兴言论',
      hot: false,
      new: false,
      heat: '309.3'
    }, {
      num: '8',
      numRed: false,
      content: '曝梁安琪400亿资产',
      hot: false,
      new: true,
      heat: '301.1'
    }]
  };
}); // 关键词匹配接口
// router.get('/searchList', async ctx => {
//   const keyword = ctx.query.keyword || ''
//   return new Promise(resolve => {
//     const req = https.get(`https://i.snssdk.com/search/api/sug/?keyword=${keyword}`, res => {
//       res.pipe(ctx.res)
//       res.on('end', resolve)
//     })
//     req.end
//   })
// })

/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./server/interface/search.js":
/*!************************************!*\
  !*** ./server/interface/search.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/axios */ "./server/interface/utils/axios.js");


let router = new koa_router__WEBPACK_IMPORTED_MODULE_0___default.a({
  prefix: '/search'
});
router.get('/searchList', async ctx => {
  const keyword = encodeURI(ctx.query.keyword) || '';
  let {
    status,
    data
  } = await _utils_axios__WEBPACK_IMPORTED_MODULE_1__["default"].get(`https://i.snssdk.com/search/api/sug/?keyword=${keyword}`);

  if (status === 200) {
    ctx.body = {
      data: data.data
    };
  } else {
    ctx.body = {
      data: {}
    };
  }
});
router.get('/searchContent', async ctx => {
  const keyword = encodeURI(ctx.query.keyword) || '';
  let {
    status,
    data
  } = await _utils_axios__WEBPACK_IMPORTED_MODULE_1__["default"].get(`https://i.snssdk.com/search/api/study/?keyword=${keyword}`);

  if (status === 200) {
    ctx.body = {
      data: data.data
    };
  } else {
    ctx.body = {
      data: {}
    };
  }
});
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./server/interface/utils/axios.js":
/*!*****************************************!*\
  !*** ./server/interface/utils/axios.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

const instance = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({
  baseURL: `http://${process.env.HOST || '127.0.0.1'}:${process.env.PORT || 3000}`,
  timeout: 2000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  }
});
/* harmony default export */ __webpack_exports__["default"] = (instance);

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),

/***/ "koa-router":
/*!*****************************!*\
  !*** external "koa-router" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),

/***/ "nuxt":
/*!***********************!*\
  !*** external "nuxt" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ })

/******/ });
//# sourceMappingURL=main.map