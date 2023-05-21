(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.JSONHTTPError=exports.TextHTTPError=exports.HTTPError=exports.getPagination=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key]}}}return target};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _pagination=require("./pagination");Object.defineProperty(exports,"getPagination",{enumerable:true,get:function get(){return _pagination.getPagination}});function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return call&&(typeof call==="object"||typeof call==="function")?call:self}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}function _extendableBuiltin(cls){function ExtendableBuiltin(){var instance=Reflect.construct(cls,Array.from(arguments));Object.setPrototypeOf(instance,Object.getPrototypeOf(this));return instance}ExtendableBuiltin.prototype=Object.create(cls.prototype,{constructor:{value:cls,enumerable:false,writable:true,configurable:true}});if(Object.setPrototypeOf){Object.setPrototypeOf(ExtendableBuiltin,cls)}else{ExtendableBuiltin.__proto__=cls}return ExtendableBuiltin}var HTTPError=exports.HTTPError=function(_extendableBuiltin2){_inherits(HTTPError,_extendableBuiltin2);function HTTPError(response){_classCallCheck(this,HTTPError);var _this=_possibleConstructorReturn(this,(HTTPError.__proto__||Object.getPrototypeOf(HTTPError)).call(this,response.statusText));_this.name=_this.constructor.name;if(typeof Error.captureStackTrace==="function"){Error.captureStackTrace(_this,_this.constructor)}else{_this.stack=new Error(response.statusText).stack}_this.status=response.status;return _this}return HTTPError}(_extendableBuiltin(Error));var TextHTTPError=exports.TextHTTPError=function(_HTTPError){_inherits(TextHTTPError,_HTTPError);function TextHTTPError(response,data){_classCallCheck(this,TextHTTPError);var _this2=_possibleConstructorReturn(this,(TextHTTPError.__proto__||Object.getPrototypeOf(TextHTTPError)).call(this,response));_this2.data=data;return _this2}return TextHTTPError}(HTTPError);var JSONHTTPError=exports.JSONHTTPError=function(_HTTPError2){_inherits(JSONHTTPError,_HTTPError2);function JSONHTTPError(response,json){_classCallCheck(this,JSONHTTPError);var _this3=_possibleConstructorReturn(this,(JSONHTTPError.__proto__||Object.getPrototypeOf(JSONHTTPError)).call(this,response));_this3.json=json;return _this3}return JSONHTTPError}(HTTPError);var API=function(){function API(){var apiURL=arguments.length>0&&arguments[0]!==undefined?arguments[0]:"";var options=arguments[1];_classCallCheck(this,API);this.apiURL=apiURL;if(this.apiURL.match(/\/[^\/]?/)){this._sameOrigin=true}this.defaultHeaders=options&&options.defaultHeaders||{}}_createClass(API,[{key:"headers",value:function headers(){var _headers=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};return _extends({},this.defaultHeaders,{"Content-Type":"application/json"},_headers)}},{key:"parseJsonResponse",value:function parseJsonResponse(response){return response.json().then(function(json){if(!response.ok){return Promise.reject(new JSONHTTPError(response,json))}var pagination=(0,_pagination.getPagination)(response);return pagination?{pagination:pagination,items:json}:json})}},{key:"request",value:function request(path){var _this4=this;var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var headers=this.headers(options.headers||{});if(this._sameOrigin){options.credentials=options.credentials||"same-origin"}return fetch(this.apiURL+path,_extends({},options,{headers:headers})).then(function(response){var contentType=response.headers.get("Content-Type");if(contentType&&contentType.match(/json/)){return _this4.parseJsonResponse(response)}if(!response.ok){return response.text().then(function(data){return Promise.reject(new TextHTTPError(response,data))})}return response.text().then(function(data){data})})}}]);return API}();exports.default=API},{"./pagination":2}],2:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i["return"])_i["return"]()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr)){return arr}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i)}else{throw new TypeError("Invalid attempt to destructure non-iterable instance")}}}();exports.getPagination=getPagination;function getPagination(response){var links=response.headers.get("Link");var pagination={};if(links==null){return null}links=links.split(",");var total=response.headers.get("X-Total-Count");for(var i=0,len=links.length;i<len;i++){var link=links[i].replace(/(^\s*|\s*$)/,"");var _link$split=link.split(";"),_link$split2=_slicedToArray(_link$split,2),url=_link$split2[0],rel=_link$split2[1];var m=url.match(/page=(\d+)/);var page=m&&parseInt(m[1],10);if(rel.match(/last/)){pagination.last=page}else if(rel.match(/next/)){pagination.next=page}else if(rel.match(/prev/)){pagination.prev=page}else if(rel.match(/first/)){pagination.first=page}}pagination.last=Math.max(pagination.last||0,pagination.prev&&pagination.prev+1||0);pagination.current=pagination.next?pagination.next-1:pagination.last||1;pagination.total=total?parseInt(total,10):null;return pagination}},{}],3:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports["default"]=void 0;function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor}var Admin=function(){function Admin(user){_classCallCheck(this,Admin);this.user=user}_createClass(Admin,[{key:"listUsers",value:function listUsers(aud){return this.user._request("/admin/users",{method:"GET",audience:aud})}},{key:"getUser",value:function getUser(user){return this.user._request("/admin/users/".concat(user.id))}},{key:"updateUser",value:function updateUser(user){var attributes=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};return this.user._request("/admin/users/".concat(user.id),{method:"PUT",body:JSON.stringify(attributes)})}},{key:"createUser",value:function createUser(email,password){var attributes=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};attributes.email=email;attributes.password=password;return this.user._request("/admin/users",{method:"POST",body:JSON.stringify(attributes)})}},{key:"deleteUser",value:function deleteUser(user){return this.user._request("/admin/users/".concat(user.id),{method:"DELETE"})}}]);return Admin}();exports["default"]=Admin},{}],4:[function(require,module,exports){"use strict";function _typeof(obj){"@babel/helpers - typeof";if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj}}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj}}return _typeof(obj)}Object.defineProperty(exports,"__esModule",{value:true});exports["default"]=void 0;var _microApiClient=_interopRequireWildcard(require("micro-api-client"));var _user=_interopRequireDefault(require("./user.js.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _getRequireWildcardCache(){if(typeof WeakMap!=="function")return null;var cache=new WeakMap;_getRequireWildcardCache=function _getRequireWildcardCache(){return cache};return cache}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}if(obj===null||_typeof(obj)!=="object"&&typeof obj!=="function"){return{default:obj}}var cache=_getRequireWildcardCache();if(cache&&cache.has(obj)){return cache.get(obj)}var newObj={};var hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;if(desc&&(desc.get||desc.set)){Object.defineProperty(newObj,key,desc)}else{newObj[key]=obj[key]}}}newObj["default"]=obj;if(cache){cache.set(obj,newObj)}return newObj}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor}var HTTPRegexp=/^http:\/\//;var defaultApiURL="/.netlify/identity";var GoTrue=function(){function GoTrue(){var _ref=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{},_ref$APIUrl=_ref.APIUrl,APIUrl=_ref$APIUrl===void 0?defaultApiURL:_ref$APIUrl,_ref$audience=_ref.audience,audience=_ref$audience===void 0?"":_ref$audience,_ref$setCookie=_ref.setCookie,setCookie=_ref$setCookie===void 0?false:_ref$setCookie;_classCallCheck(this,GoTrue);if(APIUrl.match(HTTPRegexp)){console.warn("Warning:\n\nDO NOT USE HTTP IN PRODUCTION FOR GOTRUE EVER!\nGoTrue REQUIRES HTTPS to work securely.")}if(audience){this.audience=audience}this.setCookie=setCookie;this.api=new _microApiClient["default"](APIUrl)}_createClass(GoTrue,[{key:"_request",value:function _request(path){var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};options.headers=options.headers||{};var aud=options.audience||this.audience;if(aud){options.headers["X-JWT-AUD"]=aud}return this.api.request(path,options)["catch"](function(error){if(error instanceof _microApiClient.JSONHTTPError&&error.json){if(error.json.msg){error.message=error.json.msg}else if(error.json.error){error.message="".concat(error.json.error,": ").concat(error.json.error_description)}}return Promise.reject(error)})}},{key:"settings",value:function settings(){return this._request("/settings")}},{key:"signup",value:function signup(email,password,data){return this._request("/signup",{method:"POST",body:JSON.stringify({email:email,password:password,data:data})})}},{key:"login",value:function login(email,password,remember){var _this=this;this._setRememberHeaders(remember);return this._request("/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"grant_type=password&username=".concat(encodeURIComponent(email),"&password=").concat(encodeURIComponent(password))}).then(function(response){_user["default"].removeSavedSession();return _this.createUser(response,remember)})}},{key:"loginExternalUrl",value:function loginExternalUrl(provider){return"".concat(this.api.apiURL,"/authorize?provider=").concat(provider)}},{key:"confirm",value:function confirm(token,remember){this._setRememberHeaders(remember);return this.verify("signup",token,remember)}},{key:"requestPasswordRecovery",value:function requestPasswordRecovery(email){return this._request("/recover",{method:"POST",body:JSON.stringify({email:email})})}},{key:"recover",value:function recover(token,remember){this._setRememberHeaders(remember);return this.verify("recovery",token,remember)}},{key:"acceptInvite",value:function acceptInvite(token,password,remember){var _this2=this;this._setRememberHeaders(remember);return this._request("/verify",{method:"POST",body:JSON.stringify({token:token,password:password,type:"signup"})}).then(function(response){return _this2.createUser(response,remember)})}},{key:"acceptInviteExternalUrl",value:function acceptInviteExternalUrl(provider,token){return"".concat(this.api.apiURL,"/authorize?provider=").concat(provider,"&invite_token=").concat(token)}},{key:"createUser",value:function createUser(tokenResponse){var remember=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;this._setRememberHeaders(remember);var user=new _user["default"](this.api,tokenResponse,this.audience);return user.getUserData().then(function(userData){if(remember){userData._saveSession()}return userData})}},{key:"currentUser",value:function currentUser(){var user=_user["default"].recoverSession(this.api);user&&this._setRememberHeaders(user._fromStorage);return user}},{key:"verify",value:function verify(type,token,remember){var _this3=this;this._setRememberHeaders(remember);return this._request("/verify",{method:"POST",body:JSON.stringify({token:token,type:type})}).then(function(response){return _this3.createUser(response,remember)})}},{key:"_setRememberHeaders",value:function _setRememberHeaders(remember){if(this.setCookie){this.api.defaultHeaders=this.api.defaultHeaders||{};this.api.defaultHeaders["X-Use-Cookie"]=remember?"1":"session"}}}]);return GoTrue}();exports["default"]=GoTrue;if(typeof window!=="undefined"){window.GoTrue=GoTrue}},{"./user.js":5,"micro-api-client":1}],5:[function(require,module,exports){"use strict";function _typeof(obj){"@babel/helpers - typeof";if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj}}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj}}return _typeof(obj)}Object.defineProperty(exports,"__esModule",{value:true});exports["default"]=void 0;var _microApiClient=_interopRequireWildcard(require("micro-api-client"));var _admin=_interopRequireDefault(require("./admin.js.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _getRequireWildcardCache(){if(typeof WeakMap!=="function")return null;var cache=new WeakMap;_getRequireWildcardCache=function _getRequireWildcardCache(){return cache};return cache}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}if(obj===null||_typeof(obj)!=="object"&&typeof obj!=="function"){return{default:obj}}var cache=_getRequireWildcardCache();if(cache&&cache.has(obj)){return cache.get(obj)}var newObj={};var hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;if(desc&&(desc.get||desc.set)){Object.defineProperty(newObj,key,desc)}else{newObj[key]=obj[key]}}}newObj["default"]=obj;if(cache){cache.set(obj,newObj)}return newObj}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable});keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key])})}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source))}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))})}}return target}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor}var ExpiryMargin=60*1e3;var storageKey="gotrue.user";var refreshPromises={};var currentUser=null;var forbiddenUpdateAttributes={api:1,token:1,audience:1,url:1};var forbiddenSaveAttributes={api:1};var isBrowser=function isBrowser(){return typeof window!=="undefined"};var User=function(){function User(api,tokenResponse,audience){_classCallCheck(this,User);this.api=api;this.url=api.apiURL;this.audience=audience;this._processTokenResponse(tokenResponse);currentUser=this}_createClass(User,[{key:"update",value:function update(attributes){var _this=this;return this._request("/user",{method:"PUT",body:JSON.stringify(attributes)}).then(function(response){return _this._saveUserData(response)._refreshSavedSession()})}},{key:"jwt",value:function jwt(forceRefresh){var token=this.tokenDetails();if(token===null||token===undefined){return Promise.reject(new Error("Gotrue-js: failed getting jwt access token"))}var expires_at=token.expires_at,refresh_token=token.refresh_token,access_token=token.access_token;if(forceRefresh||expires_at-ExpiryMargin<Date.now()){return this._refreshToken(refresh_token)}return Promise.resolve(access_token)}},{key:"logout",value:function logout(){return this._request("/logout",{method:"POST"}).then(this.clearSession.bind(this))["catch"](this.clearSession.bind(this))}},{key:"_refreshToken",value:function _refreshToken(refresh_token){var _this2=this;if(refreshPromises[refresh_token]){return refreshPromises[refresh_token]}return refreshPromises[refresh_token]=this.api.request("/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"grant_type=refresh_token&refresh_token=".concat(refresh_token)}).then(function(response){delete refreshPromises[refresh_token];_this2._processTokenResponse(response);_this2._refreshSavedSession();return _this2.token.access_token})["catch"](function(error){delete refreshPromises[refresh_token];_this2.clearSession();return Promise.reject(error)})}},{key:"_request",value:function _request(path){var _this3=this;var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};options.headers=options.headers||{};var aud=options.audience||this.audience;if(aud){options.headers["X-JWT-AUD"]=aud}return this.jwt().then(function(token){return _this3.api.request(path,_objectSpread({headers:Object.assign(options.headers,{Authorization:"Bearer ".concat(token)})},options))["catch"](function(error){if(error instanceof _microApiClient.JSONHTTPError&&error.json){if(error.json.msg){error.message=error.json.msg}else if(error.json.error){error.message="".concat(error.json.error,": ").concat(error.json.error_description)}}return Promise.reject(error)})})}},{key:"getUserData",value:function getUserData(){return this._request("/user").then(this._saveUserData.bind(this)).then(this._refreshSavedSession.bind(this))}},{key:"_saveUserData",value:function _saveUserData(attributes,fromStorage){for(var key in attributes){if(key in User.prototype||key in forbiddenUpdateAttributes){continue}this[key]=attributes[key]}if(fromStorage){this._fromStorage=true}return this}},{key:"_processTokenResponse",value:function _processTokenResponse(tokenResponse){this.token=tokenResponse;try{var claims=JSON.parse(urlBase64Decode(tokenResponse.access_token.split(".")[1]));this.token.expires_at=claims.exp*1e3}catch(error){console.error(new Error("Gotrue-js: Failed to parse tokenResponse claims: ".concat(error)))}}},{key:"_refreshSavedSession",value:function _refreshSavedSession(){if(isBrowser()&&localStorage.getItem(storageKey)){this._saveSession()}return this}},{key:"_saveSession",value:function _saveSession(){isBrowser()&&localStorage.setItem(storageKey,JSON.stringify(this._details));return this}},{key:"tokenDetails",value:function tokenDetails(){return this.token}},{key:"clearSession",value:function clearSession(){User.removeSavedSession();this.token=null;currentUser=null}},{key:"admin",get:function get(){return new _admin["default"](this)}},{key:"_details",get:function get(){var userCopy={};for(var key in this){if(key in User.prototype||key in forbiddenSaveAttributes){continue}userCopy[key]=this[key]}return userCopy}}],[{key:"removeSavedSession",value:function removeSavedSession(){isBrowser()&&localStorage.removeItem(storageKey)}},{key:"recoverSession",value:function recoverSession(apiInstance){if(currentUser){return currentUser}var json=isBrowser()&&localStorage.getItem(storageKey);if(json){try{var data=JSON.parse(json);var url=data.url,token=data.token,audience=data.audience;if(!url||!token){return null}var api=apiInstance||new _microApiClient["default"](url,{});return new User(api,token,audience)._saveUserData(data,true)}catch(error){console.error(new Error("Gotrue-js: Error recovering session: ".concat(error)));return null}}return null}}]);return User}();exports["default"]=User;function urlBase64Decode(str){var output=str.replace(/-/g,"+").replace(/_/g,"/");switch(output.length%4){case 0:break;case 2:output+="==";break;case 3:output+="=";break;default:throw"Illegal base64url string!"}var result=window.atob(output);try{return decodeURIComponent(escape(result))}catch(error){return result}}},{"./admin.js":3,"micro-api-client":1}]},{},[4]);