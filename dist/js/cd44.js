/**
 * Swiper 5.3.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://swiperjs.com
 *
 * Copyright 2014-2020 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: February 8, 2020
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).Swiper=t()}(this,(function(){"use strict";var e="undefined"==typeof document?{body:{},addEventListener:function(){},removeEventListener:function(){},activeElement:{blur:function(){},nodeName:""},querySelector:function(){return null},querySelectorAll:function(){return[]},getElementById:function(){return null},createEvent:function(){return{initEvent:function(){}}},createElement:function(){return{children:[],childNodes:[],style:{},setAttribute:function(){},getElementsByTagName:function(){return[]}}},location:{hash:""}}:document,t="undefined"==typeof window?{document:e,navigator:{userAgent:""},location:{},history:{},CustomEvent:function(){return this},addEventListener:function(){},removeEventListener:function(){},getComputedStyle:function(){return{getPropertyValue:function(){return""}}},Image:function(){},Date:function(){},screen:{},setTimeout:function(){},clearTimeout:function(){}}:window,i=function(e){for(var t=0;t<e.length;t+=1)this[t]=e[t];return this.length=e.length,this};function s(s,a){var r=[],n=0;if(s&&!a&&s instanceof i)return s;if(s)if("string"==typeof s){var o,l,d=s.trim();if(d.indexOf("<")>=0&&d.indexOf(">")>=0){var h="div";for(0===d.indexOf("<li")&&(h="ul"),0===d.indexOf("<tr")&&(h="tbody"),0!==d.indexOf("<td")&&0!==d.indexOf("<th")||(h="tr"),0===d.indexOf("<tbody")&&(h="table"),0===d.indexOf("<option")&&(h="select"),(l=e.createElement(h)).innerHTML=d,n=0;n<l.childNodes.length;n+=1)r.push(l.childNodes[n])}else for(o=a||"#"!==s[0]||s.match(/[ .<>:~]/)?(a||e).querySelectorAll(s.trim()):[e.getElementById(s.trim().split("#")[1])],n=0;n<o.length;n+=1)o[n]&&r.push(o[n])}else if(s.nodeType||s===t||s===e)r.push(s);else if(s.length>0&&s[0].nodeType)for(n=0;n<s.length;n+=1)r.push(s[n]);return new i(r)}function a(e){for(var t=[],i=0;i<e.length;i+=1)-1===t.indexOf(e[i])&&t.push(e[i]);return t}s.fn=i.prototype,s.Class=i,s.Dom7=i;var r={addClass:function(e){if(void 0===e)return this;for(var t=e.split(" "),i=0;i<t.length;i+=1)for(var s=0;s<this.length;s+=1)void 0!==this[s]&&void 0!==this[s].classList&&this[s].classList.add(t[i]);return this},removeClass:function(e){for(var t=e.split(" "),i=0;i<t.length;i+=1)for(var s=0;s<this.length;s+=1)void 0!==this[s]&&void 0!==this[s].classList&&this[s].classList.remove(t[i]);return this},hasClass:function(e){return!!this[0]&&this[0].classList.contains(e)},toggleClass:function(e){for(var t=e.split(" "),i=0;i<t.length;i+=1)for(var s=0;s<this.length;s+=1)void 0!==this[s]&&void 0!==this[s].classList&&this[s].classList.toggle(t[i]);return this},attr:function(e,t){var i=arguments;if(1===arguments.length&&"string"==typeof e)return this[0]?this[0].getAttribute(e):void 0;for(var s=0;s<this.length;s+=1)if(2===i.length)this[s].setAttribute(e,t);else for(var a in e)this[s][a]=e[a],this[s].setAttribute(a,e[a]);return this},removeAttr:function(e){for(var t=0;t<this.length;t+=1)this[t].removeAttribute(e);return this},data:function(e,t){var i;if(void 0!==t){for(var s=0;s<this.length;s+=1)(i=this[s]).dom7ElementDataStorage||(i.dom7ElementDataStorage={}),i.dom7ElementDataStorage[e]=t;return this}if(i=this[0]){if(i.dom7ElementDataStorage&&e in i.dom7ElementDataStorage)return i.dom7ElementDataStorage[e];var a=i.getAttribute("data-"+e);return a||void 0}},transform:function(e){for(var t=0;t<this.length;t+=1){var i=this[t].style;i.webkitTransform=e,i.transform=e}return this},transition:function(e){"string"!=typeof e&&(e+="ms");for(var t=0;t<this.length;t+=1){var i=this[t].style;i.webkitTransitionDuration=e,i.transitionDuration=e}return this},on:function(){for(var e,t=[],i=arguments.length;i--;)t[i]=arguments[i];var a=t[0],r=t[1],n=t[2],o=t[3];function l(e){var t=e.target;if(t){var i=e.target.dom7EventData||[];if(i.indexOf(e)<0&&i.unshift(e),s(t).is(r))n.apply(t,i);else for(var a=s(t).parents(),o=0;o<a.length;o+=1)s(a[o]).is(r)&&n.apply(a[o],i)}}function d(e){var t=e&&e.target&&e.target.dom7EventData||[];t.indexOf(e)<0&&t.unshift(e),n.apply(this,t)}"function"==typeof t[1]&&(a=(e=t)[0],n=e[1],o=e[2],r=void 0),o||(o=!1);for(var h,p=a.split(" "),c=0;c<this.length;c+=1){var u=this[c];if(r)for(h=0;h<p.length;h+=1){var v=p[h];u.dom7LiveListeners||(u.dom7LiveListeners={}),u.dom7LiveListeners[v]||(u.dom7LiveListeners[v]=[]),u.dom7LiveListeners[v].push({listener:n,proxyListener:l}),u.addEventListener(v,l,o)}else for(h=0;h<p.length;h+=1){var f=p[h];u.dom7Listeners||(u.dom7Listeners={}),u.dom7Listeners[f]||(u.dom7Listeners[f]=[]),u.dom7Listeners[f].push({listener:n,proxyListener:d}),u.addEventListener(f,d,o)}}return this},off:function(){for(var e,t=[],i=arguments.length;i--;)t[i]=arguments[i];var s=t[0],a=t[1],r=t[2],n=t[3];"function"==typeof t[1]&&(s=(e=t)[0],r=e[1],n=e[2],a=void 0),n||(n=!1);for(var o=s.split(" "),l=0;l<o.length;l+=1)for(var d=o[l],h=0;h<this.length;h+=1){var p=this[h],c=void 0;if(!a&&p.dom7Listeners?c=p.dom7Listeners[d]:a&&p.dom7LiveListeners&&(c=p.dom7LiveListeners[d]),c&&c.length)for(var u=c.length-1;u>=0;u-=1){var v=c[u];r&&v.listener===r?(p.removeEventListener(d,v.proxyListener,n),c.splice(u,1)):r&&v.listener&&v.listener.dom7proxy&&v.listener.dom7proxy===r?(p.removeEventListener(d,v.proxyListener,n),c.splice(u,1)):r||(p.removeEventListener(d,v.proxyListener,n),c.splice(u,1))}}return this},trigger:function(){for(var i=[],s=arguments.length;s--;)i[s]=arguments[s];for(var a=i[0].split(" "),r=i[1],n=0;n<a.length;n+=1)for(var o=a[n],l=0;l<this.length;l+=1){var d=this[l],h=void 0;try{h=new t.CustomEvent(o,{detail:r,bubbles:!0,cancelable:!0})}catch(t){(h=e.createEvent("Event")).initEvent(o,!0,!0),h.detail=r}d.dom7EventData=i.filter((function(e,t){return t>0})),d.dispatchEvent(h),d.dom7EventData=[],delete d.dom7EventData}return this},transitionEnd:function(e){var t,i=["webkitTransitionEnd","transitionend"],s=this;function a(r){if(r.target===this)for(e.call(this,r),t=0;t<i.length;t+=1)s.off(i[t],a)}if(e)for(t=0;t<i.length;t+=1)s.on(i[t],a);return this},outerWidth:function(e){if(this.length>0){if(e){var t=this.styles();return this[0].offsetWidth+parseFloat(t.getPropertyValue("margin-right"))+parseFloat(t.getPropertyValue("margin-left"))}return this[0].offsetWidth}return null},outerHeight:function(e){if(this.length>0){if(e){var t=this.styles();return this[0].offsetHeight+parseFloat(t.getPropertyValue("margin-top"))+parseFloat(t.getPropertyValue("margin-bottom"))}return this[0].offsetHeight}return null},offset:function(){if(this.length>0){var i=this[0],s=i.getBoundingClientRect(),a=e.body,r=i.clientTop||a.clientTop||0,n=i.clientLeft||a.clientLeft||0,o=i===t?t.scrollY:i.scrollTop,l=i===t?t.scrollX:i.scrollLeft;return{top:s.top+o-r,left:s.left+l-n}}return null},css:function(e,i){var s;if(1===arguments.length){if("string"!=typeof e){for(s=0;s<this.length;s+=1)for(var a in e)this[s].style[a]=e[a];return this}if(this[0])return t.getComputedStyle(this[0],null).getPropertyValue(e)}if(2===arguments.length&&"string"==typeof e){for(s=0;s<this.length;s+=1)this[s].style[e]=i;return this}return this},each:function(e){if(!e)return this;for(var t=0;t<this.length;t+=1)if(!1===e.call(this[t],t,this[t]))return this;return this},html:function(e){if(void 0===e)return this[0]?this[0].innerHTML:void 0;for(var t=0;t<this.length;t+=1)this[t].innerHTML=e;return this},text:function(e){if(void 0===e)return this[0]?this[0].textContent.trim():null;for(var t=0;t<this.length;t+=1)this[t].textContent=e;return this},is:function(a){var r,n,o=this[0];if(!o||void 0===a)return!1;if("string"==typeof a){if(o.matches)return o.matches(a);if(o.webkitMatchesSelector)return o.webkitMatchesSelector(a);if(o.msMatchesSelector)return o.msMatchesSelector(a);for(r=s(a),n=0;n<r.length;n+=1)if(r[n]===o)return!0;return!1}if(a===e)return o===e;if(a===t)return o===t;if(a.nodeType||a instanceof i){for(r=a.nodeType?[a]:a,n=0;n<r.length;n+=1)if(r[n]===o)return!0;return!1}return!1},index:function(){var e,t=this[0];if(t){for(e=0;null!==(t=t.previousSibling);)1===t.nodeType&&(e+=1);return e}},eq:function(e){if(void 0===e)return this;var t,s=this.length;return new i(e>s-1?[]:e<0?(t=s+e)<0?[]:[this[t]]:[this[e]])},append:function(){for(var t,s=[],a=arguments.length;a--;)s[a]=arguments[a];for(var r=0;r<s.length;r+=1){t=s[r];for(var n=0;n<this.length;n+=1)if("string"==typeof t){var o=e.createElement("div");for(o.innerHTML=t;o.firstChild;)this[n].appendChild(o.firstChild)}else if(t instanceof i)for(var l=0;l<t.length;l+=1)this[n].appendChild(t[l]);else this[n].appendChild(t)}return this},prepend:function(t){var s,a;for(s=0;s<this.length;s+=1)if("string"==typeof t){var r=e.createElement("div");for(r.innerHTML=t,a=r.childNodes.length-1;a>=0;a-=1)this[s].insertBefore(r.childNodes[a],this[s].childNodes[0])}else if(t instanceof i)for(a=0;a<t.length;a+=1)this[s].insertBefore(t[a],this[s].childNodes[0]);else this[s].insertBefore(t,this[s].childNodes[0]);return this},next:function(e){return this.length>0?e?this[0].nextElementSibling&&s(this[0].nextElementSibling).is(e)?new i([this[0].nextElementSibling]):new i([]):this[0].nextElementSibling?new i([this[0].nextElementSibling]):new i([]):new i([])},nextAll:function(e){var t=[],a=this[0];if(!a)return new i([]);for(;a.nextElementSibling;){var r=a.nextElementSibling;e?s(r).is(e)&&t.push(r):t.push(r),a=r}return new i(t)},prev:function(e){if(this.length>0){var t=this[0];return e?t.previousElementSibling&&s(t.previousElementSibling).is(e)?new i([t.previousElementSibling]):new i([]):t.previousElementSibling?new i([t.previousElementSibling]):new i([])}return new i([])},prevAll:function(e){var t=[],a=this[0];if(!a)return new i([]);for(;a.previousElementSibling;){var r=a.previousElementSibling;e?s(r).is(e)&&t.push(r):t.push(r),a=r}return new i(t)},parent:function(e){for(var t=[],i=0;i<this.length;i+=1)null!==this[i].parentNode&&(e?s(this[i].parentNode).is(e)&&t.push(this[i].parentNode):t.push(this[i].parentNode));return s(a(t))},parents:function(e){for(var t=[],i=0;i<this.length;i+=1)for(var r=this[i].parentNode;r;)e?s(r).is(e)&&t.push(r):t.push(r),r=r.parentNode;return s(a(t))},closest:function(e){var t=this;return void 0===e?new i([]):(t.is(e)||(t=t.parents(e).eq(0)),t)},find:function(e){for(var t=[],s=0;s<this.length;s+=1)for(var a=this[s].querySelectorAll(e),r=0;r<a.length;r+=1)t.push(a[r]);return new i(t)},children:function(e){for(var t=[],r=0;r<this.length;r+=1)for(var n=this[r].childNodes,o=0;o<n.length;o+=1)e?1===n[o].nodeType&&s(n[o]).is(e)&&t.push(n[o]):1===n[o].nodeType&&t.push(n[o]);return new i(a(t))},filter:function(e){for(var t=[],s=0;s<this.length;s+=1)e.call(this[s],s,this[s])&&t.push(this[s]);return new i(t)},remove:function(){for(var e=0;e<this.length;e+=1)this[e].parentNode&&this[e].parentNode.removeChild(this[e]);return this},add:function(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];var i,a;for(i=0;i<e.length;i+=1){var r=s(e[i]);for(a=0;a<r.length;a+=1)this[this.length]=r[a],this.length+=1}return this},styles:function(){return this[0]?t.getComputedStyle(this[0],null):{}}};Object.keys(r).forEach((function(e){s.fn[e]=s.fn[e]||r[e]}));var n={deleteProps:function(e){var t=e;Object.keys(t).forEach((function(e){try{t[e]=null}catch(e){}try{delete t[e]}catch(e){}}))},nextTick:function(e,t){return void 0===t&&(t=0),setTimeout(e,t)},now:function(){return Date.now()},getTranslate:function(e,i){var s,a,r;void 0===i&&(i="x");var n=t.getComputedStyle(e,null);return t.WebKitCSSMatrix?((a=n.transform||n.webkitTransform).split(",").length>6&&(a=a.split(", ").map((function(e){return e.replace(",",".")})).join(", ")),r=new t.WebKitCSSMatrix("none"===a?"":a)):s=(r=n.MozTransform||n.OTransform||n.MsTransform||n.msTransform||n.transform||n.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,")).toString().split(","),"x"===i&&(a=t.WebKitCSSMatrix?r.m41:16===s.length?parseFloat(s[12]):parseFloat(s[4])),"y"===i&&(a=t.WebKitCSSMatrix?r.m42:16===s.length?parseFloat(s[13]):parseFloat(s[5])),a||0},parseUrlQuery:function(e){var i,s,a,r,n={},o=e||t.location.href;if("string"==typeof o&&o.length)for(r=(s=(o=o.indexOf("?")>-1?o.replace(/\S*\?/,""):"").split("&").filter((function(e){return""!==e}))).length,i=0;i<r;i+=1)a=s[i].replace(/#\S+/g,"").split("="),n[decodeURIComponent(a[0])]=void 0===a[1]?void 0:decodeURIComponent(a[1])||"";return n},isObject:function(e){return"object"==typeof e&&null!==e&&e.constructor&&e.constructor===Object},extend:function(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];for(var i=Object(e[0]),s=1;s<e.length;s+=1){var a=e[s];if(null!=a)for(var r=Object.keys(Object(a)),o=0,l=r.length;o<l;o+=1){var d=r[o],h=Object.getOwnPropertyDescriptor(a,d);void 0!==h&&h.enumerable&&(n.isObject(i[d])&&n.isObject(a[d])?n.extend(i[d],a[d]):!n.isObject(i[d])&&n.isObject(a[d])?(i[d]={},n.extend(i[d],a[d])):i[d]=a[d])}}return i}},o={touch:t.Modernizr&&!0===t.Modernizr.touch||!!(t.navigator.maxTouchPoints>0||"ontouchstart"in t||t.DocumentTouch&&e instanceof t.DocumentTouch),pointerEvents:!!t.PointerEvent&&"maxTouchPoints"in t.navigator&&t.navigator.maxTouchPoints>0,observer:"MutationObserver"in t||"WebkitMutationObserver"in t,passiveListener:function(){var e=!1;try{var i=Object.defineProperty({},"passive",{get:function(){e=!0}});t.addEventListener("testPassiveListener",null,i)}catch(e){}return e}(),gestures:"ongesturestart"in t},l=function(e){void 0===e&&(e={});var t=this;t.params=e,t.eventsListeners={},t.params&&t.params.on&&Object.keys(t.params.on).forEach((function(e){t.on(e,t.params.on[e])}))},d={components:{configurable:!0}};l.prototype.on=function(e,t,i){var s=this;if("function"!=typeof t)return s;var a=i?"unshift":"push";return e.split(" ").forEach((function(e){s.eventsListeners[e]||(s.eventsListeners[e]=[]),s.eventsListeners[e][a](t)})),s},l.prototype.once=function(e,t,i){var s=this;if("function"!=typeof t)return s;function a(){for(var i=[],r=arguments.length;r--;)i[r]=arguments[r];s.off(e,a),a.f7proxy&&delete a.f7proxy,t.apply(s,i)}return a.f7proxy=t,s.on(e,a,i)},l.prototype.off=function(e,t){var i=this;return i.eventsListeners?(e.split(" ").forEach((function(e){void 0===t?i.eventsListeners[e]=[]:i.eventsListeners[e]&&i.eventsListeners[e].length&&i.eventsListeners[e].forEach((function(s,a){(s===t||s.f7proxy&&s.f7proxy===t)&&i.eventsListeners[e].splice(a,1)}))})),i):i},l.prototype.emit=function(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];var i,s,a,r=this;if(!r.eventsListeners)return r;"string"==typeof e[0]||Array.isArray(e[0])?(i=e[0],s=e.slice(1,e.length),a=r):(i=e[0].events,s=e[0].data,a=e[0].context||r);var n=Array.isArray(i)?i:i.split(" ");return n.forEach((function(e){if(r.eventsListeners&&r.eventsListeners[e]){var t=[];r.eventsListeners[e].forEach((function(e){t.push(e)})),t.forEach((function(e){e.apply(a,s)}))}})),r},l.prototype.useModulesParams=function(e){var t=this;t.modules&&Object.keys(t.modules).forEach((function(i){var s=t.modules[i];s.params&&n.extend(e,s.params)}))},l.prototype.useModules=function(e){void 0===e&&(e={});var t=this;t.modules&&Object.keys(t.modules).forEach((function(i){var s=t.modules[i],a=e[i]||{};s.instance&&Object.keys(s.instance).forEach((function(e){var i=s.instance[e];t[e]="function"==typeof i?i.bind(t):i})),s.on&&t.on&&Object.keys(s.on).forEach((function(e){t.on(e,s.on[e])})),s.create&&s.create.bind(t)(a)}))},d.components.set=function(e){this.use&&this.use(e)},l.installModule=function(e){for(var t=[],i=arguments.length-1;i-- >0;)t[i]=arguments[i+1];var s=this;s.prototype.modules||(s.prototype.modules={});var a=e.name||Object.keys(s.prototype.modules).length+"_"+n.now();return s.prototype.modules[a]=e,e.proto&&Object.keys(e.proto).forEach((function(t){s.prototype[t]=e.proto[t]})),e.static&&Object.keys(e.static).forEach((function(t){s[t]=e.static[t]})),e.install&&e.install.apply(s,t),s},l.use=function(e){for(var t=[],i=arguments.length-1;i-- >0;)t[i]=arguments[i+1];var s=this;return Array.isArray(e)?(e.forEach((function(e){return s.installModule(e)})),s):s.installModule.apply(s,[e].concat(t))},Object.defineProperties(l,d);var h={updateSize:function(){var e,t,i=this.$el;e=void 0!==this.params.width?this.params.width:i[0].clientWidth,t=void 0!==this.params.height?this.params.height:i[0].clientHeight,0===e&&this.isHorizontal()||0===t&&this.isVertical()||(e=e-parseInt(i.css("padding-left"),10)-parseInt(i.css("padding-right"),10),t=t-parseInt(i.css("padding-top"),10)-parseInt(i.css("padding-bottom"),10),n.extend(this,{width:e,height:t,size:this.isHorizontal()?e:t}))},updateSlides:function(){var e=this.params,i=this.$wrapperEl,s=this.size,a=this.rtlTranslate,r=this.wrongRTL,o=this.virtual&&e.virtual.enabled,l=o?this.virtual.slides.length:this.slides.length,d=i.children("."+this.params.slideClass),h=o?this.virtual.slides.length:d.length,p=[],c=[],u=[];function v(t){return!e.cssMode||t!==d.length-1}var f=e.slidesOffsetBefore;"function"==typeof f&&(f=e.slidesOffsetBefore.call(this));var m=e.slidesOffsetAfter;"function"==typeof m&&(m=e.slidesOffsetAfter.call(this));var g=this.snapGrid.length,b=this.snapGrid.length,w=e.spaceBetween,y=-f,x=0,T=0;if(void 0!==s){var E,S;"string"==typeof w&&w.indexOf("%")>=0&&(w=parseFloat(w.replace("%",""))/100*s),this.virtualSize=-w,a?d.css({marginLeft:"",marginTop:""}):d.css({marginRight:"",marginBottom:""}),e.slidesPerColumn>1&&(E=Math.floor(h/e.slidesPerColumn)===h/this.params.slidesPerColumn?h:Math.ceil(h/e.slidesPerColumn)*e.slidesPerColumn,"auto"!==e.slidesPerView&&"row"===e.slidesPerColumnFill&&(E=Math.max(E,e.slidesPerView*e.slidesPerColumn)));for(var C,M=e.slidesPerColumn,P=E/M,z=Math.floor(h/e.slidesPerColumn),k=0;k<h;k+=1){S=0;var $=d.eq(k);if(e.slidesPerColumn>1){var L=void 0,I=void 0,D=void 0;if("row"===e.slidesPerColumnFill&&e.slidesPerGroup>1){var O=Math.floor(k/(e.slidesPerGroup*e.slidesPerColumn)),A=k-e.slidesPerColumn*e.slidesPerGroup*O,G=0===O?e.slidesPerGroup:Math.min(Math.ceil((h-O*M*e.slidesPerGroup)/M),e.slidesPerGroup);L=(I=A-(D=Math.floor(A/G))*G+O*e.slidesPerGroup)+D*E/M,$.css({"-webkit-box-ordinal-group":L,"-moz-box-ordinal-group":L,"-ms-flex-order":L,"-webkit-order":L,order:L})}else"column"===e.slidesPerColumnFill?(D=k-(I=Math.floor(k/M))*M,(I>z||I===z&&D===M-1)&&(D+=1)>=M&&(D=0,I+=1)):I=k-(D=Math.floor(k/P))*P;$.css("margin-"+(this.isHorizontal()?"top":"left"),0!==D&&e.spaceBetween&&e.spaceBetween+"px")}if("none"!==$.css("display")){if("auto"===e.slidesPerView){var B=t.getComputedStyle($[0],null),H=$[0].style.transform,N=$[0].style.webkitTransform;if(H&&($[0].style.transform="none"),N&&($[0].style.webkitTransform="none"),e.roundLengths)S=this.isHorizontal()?$.outerWidth(!0):$.outerHeight(!0);else if(this.isHorizontal()){var X=parseFloat(B.getPropertyValue("width")),V=parseFloat(B.getPropertyValue("padding-left")),Y=parseFloat(B.getPropertyValue("padding-right")),F=parseFloat(B.getPropertyValue("margin-left")),W=parseFloat(B.getPropertyValue("margin-right")),R=B.getPropertyValue("box-sizing");S=R&&"border-box"===R?X+F+W:X+V+Y+F+W}else{var q=parseFloat(B.getPropertyValue("height")),j=parseFloat(B.getPropertyValue("padding-top")),K=parseFloat(B.getPropertyValue("padding-bottom")),U=parseFloat(B.getPropertyValue("margin-top")),_=parseFloat(B.getPropertyValue("margin-bottom")),Z=B.getPropertyValue("box-sizing");S=Z&&"border-box"===Z?q+U+_:q+j+K+U+_}H&&($[0].style.transform=H),N&&($[0].style.webkitTransform=N),e.roundLengths&&(S=Math.floor(S))}else S=(s-(e.slidesPerView-1)*w)/e.slidesPerView,e.roundLengths&&(S=Math.floor(S)),d[k]&&(this.isHorizontal()?d[k].style.width=S+"px":d[k].style.height=S+"px");d[k]&&(d[k].swiperSlideSize=S),u.push(S),e.centeredSlides?(y=y+S/2+x/2+w,0===x&&0!==k&&(y=y-s/2-w),0===k&&(y=y-s/2-w),Math.abs(y)<.001&&(y=0),e.roundLengths&&(y=Math.floor(y)),T%e.slidesPerGroup==0&&p.push(y),c.push(y)):(e.roundLengths&&(y=Math.floor(y)),(T-Math.min(this.params.slidesPerGroupSkip,T))%this.params.slidesPerGroup==0&&p.push(y),c.push(y),y=y+S+w),this.virtualSize+=S+w,x=S,T+=1}}if(this.virtualSize=Math.max(this.virtualSize,s)+m,a&&r&&("slide"===e.effect||"coverflow"===e.effect)&&i.css({width:this.virtualSize+e.spaceBetween+"px"}),e.setWrapperSize&&(this.isHorizontal()?i.css({width:this.virtualSize+e.spaceBetween+"px"}):i.css({height:this.virtualSize+e.spaceBetween+"px"})),e.slidesPerColumn>1&&(this.virtualSize=(S+e.spaceBetween)*E,this.virtualSize=Math.ceil(this.virtualSize/e.slidesPerColumn)-e.spaceBetween,this.isHorizontal()?i.css({width:this.virtualSize+e.spaceBetween+"px"}):i.css({height:this.virtualSize+e.spaceBetween+"px"}),e.centeredSlides)){C=[];for(var Q=0;Q<p.length;Q+=1){var J=p[Q];e.roundLengths&&(J=Math.floor(J)),p[Q]<this.virtualSize+p[0]&&C.push(J)}p=C}if(!e.centeredSlides){C=[];for(var ee=0;ee<p.length;ee+=1){var te=p[ee];e.roundLengths&&(te=Math.floor(te)),p[ee]<=this.virtualSize-s&&C.push(te)}p=C,Math.floor(this.virtualSize-s)-Math.floor(p[p.length-1])>1&&p.push(this.virtualSize-s)}if(0===p.length&&(p=[0]),0!==e.spaceBetween&&(this.isHorizontal()?a?d.filter(v).css({marginLeft:w+"px"}):d.filter(v).css({marginRight:w+"px"}):d.filter(v).css({marginBottom:w+"px"})),e.centeredSlides&&e.centeredSlidesBounds){var ie=0;u.forEach((function(t){ie+=t+(e.spaceBetween?e.spaceBetween:0)}));var se=(ie-=e.spaceBetween)-s;p=p.map((function(e){return e<0?-f:e>se?se+m:e}))}if(e.centerInsufficientSlides){var ae=0;if(u.forEach((function(t){ae+=t+(e.spaceBetween?e.spaceBetween:0)})),(ae-=e.spaceBetween)<s){var re=(s-ae)/2;p.forEach((function(e,t){p[t]=e-re})),c.forEach((function(e,t){c[t]=e+re}))}}n.extend(this,{slides:d,snapGrid:p,slidesGrid:c,slidesSizesGrid:u}),h!==l&&this.emit("slidesLengthChange"),p.length!==g&&(this.params.watchOverflow&&this.checkOverflow(),this.emit("snapGridLengthChange")),c.length!==b&&this.emit("slidesGridLengthChange"),(e.watchSlidesProgress||e.watchSlidesVisibility)&&this.updateSlidesOffset()}},updateAutoHeight:function(e){var t,i=[],s=0;if("number"==typeof e?this.setTransition(e):!0===e&&this.setTransition(this.params.speed),"auto"!==this.params.slidesPerView&&this.params.slidesPerView>1)for(t=0;t<Math.ceil(this.params.slidesPerView);t+=1){var a=this.activeIndex+t;if(a>this.slides.length)break;i.push(this.slides.eq(a)[0])}else i.push(this.slides.eq(this.activeIndex)[0]);for(t=0;t<i.length;t+=1)if(void 0!==i[t]){var r=i[t].offsetHeight;s=r>s?r:s}s&&this.$wrapperEl.css("height",s+"px")},updateSlidesOffset:function(){for(var e=this.slides,t=0;t<e.length;t+=1)e[t].swiperSlideOffset=this.isHorizontal()?e[t].offsetLeft:e[t].offsetTop},updateSlidesProgress:function(e){void 0===e&&(e=this&&this.translate||0);var t=this.params,i=this.slides,a=this.rtlTranslate;if(0!==i.length){void 0===i[0].swiperSlideOffset&&this.updateSlidesOffset();var r=-e;a&&(r=e),i.removeClass(t.slideVisibleClass),this.visibleSlidesIndexes=[],this.visibleSlides=[];for(var n=0;n<i.length;n+=1){var o=i[n],l=(r+(t.centeredSlides?this.minTranslate():0)-o.swiperSlideOffset)/(o.swiperSlideSize+t.spaceBetween);if(t.watchSlidesVisibility){var d=-(r-o.swiperSlideOffset),h=d+this.slidesSizesGrid[n];(d>=0&&d<this.size-1||h>1&&h<=this.size||d<=0&&h>=this.size)&&(this.visibleSlides.push(o),this.visibleSlidesIndexes.push(n),i.eq(n).addClass(t.slideVisibleClass))}o.progress=a?-l:l}this.visibleSlides=s(this.visibleSlides)}},updateProgress:function(e){if(void 0===e){var t=this.rtlTranslate?-1:1;e=this&&this.translate&&this.translate*t||0}var i=this.params,s=this.maxTranslate()-this.minTranslate(),a=this.progress,r=this.isBeginning,o=this.isEnd,l=r,d=o;0===s?(a=0,r=!0,o=!0):(r=(a=(e-this.minTranslate())/s)<=0,o=a>=1),n.extend(this,{progress:a,isBeginning:r,isEnd:o}),(i.watchSlidesProgress||i.watchSlidesVisibility)&&this.updateSlidesProgress(e),r&&!l&&this.emit("reachBeginning toEdge"),o&&!d&&this.emit("reachEnd toEdge"),(l&&!r||d&&!o)&&this.emit("fromEdge"),this.emit("progress",a)},updateSlidesClasses:function(){var e,t=this.slides,i=this.params,s=this.$wrapperEl,a=this.activeIndex,r=this.realIndex,n=this.virtual&&i.virtual.enabled;t.removeClass(i.slideActiveClass+" "+i.slideNextClass+" "+i.slidePrevClass+" "+i.slideDuplicateActiveClass+" "+i.slideDuplicateNextClass+" "+i.slideDuplicatePrevClass),(e=n?this.$wrapperEl.find("."+i.slideClass+'[data-swiper-slide-index="'+a+'"]'):t.eq(a)).addClass(i.slideActiveClass),i.loop&&(e.hasClass(i.slideDuplicateClass)?s.children("."+i.slideClass+":not(."+i.slideDuplicateClass+')[data-swiper-slide-index="'+r+'"]').addClass(i.slideDuplicateActiveClass):s.children("."+i.slideClass+"."+i.slideDuplicateClass+'[data-swiper-slide-index="'+r+'"]').addClass(i.slideDuplicateActiveClass));var o=e.nextAll("."+i.slideClass).eq(0).addClass(i.slideNextClass);i.loop&&0===o.length&&(o=t.eq(0)).addClass(i.slideNextClass);var l=e.prevAll("."+i.slideClass).eq(0).addClass(i.slidePrevClass);i.loop&&0===l.length&&(l=t.eq(-1)).addClass(i.slidePrevClass),i.loop&&(o.hasClass(i.slideDuplicateClass)?s.children("."+i.slideClass+":not(."+i.slideDuplicateClass+')[data-swiper-slide-index="'+o.attr("data-swiper-slide-index")+'"]').addClass(i.slideDuplicateNextClass):s.children("."+i.slideClass+"."+i.slideDuplicateClass+'[data-swiper-slide-index="'+o.attr("data-swiper-slide-index")+'"]').addClass(i.slideDuplicateNextClass),l.hasClass(i.slideDuplicateClass)?s.children("."+i.slideClass+":not(."+i.slideDuplicateClass+')[data-swiper-slide-index="'+l.attr("data-swiper-slide-index")+'"]').addClass(i.slideDuplicatePrevClass):s.children("."+i.slideClass+"."+i.slideDuplicateClass+'[data-swiper-slide-index="'+l.attr("data-swiper-slide-index")+'"]').addClass(i.slideDuplicatePrevClass))},updateActiveIndex:function(e){var t,i=this.rtlTranslate?this.translate:-this.translate,s=this.slidesGrid,a=this.snapGrid,r=this.params,o=this.activeIndex,l=this.realIndex,d=this.snapIndex,h=e;if(void 0===h){for(var p=0;p<s.length;p+=1)void 0!==s[p+1]?i>=s[p]&&i<s[p+1]-(s[p+1]-s[p])/2?h=p:i>=s[p]&&i<s[p+1]&&(h=p+1):i>=s[p]&&(h=p);r.normalizeSlideIndex&&(h<0||void 0===h)&&(h=0)}if(a.indexOf(i)>=0)t=a.indexOf(i);else{var c=Math.min(r.slidesPerGroupSkip,h);t=c+Math.floor((h-c)/r.slidesPerGroup)}if(t>=a.length&&(t=a.length-1),h!==o){var u=parseInt(this.slides.eq(h).attr("data-swiper-slide-index")||h,10);n.extend(this,{snapIndex:t,realIndex:u,previousIndex:o,activeIndex:h}),this.emit("activeIndexChange"),this.emit("snapIndexChange"),l!==u&&this.emit("realIndexChange"),(this.initialized||this.runCallbacksOnInit)&&this.emit("slideChange")}else t!==d&&(this.snapIndex=t,this.emit("snapIndexChange"))},updateClickedSlide:function(e){var t=this.params,i=s(e.target).closest("."+t.slideClass)[0],a=!1;if(i)for(var r=0;r<this.slides.length;r+=1)this.slides[r]===i&&(a=!0);if(!i||!a)return this.clickedSlide=void 0,void(this.clickedIndex=void 0);this.clickedSlide=i,this.virtual&&this.params.virtual.enabled?this.clickedIndex=parseInt(s(i).attr("data-swiper-slide-index"),10):this.clickedIndex=s(i).index(),t.slideToClickedSlide&&void 0!==this.clickedIndex&&this.clickedIndex!==this.activeIndex&&this.slideToClickedSlide()}};var p={getTranslate:function(e){void 0===e&&(e=this.isHorizontal()?"x":"y");var t=this.params,i=this.rtlTranslate,s=this.translate,a=this.$wrapperEl;if(t.virtualTranslate)return i?-s:s;if(t.cssMode)return s;var r=n.getTranslate(a[0],e);return i&&(r=-r),r||0},setTranslate:function(e,t){var i=this.rtlTranslate,s=this.params,a=this.$wrapperEl,r=this.wrapperEl,n=this.progress,o=0,l=0;this.isHorizontal()?o=i?-e:e:l=e,s.roundLengths&&(o=Math.floor(o),l=Math.floor(l)),s.cssMode?r[this.isHorizontal()?"scrollLeft":"scrollTop"]=this.isHorizontal()?-o:-l:s.virtualTranslate||a.transform("translate3d("+o+"px, "+l+"px, 0px)"),this.previousTranslate=this.translate,this.translate=this.isHorizontal()?o:l;var d=this.maxTranslate()-this.minTranslate();(0===d?0:(e-this.minTranslate())/d)!==n&&this.updateProgress(e),this.emit("setTranslate",this.translate,t)},minTranslate:function(){return-this.snapGrid[0]},maxTranslate:function(){return-this.snapGrid[this.snapGrid.length-1]},translateTo:function(e,t,i,s,a){var r;void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===i&&(i=!0),void 0===s&&(s=!0);var n=this,o=n.params,l=n.wrapperEl;if(n.animating&&o.preventInteractionOnTransition)return!1;var d,h=n.minTranslate(),p=n.maxTranslate();if(d=s&&e>h?h:s&&e<p?p:e,n.updateProgress(d),o.cssMode){var c=n.isHorizontal();return 0===t?l[c?"scrollLeft":"scrollTop"]=-d:l.scrollTo?l.scrollTo(((r={})[c?"left":"top"]=-d,r.behavior="smooth",r)):l[c?"scrollLeft":"scrollTop"]=-d,!0}return 0===t?(n.setTransition(0),n.setTranslate(d),i&&(n.emit("beforeTransitionStart",t,a),n.emit("transitionEnd"))):(n.setTransition(t),n.setTranslate(d),i&&(n.emit("beforeTransitionStart",t,a),n.emit("transitionStart")),n.animating||(n.animating=!0,n.onTranslateToWrapperTransitionEnd||(n.onTranslateToWrapperTransitionEnd=function(e){n&&!n.destroyed&&e.target===this&&(n.$wrapperEl[0].removeEventListener("transitionend",n.onTranslateToWrapperTransitionEnd),n.$wrapperEl[0].removeEventListener("webkitTransitionEnd",n.onTranslateToWrapperTransitionEnd),n.onTranslateToWrapperTransitionEnd=null,delete n.onTranslateToWrapperTransitionEnd,i&&n.emit("transitionEnd"))}),n.$wrapperEl[0].addEventListener("transitionend",n.onTranslateToWrapperTransitionEnd),n.$wrapperEl[0].addEventListener("webkitTransitionEnd",n.onTranslateToWrapperTransitionEnd))),!0}};var c={setTransition:function(e,t){this.params.cssMode||this.$wrapperEl.transition(e),this.emit("setTransition",e,t)},transitionStart:function(e,t){void 0===e&&(e=!0);var i=this.activeIndex,s=this.params,a=this.previousIndex;if(!s.cssMode){s.autoHeight&&this.updateAutoHeight();var r=t;if(r||(r=i>a?"next":i<a?"prev":"reset"),this.emit("transitionStart"),e&&i!==a){if("reset"===r)return void this.emit("slideResetTransitionStart");this.emit("slideChangeTransitionStart"),"next"===r?this.emit("slideNextTransitionStart"):this.emit("slidePrevTransitionStart")}}},transitionEnd:function(e,t){void 0===e&&(e=!0);var i=this.activeIndex,s=this.previousIndex,a=this.params;if(this.animating=!1,!a.cssMode){this.setTransition(0);var r=t;if(r||(r=i>s?"next":i<s?"prev":"reset"),this.emit("transitionEnd"),e&&i!==s){if("reset"===r)return void this.emit("slideResetTransitionEnd");this.emit("slideChangeTransitionEnd"),"next"===r?this.emit("slideNextTransitionEnd"):this.emit("slidePrevTransitionEnd")}}}};var u={slideTo:function(e,t,i,s){var a;void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===i&&(i=!0);var r=this,n=e;n<0&&(n=0);var o=r.params,l=r.snapGrid,d=r.slidesGrid,h=r.previousIndex,p=r.activeIndex,c=r.rtlTranslate,u=r.wrapperEl;if(r.animating&&o.preventInteractionOnTransition)return!1;var v=Math.min(r.params.slidesPerGroupSkip,n),f=v+Math.floor((n-v)/r.params.slidesPerGroup);f>=l.length&&(f=l.length-1),(p||o.initialSlide||0)===(h||0)&&i&&r.emit("beforeSlideChangeStart");var m,g=-l[f];if(r.updateProgress(g),o.normalizeSlideIndex)for(var b=0;b<d.length;b+=1)-Math.floor(100*g)>=Math.floor(100*d[b])&&(n=b);if(r.initialized&&n!==p){if(!r.allowSlideNext&&g<r.translate&&g<r.minTranslate())return!1;if(!r.allowSlidePrev&&g>r.translate&&g>r.maxTranslate()&&(p||0)!==n)return!1}if(m=n>p?"next":n<p?"prev":"reset",c&&-g===r.translate||!c&&g===r.translate)return r.updateActiveIndex(n),o.autoHeight&&r.updateAutoHeight(),r.updateSlidesClasses(),"slide"!==o.effect&&r.setTranslate(g),"reset"!==m&&(r.transitionStart(i,m),r.transitionEnd(i,m)),!1;if(o.cssMode){var w=r.isHorizontal();return 0===t?u[w?"scrollLeft":"scrollTop"]=-g:u.scrollTo?u.scrollTo(((a={})[w?"left":"top"]=-g,a.behavior="smooth",a)):u[w?"scrollLeft":"scrollTop"]=-g,!0}return 0===t?(r.setTransition(0),r.setTranslate(g),r.updateActiveIndex(n),r.updateSlidesClasses(),r.emit("beforeTransitionStart",t,s),r.transitionStart(i,m),r.transitionEnd(i,m)):(r.setTransition(t),r.setTranslate(g),r.updateActiveIndex(n),r.updateSlidesClasses(),r.emit("beforeTransitionStart",t,s),r.transitionStart(i,m),r.animating||(r.animating=!0,r.onSlideToWrapperTransitionEnd||(r.onSlideToWrapperTransitionEnd=function(e){r&&!r.destroyed&&e.target===this&&(r.$wrapperEl[0].removeEventListener("transitionend",r.onSlideToWrapperTransitionEnd),r.$wrapperEl[0].removeEventListener("webkitTransitionEnd",r.onSlideToWrapperTransitionEnd),r.onSlideToWrapperTransitionEnd=null,delete r.onSlideToWrapperTransitionEnd,r.transitionEnd(i,m))}),r.$wrapperEl[0].addEventListener("transitionend",r.onSlideToWrapperTransitionEnd),r.$wrapperEl[0].addEventListener("webkitTransitionEnd",r.onSlideToWrapperTransitionEnd))),!0},slideToLoop:function(e,t,i,s){void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===i&&(i=!0);var a=e;return this.params.loop&&(a+=this.loopedSlides),this.slideTo(a,t,i,s)},slideNext:function(e,t,i){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0);var s=this.params,a=this.animating,r=this.activeIndex<s.slidesPerGroupSkip?1:s.slidesPerGroup;if(s.loop){if(a)return!1;this.loopFix(),this._clientLeft=this.$wrapperEl[0].clientLeft}return this.slideTo(this.activeIndex+r,e,t,i)},slidePrev:function(e,t,i){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0);var s=this.params,a=this.animating,r=this.snapGrid,n=this.slidesGrid,o=this.rtlTranslate;if(s.loop){if(a)return!1;this.loopFix(),this._clientLeft=this.$wrapperEl[0].clientLeft}function l(e){return e<0?-Math.floor(Math.abs(e)):Math.floor(e)}var d,h=l(o?this.translate:-this.translate),p=r.map((function(e){return l(e)})),c=(n.map((function(e){return l(e)})),r[p.indexOf(h)],r[p.indexOf(h)-1]);return void 0===c&&s.cssMode&&r.forEach((function(e){!c&&h>=e&&(c=e)})),void 0!==c&&(d=n.indexOf(c))<0&&(d=this.activeIndex-1),this.slideTo(d,e,t,i)},slideReset:function(e,t,i){return void 0===e&&(e=this.params.speed),void 0===t&&(t=!0),this.slideTo(this.activeIndex,e,t,i)},slideToClosest:function(e,t,i,s){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0),void 0===s&&(s=.5);var a=this.activeIndex,r=Math.min(this.params.slidesPerGroupSkip,a),n=r+Math.floor((a-r)/this.params.slidesPerGroup),o=this.rtlTranslate?this.translate:-this.translate;if(o>=this.snapGrid[n]){var l=this.snapGrid[n];o-l>(this.snapGrid[n+1]-l)*s&&(a+=this.params.slidesPerGroup)}else{var d=this.snapGrid[n-1];o-d<=(this.snapGrid[n]-d)*s&&(a-=this.params.slidesPerGroup)}return a=Math.max(a,0),a=Math.min(a,this.slidesGrid.length-1),this.slideTo(a,e,t,i)},slideToClickedSlide:function(){var e,t=this,i=t.params,a=t.$wrapperEl,r="auto"===i.slidesPerView?t.slidesPerViewDynamic():i.slidesPerView,o=t.clickedIndex;if(i.loop){if(t.animating)return;e=parseInt(s(t.clickedSlide).attr("data-swiper-slide-index"),10),i.centeredSlides?o<t.loopedSlides-r/2||o>t.slides.length-t.loopedSlides+r/2?(t.loopFix(),o=a.children("."+i.slideClass+'[data-swiper-slide-index="'+e+'"]:not(.'+i.slideDuplicateClass+")").eq(0).index(),n.nextTick((function(){t.slideTo(o)}))):t.slideTo(o):o>t.slides.length-r?(t.loopFix(),o=a.children("."+i.slideClass+'[data-swiper-slide-index="'+e+'"]:not(.'+i.slideDuplicateClass+")").eq(0).index(),n.nextTick((function(){t.slideTo(o)}))):t.slideTo(o)}else t.slideTo(o)}};var v={loopCreate:function(){var t=this,i=t.params,a=t.$wrapperEl;a.children("."+i.slideClass+"."+i.slideDuplicateClass).remove();var r=a.children("."+i.slideClass);if(i.loopFillGroupWithBlank){var n=i.slidesPerGroup-r.length%i.slidesPerGroup;if(n!==i.slidesPerGroup){for(var o=0;o<n;o+=1){var l=s(e.createElement("div")).addClass(i.slideClass+" "+i.slideBlankClass);a.append(l)}r=a.children("."+i.slideClass)}}"auto"!==i.slidesPerView||i.loopedSlides||(i.loopedSlides=r.length),t.loopedSlides=Math.ceil(parseFloat(i.loopedSlides||i.slidesPerView,10)),t.loopedSlides+=i.loopAdditionalSlides,t.loopedSlides>r.length&&(t.loopedSlides=r.length);var d=[],h=[];r.each((function(e,i){var a=s(i);e<t.loopedSlides&&h.push(i),e<r.length&&e>=r.length-t.loopedSlides&&d.push(i),a.attr("data-swiper-slide-index",e)}));for(var p=0;p<h.length;p+=1)a.append(s(h[p].cloneNode(!0)).addClass(i.slideDuplicateClass));for(var c=d.length-1;c>=0;c-=1)a.prepend(s(d[c].cloneNode(!0)).addClass(i.slideDuplicateClass))},loopFix:function(){this.emit("beforeLoopFix");var e,t=this.activeIndex,i=this.slides,s=this.loopedSlides,a=this.allowSlidePrev,r=this.allowSlideNext,n=this.snapGrid,o=this.rtlTranslate;this.allowSlidePrev=!0,this.allowSlideNext=!0;var l=-n[t]-this.getTranslate();if(t<s)e=i.length-3*s+t,e+=s,this.slideTo(e,0,!1,!0)&&0!==l&&this.setTranslate((o?-this.translate:this.translate)-l);else if(t>=i.length-s){e=-i.length+t+s,e+=s,this.slideTo(e,0,!1,!0)&&0!==l&&this.setTranslate((o?-this.translate:this.translate)-l)}this.allowSlidePrev=a,this.allowSlideNext=r,this.emit("loopFix")},loopDestroy:function(){var e=this.$wrapperEl,t=this.params,i=this.slides;e.children("."+t.slideClass+"."+t.slideDuplicateClass+",."+t.slideClass+"."+t.slideBlankClass).remove(),i.removeAttr("data-swiper-slide-index")}};var f={setGrabCursor:function(e){if(!(o.touch||!this.params.simulateTouch||this.params.watchOverflow&&this.isLocked||this.params.cssMode)){var t=this.el;t.style.cursor="move",t.style.cursor=e?"-webkit-grabbing":"-webkit-grab",t.style.cursor=e?"-moz-grabbin":"-moz-grab",t.style.cursor=e?"grabbing":"grab"}},unsetGrabCursor:function(){o.touch||this.params.watchOverflow&&this.isLocked||this.params.cssMode||(this.el.style.cursor="")}};var m,g,b,w,y,x,T,E,S,C,M,P,z,k,$,L={appendSlide:function(e){var t=this.$wrapperEl,i=this.params;if(i.loop&&this.loopDestroy(),"object"==typeof e&&"length"in e)for(var s=0;s<e.length;s+=1)e[s]&&t.append(e[s]);else t.append(e);i.loop&&this.loopCreate(),i.observer&&o.observer||this.update()},prependSlide:function(e){var t=this.params,i=this.$wrapperEl,s=this.activeIndex;t.loop&&this.loopDestroy();var a=s+1;if("object"==typeof e&&"length"in e){for(var r=0;r<e.length;r+=1)e[r]&&i.prepend(e[r]);a=s+e.length}else i.prepend(e);t.loop&&this.loopCreate(),t.observer&&o.observer||this.update(),this.slideTo(a,0,!1)},addSlide:function(e,t){var i=this.$wrapperEl,s=this.params,a=this.activeIndex;s.loop&&(a-=this.loopedSlides,this.loopDestroy(),this.slides=i.children("."+s.slideClass));var r=this.slides.length;if(e<=0)this.prependSlide(t);else if(e>=r)this.appendSlide(t);else{for(var n=a>e?a+1:a,l=[],d=r-1;d>=e;d-=1){var h=this.slides.eq(d);h.remove(),l.unshift(h)}if("object"==typeof t&&"length"in t){for(var p=0;p<t.length;p+=1)t[p]&&i.append(t[p]);n=a>e?a+t.length:a}else i.append(t);for(var c=0;c<l.length;c+=1)i.append(l[c]);s.loop&&this.loopCreate(),s.observer&&o.observer||this.update(),s.loop?this.slideTo(n+this.loopedSlides,0,!1):this.slideTo(n,0,!1)}},removeSlide:function(e){var t=this.params,i=this.$wrapperEl,s=this.activeIndex;t.loop&&(s-=this.loopedSlides,this.loopDestroy(),this.slides=i.children("."+t.slideClass));var a,r=s;if("object"==typeof e&&"length"in e){for(var n=0;n<e.length;n+=1)a=e[n],this.slides[a]&&this.slides.eq(a).remove(),a<r&&(r-=1);r=Math.max(r,0)}else a=e,this.slides[a]&&this.slides.eq(a).remove(),a<r&&(r-=1),r=Math.max(r,0);t.loop&&this.loopCreate(),t.observer&&o.observer||this.update(),t.loop?this.slideTo(r+this.loopedSlides,0,!1):this.slideTo(r,0,!1)},removeAllSlides:function(){for(var e=[],t=0;t<this.slides.length;t+=1)e.push(t);this.removeSlide(e)}},I=(m=t.navigator.platform,g=t.navigator.userAgent,b={ios:!1,android:!1,androidChrome:!1,desktop:!1,iphone:!1,ipod:!1,ipad:!1,edge:!1,ie:!1,firefox:!1,macos:!1,windows:!1,cordova:!(!t.cordova&&!t.phonegap),phonegap:!(!t.cordova&&!t.phonegap),electron:!1},w=t.screen.width,y=t.screen.height,x=g.match(/(Android);?[\s\/]+([\d.]+)?/),T=g.match(/(iPad).*OS\s([\d_]+)/),E=g.match(/(iPod)(.*OS\s([\d_]+))?/),S=!T&&g.match(/(iPhone\sOS|iOS)\s([\d_]+)/),C=g.indexOf("MSIE ")>=0||g.indexOf("Trident/")>=0,M=g.indexOf("Edge/")>=0,P=g.indexOf("Gecko/")>=0&&g.indexOf("Firefox/")>=0,z="Win32"===m,k=g.toLowerCase().indexOf("electron")>=0,$="MacIntel"===m,!T&&$&&o.touch&&(1024===w&&1366===y||834===w&&1194===y||834===w&&1112===y||768===w&&1024===y)&&(T=g.match(/(Version)\/([\d.]+)/),$=!1),b.ie=C,b.edge=M,b.firefox=P,x&&!z&&(b.os="android",b.osVersion=x[2],b.android=!0,b.androidChrome=g.toLowerCase().indexOf("chrome")>=0),(T||S||E)&&(b.os="ios",b.ios=!0),S&&!E&&(b.osVersion=S[2].replace(/_/g,"."),b.iphone=!0),T&&(b.osVersion=T[2].replace(/_/g,"."),b.ipad=!0),E&&(b.osVersion=E[3]?E[3].replace(/_/g,"."):null,b.ipod=!0),b.ios&&b.osVersion&&g.indexOf("Version/")>=0&&"10"===b.osVersion.split(".")[0]&&(b.osVersion=g.toLowerCase().split("version/")[1].split(" ")[0]),b.webView=!(!(S||T||E)||!g.match(/.*AppleWebKit(?!.*Safari)/i)&&!t.navigator.standalone)||t.matchMedia&&t.matchMedia("(display-mode: standalone)").matches,b.webview=b.webView,b.standalone=b.webView,b.desktop=!(b.ios||b.android)||k,b.desktop&&(b.electron=k,b.macos=$,b.windows=z,b.macos&&(b.os="macos"),b.windows&&(b.os="windows")),b.pixelRatio=t.devicePixelRatio||1,b);function D(i){var a=this.touchEventsData,r=this.params,o=this.touches;if(!this.animating||!r.preventInteractionOnTransition){var l=i;l.originalEvent&&(l=l.originalEvent);var d=s(l.target);if(("wrapper"!==r.touchEventsTarget||d.closest(this.wrapperEl).length)&&(a.isTouchEvent="touchstart"===l.type,(a.isTouchEvent||!("which"in l)||3!==l.which)&&!(!a.isTouchEvent&&"button"in l&&l.button>0||a.isTouched&&a.isMoved)))if(r.noSwiping&&d.closest(r.noSwipingSelector?r.noSwipingSelector:"."+r.noSwipingClass)[0])this.allowClick=!0;else if(!r.swipeHandler||d.closest(r.swipeHandler)[0]){o.currentX="touchstart"===l.type?l.targetTouches[0].pageX:l.pageX,o.currentY="touchstart"===l.type?l.targetTouches[0].pageY:l.pageY;var h=o.currentX,p=o.currentY,c=r.edgeSwipeDetection||r.iOSEdgeSwipeDetection,u=r.edgeSwipeThreshold||r.iOSEdgeSwipeThreshold;if(!c||!(h<=u||h>=t.screen.width-u)){if(n.extend(a,{isTouched:!0,isMoved:!1,allowTouchCallbacks:!0,isScrolling:void 0,startMoving:void 0}),o.startX=h,o.startY=p,a.touchStartTime=n.now(),this.allowClick=!0,this.updateSize(),this.swipeDirection=void 0,r.threshold>0&&(a.allowThresholdMove=!1),"touchstart"!==l.type){var v=!0;d.is(a.formElements)&&(v=!1),e.activeElement&&s(e.activeElement).is(a.formElements)&&e.activeElement!==d[0]&&e.activeElement.blur();var f=v&&this.allowTouchMove&&r.touchStartPreventDefault;(r.touchStartForcePreventDefault||f)&&l.preventDefault()}this.emit("touchStart",l)}}}}function O(t){var i=this.touchEventsData,a=this.params,r=this.touches,o=this.rtlTranslate,l=t;if(l.originalEvent&&(l=l.originalEvent),i.isTouched){if(!i.isTouchEvent||"mousemove"!==l.type){var d="touchmove"===l.type&&l.targetTouches&&(l.targetTouches[0]||l.changedTouches[0]),h="touchmove"===l.type?d.pageX:l.pageX,p="touchmove"===l.type?d.pageY:l.pageY;if(l.preventedByNestedSwiper)return r.startX=h,void(r.startY=p);if(!this.allowTouchMove)return this.allowClick=!1,void(i.isTouched&&(n.extend(r,{startX:h,startY:p,currentX:h,currentY:p}),i.touchStartTime=n.now()));if(i.isTouchEvent&&a.touchReleaseOnEdges&&!a.loop)if(this.isVertical()){if(p<r.startY&&this.translate<=this.maxTranslate()||p>r.startY&&this.translate>=this.minTranslate())return i.isTouched=!1,void(i.isMoved=!1)}else if(h<r.startX&&this.translate<=this.maxTranslate()||h>r.startX&&this.translate>=this.minTranslate())return;if(i.isTouchEvent&&e.activeElement&&l.target===e.activeElement&&s(l.target).is(i.formElements))return i.isMoved=!0,void(this.allowClick=!1);if(i.allowTouchCallbacks&&this.emit("touchMove",l),!(l.targetTouches&&l.targetTouches.length>1)){r.currentX=h,r.currentY=p;var c=r.currentX-r.startX,u=r.currentY-r.startY;if(!(this.params.threshold&&Math.sqrt(Math.pow(c,2)+Math.pow(u,2))<this.params.threshold)){var v;if(void 0===i.isScrolling)this.isHorizontal()&&r.currentY===r.startY||this.isVertical()&&r.currentX===r.startX?i.isScrolling=!1:c*c+u*u>=25&&(v=180*Math.atan2(Math.abs(u),Math.abs(c))/Math.PI,i.isScrolling=this.isHorizontal()?v>a.touchAngle:90-v>a.touchAngle);if(i.isScrolling&&this.emit("touchMoveOpposite",l),void 0===i.startMoving&&(r.currentX===r.startX&&r.currentY===r.startY||(i.startMoving=!0)),i.isScrolling)i.isTouched=!1;else if(i.startMoving){this.allowClick=!1,a.cssMode||l.preventDefault(),a.touchMoveStopPropagation&&!a.nested&&l.stopPropagation(),i.isMoved||(a.loop&&this.loopFix(),i.startTranslate=this.getTranslate(),this.setTransition(0),this.animating&&this.$wrapperEl.trigger("webkitTransitionEnd transitionend"),i.allowMomentumBounce=!1,!a.grabCursor||!0!==this.allowSlideNext&&!0!==this.allowSlidePrev||this.setGrabCursor(!0),this.emit("sliderFirstMove",l)),this.emit("sliderMove",l),i.isMoved=!0;var f=this.isHorizontal()?c:u;r.diff=f,f*=a.touchRatio,o&&(f=-f),this.swipeDirection=f>0?"prev":"next",i.currentTranslate=f+i.startTranslate;var m=!0,g=a.resistanceRatio;if(a.touchReleaseOnEdges&&(g=0),f>0&&i.currentTranslate>this.minTranslate()?(m=!1,a.resistance&&(i.currentTranslate=this.minTranslate()-1+Math.pow(-this.minTranslate()+i.startTranslate+f,g))):f<0&&i.currentTranslate<this.maxTranslate()&&(m=!1,a.resistance&&(i.currentTranslate=this.maxTranslate()+1-Math.pow(this.maxTranslate()-i.startTranslate-f,g))),m&&(l.preventedByNestedSwiper=!0),!this.allowSlideNext&&"next"===this.swipeDirection&&i.currentTranslate<i.startTranslate&&(i.currentTranslate=i.startTranslate),!this.allowSlidePrev&&"prev"===this.swipeDirection&&i.currentTranslate>i.startTranslate&&(i.currentTranslate=i.startTranslate),a.threshold>0){if(!(Math.abs(f)>a.threshold||i.allowThresholdMove))return void(i.currentTranslate=i.startTranslate);if(!i.allowThresholdMove)return i.allowThresholdMove=!0,r.startX=r.currentX,r.startY=r.currentY,i.currentTranslate=i.startTranslate,void(r.diff=this.isHorizontal()?r.currentX-r.startX:r.currentY-r.startY)}a.followFinger&&!a.cssMode&&((a.freeMode||a.watchSlidesProgress||a.watchSlidesVisibility)&&(this.updateActiveIndex(),this.updateSlidesClasses()),a.freeMode&&(0===i.velocities.length&&i.velocities.push({position:r[this.isHorizontal()?"startX":"startY"],time:i.touchStartTime}),i.velocities.push({position:r[this.isHorizontal()?"currentX":"currentY"],time:n.now()})),this.updateProgress(i.currentTranslate),this.setTranslate(i.currentTranslate))}}}}}else i.startMoving&&i.isScrolling&&this.emit("touchMoveOpposite",l)}function A(e){var t=this,i=t.touchEventsData,s=t.params,a=t.touches,r=t.rtlTranslate,o=t.$wrapperEl,l=t.slidesGrid,d=t.snapGrid,h=e;if(h.originalEvent&&(h=h.originalEvent),i.allowTouchCallbacks&&t.emit("touchEnd",h),i.allowTouchCallbacks=!1,!i.isTouched)return i.isMoved&&s.grabCursor&&t.setGrabCursor(!1),i.isMoved=!1,void(i.startMoving=!1);s.grabCursor&&i.isMoved&&i.isTouched&&(!0===t.allowSlideNext||!0===t.allowSlidePrev)&&t.setGrabCursor(!1);var p,c=n.now(),u=c-i.touchStartTime;if(t.allowClick&&(t.updateClickedSlide(h),t.emit("tap click",h),u<300&&c-i.lastClickTime<300&&t.emit("doubleTap doubleClick",h)),i.lastClickTime=n.now(),n.nextTick((function(){t.destroyed||(t.allowClick=!0)})),!i.isTouched||!i.isMoved||!t.swipeDirection||0===a.diff||i.currentTranslate===i.startTranslate)return i.isTouched=!1,i.isMoved=!1,void(i.startMoving=!1);if(i.isTouched=!1,i.isMoved=!1,i.startMoving=!1,p=s.followFinger?r?t.translate:-t.translate:-i.currentTranslate,!s.cssMode)if(s.freeMode){if(p<-t.minTranslate())return void t.slideTo(t.activeIndex);if(p>-t.maxTranslate())return void(t.slides.length<d.length?t.slideTo(d.length-1):t.slideTo(t.slides.length-1));if(s.freeModeMomentum){if(i.velocities.length>1){var v=i.velocities.pop(),f=i.velocities.pop(),m=v.position-f.position,g=v.time-f.time;t.velocity=m/g,t.velocity/=2,Math.abs(t.velocity)<s.freeModeMinimumVelocity&&(t.velocity=0),(g>150||n.now()-v.time>300)&&(t.velocity=0)}else t.velocity=0;t.velocity*=s.freeModeMomentumVelocityRatio,i.velocities.length=0;var b=1e3*s.freeModeMomentumRatio,w=t.velocity*b,y=t.translate+w;r&&(y=-y);var x,T,E=!1,S=20*Math.abs(t.velocity)*s.freeModeMomentumBounceRatio;if(y<t.maxTranslate())s.freeModeMomentumBounce?(y+t.maxTranslate()<-S&&(y=t.maxTranslate()-S),x=t.maxTranslate(),E=!0,i.allowMomentumBounce=!0):y=t.maxTranslate(),s.loop&&s.centeredSlides&&(T=!0);else if(y>t.minTranslate())s.freeModeMomentumBounce?(y-t.minTranslate()>S&&(y=t.minTranslate()+S),x=t.minTranslate(),E=!0,i.allowMomentumBounce=!0):y=t.minTranslate(),s.loop&&s.centeredSlides&&(T=!0);else if(s.freeModeSticky){for(var C,M=0;M<d.length;M+=1)if(d[M]>-y){C=M;break}y=-(y=Math.abs(d[C]-y)<Math.abs(d[C-1]-y)||"next"===t.swipeDirection?d[C]:d[C-1])}if(T&&t.once("transitionEnd",(function(){t.loopFix()})),0!==t.velocity){if(b=r?Math.abs((-y-t.translate)/t.velocity):Math.abs((y-t.translate)/t.velocity),s.freeModeSticky){var P=Math.abs((r?-y:y)-t.translate),z=t.slidesSizesGrid[t.activeIndex];b=P<z?s.speed:P<2*z?1.5*s.speed:2.5*s.speed}}else if(s.freeModeSticky)return void t.slideToClosest();s.freeModeMomentumBounce&&E?(t.updateProgress(x),t.setTransition(b),t.setTranslate(y),t.transitionStart(!0,t.swipeDirection),t.animating=!0,o.transitionEnd((function(){t&&!t.destroyed&&i.allowMomentumBounce&&(t.emit("momentumBounce"),t.setTransition(s.speed),t.setTranslate(x),o.transitionEnd((function(){t&&!t.destroyed&&t.transitionEnd()})))}))):t.velocity?(t.updateProgress(y),t.setTransition(b),t.setTranslate(y),t.transitionStart(!0,t.swipeDirection),t.animating||(t.animating=!0,o.transitionEnd((function(){t&&!t.destroyed&&t.transitionEnd()})))):t.updateProgress(y),t.updateActiveIndex(),t.updateSlidesClasses()}else if(s.freeModeSticky)return void t.slideToClosest();(!s.freeModeMomentum||u>=s.longSwipesMs)&&(t.updateProgress(),t.updateActiveIndex(),t.updateSlidesClasses())}else{for(var k=0,$=t.slidesSizesGrid[0],L=0;L<l.length;L+=L<s.slidesPerGroupSkip?1:s.slidesPerGroup){var I=L<s.slidesPerGroupSkip-1?1:s.slidesPerGroup;void 0!==l[L+I]?p>=l[L]&&p<l[L+I]&&(k=L,$=l[L+I]-l[L]):p>=l[L]&&(k=L,$=l[l.length-1]-l[l.length-2])}var D=(p-l[k])/$,O=k<s.slidesPerGroupSkip-1?1:s.slidesPerGroup;if(u>s.longSwipesMs){if(!s.longSwipes)return void t.slideTo(t.activeIndex);"next"===t.swipeDirection&&(D>=s.longSwipesRatio?t.slideTo(k+O):t.slideTo(k)),"prev"===t.swipeDirection&&(D>1-s.longSwipesRatio?t.slideTo(k+O):t.slideTo(k))}else{if(!s.shortSwipes)return void t.slideTo(t.activeIndex);t.navigation&&(h.target===t.navigation.nextEl||h.target===t.navigation.prevEl)?h.target===t.navigation.nextEl?t.slideTo(k+O):t.slideTo(k):("next"===t.swipeDirection&&t.slideTo(k+O),"prev"===t.swipeDirection&&t.slideTo(k))}}}function G(){var e=this.params,t=this.el;if(!t||0!==t.offsetWidth){e.breakpoints&&this.setBreakpoint();var i=this.allowSlideNext,s=this.allowSlidePrev,a=this.snapGrid;this.allowSlideNext=!0,this.allowSlidePrev=!0,this.updateSize(),this.updateSlides(),this.updateSlidesClasses(),("auto"===e.slidesPerView||e.slidesPerView>1)&&this.isEnd&&!this.params.centeredSlides?this.slideTo(this.slides.length-1,0,!1,!0):this.slideTo(this.activeIndex,0,!1,!0),this.autoplay&&this.autoplay.running&&this.autoplay.paused&&this.autoplay.run(),this.allowSlidePrev=s,this.allowSlideNext=i,this.params.watchOverflow&&a!==this.snapGrid&&this.checkOverflow()}}function B(e){this.allowClick||(this.params.preventClicks&&e.preventDefault(),this.params.preventClicksPropagation&&this.animating&&(e.stopPropagation(),e.stopImmediatePropagation()))}function H(){var e=this.wrapperEl;this.previousTranslate=this.translate,this.translate=this.isHorizontal()?-e.scrollLeft:-e.scrollTop,-0===this.translate&&(this.translate=0),this.updateActiveIndex(),this.updateSlidesClasses();var t=this.maxTranslate()-this.minTranslate();(0===t?0:(this.translate-this.minTranslate())/t)!==this.progress&&this.updateProgress(this.translate),this.emit("setTranslate",this.translate,!1)}var N=!1;function X(){}var V={init:!0,direction:"horizontal",touchEventsTarget:"container",initialSlide:0,speed:300,cssMode:!1,updateOnWindowResize:!0,preventInteractionOnTransition:!1,edgeSwipeDetection:!1,edgeSwipeThreshold:20,freeMode:!1,freeModeMomentum:!0,freeModeMomentumRatio:1,freeModeMomentumBounce:!0,freeModeMomentumBounceRatio:1,freeModeMomentumVelocityRatio:1,freeModeSticky:!1,freeModeMinimumVelocity:.02,autoHeight:!1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",breakpoints:void 0,spaceBetween:0,slidesPerView:1,slidesPerColumn:1,slidesPerColumnFill:"column",slidesPerGroup:1,slidesPerGroupSkip:0,centeredSlides:!1,centeredSlidesBounds:!1,slidesOffsetBefore:0,slidesOffsetAfter:0,normalizeSlideIndex:!0,centerInsufficientSlides:!1,watchOverflow:!1,roundLengths:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,allowTouchMove:!0,threshold:0,touchMoveStopPropagation:!1,touchStartPreventDefault:!0,touchStartForcePreventDefault:!1,touchReleaseOnEdges:!1,uniqueNavElements:!0,resistance:!0,resistanceRatio:.85,watchSlidesProgress:!1,watchSlidesVisibility:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,preloadImages:!0,updateOnImagesReady:!0,loop:!1,loopAdditionalSlides:0,loopedSlides:null,loopFillGroupWithBlank:!1,allowSlidePrev:!0,allowSlideNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",noSwipingSelector:null,passiveListeners:!0,containerModifierClass:"swiper-container-",slideClass:"swiper-slide",slideBlankClass:"swiper-slide-invisible-blank",slideActiveClass:"swiper-slide-active",slideDuplicateActiveClass:"swiper-slide-duplicate-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",slideNextClass:"swiper-slide-next",slideDuplicateNextClass:"swiper-slide-duplicate-next",slidePrevClass:"swiper-slide-prev",slideDuplicatePrevClass:"swiper-slide-duplicate-prev",wrapperClass:"swiper-wrapper",runCallbacksOnInit:!0},Y={update:h,translate:p,transition:c,slide:u,loop:v,grabCursor:f,manipulation:L,events:{attachEvents:function(){var t=this.params,i=this.touchEvents,s=this.el,a=this.wrapperEl;this.onTouchStart=D.bind(this),this.onTouchMove=O.bind(this),this.onTouchEnd=A.bind(this),t.cssMode&&(this.onScroll=H.bind(this)),this.onClick=B.bind(this);var r=!!t.nested;if(!o.touch&&o.pointerEvents)s.addEventListener(i.start,this.onTouchStart,!1),e.addEventListener(i.move,this.onTouchMove,r),e.addEventListener(i.end,this.onTouchEnd,!1);else{if(o.touch){var n=!("touchstart"!==i.start||!o.passiveListener||!t.passiveListeners)&&{passive:!0,capture:!1};s.addEventListener(i.start,this.onTouchStart,n),s.addEventListener(i.move,this.onTouchMove,o.passiveListener?{passive:!1,capture:r}:r),s.addEventListener(i.end,this.onTouchEnd,n),i.cancel&&s.addEventListener(i.cancel,this.onTouchEnd,n),N||(e.addEventListener("touchstart",X),N=!0)}(t.simulateTouch&&!I.ios&&!I.android||t.simulateTouch&&!o.touch&&I.ios)&&(s.addEventListener("mousedown",this.onTouchStart,!1),e.addEventListener("mousemove",this.onTouchMove,r),e.addEventListener("mouseup",this.onTouchEnd,!1))}(t.preventClicks||t.preventClicksPropagation)&&s.addEventListener("click",this.onClick,!0),t.cssMode&&a.addEventListener("scroll",this.onScroll),t.updateOnWindowResize?this.on(I.ios||I.android?"resize orientationchange observerUpdate":"resize observerUpdate",G,!0):this.on("observerUpdate",G,!0)},detachEvents:function(){var t=this.params,i=this.touchEvents,s=this.el,a=this.wrapperEl,r=!!t.nested;if(!o.touch&&o.pointerEvents)s.removeEventListener(i.start,this.onTouchStart,!1),e.removeEventListener(i.move,this.onTouchMove,r),e.removeEventListener(i.end,this.onTouchEnd,!1);else{if(o.touch){var n=!("onTouchStart"!==i.start||!o.passiveListener||!t.passiveListeners)&&{passive:!0,capture:!1};s.removeEventListener(i.start,this.onTouchStart,n),s.removeEventListener(i.move,this.onTouchMove,r),s.removeEventListener(i.end,this.onTouchEnd,n),i.cancel&&s.removeEventListener(i.cancel,this.onTouchEnd,n)}(t.simulateTouch&&!I.ios&&!I.android||t.simulateTouch&&!o.touch&&I.ios)&&(s.removeEventListener("mousedown",this.onTouchStart,!1),e.removeEventListener("mousemove",this.onTouchMove,r),e.removeEventListener("mouseup",this.onTouchEnd,!1))}(t.preventClicks||t.preventClicksPropagation)&&s.removeEventListener("click",this.onClick,!0),t.cssMode&&a.removeEventListener("scroll",this.onScroll),this.off(I.ios||I.android?"resize orientationchange observerUpdate":"resize observerUpdate",G)}},breakpoints:{setBreakpoint:function(){var e=this.activeIndex,t=this.initialized,i=this.loopedSlides;void 0===i&&(i=0);var s=this.params,a=this.$el,r=s.breakpoints;if(r&&(!r||0!==Object.keys(r).length)){var o=this.getBreakpoint(r);if(o&&this.currentBreakpoint!==o){var l=o in r?r[o]:void 0;l&&["slidesPerView","spaceBetween","slidesPerGroup","slidesPerGroupSkip","slidesPerColumn"].forEach((function(e){var t=l[e];void 0!==t&&(l[e]="slidesPerView"!==e||"AUTO"!==t&&"auto"!==t?"slidesPerView"===e?parseFloat(t):parseInt(t,10):"auto")}));var d=l||this.originalParams,h=s.slidesPerColumn>1,p=d.slidesPerColumn>1;h&&!p?a.removeClass(s.containerModifierClass+"multirow "+s.containerModifierClass+"multirow-column"):!h&&p&&(a.addClass(s.containerModifierClass+"multirow"),"column"===d.slidesPerColumnFill&&a.addClass(s.containerModifierClass+"multirow-column"));var c=d.direction&&d.direction!==s.direction,u=s.loop&&(d.slidesPerView!==s.slidesPerView||c);c&&t&&this.changeDirection(),n.extend(this.params,d),n.extend(this,{allowTouchMove:this.params.allowTouchMove,allowSlideNext:this.params.allowSlideNext,allowSlidePrev:this.params.allowSlidePrev}),this.currentBreakpoint=o,u&&t&&(this.loopDestroy(),this.loopCreate(),this.updateSlides(),this.slideTo(e-i+this.loopedSlides,0,!1)),this.emit("breakpoint",d)}}},getBreakpoint:function(e){if(e){var i=!1,s=Object.keys(e).map((function(e){if("string"==typeof e&&e.startsWith("@")){var i=parseFloat(e.substr(1));return{value:t.innerHeight*i,point:e}}return{value:e,point:e}}));s.sort((function(e,t){return parseInt(e.value,10)-parseInt(t.value,10)}));for(var a=0;a<s.length;a+=1){var r=s[a],n=r.point;r.value<=t.innerWidth&&(i=n)}return i||"max"}}},checkOverflow:{checkOverflow:function(){var e=this.params,t=this.isLocked,i=this.slides.length>0&&e.slidesOffsetBefore+e.spaceBetween*(this.slides.length-1)+this.slides[0].offsetWidth*this.slides.length;e.slidesOffsetBefore&&e.slidesOffsetAfter&&i?this.isLocked=i<=this.size:this.isLocked=1===this.snapGrid.length,this.allowSlideNext=!this.isLocked,this.allowSlidePrev=!this.isLocked,t!==this.isLocked&&this.emit(this.isLocked?"lock":"unlock"),t&&t!==this.isLocked&&(this.isEnd=!1,this.navigation.update())}},classes:{addClasses:function(){var e=this.classNames,t=this.params,i=this.rtl,s=this.$el,a=[];a.push("initialized"),a.push(t.direction),t.freeMode&&a.push("free-mode"),t.autoHeight&&a.push("autoheight"),i&&a.push("rtl"),t.slidesPerColumn>1&&(a.push("multirow"),"column"===t.slidesPerColumnFill&&a.push("multirow-column")),I.android&&a.push("android"),I.ios&&a.push("ios"),t.cssMode&&a.push("css-mode"),a.forEach((function(i){e.push(t.containerModifierClass+i)})),s.addClass(e.join(" "))},removeClasses:function(){var e=this.$el,t=this.classNames;e.removeClass(t.join(" "))}},images:{loadImage:function(e,i,s,a,r,n){var o;function l(){n&&n()}e.complete&&r?l():i?((o=new t.Image).onload=l,o.onerror=l,a&&(o.sizes=a),s&&(o.srcset=s),i&&(o.src=i)):l()},preloadImages:function(){var e=this;function t(){null!=e&&e&&!e.destroyed&&(void 0!==e.imagesLoaded&&(e.imagesLoaded+=1),e.imagesLoaded===e.imagesToLoad.length&&(e.params.updateOnImagesReady&&e.update(),e.emit("imagesReady")))}e.imagesToLoad=e.$el.find("img");for(var i=0;i<e.imagesToLoad.length;i+=1){var s=e.imagesToLoad[i];e.loadImage(s,s.currentSrc||s.getAttribute("src"),s.srcset||s.getAttribute("srcset"),s.sizes||s.getAttribute("sizes"),!0,t)}}}},F={},W=function(e){function t(){for(var i,a,r,l=[],d=arguments.length;d--;)l[d]=arguments[d];1===l.length&&l[0].constructor&&l[0].constructor===Object?r=l[0]:(a=(i=l)[0],r=i[1]),r||(r={}),r=n.extend({},r),a&&!r.el&&(r.el=a),e.call(this,r),Object.keys(Y).forEach((function(e){Object.keys(Y[e]).forEach((function(i){t.prototype[i]||(t.prototype[i]=Y[e][i])}))}));var h=this;void 0===h.modules&&(h.modules={}),Object.keys(h.modules).forEach((function(e){var t=h.modules[e];if(t.params){var i=Object.keys(t.params)[0],s=t.params[i];if("object"!=typeof s||null===s)return;if(!(i in r&&"enabled"in s))return;!0===r[i]&&(r[i]={enabled:!0}),"object"!=typeof r[i]||"enabled"in r[i]||(r[i].enabled=!0),r[i]||(r[i]={enabled:!1})}}));var p=n.extend({},V);h.useModulesParams(p),h.params=n.extend({},p,F,r),h.originalParams=n.extend({},h.params),h.passedParams=n.extend({},r),h.$=s;var c=s(h.params.el);if(a=c[0]){if(c.length>1){var u=[];return c.each((function(e,i){var s=n.extend({},r,{el:i});u.push(new t(s))})),u}var v,f,m;return a.swiper=h,c.data("swiper",h),a&&a.shadowRoot&&a.shadowRoot.querySelector?(v=s(a.shadowRoot.querySelector("."+h.params.wrapperClass))).children=function(e){return c.children(e)}:v=c.children("."+h.params.wrapperClass),n.extend(h,{$el:c,el:a,$wrapperEl:v,wrapperEl:v[0],classNames:[],slides:s(),slidesGrid:[],snapGrid:[],slidesSizesGrid:[],isHorizontal:function(){return"horizontal"===h.params.direction},isVertical:function(){return"vertical"===h.params.direction},rtl:"rtl"===a.dir.toLowerCase()||"rtl"===c.css("direction"),rtlTranslate:"horizontal"===h.params.direction&&("rtl"===a.dir.toLowerCase()||"rtl"===c.css("direction")),wrongRTL:"-webkit-box"===v.css("display"),activeIndex:0,realIndex:0,isBeginning:!0,isEnd:!1,translate:0,previousTranslate:0,progress:0,velocity:0,animating:!1,allowSlideNext:h.params.allowSlideNext,allowSlidePrev:h.params.allowSlidePrev,touchEvents:(f=["touchstart","touchmove","touchend","touchcancel"],m=["mousedown","mousemove","mouseup"],o.pointerEvents&&(m=["pointerdown","pointermove","pointerup"]),h.touchEventsTouch={start:f[0],move:f[1],end:f[2],cancel:f[3]},h.touchEventsDesktop={start:m[0],move:m[1],end:m[2]},o.touch||!h.params.simulateTouch?h.touchEventsTouch:h.touchEventsDesktop),touchEventsData:{isTouched:void 0,isMoved:void 0,allowTouchCallbacks:void 0,touchStartTime:void 0,isScrolling:void 0,currentTranslate:void 0,startTranslate:void 0,allowThresholdMove:void 0,formElements:"input, select, option, textarea, button, video, label",lastClickTime:n.now(),clickTimeout:void 0,velocities:[],allowMomentumBounce:void 0,isTouchEvent:void 0,startMoving:void 0},allowClick:!0,allowTouchMove:h.params.allowTouchMove,touches:{startX:0,startY:0,currentX:0,currentY:0,diff:0},imagesToLoad:[],imagesLoaded:0}),h.useModules(),h.params.init&&h.init(),h}}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var i={extendedDefaults:{configurable:!0},defaults:{configurable:!0},Class:{configurable:!0},$:{configurable:!0}};return t.prototype.slidesPerViewDynamic=function(){var e=this.params,t=this.slides,i=this.slidesGrid,s=this.size,a=this.activeIndex,r=1;if(e.centeredSlides){for(var n,o=t[a].swiperSlideSize,l=a+1;l<t.length;l+=1)t[l]&&!n&&(r+=1,(o+=t[l].swiperSlideSize)>s&&(n=!0));for(var d=a-1;d>=0;d-=1)t[d]&&!n&&(r+=1,(o+=t[d].swiperSlideSize)>s&&(n=!0))}else for(var h=a+1;h<t.length;h+=1)i[h]-i[a]<s&&(r+=1);return r},t.prototype.update=function(){var e=this;if(e&&!e.destroyed){var t=e.snapGrid,i=e.params;i.breakpoints&&e.setBreakpoint(),e.updateSize(),e.updateSlides(),e.updateProgress(),e.updateSlidesClasses(),e.params.freeMode?(s(),e.params.autoHeight&&e.updateAutoHeight()):(("auto"===e.params.slidesPerView||e.params.slidesPerView>1)&&e.isEnd&&!e.params.centeredSlides?e.slideTo(e.slides.length-1,0,!1,!0):e.slideTo(e.activeIndex,0,!1,!0))||s(),i.watchOverflow&&t!==e.snapGrid&&e.checkOverflow(),e.emit("update")}function s(){var t=e.rtlTranslate?-1*e.translate:e.translate,i=Math.min(Math.max(t,e.maxTranslate()),e.minTranslate());e.setTranslate(i),e.updateActiveIndex(),e.updateSlidesClasses()}},t.prototype.changeDirection=function(e,t){void 0===t&&(t=!0);var i=this.params.direction;return e||(e="horizontal"===i?"vertical":"horizontal"),e===i||"horizontal"!==e&&"vertical"!==e?this:(this.$el.removeClass(""+this.params.containerModifierClass+i).addClass(""+this.params.containerModifierClass+e),this.params.direction=e,this.slides.each((function(t,i){"vertical"===e?i.style.width="":i.style.height=""})),this.emit("changeDirection"),t&&this.update(),this)},t.prototype.init=function(){this.initialized||(this.emit("beforeInit"),this.params.breakpoints&&this.setBreakpoint(),this.addClasses(),this.params.loop&&this.loopCreate(),this.updateSize(),this.updateSlides(),this.params.watchOverflow&&this.checkOverflow(),this.params.grabCursor&&this.setGrabCursor(),this.params.preloadImages&&this.preloadImages(),this.params.loop?this.slideTo(this.params.initialSlide+this.loopedSlides,0,this.params.runCallbacksOnInit):this.slideTo(this.params.initialSlide,0,this.params.runCallbacksOnInit),this.attachEvents(),this.initialized=!0,this.emit("init"))},t.prototype.destroy=function(e,t){void 0===e&&(e=!0),void 0===t&&(t=!0);var i=this,s=i.params,a=i.$el,r=i.$wrapperEl,o=i.slides;return void 0===i.params||i.destroyed?null:(i.emit("beforeDestroy"),i.initialized=!1,i.detachEvents(),s.loop&&i.loopDestroy(),t&&(i.removeClasses(),a.removeAttr("style"),r.removeAttr("style"),o&&o.length&&o.removeClass([s.slideVisibleClass,s.slideActiveClass,s.slideNextClass,s.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")),i.emit("destroy"),Object.keys(i.eventsListeners).forEach((function(e){i.off(e)})),!1!==e&&(i.$el[0].swiper=null,i.$el.data("swiper",null),n.deleteProps(i)),i.destroyed=!0,null)},t.extendDefaults=function(e){n.extend(F,e)},i.extendedDefaults.get=function(){return F},i.defaults.get=function(){return V},i.Class.get=function(){return e},i.$.get=function(){return s},Object.defineProperties(t,i),t}(l),R={name:"device",proto:{device:I},static:{device:I}},q={name:"support",proto:{support:o},static:{support:o}},j={isEdge:!!t.navigator.userAgent.match(/Edge/g),isSafari:function(){var e=t.navigator.userAgent.toLowerCase();return e.indexOf("safari")>=0&&e.indexOf("chrome")<0&&e.indexOf("android")<0}(),isUiWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent)},K={name:"browser",proto:{browser:j},static:{browser:j}},U={name:"resize",create:function(){var e=this;n.extend(e,{resize:{resizeHandler:function(){e&&!e.destroyed&&e.initialized&&(e.emit("beforeResize"),e.emit("resize"))},orientationChangeHandler:function(){e&&!e.destroyed&&e.initialized&&e.emit("orientationchange")}}})},on:{init:function(){t.addEventListener("resize",this.resize.resizeHandler),t.addEventListener("orientationchange",this.resize.orientationChangeHandler)},destroy:function(){t.removeEventListener("resize",this.resize.resizeHandler),t.removeEventListener("orientationchange",this.resize.orientationChangeHandler)}}},_={func:t.MutationObserver||t.WebkitMutationObserver,attach:function(e,i){void 0===i&&(i={});var s=this,a=new(0,_.func)((function(e){if(1!==e.length){var i=function(){s.emit("observerUpdate",e[0])};t.requestAnimationFrame?t.requestAnimationFrame(i):t.setTimeout(i,0)}else s.emit("observerUpdate",e[0])}));a.observe(e,{attributes:void 0===i.attributes||i.attributes,childList:void 0===i.childList||i.childList,characterData:void 0===i.characterData||i.characterData}),s.observer.observers.push(a)},init:function(){if(o.observer&&this.params.observer){if(this.params.observeParents)for(var e=this.$el.parents(),t=0;t<e.length;t+=1)this.observer.attach(e[t]);this.observer.attach(this.$el[0],{childList:this.params.observeSlideChildren}),this.observer.attach(this.$wrapperEl[0],{attributes:!1})}},destroy:function(){this.observer.observers.forEach((function(e){e.disconnect()})),this.observer.observers=[]}},Z={name:"observer",params:{observer:!1,observeParents:!1,observeSlideChildren:!1},create:function(){n.extend(this,{observer:{init:_.init.bind(this),attach:_.attach.bind(this),destroy:_.destroy.bind(this),observers:[]}})},on:{init:function(){this.observer.init()},destroy:function(){this.observer.destroy()}}},Q={update:function(e){var t=this,i=t.params,s=i.slidesPerView,a=i.slidesPerGroup,r=i.centeredSlides,o=t.params.virtual,l=o.addSlidesBefore,d=o.addSlidesAfter,h=t.virtual,p=h.from,c=h.to,u=h.slides,v=h.slidesGrid,f=h.renderSlide,m=h.offset;t.updateActiveIndex();var g,b,w,y=t.activeIndex||0;g=t.rtlTranslate?"right":t.isHorizontal()?"left":"top",r?(b=Math.floor(s/2)+a+l,w=Math.floor(s/2)+a+d):(b=s+(a-1)+l,w=a+d);var x=Math.max((y||0)-w,0),T=Math.min((y||0)+b,u.length-1),E=(t.slidesGrid[x]||0)-(t.slidesGrid[0]||0);function S(){t.updateSlides(),t.updateProgress(),t.updateSlidesClasses(),t.lazy&&t.params.lazy.enabled&&t.lazy.load()}if(n.extend(t.virtual,{from:x,to:T,offset:E,slidesGrid:t.slidesGrid}),p===x&&c===T&&!e)return t.slidesGrid!==v&&E!==m&&t.slides.css(g,E+"px"),void t.updateProgress();if(t.params.virtual.renderExternal)return t.params.virtual.renderExternal.call(t,{offset:E,from:x,to:T,slides:function(){for(var e=[],t=x;t<=T;t+=1)e.push(u[t]);return e}()}),void S();var C=[],M=[];if(e)t.$wrapperEl.find("."+t.params.slideClass).remove();else for(var P=p;P<=c;P+=1)(P<x||P>T)&&t.$wrapperEl.find("."+t.params.slideClass+'[data-swiper-slide-index="'+P+'"]').remove();for(var z=0;z<u.length;z+=1)z>=x&&z<=T&&(void 0===c||e?M.push(z):(z>c&&M.push(z),z<p&&C.push(z)));M.forEach((function(e){t.$wrapperEl.append(f(u[e],e))})),C.sort((function(e,t){return t-e})).forEach((function(e){t.$wrapperEl.prepend(f(u[e],e))})),t.$wrapperEl.children(".swiper-slide").css(g,E+"px"),S()},renderSlide:function(e,t){var i=this.params.virtual;if(i.cache&&this.virtual.cache[t])return this.virtual.cache[t];var a=i.renderSlide?s(i.renderSlide.call(this,e,t)):s('<div class="'+this.params.slideClass+'" data-swiper-slide-index="'+t+'">'+e+"</div>");return a.attr("data-swiper-slide-index")||a.attr("data-swiper-slide-index",t),i.cache&&(this.virtual.cache[t]=a),a},appendSlide:function(e){if("object"==typeof e&&"length"in e)for(var t=0;t<e.length;t+=1)e[t]&&this.virtual.slides.push(e[t]);else this.virtual.slides.push(e);this.virtual.update(!0)},prependSlide:function(e){var t=this.activeIndex,i=t+1,s=1;if(Array.isArray(e)){for(var a=0;a<e.length;a+=1)e[a]&&this.virtual.slides.unshift(e[a]);i=t+e.length,s=e.length}else this.virtual.slides.unshift(e);if(this.params.virtual.cache){var r=this.virtual.cache,n={};Object.keys(r).forEach((function(e){var t=r[e],i=t.attr("data-swiper-slide-index");i&&t.attr("data-swiper-slide-index",parseInt(i,10)+1),n[parseInt(e,10)+s]=t})),this.virtual.cache=n}this.virtual.update(!0),this.slideTo(i,0)},removeSlide:function(e){if(null!=e){var t=this.activeIndex;if(Array.isArray(e))for(var i=e.length-1;i>=0;i-=1)this.virtual.slides.splice(e[i],1),this.params.virtual.cache&&delete this.virtual.cache[e[i]],e[i]<t&&(t-=1),t=Math.max(t,0);else this.virtual.slides.splice(e,1),this.params.virtual.cache&&delete this.virtual.cache[e],e<t&&(t-=1),t=Math.max(t,0);this.virtual.update(!0),this.slideTo(t,0)}},removeAllSlides:function(){this.virtual.slides=[],this.params.virtual.cache&&(this.virtual.cache={}),this.virtual.update(!0),this.slideTo(0,0)}},J={name:"virtual",params:{virtual:{enabled:!1,slides:[],cache:!0,renderSlide:null,renderExternal:null,addSlidesBefore:0,addSlidesAfter:0}},create:function(){n.extend(this,{virtual:{update:Q.update.bind(this),appendSlide:Q.appendSlide.bind(this),prependSlide:Q.prependSlide.bind(this),removeSlide:Q.removeSlide.bind(this),removeAllSlides:Q.removeAllSlides.bind(this),renderSlide:Q.renderSlide.bind(this),slides:this.params.virtual.slides,cache:{}}})},on:{beforeInit:function(){if(this.params.virtual.enabled){this.classNames.push(this.params.containerModifierClass+"virtual");var e={watchSlidesProgress:!0};n.extend(this.params,e),n.extend(this.originalParams,e),this.params.initialSlide||this.virtual.update()}},setTranslate:function(){this.params.virtual.enabled&&this.virtual.update()}}},ee={handle:function(i){var s=this.rtlTranslate,a=i;a.originalEvent&&(a=a.originalEvent);var r=a.keyCode||a.charCode;if(!this.allowSlideNext&&(this.isHorizontal()&&39===r||this.isVertical()&&40===r||34===r))return!1;if(!this.allowSlidePrev&&(this.isHorizontal()&&37===r||this.isVertical()&&38===r||33===r))return!1;if(!(a.shiftKey||a.altKey||a.ctrlKey||a.metaKey||e.activeElement&&e.activeElement.nodeName&&("input"===e.activeElement.nodeName.toLowerCase()||"textarea"===e.activeElement.nodeName.toLowerCase()))){if(this.params.keyboard.onlyInViewport&&(33===r||34===r||37===r||39===r||38===r||40===r)){var n=!1;if(this.$el.parents("."+this.params.slideClass).length>0&&0===this.$el.parents("."+this.params.slideActiveClass).length)return;var o=t.innerWidth,l=t.innerHeight,d=this.$el.offset();s&&(d.left-=this.$el[0].scrollLeft);for(var h=[[d.left,d.top],[d.left+this.width,d.top],[d.left,d.top+this.height],[d.left+this.width,d.top+this.height]],p=0;p<h.length;p+=1){var c=h[p];c[0]>=0&&c[0]<=o&&c[1]>=0&&c[1]<=l&&(n=!0)}if(!n)return}this.isHorizontal()?(33!==r&&34!==r&&37!==r&&39!==r||(a.preventDefault?a.preventDefault():a.returnValue=!1),(34!==r&&39!==r||s)&&(33!==r&&37!==r||!s)||this.slideNext(),(33!==r&&37!==r||s)&&(34!==r&&39!==r||!s)||this.slidePrev()):(33!==r&&34!==r&&38!==r&&40!==r||(a.preventDefault?a.preventDefault():a.returnValue=!1),34!==r&&40!==r||this.slideNext(),33!==r&&38!==r||this.slidePrev()),this.emit("keyPress",r)}},enable:function(){this.keyboard.enabled||(s(e).on("keydown",this.keyboard.handle),this.keyboard.enabled=!0)},disable:function(){this.keyboard.enabled&&(s(e).off("keydown",this.keyboard.handle),this.keyboard.enabled=!1)}},te={name:"keyboard",params:{keyboard:{enabled:!1,onlyInViewport:!0}},create:function(){n.extend(this,{keyboard:{enabled:!1,enable:ee.enable.bind(this),disable:ee.disable.bind(this),handle:ee.handle.bind(this)}})},on:{init:function(){this.params.keyboard.enabled&&this.keyboard.enable()},destroy:function(){this.keyboard.enabled&&this.keyboard.disable()}}};var ie={lastScrollTime:n.now(),lastEventBeforeSnap:void 0,recentWheelEvents:[],event:function(){return t.navigator.userAgent.indexOf("firefox")>-1?"DOMMouseScroll":function(){var t="onwheel"in e;if(!t){var i=e.createElement("div");i.setAttribute("onwheel","return;"),t="function"==typeof i.onwheel}return!t&&e.implementation&&e.implementation.hasFeature&&!0!==e.implementation.hasFeature("","")&&(t=e.implementation.hasFeature("Events.wheel","3.0")),t}()?"wheel":"mousewheel"},normalize:function(e){var t=0,i=0,s=0,a=0;return"detail"in e&&(i=e.detail),"wheelDelta"in e&&(i=-e.wheelDelta/120),"wheelDeltaY"in e&&(i=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(t=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(t=i,i=0),s=10*t,a=10*i,"deltaY"in e&&(a=e.deltaY),"deltaX"in e&&(s=e.deltaX),e.shiftKey&&!s&&(s=a,a=0),(s||a)&&e.deltaMode&&(1===e.deltaMode?(s*=40,a*=40):(s*=800,a*=800)),s&&!t&&(t=s<1?-1:1),a&&!i&&(i=a<1?-1:1),{spinX:t,spinY:i,pixelX:s,pixelY:a}},handleMouseEnter:function(){this.mouseEntered=!0},handleMouseLeave:function(){this.mouseEntered=!1},handle:function(e){var t=e,i=this,a=i.params.mousewheel;i.params.cssMode&&t.preventDefault();var r=i.$el;if("container"!==i.params.mousewheel.eventsTarged&&(r=s(i.params.mousewheel.eventsTarged)),!i.mouseEntered&&!r[0].contains(t.target)&&!a.releaseOnEdges)return!0;t.originalEvent&&(t=t.originalEvent);var o=0,l=i.rtlTranslate?-1:1,d=ie.normalize(t);if(a.forceToAxis)if(i.isHorizontal()){if(!(Math.abs(d.pixelX)>Math.abs(d.pixelY)))return!0;o=d.pixelX*l}else{if(!(Math.abs(d.pixelY)>Math.abs(d.pixelX)))return!0;o=d.pixelY}else o=Math.abs(d.pixelX)>Math.abs(d.pixelY)?-d.pixelX*l:-d.pixelY;if(0===o)return!0;if(a.invert&&(o=-o),i.params.freeMode){var h={time:n.now(),delta:Math.abs(o),direction:Math.sign(o)},p=i.mousewheel.lastEventBeforeSnap,c=p&&h.time<p.time+500&&h.delta<=p.delta&&h.direction===p.direction;if(!c){i.mousewheel.lastEventBeforeSnap=void 0,i.params.loop&&i.loopFix();var u=i.getTranslate()+o*a.sensitivity,v=i.isBeginning,f=i.isEnd;if(u>=i.minTranslate()&&(u=i.minTranslate()),u<=i.maxTranslate()&&(u=i.maxTranslate()),i.setTransition(0),i.setTranslate(u),i.updateProgress(),i.updateActiveIndex(),i.updateSlidesClasses(),(!v&&i.isBeginning||!f&&i.isEnd)&&i.updateSlidesClasses(),i.params.freeModeSticky){clearTimeout(i.mousewheel.timeout),i.mousewheel.timeout=void 0;var m=i.mousewheel.recentWheelEvents;m.length>=15&&m.shift();var g=m.length?m[m.length-1]:void 0,b=m[0];if(m.push(h),g&&(h.delta>g.delta||h.direction!==g.direction))m.splice(0);else if(m.length>=15&&h.time-b.time<500&&b.delta-h.delta>=1&&h.delta<=6){var w=o>0?.8:.2;i.mousewheel.lastEventBeforeSnap=h,m.splice(0),i.mousewheel.timeout=n.nextTick((function(){i.slideToClosest(i.params.speed,!0,void 0,w)}),0)}i.mousewheel.timeout||(i.mousewheel.timeout=n.nextTick((function(){i.mousewheel.lastEventBeforeSnap=h,m.splice(0),i.slideToClosest(i.params.speed,!0,void 0,.5)}),500))}if(c||i.emit("scroll",t),i.params.autoplay&&i.params.autoplayDisableOnInteraction&&i.autoplay.stop(),u===i.minTranslate()||u===i.maxTranslate())return!0}}else{var y={time:n.now(),delta:Math.abs(o),direction:Math.sign(o),raw:e},x=i.mousewheel.recentWheelEvents;x.length>=2&&x.shift();var T=x.length?x[x.length-1]:void 0;if(x.push(y),T?(y.direction!==T.direction||y.delta>T.delta)&&i.mousewheel.animateSlider(y):i.mousewheel.animateSlider(y),i.mousewheel.releaseScroll(y))return!0}return t.preventDefault?t.preventDefault():t.returnValue=!1,!1},animateSlider:function(e){return e.delta>=6&&n.now()-this.mousewheel.lastScrollTime<60||(e.direction<0?this.isEnd&&!this.params.loop||this.animating||(this.slideNext(),this.emit("scroll",e.raw)):this.isBeginning&&!this.params.loop||this.animating||(this.slidePrev(),this.emit("scroll",e.raw)),this.mousewheel.lastScrollTime=(new t.Date).getTime(),!1)},releaseScroll:function(e){var t=this.params.mousewheel;if(e.direction<0){if(this.isEnd&&!this.params.loop&&t.releaseOnEdges)return!0}else if(this.isBeginning&&!this.params.loop&&t.releaseOnEdges)return!0;return!1},enable:function(){var e=ie.event();if(this.params.cssMode)return this.wrapperEl.removeEventListener(e,this.mousewheel.handle),!0;if(!e)return!1;if(this.mousewheel.enabled)return!1;var t=this.$el;return"container"!==this.params.mousewheel.eventsTarged&&(t=s(this.params.mousewheel.eventsTarged)),t.on("mouseenter",this.mousewheel.handleMouseEnter),t.on("mouseleave",this.mousewheel.handleMouseLeave),t.on(e,this.mousewheel.handle),this.mousewheel.enabled=!0,!0},disable:function(){var e=ie.event();if(this.params.cssMode)return this.wrapperEl.addEventListener(e,this.mousewheel.handle),!0;if(!e)return!1;if(!this.mousewheel.enabled)return!1;var t=this.$el;return"container"!==this.params.mousewheel.eventsTarged&&(t=s(this.params.mousewheel.eventsTarged)),t.off(e,this.mousewheel.handle),this.mousewheel.enabled=!1,!0}},se={update:function(){var e=this.params.navigation;if(!this.params.loop){var t=this.navigation,i=t.$nextEl,s=t.$prevEl;s&&s.length>0&&(this.isBeginning?s.addClass(e.disabledClass):s.removeClass(e.disabledClass),s[this.params.watchOverflow&&this.isLocked?"addClass":"removeClass"](e.lockClass)),i&&i.length>0&&(this.isEnd?i.addClass(e.disabledClass):i.removeClass(e.disabledClass),i[this.params.watchOverflow&&this.isLocked?"addClass":"removeClass"](e.lockClass))}},onPrevClick:function(e){e.preventDefault(),this.isBeginning&&!this.params.loop||this.slidePrev()},onNextClick:function(e){e.preventDefault(),this.isEnd&&!this.params.loop||this.slideNext()},init:function(){var e,t,i=this.params.navigation;(i.nextEl||i.prevEl)&&(i.nextEl&&(e=s(i.nextEl),this.params.uniqueNavElements&&"string"==typeof i.nextEl&&e.length>1&&1===this.$el.find(i.nextEl).length&&(e=this.$el.find(i.nextEl))),i.prevEl&&(t=s(i.prevEl),this.params.uniqueNavElements&&"string"==typeof i.prevEl&&t.length>1&&1===this.$el.find(i.prevEl).length&&(t=this.$el.find(i.prevEl))),e&&e.length>0&&e.on("click",this.navigation.onNextClick),t&&t.length>0&&t.on("click",this.navigation.onPrevClick),n.extend(this.navigation,{$nextEl:e,nextEl:e&&e[0],$prevEl:t,prevEl:t&&t[0]}))},destroy:function(){var e=this.navigation,t=e.$nextEl,i=e.$prevEl;t&&t.length&&(t.off("click",this.navigation.onNextClick),t.removeClass(this.params.navigation.disabledClass)),i&&i.length&&(i.off("click",this.navigation.onPrevClick),i.removeClass(this.params.navigation.disabledClass))}},ae={update:function(){var e=this.rtl,t=this.params.pagination;if(t.el&&this.pagination.el&&this.pagination.$el&&0!==this.pagination.$el.length){var i,a=this.virtual&&this.params.virtual.enabled?this.virtual.slides.length:this.slides.length,r=this.pagination.$el,n=this.params.loop?Math.ceil((a-2*this.loopedSlides)/this.params.slidesPerGroup):this.snapGrid.length;if(this.params.loop?((i=Math.ceil((this.activeIndex-this.loopedSlides)/this.params.slidesPerGroup))>a-1-2*this.loopedSlides&&(i-=a-2*this.loopedSlides),i>n-1&&(i-=n),i<0&&"bullets"!==this.params.paginationType&&(i=n+i)):i=void 0!==this.snapIndex?this.snapIndex:this.activeIndex||0,"bullets"===t.type&&this.pagination.bullets&&this.pagination.bullets.length>0){var o,l,d,h=this.pagination.bullets;if(t.dynamicBullets&&(this.pagination.bulletSize=h.eq(0)[this.isHorizontal()?"outerWidth":"outerHeight"](!0),r.css(this.isHorizontal()?"width":"height",this.pagination.bulletSize*(t.dynamicMainBullets+4)+"px"),t.dynamicMainBullets>1&&void 0!==this.previousIndex&&(this.pagination.dynamicBulletIndex+=i-this.previousIndex,this.pagination.dynamicBulletIndex>t.dynamicMainBullets-1?this.pagination.dynamicBulletIndex=t.dynamicMainBullets-1:this.pagination.dynamicBulletIndex<0&&(this.pagination.dynamicBulletIndex=0)),o=i-this.pagination.dynamicBulletIndex,d=((l=o+(Math.min(h.length,t.dynamicMainBullets)-1))+o)/2),h.removeClass(t.bulletActiveClass+" "+t.bulletActiveClass+"-next "+t.bulletActiveClass+"-next-next "+t.bulletActiveClass+"-prev "+t.bulletActiveClass+"-prev-prev "+t.bulletActiveClass+"-main"),r.length>1)h.each((function(e,a){var r=s(a),n=r.index();n===i&&r.addClass(t.bulletActiveClass),t.dynamicBullets&&(n>=o&&n<=l&&r.addClass(t.bulletActiveClass+"-main"),n===o&&r.prev().addClass(t.bulletActiveClass+"-prev").prev().addClass(t.bulletActiveClass+"-prev-prev"),n===l&&r.next().addClass(t.bulletActiveClass+"-next").next().addClass(t.bulletActiveClass+"-next-next"))}));else{var p=h.eq(i),c=p.index();if(p.addClass(t.bulletActiveClass),t.dynamicBullets){for(var u=h.eq(o),v=h.eq(l),f=o;f<=l;f+=1)h.eq(f).addClass(t.bulletActiveClass+"-main");if(this.params.loop)if(c>=h.length-t.dynamicMainBullets){for(var m=t.dynamicMainBullets;m>=0;m-=1)h.eq(h.length-m).addClass(t.bulletActiveClass+"-main");h.eq(h.length-t.dynamicMainBullets-1).addClass(t.bulletActiveClass+"-prev")}else u.prev().addClass(t.bulletActiveClass+"-prev").prev().addClass(t.bulletActiveClass+"-prev-prev"),v.next().addClass(t.bulletActiveClass+"-next").next().addClass(t.bulletActiveClass+"-next-next");else u.prev().addClass(t.bulletActiveClass+"-prev").prev().addClass(t.bulletActiveClass+"-prev-prev"),v.next().addClass(t.bulletActiveClass+"-next").next().addClass(t.bulletActiveClass+"-next-next")}}if(t.dynamicBullets){var g=Math.min(h.length,t.dynamicMainBullets+4),b=(this.pagination.bulletSize*g-this.pagination.bulletSize)/2-d*this.pagination.bulletSize,w=e?"right":"left";h.css(this.isHorizontal()?w:"top",b+"px")}}if("fraction"===t.type&&(r.find("."+t.currentClass).text(t.formatFractionCurrent(i+1)),r.find("."+t.totalClass).text(t.formatFractionTotal(n))),"progressbar"===t.type){var y;y=t.progressbarOpposite?this.isHorizontal()?"vertical":"horizontal":this.isHorizontal()?"horizontal":"vertical";var x=(i+1)/n,T=1,E=1;"horizontal"===y?T=x:E=x,r.find("."+t.progressbarFillClass).transform("translate3d(0,0,0) scaleX("+T+") scaleY("+E+")").transition(this.params.speed)}"custom"===t.type&&t.renderCustom?(r.html(t.renderCustom(this,i+1,n)),this.emit("paginationRender",this,r[0])):this.emit("paginationUpdate",this,r[0]),r[this.params.watchOverflow&&this.isLocked?"addClass":"removeClass"](t.lockClass)}},render:function(){var e=this.params.pagination;if(e.el&&this.pagination.el&&this.pagination.$el&&0!==this.pagination.$el.length){var t=this.virtual&&this.params.virtual.enabled?this.virtual.slides.length:this.slides.length,i=this.pagination.$el,s="";if("bullets"===e.type){for(var a=this.params.loop?Math.ceil((t-2*this.loopedSlides)/this.params.slidesPerGroup):this.snapGrid.length,r=0;r<a;r+=1)e.renderBullet?s+=e.renderBullet.call(this,r,e.bulletClass):s+="<"+e.bulletElement+' class="'+e.bulletClass+'"></'+e.bulletElement+">";i.html(s),this.pagination.bullets=i.find("."+e.bulletClass)}"fraction"===e.type&&(s=e.renderFraction?e.renderFraction.call(this,e.currentClass,e.totalClass):'<span class="'+e.currentClass+'"></span> / <span class="'+e.totalClass+'"></span>',i.html(s)),"progressbar"===e.type&&(s=e.renderProgressbar?e.renderProgressbar.call(this,e.progressbarFillClass):'<span class="'+e.progressbarFillClass+'"></span>',i.html(s)),"custom"!==e.type&&this.emit("paginationRender",this.pagination.$el[0])}},init:function(){var e=this,t=e.params.pagination;if(t.el){var i=s(t.el);0!==i.length&&(e.params.uniqueNavElements&&"string"==typeof t.el&&i.length>1&&1===e.$el.find(t.el).length&&(i=e.$el.find(t.el)),"bullets"===t.type&&t.clickable&&i.addClass(t.clickableClass),i.addClass(t.modifierClass+t.type),"bullets"===t.type&&t.dynamicBullets&&(i.addClass(""+t.modifierClass+t.type+"-dynamic"),e.pagination.dynamicBulletIndex=0,t.dynamicMainBullets<1&&(t.dynamicMainBullets=1)),"progressbar"===t.type&&t.progressbarOpposite&&i.addClass(t.progressbarOppositeClass),t.clickable&&i.on("click","."+t.bulletClass,(function(t){t.preventDefault();var i=s(this).index()*e.params.slidesPerGroup;e.params.loop&&(i+=e.loopedSlides),e.slideTo(i)})),n.extend(e.pagination,{$el:i,el:i[0]}))}},destroy:function(){var e=this.params.pagination;if(e.el&&this.pagination.el&&this.pagination.$el&&0!==this.pagination.$el.length){var t=this.pagination.$el;t.removeClass(e.hiddenClass),t.removeClass(e.modifierClass+e.type),this.pagination.bullets&&this.pagination.bullets.removeClass(e.bulletActiveClass),e.clickable&&t.off("click","."+e.bulletClass)}}},re={setTranslate:function(){if(this.params.scrollbar.el&&this.scrollbar.el){var e=this.scrollbar,t=this.rtlTranslate,i=this.progress,s=e.dragSize,a=e.trackSize,r=e.$dragEl,n=e.$el,o=this.params.scrollbar,l=s,d=(a-s)*i;t?(d=-d)>0?(l=s-d,d=0):-d+s>a&&(l=a+d):d<0?(l=s+d,d=0):d+s>a&&(l=a-d),this.isHorizontal()?(r.transform("translate3d("+d+"px, 0, 0)"),r[0].style.width=l+"px"):(r.transform("translate3d(0px, "+d+"px, 0)"),r[0].style.height=l+"px"),o.hide&&(clearTimeout(this.scrollbar.timeout),n[0].style.opacity=1,this.scrollbar.timeout=setTimeout((function(){n[0].style.opacity=0,n.transition(400)}),1e3))}},setTransition:function(e){this.params.scrollbar.el&&this.scrollbar.el&&this.scrollbar.$dragEl.transition(e)},updateSize:function(){if(this.params.scrollbar.el&&this.scrollbar.el){var e=this.scrollbar,t=e.$dragEl,i=e.$el;t[0].style.width="",t[0].style.height="";var s,a=this.isHorizontal()?i[0].offsetWidth:i[0].offsetHeight,r=this.size/this.virtualSize,o=r*(a/this.size);s="auto"===this.params.scrollbar.dragSize?a*r:parseInt(this.params.scrollbar.dragSize,10),this.isHorizontal()?t[0].style.width=s+"px":t[0].style.height=s+"px",i[0].style.display=r>=1?"none":"",this.params.scrollbar.hide&&(i[0].style.opacity=0),n.extend(e,{trackSize:a,divider:r,moveDivider:o,dragSize:s}),e.$el[this.params.watchOverflow&&this.isLocked?"addClass":"removeClass"](this.params.scrollbar.lockClass)}},getPointerPosition:function(e){return this.isHorizontal()?"touchstart"===e.type||"touchmove"===e.type?e.targetTouches[0].clientX:e.clientX:"touchstart"===e.type||"touchmove"===e.type?e.targetTouches[0].clientY:e.clientY},setDragPosition:function(e){var t,i=this.scrollbar,s=this.rtlTranslate,a=i.$el,r=i.dragSize,n=i.trackSize,o=i.dragStartPos;t=(i.getPointerPosition(e)-a.offset()[this.isHorizontal()?"left":"top"]-(null!==o?o:r/2))/(n-r),t=Math.max(Math.min(t,1),0),s&&(t=1-t);var l=this.minTranslate()+(this.maxTranslate()-this.minTranslate())*t;this.updateProgress(l),this.setTranslate(l),this.updateActiveIndex(),this.updateSlidesClasses()},onDragStart:function(e){var t=this.params.scrollbar,i=this.scrollbar,s=this.$wrapperEl,a=i.$el,r=i.$dragEl;this.scrollbar.isTouched=!0,this.scrollbar.dragStartPos=e.target===r[0]||e.target===r?i.getPointerPosition(e)-e.target.getBoundingClientRect()[this.isHorizontal()?"left":"top"]:null,e.preventDefault(),e.stopPropagation(),s.transition(100),r.transition(100),i.setDragPosition(e),clearTimeout(this.scrollbar.dragTimeout),a.transition(0),t.hide&&a.css("opacity",1),this.params.cssMode&&this.$wrapperEl.css("scroll-snap-type","none"),this.emit("scrollbarDragStart",e)},onDragMove:function(e){var t=this.scrollbar,i=this.$wrapperEl,s=t.$el,a=t.$dragEl;this.scrollbar.isTouched&&(e.preventDefault?e.preventDefault():e.returnValue=!1,t.setDragPosition(e),i.transition(0),s.transition(0),a.transition(0),this.emit("scrollbarDragMove",e))},onDragEnd:function(e){var t=this.params.scrollbar,i=this.scrollbar,s=this.$wrapperEl,a=i.$el;this.scrollbar.isTouched&&(this.scrollbar.isTouched=!1,this.params.cssMode&&(this.$wrapperEl.css("scroll-snap-type",""),s.transition("")),t.hide&&(clearTimeout(this.scrollbar.dragTimeout),this.scrollbar.dragTimeout=n.nextTick((function(){a.css("opacity",0),a.transition(400)}),1e3)),this.emit("scrollbarDragEnd",e),t.snapOnRelease&&this.slideToClosest())},enableDraggable:function(){if(this.params.scrollbar.el){var t=this.scrollbar,i=this.touchEventsTouch,s=this.touchEventsDesktop,a=this.params,r=t.$el[0],n=!(!o.passiveListener||!a.passiveListeners)&&{passive:!1,capture:!1},l=!(!o.passiveListener||!a.passiveListeners)&&{passive:!0,capture:!1};o.touch?(r.addEventListener(i.start,this.scrollbar.onDragStart,n),r.addEventListener(i.move,this.scrollbar.onDragMove,n),r.addEventListener(i.end,this.scrollbar.onDragEnd,l)):(r.addEventListener(s.start,this.scrollbar.onDragStart,n),e.addEventListener(s.move,this.scrollbar.onDragMove,n),e.addEventListener(s.end,this.scrollbar.onDragEnd,l))}},disableDraggable:function(){if(this.params.scrollbar.el){var t=this.scrollbar,i=this.touchEventsTouch,s=this.touchEventsDesktop,a=this.params,r=t.$el[0],n=!(!o.passiveListener||!a.passiveListeners)&&{passive:!1,capture:!1},l=!(!o.passiveListener||!a.passiveListeners)&&{passive:!0,capture:!1};o.touch?(r.removeEventListener(i.start,this.scrollbar.onDragStart,n),r.removeEventListener(i.move,this.scrollbar.onDragMove,n),r.removeEventListener(i.end,this.scrollbar.onDragEnd,l)):(r.removeEventListener(s.start,this.scrollbar.onDragStart,n),e.removeEventListener(s.move,this.scrollbar.onDragMove,n),e.removeEventListener(s.end,this.scrollbar.onDragEnd,l))}},init:function(){if(this.params.scrollbar.el){var e=this.scrollbar,t=this.$el,i=this.params.scrollbar,a=s(i.el);this.params.uniqueNavElements&&"string"==typeof i.el&&a.length>1&&1===t.find(i.el).length&&(a=t.find(i.el));var r=a.find("."+this.params.scrollbar.dragClass);0===r.length&&(r=s('<div class="'+this.params.scrollbar.dragClass+'"></div>'),a.append(r)),n.extend(e,{$el:a,el:a[0],$dragEl:r,dragEl:r[0]}),i.draggable&&e.enableDraggable()}},destroy:function(){this.scrollbar.disableDraggable()}},ne={setTransform:function(e,t){var i=this.rtl,a=s(e),r=i?-1:1,n=a.attr("data-swiper-parallax")||"0",o=a.attr("data-swiper-parallax-x"),l=a.attr("data-swiper-parallax-y"),d=a.attr("data-swiper-parallax-scale"),h=a.attr("data-swiper-parallax-opacity");if(o||l?(o=o||"0",l=l||"0"):this.isHorizontal()?(o=n,l="0"):(l=n,o="0"),o=o.indexOf("%")>=0?parseInt(o,10)*t*r+"%":o*t*r+"px",l=l.indexOf("%")>=0?parseInt(l,10)*t+"%":l*t+"px",null!=h){var p=h-(h-1)*(1-Math.abs(t));a[0].style.opacity=p}if(null==d)a.transform("translate3d("+o+", "+l+", 0px)");else{var c=d-(d-1)*(1-Math.abs(t));a.transform("translate3d("+o+", "+l+", 0px) scale("+c+")")}},setTranslate:function(){var e=this,t=e.$el,i=e.slides,a=e.progress,r=e.snapGrid;t.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function(t,i){e.parallax.setTransform(i,a)})),i.each((function(t,i){var n=i.progress;e.params.slidesPerGroup>1&&"auto"!==e.params.slidesPerView&&(n+=Math.ceil(t/2)-a*(r.length-1)),n=Math.min(Math.max(n,-1),1),s(i).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function(t,i){e.parallax.setTransform(i,n)}))}))},setTransition:function(e){void 0===e&&(e=this.params.speed);this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function(t,i){var a=s(i),r=parseInt(a.attr("data-swiper-parallax-duration"),10)||e;0===e&&(r=0),a.transition(r)}))}},oe={getDistanceBetweenTouches:function(e){if(e.targetTouches.length<2)return 1;var t=e.targetTouches[0].pageX,i=e.targetTouches[0].pageY,s=e.targetTouches[1].pageX,a=e.targetTouches[1].pageY;return Math.sqrt(Math.pow(s-t,2)+Math.pow(a-i,2))},onGestureStart:function(e){var t=this.params.zoom,i=this.zoom,a=i.gesture;if(i.fakeGestureTouched=!1,i.fakeGestureMoved=!1,!o.gestures){if("touchstart"!==e.type||"touchstart"===e.type&&e.targetTouches.length<2)return;i.fakeGestureTouched=!0,a.scaleStart=oe.getDistanceBetweenTouches(e)}a.$slideEl&&a.$slideEl.length||(a.$slideEl=s(e.target).closest(".swiper-slide"),0===a.$slideEl.length&&(a.$slideEl=this.slides.eq(this.activeIndex)),a.$imageEl=a.$slideEl.find("img, svg, canvas"),a.$imageWrapEl=a.$imageEl.parent("."+t.containerClass),a.maxRatio=a.$imageWrapEl.attr("data-swiper-zoom")||t.maxRatio,0!==a.$imageWrapEl.length)?(a.$imageEl.transition(0),this.zoom.isScaling=!0):a.$imageEl=void 0},onGestureChange:function(e){var t=this.params.zoom,i=this.zoom,s=i.gesture;if(!o.gestures){if("touchmove"!==e.type||"touchmove"===e.type&&e.targetTouches.length<2)return;i.fakeGestureMoved=!0,s.scaleMove=oe.getDistanceBetweenTouches(e)}s.$imageEl&&0!==s.$imageEl.length&&(o.gestures?i.scale=e.scale*i.currentScale:i.scale=s.scaleMove/s.scaleStart*i.currentScale,i.scale>s.maxRatio&&(i.scale=s.maxRatio-1+Math.pow(i.scale-s.maxRatio+1,.5)),i.scale<t.minRatio&&(i.scale=t.minRatio+1-Math.pow(t.minRatio-i.scale+1,.5)),s.$imageEl.transform("translate3d(0,0,0) scale("+i.scale+")"))},onGestureEnd:function(e){var t=this.params.zoom,i=this.zoom,s=i.gesture;if(!o.gestures){if(!i.fakeGestureTouched||!i.fakeGestureMoved)return;if("touchend"!==e.type||"touchend"===e.type&&e.changedTouches.length<2&&!I.android)return;i.fakeGestureTouched=!1,i.fakeGestureMoved=!1}s.$imageEl&&0!==s.$imageEl.length&&(i.scale=Math.max(Math.min(i.scale,s.maxRatio),t.minRatio),s.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale("+i.scale+")"),i.currentScale=i.scale,i.isScaling=!1,1===i.scale&&(s.$slideEl=void 0))},onTouchStart:function(e){var t=this.zoom,i=t.gesture,s=t.image;i.$imageEl&&0!==i.$imageEl.length&&(s.isTouched||(I.android&&e.preventDefault(),s.isTouched=!0,s.touchesStart.x="touchstart"===e.type?e.targetTouches[0].pageX:e.pageX,s.touchesStart.y="touchstart"===e.type?e.targetTouches[0].pageY:e.pageY))},onTouchMove:function(e){var t=this.zoom,i=t.gesture,s=t.image,a=t.velocity;if(i.$imageEl&&0!==i.$imageEl.length&&(this.allowClick=!1,s.isTouched&&i.$slideEl)){s.isMoved||(s.width=i.$imageEl[0].offsetWidth,s.height=i.$imageEl[0].offsetHeight,s.startX=n.getTranslate(i.$imageWrapEl[0],"x")||0,s.startY=n.getTranslate(i.$imageWrapEl[0],"y")||0,i.slideWidth=i.$slideEl[0].offsetWidth,i.slideHeight=i.$slideEl[0].offsetHeight,i.$imageWrapEl.transition(0),this.rtl&&(s.startX=-s.startX,s.startY=-s.startY));var r=s.width*t.scale,o=s.height*t.scale;if(!(r<i.slideWidth&&o<i.slideHeight)){if(s.minX=Math.min(i.slideWidth/2-r/2,0),s.maxX=-s.minX,s.minY=Math.min(i.slideHeight/2-o/2,0),s.maxY=-s.minY,s.touchesCurrent.x="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,s.touchesCurrent.y="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,!s.isMoved&&!t.isScaling){if(this.isHorizontal()&&(Math.floor(s.minX)===Math.floor(s.startX)&&s.touchesCurrent.x<s.touchesStart.x||Math.floor(s.maxX)===Math.floor(s.startX)&&s.touchesCurrent.x>s.touchesStart.x))return void(s.isTouched=!1);if(!this.isHorizontal()&&(Math.floor(s.minY)===Math.floor(s.startY)&&s.touchesCurrent.y<s.touchesStart.y||Math.floor(s.maxY)===Math.floor(s.startY)&&s.touchesCurrent.y>s.touchesStart.y))return void(s.isTouched=!1)}e.preventDefault(),e.stopPropagation(),s.isMoved=!0,s.currentX=s.touchesCurrent.x-s.touchesStart.x+s.startX,s.currentY=s.touchesCurrent.y-s.touchesStart.y+s.startY,s.currentX<s.minX&&(s.currentX=s.minX+1-Math.pow(s.minX-s.currentX+1,.8)),s.currentX>s.maxX&&(s.currentX=s.maxX-1+Math.pow(s.currentX-s.maxX+1,.8)),s.currentY<s.minY&&(s.currentY=s.minY+1-Math.pow(s.minY-s.currentY+1,.8)),s.currentY>s.maxY&&(s.currentY=s.maxY-1+Math.pow(s.currentY-s.maxY+1,.8)),a.prevPositionX||(a.prevPositionX=s.touchesCurrent.x),a.prevPositionY||(a.prevPositionY=s.touchesCurrent.y),a.prevTime||(a.prevTime=Date.now()),a.x=(s.touchesCurrent.x-a.prevPositionX)/(Date.now()-a.prevTime)/2,a.y=(s.touchesCurrent.y-a.prevPositionY)/(Date.now()-a.prevTime)/2,Math.abs(s.touchesCurrent.x-a.prevPositionX)<2&&(a.x=0),Math.abs(s.touchesCurrent.y-a.prevPositionY)<2&&(a.y=0),a.prevPositionX=s.touchesCurrent.x,a.prevPositionY=s.touchesCurrent.y,a.prevTime=Date.now(),i.$imageWrapEl.transform("translate3d("+s.currentX+"px, "+s.currentY+"px,0)")}}},onTouchEnd:function(){var e=this.zoom,t=e.gesture,i=e.image,s=e.velocity;if(t.$imageEl&&0!==t.$imageEl.length){if(!i.isTouched||!i.isMoved)return i.isTouched=!1,void(i.isMoved=!1);i.isTouched=!1,i.isMoved=!1;var a=300,r=300,n=s.x*a,o=i.currentX+n,l=s.y*r,d=i.currentY+l;0!==s.x&&(a=Math.abs((o-i.currentX)/s.x)),0!==s.y&&(r=Math.abs((d-i.currentY)/s.y));var h=Math.max(a,r);i.currentX=o,i.currentY=d;var p=i.width*e.scale,c=i.height*e.scale;i.minX=Math.min(t.slideWidth/2-p/2,0),i.maxX=-i.minX,i.minY=Math.min(t.slideHeight/2-c/2,0),i.maxY=-i.minY,i.currentX=Math.max(Math.min(i.currentX,i.maxX),i.minX),i.currentY=Math.max(Math.min(i.currentY,i.maxY),i.minY),t.$imageWrapEl.transition(h).transform("translate3d("+i.currentX+"px, "+i.currentY+"px,0)")}},onTransitionEnd:function(){var e=this.zoom,t=e.gesture;t.$slideEl&&this.previousIndex!==this.activeIndex&&(t.$imageEl.transform("translate3d(0,0,0) scale(1)"),t.$imageWrapEl.transform("translate3d(0,0,0)"),e.scale=1,e.currentScale=1,t.$slideEl=void 0,t.$imageEl=void 0,t.$imageWrapEl=void 0)},toggle:function(e){var t=this.zoom;t.scale&&1!==t.scale?t.out():t.in(e)},in:function(e){var t,i,a,r,n,o,l,d,h,p,c,u,v,f,m,g,b=this.zoom,w=this.params.zoom,y=b.gesture,x=b.image;(y.$slideEl||(y.$slideEl=this.clickedSlide?s(this.clickedSlide):this.slides.eq(this.activeIndex),y.$imageEl=y.$slideEl.find("img, svg, canvas"),y.$imageWrapEl=y.$imageEl.parent("."+w.containerClass)),y.$imageEl&&0!==y.$imageEl.length)&&(y.$slideEl.addClass(""+w.zoomedSlideClass),void 0===x.touchesStart.x&&e?(t="touchend"===e.type?e.changedTouches[0].pageX:e.pageX,i="touchend"===e.type?e.changedTouches[0].pageY:e.pageY):(t=x.touchesStart.x,i=x.touchesStart.y),b.scale=y.$imageWrapEl.attr("data-swiper-zoom")||w.maxRatio,b.currentScale=y.$imageWrapEl.attr("data-swiper-zoom")||w.maxRatio,e?(m=y.$slideEl[0].offsetWidth,g=y.$slideEl[0].offsetHeight,a=y.$slideEl.offset().left+m/2-t,r=y.$slideEl.offset().top+g/2-i,l=y.$imageEl[0].offsetWidth,d=y.$imageEl[0].offsetHeight,h=l*b.scale,p=d*b.scale,v=-(c=Math.min(m/2-h/2,0)),f=-(u=Math.min(g/2-p/2,0)),(n=a*b.scale)<c&&(n=c),n>v&&(n=v),(o=r*b.scale)<u&&(o=u),o>f&&(o=f)):(n=0,o=0),y.$imageWrapEl.transition(300).transform("translate3d("+n+"px, "+o+"px,0)"),y.$imageEl.transition(300).transform("translate3d(0,0,0) scale("+b.scale+")"))},out:function(){var e=this.zoom,t=this.params.zoom,i=e.gesture;i.$slideEl||(i.$slideEl=this.clickedSlide?s(this.clickedSlide):this.slides.eq(this.activeIndex),i.$imageEl=i.$slideEl.find("img, svg, canvas"),i.$imageWrapEl=i.$imageEl.parent("."+t.containerClass)),i.$imageEl&&0!==i.$imageEl.length&&(e.scale=1,e.currentScale=1,i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"),i.$slideEl.removeClass(""+t.zoomedSlideClass),i.$slideEl=void 0)},enable:function(){var e=this.zoom;if(!e.enabled){e.enabled=!0;var t=!("touchstart"!==this.touchEvents.start||!o.passiveListener||!this.params.passiveListeners)&&{passive:!0,capture:!1},i=!o.passiveListener||{passive:!1,capture:!0};o.gestures?(this.$wrapperEl.on("gesturestart",".swiper-slide",e.onGestureStart,t),this.$wrapperEl.on("gesturechange",".swiper-slide",e.onGestureChange,t),this.$wrapperEl.on("gestureend",".swiper-slide",e.onGestureEnd,t)):"touchstart"===this.touchEvents.start&&(this.$wrapperEl.on(this.touchEvents.start,".swiper-slide",e.onGestureStart,t),this.$wrapperEl.on(this.touchEvents.move,".swiper-slide",e.onGestureChange,i),this.$wrapperEl.on(this.touchEvents.end,".swiper-slide",e.onGestureEnd,t),this.touchEvents.cancel&&this.$wrapperEl.on(this.touchEvents.cancel,".swiper-slide",e.onGestureEnd,t)),this.$wrapperEl.on(this.touchEvents.move,"."+this.params.zoom.containerClass,e.onTouchMove,i)}},disable:function(){var e=this.zoom;if(e.enabled){this.zoom.enabled=!1;var t=!("touchstart"!==this.touchEvents.start||!o.passiveListener||!this.params.passiveListeners)&&{passive:!0,capture:!1},i=!o.passiveListener||{passive:!1,capture:!0};o.gestures?(this.$wrapperEl.off("gesturestart",".swiper-slide",e.onGestureStart,t),this.$wrapperEl.off("gesturechange",".swiper-slide",e.onGestureChange,t),this.$wrapperEl.off("gestureend",".swiper-slide",e.onGestureEnd,t)):"touchstart"===this.touchEvents.start&&(this.$wrapperEl.off(this.touchEvents.start,".swiper-slide",e.onGestureStart,t),this.$wrapperEl.off(this.touchEvents.move,".swiper-slide",e.onGestureChange,i),this.$wrapperEl.off(this.touchEvents.end,".swiper-slide",e.onGestureEnd,t),this.touchEvents.cancel&&this.$wrapperEl.off(this.touchEvents.cancel,".swiper-slide",e.onGestureEnd,t)),this.$wrapperEl.off(this.touchEvents.move,"."+this.params.zoom.containerClass,e.onTouchMove,i)}}},le={loadInSlide:function(e,t){void 0===t&&(t=!0);var i=this,a=i.params.lazy;if(void 0!==e&&0!==i.slides.length){var r=i.virtual&&i.params.virtual.enabled?i.$wrapperEl.children("."+i.params.slideClass+'[data-swiper-slide-index="'+e+'"]'):i.slides.eq(e),n=r.find("."+a.elementClass+":not(."+a.loadedClass+"):not(."+a.loadingClass+")");!r.hasClass(a.elementClass)||r.hasClass(a.loadedClass)||r.hasClass(a.loadingClass)||(n=n.add(r[0])),0!==n.length&&n.each((function(e,n){var o=s(n);o.addClass(a.loadingClass);var l=o.attr("data-background"),d=o.attr("data-src"),h=o.attr("data-srcset"),p=o.attr("data-sizes");i.loadImage(o[0],d||l,h,p,!1,(function(){if(null!=i&&i&&(!i||i.params)&&!i.destroyed){if(l?(o.css("background-image",'url("'+l+'")'),o.removeAttr("data-background")):(h&&(o.attr("srcset",h),o.removeAttr("data-srcset")),p&&(o.attr("sizes",p),o.removeAttr("data-sizes")),d&&(o.attr("src",d),o.removeAttr("data-src"))),o.addClass(a.loadedClass).removeClass(a.loadingClass),r.find("."+a.preloaderClass).remove(),i.params.loop&&t){var e=r.attr("data-swiper-slide-index");if(r.hasClass(i.params.slideDuplicateClass)){var s=i.$wrapperEl.children('[data-swiper-slide-index="'+e+'"]:not(.'+i.params.slideDuplicateClass+")");i.lazy.loadInSlide(s.index(),!1)}else{var n=i.$wrapperEl.children("."+i.params.slideDuplicateClass+'[data-swiper-slide-index="'+e+'"]');i.lazy.loadInSlide(n.index(),!1)}}i.emit("lazyImageReady",r[0],o[0])}})),i.emit("lazyImageLoad",r[0],o[0])}))}},load:function(){var e=this,t=e.$wrapperEl,i=e.params,a=e.slides,r=e.activeIndex,n=e.virtual&&i.virtual.enabled,o=i.lazy,l=i.slidesPerView;function d(e){if(n){if(t.children("."+i.slideClass+'[data-swiper-slide-index="'+e+'"]').length)return!0}else if(a[e])return!0;return!1}function h(e){return n?s(e).attr("data-swiper-slide-index"):s(e).index()}if("auto"===l&&(l=0),e.lazy.initialImageLoaded||(e.lazy.initialImageLoaded=!0),e.params.watchSlidesVisibility)t.children("."+i.slideVisibleClass).each((function(t,i){var a=n?s(i).attr("data-swiper-slide-index"):s(i).index();e.lazy.loadInSlide(a)}));else if(l>1)for(var p=r;p<r+l;p+=1)d(p)&&e.lazy.loadInSlide(p);else e.lazy.loadInSlide(r);if(o.loadPrevNext)if(l>1||o.loadPrevNextAmount&&o.loadPrevNextAmount>1){for(var c=o.loadPrevNextAmount,u=l,v=Math.min(r+u+Math.max(c,u),a.length),f=Math.max(r-Math.max(u,c),0),m=r+l;m<v;m+=1)d(m)&&e.lazy.loadInSlide(m);for(var g=f;g<r;g+=1)d(g)&&e.lazy.loadInSlide(g)}else{var b=t.children("."+i.slideNextClass);b.length>0&&e.lazy.loadInSlide(h(b));var w=t.children("."+i.slidePrevClass);w.length>0&&e.lazy.loadInSlide(h(w))}}},de={LinearSpline:function(e,t){var i,s,a,r,n,o=function(e,t){for(s=-1,i=e.length;i-s>1;)e[a=i+s>>1]<=t?s=a:i=a;return i};return this.x=e,this.y=t,this.lastIndex=e.length-1,this.interpolate=function(e){return e?(n=o(this.x,e),r=n-1,(e-this.x[r])*(this.y[n]-this.y[r])/(this.x[n]-this.x[r])+this.y[r]):0},this},getInterpolateFunction:function(e){this.controller.spline||(this.controller.spline=this.params.loop?new de.LinearSpline(this.slidesGrid,e.slidesGrid):new de.LinearSpline(this.snapGrid,e.snapGrid))},setTranslate:function(e,t){var i,s,a=this,r=a.controller.control;function n(e){var t=a.rtlTranslate?-a.translate:a.translate;"slide"===a.params.controller.by&&(a.controller.getInterpolateFunction(e),s=-a.controller.spline.interpolate(-t)),s&&"container"!==a.params.controller.by||(i=(e.maxTranslate()-e.minTranslate())/(a.maxTranslate()-a.minTranslate()),s=(t-a.minTranslate())*i+e.minTranslate()),a.params.controller.inverse&&(s=e.maxTranslate()-s),e.updateProgress(s),e.setTranslate(s,a),e.updateActiveIndex(),e.updateSlidesClasses()}if(Array.isArray(r))for(var o=0;o<r.length;o+=1)r[o]!==t&&r[o]instanceof W&&n(r[o]);else r instanceof W&&t!==r&&n(r)},setTransition:function(e,t){var i,s=this,a=s.controller.control;function r(t){t.setTransition(e,s),0!==e&&(t.transitionStart(),t.params.autoHeight&&n.nextTick((function(){t.updateAutoHeight()})),t.$wrapperEl.transitionEnd((function(){a&&(t.params.loop&&"slide"===s.params.controller.by&&t.loopFix(),t.transitionEnd())})))}if(Array.isArray(a))for(i=0;i<a.length;i+=1)a[i]!==t&&a[i]instanceof W&&r(a[i]);else a instanceof W&&t!==a&&r(a)}},he={makeElFocusable:function(e){return e.attr("tabIndex","0"),e},addElRole:function(e,t){return e.attr("role",t),e},addElLabel:function(e,t){return e.attr("aria-label",t),e},disableEl:function(e){return e.attr("aria-disabled",!0),e},enableEl:function(e){return e.attr("aria-disabled",!1),e},onEnterKey:function(e){var t=this.params.a11y;if(13===e.keyCode){var i=s(e.target);this.navigation&&this.navigation.$nextEl&&i.is(this.navigation.$nextEl)&&(this.isEnd&&!this.params.loop||this.slideNext(),this.isEnd?this.a11y.notify(t.lastSlideMessage):this.a11y.notify(t.nextSlideMessage)),this.navigation&&this.navigation.$prevEl&&i.is(this.navigation.$prevEl)&&(this.isBeginning&&!this.params.loop||this.slidePrev(),this.isBeginning?this.a11y.notify(t.firstSlideMessage):this.a11y.notify(t.prevSlideMessage)),this.pagination&&i.is("."+this.params.pagination.bulletClass)&&i[0].click()}},notify:function(e){var t=this.a11y.liveRegion;0!==t.length&&(t.html(""),t.html(e))},updateNavigation:function(){if(!this.params.loop&&this.navigation){var e=this.navigation,t=e.$nextEl,i=e.$prevEl;i&&i.length>0&&(this.isBeginning?this.a11y.disableEl(i):this.a11y.enableEl(i)),t&&t.length>0&&(this.isEnd?this.a11y.disableEl(t):this.a11y.enableEl(t))}},updatePagination:function(){var e=this,t=e.params.a11y;e.pagination&&e.params.pagination.clickable&&e.pagination.bullets&&e.pagination.bullets.length&&e.pagination.bullets.each((function(i,a){var r=s(a);e.a11y.makeElFocusable(r),e.a11y.addElRole(r,"button"),e.a11y.addElLabel(r,t.paginationBulletMessage.replace(/{{index}}/,r.index()+1))}))},init:function(){this.$el.append(this.a11y.liveRegion);var e,t,i=this.params.a11y;this.navigation&&this.navigation.$nextEl&&(e=this.navigation.$nextEl),this.navigation&&this.navigation.$prevEl&&(t=this.navigation.$prevEl),e&&(this.a11y.makeElFocusable(e),this.a11y.addElRole(e,"button"),this.a11y.addElLabel(e,i.nextSlideMessage),e.on("keydown",this.a11y.onEnterKey)),t&&(this.a11y.makeElFocusable(t),this.a11y.addElRole(t,"button"),this.a11y.addElLabel(t,i.prevSlideMessage),t.on("keydown",this.a11y.onEnterKey)),this.pagination&&this.params.pagination.clickable&&this.pagination.bullets&&this.pagination.bullets.length&&this.pagination.$el.on("keydown","."+this.params.pagination.bulletClass,this.a11y.onEnterKey)},destroy:function(){var e,t;this.a11y.liveRegion&&this.a11y.liveRegion.length>0&&this.a11y.liveRegion.remove(),this.navigation&&this.navigation.$nextEl&&(e=this.navigation.$nextEl),this.navigation&&this.navigation.$prevEl&&(t=this.navigation.$prevEl),e&&e.off("keydown",this.a11y.onEnterKey),t&&t.off("keydown",this.a11y.onEnterKey),this.pagination&&this.params.pagination.clickable&&this.pagination.bullets&&this.pagination.bullets.length&&this.pagination.$el.off("keydown","."+this.params.pagination.bulletClass,this.a11y.onEnterKey)}},pe={init:function(){if(this.params.history){if(!t.history||!t.history.pushState)return this.params.history.enabled=!1,void(this.params.hashNavigation.enabled=!0);var e=this.history;e.initialized=!0,e.paths=pe.getPathValues(),(e.paths.key||e.paths.value)&&(e.scrollToSlide(0,e.paths.value,this.params.runCallbacksOnInit),this.params.history.replaceState||t.addEventListener("popstate",this.history.setHistoryPopState))}},destroy:function(){this.params.history.replaceState||t.removeEventListener("popstate",this.history.setHistoryPopState)},setHistoryPopState:function(){this.history.paths=pe.getPathValues(),this.history.scrollToSlide(this.params.speed,this.history.paths.value,!1)},getPathValues:function(){var e=t.location.pathname.slice(1).split("/").filter((function(e){return""!==e})),i=e.length;return{key:e[i-2],value:e[i-1]}},setHistory:function(e,i){if(this.history.initialized&&this.params.history.enabled){var s=this.slides.eq(i),a=pe.slugify(s.attr("data-history"));t.location.pathname.includes(e)||(a=e+"/"+a);var r=t.history.state;r&&r.value===a||(this.params.history.replaceState?t.history.replaceState({value:a},null,a):t.history.pushState({value:a},null,a))}},slugify:function(e){return e.toString().replace(/\s+/g,"-").replace(/[^\w-]+/g,"").replace(/--+/g,"-").replace(/^-+/,"").replace(/-+$/,"")},scrollToSlide:function(e,t,i){if(t)for(var s=0,a=this.slides.length;s<a;s+=1){var r=this.slides.eq(s);if(pe.slugify(r.attr("data-history"))===t&&!r.hasClass(this.params.slideDuplicateClass)){var n=r.index();this.slideTo(n,e,i)}}else this.slideTo(0,e,i)}},ce={onHashCange:function(){var t=e.location.hash.replace("#","");if(t!==this.slides.eq(this.activeIndex).attr("data-hash")){var i=this.$wrapperEl.children("."+this.params.slideClass+'[data-hash="'+t+'"]').index();if(void 0===i)return;this.slideTo(i)}},setHash:function(){if(this.hashNavigation.initialized&&this.params.hashNavigation.enabled)if(this.params.hashNavigation.replaceState&&t.history&&t.history.replaceState)t.history.replaceState(null,null,"#"+this.slides.eq(this.activeIndex).attr("data-hash")||"");else{var i=this.slides.eq(this.activeIndex),s=i.attr("data-hash")||i.attr("data-history");e.location.hash=s||""}},init:function(){if(!(!this.params.hashNavigation.enabled||this.params.history&&this.params.history.enabled)){this.hashNavigation.initialized=!0;var i=e.location.hash.replace("#","");if(i)for(var a=0,r=this.slides.length;a<r;a+=1){var n=this.slides.eq(a);if((n.attr("data-hash")||n.attr("data-history"))===i&&!n.hasClass(this.params.slideDuplicateClass)){var o=n.index();this.slideTo(o,0,this.params.runCallbacksOnInit,!0)}}this.params.hashNavigation.watchState&&s(t).on("hashchange",this.hashNavigation.onHashCange)}},destroy:function(){this.params.hashNavigation.watchState&&s(t).off("hashchange",this.hashNavigation.onHashCange)}},ue={run:function(){var e=this,t=e.slides.eq(e.activeIndex),i=e.params.autoplay.delay;t.attr("data-swiper-autoplay")&&(i=t.attr("data-swiper-autoplay")||e.params.autoplay.delay),clearTimeout(e.autoplay.timeout),e.autoplay.timeout=n.nextTick((function(){e.params.autoplay.reverseDirection?e.params.loop?(e.loopFix(),e.slidePrev(e.params.speed,!0,!0),e.emit("autoplay")):e.isBeginning?e.params.autoplay.stopOnLastSlide?e.autoplay.stop():(e.slideTo(e.slides.length-1,e.params.speed,!0,!0),e.emit("autoplay")):(e.slidePrev(e.params.speed,!0,!0),e.emit("autoplay")):e.params.loop?(e.loopFix(),e.slideNext(e.params.speed,!0,!0),e.emit("autoplay")):e.isEnd?e.params.autoplay.stopOnLastSlide?e.autoplay.stop():(e.slideTo(0,e.params.speed,!0,!0),e.emit("autoplay")):(e.slideNext(e.params.speed,!0,!0),e.emit("autoplay")),e.params.cssMode&&e.autoplay.running&&e.autoplay.run()}),i)},start:function(){return void 0===this.autoplay.timeout&&(!this.autoplay.running&&(this.autoplay.running=!0,this.emit("autoplayStart"),this.autoplay.run(),!0))},stop:function(){return!!this.autoplay.running&&(void 0!==this.autoplay.timeout&&(this.autoplay.timeout&&(clearTimeout(this.autoplay.timeout),this.autoplay.timeout=void 0),this.autoplay.running=!1,this.emit("autoplayStop"),!0))},pause:function(e){this.autoplay.running&&(this.autoplay.paused||(this.autoplay.timeout&&clearTimeout(this.autoplay.timeout),this.autoplay.paused=!0,0!==e&&this.params.autoplay.waitForTransition?(this.$wrapperEl[0].addEventListener("transitionend",this.autoplay.onTransitionEnd),this.$wrapperEl[0].addEventListener("webkitTransitionEnd",this.autoplay.onTransitionEnd)):(this.autoplay.paused=!1,this.autoplay.run())))}},ve={setTranslate:function(){for(var e=this.slides,t=0;t<e.length;t+=1){var i=this.slides.eq(t),s=-i[0].swiperSlideOffset;this.params.virtualTranslate||(s-=this.translate);var a=0;this.isHorizontal()||(a=s,s=0);var r=this.params.fadeEffect.crossFade?Math.max(1-Math.abs(i[0].progress),0):1+Math.min(Math.max(i[0].progress,-1),0);i.css({opacity:r}).transform("translate3d("+s+"px, "+a+"px, 0px)")}},setTransition:function(e){var t=this,i=t.slides,s=t.$wrapperEl;if(i.transition(e),t.params.virtualTranslate&&0!==e){var a=!1;i.transitionEnd((function(){if(!a&&t&&!t.destroyed){a=!0,t.animating=!1;for(var e=["webkitTransitionEnd","transitionend"],i=0;i<e.length;i+=1)s.trigger(e[i])}}))}}},fe={setTranslate:function(){var e,t=this.$el,i=this.$wrapperEl,a=this.slides,r=this.width,n=this.height,o=this.rtlTranslate,l=this.size,d=this.params.cubeEffect,h=this.isHorizontal(),p=this.virtual&&this.params.virtual.enabled,c=0;d.shadow&&(h?(0===(e=i.find(".swiper-cube-shadow")).length&&(e=s('<div class="swiper-cube-shadow"></div>'),i.append(e)),e.css({height:r+"px"})):0===(e=t.find(".swiper-cube-shadow")).length&&(e=s('<div class="swiper-cube-shadow"></div>'),t.append(e)));for(var u=0;u<a.length;u+=1){var v=a.eq(u),f=u;p&&(f=parseInt(v.attr("data-swiper-slide-index"),10));var m=90*f,g=Math.floor(m/360);o&&(m=-m,g=Math.floor(-m/360));var b=Math.max(Math.min(v[0].progress,1),-1),w=0,y=0,x=0;f%4==0?(w=4*-g*l,x=0):(f-1)%4==0?(w=0,x=4*-g*l):(f-2)%4==0?(w=l+4*g*l,x=l):(f-3)%4==0&&(w=-l,x=3*l+4*l*g),o&&(w=-w),h||(y=w,w=0);var T="rotateX("+(h?0:-m)+"deg) rotateY("+(h?m:0)+"deg) translate3d("+w+"px, "+y+"px, "+x+"px)";if(b<=1&&b>-1&&(c=90*f+90*b,o&&(c=90*-f-90*b)),v.transform(T),d.slideShadows){var E=h?v.find(".swiper-slide-shadow-left"):v.find(".swiper-slide-shadow-top"),S=h?v.find(".swiper-slide-shadow-right"):v.find(".swiper-slide-shadow-bottom");0===E.length&&(E=s('<div class="swiper-slide-shadow-'+(h?"left":"top")+'"></div>'),v.append(E)),0===S.length&&(S=s('<div class="swiper-slide-shadow-'+(h?"right":"bottom")+'"></div>'),v.append(S)),E.length&&(E[0].style.opacity=Math.max(-b,0)),S.length&&(S[0].style.opacity=Math.max(b,0))}}if(i.css({"-webkit-transform-origin":"50% 50% -"+l/2+"px","-moz-transform-origin":"50% 50% -"+l/2+"px","-ms-transform-origin":"50% 50% -"+l/2+"px","transform-origin":"50% 50% -"+l/2+"px"}),d.shadow)if(h)e.transform("translate3d(0px, "+(r/2+d.shadowOffset)+"px, "+-r/2+"px) rotateX(90deg) rotateZ(0deg) scale("+d.shadowScale+")");else{var C=Math.abs(c)-90*Math.floor(Math.abs(c)/90),M=1.5-(Math.sin(2*C*Math.PI/360)/2+Math.cos(2*C*Math.PI/360)/2),P=d.shadowScale,z=d.shadowScale/M,k=d.shadowOffset;e.transform("scale3d("+P+", 1, "+z+") translate3d(0px, "+(n/2+k)+"px, "+-n/2/z+"px) rotateX(-90deg)")}var $=j.isSafari||j.isUiWebView?-l/2:0;i.transform("translate3d(0px,0,"+$+"px) rotateX("+(this.isHorizontal()?0:c)+"deg) rotateY("+(this.isHorizontal()?-c:0)+"deg)")},setTransition:function(e){var t=this.$el;this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),this.params.cubeEffect.shadow&&!this.isHorizontal()&&t.find(".swiper-cube-shadow").transition(e)}},me={setTranslate:function(){for(var e=this.slides,t=this.rtlTranslate,i=0;i<e.length;i+=1){var a=e.eq(i),r=a[0].progress;this.params.flipEffect.limitRotation&&(r=Math.max(Math.min(a[0].progress,1),-1));var n=-180*r,o=0,l=-a[0].swiperSlideOffset,d=0;if(this.isHorizontal()?t&&(n=-n):(d=l,l=0,o=-n,n=0),a[0].style.zIndex=-Math.abs(Math.round(r))+e.length,this.params.flipEffect.slideShadows){var h=this.isHorizontal()?a.find(".swiper-slide-shadow-left"):a.find(".swiper-slide-shadow-top"),p=this.isHorizontal()?a.find(".swiper-slide-shadow-right"):a.find(".swiper-slide-shadow-bottom");0===h.length&&(h=s('<div class="swiper-slide-shadow-'+(this.isHorizontal()?"left":"top")+'"></div>'),a.append(h)),0===p.length&&(p=s('<div class="swiper-slide-shadow-'+(this.isHorizontal()?"right":"bottom")+'"></div>'),a.append(p)),h.length&&(h[0].style.opacity=Math.max(-r,0)),p.length&&(p[0].style.opacity=Math.max(r,0))}a.transform("translate3d("+l+"px, "+d+"px, 0px) rotateX("+o+"deg) rotateY("+n+"deg)")}},setTransition:function(e){var t=this,i=t.slides,s=t.activeIndex,a=t.$wrapperEl;if(i.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),t.params.virtualTranslate&&0!==e){var r=!1;i.eq(s).transitionEnd((function(){if(!r&&t&&!t.destroyed){r=!0,t.animating=!1;for(var e=["webkitTransitionEnd","transitionend"],i=0;i<e.length;i+=1)a.trigger(e[i])}}))}}},ge={setTranslate:function(){for(var e=this.width,t=this.height,i=this.slides,a=this.$wrapperEl,r=this.slidesSizesGrid,n=this.params.coverflowEffect,l=this.isHorizontal(),d=this.translate,h=l?e/2-d:t/2-d,p=l?n.rotate:-n.rotate,c=n.depth,u=0,v=i.length;u<v;u+=1){var f=i.eq(u),m=r[u],g=(h-f[0].swiperSlideOffset-m/2)/m*n.modifier,b=l?p*g:0,w=l?0:p*g,y=-c*Math.abs(g),x=l?0:n.stretch*g,T=l?n.stretch*g:0;Math.abs(T)<.001&&(T=0),Math.abs(x)<.001&&(x=0),Math.abs(y)<.001&&(y=0),Math.abs(b)<.001&&(b=0),Math.abs(w)<.001&&(w=0);var E="translate3d("+T+"px,"+x+"px,"+y+"px)  rotateX("+w+"deg) rotateY("+b+"deg)";if(f.transform(E),f[0].style.zIndex=1-Math.abs(Math.round(g)),n.slideShadows){var S=l?f.find(".swiper-slide-shadow-left"):f.find(".swiper-slide-shadow-top"),C=l?f.find(".swiper-slide-shadow-right"):f.find(".swiper-slide-shadow-bottom");0===S.length&&(S=s('<div class="swiper-slide-shadow-'+(l?"left":"top")+'"></div>'),f.append(S)),0===C.length&&(C=s('<div class="swiper-slide-shadow-'+(l?"right":"bottom")+'"></div>'),f.append(C)),S.length&&(S[0].style.opacity=g>0?g:0),C.length&&(C[0].style.opacity=-g>0?-g:0)}}(o.pointerEvents||o.prefixedPointerEvents)&&(a[0].style.perspectiveOrigin=h+"px 50%")},setTransition:function(e){this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)}},be={init:function(){var e=this.params.thumbs,t=this.constructor;e.swiper instanceof t?(this.thumbs.swiper=e.swiper,n.extend(this.thumbs.swiper.originalParams,{watchSlidesProgress:!0,slideToClickedSlide:!1}),n.extend(this.thumbs.swiper.params,{watchSlidesProgress:!0,slideToClickedSlide:!1})):n.isObject(e.swiper)&&(this.thumbs.swiper=new t(n.extend({},e.swiper,{watchSlidesVisibility:!0,watchSlidesProgress:!0,slideToClickedSlide:!1})),this.thumbs.swiperCreated=!0),this.thumbs.swiper.$el.addClass(this.params.thumbs.thumbsContainerClass),this.thumbs.swiper.on("tap",this.thumbs.onThumbClick)},onThumbClick:function(){var e=this.thumbs.swiper;if(e){var t=e.clickedIndex,i=e.clickedSlide;if(!(i&&s(i).hasClass(this.params.thumbs.slideThumbActiveClass)||null==t)){var a;if(a=e.params.loop?parseInt(s(e.clickedSlide).attr("data-swiper-slide-index"),10):t,this.params.loop){var r=this.activeIndex;this.slides.eq(r).hasClass(this.params.slideDuplicateClass)&&(this.loopFix(),this._clientLeft=this.$wrapperEl[0].clientLeft,r=this.activeIndex);var n=this.slides.eq(r).prevAll('[data-swiper-slide-index="'+a+'"]').eq(0).index(),o=this.slides.eq(r).nextAll('[data-swiper-slide-index="'+a+'"]').eq(0).index();a=void 0===n?o:void 0===o?n:o-r<r-n?o:n}this.slideTo(a)}}},update:function(e){var t=this.thumbs.swiper;if(t){var i="auto"===t.params.slidesPerView?t.slidesPerViewDynamic():t.params.slidesPerView;if(this.realIndex!==t.realIndex){var s,a=t.activeIndex;if(t.params.loop){t.slides.eq(a).hasClass(t.params.slideDuplicateClass)&&(t.loopFix(),t._clientLeft=t.$wrapperEl[0].clientLeft,a=t.activeIndex);var r=t.slides.eq(a).prevAll('[data-swiper-slide-index="'+this.realIndex+'"]').eq(0).index(),n=t.slides.eq(a).nextAll('[data-swiper-slide-index="'+this.realIndex+'"]').eq(0).index();s=void 0===r?n:void 0===n?r:n-a==a-r?a:n-a<a-r?n:r}else s=this.realIndex;t.visibleSlidesIndexes&&t.visibleSlidesIndexes.indexOf(s)<0&&(t.params.centeredSlides?s=s>a?s-Math.floor(i/2)+1:s+Math.floor(i/2)-1:s>a&&(s=s-i+1),t.slideTo(s,e?0:void 0))}var o=1,l=this.params.thumbs.slideThumbActiveClass;if(this.params.slidesPerView>1&&!this.params.centeredSlides&&(o=this.params.slidesPerView),this.params.thumbs.multipleActiveThumbs||(o=1),o=Math.floor(o),t.slides.removeClass(l),t.params.loop||t.params.virtual&&t.params.virtual.enabled)for(var d=0;d<o;d+=1)t.$wrapperEl.children('[data-swiper-slide-index="'+(this.realIndex+d)+'"]').addClass(l);else for(var h=0;h<o;h+=1)t.slides.eq(this.realIndex+h).addClass(l)}}},we=[R,q,K,U,Z,J,te,{name:"mousewheel",params:{mousewheel:{enabled:!1,releaseOnEdges:!1,invert:!1,forceToAxis:!1,sensitivity:1,eventsTarged:"container"}},create:function(){n.extend(this,{mousewheel:{enabled:!1,enable:ie.enable.bind(this),disable:ie.disable.bind(this),handle:ie.handle.bind(this),handleMouseEnter:ie.handleMouseEnter.bind(this),handleMouseLeave:ie.handleMouseLeave.bind(this),animateSlider:ie.animateSlider.bind(this),releaseScroll:ie.releaseScroll.bind(this),lastScrollTime:n.now(),lastEventBeforeSnap:void 0,recentWheelEvents:[]}})},on:{init:function(){!this.params.mousewheel.enabled&&this.params.cssMode&&this.mousewheel.disable(),this.params.mousewheel.enabled&&this.mousewheel.enable()},destroy:function(){this.params.cssMode&&this.mousewheel.enable(),this.mousewheel.enabled&&this.mousewheel.disable()}}},{name:"navigation",params:{navigation:{nextEl:null,prevEl:null,hideOnClick:!1,disabledClass:"swiper-button-disabled",hiddenClass:"swiper-button-hidden",lockClass:"swiper-button-lock"}},create:function(){n.extend(this,{navigation:{init:se.init.bind(this),update:se.update.bind(this),destroy:se.destroy.bind(this),onNextClick:se.onNextClick.bind(this),onPrevClick:se.onPrevClick.bind(this)}})},on:{init:function(){this.navigation.init(),this.navigation.update()},toEdge:function(){this.navigation.update()},fromEdge:function(){this.navigation.update()},destroy:function(){this.navigation.destroy()},click:function(e){var t,i=this.navigation,a=i.$nextEl,r=i.$prevEl;!this.params.navigation.hideOnClick||s(e.target).is(r)||s(e.target).is(a)||(a?t=a.hasClass(this.params.navigation.hiddenClass):r&&(t=r.hasClass(this.params.navigation.hiddenClass)),!0===t?this.emit("navigationShow",this):this.emit("navigationHide",this),a&&a.toggleClass(this.params.navigation.hiddenClass),r&&r.toggleClass(this.params.navigation.hiddenClass))}}},{name:"pagination",params:{pagination:{el:null,bulletElement:"span",clickable:!1,hideOnClick:!1,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,progressbarOpposite:!1,type:"bullets",dynamicBullets:!1,dynamicMainBullets:1,formatFractionCurrent:function(e){return e},formatFractionTotal:function(e){return e},bulletClass:"swiper-pagination-bullet",bulletActiveClass:"swiper-pagination-bullet-active",modifierClass:"swiper-pagination-",currentClass:"swiper-pagination-current",totalClass:"swiper-pagination-total",hiddenClass:"swiper-pagination-hidden",progressbarFillClass:"swiper-pagination-progressbar-fill",progressbarOppositeClass:"swiper-pagination-progressbar-opposite",clickableClass:"swiper-pagination-clickable",lockClass:"swiper-pagination-lock"}},create:function(){n.extend(this,{pagination:{init:ae.init.bind(this),render:ae.render.bind(this),update:ae.update.bind(this),destroy:ae.destroy.bind(this),dynamicBulletIndex:0}})},on:{init:function(){this.pagination.init(),this.pagination.render(),this.pagination.update()},activeIndexChange:function(){this.params.loop?this.pagination.update():void 0===this.snapIndex&&this.pagination.update()},snapIndexChange:function(){this.params.loop||this.pagination.update()},slidesLengthChange:function(){this.params.loop&&(this.pagination.render(),this.pagination.update())},snapGridLengthChange:function(){this.params.loop||(this.pagination.render(),this.pagination.update())},destroy:function(){this.pagination.destroy()},click:function(e){this.params.pagination.el&&this.params.pagination.hideOnClick&&this.pagination.$el.length>0&&!s(e.target).hasClass(this.params.pagination.bulletClass)&&(!0===this.pagination.$el.hasClass(this.params.pagination.hiddenClass)?this.emit("paginationShow",this):this.emit("paginationHide",this),this.pagination.$el.toggleClass(this.params.pagination.hiddenClass))}}},{name:"scrollbar",params:{scrollbar:{el:null,dragSize:"auto",hide:!1,draggable:!1,snapOnRelease:!0,lockClass:"swiper-scrollbar-lock",dragClass:"swiper-scrollbar-drag"}},create:function(){n.extend(this,{scrollbar:{init:re.init.bind(this),destroy:re.destroy.bind(this),updateSize:re.updateSize.bind(this),setTranslate:re.setTranslate.bind(this),setTransition:re.setTransition.bind(this),enableDraggable:re.enableDraggable.bind(this),disableDraggable:re.disableDraggable.bind(this),setDragPosition:re.setDragPosition.bind(this),getPointerPosition:re.getPointerPosition.bind(this),onDragStart:re.onDragStart.bind(this),onDragMove:re.onDragMove.bind(this),onDragEnd:re.onDragEnd.bind(this),isTouched:!1,timeout:null,dragTimeout:null}})},on:{init:function(){this.scrollbar.init(),this.scrollbar.updateSize(),this.scrollbar.setTranslate()},update:function(){this.scrollbar.updateSize()},resize:function(){this.scrollbar.updateSize()},observerUpdate:function(){this.scrollbar.updateSize()},setTranslate:function(){this.scrollbar.setTranslate()},setTransition:function(e){this.scrollbar.setTransition(e)},destroy:function(){this.scrollbar.destroy()}}},{name:"parallax",params:{parallax:{enabled:!1}},create:function(){n.extend(this,{parallax:{setTransform:ne.setTransform.bind(this),setTranslate:ne.setTranslate.bind(this),setTransition:ne.setTransition.bind(this)}})},on:{beforeInit:function(){this.params.parallax.enabled&&(this.params.watchSlidesProgress=!0,this.originalParams.watchSlidesProgress=!0)},init:function(){this.params.parallax.enabled&&this.parallax.setTranslate()},setTranslate:function(){this.params.parallax.enabled&&this.parallax.setTranslate()},setTransition:function(e){this.params.parallax.enabled&&this.parallax.setTransition(e)}}},{name:"zoom",params:{zoom:{enabled:!1,maxRatio:3,minRatio:1,toggle:!0,containerClass:"swiper-zoom-container",zoomedSlideClass:"swiper-slide-zoomed"}},create:function(){var e=this,t={enabled:!1,scale:1,currentScale:1,isScaling:!1,gesture:{$slideEl:void 0,slideWidth:void 0,slideHeight:void 0,$imageEl:void 0,$imageWrapEl:void 0,maxRatio:3},image:{isTouched:void 0,isMoved:void 0,currentX:void 0,currentY:void 0,minX:void 0,minY:void 0,maxX:void 0,maxY:void 0,width:void 0,height:void 0,startX:void 0,startY:void 0,touchesStart:{},touchesCurrent:{}},velocity:{x:void 0,y:void 0,prevPositionX:void 0,prevPositionY:void 0,prevTime:void 0}};"onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach((function(i){t[i]=oe[i].bind(e)})),n.extend(e,{zoom:t});var i=1;Object.defineProperty(e.zoom,"scale",{get:function(){return i},set:function(t){if(i!==t){var s=e.zoom.gesture.$imageEl?e.zoom.gesture.$imageEl[0]:void 0,a=e.zoom.gesture.$slideEl?e.zoom.gesture.$slideEl[0]:void 0;e.emit("zoomChange",t,s,a)}i=t}})},on:{init:function(){this.params.zoom.enabled&&this.zoom.enable()},destroy:function(){this.zoom.disable()},touchStart:function(e){this.zoom.enabled&&this.zoom.onTouchStart(e)},touchEnd:function(e){this.zoom.enabled&&this.zoom.onTouchEnd(e)},doubleTap:function(e){this.params.zoom.enabled&&this.zoom.enabled&&this.params.zoom.toggle&&this.zoom.toggle(e)},transitionEnd:function(){this.zoom.enabled&&this.params.zoom.enabled&&this.zoom.onTransitionEnd()},slideChange:function(){this.zoom.enabled&&this.params.zoom.enabled&&this.params.cssMode&&this.zoom.onTransitionEnd()}}},{name:"lazy",params:{lazy:{enabled:!1,loadPrevNext:!1,loadPrevNextAmount:1,loadOnTransitionStart:!1,elementClass:"swiper-lazy",loadingClass:"swiper-lazy-loading",loadedClass:"swiper-lazy-loaded",preloaderClass:"swiper-lazy-preloader"}},create:function(){n.extend(this,{lazy:{initialImageLoaded:!1,load:le.load.bind(this),loadInSlide:le.loadInSlide.bind(this)}})},on:{beforeInit:function(){this.params.lazy.enabled&&this.params.preloadImages&&(this.params.preloadImages=!1)},init:function(){this.params.lazy.enabled&&!this.params.loop&&0===this.params.initialSlide&&this.lazy.load()},scroll:function(){this.params.freeMode&&!this.params.freeModeSticky&&this.lazy.load()},resize:function(){this.params.lazy.enabled&&this.lazy.load()},scrollbarDragMove:function(){this.params.lazy.enabled&&this.lazy.load()},transitionStart:function(){this.params.lazy.enabled&&(this.params.lazy.loadOnTransitionStart||!this.params.lazy.loadOnTransitionStart&&!this.lazy.initialImageLoaded)&&this.lazy.load()},transitionEnd:function(){this.params.lazy.enabled&&!this.params.lazy.loadOnTransitionStart&&this.lazy.load()},slideChange:function(){this.params.lazy.enabled&&this.params.cssMode&&this.lazy.load()}}},{name:"controller",params:{controller:{control:void 0,inverse:!1,by:"slide"}},create:function(){n.extend(this,{controller:{control:this.params.controller.control,getInterpolateFunction:de.getInterpolateFunction.bind(this),setTranslate:de.setTranslate.bind(this),setTransition:de.setTransition.bind(this)}})},on:{update:function(){this.controller.control&&this.controller.spline&&(this.controller.spline=void 0,delete this.controller.spline)},resize:function(){this.controller.control&&this.controller.spline&&(this.controller.spline=void 0,delete this.controller.spline)},observerUpdate:function(){this.controller.control&&this.controller.spline&&(this.controller.spline=void 0,delete this.controller.spline)},setTranslate:function(e,t){this.controller.control&&this.controller.setTranslate(e,t)},setTransition:function(e,t){this.controller.control&&this.controller.setTransition(e,t)}}},{name:"a11y",params:{a11y:{enabled:!0,notificationClass:"swiper-notification",prevSlideMessage:"Previous slide",nextSlideMessage:"Next slide",firstSlideMessage:"This is the first slide",lastSlideMessage:"This is the last slide",paginationBulletMessage:"Go to slide {{index}}"}},create:function(){var e=this;n.extend(e,{a11y:{liveRegion:s('<span class="'+e.params.a11y.notificationClass+'" aria-live="assertive" aria-atomic="true"></span>')}}),Object.keys(he).forEach((function(t){e.a11y[t]=he[t].bind(e)}))},on:{init:function(){this.params.a11y.enabled&&(this.a11y.init(),this.a11y.updateNavigation())},toEdge:function(){this.params.a11y.enabled&&this.a11y.updateNavigation()},fromEdge:function(){this.params.a11y.enabled&&this.a11y.updateNavigation()},paginationUpdate:function(){this.params.a11y.enabled&&this.a11y.updatePagination()},destroy:function(){this.params.a11y.enabled&&this.a11y.destroy()}}},{name:"history",params:{history:{enabled:!1,replaceState:!1,key:"slides"}},create:function(){n.extend(this,{history:{init:pe.init.bind(this),setHistory:pe.setHistory.bind(this),setHistoryPopState:pe.setHistoryPopState.bind(this),scrollToSlide:pe.scrollToSlide.bind(this),destroy:pe.destroy.bind(this)}})},on:{init:function(){this.params.history.enabled&&this.history.init()},destroy:function(){this.params.history.enabled&&this.history.destroy()},transitionEnd:function(){this.history.initialized&&this.history.setHistory(this.params.history.key,this.activeIndex)},slideChange:function(){this.history.initialized&&this.params.cssMode&&this.history.setHistory(this.params.history.key,this.activeIndex)}}},{name:"hash-navigation",params:{hashNavigation:{enabled:!1,replaceState:!1,watchState:!1}},create:function(){n.extend(this,{hashNavigation:{initialized:!1,init:ce.init.bind(this),destroy:ce.destroy.bind(this),setHash:ce.setHash.bind(this),onHashCange:ce.onHashCange.bind(this)}})},on:{init:function(){this.params.hashNavigation.enabled&&this.hashNavigation.init()},destroy:function(){this.params.hashNavigation.enabled&&this.hashNavigation.destroy()},transitionEnd:function(){this.hashNavigation.initialized&&this.hashNavigation.setHash()},slideChange:function(){this.hashNavigation.initialized&&this.params.cssMode&&this.hashNavigation.setHash()}}},{name:"autoplay",params:{autoplay:{enabled:!1,delay:3e3,waitForTransition:!0,disableOnInteraction:!0,stopOnLastSlide:!1,reverseDirection:!1}},create:function(){var e=this;n.extend(e,{autoplay:{running:!1,paused:!1,run:ue.run.bind(e),start:ue.start.bind(e),stop:ue.stop.bind(e),pause:ue.pause.bind(e),onVisibilityChange:function(){"hidden"===document.visibilityState&&e.autoplay.running&&e.autoplay.pause(),"visible"===document.visibilityState&&e.autoplay.paused&&(e.autoplay.run(),e.autoplay.paused=!1)},onTransitionEnd:function(t){e&&!e.destroyed&&e.$wrapperEl&&t.target===this&&(e.$wrapperEl[0].removeEventListener("transitionend",e.autoplay.onTransitionEnd),e.$wrapperEl[0].removeEventListener("webkitTransitionEnd",e.autoplay.onTransitionEnd),e.autoplay.paused=!1,e.autoplay.running?e.autoplay.run():e.autoplay.stop())}}})},on:{init:function(){this.params.autoplay.enabled&&(this.autoplay.start(),document.addEventListener("visibilitychange",this.autoplay.onVisibilityChange))},beforeTransitionStart:function(e,t){this.autoplay.running&&(t||!this.params.autoplay.disableOnInteraction?this.autoplay.pause(e):this.autoplay.stop())},sliderFirstMove:function(){this.autoplay.running&&(this.params.autoplay.disableOnInteraction?this.autoplay.stop():this.autoplay.pause())},touchEnd:function(){this.params.cssMode&&this.autoplay.paused&&!this.params.autoplay.disableOnInteraction&&this.autoplay.run()},destroy:function(){this.autoplay.running&&this.autoplay.stop(),document.removeEventListener("visibilitychange",this.autoplay.onVisibilityChange)}}},{name:"effect-fade",params:{fadeEffect:{crossFade:!1}},create:function(){n.extend(this,{fadeEffect:{setTranslate:ve.setTranslate.bind(this),setTransition:ve.setTransition.bind(this)}})},on:{beforeInit:function(){if("fade"===this.params.effect){this.classNames.push(this.params.containerModifierClass+"fade");var e={slidesPerView:1,slidesPerColumn:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!0};n.extend(this.params,e),n.extend(this.originalParams,e)}},setTranslate:function(){"fade"===this.params.effect&&this.fadeEffect.setTranslate()},setTransition:function(e){"fade"===this.params.effect&&this.fadeEffect.setTransition(e)}}},{name:"effect-cube",params:{cubeEffect:{slideShadows:!0,shadow:!0,shadowOffset:20,shadowScale:.94}},create:function(){n.extend(this,{cubeEffect:{setTranslate:fe.setTranslate.bind(this),setTransition:fe.setTransition.bind(this)}})},on:{beforeInit:function(){if("cube"===this.params.effect){this.classNames.push(this.params.containerModifierClass+"cube"),this.classNames.push(this.params.containerModifierClass+"3d");var e={slidesPerView:1,slidesPerColumn:1,slidesPerGroup:1,watchSlidesProgress:!0,resistanceRatio:0,spaceBetween:0,centeredSlides:!1,virtualTranslate:!0};n.extend(this.params,e),n.extend(this.originalParams,e)}},setTranslate:function(){"cube"===this.params.effect&&this.cubeEffect.setTranslate()},setTransition:function(e){"cube"===this.params.effect&&this.cubeEffect.setTransition(e)}}},{name:"effect-flip",params:{flipEffect:{slideShadows:!0,limitRotation:!0}},create:function(){n.extend(this,{flipEffect:{setTranslate:me.setTranslate.bind(this),setTransition:me.setTransition.bind(this)}})},on:{beforeInit:function(){if("flip"===this.params.effect){this.classNames.push(this.params.containerModifierClass+"flip"),this.classNames.push(this.params.containerModifierClass+"3d");var e={slidesPerView:1,slidesPerColumn:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!0};n.extend(this.params,e),n.extend(this.originalParams,e)}},setTranslate:function(){"flip"===this.params.effect&&this.flipEffect.setTranslate()},setTransition:function(e){"flip"===this.params.effect&&this.flipEffect.setTransition(e)}}},{name:"effect-coverflow",params:{coverflowEffect:{rotate:50,stretch:0,depth:100,modifier:1,slideShadows:!0}},create:function(){n.extend(this,{coverflowEffect:{setTranslate:ge.setTranslate.bind(this),setTransition:ge.setTransition.bind(this)}})},on:{beforeInit:function(){"coverflow"===this.params.effect&&(this.classNames.push(this.params.containerModifierClass+"coverflow"),this.classNames.push(this.params.containerModifierClass+"3d"),this.params.watchSlidesProgress=!0,this.originalParams.watchSlidesProgress=!0)},setTranslate:function(){"coverflow"===this.params.effect&&this.coverflowEffect.setTranslate()},setTransition:function(e){"coverflow"===this.params.effect&&this.coverflowEffect.setTransition(e)}}},{name:"thumbs",params:{thumbs:{multipleActiveThumbs:!0,swiper:null,slideThumbActiveClass:"swiper-slide-thumb-active",thumbsContainerClass:"swiper-container-thumbs"}},create:function(){n.extend(this,{thumbs:{swiper:null,init:be.init.bind(this),update:be.update.bind(this),onThumbClick:be.onThumbClick.bind(this)}})},on:{beforeInit:function(){var e=this.params.thumbs;e&&e.swiper&&(this.thumbs.init(),this.thumbs.update(!0))},slideChange:function(){this.thumbs.swiper&&this.thumbs.update()},update:function(){this.thumbs.swiper&&this.thumbs.update()},resize:function(){this.thumbs.swiper&&this.thumbs.update()},observerUpdate:function(){this.thumbs.swiper&&this.thumbs.update()},setTransition:function(e){var t=this.thumbs.swiper;t&&t.setTransition(e)},beforeDestroy:function(){var e=this.thumbs.swiper;e&&this.thumbs.swiperCreated&&e&&e.destroy()}}}];return void 0===W.use&&(W.use=W.Class.use,W.installModule=W.Class.installModule),W.use(we),W}));
//# sourceMappingURL=swiper.min.js.map
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.AOS=t():e.AOS=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="dist/",t(0)}([function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=n(1),a=(o(r),n(6)),u=o(a),c=n(7),s=o(c),f=n(8),d=o(f),l=n(9),p=o(l),m=n(10),b=o(m),v=n(11),y=o(v),g=n(14),h=o(g),w=[],k=!1,x={offset:120,delay:0,easing:"ease",duration:400,disable:!1,once:!1,startEvent:"DOMContentLoaded",throttleDelay:99,debounceDelay:50,disableMutationObserver:!1},j=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(e&&(k=!0),k)return w=(0,y.default)(w,x),(0,b.default)(w,x.once),w},O=function(){w=(0,h.default)(),j()},M=function(){w.forEach(function(e,t){e.node.removeAttribute("data-aos"),e.node.removeAttribute("data-aos-easing"),e.node.removeAttribute("data-aos-duration"),e.node.removeAttribute("data-aos-delay")})},S=function(e){return e===!0||"mobile"===e&&p.default.mobile()||"phone"===e&&p.default.phone()||"tablet"===e&&p.default.tablet()||"function"==typeof e&&e()===!0},_=function(e){x=i(x,e),w=(0,h.default)();var t=document.all&&!window.atob;return S(x.disable)||t?M():(x.disableMutationObserver||d.default.isSupported()||(console.info('\n      aos: MutationObserver is not supported on this browser,\n      code mutations observing has been disabled.\n      You may have to call "refreshHard()" by yourself.\n    '),x.disableMutationObserver=!0),document.querySelector("body").setAttribute("data-aos-easing",x.easing),document.querySelector("body").setAttribute("data-aos-duration",x.duration),document.querySelector("body").setAttribute("data-aos-delay",x.delay),"DOMContentLoaded"===x.startEvent&&["complete","interactive"].indexOf(document.readyState)>-1?j(!0):"load"===x.startEvent?window.addEventListener(x.startEvent,function(){j(!0)}):document.addEventListener(x.startEvent,function(){j(!0)}),window.addEventListener("resize",(0,s.default)(j,x.debounceDelay,!0)),window.addEventListener("orientationchange",(0,s.default)(j,x.debounceDelay,!0)),window.addEventListener("scroll",(0,u.default)(function(){(0,b.default)(w,x.once)},x.throttleDelay)),x.disableMutationObserver||d.default.ready("[data-aos]",O),w)};e.exports={init:_,refresh:j,refreshHard:O}},function(e,t){},,,,,function(e,t){(function(t){"use strict";function n(e,t,n){function o(t){var n=b,o=v;return b=v=void 0,k=t,g=e.apply(o,n)}function r(e){return k=e,h=setTimeout(f,t),M?o(e):g}function a(e){var n=e-w,o=e-k,i=t-n;return S?j(i,y-o):i}function c(e){var n=e-w,o=e-k;return void 0===w||n>=t||n<0||S&&o>=y}function f(){var e=O();return c(e)?d(e):void(h=setTimeout(f,a(e)))}function d(e){return h=void 0,_&&b?o(e):(b=v=void 0,g)}function l(){void 0!==h&&clearTimeout(h),k=0,b=w=v=h=void 0}function p(){return void 0===h?g:d(O())}function m(){var e=O(),n=c(e);if(b=arguments,v=this,w=e,n){if(void 0===h)return r(w);if(S)return h=setTimeout(f,t),o(w)}return void 0===h&&(h=setTimeout(f,t)),g}var b,v,y,g,h,w,k=0,M=!1,S=!1,_=!0;if("function"!=typeof e)throw new TypeError(s);return t=u(t)||0,i(n)&&(M=!!n.leading,S="maxWait"in n,y=S?x(u(n.maxWait)||0,t):y,_="trailing"in n?!!n.trailing:_),m.cancel=l,m.flush=p,m}function o(e,t,o){var r=!0,a=!0;if("function"!=typeof e)throw new TypeError(s);return i(o)&&(r="leading"in o?!!o.leading:r,a="trailing"in o?!!o.trailing:a),n(e,t,{leading:r,maxWait:t,trailing:a})}function i(e){var t="undefined"==typeof e?"undefined":c(e);return!!e&&("object"==t||"function"==t)}function r(e){return!!e&&"object"==("undefined"==typeof e?"undefined":c(e))}function a(e){return"symbol"==("undefined"==typeof e?"undefined":c(e))||r(e)&&k.call(e)==d}function u(e){if("number"==typeof e)return e;if(a(e))return f;if(i(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=i(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(l,"");var n=m.test(e);return n||b.test(e)?v(e.slice(2),n?2:8):p.test(e)?f:+e}var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s="Expected a function",f=NaN,d="[object Symbol]",l=/^\s+|\s+$/g,p=/^[-+]0x[0-9a-f]+$/i,m=/^0b[01]+$/i,b=/^0o[0-7]+$/i,v=parseInt,y="object"==("undefined"==typeof t?"undefined":c(t))&&t&&t.Object===Object&&t,g="object"==("undefined"==typeof self?"undefined":c(self))&&self&&self.Object===Object&&self,h=y||g||Function("return this")(),w=Object.prototype,k=w.toString,x=Math.max,j=Math.min,O=function(){return h.Date.now()};e.exports=o}).call(t,function(){return this}())},function(e,t){(function(t){"use strict";function n(e,t,n){function i(t){var n=b,o=v;return b=v=void 0,O=t,g=e.apply(o,n)}function r(e){return O=e,h=setTimeout(f,t),M?i(e):g}function u(e){var n=e-w,o=e-O,i=t-n;return S?x(i,y-o):i}function s(e){var n=e-w,o=e-O;return void 0===w||n>=t||n<0||S&&o>=y}function f(){var e=j();return s(e)?d(e):void(h=setTimeout(f,u(e)))}function d(e){return h=void 0,_&&b?i(e):(b=v=void 0,g)}function l(){void 0!==h&&clearTimeout(h),O=0,b=w=v=h=void 0}function p(){return void 0===h?g:d(j())}function m(){var e=j(),n=s(e);if(b=arguments,v=this,w=e,n){if(void 0===h)return r(w);if(S)return h=setTimeout(f,t),i(w)}return void 0===h&&(h=setTimeout(f,t)),g}var b,v,y,g,h,w,O=0,M=!1,S=!1,_=!0;if("function"!=typeof e)throw new TypeError(c);return t=a(t)||0,o(n)&&(M=!!n.leading,S="maxWait"in n,y=S?k(a(n.maxWait)||0,t):y,_="trailing"in n?!!n.trailing:_),m.cancel=l,m.flush=p,m}function o(e){var t="undefined"==typeof e?"undefined":u(e);return!!e&&("object"==t||"function"==t)}function i(e){return!!e&&"object"==("undefined"==typeof e?"undefined":u(e))}function r(e){return"symbol"==("undefined"==typeof e?"undefined":u(e))||i(e)&&w.call(e)==f}function a(e){if("number"==typeof e)return e;if(r(e))return s;if(o(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=o(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(d,"");var n=p.test(e);return n||m.test(e)?b(e.slice(2),n?2:8):l.test(e)?s:+e}var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c="Expected a function",s=NaN,f="[object Symbol]",d=/^\s+|\s+$/g,l=/^[-+]0x[0-9a-f]+$/i,p=/^0b[01]+$/i,m=/^0o[0-7]+$/i,b=parseInt,v="object"==("undefined"==typeof t?"undefined":u(t))&&t&&t.Object===Object&&t,y="object"==("undefined"==typeof self?"undefined":u(self))&&self&&self.Object===Object&&self,g=v||y||Function("return this")(),h=Object.prototype,w=h.toString,k=Math.max,x=Math.min,j=function(){return g.Date.now()};e.exports=n}).call(t,function(){return this}())},function(e,t){"use strict";function n(e){var t=void 0,o=void 0,i=void 0;for(t=0;t<e.length;t+=1){if(o=e[t],o.dataset&&o.dataset.aos)return!0;if(i=o.children&&n(o.children))return!0}return!1}function o(){return window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver}function i(){return!!o()}function r(e,t){var n=window.document,i=o(),r=new i(a);u=t,r.observe(n.documentElement,{childList:!0,subtree:!0,removedNodes:!0})}function a(e){e&&e.forEach(function(e){var t=Array.prototype.slice.call(e.addedNodes),o=Array.prototype.slice.call(e.removedNodes),i=t.concat(o);if(n(i))return u()})}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){};t.default={isSupported:i,ready:r}},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(){return navigator.userAgent||navigator.vendor||window.opera||""}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,a=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,u=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,c=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,s=function(){function e(){n(this,e)}return i(e,[{key:"phone",value:function(){var e=o();return!(!r.test(e)&&!a.test(e.substr(0,4)))}},{key:"mobile",value:function(){var e=o();return!(!u.test(e)&&!c.test(e.substr(0,4)))}},{key:"tablet",value:function(){return this.mobile()&&!this.phone()}}]),e}();t.default=new s},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e,t,n){var o=e.node.getAttribute("data-aos-once");t>e.position?e.node.classList.add("aos-animate"):"undefined"!=typeof o&&("false"===o||!n&&"true"!==o)&&e.node.classList.remove("aos-animate")},o=function(e,t){var o=window.pageYOffset,i=window.innerHeight;e.forEach(function(e,r){n(e,i+o,t)})};t.default=o},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(12),r=o(i),a=function(e,t){return e.forEach(function(e,n){e.node.classList.add("aos-init"),e.position=(0,r.default)(e.node,t.offset)}),e};t.default=a},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(13),r=o(i),a=function(e,t){var n=0,o=0,i=window.innerHeight,a={offset:e.getAttribute("data-aos-offset"),anchor:e.getAttribute("data-aos-anchor"),anchorPlacement:e.getAttribute("data-aos-anchor-placement")};switch(a.offset&&!isNaN(a.offset)&&(o=parseInt(a.offset)),a.anchor&&document.querySelectorAll(a.anchor)&&(e=document.querySelectorAll(a.anchor)[0]),n=(0,r.default)(e).top,a.anchorPlacement){case"top-bottom":break;case"center-bottom":n+=e.offsetHeight/2;break;case"bottom-bottom":n+=e.offsetHeight;break;case"top-center":n+=i/2;break;case"bottom-center":n+=i/2+e.offsetHeight;break;case"center-center":n+=i/2+e.offsetHeight/2;break;case"top-top":n+=i;break;case"bottom-top":n+=e.offsetHeight+i;break;case"center-top":n+=e.offsetHeight/2+i}return a.anchorPlacement||a.offset||isNaN(t)||(o=t),n+o};t.default=a},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){for(var t=0,n=0;e&&!isNaN(e.offsetLeft)&&!isNaN(e.offsetTop);)t+=e.offsetLeft-("BODY"!=e.tagName?e.scrollLeft:0),n+=e.offsetTop-("BODY"!=e.tagName?e.scrollTop:0),e=e.offsetParent;return{top:n,left:t}};t.default=n},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){return e=e||document.querySelectorAll("[data-aos]"),Array.prototype.map.call(e,function(e){return{node:e}})};t.default=n}])});
class MiscAccessibility {
    static getEnabledElementsSelector () {
        return ['a[href]', 'link[href]', 'button', 'textarea', 'input:not([type="hidden"])', 'select', 'object', 'area'].map(selector => selector + ':not([disabled])');
    }

    static getProtectedElementsSelector () {
        return ['i', 'sup', 'svg', 'hr'];
    }

    // Fonction qui va forcer le focus à faire une boucle sur un élément
    // en ajoutant deux inputs 'hidden' qui peuvent être focus, au début
    // et à la fin
    static addFocusLoop (element) {
        MiscAccessibility.removeFocusLoop();

        if (!element) {
            return;
        }

        const focusableElements = element.querySelectorAll(MiscAccessibility.getEnabledElementsSelector());
        if (!focusableElements.length) {
            return;
        }

        // Add class to first and last focusable elements
        focusableElements[0].classList.add('ds44-tmpFirstFocus');
        focusableElements[focusableElements.length - 1].classList.add('ds44-tmpLastFocus');

        // Create first hidden focus element
        const fakeFirstElement = document.createElement('span');
        fakeFirstElement.classList.add('ds44-tmpFocusHidden');
        fakeFirstElement.setAttribute('tabindex', '0');
        element.prepend(fakeFirstElement);

        // Create last hidden focus element
        const fakeLastElement = document.createElement('span');
        fakeLastElement.classList.add('ds44-tmpFocusHidden');
        fakeLastElement.setAttribute('tabindex', '0');
        element.appendChild(fakeLastElement);

        // Add events
        MiscEvent.addListener('focus', MiscAccessibility.setFocus.bind(this, null, '.ds44-tmpLastFocus'), fakeFirstElement);
        MiscEvent.addListener('focus', MiscAccessibility.setFocus.bind(this, null, '.ds44-tmpFirstFocus'), fakeLastElement);
    }

    // Delete loop elements
    static removeFocusLoop () {
        document
            .querySelectorAll('.ds44-tmpFocusHidden')
            .forEach((element) => {
                element.remove();
            })

        const firstFocusableElement = document.querySelector('.ds44-tmpFirstFocus');
        if (firstFocusableElement) {
            firstFocusableElement.classList.remove('ds44-tmpFirstFocus');
        }

        const lastFocusableElement = document.querySelector('.ds44-tmpLastFocus');
        if (lastFocusableElement) {
            lastFocusableElement.classList.remove('ds44-tmpLastFocus');
        }
    }

    // Mettre le focus sur un élément précis
    static setFocus (element, selector) {
        if (!element && selector) {
            element = document.querySelector(selector);
        }
        if (element) {
            element.focus();
        }
    }

    static show (element, bubble = true, force = true, isChild = false) {
        if (!element) {
            // No element
            return;
        }

        if (
            MiscAccessibility.getProtectedElementsSelector().indexOf(element.tagName.toLowerCase()) !== -1 ||
            element.getAttribute('data-a11y-exclude') === 'true'
        ) {
            // Protected element
            return;
        }

        if (!isChild) {
            // Is parent element
            element.removeAttribute('aria-hidden');
        }
        if (element.closest(MiscAccessibility.getEnabledElementsSelector()) === element) {
            if (element.hasAttribute('data-bkp-tabindex')) {
                element.setAttribute('tabindex', element.getAttribute('data-bkp-tabindex'));
            } else {
                element.removeAttribute('tabindex');
            }
            element.removeAttribute('data-bkp-tabindex');

            if (
                force &&
                element.getAttribute('tabindex') === '-1'
            ) {
                element.removeAttribute('tabindex');
            }
        }

        if (bubble) {
            Array.from(element.children).map((childElement) => {
                MiscAccessibility.show(childElement, bubble, force, true);
            });
        }
    }

    static hide (element, bubble = true, force = true, isChild = false) {
        if (!element) {
            // No element
            return;
        }

        if (
            MiscAccessibility.getProtectedElementsSelector().indexOf(element.tagName.toLowerCase()) !== -1 ||
            element.getAttribute('data-a11y-exclude') === 'true'
        ) {
            // Protected element
            return;
        }

        if (!isChild) {
            // Is parent element
            element.setAttribute('aria-hidden', true);
        }
        if (element.closest(MiscAccessibility.getEnabledElementsSelector()) === element) {
            if (force) {
                element.setAttribute('data-bkp-tabindex', '-1');
            } else if (!element.hasAttribute('data-bkp-tabindex')) {
                if (element.hasAttribute('tabindex')) {
                    element.setAttribute('data-bkp-tabindex', element.getAttribute('tabindex'));
                } else {
                    element.setAttribute('data-bkp-tabindex', '');
                }
            }

            element.setAttribute('tabindex', '-1');
        }

        if (bubble) {
            Array.from(element.children).map((childElement) => {
                MiscAccessibility.hide(childElement, bubble, force, true);
            });
        }
    }

    static flattenText (text) {
        return text.replace(/\n/gi, ' ').replace(/[ ]+/gi, ' ').trim();
    }
}

class MiscDom {
    static getAttribute (element, attributeName, defautValue = null) {
        return (element.hasAttribute(attributeName) === true ? element.getAttribute(attributeName) : defautValue);
    }

    static addClasses (element, classNames) {
        if (typeof classNames === 'string') {
            classNames = [classNames];
        }

        for (let index in classNames) {
            if (!classNames.hasOwnProperty(index)) {
                continue;
            }

            element.classList.add(classNames[index]);
        }
    }

    static removeClasses (element, classNames) {
        if (typeof classNames === 'string') {
            classNames = [classNames];
        }

        for (let index in classNames) {
            if (!classNames.hasOwnProperty(index)) {
                continue;
            }

            element.classList.remove(classNames[index]);
        }
    }

    static hasClass (element, className) {
        return element.classList.contains(className);
    }

    static getOffset (element) {
        let rect = element.getBoundingClientRect();
        let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {
            'top': rect.top + scrollTop,
            'left': rect.left + scrollLeft
        };
    }

    static getPreviousSibling (element, selector) {
        if (!element) {
            return null;
        }

        let sibling = element.previousElementSibling;
        if (!selector) {
            return sibling;
        }

        while (sibling) {
            if (sibling.matches(selector)) {
                return sibling;
            }
            sibling = sibling.previousElementSibling;
        }
    };

    static getNextSibling (element, selector) {
        if (!element) {
            return null;
        }

        let sibling = element.nextElementSibling;
        if (!selector) {
            return sibling;
        }

        while (sibling) {
            if (sibling.matches(selector)) {
                return sibling;
            }
            sibling = sibling.nextElementSibling;
        }
    };

    static getHeaderHeight (force = false) {
        const headerElement = document.querySelector('.ds44-header');
        if (
            !headerElement ||
            (
                headerElement.classList.contains('collapsed') &&
                !force
            )
        ) {
            return 0;
        }

        return headerElement.offsetHeight;
    };
}

class MiscEvent {
    static dispatch (type, data, target = document) {
        const options = { cancelable: true };
        if (data) {
            options.detail = data;
        }
        target.dispatchEvent(new CustomEvent(type, options));
    }

    static addListener (type, callback, target = document) {
        target.addEventListener(type, callback, false);
    }

    static removeListener (type, callback, target = document) {
        target.removeEventListener(type, callback, false);
    }
}

class MiscForm {
    static getValidationCategories () {
        return {
            'inputStandard': null,
            'inputFile': null,
            'inputAutocomplete': null,
            'textarea': null,
            'checkbox': null,
            'radio': null,
            'selectStandard': null,
            'selectRadio': null,
            'selectCheckbox': null,
            'selectMultilevel': null,
            'datepicker': null
        };
    }

    static buildFormData (formData, data, parentKey) {
        if (
            data &&
            typeof data === 'object' &&
            !(data instanceof Date) &&
            !(data instanceof File)
        ) {
            Object.keys(data).forEach(key => {
                MiscForm.buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
            });

            return;
        }

        const value = (data == null ? '' : data);
        formData.append(parentKey, value);
    }

    static jsonToFormData (data) {
        const formData = new FormData();
        MiscForm.buildFormData(formData, data);
        return formData;
    }

    static checkValidity (validationCategories) {
        // Check if the components are all valid
        let isValid = true;
        let data = {};
        for (let category in validationCategories) {
            if (!validationCategories.hasOwnProperty(category)) {
                continue;
            }

            if (
                !validationCategories[category] ||
                validationCategories[category].isValid !== true
            ) {
                isValid = false;
            } else if (validationCategories[category].data) {
                data = Object.assign(data, validationCategories[category].data);
            }
        }

        return {
            'isValid': isValid,
            'data': data
        };
    }

    static isEmail (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    static isPhone (value) {
        return /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(value);
    }

    static isPostcode (value) {
        return /^(?:(?:0[1-9]|[1-8]\d|9[0-5]|9[7-8])\d{3})$/.test(value);
    }

    static isNumber (value) {
        return /^[0-9]*$/.test(value);
    }
}

class MiscRequest {
    static send (url, successCallback, errorCallback, parameters = null, method = 'GET') {
        if (parameters && method.toLowerCase() === 'get') {
            url += (url.includes('?') ? '&' : '?') + MiscUrl.jsonToUrl(parameters).toString();
            parameters = null;
        }

        const xhr = new XMLHttpRequest();
        xhr.open(method.toUpperCase(), url, true);
        xhr.onreadystatechange = () => {
            try {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        this.response(xhr, successCallback);

                        return;
                    }

                    this.response(xhr, errorCallback);
                }
            } catch (ex) {
                console.log(ex);

                this.response(xhr, errorCallback);
            }
        };

        if (parameters) {
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhr.send(JSON.stringify(parameters));
        } else {
            xhr.send();
        }

        return xhr;
    }

    static response (xhr, callback) {
        if (xhr && callback) {
            try {
                const responseJson = JSON.parse(xhr.response);
                callback(responseJson);

                return;
            } catch (ex) {
            }

            callback(xhr.response);
        }
    }
}

class MiscTranslate {
    static getLanguage () {
        const htmlElement = document.querySelector('html');
        if (
            htmlElement &&
            htmlElement.getAttribute('lang') === 'fr'
        ) {
            return 'fr';
        }

        return 'en';
    }

    static getDictionnary () {
        return ({
            'fr': {
                'AROUND_ME': 'Autour de moi',
                'FIELD_MANDATORY_ERROR_MESSAGE': 'Veuillez renseigner : {fieldName}',
                'FIELD_BOX_MANDATORY_ERROR_MESSAGE': 'Veuillez cocher au moins un élément',
                'FIELD_VALID_SIZE_ERROR_MESSAGE': 'Merci de télécharger un fichier moins lourd pour : {fileName}',
                'FIELD_VALID_FORMAT_ERROR_MESSAGE': 'Merci de télécharger un fichier au bon format pour : {fileName}',
                'FIELD_VALID_DATE_FORMAT_ERROR_MESSAGE': 'Date invalide. Merci de respecter le format d’exemple',
                'FIELD_VALID_CHRONOLOGY_ERROR_MESSAGE': 'La date ne doit pas être inférieure à celle du champ précédent',
                'FIELD_PAST_DATE_ERROR_MESSAGE': 'La date ne doit pas être dans le passé',
                'FIELD_NEXT_YEAR_DATE_ERROR_MESSAGE': 'La date ne doit pas être supérieure à un an',
                'FIELD_VALID_EMAIL_MESSAGE': 'Email invalide. Merci de respecter le format d’un email',
                'FIELD_VALID_PHONE_MESSAGE': 'Numéro de téléphone invalide. Merci de respecter le format d’un numéro de téléphone',
                'FIELD_VALID_POSTCODE_MESSAGE': 'Code postal invalide. Merci de respecter le format d’un code postal',
                'FIELD_VALID_NUMBER_MESSAGE': 'Nombre invalide. Merci de respecter le format d’un nombre entier',
                'NO_RESULTS_FOUND': 'Aucun résultat trouvé',
                'LOADING': 'Chargement en cours',
                'SHOW': 'Afficher',
                'HIDE': 'Masquer',
                'MORE_RESULTS': 'Plus de résultats',
                'MORE_SEARCH_RESULTS:': 'Plus de résultats sur votre recherche sur : ',
                'SEARCH_NB_RESULTS_OUT_OF': ' résultats affichés sur ',
                'CAROUSEL_WATCH_PREVIOUS_CONTENT': 'Voir le contenu précédent',
                'CAROUSEL_WATCH_NEXT_CONTENT': 'Voir le contenu suivant',
                'START': 'Démarrer',
                'STOP': 'Arrêter',
                'EXPAND': 'Déplier',
                'COLLAPSE': 'Replier',
                'MAP_CANVAS': 'Carte interactive dans laquelle vous pouvez vous déplacer en utilisant les flèches de direction de votre clavier',
                'MAP_LOGO': 'Accéder à Mapbox - nouvelle fenêtre',
                'MAP_IMPROVE': 'Améliorer cette carte',
                'MAP_IMPROVE_NEW_WINDOW': 'Améliorer cette carte - nouvelle fenêtre',
                'MAP_FULLSCREEN': 'Afficher la carte en plein écran',
                'MAP_SHRINK': 'Sortir du mode plein écran de la carte',
                'MAP_ZOOM_IN': 'Augmenter la taille de la carte',
                'MAP_ZOOM_OUT': 'Diminuer la taille de la carte',
                'MAP_REORIENTATE': 'Repositionner la carte vers le nord',
                'RESULTS': 'résultats',
                'RESULT': 'résultat',
                'NO_RESULTS_FOR_SEARCH:': 'Il n\'y a aucun résultat pour la recherche sur :',
                'NO_RESULTS_NEW_SEARCH': 'Merci d\'effectuer une nouvelle recherche',
                'NB_RESULTS_FOR_SEARCH:': 'pour la recherche sur :',
                'EMPTY_SEARCH_CRITERIA': 'aucun critère',
                'RESULTS_MAX_RESULTS': 'Il y a un trop grand nombre de résultats correspondant à votre recherche. Vous trouverez ci-dessous les {maxNbResults} plus pertinents. N’hésitez pas à affiner vos critères de recherche.',
                'NEW_WINDOW': 'nouvelle fenêtre',
                'TOS_OF': 'Conditions d’utilisation de',
                'FOOD_OBLIGATION_PER_MONTH': '€ par mois pour votre obligé alimentaire n°',
                'FOOD_OBLIGATION_TOTAL': 'L\'estimation de la capacité contributive mensuelle de l\'ensemble de vos obligés alimentaires s\'élève à {totalFoodObligation} €.'
            },
            'en': {
                'AROUND_ME': 'Around me',
                'FIELD_MANDATORY_ERROR_MESSAGE': 'Please enter: {fieldName}',
                'FIELD_BOX_MANDATORY_ERROR_MESSAGE': 'Please check at least one box',
                'FIELD_VALID_SIZE_ERROR_MESSAGE': 'Please upload a smaller file for: {fileName}',
                'FIELD_VALID_FORMAT_ERROR_MESSAGE': 'Please upload a file with a valid format for: {fileName}',
                'FIELD_VALID_DATE_FORMAT_ERROR_MESSAGE': 'Invalid date format. Please enter a date with the same format than the example',
                'FIELD_VALID_CHRONOLOGY_ERROR_MESSAGE': 'The date should not be less than the one in the previous field',
                'FIELD_PAST_DATE_ERROR_MESSAGE': 'The date should not be in the past',
                'FIELD_NEXT_YEAR_DATE_ERROR_MESSAGE': 'The date should not be later than in a year',
                'FIELD_VALID_EMAIL_MESSAGE': 'Invalid email format. Please enter an email with a valid format',
                'FIELD_VALID_PHONE_MESSAGE': 'Invalid phone number format. Please enter a phone number with a valid format',
                'FIELD_VALID_POSTCODE_MESSAGE': 'Invalid postcode format. Please enter a postcode with a valid format',
                'FIELD_VALID_NUMBER_MESSAGE': 'Invalid number format. Please enter a number with a valid format',
                'NO_RESULTS_FOUND': 'No results found',
                'LOADING': 'Loading',
                'SHOW': 'Show',
                'HIDE': 'Hide',
                'MORE_RESULTS': 'More results',
                'MORE_SEARCH_RESULTS:': 'More results for your search: ',
                'SEARCH_NB_RESULTS_OUT_OF': ' results displayed out of ',
                'CAROUSEL_WATCH_PREVIOUS_CONTENT': 'Watch previous content',
                'CAROUSEL_WATCH_NEXT_CONTENT': 'Watch next content',
                'START': 'Start',
                'STOP': 'Stop',
                'EXPAND': 'Expand',
                'COLLAPSE': 'Collapse',
                'MAP_CANVAS': 'Interactive map in which you can move using the arrow keys on your keyboard',
                'MAP_LOGO': 'Go to Mapbox - new window',
                'MAP_IMPROVE': 'Improve this map',
                'MAP_IMPROVE_NEW_WINDOW': 'Improve this map - new window',
                'MAP_FULLSCREEN': 'Display the map in full screen',
                'MAP_SHRINK': 'Exit full screen mode of the map',
                'MAP_ZOOM_IN': 'Increase the size of the map',
                'MAP_ZOOM_OUT': 'Decrease the size of the map',
                'MAP_REORIENTATE': 'Reposition the map to the north',
                'RESULTS': 'results',
                'RESULT': 'result',
                'NO_RESULTS_FOR_SEARCH:': 'There are no results for the search on:',
                'NO_RESULTS_NEW_SEARCH': 'Please make another search',
                'NB_RESULTS_FOR_SEARCH:': 'for the search on:',
                'EMPTY_SEARCH_CRITERIA': 'no criteria',
                'RESULTS_MAX_RESULTS': 'There are too many results matching your search. Below are the {maxNbResults} most relevant. Do not hesitate to refine your search criteria.',
                'NEW_WINDOW': 'new window',
                'TOS_OF': 'Terms of service of',
                'FOOD_OBLIGATION_PER_MONTH': '€ per month for your food obligation no.',
                'FOOD_OBLIGATION_TOTAL': 'The estimate of the monthly contributory capacity of all your food obligations is {totalFoodObligation} €.'
            }
        })[MiscTranslate.getLanguage()];
    }

    static _ (input, patterns) {
        let translation = MiscTranslate.getDictionnary()[input];
        if (translation) {
            if (patterns) {
                for (const patternKey in patterns) {
                    if (!patterns.hasOwnProperty(patternKey)) {
                        continue;
                    }

                    translation = translation.replace('{' + patternKey + '}', patterns[patternKey]);
                }
            }
            return translation.replace('\n', '<br>');
        }

        console.log('Translation missing for: ' + input)
        return input;
    }
}

class MiscUrl {
    static getUrlParameters () {
        return window.location.href.split('#')[0].split('?')[0].split('/');
    }

    static getHashParameters () {
        const urlParameters = window.location.href.split('#')[1];
        return MiscUrl.urlToJson(urlParameters);
    }

    static getQueryParameters () {
        const urlParameters = window.location.href.split('#')[0].split('?')[1];
        return MiscUrl.urlToJson(urlParameters);
    }

    static setHashParameters (parameters = {}) {
        document.location.href = document.location.href.split('#')[0] + '#' + MiscUrl.jsonToUrl(parameters);
    }

    static getSeoHashParameters () {
        return (window.location.href.split('#')[1] || '').split('/');
    }

    static setSeoHashParameters (parameters = {}, parametersHash) {
        const urlParameters = [];
        const rawUrlParameters = MiscUrl.jsonToUrl(parameters);
        for (const [key, value] of rawUrlParameters.entries()) {
            if (key.match(/\[text\]$/)) {
                urlParameters.push(value.trim().replace(/, /gi, ','));
            }
        }
        urlParameters.push(parametersHash);
        document.location.href = document.location.href.split('#')[0] + '#' + urlParameters.join('/').replace(/ /gi, '-');
    }

    static jsonToUrl (parameters) {
        const urlParameters = new URLSearchParams();
        MiscUrl.buildUrlParameters(urlParameters, parameters);
        return urlParameters;
    }

    static urlToJson (urlParameters) {
        const json = {};
        const urlParams = new URLSearchParams(urlParameters);
        for (const [key, value] of urlParams.entries()) {
            const matches = key.match(/\[[^\]]*\]/g);
            if (!matches) {
                // No square brackets
                json[key] = {
                    'value': value
                };

                continue;
            }

            const fieldName = key.split('[')[0];
            if (!json[fieldName]) {
                json[fieldName] = {};
            }
            let nestedValue = json[fieldName];
            for (let i = 0; i < matches.length; i++) {
                const subKey = matches[i].replace('[', '').replace(']', '');
                if (i !== (matches.length - 1)) {
                    if (!nestedValue[subKey]) {
                        const nextSubKey = matches[(i + 1)].replace('[', '').replace(']', '');
                        if (nextSubKey == parseInt(nextSubKey, 10)) {
                            nestedValue[subKey] = [];
                        } else {
                            nestedValue[subKey] = {};
                        }
                    }
                    nestedValue = nestedValue[subKey];
                } else {
                    nestedValue[subKey] = value;
                }
            }
        }

        return json;
    }

    static buildUrlParameters (urlParameters, parameters, parentKey) {
        if (
            parameters &&
            typeof parameters === 'object' &&
            !(parameters instanceof Date) &&
            !(parameters instanceof File)
        ) {
            Object.keys(parameters).forEach(key => {
                MiscUrl.buildUrlParameters(urlParameters, parameters[key], parentKey ? `${parentKey}[${key}]` : key);
            });

            return;
        }

        const value = (parameters == null ? '' : parameters);
        urlParameters.append(parentKey, value);
    }
}

class MiscUtils {
    static getPositionY (element) {
        let yPosition = 0;

        while (element) {
            yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
            element = element.offsetParent;
        }

        return yPosition;
    }

    static generateId () {
        return 'id' + Math.random().toString(36).substring(2, 15);
    }

    static isInDevMode () {
        return (document.location.hostname === 'localhost');
    }

    static merge (obj) {
        Array.prototype.slice.call(arguments, 1).forEach(function (source) {
            if (source) {
                for (const prop in source) {
                    if (
                        source[prop] &&
                        source[prop].constructor === Object
                    ) {
                        if (!obj[prop] || obj[prop].constructor === Object) {
                            obj[prop] = obj[prop] || {};
                            MiscUtils.merge(obj[prop], source[prop]);
                        } else {
                            obj[prop] = source[prop];
                        }
                    } else {
                        obj[prop] = source[prop];
                    }
                }
            }
        });
        return obj;
    }

    static scrollTo (destination, duration = 400, easing = 'linear', callback) {
        const easings = {
            linear (t) {
                return t;
            },
            easeInQuad (t) {
                return t * t;
            },
            easeOutQuad (t) {
                return t * (2 - t);
            },
            easeInOutQuad (t) {
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            },
            easeInCubic (t) {
                return t * t * t;
            },
            easeOutCubic (t) {
                return (--t) * t * t + 1;
            },
            easeInOutCubic (t) {
                return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            },
            easeInQuart (t) {
                return t * t * t * t;
            },
            easeOutQuart (t) {
                return 1 - (--t) * t * t * t;
            },
            easeInOutQuart (t) {
                return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
            },
            easeInQuint (t) {
                return t * t * t * t * t;
            },
            easeOutQuint (t) {
                return 1 + (--t) * t * t * t * t;
            },
            easeInOutQuint (t) {
                return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
            }
        };

        const start = window.pageYOffset;
        const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

        const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
        const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
        const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
        const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

        if ('requestAnimationFrame' in window === false) {
            window.scroll(0, destinationOffsetToScroll);
            if (callback) {
                callback();
            }
            return;
        }

        function scroll () {
            const now = 'now' in window.performance ? performance.now() : new Date().getTime();
            const time = Math.min(1, ((now - startTime) / duration));
            const timeFunction = easings[easing](time);
            window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

            if (Math.round(window.pageYOffset) === destinationOffsetToScroll) {
                if (callback) {
                    callback();
                }
                return;
            }

            requestAnimationFrame(scroll);
        }

        scroll();
    }

    static getScrollTop () {
        return (document.documentElement.scrollTop || document.body.scrollTop);
    }

    static async digestMessage (message) {
        if (window.crypto.subtle) {
            const msgUint8 = new TextEncoder().encode(message);
            const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8);
            const hashArray = Array.from(new Uint8Array(hashBuffer));

            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        }

        let hash = 0;
        if (message.length == 0) {
            return hash;
        }
        for (let i = 0; i < message.length; i++) {
            const char = message.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }

        return hash;
    }
}

class FormFieldAbstract {
    constructor (selector, category) {
        this.category = category;
        this.objects = [];
        this.labelClassName = 'ds44-moveLabel';
        this.errorMessage = 'FIELD_MANDATORY_ERROR_MESSAGE';

        if (typeof selector === 'object') {
            // Elements passed as parameter, not text selector
            selector
                .forEach((element) => {
                    this.create(element);
                });
        } else {
            document
                .querySelectorAll(selector)
                .forEach((element) => {
                    this.create(element);
                });
        }
        this.initialize();
        this.fill();

        MiscEvent.addListener('field:add', this.add.bind(this));
        MiscEvent.addListener('field:destroy', this.destroy.bind(this));
        MiscEvent.addListener('form:validate', this.validate.bind(this));
        MiscEvent.addListener('form:clear', this.clear.bind(this));
    }

    create (element) {
        const object = {
            'id': MiscUtils.generateId(),
            'name': this.getName(element),
            'containerElement': (element.closest('.ds44-form__container') || element),
            'isInitialized': false,
            'isSubInitialized': false,
            'isSubSubInitialized': false,
            'isFilled': false,
            'isRequired': (element.getAttribute('required') !== null || element.getAttribute('data-required') === 'true'),
            'isEnabled': !(element.getAttribute('readonly') !== null || element.getAttribute('disabled') !== null || element.getAttribute('data-disabled') === 'true')
        };
        object.position = this.getPosition(object.containerElement);
        element.removeAttribute('data-required');
        element.removeAttribute('data-disabled');

        const valuesAllowed = element.getAttribute('data-values');
        if (valuesAllowed) {
            object.valuesAllowed = JSON.parse(valuesAllowed);
        }

        this.objects.push(object);
    }

    initialize () {
        // Initialize each object
        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];
            if (object.isInitialized) {
                continue;
            }
            object.isInitialized = true;

            this.addBackupAttributes(objectIndex);

            if (object.containerElement.getAttribute('data-field-enabled')) {
                this.enable(
                    objectIndex,
                    {
                        'detail': JSON.parse(object.containerElement.getAttribute('data-field-enabled'))
                    }
                );
            } else if (object.containerElement.getAttribute('data-field-disabled')) {
                this.disable(
                    objectIndex,
                    {
                        'detail': JSON.parse(object.containerElement.getAttribute('data-field-disabled'))
                    }
                );
            }

            MiscEvent.addListener('field:enable', this.enable.bind(this, objectIndex), object.containerElement);
            MiscEvent.addListener('field:disable', this.disable.bind(this, objectIndex), object.containerElement);
            MiscEvent.addListener('field:' + object.name + ':set', this.set.bind(this, objectIndex));
        }
    }

    add (evt) {
        if (
            !evt ||
            !evt.detail ||
            !evt.detail.selector ||
            !evt.detail.category ||
            evt.detail.category !== this.category
        ) {
            return;
        }

        document
            .querySelectorAll(evt.detail.selector)
            .forEach((element) => {
                this.create(element);
            });
        this.initialize();
        this.fill();
    }

    destroy (evt) {
        if (
            !evt ||
            !evt.detail ||
            !evt.detail.selector ||
            !evt.detail.category ||
            evt.detail.category !== this.category
        ) {
            return;
        }

        document
            .querySelectorAll(evt.detail.selector)
            .forEach((element) => {
                for (let objectIndex = this.objects.length - 1; objectIndex >= 0; objectIndex--) {
                    const object = this.objects[objectIndex];
                    if (object.name !== this.getName(element)) {
                        continue;
                    }

                    this.objects.splice(objectIndex, 1);
                }
            });
    }

    getName (element) {
        return (element.getAttribute('name') || element.getAttribute('data-name'));
    }

    fill () {
        // Get data from url and session storage
        const fieldParameters = window.sessionStorage.getItem('fields');
        let externalParameters = Object.assign(
            {},
            MiscUrl.getQueryParameters(),
            MiscUrl.getHashParameters(),
            (fieldParameters ? JSON.parse(fieldParameters) : {})
        );
        for (const fieldName in externalParameters) {
            if (!externalParameters.hasOwnProperty(fieldName)) {
                continue;
            }

            const fieldData = externalParameters[fieldName];
            if (
                fieldData.value &&
                fieldData.value.constructor === ({}).constructor
            ) {
                // Value is JSON => sub field
                externalParameters = Object.assign({}, externalParameters, fieldData.value);
            }
        }

        // Set each object
        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];
            if (object.isFilled) {
                continue;
            }
            object.isFilled = true;

            if (externalParameters[object.name]) {
                this.set(objectIndex, externalParameters[object.name]);
            }
        }
    }

    addBackupAttributes (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        if (object.inputElements) {
            object.inputElements.forEach((inputElement) => {
                if (inputElement.getAttribute('aria-describedby')) {
                    inputElement.setAttribute(
                        'data-bkp-aria-describedby',
                        inputElement.getAttribute('aria-describedby')
                    );
                }
            });
        }
    }

    getPosition (currentContainerElement) {
        const containerElements = document.querySelectorAll('[class*="ds44-form_"][class*="_container"]')
        for (let i = 0; i < containerElements.length; i++) {
            if (containerElements[i] === currentContainerElement) {
                return i;
            }
        }

        return 999;
    }

    empty (objectIndex) {
        this.setData(objectIndex);
        this.showNotEmpty(objectIndex);
    }

    showNotEmpty (objectIndex) {
        this.enableDisableLinkedField(objectIndex);
    }

    set (objectIndex, data) {
        if (data instanceof Event) {
            data = data.detail;
        }

        this.setData(objectIndex, data);
        this.enter(objectIndex);
        this.showNotEmpty(objectIndex);
    }

    setData (objectIndex, data = null) {
        // Abstract method
    }

    getData (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.valueElement) {
            return null;
        }

        if (!object.valueElement.value) {
            return null;
        }

        let dataValue = object.valueElement.value;
        try {
            dataValue = JSON.parse(dataValue);
        } catch (ex) {
        }
        let data = {};
        data[object.name] = {
            'value': dataValue,
            'position': object.position
        };

        return data;
    }

    enableDisableLinkedField (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        const linkedFieldsContainerElement = object.containerElement.closest('.ds44-js-linked-fields');
        if (!linkedFieldsContainerElement) {
            return;
        }

        const secondLinkedFieldElement = MiscDom.getNextSibling(object.containerElement);
        if (
            !secondLinkedFieldElement ||
            secondLinkedFieldElement === object.containerElement
        ) {
            return;
        }

        // Has a linked field
        const areMaskedLinkedFields = !!object.containerElement.closest('.ds44-js-masked-fields');
        let data = this.getData(objectIndex);
        if (
            !data ||
            (
                data[object.name] &&
                data[object.name].metadata &&
                data[object.name].metadata.hasLinkedField === false
            )
        ) {
            // Disable linked field
            MiscEvent.dispatch(
                'field:disable',
                {
                    'areMaskedLinkedFields': areMaskedLinkedFields
                },
                secondLinkedFieldElement
            );
            secondLinkedFieldElement.setAttribute(
                'data-field-disabled',
                JSON.stringify({
                    'areMaskedLinkedFields': areMaskedLinkedFields
                })
            );
        } else {
            // Enabled linked field
            MiscEvent.dispatch(
                'field:enable',
                {
                    'data': data,
                    'areMaskedLinkedFields': areMaskedLinkedFields
                },
                secondLinkedFieldElement
            );
            secondLinkedFieldElement.setAttribute(
                'data-field-enabled',
                JSON.stringify({
                    'data': data,
                    'areMaskedLinkedFields': areMaskedLinkedFields
                })
            );
        }
    }

    enable (objectIndex, evt) {
        if (!this.isEnableAllowed(objectIndex, evt)) {
            this.disable(objectIndex, evt);

            return;
        }

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.isEnabled = true;
        object.containerElement.removeAttribute('data-field-enabled');
        if (
            evt &&
            evt.detail &&
            evt.detail.data
        ) {
            object.parentValue = evt.detail.data[Object.keys(evt.detail.data)[0]].value;
        } else {
            object.parentValue = null;
        }

        if (!this.getData(objectIndex)) {
            this.empty(objectIndex);
        } else {
            this.enter(objectIndex);
        }
        this.showNotEmpty(objectIndex);
        this.enableElements(objectIndex, evt);
    }

    enableElements (objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        if (
            evt &&
            evt.detail &&
            evt.detail.areMaskedLinkedFields
        ) {
            object.containerElement.classList.remove('hidden');
        }
    }

    disable (objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.isEnabled = false;
        object.parentValue = null;
        object.containerElement.removeAttribute('data-field-disabled');

        this.empty(objectIndex);
        this.removeInvalid(objectIndex);
        this.disableElements(objectIndex, evt);
    }

    disableElements (objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        if (
            evt &&
            evt.detail &&
            evt.detail.areMaskedLinkedFields
        ) {
            object.containerElement.classList.add('hidden');
        }
    }

    isEnableAllowed (objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (!object || !object.valuesAllowed) {
            return true;
        }

        if (
            !evt ||
            !evt.detail ||
            !evt.detail.data
        ) {
            return false;
        }

        let currentValues = evt.detail.data[Object.keys(evt.detail.data)[0]].value;
        if (typeof currentValues === 'object') {
            const valuesIntersection = (object.valuesAllowed.filter(value => currentValues.includes(value)));
            if (valuesIntersection.length === 0) {
                return false;
            }

            return true;
        }

        if (!object.valuesAllowed.includes(currentValues)) {
            return false;
        }

        return true;
    }

    enter (objectIndex) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.labelElement ||
            !object.isEnabled
        ) {
            return;
        }

        object.labelElement.classList.add(this.labelClassName);
    }

    quit (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.labelElement) {
            return;
        }

        object.labelElement.classList.remove(this.labelClassName);
    }

    clear (evt) {
        if (
            !evt ||
            !evt.detail ||
            !evt.detail.formElement
        ) {
            return;
        }

        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];

            // Is the field in the form that is being validated
            if (!evt.detail.formElement.contains(object.containerElement)) {
                continue;
            }

            // Don't reset a hidden field
            if (object.containerElement.closest('.ds44-select-list_elem_child.hidden')) {
                continue;
            }

            this.empty(objectIndex);
            this.quit(objectIndex);
        }
    }

    validate (evt) {
        if (
            !evt ||
            !evt.detail ||
            !evt.detail.formElement
        ) {
            return;
        }

        let isValid = true;
        let data = {};
        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];

            // Is the field in the form that is being validated
            if (!evt.detail.formElement.contains(object.containerElement)) {
                continue;
            }

            // Don't validate a hidden field
            if (object.containerElement.closest('.ds44-select-list_elem_child.hidden')) {
                continue;
            }

            if (
                (evt.detail.dryRun === true && !this.isValid(objectIndex)) ||
                (evt.detail.dryRun !== true && !this.checkValidity(objectIndex))
            ) {
                isValid = false;
            } else if (
                evt.detail.formElement.classList.contains('ds44-listSelect') ||
                !object.containerElement.closest('.ds44-select-list_elem_child')
            ) {
                // Don't take into consideration data from sub elements
                // The data is already injected in the parent value
                const newData = this.getData(objectIndex);
                if (newData) {
                    data = Object.assign(data, newData);
                }
            }
        }

        MiscEvent.dispatch(
            'form:validation',
            {
                'category': this.category,
                'isValid': isValid,
                'data': data
            },
            evt.detail.formElement
        );
    }

    removeInvalid (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        const informationElement = object.containerElement.querySelector(':scope > .ds44-field-information');
        if (!informationElement) {
            return;
        }

        informationElement.classList.remove('ds44-error');
        const informationListElement = informationElement.querySelector('.ds44-field-information-list');
        if (informationListElement) {
            informationListElement
                .querySelectorAll('.ds44-field-information-error')
                .forEach((errorElement) => {
                    errorElement.remove();
                });
        }
    }

    checkFormat (objectIndex) {
        return true;
    }

    isValid (objectIndex) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            (
                object.isRequired &&
                object.isEnabled &&
                !this.getData(objectIndex)
            ) ||
            !this.checkFormat(objectIndex)
        ) {
            return false;
        }

        return true;
    }

    checkValidity (objectIndex) {
        this.removeInvalid(objectIndex);

        if (!this.isValid(objectIndex)) {
            this.invalid(objectIndex);

            return false;
        }

        return true;
    }

    invalid (objectIndex) {
        // Abstract method
    }

    showErrorMessage (objectIndex, errorMessageElementId = null) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        // Recreate information structure
        let informationElement = object.containerElement.querySelector(':scope > .ds44-field-information');
        if (!informationElement) {
            informationElement = document.createElement('div');
            informationElement.classList.add('ds44-field-information');
            informationElement.setAttribute('aria-live', 'polite');
            object.containerElement.appendChild(informationElement);
        }
        informationElement.classList.add('ds44-error');

        let informationListElement = informationElement.querySelector('.ds44-field-information-list');
        if (!informationListElement) {
            informationListElement = document.createElement('ul');
            informationListElement.classList.add('ds44-field-information-list');
            informationListElement.classList.add('ds44-list');
            informationElement.appendChild(informationListElement);
        } else {
            informationListElement
                .querySelectorAll('.ds44-field-information-error')
                .forEach((errorElement) => {
                    errorElement.remove();
                });
        }

        let errorMessageElement = document.createElement('li');
        if (errorMessageElementId) {
            errorMessageElement.setAttribute('id', errorMessageElementId);
        }
        errorMessageElement.classList.add('ds44-field-information-error');
        errorMessageElement.setAttribute('tabindex', '-1');
        informationListElement.appendChild(errorMessageElement);

        let errorIconElement = document.createElement('i');
        errorIconElement.classList.add('icon');
        errorIconElement.classList.add('icon-attention');
        errorIconElement.classList.add('icon--sizeM');
        errorIconElement.setAttribute('aria-hidden', 'true');
        errorMessageElement.appendChild(errorIconElement);

        let errorTextElement = document.createElement('span');
        errorTextElement.classList.add('ds44-iconInnerText');
        errorTextElement.innerHTML = this.getErrorMessage(objectIndex);
        errorMessageElement.appendChild(errorTextElement);
    }

    getErrorMessage (objectIndex) {
        return this.formatErrorMessage(objectIndex);
    }

    formatErrorMessage (objectIndex, errorMessage = this.errorMessage, patterns) {
        const object = this.objects[objectIndex];
        if (!object || !object.labelElement) {
            return MiscTranslate._(errorMessage, patterns);
        }

        if (!patterns) {
            patterns = {};
        }
        if (!patterns.fieldName) {
            patterns.fieldName = object.labelElement.innerText.replace(/\*$/, '');
        }
        return MiscTranslate._(errorMessage, patterns);
    }
}

class CarouselAbstract {
    constructor (selector) {
        this.previousSlideMessage = MiscTranslate._('CAROUSEL_WATCH_PREVIOUS_CONTENT');
        this.nextSlideMessage = MiscTranslate._('CAROUSEL_WATCH_NEXT_CONTENT');
        this.queryTitreTuile = '.ds44-card__title a[href]:not([disabled])';
        this.objects = [];
        this.breakpoint = window.matchMedia('(max-width: 63.375em)');

        document
            .querySelectorAll(selector)
            .forEach((wrapElement) => {
                this.create(wrapElement);
            });

        MiscEvent.addListener('resize', this.resize.bind(this), window);
        window.setTimeout(
            () => {
                MiscEvent.dispatch('resize', null, window);
            },
            1000
        );

        this.breakpoint.addListener(this.breakpointChecker.bind(this));
        this.breakpointChecker();
    }

    create (wrapElement) {
        const swiperElement = wrapElement.querySelector('.swiper-container');
        const wrapperElement = wrapElement.querySelector('.swiper-wrapper');
        if (
            !swiperElement ||
            !wrapperElement
        ) {
            return;
        }

        const slideElements = swiperElement.querySelectorAll('.swiper-slide');
        if (!slideElements.length) {
            return;
        }

        // Get nb visible slides
        const nbSlides = slideElements.length;
        const nbVisibleSlides = parseInt(wrapElement.getAttribute('data-nb-visible-slides'), 10);
        const mobileOnly = (wrapElement.getAttribute('data-mobile-only') === 'true');

        // Create object
        const object = {
            'wrapElement': wrapElement,
            'wrapperElement': wrapperElement,
            'swiperElement': swiperElement,
            'nbSlides': nbSlides,
            'nbVisibleSlides': nbVisibleSlides,
            'mobileOnly': mobileOnly,
            'isInitialized': false
        };

        const paginationElement = wrapElement.querySelector('.swiper-pagination');
        if (paginationElement) {
            object.paginationElement = paginationElement;
        }
        const previousElement = wrapElement.querySelector('.swiper-button-prev');
        if (previousElement) {
            object.previousElement = previousElement;
        }
        const nextElement = wrapElement.querySelector('.swiper-button-next');
        if (nextElement) {
            object.nextElement = nextElement;
        }
        const galleryElement = MiscDom.getNextSibling(swiperElement, '.swiper-thumbs');
        if (galleryElement) {
            object.galleryElement = galleryElement;
        }

        // Record object
        this.objects.push(object);
    }

    createSwipper (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || object.swiper) {
            return;
        }

        // Component initialization in full JS mode
        object.wrapperElement.classList.remove.apply(
            object.wrapperElement.classList,
            Array.from(object.wrapperElement.classList).filter(className => className.startsWith('grid-'))
        );

        object.swiper = new Swiper(
            object.swiperElement,
            this.getSwiperParameters(object)
        );

        object.swiper.on('slidePrevTransitionEnd', this.slide.bind(this, objectIndex, 'backward'));
        object.swiper.on('slideNextTransitionEnd', this.slide.bind(this, objectIndex, 'forward'));

        object.swiper.init();
        object.isInitialized = true;

        // Enable previous and next buttons
        if (object.previousElement && object.nextElement) {
            [object.previousElement, object.nextElement]
                .forEach(button => {
                    button.classList.remove('swiper-button-disabled');

                    const ua = navigator.userAgent;
                    if (!ua.includes('Edge/42')) {
                        button.classList.add('ds44-not-edge-42');
                    }
                });
        }
    }

    destroySwipper (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.swiper) {
            return;
        }

        object.swiper.destroy(true, true);
        object.swiper = null;
        object.isInitialized = false;

        object.wrapperElement.classList.add('grid-' + object.nbVisibleSlides + '-small-1');

        if (object.previousElement && object.nextElement) {
            [object.previousElement, object.nextElement]
                .forEach(button => {
                    button.classList.add('swiper-button-disabled');
                });
        }
    }

    getSwiperParameters (object) {
        const swiperParameters = {
            'init': false,
            'direction': 'horizontal',
            'spaceBetween': 16,
            'watchOverflow': true,
            'watchSlidesVisibility': true,
            'slidesPerView': 1,
            'loop': true,
            'breakpoints': {
                '768': {
                    'slidesPerView': object.nbVisibleSlides
                }
            },
            'a11y': {
                'enabled': false
            }
        };

        // Take reduced motion media query into account
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (!mediaQuery || mediaQuery.matches) {
            swiperParameters.speed = 0;
        }

        if (object.paginationElement) {
            swiperParameters.pagination = {
                'el': object.paginationElement,
                'renderBullet': (index, className) => {
                    const textElements = object.swiperElement.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate) .ds44-diaporama-vignette-text');
                    if (!textElements) {
                        return '';
                    }

                    return '<span class="' + className + '">' + textElements[index].innerHTML + '</span>';
                }
            }
        }

        if (object.previousElement && object.nextElement) {
            swiperParameters.navigation = {
                'prevEl': object.previousElement,
                'nextEl': object.nextElement
            };
        }

        if (object.galleryElement) {
            const thumbsSwiperParameters = {
                'spaceBetween': 16,
                'slidesPerView': 'auto',
                'freeMode': true,
                'watchSlidesVisibility': true,
                'watchSlidesProgress': true
            }

            if (!mediaQuery || mediaQuery.matches) {
                thumbsSwiperParameters.speed = 0;
            }

            swiperParameters.thumbs = {
                'swiper': (new Swiper(
                    object.galleryElement.querySelector('.swiper-container'),
                    thumbsSwiperParameters
                ))
            };
        }

        return swiperParameters;
    }

    updatePreviousAndNextSlideMessage (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.previousElement || !object.nextElement) {
            return;
        }

        let titleElement = null;
        let blocTitleElement = object.wrapElement.previousElementSibling;
        if (blocTitleElement) {
            // On est dans le composant simple
            titleElement = blocTitleElement;
        } else {
            // On est dans une page
            blocTitleElement = object.wrapElement.parentElement.previousElementSibling;
            if (blocTitleElement) {
                titleElement = blocTitleElement.querySelector('.h2-like');
            }
        }

        const titleCarousel = (titleElement ? titleElement.innerText : 'Carousel n°' + (objectIndex + 1));
        const indexPreviousElement = (object.swiper.realIndex === 0 ? object.nbSlides : object.swiper.realIndex);
        const nbVisibleSlides = object.swiperElement.querySelectorAll('.swiper-slide.swiper-slide-visible').length;
        let indexNextElement = object.swiper.realIndex + nbVisibleSlides + 1;
        if (indexNextElement > object.nbSlides) {
            indexNextElement -= object.nbSlides;
        }

        const titlePreviousElement = MiscAccessibility.flattenText(this.previousSlideMessage + ' : ' + titleCarousel + ' - ' + indexPreviousElement + '/' + object.nbSlides);
        object.previousElement.setAttribute('title', titlePreviousElement);
        const innerTextPreviousElement = object.previousElement.querySelector('.visually-hidden');
        if (innerTextPreviousElement) {
            innerTextPreviousElement.innerText = titlePreviousElement;
        }

        const titleNextElement = MiscAccessibility.flattenText(this.nextSlideMessage + ' : ' + titleCarousel + ' - ' + indexNextElement + '/' + object.nbSlides);
        object.nextElement.setAttribute('title', titleNextElement);
        const innerTextNextElement = object.nextElement.querySelector('.visually-hidden');
        if (innerTextNextElement) {
            innerTextNextElement.innerText = titleNextElement;
        }
    }

    // Met a jour la visibilite des tuiles en fonction du placement et du nombre de tuile visible
    updateCardAccessibility (objectIndex, direction) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.swiperElement
            .querySelectorAll('.swiper-slide')
            .forEach((slideElement) => {
                if (slideElement.classList.contains('swiper-slide-visible')) {
                    // Show slide
                    this.showSlide(slideElement);
                } else {
                    // Hide slide
                    this.hideSlide(slideElement);
                }
            });

        if (object.isInitialized) {
            let slideElement = null;
            const visibleSlideElements = object.swiperElement.querySelectorAll('.swiper-slide.swiper-slide-visible');
            if (direction === 'backward') {
                slideElement = visibleSlideElements[0];
            } else {
                slideElement = visibleSlideElements[visibleSlideElements.length - 1];
            }
            if (slideElement) {
                MiscAccessibility.setFocus(slideElement.querySelector(this.queryTitreTuile));
            }
        }
    }

    showSlide (slideElement) {
        MiscAccessibility.show(slideElement);
    }

    hideSlide (slideElement) {
        MiscAccessibility.hide(slideElement);
    }

    slide (objectIndex, direction) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        if (object.previousElement && object.nextElement) {
            this.updatePreviousAndNextSlideMessage(objectIndex);
        }
        this.updateCardAccessibility(objectIndex, direction);
    }

    resize () {
        for (let objectIndex in this.objects) {
            if (!this.objects.hasOwnProperty(objectIndex)) {
                continue;
            }

            const object = this.objects[objectIndex];
            if (object && object.swiper && object.previousElement && object.nextElement) {
                this.updatePreviousAndNextSlideMessage(objectIndex);
            }
        }
    }

    breakpointChecker () {
        for (let objectIndex in this.objects) {
            if (!this.objects.hasOwnProperty(objectIndex)) {
                continue;
            }

            const object = this.objects[objectIndex];
            if (!object.mobileOnly) {
                this.createSwipper(objectIndex);

                continue;
            }

            if (this.breakpoint.matches === true) {
                // Below breakpoint
                this.createSwipper(objectIndex);
            } else {
                // Above breakpoint
                this.destroySwipper(objectIndex);
            }
        }
    }
}

class MapAbstract {
    constructor (selector) {
        const maps = document.querySelectorAll(selector);
        if (maps.length === 0) {
            return;
        }

        this.objects = [];
        this.isMapLanguageLoaded = false;
        this.isMapLoaded = false;
        this.isGeojsonLoaded = false;
        this.geojson = null;
        this.geojsonSourceId = 'geojson-source';
        this.geojsonFillsId = 'geojson-fills';
        this.geojsonLinesId = 'geojson-lines';

        maps
            .forEach((element) => {
                this.create(element);
            });
        this.initialize();
    }

    create (element) {
        const object = {
            'id': MiscUtils.generateId(),
            'mapElement': element,
            'isMapReady': false,
            'parentElement': element.closest('.ds44-mapResults'),
            'containerElement': element.closest('.ds44-mapResults-container'),
            'newResults': null,
            'zoom': false,
            'addUp': false,
            'isVisible': true,
            'isMoving': false,
            'maximumTop': null,
            'geojson': null
        };
        object.mapElement.setAttribute('id', object.id);
        this.objects.push(object);
    }

    initialize () {
        MiscEvent.addListener('search:focus', this.resultFocus.bind(this));
        MiscEvent.addListener('search:blur', this.resultBlur.bind(this));

        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];

            MiscEvent.addListener('search:update', this.search.bind(this, objectIndex));
            MiscEvent.addListener('resize', this.resize.bind(this, objectIndex), window);
            MiscEvent.addListener('scroll', this.scroll.bind(this, objectIndex), window);

            // Show results at startup for mobiles
            const breakpoint = window.matchMedia('(max-width: 767px)');
            if (breakpoint.matches) {
                const resultsElement = object.mapElement.closest('.ds44-results.ds44-results--mapVisible')
                if (resultsElement) {
                    this.toggleView(objectIndex);
                }
            }
        }

        if (!document.querySelector('link[href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"]')) {
            let linkElement = document.createElement('link');
            linkElement.setAttribute('href', 'https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css');
            linkElement.setAttribute('rel', 'stylesheet');
            document.head.appendChild(linkElement);
        }

        if (!document.querySelector('script[src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-language/v0.10.1/mapbox-gl-language.js"]')) {
            let scriptElement = document.createElement('script');
            scriptElement.setAttribute('src', 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-language/v0.10.1/mapbox-gl-language.js');
            scriptElement.setAttribute('type', 'text/javascript');
            document.head.appendChild(scriptElement);
            MiscEvent.addListener('load', this.mapLanguageScriptLoaded.bind(this), scriptElement);
        } else {
            this.mapLanguageScriptLoaded();
        }

        if (!document.querySelector('script[src="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js"]')) {
            let scriptElement = document.createElement('script');
            scriptElement.setAttribute('src', 'https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js');
            scriptElement.setAttribute('type', 'text/javascript');
            document.head.appendChild(scriptElement);
            MiscEvent.addListener('load', this.mapScriptLoaded.bind(this), scriptElement);
        } else {
            this.mapScriptLoaded();
        }
    }

    mapLanguageScriptLoaded () {
        this.isMapLanguageLoaded = true;
        this.mapLoad();
    }

    mapScriptLoaded () {
        this.isMapLoaded = true;
        window.mapboxgl.accessToken = 'pk.eyJ1IjoiemF6aWZmaWMiLCJhIjoiY2s3bmtxYXh2MDNqZzNkdDc3NzJ0aGdqayJ9.TuhsI1ZKXwKSGw2F3bVy5g';
        this.mapLoad();
    }

    mapLoad () {
        if (
            this.isMapLanguageLoaded &&
            this.isMapLoaded
        ) {
            for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
                const object = this.objects[objectIndex];

                object.map = new window.mapboxgl.Map({
                    container: object.id,
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [-1.8157647, 47.2780468],
                    zoom: 8
                });
                object.map.on('load', this.afterLoad.bind(this, objectIndex));
            }
        }
    }

    afterLoad (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        // Add geojson if included
        const geojsonUrl = object.mapElement.getAttribute('data-geojson-url');
        if (geojsonUrl) {
            MiscRequest.send(
                geojsonUrl,
                this.loadGeojson.bind(this, objectIndex),
                () => {
                    console.log('Error when loading the geojson file')
                }
            );
        }

        object.map.addControl(new window.mapboxgl.NavigationControl(), 'bottom-right');
        object.map.addControl(new window.mapboxgl.FullscreenControl(), 'bottom-left');
        object.map.addControl(new window.MapboxLanguage({ defaultLanguage: 'fr' }));
        object.map.setLayoutProperty('country-label', 'text-field', ['get', 'name_fr']);

        MiscEvent.addListener('fullscreenchange', this.translateMap.bind(this, objectIndex));
        this.translateMap(objectIndex);

        object.mapElement
            .closest('.ds44-results')
            .querySelectorAll('.ds44-js-toggle-map-view')
            .forEach((mapToggleViewElement) => {
                MiscEvent.addListener('click', this.toggleView.bind(this, objectIndex), mapToggleViewElement);
            });
    }

    loadGeojson (objectIndex, geojson) {
        if (geojson) {
            const object = this.objects[objectIndex];
            if (!object || object.geojson) {
                return;
            }

            object.geojson = geojson;
            object.map.addSource(this.geojsonSourceId, {
                'type': 'geojson',
                'data': geojson,
                'generateId': true
            });
            object.map.addLayer({
                'id': this.geojsonFillsId,
                'type': 'fill',
                'source': this.geojsonSourceId,
                'paint': {
                    'fill-color': ['get', 'fill'],
                    'fill-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        0.8,
                        ['get', 'fill-opacity']
                    ]
                }
            });
            object.map.addLayer({
                'id': this.geojsonLinesId,
                'type': 'line',
                'source': this.geojsonSourceId,
                'paint': {
                    'line-color': ['get', 'stroke'],
                    'line-opacity': ['get', 'stroke-opacity'],
                    'line-width': ['get', 'stroke-width']
                }
            });

            this.afterLoadGeojson(objectIndex);
        }
    }

    afterLoadGeojson (objectIndex) {
        // Abstract method
    }

    getGeojsonIds (objectIndex) {
        // Abstract method
    }

    showGeojson (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.isGeojsonLoaded) {
            return;
        }

        // Remove existing geojson
        if (!object.addUp) {
            object.map.setFilter(this.geojsonLinesId, ['!has', 'name']);
            object.map.setFilter(this.geojsonFillsId, ['!has', 'name']);
        }

        // Show current geojson
        const geojsonIds = [...new Set(this.getGeojsonIds(objectIndex))];
        let filterParameters = [];
        if (geojsonIds.length === 0) {
            filterParameters = ['!has', 'name'];
        } else {
            filterParameters = [
                'match',
                ['get', 'name'],
                geojsonIds,
                true,
                false
            ];
        }

        object.map.setFilter(this.geojsonFillsId, filterParameters);
        object.map.setFilter(this.geojsonLinesId, filterParameters);

        // Zoom the map
        if (object.zoom && geojsonIds.length !== 0) {
            let hasBoundingBox = false;
            let boundingBox = null;

            const features = object.geojson.features;
            for (let i = 0; i < features.length; i++) {
                if (geojsonIds.includes(features[i].properties.name)) {
                    hasBoundingBox = true;

                    for (let j = 0; j < features[i].geometry.coordinates.length; j++) {
                        const subCoordinates = features[i].geometry.coordinates[j];

                        for (let k = 0; k < subCoordinates.length; k++) {
                            if (!boundingBox) {
                                boundingBox = new window.mapboxgl.LngLatBounds(subCoordinates[k], subCoordinates[k]);
                            } else {
                                boundingBox = boundingBox.extend(new window.mapboxgl.LngLatBounds(subCoordinates[k], subCoordinates[k]));
                            }
                        }
                    }
                }
            }

            object.zoom = false;
            if (hasBoundingBox) {
                object.map.fitBounds(
                    boundingBox,
                    {
                        padding: 50,
                        maxZoom: 15
                    }
                );
            }
        }
    }

    translateMap (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        const mapCanvasElement = object.mapElement.querySelector('.mapboxgl-canvas');
        if (mapCanvasElement) {
            mapCanvasElement.setAttribute('role', 'img');
            mapCanvasElement.setAttribute('aria-label', MiscTranslate._('MAP_CANVAS'));
        }

        const mapLogoElement = object.mapElement.querySelector('.mapboxgl-ctrl-logo');
        if (mapLogoElement) {
            mapLogoElement.removeAttribute('aria-label');
            mapLogoElement.setAttribute('title', MiscTranslate._('MAP_LOGO'));

            let spanElement = mapLogoElement.querySelector('.visually-hidden');
            if (!spanElement) {
                spanElement = document.createElement('span')
                spanElement.classList.add('visually-hidden');
                mapLogoElement.appendChild(spanElement);
            }
            spanElement.innerText = MiscTranslate._('MAP_LOGO');
        }

        const mapImproveMapElement = object.mapElement.querySelector('.mapbox-improve-map');
        if (mapImproveMapElement) {
            mapImproveMapElement.setAttribute('title', MiscTranslate._('MAP_IMPROVE_NEW_WINDOW'));
            mapImproveMapElement.innerText = MiscTranslate._('MAP_IMPROVE');

            let currentElement = mapImproveMapElement;
            while ((currentElement = MiscDom.getPreviousSibling(currentElement))) {
                currentElement.setAttribute('title', MiscTranslate._('TOS_OF') + ' ' + currentElement.innerText + ' - ' + MiscTranslate._('NEW_WINDOW'));
            }
        }

        const mapFullScreenElement = object.mapElement.querySelector('.mapboxgl-ctrl-fullscreen');
        if (mapFullScreenElement) {
            mapFullScreenElement.removeAttribute('aria-label');
            mapFullScreenElement.setAttribute('title', MiscTranslate._('MAP_FULLSCREEN'));

            let spanElement = mapFullScreenElement.querySelector('.visually-hidden');
            if (!spanElement) {
                spanElement = document.createElement('span')
                spanElement.classList.add('visually-hidden');
                mapFullScreenElement.appendChild(spanElement);
            }
            spanElement.innerText = MiscTranslate._('MAP_FULLSCREEN');
        }

        const mapShrinkElement = object.mapElement.querySelector('.mapboxgl-ctrl-shrink');
        if (mapShrinkElement) {
            mapShrinkElement.removeAttribute('aria-label');
            mapShrinkElement.setAttribute('title', MiscTranslate._('MAP_SHRINK'));

            let spanElement = mapShrinkElement.querySelector('.visually-hidden');
            if (!spanElement) {
                spanElement = document.createElement('span')
                spanElement.classList.add('visually-hidden');
                mapShrinkElement.appendChild(spanElement);
            }
            spanElement.innerText = MiscTranslate._('MAP_SHRINK');
        }

        const mapZoomInElement = object.mapElement.querySelector('.mapboxgl-ctrl-zoom-in');
        if (mapZoomInElement) {
            mapZoomInElement.removeAttribute('aria-label');
            mapZoomInElement.setAttribute('title', MiscTranslate._('MAP_ZOOM_IN'));

            let spanElement = mapZoomInElement.querySelector('.visually-hidden');
            if (!spanElement) {
                spanElement = document.createElement('span')
                spanElement.classList.add('visually-hidden');
                mapZoomInElement.appendChild(spanElement);
            }
            spanElement.innerText = MiscTranslate._('MAP_ZOOM_IN');
        }

        const mapZoomOutElement = object.mapElement.querySelector('.mapboxgl-ctrl-zoom-out');
        if (mapZoomOutElement) {
            mapZoomOutElement.removeAttribute('aria-label');
            mapZoomOutElement.setAttribute('title', MiscTranslate._('MAP_ZOOM_OUT'));

            let spanElement = mapZoomOutElement.querySelector('.visually-hidden');
            if (!spanElement) {
                spanElement = document.createElement('span')
                spanElement.classList.add('visually-hidden');
                mapZoomOutElement.appendChild(spanElement);
            }
            spanElement.innerText = MiscTranslate._('MAP_ZOOM_OUT');
        }

        const mapCompassElement = object.mapElement.querySelector('.mapboxgl-ctrl-compass');
        if (mapCompassElement) {
            mapCompassElement.removeAttribute('aria-label');
            mapCompassElement.setAttribute('title', MiscTranslate._('MAP_REORIENTATE'));

            let spanElement = mapCompassElement.querySelector('.visually-hidden');
            if (!spanElement) {
                spanElement = document.createElement('span')
                spanElement.classList.add('visually-hidden');
                mapCompassElement.appendChild(spanElement);
            }
            spanElement.innerText = MiscTranslate._('MAP_REORIENTATE');
        }
    }

    search (objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.newResults = evt.detail.newResults;
        object.zoom = evt.detail.zoom;
        object.addUp = evt.detail.addUp;

        if (object.isMapReady) {
            this.show(objectIndex);
        }
    }

    show (objectIndex) {
        // Abstract method
    }

    toggleView (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        const resultsElement = object.mapElement.closest('.ds44-results')
        if (resultsElement) {
            const mapToggleViewElements = resultsElement.querySelectorAll('.ds44-js-toggle-map-view');
            if (resultsElement.classList.contains('ds44-results--mapVisible')) {
                resultsElement.classList.remove('ds44-results--mapVisible')
                object.isVisible = false;

                if (object.parentElement) {
                    MiscAccessibility.hide(object.parentElement);
                }

                mapToggleViewElements.forEach((mapToggleViewElement) => {
                    const text = mapToggleViewElement.innerText.replace(MiscTranslate._('HIDE') + ' ', MiscTranslate._('SHOW') + ' ');
                    mapToggleViewElement.querySelector('span').innerHTML = text;
                    mapToggleViewElement.setAttribute('title', text);
                    if (!mapToggleViewElement.closest('.ds44-mapResults-container')) {
                        MiscAccessibility.setFocus(mapToggleViewElement);
                    }
                });
            } else {
                resultsElement.classList.add('ds44-results--mapVisible')
                object.isVisible = true;
                this.resize(objectIndex);

                if (object.parentElement) {
                    MiscAccessibility.show(object.parentElement);
                }

                mapToggleViewElements.forEach((mapToggleViewElement) => {
                    const text = mapToggleViewElement.innerText.replace(MiscTranslate._('SHOW') + ' ', MiscTranslate._('HIDE') + ' ');
                    mapToggleViewElement.querySelector('span').innerHTML = text;
                    mapToggleViewElement.setAttribute('title', text);
                    if (mapToggleViewElement.closest('.ds44-mapResults-container')) {
                        MiscAccessibility.setFocus(mapToggleViewElement);
                    }
                });
            }
        }
    }

    resize (objectIndex) {
        window.setTimeout(this.resizeMap.bind(this, objectIndex), 200);
        window.setTimeout(this.resizeMap.bind(this, objectIndex), 600);
        window.setTimeout(this.resizeMap.bind(this, objectIndex), 1000);
    }

    resizeMap (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        if (object.map && object.map.resize) {
            object.map.resize();
        }

        this.scroll(objectIndex);
    }

    scroll (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        const scrollTop = MiscUtils.getScrollTop();
        const enableScrolling = (object.parentElement.offsetHeight > object.containerElement.offsetHeight);

        const oldContainerElementHeight = object.containerElement.offsetHeight;
        if (enableScrolling) {
            let mapHeight = (
                Math.min(MiscUtils.getPositionY(object.parentElement) + object.parentElement.offsetHeight, (scrollTop + this.getScreenHeight())) -
                Math.max((scrollTop + MiscDom.getHeaderHeight()), MiscUtils.getPositionY(object.parentElement))
            );
            object.containerElement.style.height = mapHeight + 'px';
        } else {
            object.containerElement.style.height = null;
        }
        if (oldContainerElementHeight !== object.containerElement.offsetHeight) {
            if (object.map && object.map.resize) {
                object.map.resize();
            }
        }

        object.maximumTop = MiscUtils.getPositionY(object.parentElement) + object.parentElement.offsetHeight - object.containerElement.offsetHeight;
        const top = this.getTop(objectIndex);
        if (
            enableScrolling &&
            scrollTop > MiscUtils.getPositionY(object.parentElement) - top
        ) {
            if (!object.isMoving) {
                object.containerElement.style.width = object.parentElement.offsetWidth + 'px';
                object.isMoving = true;
            }

            if (scrollTop > this.getMaximumTop(objectIndex)) {
                object.containerElement.style.position = 'absolute';
            } else {
                object.containerElement.style.position = 'fixed';
            }
            object.containerElement.style.top = top + 'px';
        } else if (object.isMoving) {
            object.isMoving = false;

            object.containerElement.style.top = null;
            object.containerElement.style.position = 'static';
            object.containerElement.style.width = null;
        }
    }

    getScreenHeight () {
        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }

    getTop (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return 0;
        }

        if (MiscUtils.getScrollTop() > this.getMaximumTop(objectIndex)) {
            return object.parentElement.offsetHeight - object.containerElement.offsetHeight;
        }

        return Math.min(this.getMaximumTop(objectIndex), MiscDom.getHeaderHeight());
    }

    getMaximumTop (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return 0;
        }

        return object.maximumTop - MiscDom.getHeaderHeight();
    }

    resultFocus (evt) {
        // Abstract method
    }

    resultBlur (evt) {
        // Abstract method
    }

    popupClick (resultId, evt) {
        evt.stopPropagation();
        evt.preventDefault();

        MiscEvent.dispatch('search:select', { 'id': resultId });
    }
}

class OverlayAbstract {
    constructor (selector) {
        this.triggerElement = null;
        this.modal = null;
        this.visibilityCounter = 0;

        this.hideListener = this.hide.bind(this);
        this.focusOutListener = this.focusOut.bind(this);
        this.clickOutListener = this.clickOut.bind(this);

        // Events
        MiscEvent.addListener('keyUp:escape', this.hideListener);
        MiscEvent.addListener('loader:show', this.showLoader.bind(this));
        MiscEvent.addListener('loader:hide', this.hideLoader.bind(this));

        // Ajouter un event listener sur les boutons qui ouvrent un overlay / modale
        document
            .querySelectorAll(selector)
            .forEach((element) => {
                MiscEvent.addListener('click', this.show.bind(this), element);
            });
        document
            .querySelectorAll('.ds44-modal-container .ds44-btnOverlay--closeOverlay')
            .forEach((element) => {
                MiscEvent.addListener('click', this.hideListener, element);
            });

        document
            .querySelectorAll('.ds44-modal-container')
            .forEach((element) => {
                MiscAccessibility.hide(element);
            });
    }

    // Ouvre un overlay
    show (evt) {
        if (evt) {
            evt.stopPropagation();
        }

        if (this.modal) {
            this.hide();
        }

        const modalId = evt.currentTarget.getAttribute('data-target');
        if (!modalId) {
            return;
        }

        // Get corresponding modal
        const modal = document.querySelector(modalId);
        if (!modal) {
            return;
        }

        // Get corresponding close button
        const closeButton = modal.querySelector('[data-js="ds44-modal-action-close"]');
        if (!closeButton) {
            return;
        }

        // Record the element that triggered the overlay
        this.triggerElement = evt.currentTarget;
        this.modal = modal;

        // Dynamically fill modal
        this.fill();

        // Show modal
        document.body.style.overflow = 'hidden';
        MiscEvent.dispatch('resize', null, window);
        this.modal.classList.add('show');

        // Set focus in modal
        MiscAccessibility.show(this.modal);
        const firstField = this.modal.querySelector('input, button, textarea, a, select')
        if (firstField) {
            MiscAccessibility.setFocus(firstField);
        } else {
            MiscAccessibility.setFocus(closeButton);
        }
        MiscAccessibility.addFocusLoop(this.modal);
        MiscEvent.dispatch('overlay:show', { 'element': this.modal });

        MiscEvent.addListener('click', this.hideListener, closeButton);
        MiscEvent.addListener('focusout', this.focusOutListener, this.modal);
        MiscEvent.addListener('click', this.clickOutListener, document.body);
    }

    fill () {
        // Abstract method
    }

    // Ferme tous les overlays, et ajoute un focus sur le bouton qui a ouvert le dernier overlay affiché
    hide (evt) {
        if (evt) {
            evt.stopPropagation();
        }

        // Get current modal
        if (!this.modal) {
            return;
        }

        // Get corresponding close button
        const closeButton = this.modal.querySelector('[data-js="ds44-modal-action-close"]');
        if (!closeButton) {
            return;
        }

        MiscEvent.removeListener('click', this.hideListener, closeButton);
        MiscEvent.removeListener('focusout', this.focusOutListener, this.modal);
        MiscEvent.removeListener('click', this.clickOutListener, document.body);

        MiscAccessibility.hide(this.modal);
        MiscAccessibility.removeFocusLoop();

        document.body.style.overflow = null;
        MiscEvent.dispatch('resize', null, window);
        this.modal.classList.remove('show');

        if (this.triggerElement) {
            MiscAccessibility.setFocus(this.triggerElement)
        }

        this.triggerElement = null;
        this.modal = null;

        MiscEvent.dispatch('overlay:hide');
    }

    focusOut (evt) {
        evt.stopPropagation();

        if (!evt.target || !this.modal.contains(evt.target)) {
            MiscAccessibility.setFocus(this.modal.querySelector('input, button, textarea, a, select'));
            return;
        }

        MiscAccessibility.setFocus(this.modal);
    }

    clickOut (evt) {
        if (evt.target && this.modal.contains(evt.target)) {
            return;
        }

        this.hide();
    }

    showLoader () {
        if (!this.modal) {
            return;
        }

        if (this.visibilityCounter === 0) {
            MiscAccessibility.hide(this.modal, true, false);
        }
        this.visibilityCounter--;
    }

    hideLoader () {
        if (!this.modal) {
            return;
        }

        this.visibilityCounter = Math.min(0, (this.visibilityCounter + 1));
        if (this.visibilityCounter === 0) {
            MiscAccessibility.show(this.modal, true, false);
        }
    }
}

class TabAbstract {
    constructor (selector) {
        document
            .querySelectorAll(selector)
            .forEach((containerElement) => {
                this.create(containerElement);
            });
    }

    getHrefFromElement (element) {
        return element.getAttribute('href') || element.getAttribute('data-href');
    }

    create (containerElement) {
        containerElement
            .querySelectorAll('.js-tablist__link')
            .forEach((tabHandleElement) => {
                const tabHref = this.getTabFromHref(this.getHrefFromElement(tabHandleElement));
                const tabPanel = document.querySelector(tabHref);
                if (
                    !tabPanel ||
                    !tabPanel.children.length
                ) {
                    return;
                }

                MiscEvent.addListener('click', this.change.bind(this), tabHandleElement);

                const tabPanelExitElement = tabPanel.querySelector('.ds44-keyboard-show:last-child');
                if (tabPanelExitElement) {
                    MiscEvent.addListener('click', this.back.bind(this), tabPanelExitElement);
                }
            });

        let selectedTabHandle = null;
        const tabHref = this.getTabFromHref(document.location.href);
        const selectedTabHandleFromUrl = containerElement.querySelector('.js-tablist__link[href="' + tabHref + '"]');
        if (selectedTabHandleFromUrl) {
            selectedTabHandle = selectedTabHandleFromUrl;
        } else {
            const selectedTabHandleFromDom = containerElement.querySelector('.js-tablist__link[aria-current]');
            if (selectedTabHandleFromDom) {
                selectedTabHandle = selectedTabHandleFromDom;
            } else {
                selectedTabHandle = this.getDefaultTabHandle(containerElement);
            }
        }
        if (selectedTabHandle) {
            selectedTabHandle.click();
        }
    }

    getDefaultTabHandle (containerElement) {
        return containerElement.querySelector('.js-tablist__link');
    }

    change (evt) {
        if (evt.preventDefault) {
            evt.preventDefault();
        }

        const tabHandleElement = evt.currentTarget;
        if (tabHandleElement.classList.contains('ds44-tabs__linkSelected')) {
            return;
        }

        const tabHref = this.getTabFromHref(this.getHrefFromElement(tabHandleElement));
        const tabPanel = document.querySelector(tabHref);
        if (!tabPanel) {
            return;
        }

        this.changeTab(tabHandleElement, tabPanel);
    }

    changeTab (tabHandleElement, tabPanel) {
        const tabsElement = tabPanel.parentElement;
        tabsElement.style.height = tabsElement.offsetHeight + 'px';

        // Hide others
        tabHandleElement
            .closest('.js-tabs')
            .querySelectorAll('.js-tablist__link')
            .forEach((tabHandleElement) => {
                const tabHref = this.getTabFromHref(this.getHrefFromElement(tabHandleElement));
                const tabPanel = document.querySelector(tabHref);
                if (!tabPanel) {
                    return;
                }

                tabHandleElement.classList.remove('ds44-tabs__linkSelected');
                tabHandleElement.removeAttribute('aria-disabled');
                this.hideTab(tabHandleElement, tabPanel);
                MiscAccessibility.hide(tabPanel);
            });

        // Show selected tab
        tabHandleElement.classList.add('ds44-tabs__linkSelected');
        tabHandleElement.setAttribute('aria-disabled', 'true');
        this.showTab(tabHandleElement, tabPanel);
        MiscAccessibility.show(tabPanel);
    }

    showTab (tabHandleElement, tabPanel) {
        window.setTimeout(this.showTabCallback.bind(this, tabHandleElement, tabPanel), 300);
    }

    showTabCallback (tabHandleElement, tabPanel) {
        tabPanel.style.opacity = 1;
        tabPanel.style.display = 'block';

        const tabsElement = tabPanel.parentElement;
        tabsElement.style.height = null;
    }

    hideTab (tabHandleElement, tabPanel) {
        tabPanel.style.opacity = 0;

        window.setTimeout(this.hideTabCallback.bind(this, tabHandleElement, tabPanel), 150);
    }

    hideTabCallback (tabHandleElement, tabPanel) {
        tabPanel.style.display = 'none';
    }

    back (evt) {
        if (evt.preventDefault) {
            evt.preventDefault();
        }

        const tabHandleHref = this.getHrefFromElement(evt.currentTarget.firstElementChild);
        const currentTabHandle = document.querySelector(
            '.js-tablist__link.ds44-tabs__linkSelected' + tabHandleHref + ', ' +
            '.js-tablist__link.ds44-tabs__linkSelected[href="' + tabHandleHref + '"], ' +
            '.js-tablist__link.ds44-tabs__linkSelected[data-href="' + tabHandleHref + '"]'
        );
        if (!currentTabHandle) {
            return;
        }

        MiscAccessibility.setFocus(currentTabHandle);
        window.scrollTo(0, MiscUtils.getPositionY(currentTabHandle) - MiscDom.getHeaderHeight(true))
    }

    getTabFromHref (href) {
        if (href.indexOf('#') !== -1) {
            return href.slice(href.indexOf('#'));
        }

        return '#';
    }
}

class FormLayoutAbstract {
    constructor (selector) {
        this.objects = [];

        document
            .querySelectorAll(selector)
            .forEach((formElement) => {
                if (formElement.getAttribute('data-is-initialized') !== 'true') {
                    this.create(formElement);
                }
            });
        this.initialize();
    }

    create (formElement) {
        const object = {
            'id': MiscUtils.generateId(),
            'formElement': formElement,
            'hasBeenChecked': false,
            'validationCategories': MiscForm.getValidationCategories(),
            'isAutoLoaded': false
        };
        formElement.setAttribute('novalidate', 'true');
        formElement.setAttribute('data-is-initialized', 'true');

        this.objects.push(object);
    }

    initialize () {
        // Initialize each object
        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];

            // Bind events
            MiscEvent.addListener('submit', this.submit.bind(this, objectIndex), object.formElement);
            MiscEvent.addListener('form:validation', this.validation.bind(this, objectIndex), object.formElement);

            this.start(objectIndex);
        }
    }

    start (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        if (object.formElement.getAttribute('data-auto-load') === 'true') {
            MiscEvent.dispatch('submit', { 'dryRun': true }, object.formElement);
        }
    }

    validation (objectIndex, evt) {
        // This function will be fired by each component category so they can tell if they are valid or not
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.hasBeenChecked = true;

        if (
            !evt ||
            !evt.detail ||
            evt.detail.category === undefined ||
            evt.detail.isValid === undefined
        ) {
            return;
        }

        // Mark the component category as answered
        let isFinished = true;
        object.validationCategories[evt.detail.category] = {
            'isValid': evt.detail.isValid,
            'data': evt.detail.data
        };
        for (let category in object.validationCategories) {
            if (!object.validationCategories.hasOwnProperty(category)) {
                continue;
            }

            if (object.validationCategories[category] === null) {
                isFinished = false;
                break;
            }
        }

        // All the component categories answered the call, we can carry on with the form validation
        if (isFinished) {
            this.submit(objectIndex, evt);
        }
    }

    submit (objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (!object) {
            return false;
        }

        // Submission is in two steps :
        //  - First we ask the form components if they are valid through event dispatching
        //  - Then, once everyone came back, we make a decision on the form validity
        try {
            if (!object.hasBeenChecked) {
                object.validationCategories = MiscForm.getValidationCategories();

                // Check the form components
                evt.stopPropagation();
                evt.preventDefault();

                MiscEvent.dispatch('form:validate', {
                    'formElement': object.formElement,
                    'dryRun': ((evt.detail || { 'dryRun': false }).dryRun || false)
                });

                return false;
            }
            object.hasBeenChecked = false;

            // Check if the components are all valid
            const formValidity = MiscForm.checkValidity(object.validationCategories);
            if (!formValidity.isValid) {
                // At least one was not valid
                evt.stopPropagation();
                evt.preventDefault();

                // Focus on first error field
                const firstErrorField = object.formElement.querySelector('[aria-invalid="true"]');
                if (firstErrorField) {
                    MiscAccessibility.setFocus(firstErrorField);
                }

                return false;
            }

            // Organize data
            const formattedData = {};
            const dataPositionByKey = {};
            for (let dataKey in formValidity.data) {
                if (!formValidity.data.hasOwnProperty(dataKey)) {
                    continue;
                }

                let dataValue = formValidity.data[dataKey];
                try {
                    // Try if it is JSON
                    dataValue = JSON.parse(dataValue);
                } catch (ex) {
                }
                dataPositionByKey[dataKey] = dataValue.position;
                delete dataValue.position;
                formattedData[dataKey] = dataValue;
            }

            // Add technical hidden fields
            object.formElement
                .querySelectorAll('input[type="hidden"][name][data-technical-field]')
                .forEach((hiddenInputElement) => {
                    const hiddenInputName = hiddenInputElement.getAttribute('name');
                    const hiddenInputData = {
                        'value': hiddenInputElement.value
                    };
                    formattedData[hiddenInputName] = hiddenInputData;
                    dataPositionByKey[hiddenInputName] = 999;
                });

            // Sort formatted data
            const sortedKeys = Object.keys(dataPositionByKey).sort(function (a, b) {
                return parseInt(dataPositionByKey[a], 10) - parseInt(dataPositionByKey[b], 10);
            });
            const sortedData = {};
            for (let i = 0; i < sortedKeys.length; i++) {
                sortedData[sortedKeys[i]] = formattedData[sortedKeys[i]];
            }

            // Save city and adresse in local storage
            const fieldParameters = JSON.parse(window.sessionStorage.getItem('fields') || '{}');
            ['commune', 'adresse'].forEach((key) => {
                if (sortedData[key]) {
                    fieldParameters[key] = sortedData[key];
                } else if (fieldParameters[key]) {
                    delete fieldParameters[key];
                }
            });
            window.sessionStorage.setItem('fields', JSON.stringify(fieldParameters));

            // Statistics
            if (object.formElement.getAttribute('data-statistic')) {
                MiscEvent.dispatch(
                    'statistic:gtag:event',
                    {
                        'statistic': JSON.parse(object.formElement.getAttribute('data-statistic')),
                        'data': sortedData
                    });
            }

            if (object.formElement.getAttribute('data-is-ajax') === 'true') {
                // Ajax submission
                this.recaptchaSubmit(objectIndex, sortedData);

                evt.stopPropagation();
                evt.preventDefault();

                return false;
            }

            // Regular submission
            let hasFile = false;
            object.formElement
                .querySelectorAll('[name][type="file"]')
                .forEach((inputFileElement) => {
                    hasFile = true;
                    inputFileElement.setAttribute('name', inputFileElement.getAttribute('name') + '[value]');
                });
            if (hasFile) {
                object.formElement.setAttribute('method', 'post');
                object.formElement.setAttribute('enctype', 'multipart/form-data');
            }

            // Remove name from all elements not to interfere with the next step
            object.formElement
                .querySelectorAll('[name]:not([type="file"])')
                .forEach((element) => {
                    element.removeAttribute('name');
                });

            // Regular submission
            const formData = MiscForm.jsonToFormData(sortedData);
            for (var [key, value] of formData.entries()) {
                let hiddenInputElement = document.createElement('input');
                hiddenInputElement.setAttribute('type', 'hidden');
                hiddenInputElement.setAttribute('name', key);
                hiddenInputElement.value = value;
                object.formElement.appendChild(hiddenInputElement);
            }

            this.recaptchaSubmit(objectIndex, sortedData);
        } catch (ex) {
            console.log(ex);

            evt.stopPropagation();
            evt.preventDefault();

            return false;
        }
    }

    recaptchaSubmit (objectIndex, formData) {
        if (window.grecaptcha) {
            // Send using recaptcha
            const recaptchaId = document.querySelector('#googleRecaptchaId').getAttribute('src').split('render=').pop().split('?').shift();
            window.grecaptcha.ready((function (objectIndex, recaptchaId) {
                window.grecaptcha
                    .execute(recaptchaId, { action: 'submit' })
                    .then((function (objectIndex, token) {
                        const object = this.objects[objectIndex];
                        if (!object) {
                            return;
                        }

                        if (object.formElement.getAttribute('data-is-ajax') === 'true') {
                            // Ajax submission
                            formData['recaptcha[value]'] = token;
                        } else {
                            let hiddenInputElement = document.createElement('input');
                            hiddenInputElement.setAttribute('type', 'hidden');
                            hiddenInputElement.setAttribute('name', 'recaptcha[value]');
                            hiddenInputElement.value = token;
                            object.formElement.appendChild(hiddenInputElement);
                        }

                        this.send(objectIndex, formData);
                    }).bind(this, objectIndex))
            }).bind(this, objectIndex, recaptchaId));

            return;
        }

        this.send(objectIndex, formData);
    }

    send (objectIndex, formData) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        if (object.formElement.getAttribute('data-is-ajax') === 'true') {
            // Ajax submission
            this.ajaxSubmit(objectIndex, formData);
        } else {
            object.formElement.submit();
        }
    }

    ajaxSubmit (objectIndex, formData) {
        // Abstract method
    }

    clear (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        if (object.formElement.getAttribute('data-empty-after-submit') === 'true') {
            MiscEvent.dispatch('form:clear', {
                'formElement': object.formElement
            });
        }
    }

    notification (objectIndex, messageId, messageText, messageList, notificationType = 'error') {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        let containerElement = object.formElement.querySelector('.ds44-msg-container');
        if (containerElement) {
            containerElement.remove();
        }

        // Show message
        containerElement = document.createElement('div');
        containerElement.classList.add('ds44-msg-container');
        containerElement.classList.add(notificationType);
        containerElement.setAttribute('aria-live', 'polite');
        object.formElement.insertBefore(containerElement, object.formElement.firstChild);

        const textElement = document.createElement('p');
        if (messageId) {
            textElement.setAttribute('id', messageId);
        }
        textElement.classList.add('ds44-message-text');
        textElement.setAttribute('tabindex', '-1');
        containerElement.appendChild(textElement);

        const iconElement = document.createElement('i');
        iconElement.classList.add('icon');
        if (notificationType === 'information') {
            iconElement.classList.add('icon-check');
        } else if (notificationType === 'warning') {
            iconElement.classList.add('icon-help');
        } else {
            iconElement.classList.add('icon-attention');
        }
        iconElement.classList.add('icon--sizeL');
        iconElement.setAttribute('aria-hidden', 'true');
        textElement.appendChild(iconElement);

        const spanElement = document.createElement('span');
        spanElement.classList.add('ds44-iconInnerText');
        spanElement.innerText = messageText;
        textElement.appendChild(spanElement);

        if (messageList) {
            const listElement = document.createElement('ul');
            listElement.classList.add('ds44-errorList');
            textElement.appendChild(listElement);

            for (let i = 0; i < messageList.length; i++) {
                const listItemElement = document.createElement('li');
                listItemElement.innerText = messageList[i];
                listElement.appendChild(listItemElement);
            }
        }

        MiscAccessibility.setFocus(textElement);
    }
}

class FormFieldBoxAbstract extends FormFieldAbstract {
    constructor (category) {
        super(
            '.ds44-form__' + category + '_container',
            category
        );

        this.errorMessage = 'FIELD_BOX_MANDATORY_ERROR_MESSAGE';
    }

    create (element) {
        super.create(element);

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.inputElements = element.querySelectorAll('input[type="' + this.category + '"]');
    }

    initialize () {
        super.initialize();

        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];
            if (object.isSubInitialized) {
                continue;
            }
            object.isSubInitialized = true;

            object.inputElements.forEach((inputElement) => {
                MiscEvent.addListener('click', this.toggleCheck.bind(this, objectIndex), inputElement);
            });
        }
    }

    enableElements (objectIndex, evt) {
        super.enableElements(objectIndex, evt);

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.inputElements.forEach((inputElement) => {
            inputElement.removeAttribute('aria-disabled');
        });
        object.containerElement.classList.remove('ds44-inputDisabled');
    }

    disableElements (objectIndex, evt) {
        super.disableElements(objectIndex, evt);

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.inputElements.forEach((inputElement) => {
            inputElement.setAttribute('aria-disabled', 'true');
        });
        object.containerElement.classList.add('ds44-inputDisabled');
    }

    toggleCheck (objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (!object || !object.isEnabled) {
            evt.stopPropagation();
            evt.preventDefault();

            return;
        }

        this.showNotEmpty(objectIndex);
    }

    setData (objectIndex, data = null) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.inputElements.forEach((inputElement) => {
            if (
                data &&
                data.value &&
                data.value.includes(inputElement.value)
            ) {
                inputElement.checked = true;
            } else {
                inputElement.checked = false;
            }
        });
    }

    getData (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return null;
        }

        const inputElementValues = [];
        const inputElementTexts = [];
        object.inputElements.forEach((inputElement) => {
            if (inputElement.checked) {
                inputElementValues.push(inputElement.value);
                inputElementTexts.push(MiscDom.getNextSibling(inputElement).innerText);
            }
        });
        if (inputElementValues.length === 0) {
            return null;
        }

        let data = {};
        data[object.name] = {
            'value': inputElementValues,
            'text': inputElementTexts.join(', '),
            'position': object.position
        };

        return data;
    }

    removeInvalid (objectIndex) {
        super.removeInvalid(objectIndex);

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.inputElements.forEach((inputElement) => {
            const defaultAriaDescribedBy = inputElement.getAttribute('data-bkp-aria-describedby');
            if (!defaultAriaDescribedBy) {
                inputElement.removeAttribute('aria-describedby');
            } else {
                inputElement.setAttribute('aria-describedby', defaultAriaDescribedBy);
            }
            inputElement.removeAttribute('aria-invalid');
            inputElement.classList.remove('ds44-boxError');
        });
    }

    invalid (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        const errorMessageElementId = MiscUtils.generateId();
        this.showErrorMessage(objectIndex, errorMessageElementId);

        object.inputElements.forEach((inputElement) => {
            const defaultAriaDescribedBy = inputElement.getAttribute('data-bkp-aria-describedby');
            if (!defaultAriaDescribedBy) {
                inputElement.setAttribute('aria-describedby', errorMessageElementId);
            } else {
                inputElement.setAttribute('aria-describedby', errorMessageElementId + ' ' + defaultAriaDescribedBy);
            }
            inputElement.setAttribute('aria-invalid', 'true');
            inputElement.classList.add('ds44-boxError');
        });
    }
}

class FormFieldInputAbstract extends FormFieldAbstract {
    create (element) {
        super.create(element);

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.textElement = element;
        object.valueElement = element;
        object.inputElements = [element];
        object.labelElement = MiscDom.getPreviousSibling(element, 'label');
        object.resetButtonElement = MiscDom.getNextSibling(element, '.ds44-reset');
    }

    initialize () {
        super.initialize();

        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];
            if (object.isSubInitialized) {
                continue;
            }
            object.isSubInitialized = true;

            MiscEvent.addListener('focus', this.focus.bind(this, objectIndex), object.textElement);
            MiscEvent.addListener('blur', this.blur.bind(this, objectIndex), object.textElement);
            MiscEvent.addListener('invalid', this.invalid.bind(this, objectIndex), object.textElement);
            MiscEvent.addListener('keyUp:*', this.write.bind(this, objectIndex));
            if (object.resetButtonElement) {
                MiscEvent.addListener('click', this.reset.bind(this, objectIndex), object.resetButtonElement);
            }
            if (object.labelElement) {
                MiscEvent.addListener('click', this.focusOnTextElement.bind(this, objectIndex), object.labelElement);
            }
            this.quit(objectIndex);
        }
    }

    write (objectIndex) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.textElement ||
            object.textElement !== document.activeElement
        ) {
            return;
        }

        this.showNotEmpty(objectIndex);
    }

    showNotEmpty (objectIndex) {
        super.showNotEmpty(objectIndex);

        this.showHideResetButton(objectIndex);
    }

    reset (objectIndex) {
        this.empty(objectIndex);

        this.focusOnTextElement(objectIndex);
    }

    enableElements (objectIndex, evt) {
        super.enableElements(objectIndex, evt);

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.inputElements.forEach((inputElement) => {
            inputElement.removeAttribute('readonly');
            inputElement.removeAttribute('aria-readonly');
        });
        if (object.labelElement && object.labelElement.closest('label')) {
            object.labelElement.closest('label').classList.remove('ds44-inputDisabled');
        }
    }

    disableElements (objectIndex, evt) {
        super.disableElements(objectIndex, evt);

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.inputElements.forEach((inputElement) => {
            inputElement.setAttribute('readonly', 'true');
            inputElement.setAttribute('aria-readonly', 'true');
        });
        if (object.labelElement && object.labelElement.closest('label')) {
            object.labelElement.closest('label').classList.add('ds44-inputDisabled');
        }

        this.blur(objectIndex);
        this.showHideResetButton(objectIndex);
    }

    showHideResetButton (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.resetButtonElement) {
            return;
        }

        if (!this.getText(objectIndex)) {
            // Hide reset button
            object.resetButtonElement.style.display = 'none';
        } else {
            // Hide reset button
            object.resetButtonElement.style.display = 'block';
        }
    }

    setData (objectIndex, data = null) {
        const object = this.objects[objectIndex];
        if (!object || !object.valueElement) {
            return;
        }

        let value = ((data && data.value) ? data.value : null);
        if (
            value &&
            typeof value === 'object'
        ) {
            value = JSON.stringify(value);
        }
        object.valueElement.value = value;
    }

    getData (objectIndex) {
        let data = super.getData(objectIndex);
        if (!data) {
            return null;
        }

        const object = this.objects[objectIndex];
        if (!object) {
            return null;
        }

        const extendedData = {};
        extendedData[object.name] = {
            'text': object.valueElement.value
        };

        return MiscUtils.merge(data, extendedData);
    }

    getText (objectIndex) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.textElement ||
            !object.textElement.value
        ) {
            return null;
        }

        return object.textElement.value;
    }

    isEmpty (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return true;
        }

        let isEmpty = !this.getText(objectIndex);
        if (isEmpty) {
            object.inputElements.forEach((inputElement) => {
                let isValid = true;
                const validityStates = inputElement.validity;
                for (let key in validityStates) {
                    if (!validityStates.hasOwnProperty(key)) {
                        continue;
                    }

                    if (
                        key !== 'valid' &&
                        key !== 'valueMissing' &&
                        validityStates[key]
                    ) {
                        isValid = false;
                        break;
                    }
                }

                isEmpty = (isEmpty && isValid);
            });
        }

        return isEmpty;
    }

    focusOnTextElement (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        MiscAccessibility.setFocus(object.inputElements[0]);
    }

    focus (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.isEnabled) {
            return;
        }

        this.enter(objectIndex);
    }

    blur (objectIndex) {
        if (!this.isEmpty(objectIndex)) {
            return;
        }

        this.quit(objectIndex);
    }

    getErrorMessage (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.textElement) {
            return this.formatErrorMessage(objectIndex);
        }

        const data = this.getData(objectIndex);
        if (!data) {
            return this.formatErrorMessage(objectIndex);
        }

        const autocomplete = object.textElement.getAttribute('autocomplete');
        if (
            autocomplete === 'email' &&
            !MiscForm.isEmail(data[object.name].value)
        ) {
            return this.formatErrorMessage(objectIndex, 'FIELD_VALID_EMAIL_MESSAGE');
        }
        if (
            autocomplete === 'tel' &&
            !MiscForm.isPhone(data[object.name].value)
        ) {
            return this.formatErrorMessage(objectIndex, 'FIELD_VALID_PHONE_MESSAGE');
        }
        if (
            autocomplete === 'postal-code' &&
            !MiscForm.isPostcode(data[object.name].value)
        ) {
            return this.formatErrorMessage(objectIndex, 'FIELD_VALID_POSTCODE_MESSAGE');
        }

        const inputMode = object.textElement.getAttribute('inputmode');
        if (
            inputMode === 'numeric' &&
            !MiscForm.isNumber(data[object.name].value)
        ) {
            return this.formatErrorMessage(objectIndex, 'FIELD_VALID_NUMBER_MESSAGE');
        }

        return this.formatErrorMessage(objectIndex);
    }

    checkFormat (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.textElement) {
            return true;
        }

        const data = this.getData(objectIndex);
        if (!data) {
            return true;
        }

        const autocomplete = object.textElement.getAttribute('autocomplete');
        if (
            autocomplete === 'email' &&
            !MiscForm.isEmail(data[object.name].value)
        ) {
            return false;
        }
        if (
            autocomplete === 'tel' &&
            !MiscForm.isPhone(data[object.name].value)
        ) {
            return false;
        }
        if (
            autocomplete === 'postal-code' &&
            !MiscForm.isPostcode(data[object.name].value)
        ) {
            return false;
        }

        const inputMode = object.textElement.getAttribute('inputmode');
        if (
            inputMode === 'numeric' &&
            !MiscForm.isNumber(data[object.name].value)
        ) {
            return false;
        }

        return true;
    }

    removeInvalid (objectIndex) {
        super.removeInvalid(objectIndex);

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        if (object.textElement) {
            object.textElement.classList.remove('ds44-error');
        }

        object.inputElements.forEach((inputElement) => {
            const defaultAriaDescribedBy = inputElement.getAttribute('data-bkp-aria-describedby');
            if (!defaultAriaDescribedBy) {
                inputElement.removeAttribute('aria-describedby');
            } else {
                inputElement.setAttribute('aria-describedby', defaultAriaDescribedBy);
            }
            inputElement.removeAttribute('aria-invalid');
        });
    }

    invalid (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.textElement) {
            return;
        }

        const errorMessageElementId = MiscUtils.generateId();
        this.showErrorMessage(objectIndex, errorMessageElementId);

        object.inputElements.forEach((inputElement) => {
            const defaultAriaDescribedBy = inputElement.getAttribute('data-bkp-aria-describedby');
            if (!defaultAriaDescribedBy) {
                inputElement.setAttribute('aria-describedby', errorMessageElementId);
            } else {
                inputElement.setAttribute('aria-describedby', errorMessageElementId + ' ' + defaultAriaDescribedBy);
            }
            inputElement.setAttribute('aria-invalid', 'true');
        });
        object.textElement.classList.add('ds44-error');
    }
}

class FormFieldSelectAbstract extends FormFieldAbstract {
    create (element) {
        this.labelClassName = 'ds44-moveSelectLabel';

        super.create(element);

        // Create corresponding hidden input to store the value
        let valueElement = document.createElement('input');
        valueElement.classList.add('ds44-input-value');
        valueElement.setAttribute('type', 'hidden');
        element.parentNode.insertBefore(valueElement, element);

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.textElement = element;
        object.valueElement = valueElement;
        object.shapeElement = object.containerElement.querySelector('.ds44-select__shape');
        object.labelElement = object.containerElement.querySelector('.ds44-selectLabel');
        object.buttonElement = object.containerElement.querySelector('.ds44-btnOpen');
        object.buttonIconElement = object.containerElement.querySelector('.ds44-btnOpen .icon');
        object.buttonTextElement = object.containerElement.querySelector('.ds44-btnOpen .visually-hidden');
        object.resetButtonElement = MiscDom.getNextSibling(element, '.ds44-reset');
        object.selectContainerElement = object.containerElement.querySelector('.ds44-select-container');
        object.selectListElement = null;
        object.selectButtonElement = null;
        if (object.selectContainerElement) {
            object.selectListElement = object.selectContainerElement.querySelector('.ds44-listSelect');
            object.selectButtonElement = object.selectContainerElement.querySelector('.ds44-btnSelect');
        }
        object.isExpanded = false;
        object.validationCategories = MiscForm.getValidationCategories();
    }

    initialize () {
        super.initialize();

        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];
            if (object.isSubInitialized) {
                continue;
            }
            object.isSubInitialized = true;

            MiscEvent.addListener('keyUp:escape', this.escape.bind(this, objectIndex));
            MiscEvent.addListener('keyUp:arrowup', this.previousOption.bind(this, objectIndex));
            MiscEvent.addListener('keyUp:arrowdown', this.nextOption.bind(this, objectIndex));
            if (object.shapeElement) {
                MiscEvent.addListener('click', this.showHide.bind(this, objectIndex), object.shapeElement);
            }
            MiscEvent.addListener('focusout', this.focusOut.bind(this, objectIndex), object.containerElement);
            MiscEvent.addListener('click', this.focusOut.bind(this, objectIndex), document.body);
            if (object.resetButtonElement) {
                MiscEvent.addListener('click', this.reset.bind(this, objectIndex), object.resetButtonElement);
            }

            if (object.selectListElement) {
                MiscEvent.addListener('form:validation', this.validation.bind(this, objectIndex), object.selectListElement);
                object.selectListElement
                    .querySelectorAll('.ds44-select-list_elem')
                    .forEach((listElement) => {
                        this.setListElementEvents(listElement, objectIndex);
                    });
            }
            if (object.selectButtonElement) {
                MiscEvent.addListener('click', this.record.bind(this, objectIndex), object.selectButtonElement);
            }

            this.quit(objectIndex);
            this.hide(objectIndex);
        }
    }

    validation (objectIndex, evt) {
        if (
            !evt ||
            !evt.detail ||
            evt.detail.category === undefined ||
            evt.detail.isValid === undefined
        ) {
            return;
        }

        // Mark the component category as answered
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        let isFinished = true;
        object.validationCategories[evt.detail.category] = {
            'isValid': evt.detail.isValid,
            'data': evt.detail.data
        };
        for (let category in object.validationCategories) {
            if (!object.validationCategories.hasOwnProperty(category)) {
                continue;
            }

            if (object.validationCategories[category] === null) {
                isFinished = false;
                break;
            }
        }

        // All the component categories answered the call, we can carry on with the form validation
        if (isFinished) {
            const formValidity = MiscForm.checkValidity(object.validationCategories);
            if (formValidity.isValid) {
                this.save(objectIndex, formValidity.data);
            } else if (object.selectListElement) {
                const firstErrorField = object.selectListElement.querySelector('[aria-invalid="true"]');
                if (firstErrorField) {
                    MiscAccessibility.setFocus(firstErrorField);
                }
            }
        }
    }

    empty (objectIndex) {
        super.empty(objectIndex);

        this.quit(objectIndex);
    }

    showNotEmpty (objectIndex) {
        super.showNotEmpty(objectIndex);

        this.showHideResetButton(objectIndex);
    }

    reset (objectIndex, evt) {
        if (evt) {
            evt.stopPropagation();
            evt.preventDefault();
        }

        this.empty(objectIndex);
        this.focusOnButtonElement(objectIndex);
        this.autoSubmit(objectIndex);
    }

    focusOnButtonElement (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.buttonElement) {
            return;
        }

        MiscAccessibility.setFocus(object.buttonElement);
    }

    setListElementEvents (listElement, objectIndex) {
        MiscEvent.addListener('mousedown', this.select.bind(this, objectIndex), listElement);
    }

    enableElements (objectIndex, evt) {
        super.enableElements(objectIndex, evt);

        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.shapeElement ||
            !object.buttonElement
        ) {
            return;
        }

        object.shapeElement.classList.remove('ds44-inputDisabled');
        object.buttonElement.removeAttribute('aria-disabled');

        if (object.textElement.getAttribute('data-url')) {
            let autoCompleteParameters = null;
            if (
                evt &&
                evt.detail &&
                evt.detail.data
            ) {
                autoCompleteParameters = evt.detail.data;
            }
            this.autoComplete(objectIndex, autoCompleteParameters);
        }
    }

    disableElements (objectIndex, evt) {
        super.disableElements(objectIndex, evt);

        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.labelElement ||
            !object.shapeElement ||
            !object.buttonElement ||
            !object.selectListElement
        ) {
            return;
        }

        object.selectListElement
            .querySelectorAll('.selected_option')
            .forEach((listElement) => {
                listElement.classList.remove('.selected_option');
            });

        object.shapeElement.classList.add('ds44-inputDisabled');
        object.buttonElement.setAttribute('aria-disabled', 'true');

        this.quit(objectIndex);
        this.hide(objectIndex);
        this.showHideResetButton(objectIndex);
    }

    showHideResetButton (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.resetButtonElement) {
            return;
        }

        if (!this.getData(objectIndex)) {
            // Hide reset button
            object.resetButtonElement.style.display = 'none';
        } else {
            // Hide reset button
            object.resetButtonElement.style.display = 'block';
        }
    }

    setData (objectIndex, data = null) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.valueElement ||
            !object.textElement ||
            !object.buttonElement
        ) {
            return;
        }

        let value = ((data && data.value) ? data.value : null);
        if (
            value &&
            typeof value === 'object'
        ) {
            value = JSON.stringify(value);
        }
        object.valueElement.value = value;
        object.textElement.innerHTML = ((data && data.text) ? '<p>' + data.text + '</p>' : null);

        if (value) {
            object.buttonElement.setAttribute('aria-describedby', object.textElement.getAttribute('id'));
        } else {
            object.buttonElement.removeAttribute('aria-describedby');
        }

        this.selectFromValue(objectIndex);
    }

    getData (objectIndex) {
        let data = super.getData(objectIndex);
        if (!data) {
            return null;
        }

        const object = this.objects[objectIndex];
        if (!object) {
            return null;
        }

        const extendedData = {};
        extendedData[object.name] = {
            'text': object.textElement.innerText
        };

        return MiscUtils.merge(data, extendedData);
    }

    showHide (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        if (!object.isExpanded) {
            this.show(objectIndex);

            return;
        }

        this.hide(objectIndex);
    }

    focusOut (objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        if (
            !evt ||
            (
                evt.type === 'focusout' &&
                (
                    !object.containerElement.contains(evt.target) ||
                    !evt.relatedTarget ||
                    object.containerElement.contains(evt.relatedTarget)
                )
            ) ||
            (
                evt.type === 'click' &&
                object.containerElement.contains(evt.target)
            )
        ) {
            return;
        }

        this.hide(objectIndex);
    }

    show (objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.shapeElement ||
            !object.buttonElement ||
            !object.buttonIconElement ||
            !object.buttonTextElement ||
            !object.selectContainerElement
        ) {
            return;
        }

        if (!object.isEnabled) {
            // Don't show if disabled
            if (evt) {
                evt.stopPropagation();
                evt.preventDefault();
            }

            return;
        }

        object.selectContainerElement.classList.remove('hidden');
        MiscAccessibility.show(object.selectContainerElement);
        object.buttonElement.setAttribute('aria-expanded', 'true');
        object.buttonIconElement.classList.remove('icon-down');
        object.buttonIconElement.classList.add('icon-up');
        object.isExpanded = true;

        this.nextOption(objectIndex);
    }

    hide (objectIndex) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.buttonElement ||
            !object.buttonIconElement ||
            !object.buttonTextElement ||
            !object.selectContainerElement
        ) {
            return;
        }

        object.selectContainerElement.classList.add('hidden');
        MiscAccessibility.hide(object.selectContainerElement);
        object.buttonElement.setAttribute('aria-expanded', 'false');
        object.buttonIconElement.classList.add('icon-down');
        object.buttonIconElement.classList.remove('icon-up');
        object.isExpanded = false;
    }

    escape (objectIndex) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !document.activeElement ||
            !object.containerElement.contains(document.activeElement)
        ) {
            return;
        }

        this.focusOnButtonElement(objectIndex);
        this.hide(objectIndex);
    }

    autoComplete (objectIndex, parameters) {
        const object = this.objects[objectIndex];
        if (!object || !object.textElement) {
            return;
        }

        let url = object.textElement.getAttribute('data-url');
        if (url.includes('$parentValue')) {
            url = url.replace('$parentValue', object.parentValue);
        }
        let urlParameters = null;
        if (parameters) {
            const objectData = parameters[Object.keys(parameters)[0]];
            if (objectData) {
                urlParameters = (url.includes('?') ? '&' : '?') + 'q=' + encodeURIComponent(objectData.value);
            }
        }

        MiscRequest.send(
            url + urlParameters,
            this.autoCompleteSuccess.bind(this, objectIndex),
            this.autoCompleteError.bind(this, objectIndex)
        );
    }

    autoCompleteSuccess (objectIndex, results) {
        this.autoCompleteFill(objectIndex, results);
    }

    autoCompleteError (objectIndex) {
        this.autoCompleteFill(objectIndex, {});
    }

    autoCompleteFill (objectIndex, results) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.textElement ||
            !object.selectListElement ||
            !object.selectContainerElement
        ) {
            return;
        }

        const subSelectListElement = object.selectListElement.querySelector('.ds44-list');
        if (!subSelectListElement) {
            return;
        }

        object.textElement.removeAttribute('aria-activedescendant');
        Array.from(subSelectListElement.children).map((childElement) => {
            childElement.remove();
        });

        if (Object.keys(results).length === 0) {
            // No result
            let elementSelectListItem = document.createElement('li');
            elementSelectListItem.classList.add('ds44-select-list_no_elem');
            elementSelectListItem.innerHTML = MiscTranslate._('NO_RESULTS_FOUND');
            subSelectListElement.appendChild(elementSelectListItem);
        } else {
            // Some result
            for (let key in results) {
                if (!results.hasOwnProperty(key)) {
                    continue;
                }

                let elementSelectListItem = this.getListElement(object, (results[key].id || key), results[key].value);
                subSelectListElement.appendChild(elementSelectListItem);

                this.setListElementEvents(elementSelectListItem, objectIndex);
            }
        }

        this.selectFromValue(objectIndex);
        MiscAccessibility.hide(object.selectContainerElement);
    }

    getListElement (object, key, value) {
        let elementSelectListItem = document.createElement('li');
        elementSelectListItem.classList.add('ds44-select-list_elem');
        elementSelectListItem.setAttribute('role', 'option');
        elementSelectListItem.setAttribute('data-text', value);
        elementSelectListItem.setAttribute('data-value', key);
        elementSelectListItem.setAttribute('tabindex', '0');
        elementSelectListItem.innerHTML = value;

        return elementSelectListItem;
    }

    nextOption (objectIndex, evt) {
        if (evt) {
            evt.preventDefault();
            evt.stopPropagation();
        }

        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.selectListElement ||
            !object.isExpanded
        ) {
            return;
        }

        const listItems = this.getListItems(object.selectListElement);
        if (
            !listItems.selected ||
            listItems.selected === listItems.last
        ) {
            // Select first
            MiscAccessibility.setFocus(listItems.first)
        } else {
            // Select next
            MiscAccessibility.setFocus(listItems.next);
        }
    }

    previousOption (objectIndex, evt) {
        if (evt) {
            evt.preventDefault();
            evt.stopPropagation();
        }

        const object = this.objects[objectIndex];
        if (!object || !object.isExpanded) {
            return;
        }

        const listItems = this.getListItems(object.selectListElement);
        if (
            !listItems.selected ||
            listItems.selected === listItems.first
        ) {
            // Select last
            MiscAccessibility.setFocus(listItems.last)
        } else {
            // Select previous
            MiscAccessibility.setFocus(listItems.previous);
        }
    }

    getListItems (parentElement) {
        // Abstract method
    }

    select (objectIndex, evt) {
        // Abstract method
    }

    selectFromValue (objectIndex) {
        // Abstract method
    }

    getDomData (listElement) {
        // Abstract method
    }

    record (objectIndex, evt) {
        if (evt) {
            evt.preventDefault();
        }

        const object = this.objects[objectIndex];
        if (!object || !object.selectListElement) {
            return;
        }

        // Check sub child elements validity
        object.validationCategories = MiscForm.getValidationCategories();
        if (object.selectListElement.querySelector('.ds44-select-list_elem_child:not(.hidden)')) {
            MiscEvent.dispatch('form:validate', { 'formElement': object.selectListElement });

            return;
        }

        this.save(objectIndex);
    }

    save (objectIndex, additionalData) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.textElement ||
            !object.valueElement ||
            !object.selectListElement
        ) {
            return;
        }

        const values = [];
        const texts = [];
        object.selectListElement
            .querySelectorAll('.selected_option')
            .forEach((listElement) => {
                const domData = this.getDomData(listElement);

                const text = [];
                let isFound = false;
                if (additionalData) {
                    for (let additionalDataKey in additionalData) {
                        if (!additionalData.hasOwnProperty(additionalDataKey)) {
                            continue;
                        }

                        const additionalElement = object.selectListElement.querySelector('[name="' + additionalDataKey + '"], [data-name="' + additionalDataKey + '"]');
                        if (listElement.contains(additionalElement)) {
                            let value = {};
                            value[additionalDataKey] = additionalData[additionalDataKey];
                            values.push(value);

                            let labelText = value[additionalDataKey].text;
                            const additionalLabelElement = MiscDom.getPreviousSibling(additionalElement, 'label');
                            if (additionalLabelElement) {
                                labelText = additionalLabelElement.innerText.replace(/\*$/, '')
                            }
                            if (text.length > 0) {
                                text.push(labelText.toLowerCase() + ' ' + this.formatValue(value[additionalDataKey].value));
                            } else {
                                text.push(labelText + ' ' + this.formatValue(value[additionalDataKey].value));
                            }

                            isFound = true;
                        }
                    }
                }
                if (!isFound) {
                    values.push(domData.value);
                }

                texts.push(domData.text + (text.length > 0 ? ' : ' + text.join(' ') : ''));
            });
        if (values.length === 0) {
            // No value
            this.empty(objectIndex);
        } else {
            let formattedValue = null;
            if (values.length === 1) {
                if (typeof values[0] === 'object') {
                    formattedValue = JSON.stringify(values[0]);
                } else {
                    formattedValue = values[0];
                }
            } else {
                let isJson = true;
                let formattedJson = {};
                for (let valueKey in values) {
                    if (!values.hasOwnProperty(valueKey)) {
                        continue;
                    }

                    if (typeof values[valueKey] !== 'object') {
                        isJson = false;
                        break;
                    }

                    formattedJson = Object.assign(formattedJson, values[valueKey]);
                }
                if (isJson) {
                    formattedValue = JSON.stringify(formattedJson);
                } else {
                    formattedValue = JSON.stringify(values);
                }
            }
            this.setData(
                objectIndex,
                {
                    'value': formattedValue,
                    'text': texts.join(', '),
                }
            );
            this.enter(objectIndex);
        }

        this.focusOnButtonElement(objectIndex);
        this.hide(objectIndex);
        this.checkValidity(objectIndex);
        this.showNotEmpty(objectIndex);
        this.autoSubmit(objectIndex);
    }

    autoSubmit (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        if (object.textElement.getAttribute('data-auto-submit')) {
            // Auto submit
            const formElement = object.textElement.closest('form');
            if (formElement) {
                MiscEvent.dispatch('submit', null, formElement);
            }
        }
    }

    removeInvalid (objectIndex) {
        super.removeInvalid(objectIndex);

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        if (object.buttonElement) {
            object.buttonElement.removeAttribute('aria-invalid');
        }
        if (!object.shapeElement) {
            object.shapeElement.classList.remove('ds44-error');
        }
    }

    invalid (objectIndex) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.textElement ||
            !object.buttonElement ||
            !object.shapeElement
        ) {
            return;
        }

        const errorMessageElementId = MiscUtils.generateId();
        this.showErrorMessage(objectIndex, errorMessageElementId);

        object.buttonElement.setAttribute('aria-invalid', 'true');
        object.shapeElement.classList.add('ds44-error');

        if (!this.getData(objectIndex)) {
            object.buttonElement.setAttribute('aria-describedby', errorMessageElementId);
        } else {
            object.buttonElement.setAttribute('aria-describedby', errorMessageElementId + ' ' + object.textElement.getAttribute('id'));
        }
    }

    formatValue (value) {
        if (
            typeof value == 'string' &&
            value.match(/^(19|20)\d\d([- /.])(0?[1-9]|1[012])\2(0?[1-9]|[12][0-9]|3[01])$/)
        ) {
            // Date
            const dateArray = value.split('-');
            value = dateArray[2] + '/' + dateArray[1] + '/' + dateArray[0];
        }

        return value;
    }
}

class FormLayoutUtileAbstract extends FormLayoutAbstract {
    ajaxSubmit (objectIndex, formData) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        // Show loader
        MiscEvent.dispatch('loader:requestShow');

        // Add other details to parameters
        formData.url = { 'value': document.location.href };
        formData.title = { 'value': document.title };
        formData.date = {
            'value': (new Date()).toLocaleString(
                'fr-FR',
                {
                    'timeZone': 'UTC',
                    'timeZoneName': 'short'
                }
            )
        };

        // Get the results from the back office
        MiscRequest.send(
            object.formElement.getAttribute('action'),
            this.submitSuccess.bind(this, objectIndex),
            this.submitError.bind(this, objectIndex),
            formData
        );
    }

    submitSuccess (objectIndex, response) {
        if (
            response &&
            response.message
        ) {
            this.notification(objectIndex, null, response.message, response.message_list, response.status);
        }

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        // Add aria described by to textarea
        const textareaElement = object.formElement.querySelector('textarea');
        if (textareaElement) {
            const defaultAriaDescribedBy = textareaElement.getAttribute('data-bkp-aria-describedby');
            if (!defaultAriaDescribedBy) {
                textareaElement.removeAttribute('aria-describedby');
            } else {
                textareaElement.setAttribute('aria-describedby', defaultAriaDescribedBy);
            }
        }

        this.clear(objectIndex);

        // Hide loader
        MiscEvent.dispatch('loader:requestHide');
    }

    submitError (objectIndex, response) {
        const messageId = MiscUtils.generateId();
        if (
            response &&
            response.message
        ) {
            this.notification(objectIndex, messageId, response.message, response.message_list, response.status);
        }

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        // Add aria described by to textarea
        const textareaElement = object.formElement.querySelector('textarea');
        if (textareaElement) {
            const defaultAriaDescribedBy = textareaElement.getAttribute('data-bkp-aria-describedby');
            textareaElement.setAttribute('aria-describedby', messageId + (defaultAriaDescribedBy ? ' ' + defaultAriaDescribedBy : ''));
        }

        // Hide loader
        MiscEvent.dispatch('loader:requestHide');
    }
}

class FormFieldBoxCheckbox extends FormFieldBoxAbstract {
    constructor () {
        super('checkbox');
    }
}

// Singleton
new FormFieldBoxCheckbox();

class FormFieldBoxRadio extends FormFieldBoxAbstract {
    constructor () {
        super('radio');
    }
}

// Singleton
new FormFieldBoxRadio();

class FormFieldInputAutoComplete extends FormFieldInputAbstract {
    constructor () {
        super(
            'input[aria-autocomplete="list"]',
            'inputAutocomplete'
        );
    }

    create (element) {
        super.create(element);

        this.FREE_TEXT_MODE = 'free-text';
        this.SELECT_ONLY_MODE = 'select-only';

        // Create corresponding hidden input to store the value
        let valueElement = document.createElement('input');
        valueElement.classList.add('ds44-input-value');
        valueElement.setAttribute('type', 'hidden');
        element.parentNode.insertBefore(valueElement, element);

        // Create corresponding hidden input to store the metadata
        let metadataElement = document.createElement('input');
        metadataElement.classList.add('ds44-input-metadata');
        metadataElement.setAttribute('type', 'hidden');
        element.parentNode.insertBefore(metadataElement, element);

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.valueElement = valueElement;
        object.metadataElement = metadataElement;
        object.autoCompleterElement = object.containerElement.querySelector('.ds44-autocomp-container');
        object.autoCompleterListElement = null;
        if (object.autoCompleterElement) {
            object.autoCompleterListElement = object.autoCompleterElement.querySelector('.ds44-list');
        }
        if (object.textElement.getAttribute('data-mode') === this.SELECT_ONLY_MODE) {
            object.mode = this.SELECT_ONLY_MODE;
        } else {
            object.mode = this.FREE_TEXT_MODE;
        }
        object.isExpanded = false;
    }

    initialize () {
        super.initialize();

        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];
            if (object.isSubSubInitialized) {
                continue;
            }
            object.isSubSubInitialized = true;

            object.textElement.setAttribute('aria-owns', 'owned_listbox_' + object.id);
            if (object.autoCompleterListElement) {
                object.autoCompleterListElement.setAttribute('id', 'owned_listbox_' + object.id);
            }

            this.hide(objectIndex);

            MiscEvent.addListener('keyDown:*', this.record.bind(this, objectIndex));
            MiscEvent.addListener('keyUp:escape', this.escape.bind(this, objectIndex));
            MiscEvent.addListener('keyUp:arrowup', this.previousOption.bind(this, objectIndex));
            MiscEvent.addListener('keyUp:arrowdown', this.nextOption.bind(this, objectIndex));
            MiscEvent.addListener('focusout', this.focusOut.bind(this, objectIndex), object.containerElement);

            const locationElement = object.containerElement.querySelector('.ds44-location');
            if (locationElement) {
                MiscEvent.addListener('click', this.aroundMe.bind(this, objectIndex), locationElement);
            }

            object.containerElement
                .querySelectorAll('.ds44-autocomp-buttons button')
                .forEach((buttonElement) => {
                    MiscEvent.addListener('click', this.select.bind(this, objectIndex), buttonElement);
                });
        }
    }

    disableElements (objectIndex, evt) {
        super.disableElements(objectIndex, evt);

        this.hide(objectIndex);
    }

    setData (objectIndex, data = null) {
        super.setData(objectIndex, data);

        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.textElement ||
            !object.metadataElement
        ) {
            return;
        }

        object.currentElementValue = ((data && data.text) ? data.text : null);
        if (object.currentElementValue) {
            object.textElement.setAttribute('value', object.currentElementValue);
        } else {
            object.textElement.removeAttribute('value');
        }
        if (object.textElement.value !== object.currentElementValue) {
            object.textElement.value = object.currentElementValue;
        }
        if (data && data.metadata) {
            if (typeof data.metadata === 'object') {
                object.metadataElement.value = JSON.stringify(data.metadata);
            } else {
                object.metadataElement.value = data.metadata;
            }
        } else {
            object.metadataElement.value = null;
        }
    }

    getData (objectIndex) {
        let data = super.getData(objectIndex);
        if (!data) {
            return null;
        }

        const object = this.objects[objectIndex];
        if (!object) {
            return null;
        }

        const extendedData = {};
        extendedData[object.name] = {
            'text': object.textElement.value,
            'metadata': (object.metadataElement.value ? JSON.parse(object.metadataElement.value) : null)
        };

        return MiscUtils.merge(data, extendedData);
    }

    record (objectIndex) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.textElement ||
            object.textElement !== document.activeElement
        ) {
            return;
        }

        object.currentElementValue = object.textElement.value;
        if (object.currentElementValue) {
            object.textElement.setAttribute('value', object.currentElementValue);
        } else {
            object.textElement.removeAttribute('value');
        }
    }

    write (objectIndex) {
        super.write(objectIndex);

        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.textElement ||
            object.textElement !== document.activeElement
        ) {
            return;
        }

        this.autoComplete(objectIndex);
    }

    autoComplete (objectIndex) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.textElement ||
            !object.valueElement ||
            !object.metadataElement ||
            object.currentElementValue === object.textElement.value
        ) {
            return;
        }

        if (
            object.mode === this.FREE_TEXT_MODE ||
            !object.textElement.value
        ) {
            this.setData(
                objectIndex,
                {
                    'text': object.textElement.value,
                    'value': object.textElement.value
                }
            );
        } else {
            this.setData(
                objectIndex,
                {
                    'text': object.textElement.value,
                    'value': null,
                    'metadata': null
                }
            );
        }

        if (!object.textElement.value) {
            this.hide(objectIndex);

            return;
        }

        let url = object.textElement.getAttribute('data-url');
        if (url.includes('$parentValue')) {
            url = url.replace('$parentValue', object.parentValue);
        }
        MiscRequest.send(
            url + (url.includes('?') ? '&' : '?') + 'q=' + encodeURIComponent(object.textElement.value),
            this.autoCompleteSuccess.bind(this, objectIndex),
            this.autoCompleteError.bind(this, objectIndex)
        );
    }

    autoCompleteSuccess (objectIndex, results) {
        this.autoCompleteFill(objectIndex, results);
    }

    autoCompleteError (objectIndex) {
        this.autoCompleteFill(objectIndex, {});
    }

    autoCompleteFill (objectIndex, results) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.textElement ||
            !object.autoCompleterListElement
        ) {
            return;
        }

        // Translate results
        results = this.translate(objectIndex, results);

        object.textElement.removeAttribute('aria-activedescendant');
        Array.from(object.autoCompleterListElement.children).map((childElement) => {
            childElement.remove();
        });

        if (Object.keys(results).length === 0) {
            // No result
            let elementAutoCompleterListItem = document.createElement('li');
            elementAutoCompleterListItem.classList.add('ds44-autocomp-list_no_elem');
            elementAutoCompleterListItem.innerHTML = MiscTranslate._('NO_RESULTS_FOUND');
            object.autoCompleterListElement.appendChild(elementAutoCompleterListItem);
        } else {
            // Some result
            for (let key in results) {
                if (!results.hasOwnProperty(key)) {
                    continue;
                }

                let elementAutoCompleterListItem = document.createElement('li');
                elementAutoCompleterListItem.classList.add('ds44-autocomp-list_elem');
                elementAutoCompleterListItem.setAttribute('role', 'option');
                elementAutoCompleterListItem.setAttribute('data-text', results[key].value);
                elementAutoCompleterListItem.setAttribute('title', results[key].value);
                if (object.mode === this.FREE_TEXT_MODE) {
                    elementAutoCompleterListItem.setAttribute('data-value', results[key].value);
                } else {
                    elementAutoCompleterListItem.setAttribute('data-value', (results[key].id || key));
                }
                elementAutoCompleterListItem.setAttribute('data-metadata', (results[key].metadata ? JSON.stringify(results[key].metadata) : null));
                elementAutoCompleterListItem.setAttribute('tabindex', '0');
                elementAutoCompleterListItem.innerHTML = this.highlightSearch(results[key].value, object.textElement.value);
                object.autoCompleterListElement.appendChild(elementAutoCompleterListItem);

                MiscEvent.addListener('focus', this.fakeSelect.bind(this, objectIndex), elementAutoCompleterListItem);
                MiscEvent.addListener('mousedown', this.select.bind(this, objectIndex), elementAutoCompleterListItem);
            }
        }

        this.show(objectIndex);
    }

    translate (objectIndex, results) {
        const object = this.objects[objectIndex];
        if (!object || !object.textElement) {
            return results;
        }

        if (object.textElement.classList.contains('ds44-js-field-address')) {
            // Address from BAN
            const formatedResults = {};

            if (results.features) {
                for (let i = 0; i < results.features.length; i++) {
                    const feature = results.features[i];

                    formatedResults[feature.properties.id] = {
                        value: feature.properties.label,
                        metadata: {
                            latitude: feature.geometry.coordinates[1],
                            longitude: feature.geometry.coordinates[0]
                        }
                    }
                }
            }

            results = formatedResults;
        }

        return results;
    }

    focus (objectIndex) {
        const object = this.objects[objectIndex];
        if (object && object.isEnabled && object.textElement) {
            if (
                object.currentElementValue &&
                object.currentElementValue !== object.textElement.value
            ) {
                object.textElement.value = object.currentElementValue;
            }

            this.autoComplete(objectIndex);
        }

        super.focus(objectIndex);
    }

    focusOut (objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.textElement ||
            !object.valueElement
        ) {
            return;
        }

        if (
            evt &&
            object.containerElement.contains(evt.target) &&
            object.containerElement.contains(evt.relatedTarget)
        ) {
            return;
        }

        this.hide(objectIndex);
    }

    invalid (objectIndex) {
        super.invalid(objectIndex);

        this.hide(objectIndex);
    }

    show (objectIndex) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.textElement ||
            !object.autoCompleterElement
        ) {
            return;
        }

        object.autoCompleterElement.classList.remove('hidden');
        MiscAccessibility.show(object.autoCompleterElement);
        object.textElement.setAttribute('aria-expanded', 'true');
        object.isExpanded = true;
    }

    hide (objectIndex) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.textElement ||
            !object.autoCompleterElement
        ) {
            return;
        }

        if (
            object.currentElementValue &&
            object.currentElementValue !== object.textElement.value
        ) {
            object.textElement.value = object.currentElementValue;
        }

        object.autoCompleterElement.classList.add('hidden');
        MiscAccessibility.hide(object.autoCompleterElement);
        object.textElement.setAttribute('aria-expanded', 'false');
        object.isExpanded = false;

        this.showNotEmpty(objectIndex);
    }

    escape (objectIndex) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !document.activeElement ||
            !object.containerElement.contains(document.activeElement) ||
            !object.textElement
        ) {
            return;
        }

        MiscAccessibility.setFocus(object.textElement);

        this.hide(objectIndex);
    }

    highlightSearch (result, search) {
        if (!result) {
            return '';
        }

        return result.replace(new RegExp(search, 'gi'), str => `<strong>${str}</strong>`);
    }

    nextOption (objectIndex, evt) {
        evt.preventDefault();

        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.autoCompleterListElement ||
            !object.isExpanded
        ) {
            return;
        }

        const selectedListItem = object.autoCompleterListElement.querySelector('.ds44-autocomp-list_elem:focus');
        const lastListItem = object.autoCompleterListElement.querySelector('.ds44-autocomp-list_elem:last-child');
        if (
            !selectedListItem ||
            selectedListItem === lastListItem
        ) {
            // Select first
            MiscAccessibility.setFocus(object.autoCompleterListElement.querySelector('.ds44-autocomp-list_elem'));
        } else {
            // Select next
            MiscAccessibility.setFocus(MiscDom.getNextSibling(selectedListItem));
        }
    }

    previousOption (objectIndex, evt) {
        evt.preventDefault();

        const object = this.objects[objectIndex];
        if (!object || !object.isExpanded) {
            return;
        }

        const selectedListItem = object.autoCompleterListElement.querySelector('.ds44-autocomp-list_elem:focus');
        const firstListItem = object.autoCompleterListElement.querySelector('.ds44-autocomp-list_elem:first-child');
        if (
            !selectedListItem ||
            selectedListItem === firstListItem
        ) {
            // Select last
            MiscAccessibility.setFocus(object.autoCompleterListElement.querySelector('.ds44-autocomp-list_elem:last-child'))
        } else {
            // Select previous
            MiscAccessibility.setFocus(MiscDom.getPreviousSibling(selectedListItem));
        }
    }

    fakeSelect (objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (!object || !object.textElement) {
            return;
        }

        const currentListItem = evt.currentTarget;
        object.textElement.value = currentListItem.innerText;
        MiscAccessibility.setFocus(currentListItem);
    }

    select (objectIndex, evt) {
        if (evt) {
            evt.preventDefault();
        }

        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.textElement ||
            !object.autoCompleterElement
        ) {
            return;
        }

        const currentItem = evt.currentTarget;
        const selectedListItem = object.autoCompleterElement.querySelector('.selected_option');
        if (selectedListItem) {
            selectedListItem.classList.remove('selected_option');
            selectedListItem.removeAttribute('id');
        }
        currentItem.classList.add('selected_option');
        currentItem.setAttribute('id', 'selected_option_' + object.id);
        object.textElement.setAttribute('aria-activedescendant', 'selected_option_' + object.id);

        if (this[currentItem.getAttribute('data-value')]) {
            // Call corresponding function
            this[currentItem.getAttribute('data-value')](objectIndex, currentItem);
            return;
        }

        this.selectRecord(objectIndex, currentItem);
    }

    selectRecord (objectIndex, currentItem) {
        const object = this.objects[objectIndex];
        if (!object || !object.textElement) {
            return;
        }

        this.setData(
            objectIndex,
            {
                'text': currentItem.getAttribute('data-text'),
                'value': currentItem.getAttribute('data-value'),
                'metadata': currentItem.getAttribute('data-metadata')
            }
        );

        this.focusOnTextElement(objectIndex);
        this.hide(objectIndex);
        this.checkValidity(objectIndex);
    }

    aroundMe (objectIndex, currentItem) {
        if (currentItem instanceof Event) {
            // Only accept dom elements
            currentItem = null;
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.aroundMeSuccess.bind(this, objectIndex, currentItem));

            return;
        }

        if (currentItem) {
            this.selectRecord(objectIndex, currentItem);
        }
    }

    aroundMeSuccess (objectIndex, currentItem, position) {
        if (currentItem) {
            // Is an option in the autocomplete list
            currentItem.setAttribute(
                'data-metadata',
                JSON.stringify({
                    'latitude': position.coords.latitude,
                    'longitude': position.coords.longitude
                })
            );
            this.selectRecord(objectIndex, currentItem);

            return;
        }

        // Is outside the autocomplete list, set the data straight away
        this.setData(
            objectIndex,
            {
                'value': 'aroundMe',
                'text': MiscTranslate._('AROUND_ME'),
                'metadata': {
                    'latitude': position.coords.latitude,
                    'longitude': position.coords.longitude
                }
            }
        );

        this.focusOnTextElement(objectIndex);
        this.hide(objectIndex);
        this.checkValidity(objectIndex);
    }
}

// Singleton
new FormFieldInputAutoComplete();

class FormFieldInputDatepicker extends FormFieldInputAbstract {
    constructor () {
        super('.ds44-datepicker__shape', 'datepicker');

        this.lastInputValue = null;
        this.calendar = null;

        MiscEvent.addListener('keyUp:escape', this.escape.bind(this));
    }

    create (element) {
        super.create(element);

        // Create corresponding hidden input to store the value
        let valueElement = document.createElement('input');
        valueElement.classList.add('ds44-input-value');
        valueElement.setAttribute('type', 'hidden');
        element.parentNode.insertBefore(valueElement, element);

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.valueElement = valueElement;
        object.inputElements = element.querySelectorAll('input[type="text"]');
        object.calendarButtonElement = MiscDom.getNextSibling(element, '.ds44-calendar');
    }

    initialize () {
        super.initialize();

        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];
            if (object.isSubSubInitialized) {
                continue;
            }
            object.isSubSubInitialized = true;

            object.inputElements.forEach((inputElement) => {
                MiscEvent.addListener('focus', this.focus.bind(this, objectIndex), inputElement);
                MiscEvent.addListener('blur', this.blur.bind(this, objectIndex), inputElement);
            });

            MiscEvent.addListener('keydown', this.keyDown.bind(this, objectIndex), object.inputElements[0]);
            MiscEvent.addListener('keydown', this.keyDown.bind(this, objectIndex), object.inputElements[1]);
            MiscEvent.addListener('keyup', this.keyUp.bind(this, objectIndex), object.inputElements[0]);
            MiscEvent.addListener('keyup', this.keyUp.bind(this, objectIndex), object.inputElements[1]);

            MiscEvent.addListener('keypress', this.keyPress.bind(this, objectIndex), object.inputElements[0]);
            MiscEvent.addListener('keypress', this.keyPress.bind(this, objectIndex), object.inputElements[1]);
            MiscEvent.addListener('keypress', this.keyPress.bind(this, objectIndex), object.inputElements[2]);

            MiscEvent.addListener('click', this.focusOut.bind(this, objectIndex), document.body);

            if (object.calendarButtonElement) {
                MiscEvent.addListener('click', this.showHideCalendar.bind(this, objectIndex), object.calendarButtonElement);
            }
        }
    }

    write (objectIndex) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.textElement ||
            !object.textElement.contains(document.activeElement)
        ) {
            return;
        }

        this.record(objectIndex);
        this.showNotEmpty(objectIndex);
    }

    reset (objectIndex) {
        const object = this.objects[objectIndex];
        if (object) {
            object.inputElements[0].value = null;
            object.inputElements[1].value = null;
            object.inputElements[2].value = null;
        }

        super.reset(objectIndex);
    }

    escape () {
        if (!this.calendar) {
            return;
        }

        const object = this.objects[this.calendar.index];
        this.hideCalendar();

        if (object && object.calendarButtonElement) {
            MiscAccessibility.setFocus(object.calendarButtonElement);
        }
    }

    disableElements (objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (object) {
            object.inputElements[0].value = null;
            object.inputElements[1].value = null;
            object.inputElements[2].value = null;
        }

        super.disableElements(objectIndex, evt);
    }

    focus (objectIndex) {
        this.lastInputValue = null;

        const object = this.objects[objectIndex];
        if (object && object.isEnabled && object.textElement) {
            object.textElement.classList.add('show');
        }

        super.focus(objectIndex);
    }

    blur (objectIndex) {
        this.lastInputValue = null;

        super.blur(objectIndex);
    }

    quit (objectIndex) {
        super.quit(objectIndex);

        const object = this.objects[objectIndex];
        if (object && object.textElement) {
            object.textElement.classList.remove('show');
        }
    }

    focusOut (objectIndex, evt) {
        if (
            !this.calendar ||
            this.calendar.index !== objectIndex
        ) {
            return;
        }

        const object = this.objects[objectIndex];
        if (
            !object ||
            !evt ||
            object.containerElement.contains(evt.target)
        ) {
            return;
        }

        this.hideCalendar();
    }

    keyDown (objectIndex, evt) {
        this.lastInputValue = evt.currentTarget.value;
    }

    keyPress (objectIndex, evt) {
        // Test if it is a number or a letter
        if (
            evt.code.substr(0, 3) !== 'Key' &&
            evt.code.substr(0, 5) !== 'Digit'
        ) {
            return true;
        }

        // Test if the result is a numeric value
        const currentValue = evt.currentTarget.value;
        const selectionIndex = evt.currentTarget.selectionStart;
        const key = evt.key;
        const futureValue = currentValue.slice(0, selectionIndex) + key + currentValue.slice(selectionIndex);
        if (
            futureValue &&
            !futureValue.match(/^[0-9]+$/gi)
        ) {
            evt.stopPropagation();
            evt.preventDefault();

            return false;
        }
    }

    keyUp (objectIndex, evt) {
        if (
            !this.lastInputValue ||
            this.lastInputValue.length !== 1 ||
            evt.currentTarget.value.length !== 2
        ) {
            return;
        }

        // If two digits, go to next field
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        if (evt.currentTarget === object.inputElements[0]) {
            MiscAccessibility.setFocus(object.inputElements[1]);
        } else {
            MiscAccessibility.setFocus(object.inputElements[2]);
        }
    }

    getText (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return null;
        }

        const dateYear = parseInt(object.inputElements[2].value, 10) || '';
        const dateMonth = parseInt(object.inputElements[1].value, 10) || '';
        const dateDay = parseInt(object.inputElements[0].value, 10) || '';
        if ((dateYear + '-' + dateMonth + '-' + dateDay) === '--') {
            return null;
        }

        return dateYear + '-' + (dateMonth + '').padStart(2, '0') + '-' + (dateDay + '').padStart(2, '0');
    }

    record (objectIndex, evt) {
        if (evt) {
            evt.preventDefault();
        }

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        const dateText = this.getText(objectIndex);
        if (
            !dateText ||
            !dateText.match(/^(19|20)\d\d([- /.])(0?[1-9]|1[012])\2(0?[1-9]|[12][0-9]|3[01])$/)
        ) {
            // Not nicely formatted
            this.empty(objectIndex);

            return;
        }

        const dateYear = parseInt(object.inputElements[2].value, 10);
        const dateMonth = (parseInt(object.inputElements[1].value, 10) - 1);
        const dateDay = parseInt(object.inputElements[0].value, 10);
        const date = new Date(dateYear, dateMonth, dateDay);
        if (
            date.getTime() !== date.getTime() ||
            date.getFullYear() !== dateYear ||
            date.getMonth() !== dateMonth ||
            date.getDate() !== dateDay
        ) {
            // If the date object is invalid it
            // will return 'NaN' on getTime()
            // and NaN is never equal to itself.
            this.empty(objectIndex);

            return;
        }

        this.setData(
            objectIndex,
            {
                'value': dateText
            }
        )
    }

    isValid (objectIndex) {
        if (!super.isValid(objectIndex)) {
            return false;
        }

        const data = this.getData(objectIndex);
        if (
            !data &&
            !this.isEmpty(objectIndex)
        ) {
            return false;
        }

        if (!this.checkChronology(objectIndex)) {
            return false;
        }

        if (!this.checkPastDates(objectIndex)) {
            return false;
        }

        if (!this.checkNextYearDates(objectIndex)) {
            return false;
        }

        return true;
    }

    checkChronology (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return false;
        }

        const data = this.getData(objectIndex);
        if (
            !data ||
            !object.textElement.getAttribute('data-previous-date-id')
        ) {
            return true;
        }

        const previousDateValueElement = MiscDom.getPreviousSibling(
            document.querySelector('#' + object.textElement.getAttribute('data-previous-date-id')).parentNode,
            'input[type="hidden"]'
        );
        if (
            previousDateValueElement &&
            (new Date(data[object.name].value) < new Date(previousDateValueElement.value))
        ) {
            return false;
        }

        return true;
    }

    getDateText (date) {
        if (!date) {
            date = new Date();
        }
        return date.getFullYear() + '-' + ((date.getMonth() + 1) + '').padStart(2, '0') + '-' + (date.getDate() + '').padStart(2, '0');
    }

    checkPastDates (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return false;
        }

        const data = this.getData(objectIndex);
        if (
            !data ||
            object.textElement.getAttribute('data-past-dates') !== 'false'
        ) {
            return true;
        }

        const nowText = this.getDateText();
        if (new Date(data[object.name].value).getTime() <= (new Date(nowText).getTime() - 1)) {
            return false;
        }

        return true;
    }

    checkNextYearDates (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return false;
        }

        const data = this.getData(objectIndex);
        if (
            !data ||
            object.textElement.getAttribute('data-next-year-dates') !== 'false'
        ) {
            return true;
        }

        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
        const oneYearFromNowText = this.getDateText(oneYearFromNow);
        if (new Date(data[object.name].value).getTime() >= (new Date(oneYearFromNowText).getTime() + 1)) {
            return false;
        }

        return true;
    }

    showHideCalendar (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        let showCalendar = !(this.calendar && this.calendar.id === object.id);
        if (!showCalendar) {
            this.hideCalendar();

            return;
        }

        this.showCalendar(objectIndex);
    }

    showCalendar (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        this.hideCalendar();

        this.calendar = {
            'id': object.id,
            'index': objectIndex,
            'object': new CalendarStandard({
                'element': object.containerElement.querySelector('.vanilla-calendar'),
                'onSelect': this.selectDate.bind(this, objectIndex)
            })
        };
    }

    hideCalendar () {
        if (this.calendar) {
            const object = this.objects[this.calendar.index];

            this.calendar.object.destroy();
            this.calendar = null;
        }
    }

    selectDate (objectIndex, data) {
        this.setDate(objectIndex, data.date);
        this.focusOnTextElement(objectIndex);
        this.record(objectIndex);
        this.showNotEmpty(objectIndex);

        // Let's roll some time so we can show with day is chosen
        window.setTimeout(this.hideCalendar.bind(this), 200);
    }

    showNotEmpty (objectIndex) {
        super.showNotEmpty(objectIndex);

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.textElement.classList.add('show');
    }

    setDate (objectIndex, date) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        const selectedData = new Date(date);
        object.inputElements[0].value = (selectedData.getDate() + '').padStart(2, '0');
        object.inputElements[1].value = ((selectedData.getMonth() + 1) + '').padStart(2, '0');
        object.inputElements[2].value = (selectedData.getFullYear() + '').padStart(2, '0');
    }

    getErrorMessage (objectIndex) {
        if (!this.checkChronology(objectIndex)) {
            return this.formatErrorMessage(objectIndex, 'FIELD_VALID_CHRONOLOGY_ERROR_MESSAGE');
        }

        if (!this.checkPastDates(objectIndex)) {
            return this.formatErrorMessage(objectIndex, 'FIELD_PAST_DATE_ERROR_MESSAGE');
        }

        if (!this.checkNextYearDates(objectIndex)) {
            return this.formatErrorMessage(objectIndex, 'FIELD_NEXT_YEAR_DATE_ERROR_MESSAGE');
        }

        if (this.getText(objectIndex)) {
            return this.formatErrorMessage(objectIndex, 'FIELD_VALID_DATE_FORMAT_ERROR_MESSAGE');
        }

        return this.formatErrorMessage(objectIndex);
    }

    setData (objectIndex, data = null) {
        super.setData(objectIndex, data);

        if (data && data.value) {
            this.setDate(objectIndex, data.value);
            this.focus(objectIndex);
        }
    }
}

// Singleton
new FormFieldInputDatepicker();

class FormFieldInputFile extends FormFieldInputAbstract {
    constructor () {
        super(
            'input[type="file"]',
            'inputFile'
        );

        this.fileSizeMax = 10; // MB
        this.mimeTypeByFileExtensions = {
            'aac': 'audio/aac',
            'abw': 'application/x-abiword',
            'arc': 'application/octet-stream',
            'avi': 'video/x-msvideo',
            'azw': 'application/vnd.amazon.ebook',
            'bin': 'application/octet-stream',
            'bz': 'application/x-bzip',
            'bz2': 'application/x-bzip2',
            'csh': 'application/x-csh',
            'css': 'text/css',
            'csv': 'text/csv',
            'doc': 'application/msword',
            'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'eot': 'application/vnd.ms-fontobject',
            'epub': 'application/epub+zip',
            'gif': 'image/gif',
            'htm': 'text/html',
            'html': 'text/html',
            'ico': 'image/x-icon',
            'ics': 'text/calendar',
            'jar': 'application/java-archive',
            'jpeg': 'image/jpeg',
            'jpg': 'image/jpeg',
            'js': 'application/javascript',
            'json': 'application/json',
            'mid': 'audio/midi',
            'midi': 'audio/midi',
            'mpeg': 'video/mpeg',
            'mpkg': 'application/vnd.apple.installer+xml',
            'odp': 'application/vnd.oasis.opendocument.presentation',
            'ods': 'application/vnd.oasis.opendocument.spreadsheet',
            'odt': 'application/vnd.oasis.opendocument.text',
            'oga': 'audio/ogg',
            'ogv': 'video/ogg',
            'ogx': 'application/ogg',
            'otf': 'font/otf',
            'png': 'image/png',
            'pdf': 'application/pdf',
            'ppt': 'application/vnd.ms-powerpoint',
            'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'rar': 'application/x-rar-compressed',
            'rtf': 'application/rtf',
            'sh': 'application/x-sh',
            'svg': 'image/svg+xml',
            'swf': 'application/x-shockwave-flash',
            'tar': 'application/x-tar',
            'tif': 'image/tiff',
            'tiff': 'image/tiff',
            'ts': 'application/typescript',
            'ttf': 'font/ttf',
            'vsd': 'application/vnd.visio',
            'wav': 'audio/x-wav',
            'weba': 'audio/webm',
            'webm': 'video/webm',
            'webp': 'image/webp',
            'woff': 'font/woff',
            'woff2': 'font/woff2',
            'xhtml': 'application/xhtml+xml',
            'xls': 'application/vnd.ms-excel',
            'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'xml': 'application/xml',
            'xul': 'application/vnd.mozilla.xul+xml',
            'zip': 'application/zip',
            '7z': 'application/x-7z-compressed'
        }
    }

    create (element) {
        super.create(element);

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.textElement = MiscDom.getNextSibling(element, '.ds44-fileDisplay');
        object.labelElement = MiscDom.getPreviousSibling(element.parentNode, 'label');
        object.resetButtonElement = MiscDom.getNextSibling(element.parentNode, '.ds44-reset');
        object.fileExtensions = element.getAttribute('data-file-extensions');
    }

    initialize () {
        super.initialize();

        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];
            if (object.isSubSubInitialized) {
                continue;
            }
            object.isSubSubInitialized = true;

            object.inputElements.forEach((inputElement) => {
                MiscEvent.addListener('change', this.fileUploaded.bind(this, objectIndex), inputElement);
                MiscEvent.addListener('focus', this.focus.bind(this, objectIndex), inputElement);
                MiscEvent.addListener('blur', this.blur.bind(this, objectIndex), inputElement);
            });
        }
    }

    fileUploaded (objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        // Get file
        const file = evt.currentTarget.files[0];
        if (!file) {
            return;
        }

        if (this.checkValidity(objectIndex)) {
            // Success
            object.textElement.innerText = file.name;
            const textElementId = object.textElement.getAttribute('id');
            const ariaDescribedBy = object.valueElement.getAttribute('aria-describedby').split(' ');
            if (!ariaDescribedBy.includes(textElementId)) {
                ariaDescribedBy.push(textElementId);
                object.valueElement.setAttribute('aria-describedby', ariaDescribedBy.join(' '));
            }

            this.showNotEmpty(objectIndex);
            this.focus(objectIndex);
        }
    }

    focus (objectIndex) {
        const object = this.objects[objectIndex];
        if (object && object.textElement) {
            const shapeElement = object.textElement.closest('.ds44-file__shape');
            if (shapeElement) {
                shapeElement.classList.add('hover');
            }
        }

        super.focus(objectIndex);
    }

    blur (objectIndex) {
        const object = this.objects[objectIndex];
        if (object && object.textElement) {
            const shapeElement = object.textElement.closest('.ds44-file__shape');
            if (shapeElement) {
                shapeElement.classList.remove('hover');
            }
        }

        super.blur(objectIndex);
    }

    empty (objectIndex) {
        super.empty(objectIndex);

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        const textElementId = object.textElement.getAttribute('id');
        const ariaDescribedBy = object.valueElement.getAttribute('aria-describedby').split(' ');
        if (ariaDescribedBy.includes(textElementId)) {
            ariaDescribedBy.splice(ariaDescribedBy.indexOf(textElementId), 1);
            object.valueElement.setAttribute('aria-describedby', ariaDescribedBy.join(' '));
        }

        this.blur(objectIndex);
    }

    set (objectIndex, data) {
        // Can't set a file input
    }

    setData (objectIndex, data = null) {
        super.setData(objectIndex, data);

        const object = this.objects[objectIndex];
        if (!object || !object.textElement) {
            return;
        }

        object.textElement.innerText = ((data && data.text) ? data.text : null);
    }

    getData (objectIndex) {
        let data = super.getData(objectIndex);
        if (!data) {
            return null;
        }

        const object = this.objects[objectIndex];
        if (!object) {
            return null;
        }

        const extendedData = {};
        extendedData[object.name] = {
            'name': object.textElement.innerText
        };

        return MiscUtils.merge(data, extendedData);
    }

    getText (objectIndex) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.textElement ||
            !object.textElement.innerText
        ) {
            return null;
        }

        return object.textElement.innerText;
    }

    invalid (objectIndex) {
        super.invalid(objectIndex);

        this.empty(objectIndex);
    }

    checkFormat (objectIndex) {
        return (
            this.hasCorrectSize(objectIndex) &&
            this.hasCorrectMime(objectIndex)
        );
    }

    getErrorMessage (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return this.formatErrorMessage(objectIndex);
        }

        const file = object.inputElements[0].files[0];
        if (!file) {
            return this.formatErrorMessage(objectIndex);
        }

        if (!this.hasCorrectSize(objectIndex)) {
            return this.formatErrorMessage(objectIndex, 'FIELD_VALID_SIZE_ERROR_MESSAGE', { fileName: file.name });
        }
        if (!this.hasCorrectMime(objectIndex)) {
            return this.formatErrorMessage(objectIndex, 'FIELD_VALID_FORMAT_ERROR_MESSAGE', { fileName: file.name });
        }

        return this.formatErrorMessage(objectIndex);
    }

    hasCorrectSize (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return false;
        }

        // Get file
        const file = object.inputElements[0].files[0];
        if (!file) {
            return true;
        }

        // Check size
        const fileSize = file.size / 1024 / 1024;
        if (fileSize > this.fileSizeMax) {
            return false;
        }

        return true;
    }

    hasCorrectMime (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return false;
        }

        if (!object.fileExtensions) {
            return true;
        }

        // Get file
        const file = object.inputElements[0].files[0];
        if (!file) {
            return true;
        }

        // Check mime
        const validFileExtensions = object.fileExtensions.replace(', ', ',').split(',');
        for (let i = 0; i < validFileExtensions.length; i++) {
            const validFileExtension = validFileExtensions[i];

            if (this.mimeTypeByFileExtensions[validFileExtension] === file.type) {
                return true;
            }
        }

        return false;
    }
}

// Singleton
new FormFieldInputFile();

class FormFieldInputStandard extends FormFieldInputAbstract {
    constructor () {
        super(
            'input[type="text"]:not([aria-autocomplete="list"]):not([data-is-date]), ' +
            'input[type="email"]:not([aria-autocomplete="list"]), ' +
            'input[type="password"]:not([aria-autocomplete="list"]), ' +
            'input[type="number"]:not([aria-autocomplete="list"])',
            'inputStandard'
        );
    }
}

// Singleton
new FormFieldInputStandard();

class FormFieldInputTextarea extends FormFieldInputAbstract {
    constructor () {
        super('textarea', 'textarea');
    }
}

// Singleton
new FormFieldInputTextarea();

class FormFieldSelectCheckbox extends FormFieldSelectAbstract {
    constructor (selector, category) {
        if (selector && category) {
            super(
                selector,
                category
            );

            return;
        }

        super(
            '.ds44-selectDisplay.ds44-js-select-checkbox',
            'selectCheckbox'
        );
    }

    initialize () {
        super.initialize();

        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];
            if (object.isSubSubInitialized) {
                continue;
            }
            object.isSubSubInitialized = true;

            const flexContainerElement = object.containerElement.querySelector('.ds44-flex-container');
            const checkAllElement = flexContainerElement.querySelector('button:first-child');
            if (checkAllElement) {
                MiscEvent.addListener('click', this.checkAll.bind(this, objectIndex), checkAllElement);
            }
            const uncheckAllElement = flexContainerElement.querySelector('button:last-child');
            if (uncheckAllElement) {
                MiscEvent.addListener('click', this.uncheckAll.bind(this, objectIndex), uncheckAllElement);
            }
        }
    }

    setListElementEvents (listElement, objectIndex) {
        const listInputElement = listElement.querySelector('input');
        if (!listInputElement) {
            return;
        }

        MiscEvent.addListener('change', this.select.bind(this, objectIndex), listInputElement);
    }

    getListItems (parentElement) {
        let previousItem = null;
        let nextItem = null;
        const selectedListItem = parentElement.querySelector('.ds44-select-list_elem input:focus');
        if (selectedListItem) {
            previousItem = MiscDom.getPreviousSibling(selectedListItem.closest('.ds44-select-list_elem'));
            if (previousItem) {
                previousItem = previousItem.querySelector('input');
            }
            nextItem = MiscDom.getNextSibling(selectedListItem.closest('.ds44-select-list_elem'));
            if (nextItem) {
                nextItem = nextItem.querySelector('input');
            }
        }
        return {
            'first': parentElement.querySelector('.ds44-select-list_elem:first-child input'),
            'selected': selectedListItem,
            'last': parentElement.querySelector('.ds44-select-list_elem:last-child input'),
            'next': nextItem,
            'previous': previousItem
        };
    }

    getListElement (object, key, value) {
        let elementSelectListItem = super.getListElement(object, key, value);
        elementSelectListItem.removeAttribute('tabindex');
        elementSelectListItem.innerHTML = null;

        let containerElement = document.createElement('div');
        containerElement.classList.add('ds44-form__container');
        containerElement.classList.add('ds44-checkBox-radio_list');
        elementSelectListItem.appendChild(containerElement);

        const id = 'name-check-form-element-' + MiscUtils.generateId();
        let inputElement = document.createElement('input');
        inputElement.classList.add('ds44-checkbox');
        inputElement.setAttribute('id', id);
        inputElement.setAttribute('type', 'checkbox');
        inputElement.setAttribute('value', key);
        containerElement.appendChild(inputElement);

        let labelElement = document.createElement('label');
        labelElement.setAttribute('for', id);
        labelElement.classList.add('ds44-boxLabel');
        labelElement.innerHTML = value;
        containerElement.appendChild(labelElement);

        return elementSelectListItem;
    }

    select (objectIndex, evt) {
        evt.preventDefault();

        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.textElement ||
            !object.selectListElement
        ) {
            return;
        }

        const currentItem = evt.currentTarget.closest('.ds44-select-list_elem');
        const currentListInputElement = currentItem.querySelector('input');

        object.selectListElement
            .querySelectorAll('.ds44-select-list_elem')
            .forEach((listElement) => {
                let listInputElement = listElement.querySelector('input');
                let listChildElement = listElement.querySelector('.ds44-select-list_elem_child');
                if (
                    (
                        evt.type === 'mousedown' &&
                        (
                            (
                                listInputElement === currentListInputElement &&
                                !listInputElement.checked
                            ) ||
                            (
                                listInputElement !== currentListInputElement &&
                                listInputElement.checked
                            )
                        )
                    ) ||
                    (
                        evt.type === 'change' &&
                        listInputElement.checked
                    )
                ) {
                    // Is checked
                    listElement.classList.add('selected_option');
                    if (listChildElement) {
                        listChildElement.classList.remove('hidden');
                    }
                } else {
                    // Is not checked
                    listElement.classList.remove('selected_option');
                    if (listChildElement) {
                        listChildElement.classList.add('hidden');
                    }
                }
            });
    }

    selectFromValue (objectIndex) {
        const checkboxElements = this.getValueCheckboxElements(objectIndex);
        if (!checkboxElements) {
            return;
        }

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        const data = this.getData(objectIndex);
        let values = [];
        if (data && data[object.name].value) {
            values = data[object.name].value;
            if (typeof values !== 'object') {
                values = [values];
            }
        }

        checkboxElements.forEach((checkboxElement) => {
            if (values.constructor === ({}).constructor) {
                // Values is JSON
                const childFieldName = Object.keys(values)[0];
                const childFieldElement = checkboxElement.closest('.ds44-select-list_elem').querySelector('[name="' + childFieldName + '"], [data-name="' + childFieldName + '"]');
                if (childFieldElement) {
                    checkboxElement.checked = true;
                    MiscEvent.dispatch('change', null, checkboxElement);
                }
            } else {
                checkboxElement.checked = (
                    values.includes(checkboxElement.value) ||
                    values.includes(parseInt(checkboxElement.value, 10))
                );
                MiscEvent.dispatch('change', null, checkboxElement);
            }
        });
    }

    getDomData (listElement) {
        return {
            'value': listElement.querySelector('input').getAttribute('value'),
            'text': listElement.querySelector('label').textContent
        };
    }

    checkAll (objectIndex) {
        const checkboxElements = this.getCheckboxElements(objectIndex);
        if (!checkboxElements) {
            return;
        }

        checkboxElements.forEach((checkboxElement) => {
            checkboxElement.checked = true;
            MiscEvent.dispatch('change', null, checkboxElement);
        });
    }

    uncheckAll (objectIndex) {
        const checkboxElements = this.getCheckboxElements(objectIndex);
        if (!checkboxElements) {
            return;
        }

        checkboxElements.forEach((checkboxElement) => {
            checkboxElement.checked = false;
            MiscEvent.dispatch('change', null, checkboxElement);
        });
    }

    getCheckboxElements (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.selectListElement) {
            return null;
        }

        return object.selectListElement.querySelectorAll('input');
    }

    getValueCheckboxElements (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.selectListElement) {
            return null;
        }

        return object.selectListElement.querySelectorAll('input');
    }
}

// Singleton
new FormFieldSelectCheckbox();

class FormFieldSelectMultilevel extends FormFieldSelectCheckbox {
    constructor () {
        super(
            '.ds44-selectDisplay.ds44-js-select-multilevel',
            'selectMultilevel'
        );
    }

    initialize () {
        super.initialize();

        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];
            if (object.isSubSubSubInitialized) {
                continue;
            }
            object.isSubSubSubInitialized = true;

            if (object.selectListElement) {
                object.selectListElement
                    .querySelectorAll('.ds44-select__categ input')
                    .forEach((listInputElement) => {
                        MiscEvent.addListener('change', this.selectCategory.bind(this), listInputElement);
                    });
            }

            // Remove data-url attribute as multilevel select do not exist yet
            object.textElement.removeAttribute('data-url');
        }
    }

    select (objectIndex, evt) {
        super.select(objectIndex, evt);

        const selectListElement = evt.currentTarget.closest('.ds44-list');
        if (!selectListElement) {
            return;
        }

        // Manage categories checkboxes
        let allChecked = true;
        let allNotChecked = true;
        selectListElement
            .querySelectorAll('.ds44-select-list_elem input')
            .forEach((listInputElement) => {
                if (listInputElement.checked) {
                    allNotChecked = false;
                } else {
                    allChecked = false;
                }
            });

        // Check or uncheck category checkbox
        const collapserElement = selectListElement.closest('.ds44-collapser_element');
        if (!collapserElement) {
            return;
        }

        const collapserInputElement = collapserElement.querySelector('.ds44-select__categ input');
        if (!collapserInputElement) {
            return;
        }

        if (allChecked) {
            collapserInputElement.checked = true;
            collapserInputElement.classList.remove('ds44-chkInder');
        } else if (allNotChecked) {
            collapserInputElement.checked = false;
            collapserInputElement.classList.remove('ds44-chkInder');
        } else {
            collapserInputElement.checked = false;
            collapserInputElement.classList.add('ds44-chkInder');
        }
    }

    selectCategory (evt) {
        const categoryInputElement = evt.currentTarget;
        const collapserElement = categoryInputElement.closest('.ds44-collapser_element');
        if (!collapserElement) {
            return;
        }

        // Check or uncheck category checkbox
        categoryInputElement.classList.remove('ds44-chkInder');

        // Check or uncheck children checkbox
        collapserElement
            .querySelectorAll('.ds44-collapser_content .ds44-select-list_elem')
            .forEach((listElement) => {
                const listInputElement = listElement.querySelector('input');

                listInputElement.checked = categoryInputElement.checked;
                if (listInputElement.checked) {
                    listElement.classList.add('selected_option');
                } else {
                    listElement.classList.remove('selected_option');
                }
            });
    }

    getCheckboxElements (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.selectListElement) {
            return null;
        }

        return object.selectListElement.querySelectorAll('.ds44-select__categ input');
    }
}

// Singleton
new FormFieldSelectMultilevel();

class FormFieldSelectRadio extends FormFieldSelectAbstract {
    constructor () {
        super(
            '.ds44-selectDisplay.ds44-js-select-radio',
            'selectRadio'
        );
    }

    setListElementEvents (listElement, objectIndex) {
        const listInputElement = listElement.querySelector('input');
        if (!listInputElement) {
            return;
        }

        MiscEvent.addListener('change', this.select.bind(this, objectIndex), listInputElement);
    }

    nextOption (objectIndex, evt) {
        if (evt) {
            evt.preventDefault();
            evt.stopPropagation();
        }

        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.selectListElement ||
            !object.isExpanded
        ) {
            return;
        }

        const listItems = this.getListItems(object.selectListElement);
        if (!listItems.selected) {
            // Select first
            MiscAccessibility.setFocus(listItems.first);
        }
    }

    previousOption (objectIndex, evt) {
        if (evt) {
            evt.preventDefault();
            evt.stopPropagation();
        }

        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.selectListElement ||
            !object.isExpanded
        ) {
            return;
        }

        const listItems = this.getListItems(object.selectListElement);
        if (!listItems.selected) {
            // Select last
            MiscAccessibility.setFocus(listItems.last);
        }
    }

    getListItems (parentElement) {
        let previousItem = null;
        let nextItem = null;
        const selectedListItem = parentElement.querySelector('.ds44-select-list_elem input:focus');
        if (selectedListItem) {
            previousItem = MiscDom.getPreviousSibling(selectedListItem.closest('.ds44-select-list_elem'));
            if (previousItem) {
                previousItem = previousItem.querySelector('input');
            }
            nextItem = MiscDom.getNextSibling(selectedListItem.closest('.ds44-select-list_elem'));
            if (nextItem) {
                nextItem = nextItem.querySelector('input');
            }
        }
        return {
            'first': parentElement.querySelector('.ds44-select-list_elem:first-child input'),
            'selected': selectedListItem,
            'last': parentElement.querySelector('.ds44-select-list_elem:last-child input'),
            'next': nextItem,
            'previous': previousItem
        };
    }

    getListElement (object, key, value) {
        let elementSelectListItem = super.getListElement(object, key, value);
        elementSelectListItem.removeAttribute('tabindex');
        elementSelectListItem.innerHTML = null;

        let containerElement = document.createElement('div');
        containerElement.classList.add('ds44-form__container');
        containerElement.classList.add('ds44-checkBox-radio_list');
        elementSelectListItem.appendChild(containerElement);

        const id = 'name-check-form-element-' + MiscUtils.generateId();
        let inputElement = document.createElement('input');
        inputElement.classList.add('ds44-radio');
        inputElement.setAttribute('id', id);
        inputElement.setAttribute('name', object.id);
        inputElement.setAttribute('type', 'radio');
        inputElement.setAttribute('value', key);
        containerElement.appendChild(inputElement);

        let labelElement = document.createElement('label');
        labelElement.setAttribute('for', id);
        labelElement.classList.add('ds44-radioLabel');
        labelElement.innerHTML = value;
        containerElement.appendChild(labelElement);

        return elementSelectListItem;
    }

    select (objectIndex, evt) {
        evt.preventDefault();

        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.textElement ||
            !object.selectListElement
        ) {
            return;
        }

        const currentItem = evt.currentTarget.closest('.ds44-select-list_elem');
        const currentListInputElement = currentItem.querySelector('input');

        object.selectListElement
            .querySelectorAll('.ds44-select-list_elem')
            .forEach((listElement) => {
                let listInputElement = listElement.querySelector('input');
                let listChildElement = listElement.querySelector('.ds44-select-list_elem_child');
                if (
                    (
                        evt.type === 'mousedown' &&
                        (
                            (
                                listInputElement === currentListInputElement &&
                                !listInputElement.checked
                            ) ||
                            (
                                listInputElement !== currentListInputElement &&
                                listInputElement.checked
                            )
                        )
                    ) ||
                    (
                        evt.type === 'change' &&
                        listInputElement.checked
                    )
                ) {
                    // Is checked
                    listElement.classList.add('selected_option');
                    if (listChildElement) {
                        listChildElement.classList.remove('hidden');
                    }
                } else {
                    // Is not checked
                    listElement.classList.remove('selected_option');
                    if (listChildElement) {
                        listChildElement.classList.add('hidden');
                    }
                }
            });
    }

    selectFromValue (objectIndex) {
        const radioElements = this.getRadioElements(objectIndex);
        if (!radioElements) {
            return;
        }

        const object = this.objects[objectIndex];
        if(!object) {
            return;
        }

        const data = this.getData(objectIndex);
        let values = [];
        if (data && data[object.name].value) {
            values = data[object.name].value;
            if (typeof values !== 'object') {
                values = [values];
            }
        }

        radioElements.forEach((radioElement) => {
            if (values.constructor === ({}).constructor) {
                // Values is JSON
                const childFieldName = Object.keys(values)[0];
                const childFieldElement = radioElement.closest('.ds44-select-list_elem').querySelector('[name="' + childFieldName + '"], [data-name="' + childFieldName + '"]');
                if (childFieldElement) {
                    radioElement.checked = true;
                    MiscEvent.dispatch('change', null, radioElement);
                }
            } else {
                radioElement.checked = (
                    values.includes(radioElement.value) ||
                    values.includes(parseInt(radioElement.value, 10))
                );
                MiscEvent.dispatch('change', null, radioElement);
            }
        });
    }

    getDomData (listElement) {
        return {
            'value': listElement.querySelector('input').getAttribute('value'),
            'text': listElement.querySelector('label').innerText
        };
    }

    getRadioElements (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.selectListElement) {
            return null;
        }

        return object.selectListElement.querySelectorAll('input');
    }
}

// Singleton
new FormFieldSelectRadio();

class FormFieldSelectStandard extends FormFieldSelectAbstract {
    constructor () {
        super(
            '.ds44-selectDisplay.ds44-js-select-standard',
            'selectStandard'
        );
    }

    initialize () {
        super.initialize();

        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];
            if (object.isSubSubInitialized) {
                continue;
            }
            object.isSubSubInitialized = true;

            MiscEvent.addListener('keyPress:spacebar', this.selectOption.bind(this, objectIndex));
            MiscEvent.addListener('keyPress:enter', this.selectOption.bind(this, objectIndex));
        }
    }

    selectOption (objectIndex, evt) {
        evt.preventDefault();

        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.selectListElement
        ) {
            return;
        }

        if (
            document.activeElement &&
            document.activeElement.classList.contains('ds44-select-list_elem') &&
            object.selectListElement.contains(document.activeElement)
        ) {
            MiscEvent.dispatch('mousedown', null, document.activeElement);
        }
    }

    getListItems (parentElement) {
        let previousItem = null;
        let nextItem = null;
        const selectedListItem = parentElement.querySelector('.ds44-select-list_elem:focus');
        if (selectedListItem) {
            previousItem = MiscDom.getPreviousSibling(selectedListItem.closest('.ds44-select-list_elem'));
            nextItem = MiscDom.getNextSibling(selectedListItem.closest('.ds44-select-list_elem'));
        }
        return {
            'first': parentElement.querySelector('.ds44-select-list_elem:first-child'),
            'selected': selectedListItem,
            'last': parentElement.querySelector('.ds44-select-list_elem:last-child'),
            'next': nextItem,
            'previous': previousItem
        };
    }

    select (objectIndex, evt) {
        evt.preventDefault();

        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.textElement ||
            !object.selectListElement
        ) {
            return;
        }

        const currentItem = evt.currentTarget.closest('.ds44-select-list_elem');
        const selectedListItem = object.selectListElement.querySelector('.selected_option');
        if (selectedListItem) {
            selectedListItem.classList.remove('selected_option');
            selectedListItem.removeAttribute('aria-selected');
        }
        currentItem.classList.add('selected_option');
        currentItem.setAttribute('aria-selected', 'true');

        // Record click straight away as there is no validate button
        this.record(objectIndex);
    }

    selectFromValue (objectIndex) {
        const optionElements = this.getOptionElements(objectIndex);
        if (!optionElements) {
            return;
        }

        const object = this.objects[objectIndex];
        if(!object) {
            return;
        }

        const data = this.getData(objectIndex);
        let values = [];
        if (data && data[object.name].value) {
            values = data[object.name].value;
            if (typeof values !== 'object') {
                values = [values];
            }
        }

        optionElements.forEach((optionElement) => {
            let value = optionElement.getAttribute('data-value');
            if (value == parseFloat(value, 10)) {
                value = parseFloat(value, 10);
            }
            if (values.includes(value)) {
                // Selected
                optionElement.classList.add('selected_option');
                optionElement.setAttribute('aria-selected', 'true');
            } else {
                // Not selected
                optionElement.classList.remove('selected_option');
                optionElement.removeAttribute('aria-selected');
            }
        });
    }

    getDomData (listElement) {
        return {
            'value': listElement.getAttribute('data-value'),
            'text': listElement.innerText
        };
    }

    getOptionElements (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.selectListElement) {
            return null;
        }

        return object.selectListElement.querySelectorAll('.ds44-select-list_elem');
    }
}

// Singleton
new FormFieldSelectStandard();

class FormLayoutInline extends FormLayoutAbstract {
    constructor () {
        super('form[data-is-inline="true"]');
    }

    ajaxSubmit (objectIndex, formData) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        // Show loader
        MiscEvent.dispatch('loader:requestShow');

        // Get the inline data from the back office
        MiscRequest.send(
            object.formElement.getAttribute('action'),
            this.inlineSuccess.bind(this, objectIndex),
            this.inlineError.bind(this, objectIndex),
            formData
        )
    }

    inlineSuccess (objectIndex, response) {
        this.showInlineData(objectIndex, response);
        if (
            response &&
            response.message
        ) {
            this.notification(objectIndex, null, response.message, response.message_list, response.status || 'information');
        }

        this.clear(objectIndex);

        MiscEvent.dispatch('loader:requestHide');
    }

    inlineError (objectIndex, response) {
        if (
            response &&
            response.message
        ) {
            this.notification(objectIndex, null, response.message, response.message_list, 'error');
        }
        MiscEvent.dispatch('loader:requestHide');
    }

    showInlineData (objectIndex, inlineData) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        const destinationElement = document.querySelector(object.formElement.getAttribute('data-result-destination'));
        if (!inlineData.content_html || !destinationElement) {
            return;
        }

        destinationElement.innerHTML = inlineData.content_html;
    }
}

new FormLayoutInline();

class FormLayoutObligationAlimentaire extends FormLayoutAbstract {
    constructor () {
        super('#ds44-js-soa-form');

        this.templateElement = document.querySelector('#ds44-js-soa-template');
        this.containerElement = document.querySelector('#ds44-js-soa-container');
        if (
            !this.templateElement ||
            !this.containerElement
        ) {
            return;
        }

        this.add();

        const addElement = document.querySelector('#ds44-js-soa-add');
        if (addElement) {
            MiscEvent.addListener('click', this.add.bind(this), addElement);
        }
        const deleteElement = document.querySelector('#ds44-js-soa-delete');
        if (deleteElement) {
            MiscEvent.addListener('click', this.delete.bind(this), deleteElement);
        }
    }

    add () {
        const itemNumber = this.containerElement.querySelectorAll('.ds44-js-soa-item').length;
        const idNumber = itemNumber * 2;

        const cloneElement = document.importNode(this.templateElement.content, true);
        cloneElement.childNodes.forEach((childElement) => {
            if (!childElement.innerHTML) {
                return;
            }

            childElement.innerHTML = childElement.innerHTML
                .replace(/ds44-js-soa-template-field-1/gi, 'ds44-js-soa-field-' + idNumber)
                .replace(/ds44-js-soa-template-field-2/gi, 'ds44-js-soa-field-' + (idNumber + 1))
                .replace(/n°\)/gi, 'n°' + (itemNumber + 1) + ')');
            if (childElement.classList.contains('ds44-js-soa-item')) {
                childElement.setAttribute('id', 'ds44-js-soa-item-' + itemNumber)
            }
        });
        cloneElement.querySelector('.ds44-js-soa-number').innerText = itemNumber + 1;

        this.containerElement.append(cloneElement);

        const selectorPrefix = '#ds44-js-soa-container #ds44-js-soa-item-' + itemNumber;
        MiscEvent.dispatch('field:add', {
            'selector': selectorPrefix + ' input[type="text"]:not([aria-autocomplete="list"]):not([data-is-date])',
            'category': 'inputStandard'
        });
        MiscEvent.dispatch('field:add', {
            'selector': selectorPrefix + ' .ds44-selectDisplay.ds44-js-select-standard',
            'category': 'selectStandard'
        });

        const deleteElement = document.querySelector('#ds44-js-soa-delete');
        if (deleteElement && itemNumber === 1) {
            deleteElement.classList.remove('ds44-none');
        }

        window.setTimeout(
            ((idNumber) => {
                MiscAccessibility.setFocus(null, '#ds44-js-soa-field-' + idNumber);
            }).bind(this, idNumber),
            100
        )
    }

    delete () {
        const itemElements = this.containerElement.querySelectorAll('.ds44-js-soa-item');
        const itemNumber = itemElements.length;
        if (itemNumber <= 1) {
            return;
        }
        const lastItemElement = itemElements[itemNumber - 1];

        const selectorPrefix = '#ds44-js-soa-container #' + lastItemElement.getAttribute('id');
        MiscEvent.dispatch('field:destroy', {
            'selector': selectorPrefix + ' input[type="text"]:not([aria-autocomplete="list"]):not([data-is-date])',
            'category': 'inputStandard'
        });
        MiscEvent.dispatch('field:destroy', {
            'selector': selectorPrefix + ' .ds44-selectDisplay.ds44-js-select-standard',
            'category': 'selectStandard'
        });

        lastItemElement.remove();

        const deleteElement = document.querySelector('#ds44-js-soa-delete');
        if (deleteElement && itemNumber === 2) {
            deleteElement.classList.add('ds44-none');

            const addElement = document.querySelector('#ds44-js-soa-add');
            if (addElement) {
                MiscAccessibility.setFocus(addElement);
            }
        }
    }

    ajaxSubmit (objectIndex, formData) {
        const object = this.objects[objectIndex];
        const resultsElement = document.querySelector('#ds44-js-soa-results');
        if (
            !object ||
            !window.FORM_OBLIGATION_ALIMENTAIRE ||
            !resultsElement
        ) {
            return;
        }

        const results = [];
        let totalFoodObligation = 0;
        for (let i = 0; i < Object.keys(formData).length; (i = i + 2)) {
            const income = formData['ds44-js-soa-field-' + i].value;
            const nbShare = formData['ds44-js-soa-field-' + (i + 1)].value;

            const result = parseFloat(
                Math.max(
                    0,
                    ((income / 12) - (window.FORM_OBLIGATION_ALIMENTAIRE.threshold + ((nbShare - 1) * window.FORM_OBLIGATION_ALIMENTAIRE.delta * 2))) / 6
                )
                , 10
            );
            totalFoodObligation += Math.round(result);

            results.push(
                Math.round(result) + ' ' +
                MiscTranslate._('FOOD_OBLIGATION_PER_MONTH') + ((i / 2) + 1)
            );
        }

        resultsElement.innerHTML = '<section class="ds44-box ds44-theme" tabindex="0">' +
            '<div class="ds44-innerBoxContainer">' +
            '<p role="heading" aria-level="3" class="h5-like">' +
            MiscTranslate._(
                'FOOD_OBLIGATION_TOTAL',
                { totalFoodObligation: totalFoodObligation }
            ) +
            '</p>' +
            '<ul><li>' + results.join('</li><li>') + '</li></ul>' +
            '</div>' +
            '</section>';
        resultsElement.classList.remove('hidden');
        MiscAccessibility.setFocus(resultsElement.querySelector('section:first-child'));
    }
}

// Singleton
new FormLayoutObligationAlimentaire();

class FormLayoutSearch extends FormLayoutAbstract {
    constructor () {
        super('.ds44-facette form');
    }

    create (formElement) {
        super.create(formElement);

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.containerElement = formElement.closest('.ds44-facette');
        object.parameters = {};
        object.searchData = {};
        object.hasSearched = false;
    }

    initialize () {
        // Initialize each object
        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];
            if (object.isSubInitialized) {
                continue;
            }
            object.isSubInitialized = true;

            // Bind events
            MiscEvent.addListener('search:refresh', this.search.bind(this, objectIndex));
            object.containerElement
                .querySelectorAll('.ds44-js-toggle-search-view')
                .forEach((searchToggleViewElement) => {
                    MiscEvent.addListener('click', this.toggleSearchView.bind(this, objectIndex), searchToggleViewElement);
                });
        }

        super.initialize();
    }

    start (objectIndex) {
        if (
            !this.loadFromDom(objectIndex) &&
            !this.loadFromUrl(objectIndex)
        ) {
            super.start(objectIndex);
        }
    }

    loadFromDom (objectIndex) {
        // Get the data from the dom
        if (!window.searchData) {
            return false;
        }

        const object = this.objects[objectIndex];
        if (!object) {
            return false;
        }

        // Reset search parameters
        object.parameters = (window.searchData.parameters || {});

        // Save response data
        object.searchData = this.formatSearchData(window.searchData, object.parameters);

        // Show search data straight away, without starting a search
        object.hasSearched = true;
        this.showSearchData(objectIndex);

        return true;
    }

    loadFromUrl (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return false;
        }

        if (object.formElement.getAttribute('data-seo-url') !== 'true') {
            this.loadFromUrlSuccess(objectIndex, MiscUrl.getHashParameters());

            return true;
        }

        const searchId = MiscUrl.getSeoHashParameters().pop();
        if (!searchId) {
            return false;
        }

        if (MiscUtils.isInDevMode) {
            // Get the search data from the local storage
            const searchData = window.sessionStorage.getItem('search_' + searchId);
            if (!searchData) {
                return false;
            }

            this.loadFromUrlSuccess(objectIndex, JSON.parse(searchData));

            return true;
        }

        // Get the search data from the back office
        MiscRequest.send(
            object.formElement.getAttribute('data-search-url'),
            this.loadFromUrlSuccess.bind(this, objectIndex),
            () => {
            },
            {
                'id': searchId
            }
        );

        return true;
    }

    loadFromUrlSuccess (objectIndex, response) {
        for (const objectName in response) {
            if (!response.hasOwnProperty(objectName)) {
                continue;
            }

            MiscEvent.dispatch('field:' + objectName + ':set', response[objectName]);
        }

        super.start(objectIndex);
    }

    ajaxSubmit (objectIndex, formData) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        const evt = {
            detail: {
                parameters: formData || {},
                reset: true
            }
        };

        object.hasSearched = true;
        this.search(objectIndex, evt);
    }

    search (objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (!object || !object.hasSearched) {
            return;
        }

        if (
            !evt ||
            !evt.detail ||
            (
                !evt.detail.parameters &&
                !evt.detail.next
            )
        ) {
            return;
        }

        // Show loader
        MiscEvent.dispatch('loader:requestShow');

        // Manage parameters
        const options = {};
        if (evt.detail.next) {
            // Go to next set of results
            object.parameters.page = parseInt(object.searchData.pageIndex, 10) + 1;
            options.addUp = true;
        } else {
            // Refine search
            if (evt.detail.reset === true) {
                // New search
                object.parameters = evt.detail.parameters;
                options.zoom = true;
            } else {
                // Mix current and new search
                object.parameters = Object.assign({}, object.parameters, evt.detail.parameters);
            }
        }

        // Get the search data from the back office
        MiscRequest.send(
            object.formElement.getAttribute('action'),
            this.searchSuccess.bind(this, objectIndex, options),
            this.searchError.bind(this, objectIndex),
            object.parameters
        )
    }

    searchSuccess (objectIndex, options, response) {
        if (
            response &&
            response.message
        ) {
            this.notification(objectIndex, null, response.message, response.message_list, response.status);
        }

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        // Save search data
        object.searchData = this.formatSearchData(
            response,
            object.parameters,
            (options.addUp ? object.searchData.results : null)
        );

        // Set url with the search parameters
        this.setSearchHash(objectIndex, response.id);

        object.containerElement.classList.remove('ds44-facette-mobile-expanded');
        this.showSearchData(objectIndex, options);
        MiscEvent.dispatch('loader:requestHide');
    }

    searchError (objectIndex, response) {
        if (
            response &&
            response.message
        ) {
            this.notification(objectIndex, null, response.message, response.message_list, response.status);
        }
        MiscEvent.dispatch('loader:requestHide');
    }

    showSearchData (objectIndex, options = {}) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        MiscEvent.dispatch('search:update', Object.assign({}, object.searchData, options));
    }

    formatSearchData (response, parameters, oldResults = null) {
        let results = [];
        if (oldResults) {
            results = oldResults;
        }
        results = results.concat(response['result']);

        let searchText = [];
        for (let key in parameters) {
            if (!parameters.hasOwnProperty(key)) {
                continue;
            }

            let data = parameters[key];
            try {
                data = JSON.parse(data);
            } catch (ex) {
            }
            if (data.text) {
                searchText.push(data.text);
            }
        }

        return {
            'pageIndex': response['page-index'] || 1,
            'nbResultsPerPage': response['nb-result-per-page'] || response['max-result'],
            'nbResults': response['nb-result'],
            'maxNbResults': response['max-result'],
            'results': results,
            'newResults': response['result'],
            'searchText': searchText.join(', ')
        };
    }

    toggleSearchView (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        if (object.containerElement.classList.contains('ds44-facette-mobile-expanded')) {
            object.containerElement.classList.remove('ds44-facette-mobile-expanded')
        } else {
            object.containerElement.classList.add('ds44-facette-mobile-expanded')
        }
    }

    async setSearchHash (objectIndex, searchId) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        if (MiscUtils.isInDevMode) {
            // In dev mode, generate the search id and use the local storage to store the search data
            // as there is no back end
            const parameters = JSON.stringify(object.parameters);
            searchId = await MiscUtils.digestMessage(parameters);
            window.sessionStorage.setItem('search_' + searchId, parameters);
        } else if (!searchId) {
            return;
        }

        if (object.formElement.getAttribute('data-seo-url') !== 'true') {
            MiscUrl.setHashParameters(object.parameters);
        } else {
            MiscUrl.setSeoHashParameters(object.parameters, searchId);
        }
    }
}

new FormLayoutSearch();

class FormLayoutUtileNo extends FormLayoutUtileAbstract {
    constructor () {
        super('#ds44-choiceN form');
    }
}

// Singleton
new FormLayoutUtileNo();

class FormLayoutUtileYes extends FormLayoutUtileAbstract {
    constructor () {
        super('#ds44-choiceY form');
    }
}

// Singleton
new FormLayoutUtileYes();

class AsideAlphabet {
    constructor () {
        this.containerElement = document.querySelector('.ds44-js-aside-alphabet');
        if (!this.containerElement) {
            return;
        }

        this.containerElement
            .querySelectorAll('li a')
            .forEach((letterElement) => {
                MiscEvent.addListener('click', this.select.bind(this), letterElement);
            });
    }

    select (evt) {
        const activeLetterElement = this.containerElement.querySelector('li a.active')
        if (activeLetterElement) {
            activeLetterElement.classList.remove('active');
            activeLetterElement.removeAttribute('aria-location');
        }

        evt.currentTarget.classList.add('active');
        evt.currentTarget.setAttribute('aria-location', 'true');
    }
}

// Singleton
new AsideAlphabet();

class AsideSummary {
    constructor () {
        this.containerElement = document.querySelector('.ds44-js-aside-summary');
        if (!this.containerElement) {
            return;
        }
        this.summaryElement = this.containerElement.querySelector('.ds44-box');
        if (!this.summaryElement) {
            return;
        }

        this.menu = null;
        this.borderTop = 20;
        this.isMoving = false;
        this.isGoingTo = false;
        this.lastScrollTop = 0;
        this.scrollDirection = 'down';

        this.resize();

        MiscEvent.addListener('scroll', this.scroll.bind(this), window);
        MiscEvent.addListener('resize', this.resize.bind(this), window);
        MiscEvent.addListener('load', this.resize.bind(this), window);
        window.setTimeout(this.resize.bind(this), 1000);

        const aElements = new Set([
            ...this.summaryElement.querySelectorAll('.ds44-list--puces a'),
            ...document.querySelectorAll('#summaryMenu .ds44-list--puces a')
        ]);
        aElements
            .forEach((aElement) => {
                MiscEvent.addListener('click', this.goTo.bind(this), aElement);
            });
        const showModalButtonElement = document.querySelector('#ds44-summary-button');
        if (showModalButtonElement) {
            MiscEvent.addListener('click', this.showMenu.bind(this), showModalButtonElement);
        }
        const hideModalButtonElement = document.querySelector('#summaryMenu .ds44-btnOverlay--closeOverlay');
        if (hideModalButtonElement) {
            MiscEvent.addListener('click', this.hideMenu.bind(this), hideModalButtonElement);
        }
    }

    scroll () {
        const scrollTop = MiscUtils.getScrollTop();
        const top = this.getTop();

        if (this.lastScrollTop > scrollTop) {
            this.scrollDirection = 'up';
        } else {
            this.scrollDirection = 'down';
        }
        this.lastScrollTop = scrollTop;

        if (scrollTop > MiscUtils.getPositionY(this.containerElement) - top) {
            if (!this.isMoving) {
                this.summaryElement.style.width = this.containerElement.offsetWidth + 'px';
                this.isMoving = true;
            }

            if (scrollTop > this.getMaximumTop()) {
                this.summaryElement.style.position = 'absolute';
            } else {
                this.summaryElement.style.position = 'fixed';
            }

            this.summaryElement.style.top = top + 'px';
        } else if (this.isMoving) {
            this.isMoving = false;

            this.summaryElement.style.top = null;
            this.summaryElement.style.position = 'static';
            this.summaryElement.style.width = null;
        }

        if (!this.isGoingTo) {
            this.calculateChapter();
        }
    }

    calculateChapter () {
        // Highlight sections
        let activeAElement = null;
        const cursorPosition = this.getCursorPosition();
        this.summaryElement
            .querySelectorAll('.ds44-list--puces a')
            .forEach((aElement) => {
                aElement.classList.remove('active');
                aElement.removeAttribute('aria-location');
                if (!activeAElement) {
                    activeAElement = aElement
                }

                const sectionId = aElement.getAttribute('href').replace(/^#/, '');
                const sectionElement = document.querySelector('#' + sectionId);
                if (sectionElement) {
                    const sectionElementStyle = sectionElement.currentStyle || window.getComputedStyle(sectionElement);
                    const startTop = MiscUtils.getPositionY(sectionElement) + parseInt(sectionElementStyle.marginTop, 10);
                    if (cursorPosition >= startTop) {
                        activeAElement = aElement
                    }
                }
            });
        if (activeAElement) {
            activeAElement.classList.add('active');
            activeAElement.setAttribute('aria-location', 'true');
        }
    }

    resize () {
        if (this.isMoving) {
            this.summaryElement.style.width = this.containerElement.offsetWidth + 'px';
        }

        this.scroll();
    }

    getCursorPosition () {
        if (this.scrollDirection === 'up') {
            return MiscUtils.getScrollTop() + MiscDom.getHeaderHeight(true);
        }

        return MiscUtils.getScrollTop() + (window.innerHeight || document.documentElement.clientHeight);
    }

    getTop () {
        if (MiscUtils.getScrollTop() > this.getMaximumTop()) {
            return this.containerElement.offsetHeight - this.summaryElement.offsetHeight;
        }

        return Math.min(this.getMaximumTop(), this.borderTop + MiscDom.getHeaderHeight());
    }

    getMaximumTop () {
        return (MiscUtils.getPositionY(this.containerElement) + this.containerElement.offsetHeight - this.summaryElement.offsetHeight) - (this.borderTop + MiscDom.getHeaderHeight());
    }

    goTo (evt) {
        this.isGoingTo = true;

        evt.stopPropagation();
        evt.preventDefault();

        this.hideMenu();

        // Deselect all bullets
        this.summaryElement
            .querySelectorAll('.ds44-list--puces a')
            .forEach((aElement) => {
                aElement.classList.remove('active');
                aElement.removeAttribute('aria-location');
            });

        // Select active bullets
        const aElement = evt.currentTarget;
        aElement.classList.add('active');
        aElement.setAttribute('aria-location', 'true');

        const sectionId = aElement.getAttribute('href').replace(/^#/, '');
        const sectionElement = document.querySelector('#' + sectionId);
        if (sectionElement) {
            const scrollTo = MiscUtils.getPositionY(sectionElement);
            if (MiscUtils.getScrollTop() > scrollTo) {
                // Going up, the header will show
                MiscUtils.scrollTo(
                    scrollTo - MiscDom.getHeaderHeight(true),
                    400,
                    'linear',
                    this.afterGoTo.bind(this)
                );
            } else {
                // Going up, the header will hide
                MiscUtils.scrollTo(
                    scrollTo,
                    400,
                    'linear',
                    this.afterGoTo.bind(this)
                );
            }

            const titleElement = sectionElement.querySelector('h2');
            if (titleElement) {
                MiscAccessibility.setFocus(titleElement);
            }
        }
    }

    afterGoTo () {
        window.setTimeout(
            () => {
                this.isGoingTo = false;
            },
            100
        );
    }

    showMenu () {
        this.menu = document.querySelector('#summaryMenu');
        if (!this.menu) {
            return;
        }

        // Get corresponding close button
        const closeButton = this.menu.querySelector('.ds44-btnOverlay--closeOverlay');
        if (!closeButton) {
            return;
        }

        document.body.style.overflow = 'hidden';
        MiscEvent.dispatch('resize', null, window);
        this.menu.classList.add('show');
        MiscAccessibility.show(this.menu);
        MiscAccessibility.setFocus(closeButton);
        MiscAccessibility.addFocusLoop(this.menu);

        MiscEvent.dispatch('menu:show', { 'element': this.menu });
    }

    hideMenu (evt) {
        if (!this.menu) {
            return;
        }

        const showModalButtonElement = document.querySelector('#ds44-summary-button');
        if (!showModalButtonElement) {
            return;
        }

        MiscAccessibility.removeFocusLoop();
        document.body.style.overflow = null;
        MiscEvent.dispatch('resize', null, window);
        this.menu.classList.remove('show');
        MiscAccessibility.hide(this.menu);

        if (evt) {
            // Focus on button only if close button clicked
            MiscAccessibility.setFocus(showModalButtonElement);
        }

        MiscEvent.dispatch('menu:hide');
    }
}

// Singleton
new AsideSummary();

class ButtonBackToTop {
    constructor () {
        const backToTopElement = document.querySelector('#backToTop');
        if (backToTopElement) {
            MiscEvent.addListener('click', this.go.bind(this), backToTopElement);
        }
    }

    go (evt) {
        evt.stopPropagation();
        evt.preventDefault();

        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > 0) {
            MiscUtils.scrollTo(0)
        }
    }
}

// Singleton
new ButtonBackToTop();

class ButtonMore {
    constructor () {
        this.nbResults = 5;

        document
            .querySelectorAll('.ds44-js-more-button')
            .forEach((buttonElement) => {
                MiscEvent.addListener('click', this.showMore.bind(this), buttonElement);
            });
    }

    showMore (evt) {
        const buttonElement = evt.currentTarget;
        const collapserElement = MiscDom.getPreviousSibling(buttonElement, '.ds44-collapser');
        if (!collapserElement) {
            return;
        }

        const collapserItemElements = Array.prototype.slice.call(
            collapserElement.querySelectorAll('.ds44-collapser_element.hidden'),
            0,
            this.nbResults
        );
        collapserItemElements
            .forEach((collapserItemElement) => {
                collapserItemElement.classList.remove('hidden');
            });
        if (collapserItemElements[0]) {
            const collapserButtonElement = collapserItemElements[0].querySelector('button');
            if (collapserButtonElement) {
                MiscAccessibility.setFocus(collapserButtonElement);
            }
        }

        if (!collapserElement.querySelector('.ds44-collapser_element.hidden')) {
            buttonElement.classList.add('hidden');
        }
    }
}

// Singleton
new ButtonMore();

class ButtonOrejime {
    constructor () {
        MiscEvent.addListener('load', this.initialize.bind(this), window);
    }

    initialize () {
        if (window.orejime) {
            document
                .querySelectorAll('.ds44-js-orejime-show')
                .forEach((buttonElement) => {
                    MiscEvent.addListener('click', this.show.bind(this), buttonElement);
                });
            document
                .querySelectorAll('.ds44-js-orejime-reset')
                .forEach((buttonElement) => {
                    MiscEvent.addListener('click', this.reset.bind(this), buttonElement);
                });
        }
    }

    show () {
        window.orejime.show();
    }

    reset () {
        window.orejime.internals.manager.resetConsent();
        document.location.reload();
    }
}

// Singleton
new ButtonOrejime();

class ButtonSkip {
    constructor () {
        document
            .querySelectorAll('.ds44-skiplinks--link')
            .forEach((skipElement) => {
                MiscEvent.addListener('click', this.go.bind(this), skipElement);
            });
    }

    go (evt) {
        const id = evt.currentTarget.getAttribute('href');
        if (id.indexOf('#') === -1) {
            return;
        }

        evt.stopPropagation();
        evt.preventDefault();
        const focusElement = document.querySelector(id);
        if (!focusElement) {
            return;
        }

        MiscAccessibility.setFocus(focusElement);
    }
}

// Singleton
new ButtonSkip();

class ButtonSticky {
    constructor () {
        this.buttons = [];
        document
            .querySelectorAll('.ds44-js-button-sticky')
            .forEach((buttonElement) => {
                this.buttons.push({
                    'element': buttonElement,
                    'isDelayed': (buttonElement.getAttribute('data-is-delayed') === 'true'),
                    'isMoving': false
                });
            });
        if (this.buttons.length === 0) {
            return;
        }

        this.footerElement = document.querySelector('footer');
        if (!this.footerElement) {
            return;
        }

        this.scroll();

        MiscEvent.addListener('scroll', this.scroll.bind(this), window);
        MiscEvent.addListener('resize', this.scroll.bind(this), window);
        MiscEvent.addListener('load', this.scroll.bind(this), window);
        window.setTimeout(this.scroll.bind(this), 1000);
    }

    scroll () {
        const minimumTop = (window.innerHeight / 2);
        const maximumTop = document.body.offsetHeight - window.innerHeight - this.footerElement.offsetHeight;
        const scrollTop = MiscUtils.getScrollTop();
        for (let i = 0; i < this.buttons.length; i++) {
            const button = this.buttons[i];

            if (scrollTop > maximumTop) {
                button.isMoving = true;
                button.element.style.bottom = -(maximumTop - scrollTop) + 'px';
            } else if (
                button.isDelayed &&
                scrollTop < minimumTop
            ) {
                button.isMoving = true;
                button.element.style.bottom = -(minimumTop - scrollTop) + 'px';
            } else if (button.isMoving) {
                button.isMoving = false;
                button.element.style.bottom = '0px';
            }
        }
    }
}

// Singleton
new ButtonSticky();

class CalendarStandard {
    constructor (options) {
        this.options = {
            element: null,
            selector: null,
            datesFilter: false,
            pastDates: true,
            nextYearDates: true,
            availableWeekDays: [],
            availableDates: [],
            date: new Date(),
            todayDate: new Date(),
            previousButtonElement: null,
            nextButtonElement: null,
            month: null,
            monthLabel: null,
            onSelect: (data, element) => {
            },
            months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            shortWeekday: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        };
        for (let key in options) {
            if (this.options.hasOwnProperty(key)) {
                this.options[key] = options[key];
            }
        }

        if (this.options.element) {
            this.calendarElement = this.options.element;
        } else if (this.options.selector) {
            this.calendarElement = document.querySelector(this.options.selector);
        }
        if (!this.calendarElement) {
            return;
        }

        this.goToPreviousMonthHandler = this.goToPreviousMonth.bind(this);
        this.goToNextMonthHandler = this.goToNextMonth.bind(this);

        this.createCalendarLayout();
        this.options.previousButtonElement = this.calendarElement.querySelector('[data-calendar-toggle=previous]');
        this.options.nextButtonElement = this.calendarElement.querySelector('[data-calendar-toggle=next]');
        this.options.monthElement = this.calendarElement.querySelector('[data-calendar-area=month]');
        this.options.monthLabelElement = this.calendarElement.querySelector('[data-calendar-label=month]');
        if (this.calendarElement.getAttribute('data-calendar-past-dates') === 'false') {
            this.options.pastDates = false;
        }
        if (this.calendarElement.getAttribute('data-calendar-next-year-dates') === 'false') {
            this.options.nextYearDates = false;
        }

        this.options.date.setDate(1);
        this.createMonth();
        this.setWeekDayHeader();
        MiscEvent.addListener('click', this.goToPreviousMonthHandler, this.options.previousButtonElement);
        MiscEvent.addListener('click', this.goToNextMonthHandler, this.options.nextButtonElement);

        this.calendarElement.classList.remove('hidden');
    }

    createCalendarLayout () {
        this.calendarElement.innerHTML = `
            <div class="vanilla-calendar-header">
                <button type="button" class="vanilla-calendar-btn" data-calendar-toggle="previous"><svg height="24" version="1.1" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path></svg></button>
                <div class="vanilla-calendar-header__label" data-calendar-label="month"></div>
                <button type="button" class="vanilla-calendar-btn" data-calendar-toggle="next"><svg height="24" version="1.1" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path></svg></button>
            </div>
            <div class="vanilla-calendar-week"></div>
            <div class="vanilla-calendar-body" data-calendar-area="month"></div>
        `;
    }

    getWeekDay (day) {
        return ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][day];
    }

    createMonth () {
        this.clearCalendar();
        let currentMonth = this.options.date.getMonth();
        while (this.options.date.getMonth() === currentMonth) {
            this.createDay();
            this.options.date.setDate(this.options.date.getDate() + 1);
        }

        this.options.date.setDate(1);
        this.options.date.setMonth(this.options.date.getMonth() - 1);
        this.options.monthLabelElement.innerHTML = this.options.months[this.options.date.getMonth()] + ' ' + this.options.date.getFullYear();

        this.calendarElement
            .querySelectorAll('[data-calendar-status=active]')
            .forEach(dateElement => {
                MiscEvent.addListener('click', this.selectDate.bind(this), dateElement);
            });
    }

    createDay () {
        const newDayElement = document.createElement('div');
        newDayElement.className = 'vanilla-calendar-date';
        newDayElement.setAttribute('data-calendar-date', this.options.date);

        const dateElement = document.createElement('span');
        dateElement.innerHTML = this.options.date.getDate();

        const availableWeekDay = this.options.availableWeekDays.filter(f => f.day === this.options.date.getDay() || f.day === this.getWeekDay(this.options.date.getDay()));
        const availableDate = this.options.availableDates.filter(f => f.date === (this.options.date.getFullYear() + '-' + String(this.options.date.getMonth() + 1).padStart(2, '0') + '-' + String(this.options.date.getDate()).padStart(2, '0')));

        if (this.options.date.getDate() === 1) {
            newDayElement.style.marginLeft = ((this.options.date.getDay()) * 14.28) + '%';
        }
        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
        if (
            this.options.date.getTime() <= this.options.todayDate.getTime() - 1 &&
            !this.options.pastDates
        ) {
            newDayElement.classList.add('vanilla-calendar-date--disabled');
        } else if (
            this.options.date.getTime() >= oneYearFromNow.getTime() + 1 &&
            !this.options.nextYearDates
        ) {
            newDayElement.classList.add('vanilla-calendar-date--disabled');
        } else {
            if (this.options.datesFilter) {
                if (availableWeekDay.length) {
                    newDayElement.classList.add('vanilla-calendar-date--active');
                    newDayElement.setAttribute('data-calendar-data', JSON.stringify(availableWeekDay[0]));
                    newDayElement.setAttribute('data-calendar-status', 'active');
                } else if (availableDate.length) {
                    newDayElement.classList.add('vanilla-calendar-date--active');
                    newDayElement.setAttribute('data-calendar-data', JSON.stringify(availableDate[0]));
                    newDayElement.setAttribute('data-calendar-status', 'active');
                } else {
                    newDayElement.classList.add('vanilla-calendar-date--disabled');
                }
            } else {
                newDayElement.classList.add('vanilla-calendar-date--active');
                newDayElement.setAttribute('data-calendar-status', 'active');
            }
        }
        if (this.options.date.toString() === this.options.todayDate.toString()) {
            newDayElement.classList.add('vanilla-calendar-date--today');
        }

        newDayElement.appendChild(dateElement);
        this.options.monthElement.appendChild(newDayElement);
    }

    removeActiveClass () {
        document
            .querySelectorAll('.vanilla-calendar-date--selected')
            .forEach((dateElement) => {
                dateElement.classList.remove('vanilla-calendar-date--selected')
            });
    }

    selectDate (evt) {
        this.removeActiveClass();
        let datas = evt.currentTarget.dataset;
        let data = {};
        if (datas.calendarDate) {
            data.date = datas.calendarDate;
        }
        if (datas.calendarData) {
            data.data = JSON.parse(datas.calendarData);
        }
        this.options.onSelect(data, evt.currentTarget);
        evt.currentTarget.classList.add('vanilla-calendar-date--selected');
    }

    goToPreviousMonth () {
        this.options.date.setMonth(this.options.date.getMonth() - 1)
        this.createMonth()
    }

    goToNextMonth () {
        this.options.date.setMonth(this.options.date.getMonth() + 1)
        this.createMonth()
    }

    clearCalendar () {
        this.options.monthElement.innerHTML = ''
    }

    setWeekDayHeader () {
        this.calendarElement.querySelector('.vanilla-calendar-week').innerHTML = `
            <span>${this.options.shortWeekday[0]}</span>
            <span>${this.options.shortWeekday[1]}</span>
            <span>${this.options.shortWeekday[2]}</span>
            <span>${this.options.shortWeekday[3]}</span>
            <span>${this.options.shortWeekday[4]}</span>
            <span>${this.options.shortWeekday[5]}</span>
            <span>${this.options.shortWeekday[6]}</span>
        `;
    }

    destroy () {
        MiscEvent.removeListener('click', this.goToPreviousMonthHandler, this.options.previousButtonElement);
        MiscEvent.removeListener('click', this.goToNextMonthHandler, this.options.nextButtonElement);
        this.clearCalendar();
        this.calendarElement.classList.add('hidden');
        this.calendarElement.innerHTML = '';
        this.calendarElement = null;
    }
}

class CardStandard {
    constructor () {
        document.addEventListener('click', this.open.bind(this));
    }

    open (evt) {
        if (
            !evt ||
            !evt.target ||
            !evt.target.closest('.ds44-js-card')
        ) {
            return;
        }

        const elementLinks = evt.target.closest('.ds44-js-card').getElementsByTagName('a');
        if (
            elementLinks[0] &&
            elementLinks[0] !== evt.target
        ) {
            elementLinks[0].click();
        }
    }
}

// Singleton
new CardStandard();

class CarouselSlideshow extends CarouselAbstract {
    constructor () {
        super('.swipper-carousel-wrap.swipper-carousel-slideshow');
    }

    create (wrapElement) {
        super.create(wrapElement);

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.isPlaying = true;

        object.autoplayButtonElement = object.wrapElement.querySelector('button');
        if (object.autoplayButtonElement) {
            MiscEvent.addListener('click', this.startStop.bind(this, objectIndex), object.autoplayButtonElement);
        }
    }

    getSwiperParameters (object) {
        const swiperParameters = super.getSwiperParameters(object);
        swiperParameters.effect = 'fade';
        swiperParameters.speed = 3000;
        swiperParameters.allowTouchMove = false;
        swiperParameters.autoplay = {
            'delay': 5000
        }

        // Take reduced motion media query into account
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (!mediaQuery || mediaQuery.matches) {
            swiperParameters.speed = 0;
        }

        return swiperParameters;
    }

    startStop (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        if (object.isPlaying) {
            const objects = this.getSectionObjects(objectIndex);
            for (let i = 0; i < objects.length; i++) {
                const object = objects[i];

                object.isPlaying = false;
            }
            this.stop(objectIndex);

            return;
        }

        const objects = this.getSectionObjects(objectIndex);
        for (let i = 0; i < objects.length; i++) {
            const object = objects[i];

            object.isPlaying = true;
        }
        this.start(objectIndex);
    }

    getSectionObjects (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return [];
        }

        // Get all slideshows in the same section
        const objects = [];
        const parentElement = (object.wrapElement.closest('section') || object.wrapElement.parentElement);
        parentElement
            .querySelectorAll('.swipper-carousel-slideshow')
            .forEach((wrapElement) => {
                for (let objectIndex in this.objects) {
                    if (!this.objects.hasOwnProperty(objectIndex)) {
                        continue;
                    }

                    const object = this.objects[objectIndex];
                    if (object.wrapElement === wrapElement) {
                        objects.push(object);
                    }
                }
            });

        return objects;
    }

    start (objectIndex) {
        // Get all slideshows in the same section
        const objects = this.getSectionObjects(objectIndex);
        for (let i = 0; i < objects.length; i++) {
            const object = objects[i];

            object.swiper.autoplay.start();

            if (object.autoplayButtonElement) {
                const iconElement = object.autoplayButtonElement.querySelector('i');
                if (iconElement) {
                    iconElement.classList.add('icon-pause');
                    iconElement.classList.remove('icon-play');
                }

                const spanElement = object.autoplayButtonElement.querySelector('span');
                if (spanElement) {
                    spanElement.innerText = spanElement.innerText.replace(MiscTranslate._('START') + ' ', MiscTranslate._('STOP') + ' ');
                }
            }
        }
    }

    stop (objectIndex) {
        // Get all slideshows in the same section
        const objects = this.getSectionObjects(objectIndex);
        for (let i = 0; i < objects.length; i++) {
            const object = objects[i];

            object.swiper.autoplay.stop();

            if (object.autoplayButtonElement) {
                const iconElement = object.autoplayButtonElement.querySelector('i');
                if (iconElement) {
                    iconElement.classList.add('icon-play');
                    iconElement.classList.remove('icon-pause');
                }

                const spanElement = object.autoplayButtonElement.querySelector('span');
                if (spanElement) {
                    spanElement.innerText = spanElement.innerText.replace(MiscTranslate._('STOP') + ' ', MiscTranslate._('START') + ' ');
                }
            }
        }
    }
}

// Singleton
new CarouselSlideshow();

class CarouselStandard extends CarouselAbstract {
    constructor () {
        super('.swipper-carousel-wrap:not(.swipper-carousel-slideshow)');
    }

    showSlide (slideElement) {
        super.showSlide(slideElement);

        const aElement = slideElement.querySelector('a');
        if (!aElement) {
            slideElement.setAttribute('tabindex', '0');
        }
    }

    hideSlide (slideElement) {
        super.hideSlide(slideElement);

        const aElement = slideElement.querySelector('a');
        if (!aElement) {
            slideElement.removeAttribute('tabindex');
        }
    }
}

// Singleton
new CarouselStandard();

class CartSearch {
    constructor () {
        this.manageListener = this.manage.bind(this);

        MiscEvent.addListener('result:destroyed', this.unload.bind(this));
        MiscEvent.addListener('result:created', this.load.bind(this));

        this.refreshTotal();
    }

    unload (evt) {
        document
            .querySelectorAll('.ds44-card .ds44-cardSelect[data-initialized]')
            .forEach((cardSelectElement) => {
                MiscEvent.removeListener('click', this.manageListener, cardSelectElement);
            });
    }

    load (evt) {
        const bookmarks = this.getBookmarks();
        document
            .querySelectorAll('.ds44-card .ds44-cardSelect:not([data-initialized])')
            .forEach((cardSelectElement) => {
                MiscEvent.addListener('click', this.manageListener, cardSelectElement);
                cardSelectElement.setAttribute('data-initialized', 'true');

                const resultItemId = cardSelectElement.closest('.ds44-js-results-item').getAttribute('data-id');
                if (bookmarks.indexOf(resultItemId) !== -1) {
                    const buttonElement = cardSelectElement.querySelector('button .icon');
                    if (buttonElement) {
                        buttonElement.classList.add('icon-star-full');
                        buttonElement.classList.remove('icon-star-empty');
                    }
                }
            });

        this.refreshTotal();
    }

    manage (evt) {
        evt.stopPropagation();
        evt.preventDefault();

        let isSelected = false;
        const buttonElement = evt.currentTarget.querySelector('button .icon');
        if (buttonElement.classList.contains('icon-star-empty')) {
            buttonElement.classList.add('icon-star-full');
            buttonElement.classList.remove('icon-star-empty');
            isSelected = true;
        } else {
            buttonElement.classList.add('icon-star-empty');
            buttonElement.classList.remove('icon-star-full');
        }

        const resultItemId = evt.currentTarget.closest('.ds44-js-results-item').getAttribute('data-id');
        const bookmarks = this.getBookmarks();
        if (isSelected) {
            if (bookmarks.indexOf(resultItemId) === -1) {
                bookmarks.push(resultItemId)
            }
        } else {
            if (bookmarks.indexOf(resultItemId) !== -1) {
                bookmarks.splice(bookmarks.indexOf(resultItemId), 1)
            }
        }
        this.setBookmarks(bookmarks);

        this.refreshTotal();
    }

    getBookmarks () {
        const bookmarkName = this.getBookmarksName();
        let bookmarks = window.sessionStorage.getItem(bookmarkName);
        if (!bookmarks) {
            bookmarks = [];
        } else {
            bookmarks = JSON.parse(bookmarks);
        }
        return bookmarks;
    }

    setBookmarks (bookmarks) {
        const bookmarkName = this.getBookmarksName();
        window.sessionStorage.setItem(bookmarkName, JSON.stringify(bookmarks));
    }

    getBookmarksName () {
        const urlParameters = MiscUrl.getUrlParameters();
        return 'bookmarks_' + urlParameters.pop();
    }

    refreshTotal () {
        const buttonElement = document.querySelector('#bookmarks-search');
        if (!buttonElement) {
            return;
        }

        const bookmarks = this.getBookmarks();
        buttonElement.innerHTML = buttonElement.innerHTML.replace(/ ?\([0-9]+\)/, '') + ' (' + bookmarks.length + ')';
    }
}

// Singleton
new CartSearch();

class CollapserStandard {
    constructor () {
        this.objects = [];

        document
            .querySelectorAll('.ds44-collapser_button')
            .forEach((buttonElement) => {
                this.create(buttonElement);
            });
    }

    create (buttonElement) {
        const object = {
            'id': MiscUtils.generateId(),
            'containerElement': buttonElement.closest('.ds44-collapser_element'),
            'buttonElement': buttonElement,
        };
        this.objects.push(object);
        const objectIndex = (this.objects.length - 1);

        this.hide(objectIndex);

        MiscEvent.addListener('keyUp:escape', this.escape.bind(this, objectIndex));
        MiscEvent.addListener('click', this.showHide.bind(this, objectIndex), buttonElement);
    }

    showHide (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.buttonElement) {
            return;
        }

        if (object.buttonElement.classList.contains('show')) {
            // Hide
            this.hide(objectIndex);

            return;
        }

        // Show
        this.show(objectIndex);
    }

    show (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.buttonElement) {
            return;
        }

        const panel = object.buttonElement.nextElementSibling;
        const buttonLabel = object.buttonElement.querySelector('span.visually-hidden');
        if (buttonLabel) {
            buttonLabel.innerText = MiscTranslate._('COLLAPSE');
        }
        object.buttonElement.classList.add('show');
        object.buttonElement.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = (panel.style.maxHeight ? null : panel.scrollHeight + 60 + 'px');
        MiscAccessibility.show(panel);
        panel.style.visibility = 'visible';
    }

    hide (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.buttonElement) {
            return;
        }

        const panel = object.buttonElement.nextElementSibling;
        const buttonLabel = object.buttonElement.querySelector('span.visually-hidden');
        if (buttonLabel) {
            buttonLabel.innerText = MiscTranslate._('EXPAND');
        }
        object.buttonElement.classList.remove('show');
        object.buttonElement.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = null;
        MiscAccessibility.hide(panel);
        panel.style.visibility = 'hidden';
    }

    escape (objectIndex) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !document.activeElement ||
            !object.containerElement.contains(document.activeElement) ||
            !object.buttonElement
        ) {
            return;
        }

        MiscAccessibility.setFocus(object.buttonElement);

        this.hide(objectIndex);
    }
}

// Singleton
new CollapserStandard();

class HeaderStandard {
    constructor () {
        this.lastScroll = 0;
        this.headerVisibilityCounter = 0;
        this.menuVisibilityCounter = 0;

        // Bind events
        MiscEvent.addListener('scroll', this.scroll.bind(this), window);
        MiscEvent.addListener('overlay:show', this.overlayShow.bind(this));
        MiscEvent.addListener('overlay:hide', this.overlayHide.bind(this));
        MiscEvent.addListener('menu:show', this.menuShow.bind(this));
        MiscEvent.addListener('menu:hide', this.menuHide.bind(this));
        MiscEvent.addListener('loader:show', this.overlayShow.bind(this));
        MiscEvent.addListener('loader:hide', this.overlayHide.bind(this));
        MiscEvent.addListener('keyUp:tab', this.checkFocusPosition.bind(this));
    }

    // Sur le focus au clavier d'un élément caché sous le header, effectuer un scroll vers le haut pour que l'élément soit affiché
    checkFocusPosition () {
        if (
            this.headerVisibilityCounter === 0 &&
            this.menuVisibilityCounter === 0
        ) {
            const headerElement = document.querySelector('header .ds44-header');
            const activeElement = document.activeElement;
            if (
                !headerElement ||
                headerElement.contains(activeElement)
            ) {
                return;
            }

            let headerBottom = headerElement.getBoundingClientRect().bottom;
            if (headerElement.classList.contains('collapsed')) {
                headerBottom += 100;
            }

            const activeElementBoundingClientRect = activeElement.getBoundingClientRect();
            if (activeElementBoundingClientRect.top < headerBottom) {
                window.scrollBy(0, -(150 - activeElementBoundingClientRect.top));
            }
        }
    }

    // Gérer le comportement du header en fonction des scrolls
    scroll () {
        if (
            this.headerVisibilityCounter === 0 &&
            this.menuVisibilityCounter === 0
        ) {
            const headerElement = document.querySelector('header .ds44-header');
            if (!headerElement) {
                return;
            }

            const currentScroll = window.pageYOffset;
            if (currentScroll === 0) {
                headerElement.classList.remove('collapsed');
                MiscAccessibility.show(document.querySelector('header'), false);
                MiscAccessibility.show(document.querySelector('header .ds44-header'), false);
                MiscAccessibility.show(document.querySelector('header .ds44-header .ds44-container-large'));
                if (document.activeElement === document.querySelector('html')) {
                    MiscAccessibility.setFocus(document.querySelector('header .ds44-btn--menu'));
                }
                return;
            }

            if (
                currentScroll > this.lastScroll &&
                !headerElement.classList.contains('collapsed') &&
                currentScroll > headerElement.offsetHeight
            ) {
                // Scroll vers le bas, uniquement si le haut de page est
                // en dessous de la hauteur du header
                headerElement.classList.add('collapsed');
                MiscAccessibility.hide(document.querySelector('header .ds44-header .ds44-container-large'));
                MiscAccessibility.hide(document.querySelector('header .ds44-header'), false);
                MiscAccessibility.hide(document.querySelector('header'), false);
            } else if (
                currentScroll < this.lastScroll &&
                headerElement.classList.contains('collapsed')
            ) {
                // up
                headerElement.classList.remove('collapsed');
                MiscAccessibility.show(document.querySelector('header'), false);
                MiscAccessibility.show(document.querySelector('header .ds44-header'), false);
                MiscAccessibility.show(document.querySelector('header .ds44-header .ds44-container-large'));
            }

            this.lastScroll = currentScroll;
        }
    }

    overlayShow () {
        if (this.headerVisibilityCounter === 0) {
            MiscAccessibility.hide(document.querySelector('header'), false, false);
        }
        this.headerVisibilityCounter--;
    }

    overlayHide () {
        this.headerVisibilityCounter = Math.min(0, (this.headerVisibilityCounter + 1));
        if (this.headerVisibilityCounter === 0) {
            MiscAccessibility.show(document.querySelector('header'), false, false);
        }
    }

    menuShow () {
        if (this.menuVisibilityCounter === 0) {
            MiscAccessibility.hide(document.querySelector('header .ds44-header .ds44-container-large'), true, false);
        }
        this.menuVisibilityCounter--;
    }

    menuHide () {
        this.menuVisibilityCounter = Math.min(0, (this.menuVisibilityCounter + 1));
        if (this.menuVisibilityCounter === 0) {
            MiscAccessibility.show(document.querySelector('header .ds44-header .ds44-container-large'), true, false);
        }
    }
}

// Singleton
new HeaderStandard();

class ImageZoom {
    constructor () {
        this.objects = [];
        this.zoom = 2;
        this.borderWidth = 3;

        document
            .querySelectorAll('.ds44-imgLoupe')
            .forEach((magnifyContainerElement) => {
                this.create(magnifyContainerElement);
            });
    }

    create (magnifyContainerElement) {
        const imageElement = magnifyContainerElement.querySelector('img');
        const magnifyElement = document.createElement('div');
        magnifyElement.classList.add('ds44-js-magnifier');
        magnifyElement.classList.add('hidden');
        magnifyElement.style.backgroundImage = "url('" + imageElement.src + "')";
        magnifyElement.style.backgroundRepeat = 'no-repeat';
        magnifyElement.style.backgroundSize = (imageElement.width * this.zoom) + 'px ' + (imageElement.height * this.zoom) + 'px';
        imageElement.parentElement.insertBefore(magnifyElement, imageElement);

        const object = {
            'id': MiscUtils.generateId(),
            'imageElement': imageElement,
            'magnifyElement': magnifyElement
        };

        this.objects.push(object);

        const objectIndex = (this.objects.length - 1);
        MiscEvent.addListener('mousemove', this.move.bind(this, objectIndex), magnifyElement);
        MiscEvent.addListener('mousemove', this.move.bind(this, objectIndex), imageElement);
        MiscEvent.addListener('touchmove', this.move.bind(this, objectIndex), magnifyElement);
        MiscEvent.addListener('touchmove', this.move.bind(this, objectIndex), imageElement);
        MiscEvent.addListener('mouseleave', this.leave.bind(this, objectIndex), magnifyElement);
    }

    move (objectIndex, evt) {
        evt.preventDefault();
        evt.stopPropagation();

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        const width = object.magnifyElement.offsetWidth / 2;
        const height = object.magnifyElement.offsetHeight / 2;
        const cursorPosition = this.getCursorPosition(objectIndex, evt);

        let x = cursorPosition.x;
        let y = cursorPosition.y;
        if (x > object.imageElement.width) {
            x = object.imageElement.width;
        }
        if (x < 0) {
            x = 0;
        }
        if (y > object.imageElement.height) {
            y = object.imageElement.height;
        }
        if (y < 0) {
            y = 0;
        }

        object.magnifyElement.style.left = (x - width) + 'px';
        object.magnifyElement.style.top = (y - height) + 'px';
        object.magnifyElement.style.backgroundPosition = (((x * this.zoom) - width + this.borderWidth) * -1) + 'px ' + (((y * this.zoom) - height + this.borderWidth) * -1) + 'px';
        object.magnifyElement.classList.remove('hidden');
    }

    leave (objectIndex, evt) {
        evt.preventDefault();
        evt.stopPropagation();

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.magnifyElement.classList.add('hidden');
    }

    getCursorPosition (objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        const boundingClientRect = object.imageElement.getBoundingClientRect();
        return {
            x: (evt.pageX || evt.touches[0].pageX || 0) - boundingClientRect.left - window.pageXOffset,
            y: (evt.pageY || evt.touches[0].pageY || 0) - boundingClientRect.top - window.pageYOffset
        };
    }
}

// Singleton
new ImageZoom();

class KeyboardStandard {
    constructor () {
        MiscEvent.addListener('keyup', this.keyUp.bind(this));
        MiscEvent.addListener('keypress', this.keyPress.bind(this));
        MiscEvent.addListener('keydown', this.keyDown.bind(this));
    }

    keyDown (evt) {
        if (!evt.key) {
            return;
        }

        // Make the space bar or enter act like a mouse click
        const clickableElement = this.getClickableElement(evt);
        if (clickableElement) {
            clickableElement.dispatchEvent(new MouseEvent('mousedown', {
                'bubbles': true,
                'cancelable': true
            }));
            clickableElement.dispatchEvent(new MouseEvent('mouseup', {
                'bubbles': true,
                'cancelable': true
            }));
            clickableElement.dispatchEvent(new MouseEvent('click', {
                'bubbles': true,
                'cancelable': true
            }));

            evt.stopPropagation();
            evt.preventDefault();

            return false;
        }

        // Prevent non valid characters from being entered in inputs
        if (!this.isValid(evt)) {
            evt.stopPropagation();
            evt.preventDefault();

            return false;
        }

        MiscEvent.dispatch('keyDown:*');
        MiscEvent.dispatch('keyDown:' + (evt.key === ' ' ? 'Spacebar' : evt.key).toLowerCase());
    }

    keyPress (evt) {
        if (!evt.key) {
            return;
        }

        const clickableElement = this.getClickableElement(evt);
        if (clickableElement) {
            evt.stopPropagation();
            evt.preventDefault();

            return false;
        }

        MiscEvent.dispatch('keyPress:*');
        MiscEvent.dispatch('keyPress:' + (evt.key === ' ' ? 'Spacebar' : evt.key).toLowerCase());
    }

    keyUp (evt) {
        if (!evt.key) {
            return;
        }

        const clickableElement = this.getClickableElement(evt);
        if (clickableElement) {
            evt.stopPropagation();
            evt.preventDefault();

            return false;
        }

        MiscEvent.dispatch('keyUp:*');
        MiscEvent.dispatch('keyUp:' + (evt.key === ' ' ? 'Spacebar' : evt.key).toLowerCase());
    }

    getClickableElement (evt) {
        if (!document.activeElement) {
            return null;
        }

        if (evt.key === ' ' || evt.key === 'Spacebar') {
            return document.activeElement.closest('a') ||
                document.activeElement.closest('button') ||
                document.activeElement.closest('[tabindex="0"]');
        }

        if (evt.key === 'Enter') {
            return document.activeElement.closest('[role="option"]');
        }

        return null;
    }

    isValid (evt) {
        if (!document.activeElement) {
            return true;
        }

        const numericElement = document.activeElement.closest('[inputmode="numeric"]');
        if (numericElement) {
            const allowedCharacters = '0123456789';

            if (
                evt.key.length === 1 &&
                allowedCharacters.indexOf(evt.key) === -1
            ) {
                return false;
            }
        }

        return true;
    }
}

// Singleton
new KeyboardStandard();

class LoaderStandard {
    constructor () {
        // Counter that prevents from hiding the loader if it has been requested several times
        this.counter = 0;
        this.previousFocusedElement = null;

        MiscEvent.addListener('loader:requestShow', this.show.bind(this));
        MiscEvent.addListener('loader:requestHide', this.hide.bind(this));
        MiscEvent.addListener('loader:setFocus', this.setFocusedElement.bind(this));
    }

    show () {
        const loaderElement = document.querySelector('.ds44-loader');
        const loaderTextElement = document.querySelector('.ds44-loader-text');
        if (!loaderElement || !loaderTextElement) {
            return;
        }

        this.previousFocusedElement = document.activeElement;

        this.counter++;
        loaderElement.classList.remove('hidden');
        MiscAccessibility.show(loaderElement);
        loaderTextElement.innerHTML = '<p>' + MiscTranslate._('LOADING') + '</p>';
        MiscAccessibility.setFocus(loaderTextElement);
        MiscEvent.dispatch('loader:show');
    }

    hide () {
        const loaderElement = document.querySelector('.ds44-loader');
        const loaderTextElement = document.querySelector('.ds44-loader-text');
        if (!loaderElement || !loaderTextElement) {
            return;
        }

        this.counter = Math.max(0, (this.counter - 1));
        if (this.counter === 0) {
            loaderElement.classList.add('hidden');
            MiscAccessibility.hide(loaderElement);
            loaderTextElement.innerHTML = '';
            MiscEvent.dispatch('loader:hide');

            if (this.previousFocusedElement) {
                MiscAccessibility.setFocus(this.previousFocusedElement);
                this.previousFocusedElement = null;
            }
        }
    }

    setFocusedElement (evt) {
        if (
            !evt ||
            !evt.detail ||
            !evt.detail.focusedElement
        ) {
            return;
        }

        this.previousFocusedElement = evt.detail.focusedElement;
    }
}

// Singleton
new LoaderStandard();

class MapGeojson extends MapAbstract {
    constructor () {
        super('.ds44-js-map[data-geojson-mode="dynamic"]');
    }

    create (element) {
        super.create(element);

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.geojsonHoveredId = null;
    }

    afterLoadGeojson (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.map.setFilter(this.geojsonLinesId, ['!has', 'name']);
        object.map.setFilter(this.geojsonFillsId, ['!has', 'name']);

        object.map.on('click', this.geojsonFillsId, this.showAreaPopup.bind(this, objectIndex));
        object.map.on('mousemove', this.geojsonFillsId, this.focus.bind(this, objectIndex));
        object.map.on('mouseleave', this.geojsonFillsId, this.blur.bind(this, objectIndex));

        object.isMapReady = true;
        object.isGeojsonLoaded = true;
        if (object.newResults) {
            this.show(objectIndex);
        }
    }

    showAreaPopup (objectIndex, evt) {
        if (
            evt.originalEvent &&
            evt.originalEvent.target &&
            evt.originalEvent.target.classList.contains('ds44-map-marker')
        ) {
            // Clicked on a marker
            return;
        }

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        let popupContent = `
            <section class="ds44-card ds44-js-card ds44-card--contact ds44-box ds44-bgGray">
                <div class="ds44-card__section">
                    <div class="ds44-innerBoxContainer">
                        <p role="heading" aria-level="3" class="h4-like ds44-cardTitle mts">${evt.features[0].properties.description}</p>
                    </div>
                </div>
            </section>
        `;
        for (let resultIndex in object.newResults) {
            if (!object.newResults.hasOwnProperty(resultIndex)) {
                continue;
            }

            const result = object.newResults[resultIndex];
            if (result.id === evt.features[0].properties.name) {
                popupContent = result.metadata.html_marker;
                break;
            }
        }

        const popup = new window.mapboxgl.Popup()
            .setLngLat(evt.lngLat)
            .setHTML(popupContent)
            .addTo(object.map);
        MiscEvent.addListener('click', this.popupClick.bind(this, evt.features[0].properties.name), popup.getElement());
    }

    show (objectIndex) {
        this.showGeojson(objectIndex);
    }

    getGeojsonIds (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return [];
        }

        // Get geojson ids
        const geojsonIds = [];
        for (let resultIndex in object.newResults) {
            if (!object.newResults.hasOwnProperty(resultIndex)) {
                continue;
            }

            const result = object.newResults[resultIndex];
            if (
                !result.metadata ||
                !result.metadata.html_marker
            ) {
                continue;
            }

            geojsonIds.push(result.id);
        }

        return geojsonIds;
    }

    focus (objectIndex, evt) {
        if (evt.features.length > 0) {
            const object = this.objects[objectIndex];
            if (!object) {
                return;
            }

            object.map.getCanvas().style.cursor = 'pointer';

            if (object.geojsonHoveredId !== null) {
                MiscEvent.dispatch('search:blur', { 'id': object.geojsonHoveredId });
            }
            object.geojsonHoveredId = evt.features[0].properties.name;
            MiscEvent.dispatch('search:focus', { 'id': object.geojsonHoveredId });
        }
    }

    blur (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.map.getCanvas().style.cursor = '';

        if (object.geojsonHoveredId !== null) {
            MiscEvent.dispatch('search:blur', { 'id': object.geojsonHoveredId });
            object.geojsonHoveredId = null;
        }
    }

    resultFocus (evt) {
        if (
            !evt ||
            !evt.detail ||
            !evt.detail.id
        ) {
            return;
        }

        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];

            const features = object.map.querySourceFeatures(this.geojsonSourceId);
            for (let i = 0; i < features.length; i++) {
                if (features[i].properties.name === evt.detail.id) {
                    object.map.setFeatureState(
                        { source: this.geojsonSourceId, id: features[i].id },
                        { hover: true }
                    );
                }
            }
        }
    }

    resultBlur (evt) {
        if (
            !evt ||
            !evt.detail ||
            !evt.detail.id
        ) {
            return;
        }

        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];

            const features = object.map.querySourceFeatures(this.geojsonSourceId);
            for (let i = 0; i < features.length; i++) {
                if (features[i].properties.name === evt.detail.id) {
                    object.map.setFeatureState(
                        { source: this.geojsonSourceId, id: features[i].id },
                        { hover: false }
                    );
                }
            }
        }
    }
}

// Singleton
new MapGeojson();

class MapMarker extends MapAbstract {
    constructor () {
        super('.ds44-js-map:not([data-geojson-mode="dynamic"])');
    }

    create (element) {
        super.create(element);

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.markers = [];
    }

    afterLoad (objectIndex) {
        super.afterLoad(objectIndex);

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.isMapReady = true;
        object.map.on('moveend', this.move.bind(this, objectIndex));
        if (object.newResults) {
            this.show(objectIndex);
        }
    }

    move (objectIndex, evt) {
        if (!evt.originalEvent) {
            return;
        }

        const object = this.objects[objectIndex];
        if (!object || !object.isVisible) {
            return;
        }

        const mapBounds = object.map.getBounds();
        MiscEvent.dispatch(
            'search:refresh',
            {
                'parameters': {
                    'map': {
                        'nw': mapBounds.getNorthWest().toArray(),
                        'sw': mapBounds.getSouthWest().toArray(),
                        'ne': mapBounds.getNorthEast().toArray(),
                        'se': mapBounds.getSouthEast().toArray()
                    }
                }
            });
    }

    show (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        // Remove existing markers
        if (!object.addUp) {
            for (let i = 0; i < object.markers.length; i++) {
                object.markers[i].remove();
            }
            object.markers = [];
        }

        // Add new markers
        let hasBoundingBox = false;
        const boundingBox = {
            longitude: {
                min: null,
                max: null
            },
            latitude: {
                min: null,
                max: null
            }
        };
        for (let resultIndex in object.newResults) {
            if (!object.newResults.hasOwnProperty(resultIndex)) {
                continue;
            }

            const result = object.newResults[resultIndex];
            if (
                !result.metadata ||
                !result.metadata.lat ||
                !result.metadata.long ||
                !result.metadata.html_marker
            ) {
                continue;
            }

            // Create a marker
            hasBoundingBox = true;
            const lngLat = [
                result.metadata.long,
                result.metadata.lat
            ];
            const markerElement = document.createElement('div');
            markerElement.setAttribute('id', 'search-marker-' + result.id);
            markerElement.setAttribute('data-id', result.id);
            markerElement.className = 'ds44-map-marker';
            MiscEvent.addListener('mouseenter', this.focus.bind(this), markerElement);
            MiscEvent.addListener('mouseleave', this.blur.bind(this), markerElement);
            const popup = new window.mapboxgl
                .Popup({ offset: 25 })
                .setHTML(result.metadata.html_marker);
            object.markers.push(new window.mapboxgl
                .Marker(markerElement)
                .setLngLat(lngLat)
                .setPopup(popup)
                .addTo(object.map));
            popup.on('open', ((resultId, evt) => {
                MiscEvent.addListener('click', this.popupClick.bind(this, resultId), evt.target.getElement())
            }).bind(this, result.id));
            const mapboxMarkerElement = object.markers[object.markers.length - 1].getElement();
            if (mapboxMarkerElement) {
                mapboxMarkerElement.removeAttribute('tabindex');
            }

            if (boundingBox.longitude.min === null) {
                boundingBox.longitude.min = result.metadata.long;
            } else {
                boundingBox.longitude.min = Math.min(result.metadata.long, boundingBox.longitude.min);
            }
            if (boundingBox.longitude.max === null) {
                boundingBox.longitude.max = result.metadata.long;
            } else {
                boundingBox.longitude.max = Math.max(result.metadata.long, boundingBox.longitude.max);
            }
            if (boundingBox.latitude.min === null) {
                boundingBox.latitude.min = result.metadata.lat;
            } else {
                boundingBox.latitude.min = Math.min(result.metadata.lat, boundingBox.latitude.min);
            }
            if (boundingBox.latitude.max === null) {
                boundingBox.latitude.max = result.metadata.lat;
            } else {
                boundingBox.latitude.max = Math.max(result.metadata.lat, boundingBox.latitude.max);
            }
        }

        if (object.zoom && hasBoundingBox) {
            // Zoom the map
            object.zoom = false;
            object.map.fitBounds(
                [
                    [
                        boundingBox.longitude.min,
                        boundingBox.latitude.min
                    ],
                    [
                        boundingBox.longitude.max,
                        boundingBox.latitude.max
                    ]
                ],
                {
                    padding: 50,
                    maxZoom: 15
                }
            );
        }

        if (
            object.isGeojsonLoaded &&
            object.mapElement.getAttribute('data-geojson-refine') === 'true'
        ) {
            this.showGeojson(objectIndex);
        }
    }

    afterLoadGeojson (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.isGeojsonLoaded = true;
        if (object.mapElement.getAttribute('data-geojson-refine') === 'true') {
            this.showGeojson(objectIndex);
        }
    }

    getGeojsonIds (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return [];
        }

        const geojsonIds = [];
        for (let resultIndex in object.newResults) {
            if (!object.newResults.hasOwnProperty(resultIndex)) {
                continue;
            }

            const result = object.newResults[resultIndex];
            if (
                !result.metadata ||
                !result.metadata.lat ||
                !result.metadata.long ||
                !result.metadata.html_marker
            ) {
                continue;
            }

            // Get corresponding geojson
            if (result.metadata.geojson_id) {
                geojsonIds.push(result.metadata.geojson_id);
            }
        }

        return geojsonIds;
    }

    focus (evt) {
        const id = evt.currentTarget.getAttribute('data-id');
        MiscEvent.dispatch('search:focus', { 'id': id });
    }

    blur (evt) {
        const id = evt.currentTarget.getAttribute('data-id');
        MiscEvent.dispatch('search:blur', { 'id': id });
    }

    resultFocus (evt) {
        if (
            !evt ||
            !evt.detail ||
            !evt.detail.id
        ) {
            return;
        }

        const resultElement = document.querySelector('#search-marker-' + evt.detail.id);
        if (resultElement) {
            resultElement.classList.add('active');
        }
    }

    resultBlur (evt) {
        if (
            !evt ||
            !evt.detail ||
            !evt.detail.id
        ) {
            return;
        }

        const resultElement = document.querySelector('#search-marker-' + evt.detail.id);
        if (resultElement) {
            resultElement.classList.remove('active');
        }
    }
}

// Singleton
new MapMarker();

class MenuHeader {
    constructor () {
        this.triggerMenuElement = null;
        this.triggerSubMenuElement = null;
        this.menuSelector = null;
        this.menu = null;

        this.hideMenuListener = this.hideMenu.bind(this);
        this.focusOutListener = this.focusOut.bind(this);
        this.clickOutListener = this.clickOut.bind(this);

        MiscEvent.addListener('keyUp:escape', this.hideMenuListener);

        document
            .querySelectorAll('header #open-menu')
            .forEach((element) => {
                MiscEvent.addListener('click', this.showNavigation.bind(this), element);
            });
        document
            .querySelectorAll('header #open-search')
            .forEach((element) => {
                MiscEvent.addListener('click', this.showSearch.bind(this), element);
            });
        document
            .querySelectorAll('header .ds44-btnOverlay--closeOverlay')
            .forEach((element) => {
                MiscEvent.addListener('click', this.hideMenuListener, element);
            });
        document
            .querySelectorAll('#ds44-btn-applis, header .ds44-navList .ds44-menuBtn')
            .forEach((element) => {
                MiscEvent.addListener('click', this.showSubNavigationMenu.bind(this), element);
            });
        document
            .querySelectorAll('header .ds44-btn-backOverlay')
            .forEach((element) => {
                MiscEvent.addListener('click', this.hideSubNavigationMenu.bind(this), element);
            });

        MiscAccessibility.hide(document.querySelector('header .ds44-blocMenu'));
    }

    showMenu (evt) {
        if (evt) {
            evt.stopPropagation();
        }

        if (this.menu) {
            this.hideMenu();
        }

        // Get corresponding menu
        const menu = document.querySelector('header .ds44-blocMenu');
        if (!menu) {
            return;
        }

        // Get menu main section
        const mainMenu = menu.querySelector(this.menuSelector)
        if (!mainMenu) {
            return;
        }

        // Get corresponding close button
        const closeButton = mainMenu.querySelector('.ds44-btnOverlay--closeOverlay');
        if (!closeButton) {
            return;
        }

        // Record the element that triggered the overlay
        this.triggerMenuElement = evt.currentTarget;
        this.menu = menu;

        // Show menu
        document.body.style.overflow = 'hidden';
        MiscEvent.dispatch('resize', null, window);
        mainMenu.classList.add('show');
        MiscAccessibility.show(this.menu);
        MiscAccessibility.show(mainMenu);
        this.menu
            .querySelectorAll('section.ds44-overlay')
            .forEach((subMainMenu) => {
                MiscAccessibility.hide(subMainMenu);
            });

        // Set focus in menu
        window.setTimeout(MiscAccessibility.setFocus.bind(this, closeButton), 500);
        MiscAccessibility.addFocusLoop(mainMenu);
        MiscEvent.dispatch('menu:show', { 'element': mainMenu });

        MiscEvent.addListener('click', this.hideMenuListener, closeButton);
        MiscEvent.addListener('focusout', this.focusOutListener, this.menu);
        MiscEvent.addListener('click', this.clickOutListener, document.body);
    }

    showNavigation (evt) {
        this.menuSelector = '.ds44-overlay--navNiv1';
        this.showMenu(evt);
    }

    showSearch (evt) {
        this.menuSelector = '#menuRech .ds44-overlay';
        this.showMenu(evt);
    }

    // Ferme tous les menus, et ajoute un focus sur le bouton qui a ouvert le dernier menu affiché
    hideMenu (evt) {
        if (evt) {
            evt.stopPropagation();
        }

        // Get current menu
        if (!this.menu) {
            return;
        }

        // Get menu main section
        const mainMenu = this.menu.querySelector(this.menuSelector)
        this.menuSelector = null;
        if (!mainMenu) {
            return;
        }

        // Get corresponding close button
        const closeButton = mainMenu.querySelector('.ds44-btnOverlay--closeOverlay');
        if (!closeButton) {
            return;
        }

        MiscEvent.removeListener('click', this.hideMenuListener, closeButton);
        MiscEvent.removeListener('focusout', this.focusOutListener, this.menu);
        MiscEvent.removeListener('click', this.clickOutListener, document.body);

        MiscAccessibility.removeFocusLoop();

        document.body.style.overflow = null;
        MiscEvent.dispatch('resize', null, window);
        mainMenu.classList.remove('show');
        document
            .querySelectorAll('header .ds44-blocMenu .ds44-overlay')
            .forEach((subMainMenu) => {
                subMainMenu.classList.remove('show');
            });
        MiscAccessibility.hide(mainMenu);
        MiscAccessibility.hide(this.menu);

        if (this.triggerMenuElement) {
            MiscAccessibility.setFocus(this.triggerMenuElement)
        }

        this.triggerMenuElement = null;
        this.menu = null;

        MiscEvent.dispatch('menu:hide');
    }

    showSubNavigationMenu (evt) {
        // Get current menu
        if (!this.menu) {
            return;
        }

        // Don't do anything if it is a link
        if (evt.currentTarget.getAttribute('href')) {
            return;
        }

        // Get menu navigation section
        const navigationMenu = this.menu.querySelector('.ds44-overlay--navNiv1');
        if (!navigationMenu) {
            return;
        }

        let subNavigationMenu = null;
        if (evt.currentTarget.getAttribute('data-ssmenu')) {
            subNavigationMenu = document.querySelector('#' + evt.currentTarget.getAttribute('data-ssmenu'));
        } else {
            subNavigationMenu = document.querySelector('#navApplis');
        }
        if (!subNavigationMenu) {
            return;
        }

        // Get corresponding close button
        const backButton = subNavigationMenu.querySelector('.ds44-btn-backOverlay');
        if (!backButton) {
            return;
        }

        this.triggerSubMenuElement = evt.currentTarget;

        MiscAccessibility.hide(navigationMenu);
        MiscAccessibility.removeFocusLoop();

        subNavigationMenu.classList.add('show');
        MiscAccessibility.show(subNavigationMenu);
        MiscAccessibility.setFocus(backButton);
        MiscAccessibility.addFocusLoop(subNavigationMenu);
    }

    hideSubNavigationMenu () {
        // Get current menu
        if (!this.menu) {
            return;
        }

        // Get menu navigation section
        const navigationMenu = this.menu.querySelector('.ds44-overlay--navNiv1');
        if (!navigationMenu) {
            return;
        }

        const subNavigationMenu = this.menu.querySelector('.ds44-overlay.show:not(.ds44-overlay--navNiv1)');
        if (!subNavigationMenu) {
            return;
        }

        // Get corresponding close button
        const closeButton = navigationMenu.querySelector('.ds44-btnOverlay--closeOverlay');
        if (!closeButton) {
            return;
        }

        subNavigationMenu.classList.remove('show');
        MiscAccessibility.hide(subNavigationMenu);
        MiscAccessibility.removeFocusLoop();

        MiscAccessibility.show(navigationMenu);

        if (this.triggerSubMenuElement) {
            MiscAccessibility.setFocus(this.triggerSubMenuElement)
            this.triggerSubMenuElement = null;
        } else {
            MiscAccessibility.setFocus(closeButton);
        }
        MiscAccessibility.addFocusLoop(navigationMenu);
    }

    focusOut (evt) {
        if (evt.target && this.menu.contains(evt.target)) {
            return;
        }

        MiscAccessibility.setFocus(this.menu);
    }

    clickOut (evt) {
        if (evt.target && this.menu.contains(evt.target)) {
            return;
        }

        this.hideMenu();
    }
}

// Singleton
new MenuHeader();

class NumberDynamic {
    constructor () {
        this.duration = 3000; // Seconds
        this.increment = 100;

        MiscEvent.addListener('scroll', this.scroll.bind(this), window);
        MiscEvent.addListener('resize', this.scroll.bind(this), window);
        window.setTimeout(this.scroll.bind(this), 100);
    }

    scroll () {
        document
            .querySelectorAll('.ds44-js-dynamic-number:not(.started)')
            .forEach((dynamicNumberElement) => {
                if (!dynamicNumberElement.getAttribute('data-stop')) {
                    return;
                }

                const positionY = MiscUtils.getPositionY(dynamicNumberElement);
                const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
                const scrollTop = MiscUtils.getScrollTop();
                const scrollBottom = scrollTop + viewportHeight;

                if (
                    positionY > scrollTop &&
                    positionY < scrollBottom
                ) {
                    this.start(dynamicNumberElement);
                }
            });
    }

    start (dynamicNumberElement) {
        dynamicNumberElement.classList.add('started');

        const start = parseFloat(dynamicNumberElement.getAttribute('data-start') || 0);
        const stop = parseFloat(dynamicNumberElement.getAttribute('data-stop'));
        const languageIso = (MiscTranslate.getLanguage() === 'fr' ? 'fr-FR' : 'en-GB');
        const isInteger = (stop === parseInt(stop, 10));
        const fractionDigits = (isInteger ? 0 : 1);

        let value = start;
        for (let i = 0; i <= this.duration; i = (i + this.increment)) {
            window.setTimeout(
                ((dynamicNumberElement, value, languageIso, fractionDigits) => {
                    return () => {
                        dynamicNumberElement.innerText = new Intl.NumberFormat(
                            languageIso,
                            {
                                minimumFractionDigits: fractionDigits,
                                maximumFractionDigits: fractionDigits
                            }
                        ).format(value);
                    }
                })(dynamicNumberElement, value, languageIso, fractionDigits),
                this.easeInQuad(i, 0, this.duration, this.duration)
            );

            value += ((stop - start) / (this.duration / this.increment));
        }
    }

    easeInQuad (t, b, c, d) {
        return c * (t /= d) * t + b;
    }
}

// Singleton
new NumberDynamic();

class OverlayMosaic extends OverlayAbstract {
    fill () {
        const sourceFigureElement = this.triggerElement;
        if (!sourceFigureElement) {
            return;
        }

        const destinationFigureElement = this.modal.querySelector('figure.ds44-legendeContainer');
        if (!destinationFigureElement) {
            return;
        }

        destinationFigureElement.innerHTML = sourceFigureElement.innerHTML;
    }
}

// Singleton
new OverlayMosaic('[data-js="ds44-modal"][data-target="#overlay-mosaique"]');

class OverlayNewsletter {
    constructor () {
        const buttonsElements = document.querySelectorAll('#overlay-newsletter-buttons button');
        if (buttonsElements.length === 0) {
            return;
        }

        MiscEvent.addListener('click', this.checkAll.bind(this), buttonsElements[0]);
        MiscEvent.addListener('click', this.uncheckAll.bind(this), buttonsElements[1]);
    }

    checkAll (evt) {
        evt.currentTarget.closest('form')
            .querySelectorAll('input[type="checkbox"]')
            .forEach((checkboxElement) => {
                checkboxElement.checked = true;
            })
    }

    uncheckAll (evt) {
        evt.currentTarget.closest('form')
            .querySelectorAll('input[type="checkbox"]')
            .forEach((checkboxElement) => {
                checkboxElement.checked = false;
            })
    }
}

// Singleton
new OverlayNewsletter();


class OverlayNewsletterArchives {
    constructor () {
        const buttonsElements = document.querySelectorAll('#overlay-newsletter-buttons-archives button');
        if (buttonsElements.length === 0) {
            return;
        }

        MiscEvent.addListener('click', this.checkAll.bind(this), buttonsElements[0]);
        MiscEvent.addListener('click', this.uncheckAll.bind(this), buttonsElements[1]);
    }

    checkAll (evt) {
        evt.currentTarget.closest('form')
            .querySelectorAll('input[type="checkbox"]')
            .forEach((checkboxElement) => {
                checkboxElement.checked = true;
            })
    }

    uncheckAll (evt) {
        evt.currentTarget.closest('form')
            .querySelectorAll('input[type="checkbox"]')
            .forEach((checkboxElement) => {
                checkboxElement.checked = false;
            })
    }
}

// Singleton
new OverlayNewsletterArchives();

class OverlayStandard extends OverlayAbstract {
}

// Singleton
new OverlayStandard('[data-js="ds44-modal"]:not([data-target="#overlay-mosaique"])');

class PageElement {
    constructor () {
        this.visibilityCounter = 0;
        this.objects = []

        document
            .querySelectorAll('footer, main')
            .forEach((pageElement) => {
                this.create(pageElement);
            });

        MiscEvent.addListener('overlay:show', this.hide.bind(this));
        MiscEvent.addListener('overlay:hide', this.show.bind(this));
        MiscEvent.addListener('menu:show', this.hide.bind(this));
        MiscEvent.addListener('menu:hide', this.show.bind(this));
        MiscEvent.addListener('loader:show', this.hide.bind(this));
        MiscEvent.addListener('loader:hide', this.show.bind(this));
    }

    create (pageElement) {
        const object = {
            'id': MiscUtils.generateId(),
            'element': pageElement
        };
        this.objects.push(object);
    }

    show () {
        this.visibilityCounter = Math.min(0, (this.visibilityCounter + 1));
        if (this.visibilityCounter === 0) {
            for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
                MiscAccessibility.show(this.objects[objectIndex].element, true, false);
            }
        }
    }

    hide () {
        if (this.visibilityCounter === 0) {
            for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
                MiscAccessibility.hide(this.objects[objectIndex].element, true, false);
            }
        }
        this.visibilityCounter--;
    }
}

// Singleton
new PageElement();

class ResultStandard {
    constructor () {
        this.currentId = null;
        this.savedScrollTop = null;
        this.hasSearched = false;

        MiscEvent.addListener('search:update', this.fillList.bind(this));
        MiscEvent.addListener('search:focus', this.resultFocus.bind(this));
        MiscEvent.addListener('search:blur', this.resultBlur.bind(this));
        MiscEvent.addListener('search:select', this.resultSelect.bind(this));
        const listContainerElement = document.querySelector('.ds44-results .ds44-js-results-container .ds44-js-results-list');
        if (listContainerElement) {
            MiscEvent.addListener('click', this.showMore.bind(this), listContainerElement);
        }

        window.setTimeout(this.initialize.bind(this), 1000);
    }

    initialize () {
        if (!this.hasSearched) {
            // Show initial message
            let newSearchElement = document.querySelector('#ds44-results-new-search');
            if (newSearchElement) {
                newSearchElement.style.display = 'block';
            }
        }
    }

    fillCard (evt) {
        evt.stopPropagation();
        evt.preventDefault();

        const cardContainerElement = document.querySelector('.ds44-results .ds44-js-results-container .ds44-js-results-card');
        if (!cardContainerElement) {
            return;
        }

        let scrollTopElement = (document.documentElement || document.body);
        if (cardContainerElement.closest('.ds44-results--mapVisible')) {
            scrollTopElement = cardContainerElement.closest('.ds44-innerBoxContainer');
        }
        this.savedScrollTop = scrollTopElement.scrollTop;
        scrollTopElement.scrollTo({ 'top': 0 });

        MiscEvent.dispatch('loader:requestShow');

        this.currentId = evt.currentTarget.getAttribute('data-id');
        const url = cardContainerElement.getAttribute('data-url');
        MiscRequest.send(
            url + (url.includes('?') ? '&' : '?') + 'q=' + encodeURIComponent(this.currentId),
            this.fillCardSuccess.bind(this),
            this.fillCardError.bind(this)
        );
    }

    fillCardSuccess (result) {
        const cardContainerElement = document.querySelector('.ds44-results .ds44-js-results-container .ds44-js-results-card');
        if (!cardContainerElement) {
            return;
        }

        cardContainerElement.innerHTML = result.content_html;

        const buttonElement = cardContainerElement.querySelector('button');
        if (buttonElement) {
            MiscEvent.addListener('click', this.showList.bind(this), buttonElement);
        }

        this.showCard();

        MiscEvent.dispatch('loader:requestHide');
    }

    fillCardError () {
        // TODO: Show error notification

        MiscEvent.dispatch('loader:requestHide');
    }

    redirectCard (evt) {
        evt.stopPropagation();
        evt.preventDefault();

        const listItemElement = evt.currentTarget;
        const aElement = listItemElement.querySelector('a');
        if (!aElement) {
            return;
        }

        let url = (
            listItemElement.getAttribute('data-redirect-url') ||
            aElement.getAttribute('href')
        );
        if (!url) {
            return;
        }

        const isInNewTab = (
            listItemElement.getAttribute('data-redirect-target') === '_blank' ||
            aElement.getAttribute('target') === '_blank'
        );

        // url += (url.indexOf('?') !== -1 ? '&' : '?') + 'previousPage=' + encodeURIComponent(window.location.href);
        if (isInNewTab === true) {
            window.open(url);
            return;
        }

        document.location.href = url;
    }

    showCard () {
        const containerElement = document.querySelector('.ds44-results .ds44-js-results-container');
        if (!containerElement) {
            return;
        }

        const cardContainerElement = containerElement.querySelector('.ds44-js-results-card');
        if (cardContainerElement) {
            MiscAccessibility.show(cardContainerElement);

            const buttonElement = cardContainerElement.querySelector('button');
            if (buttonElement) {
                window.setTimeout(
                    () => {
                        MiscAccessibility.setFocus(null, '.ds44-results .ds44-js-results-container .ds44-js-results-card button');
                    },
                    600
                );
            }
        }

        containerElement.classList.add('ds44-js-show-card');
        this.focus();
    }

    showList () {
        const containerElement = document.querySelector('.ds44-results .ds44-js-results-container');
        if (!containerElement) {
            return;
        }

        const cardContainerElement = containerElement.querySelector('.ds44-js-results-card');
        if (cardContainerElement) {
            MiscAccessibility.hide(cardContainerElement);
        }

        containerElement.classList.remove('ds44-js-show-card');
        this.blur();

        if (this.currentId) {
            const resultElement = document.querySelector('#search-result-' + this.currentId + ' a');
            if (resultElement) {
                MiscAccessibility.setFocus(resultElement);
            }
            this.currentId = null;
        }
        if (this.savedScrollTop) {
            let scrollTopElement = (document.documentElement || document.body);
            if (containerElement.closest('.ds44-results--mapVisible')) {
                scrollTopElement = containerElement.closest('.ds44-innerBoxContainer');
            }
            scrollTopElement.scrollTo({ 'top': this.savedScrollTop });

            this.savedScrollTop = null;
        }
    }

    showMore (evt) {
        if (
            !evt ||
            !evt.target ||
            !evt.target.closest('.ds44-js-search-button')
        ) {
            return;
        }

        MiscEvent.dispatch(
            'search:refresh',
            {
                'next': true
            });
    }

    fillList (evt) {
        const containerElement = document.querySelector('.ds44-results .ds44-js-results-container');
        if (!containerElement) {
            return;
        }

        const listContainerElement = containerElement.querySelector('.ds44-js-results-list');
        if (!listContainerElement) {
            return;
        }

        this.hasSearched = true;

        // Nb display results
        const nbDisplayedResults = evt.detail.pageIndex * evt.detail.nbResultsPerPage;

        // Show hide empty results
        const parentElement = document.querySelector('.ds44-results');
        if (nbDisplayedResults > 0) {
            parentElement.classList.remove('ds44-results--empty');
        } else {
            parentElement.classList.add('ds44-results--empty');
        }

        // Remove initial message
        let newSearchElement = listContainerElement.querySelector('#ds44-results-new-search');
        if (newSearchElement) {
            newSearchElement.remove();
        }

        // Manage legend
        let legendElement = listContainerElement.querySelector('.ds44-textLegend');
        if (
            legendElement &&
            evt.detail.nbResults <= evt.detail.maxNbResults
        ) {
            legendElement.remove();
        } else if (
            !legendElement &&
            evt.detail.nbResults > evt.detail.maxNbResults
        ) {
            legendElement = document.createElement('p');
            legendElement.className = 'ds44-textLegend mbs';
            legendElement.innerText = MiscTranslate._('RESULTS_MAX_RESULTS', { maxNbResults: evt.detail.maxNbResults });
            listContainerElement.appendChild(legendElement);
        }

        // Manage title
        let focusElement = null;
        let titleElement = listContainerElement.querySelector('.h3-like');
        if (!titleElement) {
            titleElement = document.createElement('div');
            titleElement.className = 'h3-like mbs';
            titleElement.setAttribute('role', 'heading');
            titleElement.setAttribute('aria-level', '1');
            listContainerElement.appendChild(titleElement);
        }
        if (!evt.detail.nbResults) {
            let titleElementHtml = MiscTranslate._('NO_RESULTS_FOR_SEARCH:') + ' ' + evt.detail.searchText + '.<br>' + MiscTranslate._('NO_RESULTS_NEW_SEARCH') + '.';
            titleElement.innerHTML = titleElementHtml;
            document.title = titleElementHtml;
            titleElement.setAttribute('tabindex', '-1');
            focusElement = titleElement;
        } else {
            let titleElementHtml = evt.detail.nbResults;
            if (evt.detail.nbResults > 1) {
                titleElementHtml += ' ' + MiscTranslate._('RESULTS');
            } else {
                titleElementHtml += ' ' + MiscTranslate._('RESULT');
            }
            let accessibleSentence = MiscTranslate._('NB_RESULTS_FOR_SEARCH:') + ' ' + (evt.detail.searchText === '' ? MiscTranslate._('EMPTY_SEARCH_CRITERIA') : evt.detail.searchText);
            titleElement.innerHTML = titleElementHtml + '<p class="visually-hidden" tabindex="-1">' + accessibleSentence + '</p>';
            document.title = titleElementHtml + ' ' + accessibleSentence;
            titleElement.removeAttribute('tabindex');
            focusElement = titleElement.querySelector('.visually-hidden')
        }

        // Remove existing results
        let listElement = listContainerElement.querySelector('.ds44-list');
        if (listElement && !evt.detail.addUp) {
            listElement.remove();
            listElement = null;

            MiscEvent.dispatch('result:destroyed');
        }
        if (!listElement) {
            listElement = document.createElement('ul');
            listElement.className = 'ds44-list ds44-list--results ds44-flex-container';
            listContainerElement.appendChild(listElement);
        }

        // Add new results
        let isFirstResult = true;
        const results = (evt.detail.addUp ? evt.detail.newResults : evt.detail.results);
        for (let resultIndex in results) {
            if (!results.hasOwnProperty(resultIndex)) {
                continue;
            }

            const result = results[resultIndex];
            if (
                !result.metadata ||
                !result.metadata.html_list
            ) {
                continue;
            }

            let hasRedirectDisplayMode = false;
            const listItemElement = document.createElement('li');
            listItemElement.setAttribute('id', 'search-result-' + result.id);
            listItemElement.setAttribute('data-id', result.id);
            if (
                result.redirectUrl === true &&
                result.metadata.url
            ) {
                hasRedirectDisplayMode = true;
                listItemElement.setAttribute('data-redirect-url', result.metadata.url);
                if (result.target) {
                    listItemElement.setAttribute('data-redirect-target', result.target);
                }
            }
            listItemElement.className = 'ds44-fg1 ds44-js-results-item';
            listItemElement.innerHTML = result.metadata.html_list;
            MiscEvent.addListener('mouseenter', this.focus.bind(this), listItemElement);
            MiscEvent.addListener('mouseleave', this.blur.bind(this), listItemElement);
            const listLinkItemElement = listItemElement.querySelector('a');
            if (listLinkItemElement) {
                MiscEvent.addListener('focus', this.focus.bind(this), listLinkItemElement);
                MiscEvent.addListener('blur', this.blur.bind(this), listLinkItemElement);
            }
            if (
                hasRedirectDisplayMode === false &&
                listContainerElement.getAttribute('data-display-mode') === 'inline'
            ) {
                MiscEvent.addListener('click', this.fillCard.bind(this), listItemElement);

                const aElement = listItemElement.querySelector('a');
                if (aElement) {
                    aElement.setAttribute('role', 'button');
                    aElement.setAttribute('tabindex', '0');
                }
            } else {
                MiscEvent.addListener('click', this.redirectCard.bind(this), listItemElement);
            }
            listElement.appendChild(listItemElement);

            if (evt.detail.addUp && isFirstResult) {
                isFirstResult = false;

                focusElement = listItemElement.querySelector('a');
                if (!focusElement) {
                    listItemElement.setAttribute('tabindex', '0');
                    focusElement = listItemElement;
                }
            }
        }

        // Add pager
        let pagerElement = listContainerElement.querySelector('.ds44-js-search-pager');
        if (
            pagerElement &&
            (
                !evt.detail.addUp ||
                evt.detail.maxNbResults ||
                nbDisplayedResults >= evt.detail.nbResults
            )
        ) {
            pagerElement.remove();
            pagerElement = null;
        }

        if (
            !evt.detail.maxNbResults &&
            nbDisplayedResults < evt.detail.nbResults
        ) {
            if (!pagerElement) {
                pagerElement = document.createElement('div');
                pagerElement.className = 'txtcenter center ds44--xl-padding-b ds44-js-search-pager';
                listContainerElement.appendChild(pagerElement);
                let pagerTitleElement = document.createElement('p');
                pagerTitleElement.setAttribute('id', 'idNbResults');
                pagerElement.appendChild(pagerTitleElement);
                let pagerButtonElement = document.createElement('button');
                pagerButtonElement.className = 'ds44-btnStd ds44-btn--invert ds44-js-search-button';
                pagerButtonElement.setAttribute('aria-describedby', 'idNbResults');
                pagerButtonElement.innerHTML = '<span class="ds44-btnInnerText">' + MiscTranslate._('MORE_RESULTS') + '</span><i class="icon icon-plus" aria-hidden="true"></i>';
                pagerElement.appendChild(pagerButtonElement);
            }

            let pagerTitleElement = pagerElement.querySelector('p');
            pagerTitleElement.innerText = nbDisplayedResults + ' ' + MiscTranslate._('SEARCH_NB_RESULTS_OUT_OF') + ' ' + evt.detail.nbResults;

            let pagerButtonElement = pagerElement.querySelector('button');
            pagerButtonElement.setAttribute('title', MiscTranslate._('MORE_SEARCH_RESULTS:') + evt.detail.searchText);
        }

        this.showList();

        if (focusElement) {
            MiscEvent.dispatch('loader:setFocus', { 'focusedElement': focusElement });
            MiscAccessibility.setFocus(focusElement);
        }

        MiscEvent.dispatch('result:created');
    }

    focus (evt = null) {
        const id = (this.currentId || (evt && evt.currentTarget.closest('.ds44-js-results-item').getAttribute('data-id')));
        if (!id) {
            return;
        }

        MiscEvent.dispatch('search:focus', { 'id': id });
    }

    blur (evt = null) {
        const id = (this.currentId || (evt && evt.currentTarget.closest('.ds44-js-results-item').getAttribute('data-id')));
        if (!id) {
            return;
        }

        MiscEvent.dispatch('search:blur', { 'id': id });
    }

    resultFocus (evt) {
        if (
            !evt ||
            !evt.detail ||
            !evt.detail.id
        ) {
            return;
        }

        const resultElement = document.querySelector('#search-result-' + evt.detail.id + ' .ds44-card');
        if (resultElement) {
            resultElement.classList.add('active');
        }
    }

    resultBlur (evt) {
        if (
            !evt ||
            !evt.detail ||
            !evt.detail.id
        ) {
            return;
        }

        const resultElement = document.querySelector('#search-result-' + evt.detail.id + ' .ds44-card');
        if (resultElement) {
            resultElement.classList.remove('active');
        }
    }

    resultSelect (evt) {
        if (
            !evt ||
            !evt.detail ||
            !evt.detail.id
        ) {
            return;
        }

        const resultElement = document.querySelector('#search-result-' + evt.detail.id);
        if (resultElement) {
            MiscEvent.dispatch('click', null, resultElement);
        }
    }
}

// Singleton
new ResultStandard();

class StatisticGtag {
    constructor () {
        MiscEvent.addListener('statistic:gtag:event', this.sendEvent.bind(this));
        document.body.addEventListener('click', this.detectClick.bind(this), true);
    }

    sendEvent (evt) {
        if (
            !evt ||
            !evt.detail ||
            !evt.detail.data ||
            !evt.detail.statistic ||
            !evt.detail.statistic.name ||
            !evt.detail.statistic.category ||
            !evt.detail.statistic.action
        ) {
            return;
        }

        const gtagEvent = {
            'event': evt.detail.statistic.name,
            'eventCategory': evt.detail.statistic.category,
            'eventAction': this.populate(evt.detail.statistic.action, evt.detail.data)
        };
        if (evt.detail.statistic.label) {
            gtagEvent.eventLabel = this.populate(evt.detail.statistic.label, evt.detail.data);
        }

        this.send(gtagEvent);
    }

    send (gtagEvent) {
        if (MiscUtils.isInDevMode() || !window.dataLayer) {
            console.log('Event gtag: ' + JSON.stringify(gtagEvent));
        } else {
            window.dataLayer.push(gtagEvent);
        }
    }

    populate (input, data) {
        const matches = input.match(/\$[a-zA-Z-_\|]+/g);
        if (!matches) {
            return input;
        }

        for (let i = 0; i < matches.length; i++) {
            const match = matches[i].replace('$', '');

            let value = null;
            if (!match.includes('|')) {
                // Simple data key
                if (data[match]) {
                    value = data[match].value;
                }
            } else {
                // Nested data key
                let nestedValue = Object.assign({}, data);
                const dataKeys = match.split('|');
                for (let j = 0; j < dataKeys.length; j++) {
                    nestedValue = nestedValue[dataKeys[j]];

                    if (typeof nestedValue === 'undefined') {
                        nestedValue = null;
                        break;
                    }
                }
                value = nestedValue;
            }

            if (
                value !== null &&
                typeof value === 'object'
            ) {
                input = input.replace('$' + match, JSON.stringify(value));
            } else {
                input = input.replace('$' + match, (value || ''));
            }
        }

        return input;
    }

    detectClick (evt) {
        if (!evt.target) {
            return;
        }

        const statisticElement = evt.target.closest('[data-statistic]:not(form)')
        if (statisticElement) {
            try {
                const statistic = JSON.parse(statisticElement.getAttribute('data-statistic'));
                const gtagEvent = {
                    'event': statistic.name,
                    'eventCategory': statistic.category,
                    'eventAction': statistic.action
                };
                if (statistic.label) {
                    gtagEvent.eventLabel = statistic.label;
                }

                this.send(gtagEvent);
            } catch (ex) {
            }
        }
    }
}

// Singleton
new StatisticGtag();

class TabStandard extends TabAbstract {
    constructor () {
        super('.js-tabs:not(.ds44-choiceYN)');
    }
}

// Singleton
new TabStandard();

class TabUtile extends TabAbstract {
    constructor () {
        super('.js-tabs.ds44-choiceYN');
    }

    getDefaultTabHandle (containerElement) {
        return null;
    }

    changeTab (tabHandleElement, tabPanelElement) {
        super.changeTab(tabHandleElement, tabPanelElement);

        tabHandleElement
            .parentElement
            .querySelectorAll('.js-tablist__link')
            .forEach((tabHandleElement) => {
                tabHandleElement.classList.remove('ds44-bgDark');
                tabHandleElement.setAttribute('aria-pressed', 'false');
            });

        tabHandleElement.classList.add('ds44-bgDark');
        tabHandleElement.setAttribute('aria-pressed', 'true');
    }

    showTabCallback (tabHandleElement, tabPanel) {
        super.showTabCallback(tabHandleElement, tabPanel);

        const href = this.getHrefFromElement(tabHandleElement);
        if (href === '#ds44-choiceY') {
            MiscAccessibility.setFocus(document.querySelector('#ds44-choiceY #form-bloc-utils-Y'));
        } else if (href === '#ds44-choiceN') {
            MiscAccessibility.setFocus(document.querySelector('#ds44-choiceN .h4-like'));
        }
    }
}

// Singleton
new TabUtile();

class TimelineStandard {
    constructor () {
        MiscEvent.addListener('load', this.start.bind(this), window);
    }

    start () {
        if (document.querySelector('[data-aos]')) {
            AOS.init();
        }
    }
}

// Singleton
new TimelineStandard();

class TooltipStandard {
    constructor () {
        this.TOOLTIP_SIMPLE = 'js-simple-tooltip';
        this.TOOLTIP_SIMPLE_CONTAINER = 'simpletooltip_container';
        this.TOOLTIP_SIMPLE_RAW = 'simpletooltip';
        this.TOOLTIP_SIMPLE_LABEL_ID = 'label_simpletooltip_';
        this.TOOLTIP_DATA_TEXT = 'data-simpletooltip-text';
        this.TOOLTIP_DATA_PREFIX_CLASS = 'data-simpletooltip-prefix-class';
        this.TOOLTIP_DATA_CONTENT_ID = 'data-simpletooltip-content-id';
        this.ATTR_DESCRIBEDBY = 'aria-describedby';
        this.ATTR_ROLE = 'role';
        this.ROLE = 'tooltip';
        this.DATA_HASH_ID = 'data-hashtooltip-id';

        // Create tooltips
        this.add();

        // Bind events
        ['mouseenter', 'focus', 'mouseleave', 'blur']
            .forEach(eventType => {
                document.body.addEventListener(eventType, this.showHide.bind(this), true);
            });
        MiscEvent.addListener('keyDown:escape', this.hideAll.bind(this));
        MiscEvent.addListener('tooltip:add', this.add.bind(this));
    }

    add () {
        document
            .querySelectorAll('button.' + this.TOOLTIP_SIMPLE + ':not([data-is-initialized="true"])')
            .forEach(this.create.bind(this));
    }

    create (element) {
        element.setAttribute('data-is-initialized', 'true');
        const hashId = Math.random().toString(32).slice(2, 12);
        const prefixClassName = MiscDom.getAttribute(element, this.TOOLTIP_DATA_PREFIX_CLASS);
        const contentId = MiscDom.getAttribute(element, this.TOOLTIP_DATA_CONTENT_ID);

        // Set tooltip attributes
        element.setAttribute(this.DATA_HASH_ID, hashId);
        element.setAttribute(this.ATTR_DESCRIBEDBY, this.TOOLTIP_SIMPLE_LABEL_ID + hashId);

        // Put the tooltip in a wrapper
        const wrapperClassName = [prefixClassName, this.TOOLTIP_SIMPLE_CONTAINER].filter(Boolean).join('-');
        const wrapper = document.createElement('span');
        MiscDom.addClasses(wrapper, wrapperClassName);
        wrapper.setAttribute(this.DATA_HASH_ID, hashId);
        element.parentNode.insertBefore(wrapper, element);
        wrapper.appendChild(element);

        // Determine the tooltip bubble content
        let content = MiscDom.getAttribute(element, this.TOOLTIP_DATA_TEXT);
        if (!content && contentId) {
            const contentFromId = document.getElementById(contentId);
            if (contentFromId) {
                content = contentFromId.innerHTML;
            }
        }

        // Create tooltip bubble
        const bubbleClassName = [prefixClassName, this.TOOLTIP_SIMPLE_RAW].filter(Boolean).join('-');
        const bubble = document.createElement('span');
        bubble.setAttribute('id', this.TOOLTIP_SIMPLE_LABEL_ID + hashId);
        MiscDom.addClasses(bubble, [bubbleClassName, this.TOOLTIP_SIMPLE]);
        bubble.setAttribute(this.ATTR_ROLE, this.ROLE);
        MiscAccessibility.hide(bubble);
        bubble.setAttribute(this.DATA_HASH_ID, hashId);
        bubble.innerHTML = content;

        wrapper.appendChild(bubble);
    }

    showHide (evt) {
        const element = evt.target;

        // Determine the tooltip button and its corresponding event types
        let tooltipButton = null;
        let showEventType = null;
        let hideEventType = null;
        if (MiscDom.hasClass(element, this.TOOLTIP_SIMPLE) === true) {
            tooltipButton = element;
            showEventType = 'focus';
            hideEventType = 'blur';
        } else if (MiscDom.hasClass(element, this.TOOLTIP_SIMPLE_CONTAINER) === true) {
            tooltipButton = element.querySelector('[' + this.ATTR_DESCRIBEDBY + ']');
            showEventType = 'mouseenter';
            hideEventType = 'mouseleave';
        }
        if (!tooltipButton) {
            return;
        }

        // Get the corresponding tooltip bubble
        const tooltipBubble = document.getElementById(MiscDom.getAttribute(tooltipButton, this.ATTR_DESCRIBEDBY));
        if (!tooltipBubble) {
            return;
        }

        if (evt.type === showEventType) {
            // Show tooltip bubble
            MiscAccessibility.show(tooltipBubble);

            // Remove positioning
            MiscDom.removeClasses(tooltipBubble, ['bottom', 'left']);
            tooltipBubble.style.width = '';

            // Determine positioning
            const tooltipBubbleOffset = MiscDom.getOffset(tooltipBubble);
            if (tooltipBubbleOffset.top < 10) {
                // Put it below if not enough room above
                MiscDom.addClasses(tooltipBubble, 'bottom');
            }
            if ((tooltipBubbleOffset.left + tooltipBubble.offsetWidth) > (window.innerWidth - 10)) {
                // Put it on the left if not enough room on the right
                MiscDom.addClasses(tooltipBubble, 'left');

                // If there's not enough room on the left hand side, crop the width
                if (tooltipBubble.offsetWidth > tooltipBubbleOffset.left) {
                    tooltipBubble.style.width = (tooltipBubbleOffset.left + 40) + 'px';
                }
            }
        } else if (evt.type === hideEventType) {
            // Hide tooltip bubble
            MiscAccessibility.hide(tooltipBubble);
        }
    }

    hideAll () {
        document
            .querySelectorAll('.' + this.TOOLTIP_SIMPLE + '.' + this.TOOLTIP_SIMPLE_RAW)
            .forEach((tooltipBubble) => {
                // Hide tooltip bubble
                MiscAccessibility.hide(tooltipBubble);
            })
    }
}

// Singleton
new TooltipStandard();

class VideoYoutube {
    constructor () {
        this.objects = [];

        let hasVideos = false;
        document
            .querySelectorAll('.ds44-js-youtube-video')
            .forEach((videoElement) => {
                hasVideos = true;
                this.create(videoElement);
            });
        document
            .querySelectorAll('.ds44-js-video-seek-to')
            .forEach((seekToElement) => {
                MiscEvent.addListener('click', this.seekTo.bind(this), seekToElement);
            });
        MiscEvent.addListener('keyPress:spacebar', this.selectSeekTo.bind(this));

        if (hasVideos) {
            window.onYouTubeIframeAPIReady = this.load.bind(this);

            const scriptElement = document.createElement('script');
            scriptElement.setAttribute('src', 'https://www.youtube.com/iframe_api');
            scriptElement.setAttribute('type', 'text/javascript');
            document.head.appendChild(scriptElement);
        }
    }

    create (videoElement) {
        const object = {
            'id': videoElement.getAttribute('data-video-id'),
            'videoElement': videoElement
        };
        this.objects.push(object);
    }

    load () {
        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];

            object.videoElement.innerHTML = '<div class="ds44-video-container"><div class="ds44-video-item"></div></div>';

            object.player = new YT.Player(object.videoElement.querySelector('.ds44-video-item'), {
                width: null,
                height: null,
                videoId: object.id
            });
        }
    }

    selectSeekTo (evt) {
        if (
            !document.activeElement ||
            !document.activeElement.closest('.ds44-js-video-seek-to')
        ) {
            return;
        }

        evt.stopPropagation();
        evt.preventDefault();

        this.seekTo({
            currentTarget: document.activeElement.closest('.ds44-js-video-seek-to')
        });
    }

    seekTo (evt) {
        if (evt.stopPropagation) {
            evt.stopPropagation();
        }
        if (evt.preventDefault) {
            evt.preventDefault();
        }

        const currentSeekToElement = document.querySelector('.ds44-js-video-seek-to[aria-current]');
        if (currentSeekToElement) {
            currentSeekToElement.removeAttribute('aria-current');
        }

        const seekToElement = evt.currentTarget;
        seekToElement.setAttribute('aria-current', 'true');
        const videoId = seekToElement.getAttribute('data-video-id');
        const seconds = seekToElement.getAttribute('data-seek-to');

        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];

            if (object.id !== videoId) {
                continue;
            }

            object.player.seekTo(seconds, true);
            object.player.playVideo();

            const playerElement = object.videoElement.querySelector('.ds44-video-item');
            MiscAccessibility.setFocus(playerElement);
            MiscUtils.scrollTo(MiscUtils.getPositionY(playerElement) - MiscDom.getHeaderHeight(true));

            break;
        }
    }
}

// Singleton
new VideoYoutube();

class FormLayoutStandard extends FormLayoutAbstract {
    constructor () {
        super('form');
    }
}

new FormLayoutStandard();
