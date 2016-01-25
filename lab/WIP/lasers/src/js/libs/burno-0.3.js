/**
 * Burno.js v0.3
 * https://github.com/brunosimon/burno.js
 *
 * Released under the MIT license
 * https://github.com/brunosimon/burno.js/blob/master/LICENSE.txt
 *
 * Date: Mon Dec 28 2015 12:14:26 GMT+0100 (CET)
 */
!function(t,e,i){"use strict";"document"in self&&("classList"in e.createElement("_")?!function(){var t=e.createElement("_");if(t.classList.add("c1","c2"),!t.classList.contains("c2")){var i=function(t){var e=DOMTokenList.prototype[t];DOMTokenList.prototype[t]=function(t){var i,n=arguments.length;for(i=0;n>i;i++)t=arguments[i],e.call(this,t)}};i("add"),i("remove")}if(t.classList.toggle("c3",!1),t.classList.contains("c3")){var n=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(t,e){return 1 in arguments&&!this.contains(t)==!e?e:n.call(this,t)}}t=null}():!function(t){if("Element"in t){var e="classList",i="prototype",n=t.Element[i],s=Object,r=String[i].trim||function(){return this.replace(/^\s+|\s+$/g,"")},o=Array[i].indexOf||function(t){for(var e=0,i=this.length;i>e;e++)if(e in this&&this[e]===t)return e;return-1},a=function(t,e){this.name=t,this.code=DOMException[t],this.message=e},l=function(t,e){if(""===e)throw new a("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(e))throw new a("INVALID_CHARACTER_ERR","String contains an invalid character");return o.call(t,e)},c=function(t){for(var e=r.call(t.getAttribute("class")||""),i=e?e.split(/\s+/):[],n=0,s=i.length;s>n;n++)this.push(i[n]);this._updateClassName=function(){t.setAttribute("class",this.toString())}},h=c[i]=[],u=function(){return new c(this)};if(a[i]=Error[i],h.item=function(t){return this[t]||null},h.contains=function(t){return t+="",-1!==l(this,t)},h.add=function(){var t,e=arguments,i=0,n=e.length,s=!1;do t=e[i]+"",-1===l(this,t)&&(this.push(t),s=!0);while(++i<n);s&&this._updateClassName()},h.remove=function(){var t,e,i=arguments,n=0,s=i.length,r=!1;do for(t=i[n]+"",e=l(this,t);-1!==e;)this.splice(e,1),r=!0,e=l(this,t);while(++n<s);r&&this._updateClassName()},h.toggle=function(t,e){t+="";var i=this.contains(t),n=i?e!==!0&&"remove":e!==!1&&"add";return n&&this[n](t),e===!0||e===!1?e:!i},h.toString=function(){return this.join(" ")},s.defineProperty){var d={get:u,enumerable:!0,configurable:!0};try{s.defineProperty(n,e,d)}catch(p){-2146823252===p.number&&(d.enumerable=!1,s.defineProperty(n,e,d))}}else s[i].__defineGetter__&&n.__defineGetter__(e,u)}}(self)),Array.prototype.forEach||(Array.prototype.forEach=function(t,e){var i,n;if(null==this)throw new TypeError(" this vaut null ou n est pas défini");var s=Object(this),r=s.length>>>0;if("function"!=typeof t)throw new TypeError(t+" n est pas une fonction");for(arguments.length>1&&(i=e),n=0;r>n;){var o;n in s&&(o=s[n],t.call(i,o,n,s)),n++}}),t.getComputedStyle||(t.getComputedStyle=function(t){return this.el=t,this.getPropertyValue=function(e){var i=/(\-([a-z]){1})/g;return"float"==e&&(e="styleFloat"),i.test(e)&&(e=e.replace(i,function(){return arguments[2].toUpperCase()})),t.currentStyle[e]?t.currentStyle[e]:null},this}),t.HTMLElement||(t.HTMLElement=t.Element),Array.prototype.indexOf||(Array.prototype.indexOf=function(t,e){var i;if(null==this)throw new TypeError('"this" is null or not defined');var n=Object(this),s=n.length>>>0;if(0===s)return-1;var r=+e||0;if(1/0===Math.abs(r)&&(r=0),r>=s)return-1;for(i=Math.max(r>=0?r:s-Math.abs(r),0);s>i;){if(i in n&&n[i]===t)return i;i++}return-1}),"function"!=typeof Object.create&&(Object.create=function(){var t=function(){};return function(e){if(arguments.length>1)throw Error("Cette prothèse ne supporte pas le second argument");if("object"!=typeof e)throw TypeError("L'argument doit être un objet");t.prototype=e;var i=new t;return t.prototype=null,i}}()),Object.keys||(Object.keys=function(){var t=Object.prototype.hasOwnProperty,e=!{toString:null}.propertyIsEnumerable("toString"),i=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],n=i.length;return function(s){if("object"!=typeof s&&("function"!=typeof s||null===s))throw new TypeError("Object.keys called on non-object");var r,o,a=[];for(r in s)t.call(s,r)&&a.push(r);if(e)for(o=0;n>o;o++)t.call(s,i[o])&&a.push(i[o]);return a}}()),function(){for(var e=0,i=["ms","moz","webkit","o"],n=0;n<i.length&&!t.requestAnimationFrame;++n)t.requestAnimationFrame=t[i[n]+"RequestAnimationFrame"],t.cancelAnimationFrame=t[i[n]+"CancelAnimationFrame"]||t[i[n]+"CancelRequestAnimationFrame"];t.requestAnimationFrame||(t.requestAnimationFrame=function(i){var n=(new Date).getTime(),s=Math.max(0,16-(n-e)),r=t.setTimeout(function(){i(n+s)},s);return e=n+s,r}),t.cancelAnimationFrame||(t.cancelAnimationFrame=function(t){clearTimeout(t)})}();var n={Core:{},Tools:{},Components:{}};n.copy=function(t){var e=null;if("undefined"==typeof t||t&&t.constructor===Object){e={};for(var i in t)e[i]=n.copy(t[i]);return e}if(t instanceof Array){e=[];for(var s=0,r=t.length;r>s;s++)e[s]=n.copy(t[s]);return e}return t},n.merge=function(t,e){for(var i in e){var s=e[i];s.constructor===Object?(t[i]||(t[i]={}),t[i]=n.merge(t[i],s)):t[i]=s}return t};var s=!1,r=/xyz/.test(function(){xyz})?/\b_super\b/:/.*/;n.Class=function(){};var o=function(t){var e=this.prototype,i={};for(var n in t)"function"==typeof t[n]&&"function"==typeof e[n]&&r.test(t[n])?(i[n]=e[n],e[n]=function(t,e){return function(){var n=this._super;this._super=i[t];var s=e.apply(this,arguments);return this._super=n,s}}(n,t[n])):e[n]=t[n]};n.Class.extend=function(t){function e(){if(!s){if(this.static_instantiate){var t=this.static_instantiate.apply(this,arguments);if(t)return t}for(var e in this)"object"==typeof this[e]&&(this[e]=n.copy(this[e]));this.construct?this.construct.apply(this,arguments):this.init&&this.init.apply(this,arguments)}return this}var i=this.prototype;s=!0;var a=new this;s=!1;for(var l in t)if("function"==typeof t[l]&&"function"==typeof i[l]&&r.test(t[l]))a[l]=function(t,e){return function(){var n=this._super;this._super=i[t];var s=e.apply(this,arguments);return this._super=n,s}}(l,t[l]);else if("options"===l){"undefined"==typeof a[l]&&(a[l]={});var c=n.copy(a[l]),h=n.copy(t[l]);a[l]=n.merge(c,h)}else a[l]=t[l];return e.prototype=a,e.prototype.constructor=e,e.extend=n.Class.extend,e.inject=o,e},n.Core.Abstract=n.Class.extend({options:{},"static":!1,construct:function(t){if("undefined"==typeof t&&(t={}),n.merge(this.options,t),this.$={},"object"!=typeof n.Statics&&(n.Statics={}),t.register&&"string"==typeof t.register){var e=new n.Tools.Registry;e.set(t.register,this)}this["static"]&&"string"==typeof this["static"]&&(n.Statics[this["static"]]=this)},static_instantiate:function(){return n.Statics&&n.Statics[this["static"]]?n.Statics[this["static"]]:null},destroy:function(){}}),n.Core.EventEmitter=n.Core.Event_Emitter=n.Core.Abstract.extend({"static":!1,options:{},construct:function(t){this._super(t),this.callbacks={},this.callbacks.base={}},on:function(t,e){var i=this;return"undefined"==typeof t||""===t?(console.warn("wrong names"),!1):"undefined"==typeof e?(console.warn("wrong callback"),!1):(t=this.resolve_names(t),t.forEach(function(t){t=i.resolve_name(t),i.callbacks[t.namespace]instanceof Object||(i.callbacks[t.namespace]={}),i.callbacks[t.namespace][t.value]instanceof Array||(i.callbacks[t.namespace][t.value]=[]),i.callbacks[t.namespace][t.value].push(e)}),this)},off:function(t){var e=this;return"undefined"==typeof t||""===t?(console.warn("wrong name"),!1):(t=this.resolve_names(t),t.forEach(function(t){if(t=e.resolve_name(t),"base"!==t.namespace&&""===t.value)delete e.callbacks[t.namespace];else if("base"===t.namespace)for(var i in e.callbacks)e.callbacks[i]instanceof Object&&e.callbacks[i][t.value]instanceof Array&&(delete e.callbacks[i][t.value],0===Object.keys(e.callbacks[i]).length&&delete e.callbacks[i]);else e.callbacks[t.namespace]instanceof Object&&e.callbacks[t.namespace][t.value]instanceof Array&&(delete e.callbacks[t.namespace][t.value],0===Object.keys(e.callbacks[t.namespace]).length&&delete e.callbacks[t.namespace])}),this)},trigger:function(t,e){if("undefined"==typeof t||""===t)return console.warn("wrong name"),!1;var i,n,s=this;if(e instanceof Array||(e=[]),t=this.resolve_names(t),t=s.resolve_name(t[0]),"base"===t.namespace)for(var r in s.callbacks)s.callbacks[r]instanceof Object&&s.callbacks[r][t.value]instanceof Array&&s.callbacks[r][t.value].forEach(function(t){n=t.apply(s,e),"undefined"==typeof i&&(i=n)});else if(this.callbacks[t.namespace]instanceof Object){if(""===t.value)return console.warn("wrong name"),this;s.callbacks[t.namespace][t.value].forEach(function(t){n=t.apply(s,e),"undefined"==typeof i&&(i=n)})}return i},trigga:function(t,e){return this.trigger(t,e)},dispatch:function(t,e){return this.trigger(t,e)},fire:function(t,e){return this.trigger(t,e)},resolve_names:function(t){return t=t.replace(/[^a-zA-Z0-9 ,\/.]/g,""),t=t.replace(/[,\/]+/g," "),t=t.split(" ")},resolve_name:function(t){var e={},i=t.split(".");return e.original=t,e.value=i[0],e.namespace="base",i.length>1&&""!==i[1]&&(e.namespace=i[1]),e}}),n.Tools.Breakpoints=n.Core.Event_Emitter.extend({"static":"breakpoints",options:{breakpoints:[]},construct:function(t){this._super(t),this.viewport=new n.Tools.Viewport,this.all={},this.actives={},this.first_test=!0,this.add(this.options.breakpoints),this.init_events()},init_events:function(){var t=this;return this.viewport.on("resize",function(){t.test()}),this},add:function(t,e){e="undefined"==typeof e?!0:!1,t instanceof Array||(t=[t]);for(var i=0;i<t.length;i++){var n=t[i];this.all[n.name]=n}return e||this.test(),this},remove:function(t,e){t instanceof Array||(t=[t]),"object"==typeof breakpoint&&"string"==typeof breakpoint.name&&(breakpoint=breakpoint.name),e="undefined"==typeof e?!1:!0;for(var i=0;i<t.length;i++)delete this.all[t[i]];return e||this.test(),this},test:function(){for(var t={},e=Object.keys(this.all),i=0,n=e.length;n>i;i++){var s=this.all[e[i]],r=!s.width,o=!s.height;r||("min"===s.width.extreme?(s.width.included&&this.viewport.width>=s.width.value||!s.width.included&&this.viewport.width>s.width.value)&&(r=!0):(s.width.included&&this.viewport.width<=s.width.value||!s.width.included&&this.viewport.width<s.width.value)&&(r=!0)),o||("min"===s.height.extreme?(s.height.included&&this.viewport.height>=s.height.value||!s.height.included&&this.viewport.height>s.height.value)&&(o=!0):(s.height.included&&this.viewport.height<=s.height.value||!s.height.included&&this.viewport.height<s.height.value)&&(o=!0)),r&&o&&(t[s.name]=s)}var a=Object.keys(t),l=Object.keys(this.actives),c=this.get_arrays_differences(a,l);return(c.length||this.first_test)&&(this.actives=t,this.first_test=!1,this.trigger("update change",[this.actives])),this},is_active:function(t){return"object"==typeof t&&"string"==typeof t.name&&(t=t.name),"undefined"!=typeof this.actives[t]},get_arrays_differences:function(t,e){for(var i=[],n=[],s=0;s<t.length;s++)i[t[s]]=!0;for(s=0;s<e.length;s++)i[e[s]]?delete i[e[s]]:i[e[s]]=!0;for(var r in i)n.push(r);return n}}),n.Tools.Colors=n.Core.Abstract.extend({"static":"colors",options:{gradients:{parse:!0,target:e.body,classes:{to_convert:"b-gradient-text",converted:"b-gradient-text-converted"}}},names:{aliceblue:"F0F8FF",antiquewhite:"FAEBD7",aqua:"00FFFF",aquamarine:"7FFFD4",azure:"F0FFFF",beige:"F5F5DC",bisque:"FFE4C4",black:"000000",blanchedalmond:"FFEBCD",blue:"0000FF",blueviolet:"8A2BE2",brown:"A52A2A",burlywood:"DEB887",cadetblue:"5F9EA0",chartreuse:"7FFF00",chocolate:"D2691E",coral:"FF7F50",cornflowerblue:"6495ED",cornsilk:"FFF8DC",crimson:"DC143C",cyan:"00FFFF",darkblue:"00008B",darkcyan:"008B8B",darkgoldenrod:"B8860B",darkgray:"A9A9A9",darkgreen:"006400",darkkhaki:"BDB76B",darkmagenta:"8B008B",darkolivegreen:"556B2F",darkorange:"FF8C00",darkorchid:"9932CC",darkred:"8B0000",darksalmon:"E9967A",darkseagreen:"8FBC8F",darkslateblue:"483D8B",darkslategray:"2F4F4F",darkturquoise:"00CED1",darkviolet:"9400D3",deeppink:"FF1493",deepskyblue:"00BFFF",dimgray:"696969",dodgerblue:"1E90FF",firebrick:"B22222",floralwhite:"FFFAF0",forestgreen:"228B22",fuchsia:"FF00FF",gainsboro:"DCDCDC",ghostwhite:"F8F8FF",gold:"FFD700",goldenrod:"DAA520",gray:"808080",green:"008000",greenyellow:"ADFF2F",honeydew:"F0FFF0",hotpink:"FF69B4",indianred:"CD5C5C",indigo:"4B0082",ivory:"FFFFF0",khaki:"F0E68C",lavender:"E6E6FA",lavenderblush:"FFF0F5",lawngreen:"7CFC00",lemonchiffon:"FFFACD",lightblue:"ADD8E6",lightcoral:"F08080",lightcyan:"E0FFFF",lightgoldenrodyellow:"FAFAD2",lightgray:"D3D3D3",lightgreen:"90EE90",lightpink:"FFB6C1",lightsalmon:"FFA07A",lightseagreen:"20B2AA",lightskyblue:"87CEFA",lightslategray:"778899",lightsteelblue:"B0C4DE",lightyellow:"FFFFE0",lime:"00FF00",limegreen:"32CD32",linen:"FAF0E6",magenta:"FF00FF",maroon:"800000",mediumaquamarine:"66CDAA",mediumblue:"0000CD",mediumorchid:"BA55D3",mediumpurple:"9370DB",mediumseagreen:"3CB371",mediumslateblue:"7B68EE",mediumspringgreen:"00FA9A",mediumturquoise:"48D1CC",mediumvioletred:"C71585",midnightblue:"191970",mintcream:"F5FFFA",mistyrose:"FFE4E1",moccasin:"FFE4B5",navajowhite:"FFDEAD",navy:"000080",oldlace:"FDF5E6",olive:"808000",olivedrab:"6B8E23",orange:"FFA500",orangered:"FF4500",orchid:"DA70D6",palegoldenrod:"EEE8AA",palegreen:"#98FB98",paleturquoise:"#AFEEEE",palevioletred:"#DB7093",papayawhip:"#FFEFD5",peachpuff:"#FFDAB9",peru:"#CD853F",pink:"#FFC0CB",plum:"#DDA0DD",powderblue:"#B0E0E6",purple:"#800080",rebeccapurple:"#663399",red:"#FF0000",rosybrown:"#BC8F8F",royalblue:"#4169E1",saddlebrown:"#8B4513",salmon:"#FA8072",sandybrown:"#F4A460",seagreen:"#2E8B57",seashell:"#FFF5EE",sienna:"#A0522D",silver:"#C0C0C0",skyblue:"#87CEEB",slateblue:"#6A5ACD",slategray:"#708090",snow:"#FFFAFA",springgreen:"#00FF7F",steelblue:"#4682B4",tan:"#D2B48C",teal:"#008080",thistle:"#D8BFD8",tomato:"#FF6347",turquoise:"#40E0D0",violet:"#EE82EE",wheat:"#F5DEB3",white:"#FFFFFF",whitesmoke:"#F5F5F5",yellow:"#FFFF00",yellowgreen:"#9ACD32"},construct:function(t){this._super(t),this.options.gradients.parse&&this.parse()},any_to_rgb:function(t){if(t=""+t,t=t.toLowerCase(),t=t.replace(/[\s-]/g,""),"undefined"!=typeof this.names[t])return this.hexa_to_rgb(this.names[t]);if(0===t.indexOf("0x"))return this.hexa_to_rgb(t.replace("0x",""));if(0===t.indexOf("#")&&(t=t.replace("#","")),6===t.length)return this.hexa_to_rgb(t);if(3===t.length){for(var e="",i=0;i<t.length;i++)e+=t[i]+t[i];return this.hexa_to_rgb(e)}try{if(t=JSON.parse(t),"undefined"!=typeof t.r&&"undefined"!=typeof t.g&&"undefined"!=typeof t.b)return t;if("undefined"!=typeof t.h&&"undefined"!=typeof t.s&&"undefined"!=typeof t.l)return this.hsl_to_rgb(t)}catch(n){}return console.warn("Wrong color value : "+t),{r:0,g:0,b:0}},parse:function(t,e){t=t||this.options.gradients.target,e=e||this.options.gradients.classes.to_convert;for(var i=this,n=t.querySelectorAll("."+e),s=0,r=n.length;r>s;s++){var o=n[s];if(!o.classList.contains(this.options.gradients.classes.converted)){var a="",l=o.textContent,c=o.getAttribute("data-gradient-start"),h=o.getAttribute("data-gradient-end"),u=null;c||(c="#47add9"),h||(h="#3554e9"),u=i.get_steps_colors(c,h,l.length,"rgb");for(var d=0,p=l.length;p>d;d++)a+='<span style="color:rgb('+u[d].r+","+u[d].g+","+u[d].b+')">'+l[d]+"</span>";o.innerHTML=a}}return this},get_steps_colors:function(t,e,i,n){("number"!=typeof i||2>i)&&(i=2),t=this.rgb_to_hsl(this.any_to_rgb(t)),e=this.rgb_to_hsl(this.any_to_rgb(e));for(var s=[],r=0,o={},a=0;i+1>a;a++)r=a/i,o.h=t.h+(e.h-t.h)*r,o.s=t.s+(e.s-t.s)*r,o.l=t.l+(e.l-t.l)*r,"rgb"===n&&(o=this.hsl_to_rgb(o)),s.push(o);return s},hexa_to_rgb:function(t){var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}},rgb_to_hsl:function(t){t.r/=255,t.g/=255,t.b/=255;var e=Math.max(t.r,t.g,t.b),i=Math.min(t.r,t.g,t.b),n={};if(n.h=(e+i)/2,n.s=(e+i)/2,n.l=(e+i)/2,e===i)n.h=0,n.s=0;else{var s=e-i;switch(n.s=n.l>.5?s/(2-e-i):s/(e+i),e){case t.r:n.h=(t.g-t.b)/s+(t.g<t.b?6:0);break;case t.g:n.h=(t.b-t.r)/s+2;break;case t.b:n.h=(t.r-t.g)/s+4}n.h/=6}return n},hsl_to_rgb:function(t){var e={};if(0===t.s)e.r=t.l,e.g=t.l,e.b=t.l;else{var i=function(t,e,i){return 0>i&&(i+=1),i>1&&(i-=1),1/6>i?t+6*(e-t)*i:.5>i?e:2/3>i?t+(e-t)*(2/3-i)*6:t},n=t.l<.5?t.l*(1+t.s):t.l+t.s-t.l*t.s,s=2*t.l-n;e.r=i(s,n,t.h+1/3),e.g=i(s,n,t.h),e.b=i(s,n,t.h-1/3)}return e.r=Math.round(255*e.r),e.g=Math.round(255*e.g),e.b=Math.round(255*e.b),e}}),n.Tools.Css=n.Core.Abstract.extend({"static":"css",options:{prefixes:["webkit","moz","o","ms",""]},construct:function(t){this._super(t),this.detector=new n.Tools.Detector,this.strings=new n.Tools.Strings},apply:function(t,e,i,n){if("undefined"!=typeof jQuery&&t instanceof jQuery&&(t=t.toArray()),"undefined"==typeof t.length&&(t=[t]),"undefined"==typeof i&&(i=!1),i===!0&&(i=this.options.prefixes),("undefined"==typeof n||n)&&(e=this.clean_style(e)),i instanceof Array){var s={};for(var r in e)for(var o in i){var a=null;a=i[o]?i[o]+(r.charAt(0).toUpperCase()+r.slice(1)):r,s[a]=e[r]}e=s}for(var l in t)if(l=t[l],l instanceof HTMLElement)for(var c in e)l.style[c]=e[c];return t},clean_style:function(t){var e={};for(var i in t){var n=t[i];e[this.clean_property(i)]=this.clean_value(n)}return e},clean_property:function(t){return t=t.replace(/(webkit|moz|o|ms)?/i,""),t=this.strings.convert_case(t,"camel")},clean_value:function(t){return 9===this.detector.browser.ie&&(/translateZ/.test(t)&&(t=t.replace(/translateZ\([^)]*\)/g,"")),/   /.test(t)&&(t=t.replace(/translate3d\(([^,]*),([^,]*),([^)])*\)/g,"translateX($1) translateY($2)"))),t}}),n.Tools.Detector=n.Core.Event_Emitter.extend({"static":"detector",options:{targets:["html"]},construct:function(t){this._super(t),this.init_detection(),this.init_classes()},init_detection:function(){var i={ie:0,gecko:0,webkit:0,khtml:0,opera:0,version:0},n={ie:0,firefox:0,safari:0,konq:0,opera:0,chrome:0,version:0},s={windows:!1,mac:!1,osx:!1,iphone:!1,ipod:!1,ipad:!1,ios:!1,blackberry:!1,android:!1,opera_mini:!1,windows_mobile:!1,wii:!1,ps:!1},r={touch:!1,media_query:!1},o=navigator.userAgent;if(t.opera)i.version=n.version=t.opera.version(),i.opera=n.opera=parseInt(i.version);else if(/AppleWebKit\/(\S+)/.test(o)||/AppleWebkit\/(\S+)/.test(o))if(i.version=RegExp.$1,i.webkit=parseInt(i.version),/Chrome\/(\S+)/.test(o))n.version=RegExp.$1,n.chrome=parseInt(n.version);else if(/Version\/(\S+)/.test(o))n.version=RegExp.$1,n.safari=parseInt(n.version);else{var a=1;a=i.webkit<100?1:i.webkit<312?1.2:i.webkit<412?1.3:2,n.safari=n.version=a}else/KHTML\/(\S+)/.test(o)||/Konqueror\/([^;]+)/.test(o)?(i.version=n.version=RegExp.$1,i.khtml=n.konq=parseInt(i.version)):/rv:([^\)]+)\) Gecko\/\d{8}/.test(o)?(i.version=RegExp.$1,i.gecko=parseInt(i.version),/Firefox\/(\S+)/.test(o)&&(n.version=RegExp.$1,n.firefox=parseInt(n.version))):/MSIE ([^;]+)/.test(o)?(i.version=n.version=RegExp.$1,i.ie=n.ie=parseInt(i.version)):/Trident.*rv[ :]*(11[\.\d]+)/.test(o)&&(i.version=n.version=RegExp.$1,i.ie=n.ie=parseInt(i.version));n.ie=i.ie,n.opera=i.opera;var l=navigator.platform;if(s.windows=!!o.match(/Win/),s.mac=!!o.match(/Mac/),s.windows&&/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(o))if("NT"===RegExp.$1)switch(RegExp.$2){case"5.0":s.windows="2000";break;case"5.1":s.windows="XP";break;case"6.0":s.windows="Vista";break;default:s.windows="NT"}else s.windows="9x"===RegExp.$1?"ME":RegExp.$1;s.nokia=!!o.match(/Nokia/i),s.kindle_fire=!!o.match(/Silk/),s.iphone=!!o.match(/iPhone/),s.ipod=!!o.match(/iPod/),s.ipad=!!o.match(/iPad/),s.blackberry=!!o.match(/BlackBerry/)||!!o.match(/BB[0-9]+/)||!!o.match(/PlayBook/),s.android=!!o.match(/Android/),s.opera_mini=!!o.match(/Opera Mini/i),s.windows_mobile=!!o.match(/IEMobile/i),s.ios=s.iphone||s.ipod||s.ipad,s.osx=!s.ios&&!!o.match(/OS X/),s.wii=o.indexOf("Wii")>-1,s.playstation=/playstation/i.test(o),r.touch=!!("ontouchstart"in t||t.DocumentTouch&&e instanceof DocumentTouch),r.media_query=!(!t.matchMedia&&!t.msMatchMedia),this.user_agent=o,this.plateform=l,this.browser=n,this.engine=i,this.system=s,this.features=r,this.categories=["engine","browser","system","features"]},init_classes:function(){if(!this.options.targets||0===this.options.targets.length)return!1;for(var t=[],i=null,n=0,s=this.options.targets.length;s>n;n++){if(i=this.options.targets[n],"string"==typeof i)switch(i){case"html":t.push(e.documentElement);break;case"body":t.push(e.body);break;default:for(var r=e.querySelectorAll(i),o=0;o<r.length;o++)t.push(r[o])}else i instanceof Element&&t.push(i);if(t.length){this.classes=[];for(var a in this)if(-1!==this.categories.indexOf(a))for(var l in this[a]){var c=this[a][l];"version"!==l&&("features"===a?this.classes.push(a+"-"+(c?"":"no-")+l):c&&(this.classes.push(a+"-"+l),"browser"===a&&this.classes.push(a+"-"+l+"-"+c)))}for(var o=0;o<t.length;o++)t[o].classList.add.apply(t[o].classList,this.classes)}}return this}}),n.Tools.GATags=n.Tools.GA_Tags=n.Core.Event_Emitter.extend({"static":"ga_tags",options:{testing:!1,send:!0,parse:!0,true_link_duration:300,target:e.body,classes:{to_tag:"b-tag",tagged:"b-tagged"},logs:{warnings:!1,send:!1}},construct:function(t){this._super(t),this.unique_sent=[],this.options.parse&&this.parse()},parse:function(e,i){function n(e){e=e||t.event;var i=this,n=i.getAttribute("data-tag-true-link"),r={};if(n=n&&-1===["0","false","nop","no"].indexOf(n.toLowerCase())?!0:!1,r.category=i.getAttribute("data-tag-category"),r.action=i.getAttribute("data-tag-action"),r.label=i.getAttribute("data-tag-label"),r.value=i.getAttribute("data-tag-value"),r.unique=i.getAttribute("data-tag-unique"),s.send(r),n){var o=i.getAttribute("href"),a=i.getAttribute("target");a||(a="_self"),"_blank"!==a&&(t.setTimeout(function(){t.open(o,a)},s.options.true_link_duration),e.preventDefault?e.preventDefault():e.returnValue=!1)}}e=e||this.options.target,i=i||this.options.classes.to_tag;for(var s=this,r=e.querySelectorAll("."+i),o=0,a=r.length;a>o;o++){var l=r[o];l.classList.contains(this.options.classes.tagged)||(l.onclick=n,l.classList.add(this.options.classes.tagged))}return this},send:function(t){var e=[],i=!1;return"object"!=typeof t?(this.options.logs.warnings&&console.warn("tag wrong datas"),!1):t.unique&&-1!==this.unique_sent.indexOf(t.unique)?(this.options.logs.warnings&&console.warn("tag prevent : "+t.unique),!1):(this.options.send&&("undefined"!=typeof t.category?(e.push(t.category),"undefined"!=typeof t.action?(e.push(t.action),"undefined"!=typeof t.label&&(e.push(t.label),"undefined"!=typeof t.value&&e.push(t.value)),"undefined"!=typeof _gaq?(_gaq.push(["_trackEvent"].concat(e)),i=!0):"undefined"!=typeof ga?(ga.apply(ga,["send","event"].concat(e)),i=!0):this.options.testing?i=!0:this.options.logs.warnings&&console.warn("tag _gaq not defined"),this.options.logs.send&&console.log("tag",e)):this.options.logs.warnings&&console.warn("tag missing action")):this.options.logs.warnings&&console.warn("tag missing category")),i&&(t.unique&&this.unique_sent.push(t.unique),this.trigger("send",[e])),this)}}),n.Tools.Keyboard=n.Core.Event_Emitter.extend({"static":"keyboard",options:{},keycode_names:{91:"cmd",17:"ctrl",32:"space",16:"shift",18:"alt",20:"caps",9:"tab",13:"enter",8:"backspace",38:"up",39:"right",40:"down",37:"left",27:"esc"},construct:function(t){this._super(t),this.downs=[],this.listen_to_events()},listen_to_events:function(){function i(e){var i=s.keycode_to_character(e.keyCode);-1===s.downs.indexOf(i)&&s.downs.push(i),s.trigger("down",[e.keyCode,i])===!1&&(e=e||t.event,e.preventDefault?e.preventDefault():e.returnValue=!1)}function n(t){var e=s.keycode_to_character(t.keyCode);-1!==s.downs.indexOf(e)&&s.downs.splice(s.downs.indexOf(e),1),s.trigger("up",[t.keyCode,e])}var s=this;return e.addEventListener?(e.addEventListener("keydown",i,!1),e.addEventListener("keyup",n,!1)):(e.attachEvent("onkeydown",i,!1),e.attachEvent("onkeyup",n,!1)),this},keycode_to_character:function(t){var e=this.keycode_names[t];return e||(e=String.fromCharCode(t).toLowerCase()),e},are_down:function(t){for(var e=!0,i=0;i<t.length;i++){var n=t[i];"number"==typeof n&&(n=this.keycode_to_character(n)),-1===this.downs.indexOf(n)&&(e=!1)}return e},is_down:function(t){return this.are_down([t])}}),n.Tools.KonamiCode=n.Tools.Konami_Code=n.Core.Event_Emitter.extend({"static":"konami_code",options:{reset_duration:1e3,sequence:["up","up","down","down","left","right","left","right","b","a"]},construct:function(t){this._super(t),this.index=0,this.timeout=null,this.keyboard=new n.Tools.Keyboard,this.listen_to_events()},listen_to_events:function(){var e=this;this.keyboard.on("down",function(i,n){e.timeout&&t.clearTimeout(e.timeout),n===e.options.sequence[e.index]?(e.index++,e.timeout=t.setTimeout(function(){e.trigger("timeout",[e.index]),e.index=0},e.options.reset_duration)):(e.index&&e.trigger("wrong",[e.index]),e.index=0),e.index>=e.options.sequence.length&&(e.trigger("used"),e.index=0,t.clearTimeout(e.timeout))})}}),n.Tools.Mouse=n.Core.Event_Emitter.extend({"static":"mouse",options:{},construct:function(t){this._super(t),this.viewport=new n.Tools.Viewport,this.down=!1,this.position={},this.position.x=0,this.position.y=0,this.position.ratio={},this.position.ratio.x=0,this.position.ratio.y=0,this.wheel={},this.wheel.delta=0,this.listen_to_events()},listen_to_events:function(){function t(t){r.down=!0,r.trigger("down",[r.position,t.target])===!1&&t.preventDefault()}function i(t){r.down=!1,r.trigger("up",[r.position,t.target])}function n(t){r.position.x=t.clientX,r.position.y=t.clientY,r.position.ratio.x=r.position.x/r.viewport.width,r.position.ratio.y=r.position.y/r.viewport.height,r.trigger("move",[r.position,t.target])}function s(t){return r.wheel.delta=t.wheelDeltaY||t.wheelDelta||-t.detail,r.trigger("wheel",[r.wheel])===!1?(t.preventDefault(),!1):void 0}var r=this;return e.addEventListener?(e.addEventListener("mousedown",t,!1),e.addEventListener("mouseup",i,!1),e.addEventListener("mousemove",n,!1),e.addEventListener("mousewheel",s,!1),e.addEventListener("DOMMouseScroll",s,!1)):(e.attachEvent("onmousedown",t,!1),e.attachEvent("onmouseup",i,!1),e.attachEvent("onmousemove",n,!1),e.attachEvent("onmousewheel",s,!1)),this}}),n.Tools.Offline=n.Core.Event_Emitter.extend({"static":"offline",options:{classes:{active:!0,target:e.body,offline:"offline",online:"online"}},construct:function(t){this._super(t),this.status=null,this.listen_to_events()},listen_to_events:function(){function i(){navigator.onLine?(n.options.classes.active&&(n.options.classes.target.classList.remove(n.options.classes.offline),n.options.classes.target.classList.add(n.options.classes.online)),n.status="online",n.trigger("online"),n.trigger("change",[n.status])):(n.options.classes.active&&(n.options.classes.target.classList.remove(n.options.classes.online),n.options.classes.target.classList.add(n.options.classes.offline)),n.status="online",n.trigger("offline"),n.trigger("change",[n.status]))}var n=this;return t.addEventListener?(t.addEventListener("online",i,!1),t.addEventListener("offline",i,!1)):(e.body.ononline=i,e.body.onoffline=i),i(),this}}),n.Tools.Registry=n.Core.Event_Emitter.extend({"static":"registry",options:{},construct:function(t){this._super(t),this.items={}},get:function(t,e){return"undefined"!=typeof this.items[t]?this.items[t]:"function"==typeof e?e.apply(this):i},set:function(t,e){return this.items[t]=e,this.trigger("update",[t,e]),e}}),n.Tools.Resizer=n.Core.Abstract.extend({"static":"resizer",options:{force_style:!0,parse:!0,target:e.body,auto_resize:!0,classes:{to_resize:"b-resize",content:"b-content"}},construct:function(t){this._super(t),this.elements=[],this.options.parse&&this.parse(),this.options.auto_resize&&this.init_auto_resize()},init_auto_resize:function(){var t=this;return this.viewport=new n.Tools.Viewport,this.viewport.on("resize",function(){t.resize_all()}),this},parse:function(t,e){t=t||this.options.target,e=e||this.options.classes.to_resize,this.elements=[];for(var i=t.querySelectorAll("."+e),n=0,s=i.length;s>n;n++){var r=i[n],o=r.querySelector("."+this.options.classes.content);o&&this.elements.push({container:r,content:o})}return this},resize_all:function(){for(var t=0,e=this.elements.length;e>t;t++){var i=this.elements[t];this.resize(i.container,i.content)}return this},resize:function(e,i,n){var s=[];if(e instanceof HTMLElement||s.push("wrong container parameter"),i instanceof HTMLElement||s.push("wrong content parameter"),s.length){for(var r=0;r<s.length;r++)console.warn(s[r]);return!1}var o={};o.container_width=e.getAttribute("data-width")||e.getAttribute("width")||e.offsetWidth,o.container_height=e.getAttribute("data-height")||e.getAttribute("height")||e.offsetHeight,o.content_width=i.getAttribute("data-width")||i.getAttribute("width")||i.offsetWidth,o.content_height=i.getAttribute("data-height")||i.getAttribute("height")||i.offsetHeight,o.fit_type=i.getAttribute("data-fit-type"),o.align_x=i.getAttribute("data-align-x"),o.align_y=i.getAttribute("data-align-y"),o.rounding=i.getAttribute("data-rounding");var a=this.get_sizes(o);if(!a)return!1;if(n="undefined"==typeof n?this.options.force_style:n){var l=t.getComputedStyle(e),c=t.getComputedStyle(i);"fixed"!==l.position&&"relative"!==l.position&&"absolute"!==l.position&&(e.style.position="relative"),"fixed"!==c.position&&"relative"!==c.position&&"absolute"!==c.position&&(i.style.position="absolute"),"hidden"!==l.overflow&&(e.style.overflow="hidden")}return i.style.top=a.css.top,i.style.left=a.css.left,i.style.width=a.css.width,i.style.height=a.css.height,this},get_sizes:function(t,e){var i=[];if(("undefined"==typeof t.content_width||0===parseInt(t.content_width,10))&&i.push("content width must be specified"),("undefined"==typeof t.content_height||0===parseInt(t.content_height,10))&&i.push("content height must be specified"),("undefined"==typeof t.container_width||0===parseInt(t.container_width,10))&&i.push("container width must be specified"),("undefined"==typeof t.container_height||0===parseInt(t.container_height,10))&&i.push("container height must be specified"),i.length)return!1;"undefined"==typeof e&&(e="both"),t.fit_type=t.fit_type||"fill",t.align_x=t.align_x||"center",t.align_y=t.align_y||"center",t.rounding=t.rounding||"ceil";var n=t.content_width/t.content_height,s=t.container_width/t.container_height,r=0,o=0,a=0,l=0,c=null;t.fit_type=t.fit_type.toLowerCase(),t.align_x=t.align_x.toLowerCase(),t.align_y=t.align_y.toLowerCase(),t.rounding=t.rounding.toLowerCase(),("undefined"==typeof t.align_x||-1===["left","center","middle","right"].indexOf(t.align_x))&&(t.align_x="center"),("undefined"==typeof t.align_y||-1===["top","center","middle","bottom"].indexOf(t.align_y))&&(t.align_y="center");var h=function(){switch(r=t.container_width,o=t.container_width/t.content_width*t.content_height,a=0,c="width",t.align_y){case"top":l=0;break;case"middle":case"center":l=(t.container_height-o)/2;break;case"bottom":l=t.container_height-o}},u=function(){switch(o=t.container_height,r=t.container_height/t.content_height*t.content_width,l=0,c="height",t.align_x){case"left":a=0;break;case"middle":case"center":a=(t.container_width-r)/2;break;case"right":a=t.container_width-r}};-1!==["fill","full","cover"].indexOf(t.fit_type)?s>n?h():u():-1!==["fit","i sits","contain"].indexOf(t.fit_type)&&(s>n?u():h()),-1!==["ceil","floor","round"].indexOf(t.rounding)&&(r=Math[t.rounding].call(this,r),o=Math[t.rounding].call(this,o),a=Math[t.rounding].call(this,a),l=Math[t.rounding].call(this,l));var d={};return d.cartesian={},d.cartesian.width=r,d.cartesian.height=o,d.cartesian.x=a,d.cartesian.y=l,d.css={},d.css.width=r+"px",d.css.height=o+"px",d.css.left=a+"px",d.css.top=l+"px",d.fit_in=c,"both"===e?d:"cartesian"===e?d.cartesian:"css"===e?d.css:void 0}}),n.Tools.Strings=n.Core.Abstract.extend({"static":"strings",options:{},cases:{camel:["camel","camelback","compoundnames"],pascal:["pascal","uppercamelcase","bumpycaps","camelcaps","capitalizedwords","capwords"],snake:["snake","underscore","plissken"],titlesnake:["titlesnake","capitalsnake"],screamingsnake:["screamingsnake","uppersnake"],dash:["dash","dashed","hyphen","kebab","spinal"],train:["train"],space:["space"],title:["title"],dot:["dot"],slash:["slash","forwardslash","path"],backslash:["backslash","hack","whack","escape","reverseslash","slosh","backslant","downhill","backwhack"],lower:["lower"],upper:["upper"],studlycaps:["studlycaps"],burno:["burno","lol","yolo"]},negatives:["0","false","nop",":(","nee","jo","naï","laa","votch","xeyir","ez","hе nie","nie","na","aïlle","ne","nann","né","ma hoke phu","hmar te","no","tla","hla","pù shi","nò","nej","ei","nei","non","nanni","ara","nein","ohi","nahániri","ʻaole","aole","lo","nahin","nem","mba","tidak","iié","ala","thay","oya","ahneo","na","bo","minime","nē","te","neen","не","he","tsia","le","kaore","ugui","yгvй","nennin","nenn","нæй","kheyr","nie","não","nu","нет","niet","ag","aiwa","nae","aï","siyo","hapana","hindi","po","aita","lla","illaï","yuk","kadhu","ไม่","maï","hayir","oevoel","ug","ні","ni","نهين","neni","nage","awa","déedéet","rara","cha"],convert_case:function(t,e){t=this.trim(t),e=e.toLowerCase(),e=e.replace(/[^[a-z]]*/g,""),e=e.replace(/case/g,"");
var i=null;for(var n in this.cases)for(var s in this.cases[n]){var r=this.cases[n][s];r===e&&(i=r)}if(!i)return t;t=t.replace(/([a-z])([A-Z])/g,"$1-$2"),t=t.toLowerCase();var o=t.split(/[-_ .\/\\]/g),a=null,l=null,c=null;switch(i){case"camel":for(l=0,c=o.length;c>l;l++)0!==l&&(o[l]=o[l].charAt(0).toUpperCase()+o[l].slice(1));a=o.join("");break;case"pascal":for(l=0,c=o.length;c>l;l++)o[l]=o[l].charAt(0).toUpperCase()+o[l].slice(1);a=o.join("");break;case"snake":a=o.join("_");break;case"titlesnake":for(l=0,c=o.length;c>l;l++)o[l]=o[l].charAt(0).toUpperCase()+o[l].slice(1);a=o.join("_");break;case"screamingsnake":a=o.join("_"),a=a.toUpperCase();break;case"dash":a=o.join("-");break;case"train":for(l=0,c=o.length;c>l;l++)o[l]=o[l].charAt(0).toUpperCase()+o[l].slice(1);a=o.join("-");break;case"space":a=o.join(" ");break;case"title":for(l=0,c=o.length;c>l;l++)o[l]=o[l].charAt(0).toUpperCase()+o[l].slice(1);a=o.join(" ");break;case"dot":a=o.join(".");break;case"slash":a=o.join("/");break;case"backslash":a=o.join("\\");break;case"lower":a=o.join("");break;case"upper":a=o.join(""),a=a.toUpperCase();break;case"studlycaps":for(a=o.join(""),l=0,c=a.length;c>l;l++)Math.random()>.5&&(a=a.substr(0,l)+a[l].toUpperCase()+a.substr(l+1));break;case"burno":for(l=0,c=o.length;c>l;l++)o[l]="burno";a=o.join(" ")}return a},to_boolean:function(t){return"undefined"==typeof t||null===t?!1:(t=""+t,t=this.trim(t),t=t.toLowerCase(),-1===this.negatives.indexOf(t))},trim:function(t,e){return"undefined"==typeof e?t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,""):(t=t.replace(new RegExp("^["+e+"]+"),""),t=t.replace(new RegExp("["+e+"]+$"),""))},to_slug:function(t){t=this.trim(t),t=t.toLowerCase();for(var e="ãàáäâẽèéëêìíïîõòóöôùúüûñç·/,:;",i="aaaaaeeeeeiiiiooooouuuunc-----",n=0,s=e.length;s>n;n++)t=t.replace(new RegExp(e.charAt(n),"g"),i.charAt(n));return t=t.replace(/[^a-z0-9 _-]/g,""),t=t.replace(/\s+/g,"-"),t=t.replace(/-+/g,"-"),t=this.trim(t,"-")},slugify:function(t){return this.to_slug(t)}}),n.Tools.Ticker=n.Core.Event_Emitter.extend({"static":"ticker",options:{auto_run:!0},construct:function(t){this._super(t),this.reseted=!1,this.running=!1,this.time={},this.time.start=0,this.time.elapsed=0,this.time.delta=0,this.time.current=0,this.waits={},this.waits.before=[],this.waits.after=[],this.intervals={},this.options.auto_run&&this.run()},reset:function(t){return this.reseted=!0,this.time.start=+new Date,this.time.current=this.time.start,this.time.elapsed=0,this.time.delta=0,t&&this.run(),this},run:function(){var e=this;if(!this.running){this.running=!0;var i=function(){e.running&&t.requestAnimationFrame(i),e.tick()};return i(),this}},stop:function(){return this.running=!1,this},tick:function(){this.reseted||this.reset(),this.time.current=+new Date,this.time.delta=this.time.current-this.time.start-this.time.elapsed,this.time.elapsed=this.time.current-this.time.start;for(var t=0,e=this.waits.before.length,i=null;e>t;t++)i=this.waits.before[t],0===--i.frames_count&&(i.action.apply(this,[this.time]),this.waits.before.splice(t,1),t--,e--);for(this.trigger("tick",[this.time]),this.trigger_intervals(),t=0,e=this.waits.after.length;e>t;t++)i=this.waits.after[t],0===--i.frames_count&&(i.action.apply(this,[this.time]),this.waits.after.splice(t,1),t--,e--);return this},wait:function(t,e,i){return"function"!=typeof e?!1:"number"!=typeof t?!1:(this.waits[i?"after":"before"].push({frames_count:t,action:e}),this)},create_interval:function(t){return this.intervals[t]={interval:t,next_trigger:t,start:this.time.elapsed,last_trigger:this.time.elapsed},this},destroy_interval:function(t){return delete this.intervals[t],this},trigger_intervals:function(){for(var t in this.intervals){var e=this.intervals[t];this.time.elapsed-e.last_trigger>e.next_trigger&&(e.next_trigger=e.interval-(this.time.elapsed-e.start)%e.interval,e.last_trigger=this.time.elapsed,this.trigger("tick-"+e.interval,[this.time,e]))}return this},on:function(t,e){var i=this,n=this.resolve_names(t);return n.forEach(function(t){if(t.match(/^tick([0-9]+)$/)){var e=parseInt(t.replace(/^tick([0-9]+)$/,"$1"));e&&i.create_interval(e)}}),this._super(t,e)},off:function(t){var e=this,i=this.resolve_names(t);return i.forEach(function(t){if(t.match(/^tick([0-9]+)$/)){var i=parseInt(t.replace(/^tick([0-9]+)$/,"$1"));i&&e.destroy_interval(i)}}),this._super(t)}}),n.Tools.Viewport=n.Core.Event_Emitter.extend({"static":"viewport",options:{disable_hover_on_scroll:!1,initial_triggers:["resize","scroll"]},construct:function(i){this._super(i),this.ticker=new n.Tools.Ticker,this.detector=new n.Tools.Detector,this.top=0,this.left=0,this.y=0,this.x=0,this.scroll={},this.scroll.delta={},this.scroll.delta.top=0,this.scroll.delta.left=0,this.scroll.delta.y=0,this.scroll.delta.x=0,this.scroll.direction={},this.scroll.direction.x=null,this.scroll.direction.y=null,this.width=t.innerWidth||e.documentElement.clientWidth||e.body.clientWidth,this.height=t.innerHeight||e.documentElement.clientHeight||e.body.clientHeight,this.pixel_ratio=t.devicePixelRatio||1,this.init_disabling_hover_on_scroll(),this.init_events()},init_events:function(){function e(){n.resize_handler()}function i(){n.scroll_handler()}var n=this;return t.addEventListener?(t.addEventListener("resize",e),t.addEventListener("scroll",i)):(t.attachEvent("onresize",e),t.attachEvent("onscroll",i)),this.options.initial_triggers.length&&this.ticker.wait(1,function(){for(var t=0;t<n.options.initial_triggers.length;t++){var e=n.options.initial_triggers[t],i=n[e+"_handler"];"function"==typeof i&&i.apply(n)}}),this},resize_handler:function(){return this.width=t.innerWidth||e.documentElement.clientWidth||e.body.clientWidth,this.height=t.innerHeight||e.documentElement.clientHeight||e.body.clientHeight,this.trigger("resize",[this.width,this.height]),this},scroll_handler:function(){var e="undefined"!=typeof t.pageYOffset?t.pageYOffset:t.document.documentElement.scrollTop,i="undefined"!=typeof t.pageXOffset?t.pageXOffset:t.document.documentElement.scrollLeft;return this.scroll.direction.y=e>this.top?"down":"up",this.scroll.direction.x=i>this.left?"right":"left",this.scroll.delta.top=e-this.top,this.scroll.delta.left=i-this.left,this.top=e,this.left=i,this.y=this.top,this.x=this.left,this.scroll.delta.y=this.scroll.delta.top,this.scroll.delta.x=this.scroll.delta.left,this.trigger("scroll",[this.top,this.left,this.scroll]),this},init_disabling_hover_on_scroll:function(){var i=this,n=null,s=!1;return this.on("scroll",function(){i.options.disable_hover_on_scroll&&(n&&t.clearTimeout(n),s||(s=!0,e.body.style.pointerEvents="none"),n=t.setTimeout(function(){s=!1,e.body.style.pointerEvents="auto"},60))}),this},match_media:function(e){return this.detector.features.media_query&&"string"==typeof e&&""!==e?!!t.matchMedia(e).matches:!1}}),"function"==typeof define&&define.amd?define(function(){return n}):"object"==typeof module&&module.exports?module.exports=n:t.Burno=t.B=n}(window,document);