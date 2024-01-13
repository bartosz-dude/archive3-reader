export const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta http-equiv="x-ua-compatible" content="ie=edge" />
<script type="text/javascript">window.NREUM||(NREUM={});NREUM.info={"beacon":"bam.nr-data.net","errorBeacon":"bam.nr-data.net","licenseKey":"f2edcff25e","applicationID":"190034","transactionName":"dgwMEkpfWVsHERpRXlQTFgNKQxpECgxC","queueTime":0,"applicationTime":71,"agent":""}</script>
<script type="text/javascript">(window.NREUM||(NREUM={})).init={privacy:{cookies_enabled:true},ajax:{deny_list:[]}};(window.NREUM||(NREUM={})).loader_config={xpid:"VQcCWV9RGwIJVFFRAw==",licenseKey:"f2edcff25e",applicationID:"190034"};;/*! For license information please see nr-loader-full-1.250.0.min.js.LICENSE.txt */
(()=>{var e,t,r={234:(e,t,r)=>{"use strict";r.d(t,{P_:()=>m,Mt:()=>b,C5:()=>s,DL:()=>A,OP:()=>D,lF:()=>j,Yu:()=>_,Dg:()=>v,CX:()=>c,GE:()=>x,sU:()=>O});var n=r(8632),i=r(9567);const a={beacon:n.ce.beacon,errorBeacon:n.ce.errorBeacon,licenseKey:void 0,applicationID:void 0,sa:void 0,queueTime:void 0,applicationTime:void 0,ttGuid:void 0,user:void 0,account:void 0,product:void 0,extra:void 0,jsAttributes:{},userAttributes:void 0,atts:void 0,transactionName:void 0,tNamePlain:void 0},o={};function s(e){if(!e)throw new Error("All info objects require an agent identifier!");if(!o[e])throw new Error("Info for ".concat(e," was never set"));return o[e]}function c(e,t){if(!e)throw new Error("All info objects require an agent identifier!");o[e]=(0,i.D)(t,a);const r=(0,n.ek)(e);r&&(r.info=o[e])}const d=e=>{if(!e||"string"!=typeof e)return!1;try{document.createDocumentFragment().querySelector(e)}catch{return!1}return!0};var u=r(7056),l=r(50);const f="[data-nr-mask]",h=()=>{const e={mask_selector:"*",block_selector:"[data-nr-block]",mask_input_options:{color:!1,date:!1,"datetime-local":!1,email:!1,month:!1,number:!1,range:!1,search:!1,tel:!1,text:!1,time:!1,url:!1,week:!1,textarea:!1,select:!1,password:!0}};return{feature_flags:[],proxy:{assets:void 0,beacon:void 0},privacy:{cookies_enabled:!0},ajax:{deny_list:void 0,block_internal:!0,enabled:!0,harvestTimeSeconds:10,autoStart:!0},distributed_tracing:{enabled:void 0,exclude_newrelic_header:void 0,cors_use_newrelic_header:void 0,cors_use_tracecontext_headers:void 0,allowed_origins:void 0},session:{domain:void 0,expiresMs:u.oD,inactiveMs:u.Hb},ssl:void 0,obfuscate:void 0,jserrors:{enabled:!0,harvestTimeSeconds:10,autoStart:!0},metrics:{enabled:!0,autoStart:!0},page_action:{enabled:!0,harvestTimeSeconds:30,autoStart:!0},page_view_event:{enabled:!0,autoStart:!0},page_view_timing:{enabled:!0,harvestTimeSeconds:30,long_task:!1,autoStart:!0},session_trace:{enabled:!0,harvestTimeSeconds:10,autoStart:!0},harvest:{tooManyRequestsDelay:60},session_replay:{autoStart:!0,enabled:!1,harvestTimeSeconds:60,sampling_rate:50,error_sampling_rate:50,collect_fonts:!1,inline_images:!1,inline_stylesheet:!0,mask_all_inputs:!0,get mask_text_selector(){return e.mask_selector},set mask_text_selector(t){d(t)?e.mask_selector="".concat(t,",").concat(f):""===t||null===t?e.mask_selector=f:(0,l.Z)("An invalid session_replay.mask_selector was provided. '*' will be used.",t)},get block_class(){return"nr-block"},get ignore_class(){return"nr-ignore"},get mask_text_class(){return"nr-mask"},get block_selector(){return e.block_selector},set block_selector(t){d(t)?e.block_selector+=",".concat(t):""!==t&&(0,l.Z)("An invalid session_replay.block_selector was provided and will not be used",t)},get mask_input_options(){return e.mask_input_options},set mask_input_options(t){t&&"object"==typeof t?e.mask_input_options={...t,password:!0}:(0,l.Z)("An invalid session_replay.mask_input_option was provided and will not be used",t)}},spa:{enabled:!0,harvestTimeSeconds:10,autoStart:!0}}},p={},g="All configuration objects require an agent identifier!";function m(e){if(!e)throw new Error(g);if(!p[e])throw new Error("Configuration for ".concat(e," was never set"));return p[e]}function v(e,t){if(!e)throw new Error(g);p[e]=(0,i.D)(t,h());const r=(0,n.ek)(e);r&&(r.init=p[e])}function b(e,t){if(!e)throw new Error(g);var r=m(e);if(r){for(var n=t.split("."),i=0;i<n.length-1;i++)if("object"!=typeof(r=r[n[i]]))return;r=r[n[n.length-1]]}return r}const y={accountID:void 0,trustKey:void 0,agentID:void 0,licenseKey:void 0,applicationID:void 0,xpid:void 0},w={};function A(e){if(!e)throw new Error("All loader-config objects require an agent identifier!");if(!w[e])throw new Error("LoaderConfig for ".concat(e," was never set"));return w[e]}function x(e,t){if(!e)throw new Error("All loader-config objects require an agent identifier!");w[e]=(0,i.D)(t,y);const r=(0,n.ek)(e);r&&(r.loader_config=w[e])}const _=(0,n.mF)().o;var E=r(385),S=r(6818);const T={buildEnv:S.Re,customTransaction:void 0,disabled:!1,distMethod:S.gF,isolatedBacklog:!1,loaderType:void 0,maxBytes:3e4,offset:Math.floor(E._A?.performance?.timeOrigin||E._A?.performance?.timing?.navigationStart||Date.now()),onerror:void 0,origin:""+E._A.location,ptid:void 0,releaseIds:{},session:void 0,xhrWrappable:"function"==typeof E._A.XMLHttpRequest?.prototype?.addEventListener,version:S.q4,denyList:void 0},R={};function D(e){if(!e)throw new Error("All runtime objects require an agent identifier!");if(!R[e])throw new Error("Runtime for ".concat(e," was never set"));return R[e]}function O(e,t){if(!e)throw new Error("All runtime objects require an agent identifier!");R[e]=(0,i.D)(t,T);const r=(0,n.ek)(e);r&&(r.runtime=R[e])}function j(e){return function(e){try{const t=s(e);return!!t.licenseKey&&!!t.errorBeacon&&!!t.applicationID}catch(e){return!1}}(e)}},9567:(e,t,r)=>{"use strict";r.d(t,{D:()=>i});var n=r(50);function i(e,t){try{if(!e||"object"!=typeof e)return(0,n.Z)("Setting a Configurable requires an object as input");if(!t||"object"!=typeof t)return(0,n.Z)("Setting a Configurable requires a model to set its initial properties");const r=Object.create(Object.getPrototypeOf(t),Object.getOwnPropertyDescriptors(t)),a=0===Object.keys(r).length?e:r;for(let o in a)if(void 0!==e[o])try{Array.isArray(e[o])&&Array.isArray(t[o])?r[o]=Array.from(new Set([...e[o],...t[o]])):"object"==typeof e[o]&&"object"==typeof t[o]?r[o]=i(e[o],t[o]):r[o]=e[o]}catch(e){(0,n.Z)("An error occurred while setting a property of a Configurable",e)}return r}catch(e){(0,n.Z)("An error occured while setting a Configurable",e)}}},6818:(e,t,r)=>{"use strict";r.d(t,{Re:()=>i,gF:()=>a,lF:()=>o,q4:()=>n});const n="1.250.0",i="PROD",a="CDN",o="2.0.0-alpha.11"},385:(e,t,r)=>{"use strict";r.d(t,{FN:()=>s,IF:()=>u,Nk:()=>f,Tt:()=>c,_A:()=>a,cv:()=>h,iS:()=>o,il:()=>n,ux:()=>d,v6:()=>i,w1:()=>l});const n="undefined"!=typeof window&&!!window.document,i="undefined"!=typeof WorkerGlobalScope&&("undefined"!=typeof self&&self instanceof WorkerGlobalScope&&self.navigator instanceof WorkerNavigator||"undefined"!=typeof globalThis&&globalThis instanceof WorkerGlobalScope&&globalThis.navigator instanceof WorkerNavigator),a=n?window:"undefined"!=typeof WorkerGlobalScope&&("undefined"!=typeof self&&self instanceof WorkerGlobalScope&&self||"undefined"!=typeof globalThis&&globalThis instanceof WorkerGlobalScope&&globalThis),o=(a?.document?.readyState,Boolean("hidden"===a?.document?.visibilityState)),s=""+a?.location,c=/iPad|iPhone|iPod/.test(a.navigator?.userAgent),d=c&&"undefined"==typeof SharedWorker,u=(()=>{const e=a.navigator?.userAgent?.match(/Firefox[/\s](\d+\.\d+)/);return Array.isArray(e)&&e.length>=2?+e[1]:0})(),l=Boolean(n&&window.document.documentMode),f=!!a.navigator?.sendBeacon,h=Math.floor(a?.performance?.timeOrigin||a?.performance?.timing?.navigationStart||Date.now())},1117:(e,t,r)=>{"use strict";r.d(t,{w:()=>a});var n=r(50);const i={agentIdentifier:"",ee:void 0};class a{constructor(e){try{if("object"!=typeof e)return(0,n.Z)("shared context requires an object as input");this.sharedContext={},Object.assign(this.sharedContext,i),Object.entries(e).forEach((e=>{let[t,r]=e;Object.keys(i).includes(t)&&(this.sharedContext[t]=r)}))}catch(e){(0,n.Z)("An error occured while setting SharedContext",e)}}}},8e3:(e,t,r)=>{"use strict";r.d(t,{L:()=>u,R:()=>c});var n=r(8325),i=r(1284),a=r(4322),o=r(3325);const s={};function c(e,t){const r={staged:!1,priority:o.p[t]||0};d(e),s[e].get(t)||s[e].set(t,r)}function d(e){e&&(s[e]||(s[e]=new Map))}function u(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"feature";if(d(e),!e||!s[e].get(t))return o(t);s[e].get(t).staged=!0;const r=[...s[e]];function o(t){const r=e?n.ee.get(e):n.ee,o=a.X.handlers;if(r.backlog&&o){var s=r.backlog[t],c=o[t];if(c){for(var d=0;s&&d<s.length;++d)l(s[d],c);(0,i.D)(c,(function(e,t){(0,i.D)(t,(function(t,r){r[0].on(e,r[1])}))}))}delete o[t],r.backlog[t]=null,r.emit("drain-"+t,[])}}r.every((e=>{let[t,r]=e;return r.staged}))&&(r.sort(((e,t)=>e[1].priority-t[1].priority)),r.forEach((t=>{let[r]=t;s[e].delete(r),o(r)})))}function l(e,t){var r=e[1];(0,i.D)(t[r],(function(t,r){var n=e[0];if(r[0]===n){var i=r[1],a=e[3],o=e[2];i.apply(a,o)}}))}},8325:(e,t,r)=>{"use strict";r.d(t,{A:()=>c,ee:()=>d});var n=r(8632),i=r(2210),a=r(234);class o{constructor(e){this.contextId=e}}var s=r(3117);const c="nr@context:".concat(s.a),d=function e(t,r){var n={},s={},u={},f=!1;try{f=16===r.length&&(0,a.OP)(r).isolatedBacklog}catch(e){}var h={on:g,addEventListener:g,removeEventListener:function(e,t){var r=n[e];if(!r)return;for(var i=0;i<r.length;i++)r[i]===t&&r.splice(i,1)},emit:function(e,r,n,i,a){!1!==a&&(a=!0);if(d.aborted&&!i)return;t&&a&&t.emit(e,r,n);for(var o=p(n),c=m(e),u=c.length,l=0;l<u;l++)c[l].apply(o,r);var f=b()[s[e]];f&&f.push([h,e,r,o]);return o},get:v,listeners:m,context:p,buffer:function(e,t){const r=b();if(t=t||"feature",h.aborted)return;Object.entries(e||{}).forEach((e=>{let[n,i]=e;s[i]=t,t in r||(r[t]=[])}))},abort:l,aborted:!1,isBuffering:function(e){return!!b()[s[e]]},debugId:r,backlog:f?{}:t&&"object"==typeof t.backlog?t.backlog:{}};return h;function p(e){return e&&e instanceof o?e:e?(0,i.X)(e,c,(()=>new o(c))):new o(c)}function g(e,t){n[e]=m(e).concat(t)}function m(e){return n[e]||[]}function v(t){return u[t]=u[t]||e(h,t)}function b(){return h.backlog}}(void 0,"globalEE"),u=(0,n.fP)();function l(){d.aborted=!0,d.backlog={}}u.ee||(u.ee=d)},5546:(e,t,r)=>{"use strict";r.d(t,{E:()=>n,p:()=>i});var n=r(8325).ee.get("handle");function i(e,t,r,i,a){a?(a.buffer([e],i),a.emit(e,t,r)):(n.buffer([e],i),n.emit(e,t,r))}},4322:(e,t,r)=>{"use strict";r.d(t,{X:()=>a});var n=r(5546);a.on=o;var i=a.handlers={};function a(e,t,r,a){o(a||n.E,i,e,t,r)}function o(e,t,r,i,a){a||(a="feature"),e||(e=n.E);var o=t[a]=t[a]||{};(o[r]=o[r]||[]).push([e,i])}},3239:(e,t,r)=>{"use strict";r.d(t,{bP:()=>s,iz:()=>c,m$:()=>o});var n=r(385);let i=!1,a=!1;try{const e={get passive(){return i=!0,!1},get signal(){return a=!0,!1}};n._A.addEventListener("test",null,e),n._A.removeEventListener("test",null,e)}catch(e){}function o(e,t){return i||a?{capture:!!e,passive:i,signal:t}:!!e}function s(e,t){let r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=arguments.length>3?arguments[3]:void 0;window.addEventListener(e,t,o(r,n))}function c(e,t){let r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=arguments.length>3?arguments[3]:void 0;document.addEventListener(e,t,o(r,n))}},3117:(e,t,r)=>{"use strict";r.d(t,{a:()=>n});const n=(0,r(4402).Rl)()},4402:(e,t,r)=>{"use strict";r.d(t,{Ht:()=>d,M:()=>c,Rl:()=>o,ky:()=>s});var n=r(385);const i="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";function a(e,t){return e?15&e[t]:16*Math.random()|0}function o(){const e=n._A?.crypto||n._A?.msCrypto;let t,r=0;return e&&e.getRandomValues&&(t=e.getRandomValues(new Uint8Array(30))),i.split("").map((e=>"x"===e?a(t,r++).toString(16):"y"===e?(3&a()|8).toString(16):e)).join("")}function s(e){const t=n._A?.crypto||n._A?.msCrypto;let r,i=0;t&&t.getRandomValues&&(r=t.getRandomValues(new Uint8Array(e)));const o=[];for(var s=0;s<e;s++)o.push(a(r,i++).toString(16));return o.join("")}function c(){return s(16)}function d(){return s(32)}},7056:(e,t,r)=>{"use strict";r.d(t,{Bq:()=>n,Hb:()=>a,IK:()=>c,oD:()=>i,uT:()=>s,wO:()=>o});const n="NRBA",i=144e5,a=18e5,o={PAUSE:"session-pause",RESET:"session-reset",RESUME:"session-resume",UPDATE:"session-update"},s={SAME_TAB:"same-tab",CROSS_TAB:"cross-tab"},c={OFF:0,FULL:1,ERROR:2}},7894:(e,t,r)=>{"use strict";function n(){return Math.round(performance.now())}r.d(t,{z:()=>n})},7243:(e,t,r)=>{"use strict";r.d(t,{e:()=>i});var n=r(385);function i(e){if(0===(e||"").indexOf("data:"))return{protocol:"data"};try{const t=new URL(e,location.href),r={port:t.port,hostname:t.hostname,pathname:t.pathname,search:t.search,protocol:t.protocol.slice(0,t.protocol.indexOf(":")),sameOrigin:t.protocol===n._A?.location?.protocol&&t.host===n._A?.location?.host};return r.port&&""!==r.port||("http:"===t.protocol&&(r.port="80"),"https:"===t.protocol&&(r.port="443")),r.pathname&&""!==r.pathname?r.pathname.startsWith("/")||(r.pathname="/".concat(r.pathname)):r.pathname="/",r}catch(e){return{}}}},50:(e,t,r)=>{"use strict";function n(e,t){"function"==typeof console.warn&&(console.warn("New Relic: ".concat(e)),t&&console.warn(t))}r.d(t,{Z:()=>n})},2825:(e,t,r)=>{"use strict";r.d(t,{N:()=>u,T:()=>l});var n=r(8325),i=r(5546),a=r(3325),o=r(385);const s="newrelic";const c={stn:[a.D.sessionTrace],err:[a.D.jserrors,a.D.metrics],ins:[a.D.pageAction],spa:[a.D.spa],sr:[a.D.sessionReplay,a.D.sessionTrace]},d=new Set;function u(e,t){const r=n.ee.get(t);e&&"object"==typeof e&&(d.has(t)||(Object.entries(e).forEach((e=>{let[t,n]=e;c[t]?c[t].forEach((e=>{n?(0,i.p)("feat-"+t,[],void 0,e,r):(0,i.p)("block-"+t,[],void 0,e,r),(0,i.p)("rumresp-"+t,[Boolean(n)],void 0,e,r)})):n&&(0,i.p)("feat-"+t,[],void 0,void 0,r),l[t]=Boolean(n)})),Object.keys(c).forEach((e=>{void 0===l[e]&&(c[e]?.forEach((t=>(0,i.p)("rumresp-"+e,[!1],void 0,t,r))),l[e]=!1)})),d.add(t),function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};try{o._A.dispatchEvent(new CustomEvent(s,{detail:e}))}catch(e){}}({loaded:!0})))}const l={}},2210:(e,t,r)=>{"use strict";r.d(t,{X:()=>i});var n=Object.prototype.hasOwnProperty;function i(e,t,r){if(n.call(e,t))return e[t];var i=r();if(Object.defineProperty&&Object.keys)try{return Object.defineProperty(e,t,{value:i,writable:!0,enumerable:!1}),i}catch(e){}return e[t]=i,i}},1284:(e,t,r)=>{"use strict";r.d(t,{D:()=>n});const n=(e,t)=>Object.entries(e||{}).map((e=>{let[r,n]=e;return t(r,n)}))},4351:(e,t,r)=>{"use strict";r.d(t,{P:()=>a});var n=r(8325);const i=()=>{const e=new WeakSet;return(t,r)=>{if("object"==typeof r&&null!==r){if(e.has(r))return;e.add(r)}return r}};function a(e){try{return JSON.stringify(e,i())}catch(e){try{n.ee.emit("internal-error",[e])}catch(e){}}}},3960:(e,t,r)=>{"use strict";r.d(t,{KB:()=>o,b2:()=>a});var n=r(3239);function i(){return"undefined"==typeof document||"complete"===document.readyState}function a(e,t){if(i())return e();(0,n.bP)("load",e,t)}function o(e){if(i())return e();(0,n.iz)("DOMContentLoaded",e)}},8632:(e,t,r)=>{"use strict";r.d(t,{EZ:()=>u,ce:()=>a,ek:()=>d,fP:()=>o,gG:()=>l,h5:()=>c,mF:()=>s});var n=r(7894),i=r(385);const a={beacon:"bam.nr-data.net",errorBeacon:"bam.nr-data.net"};function o(){return i._A.NREUM||(i._A.NREUM={}),void 0===i._A.newrelic&&(i._A.newrelic=i._A.NREUM),i._A.NREUM}function s(){let e=o();return e.o||(e.o={ST:i._A.setTimeout,SI:i._A.setImmediate,CT:i._A.clearTimeout,XHR:i._A.XMLHttpRequest,REQ:i._A.Request,EV:i._A.Event,PR:i._A.Promise,MO:i._A.MutationObserver,FETCH:i._A.fetch}),e}function c(e,t){let r=o();r.initializedAgents??={},t.initializedAt={ms:(0,n.z)(),date:new Date},r.initializedAgents[e]=t}function d(e){let t=o();return t.initializedAgents?.[e]}function u(e,t){o()[e]=t}function l(){return function(){let e=o();const t=e.info||{};e.info={beacon:a.beacon,errorBeacon:a.errorBeacon,...t}}(),function(){let e=o();const t=e.init||{};e.init={...t}}(),s(),function(){let e=o();const t=e.loader_config||{};e.loader_config={...t}}(),o()}},7956:(e,t,r)=>{"use strict";r.d(t,{N:()=>i});var n=r(3239);function i(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=arguments.length>2?arguments[2]:void 0,i=arguments.length>3?arguments[3]:void 0;(0,n.iz)("visibilitychange",(function(){if(t)return void("hidden"===document.visibilityState&&e());e(document.visibilityState)}),r,i)}},1214:(e,t,r)=>{"use strict";r.d(t,{em:()=>b,u5:()=>R,QU:()=>j,Kf:()=>k});var n=r(8325),i=r(3117);const a="nr@original:".concat(i.a);var o=Object.prototype.hasOwnProperty,s=!1;function c(e,t){return e||(e=n.ee),r.inPlace=function(e,t,n,i,a){n||(n="");const o="-"===n.charAt(0);for(let s=0;s<t.length;s++){const c=t[s],d=e[c];u(d)||(e[c]=r(d,o?c+n:n,i,c,a))}},r.flag=a,r;function r(t,r,n,s,c){return u(t)?t:(r||(r=""),nrWrapper[a]=t,function(e,t,r){if(Object.defineProperty&&Object.keys)try{return Object.keys(e).forEach((function(r){Object.defineProperty(t,r,{get:function(){return e[r]},set:function(t){return e[r]=t,t}})})),t}catch(e){d([e],r)}for(var n in e)o.call(e,n)&&(t[n]=e[n])}(t,nrWrapper,e),nrWrapper);function nrWrapper(){var a,o,u,l;try{o=this,a=[...arguments],u="function"==typeof n?n(a,o):n||{}}catch(t){d([t,"",[a,o,s],u],e)}i(r+"start",[a,o,s],u,c);try{return l=t.apply(o,a)}catch(e){throw i(r+"err",[a,o,e],u,c),e}finally{i(r+"end",[a,o,l],u,c)}}}function i(r,n,i,a){if(!s||t){var o=s;s=!0;try{e.emit(r,n,i,t,a)}catch(t){d([t,r,n,i],e)}s=o}}}function d(e,t){t||(t=n.ee);try{t.emit("internal-error",e)}catch(e){}}function u(e){return!(e&&"function"==typeof e&&e.apply&&!e[a])}var l=r(2210),f=r(385);const h={},p=f._A.XMLHttpRequest,g="addEventListener",m="removeEventListener",v="nr@wrapped:".concat(n.A);function b(e){var t=function(e){return(e||n.ee).get("events")}(e);if(h[t.debugId]++)return t;h[t.debugId]=1;var r=c(t,!0);function i(e){r.inPlace(e,[g,m],"-",a)}function a(e,t){return e[1]}return"getPrototypeOf"in Object&&(f.il&&y(document,i),y(f._A,i),y(p.prototype,i)),t.on(g+"-start",(function(e,t){var n=e[1];if(null!==n&&("function"==typeof n||"object"==typeof n)){var i=(0,l.X)(n,v,(function(){var e={object:function(){if("function"!=typeof n.handleEvent)return;return n.handleEvent.apply(n,arguments)},function:n}[typeof n];return e?r(e,"fn-",null,e.name||"anonymous"):n}));this.wrapped=e[1]=i}})),t.on(m+"-start",(function(e){e[1]=this.wrapped||e[1]})),t}function y(e,t){let r=e;for(;"object"==typeof r&&!Object.prototype.hasOwnProperty.call(r,g);)r=Object.getPrototypeOf(r);for(var n=arguments.length,i=new Array(n>2?n-2:0),a=2;a<n;a++)i[a-2]=arguments[a];r&&t(r,...i)}var w="fetch-",A=w+"body-",x=["arrayBuffer","blob","json","text","formData"],_=f._A.Request,E=f._A.Response,S="prototype";const T={};function R(e){const t=function(e){return(e||n.ee).get("fetch")}(e);if(!(_&&E&&f._A.fetch))return t;if(T[t.debugId]++)return t;function r(e,r,i){var a=e[r];"function"==typeof a&&(e[r]=function(){var e,r=[...arguments],o={};t.emit(i+"before-start",[r],o),o[n.A]&&o[n.A].dt&&(e=o[n.A].dt);var s=a.apply(this,r);return t.emit(i+"start",[r,e],s),s.then((function(e){return t.emit(i+"end",[null,e],s),e}),(function(e){throw t.emit(i+"end",[e],s),e}))})}return T[t.debugId]=1,x.forEach((e=>{r(_[S],e,A),r(E[S],e,A)})),r(f._A,"fetch",w),t.on(w+"end",(function(e,r){var n=this;if(r){var i=r.headers.get("content-length");null!==i&&(n.rxSize=i),t.emit(w+"done",[null,r],n)}else t.emit(w+"done",[e],n)})),t}const D={},O=["pushState","replaceState"];function j(e){const t=function(e){return(e||n.ee).get("history")}(e);return!f.il||D[t.debugId]++||(D[t.debugId]=1,c(t).inPlace(window.history,O,"-")),t}var C=r(3239);var I=r(50);const P={},N=["open","send"];function k(e){var t=e||n.ee;const r=function(e){return(e||n.ee).get("xhr")}(t);if(P[r.debugId]++)return r;P[r.debugId]=1,b(t);var i=c(r),a=f._A.XMLHttpRequest,o=f._A.MutationObserver,s=f._A.Promise,d=f._A.setInterval,u="readystatechange",l=["onload","onerror","onabort","onloadstart","onloadend","onprogress","ontimeout"],h=[],p=f._A.XMLHttpRequest=function(e){const t=new a(e),n=r.context(t);try{r.emit("new-xhr",[t],n),t.addEventListener(u,(o=n,function(){var e=this;e.readyState>3&&!o.resolved&&(o.resolved=!0,r.emit("xhr-resolved",[],e)),i.inPlace(e,l,"fn-",A)}),(0,C.m$)(!1))}catch(e){(0,I.Z)("An error occurred while intercepting XHR",e);try{r.emit("internal-error",[e])}catch(e){}}var o;return t};function g(e,t){i.inPlace(t,["onreadystatechange"],"fn-",A)}if(function(e,t){for(var r in e)t[r]=e[r]}(a,p),p.prototype=a.prototype,i.inPlace(p.prototype,N,"-xhr-",A),r.on("send-xhr-start",(function(e,t){g(e,t),function(e){h.push(e),o&&(m?m.then(w):d?d(w):(v=-v,y.data=v))}(t)})),r.on("open-xhr-start",g),o){var m=s&&s.resolve();if(!d&&!s){var v=1,y=document.createTextNode(v);new o(w).observe(y,{characterData:!0})}}else t.on("fn-end",(function(e){e[0]&&e[0].type===u||w()}));function w(){for(var e=0;e<h.length;e++)g(0,h[e]);h.length&&(h=[])}function A(e,t){return t}return r}},7825:(e,t,r)=>{"use strict";r.d(t,{t:()=>n});const n=r(3325).D.ajax},6660:(e,t,r)=>{"use strict";r.d(t,{t:()=>n});const n=r(3325).D.jserrors},3081:(e,t,r)=>{"use strict";r.d(t,{gF:()=>a,mY:()=>i,t9:()=>n,vz:()=>s,xS:()=>o});const n=r(3325).D.metrics,i="sm",a="cm",o="storeSupportabilityMetrics",s="storeEventMetrics"},4649:(e,t,r)=>{"use strict";r.d(t,{t:()=>n});const n=r(3325).D.pageAction},7633:(e,t,r)=>{"use strict";r.d(t,{t:()=>n});const n=r(3325).D.pageViewEvent},9251:(e,t,r)=>{"use strict";r.d(t,{t:()=>n});const n=r(3325).D.pageViewTiming},7144:(e,t,r)=>{"use strict";r.d(t,{J0:()=>l,Mi:()=>u,Vb:()=>a,Ye:()=>s,fm:()=>c,i9:()=>o,t9:()=>i,u0:()=>d});var n=r(7056);const i=r(3325).D.sessionReplay,a=.12,o={DomContentLoaded:0,Load:1,FullSnapshot:2,IncrementalSnapshot:3,Meta:4,Custom:5},s=1e6,c=64e3,d={[n.IK.ERROR]:15e3,[n.IK.FULL]:3e5,[n.IK.OFF]:0},u={RESET:{message:"Session was reset",sm:"Reset"},IMPORT:{message:"Recorder failed to import",sm:"Import"},TOO_MANY:{message:"429: Too Many Requests",sm:"Too-Many"},TOO_BIG:{message:"Payload was too large",sm:"Too-Big"},CROSS_TAB:{message:"Session Entity was set to OFF on another tab",sm:"Cross-Tab"},ENTITLEMENTS:{message:"Session Replay is not allowed and will not be started",sm:"Entitlement"}},l=5e3},3614:(e,t,r)=>{"use strict";r.d(t,{BST_RESOURCE:()=>i,END:()=>s,FEATURE_NAME:()=>n,FN_END:()=>d,FN_START:()=>c,PUSH_STATE:()=>u,RESOURCE:()=>a,START:()=>o});const n=r(3325).D.sessionTrace,i="bstResource",a="resource",o="-start",s="-end",c="fn"+o,d="fn"+s,u="pushState"},5938:(e,t,r)=>{"use strict";r.d(t,{W:()=>i});var n=r(8325);class i{constructor(e,t,r){this.agentIdentifier=e,this.aggregator=t,this.ee=n.ee.get(e),this.featureName=r,this.blocked=!1}}},7530:(e,t,r)=>{"use strict";r.d(t,{j:()=>b});var n=r(3325),i=r(234),a=r(5546),o=r(8325),s=r(7894),c=r(8e3),d=r(3960),u=r(385),l=r(50),f=r(3081),h=r(8632);function p(){const e=(0,h.gG)();["setErrorHandler","finished","addToTrace","addRelease","addPageAction","setCurrentRouteName","setPageViewName","setCustomAttribute","interaction","noticeError","setUserId","setApplicationVersion","start","recordReplay","pauseReplay"].forEach((t=>{e[t]=function(){for(var r=arguments.length,n=new Array(r),i=0;i<r;i++)n[i]=arguments[i];return function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),i=1;i<r;i++)n[i-1]=arguments[i];let a=[];return Object.values(e.initializedAgents).forEach((e=>{e.exposed&&e.api[t]&&a.push(e.api[t](...n))})),a.length>1?a:a[0]}(t,...n)}}))}var g=r(2825);const m=e=>{const t=e.startsWith("http");e+="/",r.p=t?e:"https://"+e};let v=!1;function b(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},b=arguments.length>2?arguments[2]:void 0,y=arguments.length>3?arguments[3]:void 0,{init:w,info:A,loader_config:x,runtime:_={loaderType:b},exposed:E=!0}=t;const S=(0,h.gG)();A||(w=S.init,A=S.info,x=S.loader_config),(0,i.Dg)(e.agentIdentifier,w||{}),(0,i.GE)(e.agentIdentifier,x||{}),A.jsAttributes??={},u.v6&&(A.jsAttributes.isWorker=!0),(0,i.CX)(e.agentIdentifier,A);const T=(0,i.P_)(e.agentIdentifier),R=[A.beacon,A.errorBeacon];v||(T.proxy.assets&&(m(T.proxy.assets),R.push(T.proxy.assets)),T.proxy.beacon&&R.push(T.proxy.beacon),p(),(0,h.EZ)("activatedFeatures",g.T)),_.denyList=[...T.ajax.deny_list||[],...T.ajax.block_internal?R:[]],(0,i.sU)(e.agentIdentifier,_),void 0===e.api&&(e.api=function(e,t){t||(0,c.R)(e,"api");const h={};var p=o.ee.get(e),g=p.get("tracer"),m="api-",v=m+"ixn-";function b(t,r,n,a){const o=(0,i.C5)(e);return null===r?delete o.jsAttributes[t]:(0,i.CX)(e,{...o,jsAttributes:{...o.jsAttributes,[t]:r}}),A(m,n,!0,a||null===r?"session":void 0)(t,r)}function y(){}["setErrorHandler","finished","addToTrace","addRelease"].forEach((e=>{h[e]=A(m,e,!0,"api")})),h.addPageAction=A(m,"addPageAction",!0,n.D.pageAction),h.setCurrentRouteName=A(m,"routeName",!0,n.D.spa),h.setPageViewName=function(t,r){if("string"==typeof t)return"/"!==t.charAt(0)&&(t="/"+t),(0,i.OP)(e).customTransaction=(r||"http://custom.transaction")+t,A(m,"setPageViewName",!0)()},h.setCustomAttribute=function(e,t){let r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if("string"==typeof e){if(["string","number","boolean"].includes(typeof t)||null===t)return b(e,t,"setCustomAttribute",r);(0,l.Z)("Failed to execute setCustomAttribute.\nNon-null value must be a string, number or boolean type, but a type of <".concat(typeof t,"> was provided."))}else(0,l.Z)("Failed to execute setCustomAttribute.\nName must be a string type, but a type of <".concat(typeof e,"> was provided."))},h.setUserId=function(e){if("string"==typeof e||null===e)return b("enduser.id",e,"setUserId",!0);(0,l.Z)("Failed to execute setUserId.\nNon-null value must be a string type, but a type of <".concat(typeof e,"> was provided."))},h.setApplicationVersion=function(e){if("string"==typeof e||null===e)return b("application.version",e,"setApplicationVersion",!1);(0,l.Z)("Failed to execute setApplicationVersion. Expected <String | null>, but got <".concat(typeof e,">."))},h.start=e=>{try{const t=e?"defined":"undefined";(0,a.p)(f.xS,["API/start/".concat(t,"/called")],void 0,n.D.metrics,p);const r=Object.values(n.D);if(void 0===e)e=r;else{if((e=Array.isArray(e)&&e.length?e:[e]).some((e=>!r.includes(e))))return(0,l.Z)("Invalid feature name supplied. Acceptable feature names are: ".concat(r));e.includes(n.D.pageViewEvent)||e.push(n.D.pageViewEvent)}e.forEach((e=>{p.emit("".concat(e,"-opt-in"))}))}catch(e){(0,l.Z)("An unexpected issue occurred",e)}},h.recordReplay=function(){(0,a.p)(f.xS,["API/recordReplay/called"],void 0,n.D.metrics,p),(0,a.p)("recordReplay",[],void 0,n.D.sessionReplay,p)},h.pauseReplay=function(){(0,a.p)(f.xS,["API/pauseReplay/called"],void 0,n.D.metrics,p),(0,a.p)("pauseReplay",[],void 0,n.D.sessionReplay,p)},h.interaction=function(){return(new y).get()};var w=y.prototype={createTracer:function(e,t){var r={},i=this,o="function"==typeof t;return(0,a.p)(f.xS,["API/createTracer/called"],void 0,n.D.metrics,p),(0,a.p)(v+"tracer",[(0,s.z)(),e,r],i,n.D.spa,p),function(){if(g.emit((o?"":"no-")+"fn-start",[(0,s.z)(),i,o],r),o)try{return t.apply(this,arguments)}catch(e){throw g.emit("fn-err",[arguments,this,e],r),e}finally{g.emit("fn-end",[(0,s.z)()],r)}}}};function A(e,t,r,i){return function(){return(0,a.p)(f.xS,["API/"+t+"/called"],void 0,n.D.metrics,p),i&&(0,a.p)(e+t,[(0,s.z)(),...arguments],r?null:this,i,p),r?void 0:this}}function x(){r.e(63).then(r.bind(r,7438)).then((t=>{let{setAPI:r}=t;r(e),(0,c.L)(e,"api")})).catch((()=>(0,l.Z)("Downloading runtime APIs failed...")))}return["actionText","setName","setAttribute","save","ignore","onEnd","getContext","end","get"].forEach((e=>{w[e]=A(v,e,void 0,n.D.spa)})),h.noticeError=function(e,t){"string"==typeof e&&(e=new Error(e)),(0,a.p)(f.xS,["API/noticeError/called"],void 0,n.D.metrics,p),(0,a.p)("err",[e,(0,s.z)(),!1,t],void 0,n.D.jserrors,p)},u.il?(0,d.b2)((()=>x()),!0):x(),h}(e.agentIdentifier,y)),void 0===e.exposed&&(e.exposed=E),v=!0}},1926:(e,t,r)=>{r.nc=(()=>{try{return document?.currentScript?.nonce}catch(e){}return""})()},3325:(e,t,r)=>{"use strict";r.d(t,{D:()=>n,p:()=>i});const n={ajax:"ajax",jserrors:"jserrors",metrics:"metrics",pageAction:"page_action",pageViewEvent:"page_view_event",pageViewTiming:"page_view_timing",sessionReplay:"session_replay",sessionTrace:"session_trace",spa:"spa"},i={[n.pageViewEvent]:1,[n.pageViewTiming]:2,[n.metrics]:3,[n.jserrors]:4,[n.ajax]:5,[n.sessionTrace]:6,[n.pageAction]:7,[n.spa]:8,[n.sessionReplay]:9}}},n={};function i(e){var t=n[e];if(void 0!==t)return t.exports;var a=n[e]={exports:{}};return r[e](a,a.exports,i),a.exports}i.m=r,i.d=(e,t)=>{for(var r in t)i.o(t,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},i.f={},i.e=e=>Promise.all(Object.keys(i.f).reduce(((t,r)=>(i.f[r](e,t),t)),[])),i.u=e=>({63:"nr-full",110:"nr-full-compressor",379:"nr-full-recorder"}[e]+"-1.250.0.min.js"),i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e={},t="NRBA-1.250.0.PROD:",i.l=(r,n,a,o)=>{if(e[r])e[r].push(n);else{var s,c;if(void 0!==a)for(var d=document.getElementsByTagName("script"),u=0;u<d.length;u++){var l=d[u];if(l.getAttribute("src")==r||l.getAttribute("data-webpack")==t+a){s=l;break}}if(!s){c=!0;var f={63:"sha512-w/WPpy8ZNdbjKl3hC3VdS9Hk7rcFd+cEc6y5LHuYq3KQSqxGwoRF1mg0WPiDileN8AKmGBqe6HfngWRROsi45w==",379:"sha512-A08GLez68D2274D5HLGvzmqbWgxrHFI0zL1A91gHtXeFlGtjs0uo7qcvZ+5p9LlRMdW4JQEj+iKsugtIqZMAIA==",110:"sha512-IX+NT/7FG0dnSAPzHkh44th0zeDQlHnCZzREzFH6JPrlAIeEQIZvCxNpJxeH0XVZcTeQblyJQED0IHrccAmTkA=="};(s=document.createElement("script")).charset="utf-8",s.timeout=120,i.nc&&s.setAttribute("nonce",i.nc),s.setAttribute("data-webpack",t+a),s.src=r,0!==s.src.indexOf(window.location.origin+"/")&&(s.crossOrigin="anonymous"),f[o]&&(s.integrity=f[o])}e[r]=[n];var h=(t,n)=>{s.onerror=s.onload=null,clearTimeout(p);var i=e[r];if(delete e[r],s.parentNode&&s.parentNode.removeChild(s),i&&i.forEach((e=>e(n))),t)return t(n)},p=setTimeout(h.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=h.bind(null,s.onerror),s.onload=h.bind(null,s.onload),c&&document.head.appendChild(s)}},i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.p="https://js-agent.newrelic.com/",(()=>{var e={29:0,789:0};i.f.j=(t,r)=>{var n=i.o(e,t)?e[t]:void 0;if(0!==n)if(n)r.push(n[2]);else{var a=new Promise(((r,i)=>n=e[t]=[r,i]));r.push(n[2]=a);var o=i.p+i.u(t),s=new Error;i.l(o,(r=>{if(i.o(e,t)&&(0!==(n=e[t])&&(e[t]=void 0),n)){var a=r&&("load"===r.type?"missing":r.type),o=r&&r.target&&r.target.src;s.message="Loading chunk "+t+" failed.\n("+a+": "+o+")",s.name="ChunkLoadError",s.type=a,s.request=o,n[1](s)}}),"chunk-"+t,t)}};var t=(t,r)=>{var n,a,[o,s,c]=r,d=0;if(o.some((t=>0!==e[t]))){for(n in s)i.o(s,n)&&(i.m[n]=s[n]);if(c)c(i)}for(t&&t(r);d<o.length;d++)a=o[d],i.o(e,a)&&e[a]&&e[a][0](),e[a]=0},r=self["webpackChunk:NRBA-1.250.0.PROD"]=self["webpackChunk:NRBA-1.250.0.PROD"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})(),(()=>{"use strict";i(1926);var e=i(50);class t{#e(e){return"Call to agent api ".concat(e," failed. The agent is not currently initialized.")}addPageAction(t,r){(0,e.Z)(this.#e("addPageAction"))}setPageViewName(t,r){(0,e.Z)(this.#e("setPageViewName"))}setCustomAttribute(t,r,n){(0,e.Z)(this.#e("setCustomAttribute"))}noticeError(t,r){(0,e.Z)(this.#e("noticeError"))}setUserId(t){(0,e.Z)(this.#e("setUserId"))}setApplicationVersion(t){(0,e.Z)(this.#e("setApplicationVersion"))}setErrorHandler(t){(0,e.Z)(this.#e("setErrorHandler"))}finished(t){(0,e.Z)(this.#e("finished"))}addRelease(t,r){(0,e.Z)(this.#e("addRelease"))}start(t){(0,e.Z)(this.#e("start"))}recordReplay(){(0,e.Z)(this.#e("recordReplay"))}pauseReplay(){(0,e.Z)(this.#e("pauseReplay"))}}var r=i(3325),n=i(234);const a=Object.values(r.D);function o(e){const t={};return a.forEach((r=>{t[r]=function(e,t){return!1!==(0,n.Mt)(t,"".concat(e,".enabled"))}(r,e)})),t}var s=i(7530);var c=i(8e3),d=i(5938),u=i(3960),l=i(385);class f extends d.W{constructor(e,t,r){let i=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];super(e,t,r),this.auto=i,this.abortHandler=void 0,this.featAggregate=void 0,this.onAggregateImported=void 0,!1===(0,n.Mt)(this.agentIdentifier,"".concat(this.featureName,".autoStart"))&&(this.auto=!1),this.auto&&(0,c.R)(e,r)}importAggregator(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(this.featAggregate)return;if(!this.auto)return void this.ee.on("".concat(this.featureName,"-opt-in"),(()=>{(0,c.R)(this.agentIdentifier,this.featureName),this.auto=!0,this.importAggregator()}));const r=l.il&&!0===(0,n.Mt)(this.agentIdentifier,"privacy.cookies_enabled");let a;this.onAggregateImported=new Promise((e=>{a=e}));const o=async()=>{let n;try{if(r){const{setupAgentSession:e}=await i.e(63).then(i.bind(i,1656));n=e(this.agentIdentifier)}}catch(t){(0,e.Z)("A problem occurred when starting up session manager. This page will not start or extend any session.",t)}try{if(!this.shouldImportAgg(this.featureName,n))return(0,c.L)(this.agentIdentifier,this.featureName),void a(!1);const{lazyFeatureLoader:e}=await i.e(63).then(i.bind(i,8582)),{Aggregate:r}=await e(this.featureName,"aggregate");this.featAggregate=new r(this.agentIdentifier,this.aggregator,t),a(!0)}catch(t){(0,e.Z)("Downloading and initializing ".concat(this.featureName," failed..."),t),this.abortHandler?.(),(0,c.L)(this.agentIdentifier,this.featureName),a(!1)}};l.il?(0,u.b2)((()=>o()),!0):o()}shouldImportAgg(e,t){return e!==r.D.sessionReplay||!!n.Yu.MO&&(!1!==(0,n.Mt)(this.agentIdentifier,"session_trace.enabled")&&(!!t?.isNew||!!t?.state.sessionReplayMode))}}var h=i(7633);class p extends f{static featureName=h.t;constructor(e,t){let r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];super(e,t,h.t,r),this.importAggregator()}}var g=i(1117),m=i(1284);class v extends g.w{constructor(e){super(e),this.aggregatedData={}}store(e,t,r,n,i){var a=this.getBucket(e,t,r,i);return a.metrics=function(e,t){t||(t={count:0});return t.count+=1,(0,m.D)(e,(function(e,r){t[e]=b(r,t[e])})),t}(n,a.metrics),a}merge(e,t,r,n,i){var a=this.getBucket(e,t,n,i);if(a.metrics){var o=a.metrics;o.count+=r.count,(0,m.D)(r,(function(e,t){if("count"!==e){var n=o[e],i=r[e];i&&!i.c?o[e]=b(i.t,n):o[e]=function(e,t){if(!t)return e;t.c||(t=y(t.t));return t.min=Math.min(e.min,t.min),t.max=Math.max(e.max,t.max),t.t+=e.t,t.sos+=e.sos,t.c+=e.c,t}(i,o[e])}}))}else a.metrics=r}storeMetric(e,t,r,n){var i=this.getBucket(e,t,r);return i.stats=b(n,i.stats),i}getBucket(e,t,r,n){this.aggregatedData[e]||(this.aggregatedData[e]={});var i=this.aggregatedData[e][t];return i||(i=this.aggregatedData[e][t]={params:r||{}},n&&(i.custom=n)),i}get(e,t){return t?this.aggregatedData[e]&&this.aggregatedData[e][t]:this.aggregatedData[e]}take(e){for(var t={},r="",n=!1,i=0;i<e.length;i++)t[r=e[i]]=w(this.aggregatedData[r]),t[r].length&&(n=!0),delete this.aggregatedData[r];return n?t:null}}function b(e,t){return null==e?function(e){e?e.c++:e={c:1};return e}(t):t?(t.c||(t=y(t.t)),t.c+=1,t.t+=e,t.sos+=e*e,e>t.max&&(t.max=e),e<t.min&&(t.min=e),t):{t:e}}function y(e){return{t:e,min:e,max:e,sos:e*e,c:1}}function w(e){return"object"!=typeof e?[]:(0,m.D)(e,A)}function A(e,t){return t}var x=i(8632),_=i(4402),E=i(4351);var S=i(5546),T=i(7956),R=i(3239),D=i(7894),O=i(9251);class j extends f{static featureName=O.t;constructor(e,t){let r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];super(e,t,O.t,r),l.il&&((0,T.N)((()=>(0,S.p)("docHidden",[(0,D.z)()],void 0,O.t,this.ee)),!0),(0,R.bP)("pagehide",(()=>(0,S.p)("winPagehide",[(0,D.z)()],void 0,O.t,this.ee))),this.importAggregator())}}var C=i(3081);class I extends f{static featureName=C.t9;constructor(e,t){let r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];super(e,t,C.t9,r),this.importAggregator()}}var P=i(6660);class N{constructor(e,t,r,n){this.name="UncaughtError",this.message=e,this.sourceURL=t,this.line=r,this.column=n}}class k extends f{static featureName=P.t;#t=new Set;constructor(e,t){let n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];super(e,t,P.t,n);try{this.removeOnAbort=new AbortController}catch(e){}this.ee.on("fn-err",((e,t,n)=>{this.abortHandler&&!this.#t.has(n)&&(this.#t.add(n),(0,S.p)("err",[this.#r(n),(0,D.z)()],void 0,r.D.jserrors,this.ee))})),this.ee.on("internal-error",(e=>{this.abortHandler&&(0,S.p)("ierr",[this.#r(e),(0,D.z)(),!0],void 0,r.D.jserrors,this.ee)})),l._A.addEventListener("unhandledrejection",(e=>{this.abortHandler&&(0,S.p)("err",[this.#n(e),(0,D.z)(),!1,{unhandledPromiseRejection:1}],void 0,r.D.jserrors,this.ee)}),(0,R.m$)(!1,this.removeOnAbort?.signal)),l._A.addEventListener("error",(e=>{this.abortHandler&&(this.#t.has(e.error)?this.#t.delete(e.error):(0,S.p)("err",[this.#i(e),(0,D.z)()],void 0,r.D.jserrors,this.ee))}),(0,R.m$)(!1,this.removeOnAbort?.signal)),this.abortHandler=this.#a,this.importAggregator()}#a(){this.removeOnAbort?.abort(),this.#t.clear(),this.abortHandler=void 0}#r(e){return e instanceof Error?e:void 0!==e?.message?new N(e.message,e.filename||e.sourceURL,e.lineno||e.line,e.colno||e.col):new N("string"==typeof e?e:(0,E.P)(e))}#n(e){let t="Unhandled Promise Rejection: ";if(e?.reason instanceof Error)try{return e.reason.message=t+e.reason.message,e.reason}catch(t){return e.reason}if(void 0===e.reason)return new N(t);const r=this.#r(e.reason);return r.message=t+r.message,r}#i(e){return e.error instanceof Error?e.error:new N(e.message,e.filename,e.lineno,e.colno)}}var H=i(2210);let M=1;const z="nr@id";function L(e){const t=typeof e;return!e||"object"!==t&&"function"!==t?-1:e===l._A?0:(0,H.X)(e,z,(function(){return M++}))}function F(e){if("string"==typeof e&&e.length)return e.length;if("object"==typeof e){if("undefined"!=typeof ArrayBuffer&&e instanceof ArrayBuffer&&e.byteLength)return e.byteLength;if("undefined"!=typeof Blob&&e instanceof Blob&&e.size)return e.size;if(!("undefined"!=typeof FormData&&e instanceof FormData))try{return(0,E.P)(e).length}catch(e){return}}}var B=i(1214),U=i(7243);class Z{constructor(e){this.agentIdentifier=e}generateTracePayload(e){if(!this.shouldGenerateTrace(e))return null;var t=(0,n.DL)(this.agentIdentifier);if(!t)return null;var r=(t.accountID||"").toString()||null,i=(t.agentID||"").toString()||null,a=(t.trustKey||"").toString()||null;if(!r||!i)return null;var o=(0,_.M)(),s=(0,_.Ht)(),c=Date.now(),d={spanId:o,traceId:s,timestamp:c};return(e.sameOrigin||this.isAllowedOrigin(e)&&this.useTraceContextHeadersForCors())&&(d.traceContextParentHeader=this.generateTraceContextParentHeader(o,s),d.traceContextStateHeader=this.generateTraceContextStateHeader(o,c,r,i,a)),(e.sameOrigin&&!this.excludeNewrelicHeader()||!e.sameOrigin&&this.isAllowedOrigin(e)&&this.useNewrelicHeaderForCors())&&(d.newrelicHeader=this.generateTraceHeader(o,s,c,r,i,a)),d}generateTraceContextParentHeader(e,t){return"00-"+t+"-"+e+"-01"}generateTraceContextStateHeader(e,t,r,n,i){return i+"@nr=0-1-"+r+"-"+n+"-"+e+"----"+t}generateTraceHeader(e,t,r,n,i,a){if(!("function"==typeof l._A?.btoa))return null;var o={v:[0,1],d:{ty:"Browser",ac:n,ap:i,id:e,tr:t,ti:r}};return a&&n!==a&&(o.d.tk=a),btoa((0,E.P)(o))}shouldGenerateTrace(e){return this.isDtEnabled()&&this.isAllowedOrigin(e)}isAllowedOrigin(e){var t=!1,r={};if((0,n.Mt)(this.agentIdentifier,"distributed_tracing")&&(r=(0,n.P_)(this.agentIdentifier).distributed_tracing),e.sameOrigin)t=!0;else if(r.allowed_origins instanceof Array)for(var i=0;i<r.allowed_origins.length;i++){var a=(0,U.e)(r.allowed_origins[i]);if(e.hostname===a.hostname&&e.protocol===a.protocol&&e.port===a.port){t=!0;break}}return t}isDtEnabled(){var e=(0,n.Mt)(this.agentIdentifier,"distributed_tracing");return!!e&&!!e.enabled}excludeNewrelicHeader(){var e=(0,n.Mt)(this.agentIdentifier,"distributed_tracing");return!!e&&!!e.exclude_newrelic_header}useNewrelicHeaderForCors(){var e=(0,n.Mt)(this.agentIdentifier,"distributed_tracing");return!!e&&!1!==e.cors_use_newrelic_header}useTraceContextHeadersForCors(){var e=(0,n.Mt)(this.agentIdentifier,"distributed_tracing");return!!e&&!!e.cors_use_tracecontext_headers}}var q=i(7825),V=["load","error","abort","timeout"],G=V.length,W=n.Yu.REQ,X=n.Yu.XHR;class K extends f{static featureName=q.t;constructor(e,t){let i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];if(super(e,t,q.t,i),(0,n.OP)(e).xhrWrappable){this.dt=new Z(e),this.handler=(e,t,r,n)=>(0,S.p)(e,t,r,n,this.ee);try{const e={xmlhttprequest:"xhr",fetch:"fetch",beacon:"beacon"};l._A?.performance?.getEntriesByType("resource").forEach((t=>{if(t.initiatorType in e&&0!==t.responseStatus){const n={status:t.responseStatus},i={rxSize:t.transferSize,duration:Math.floor(t.duration),cbTime:0};Y(n,t.name),this.handler("xhr",[n,i,t.startTime,t.responseEnd,e[t.initiatorType]],void 0,r.D.ajax)}}))}catch(e){}(0,B.u5)(this.ee),(0,B.Kf)(this.ee),function(e,t,i,a){function o(e){var t=this;t.totalCbs=0,t.called=0,t.cbTime=0,t.end=x,t.ended=!1,t.xhrGuids={},t.lastSize=null,t.loadCaptureCalled=!1,t.params=this.params||{},t.metrics=this.metrics||{},e.addEventListener("load",(function(r){_(t,e)}),(0,R.m$)(!1)),l.IF||e.addEventListener("progress",(function(e){t.lastSize=e.loaded}),(0,R.m$)(!1))}function s(e){this.params={method:e[0]},Y(this,e[1]),this.metrics={}}function c(t,r){var i=(0,n.DL)(e);i.xpid&&this.sameOrigin&&r.setRequestHeader("X-NewRelic-ID",i.xpid);var o=a.generateTracePayload(this.parsedOrigin);if(o){var s=!1;o.newrelicHeader&&(r.setRequestHeader("newrelic",o.newrelicHeader),s=!0),o.traceContextParentHeader&&(r.setRequestHeader("traceparent",o.traceContextParentHeader),o.traceContextStateHeader&&r.setRequestHeader("tracestate",o.traceContextStateHeader),s=!0),s&&(this.dt=o)}}function d(e,r){var n=this.metrics,i=e[0],a=this;if(n&&i){var o=F(i);o&&(n.txSize=o)}this.startTime=(0,D.z)(),this.body=i,this.listener=function(e){try{"abort"!==e.type||a.loadCaptureCalled||(a.params.aborted=!0),("load"!==e.type||a.called===a.totalCbs&&(a.onloadCalled||"function"!=typeof r.onload)&&"function"==typeof a.end)&&a.end(r)}catch(e){try{t.emit("internal-error",[e])}catch(e){}}};for(var s=0;s<G;s++)r.addEventListener(V[s],this.listener,(0,R.m$)(!1))}function u(e,t,r){this.cbTime+=e,t?this.onloadCalled=!0:this.called+=1,this.called!==this.totalCbs||!this.onloadCalled&&"function"==typeof r.onload||"function"!=typeof this.end||this.end(r)}function f(e,t){var r=""+L(e)+!!t;this.xhrGuids&&!this.xhrGuids[r]&&(this.xhrGuids[r]=!0,this.totalCbs+=1)}function h(e,t){var r=""+L(e)+!!t;this.xhrGuids&&this.xhrGuids[r]&&(delete this.xhrGuids[r],this.totalCbs-=1)}function p(){this.endTime=(0,D.z)()}function g(e,r){r instanceof X&&"load"===e[0]&&t.emit("xhr-load-added",[e[1],e[2]],r)}function m(e,r){r instanceof X&&"load"===e[0]&&t.emit("xhr-load-removed",[e[1],e[2]],r)}function v(e,t,r){t instanceof X&&("onload"===r&&(this.onload=!0),("load"===(e[0]&&e[0].type)||this.onload)&&(this.xhrCbStart=(0,D.z)()))}function b(e,r){this.xhrCbStart&&t.emit("xhr-cb-time",[(0,D.z)()-this.xhrCbStart,this.onload,r],r)}function y(e){var t,r=e[1]||{};if("string"==typeof e[0]?0===(t=e[0]).length&&l.il&&(t=""+l._A.location.href):e[0]&&e[0].url?t=e[0].url:l._A?.URL&&e[0]&&e[0]instanceof URL?t=e[0].href:"function"==typeof e[0].toString&&(t=e[0].toString()),"string"==typeof t&&0!==t.length){t&&(this.parsedOrigin=(0,U.e)(t),this.sameOrigin=this.parsedOrigin.sameOrigin);var n=a.generateTracePayload(this.parsedOrigin);if(n&&(n.newrelicHeader||n.traceContextParentHeader))if(e[0]&&e[0].headers)s(e[0].headers,n)&&(this.dt=n);else{var i={};for(var o in r)i[o]=r[o];i.headers=new Headers(r.headers||{}),s(i.headers,n)&&(this.dt=n),e.length>1?e[1]=i:e.push(i)}}function s(e,t){var r=!1;return t.newrelicHeader&&(e.set("newrelic",t.newrelicHeader),r=!0),t.traceContextParentHeader&&(e.set("traceparent",t.traceContextParentHeader),t.traceContextStateHeader&&e.set("tracestate",t.traceContextStateHeader),r=!0),r}}function w(e,t){this.params={},this.metrics={},this.startTime=(0,D.z)(),this.dt=t,e.length>=1&&(this.target=e[0]),e.length>=2&&(this.opts=e[1]);var r,n=this.opts||{},i=this.target;"string"==typeof i?r=i:"object"==typeof i&&i instanceof W?r=i.url:l._A?.URL&&"object"==typeof i&&i instanceof URL&&(r=i.href),Y(this,r);var a=(""+(i&&i instanceof W&&i.method||n.method||"GET")).toUpperCase();this.params.method=a,this.body=n.body,this.txSize=F(n.body)||0}function A(e,t){var n;this.endTime=(0,D.z)(),this.params||(this.params={}),this.params.status=t?t.status:0,"string"==typeof this.rxSize&&this.rxSize.length>0&&(n=+this.rxSize);var a={txSize:this.txSize,rxSize:n,duration:(0,D.z)()-this.startTime};i("xhr",[this.params,a,this.startTime,this.endTime,"fetch"],this,r.D.ajax)}function x(e){var t=this.params,n=this.metrics;if(!this.ended){this.ended=!0;for(var a=0;a<G;a++)e.removeEventListener(V[a],this.listener,!1);t.aborted||(n.duration=(0,D.z)()-this.startTime,this.loadCaptureCalled||4!==e.readyState?null==t.status&&(t.status=0):_(this,e),n.cbTime=this.cbTime,i("xhr",[t,n,this.startTime,this.endTime,"xhr"],this,r.D.ajax))}}function _(e,t){e.params.status=t.status;var r=function(e,t){var r=e.responseType;return"json"===r&&null!==t?t:"arraybuffer"===r||"blob"===r||"json"===r?F(e.response):"text"===r||""===r||void 0===r?F(e.responseText):void 0}(t,e.lastSize);if(r&&(e.metrics.rxSize=r),e.sameOrigin){var n=t.getResponseHeader("X-NewRelic-App-Data");n&&(e.params.cat=n.split(", ").pop())}e.loadCaptureCalled=!0}t.on("new-xhr",o),t.on("open-xhr-start",s),t.on("open-xhr-end",c),t.on("send-xhr-start",d),t.on("xhr-cb-time",u),t.on("xhr-load-added",f),t.on("xhr-load-removed",h),t.on("xhr-resolved",p),t.on("addEventListener-end",g),t.on("removeEventListener-end",m),t.on("fn-end",b),t.on("fetch-before-start",y),t.on("fetch-start",w),t.on("fn-start",v),t.on("fetch-done",A)}(e,this.ee,this.handler,this.dt),this.importAggregator()}}}function Y(e,t){var r=(0,U.e)(t),n=e.params||e;n.hostname=r.hostname,n.port=r.port,n.protocol=r.protocol,n.host=r.hostname+":"+r.port,n.pathname=r.pathname,e.parsedOrigin=r,e.sameOrigin=r.sameOrigin}var Q=i(3614);const{BST_RESOURCE:J,RESOURCE:ee,START:te,END:re,FEATURE_NAME:ne,FN_END:ie,FN_START:ae,PUSH_STATE:oe}=Q;var se=i(7056),ce=i(7144);class de extends f{static featureName=ce.t9;constructor(e,t){let r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];super(e,t,ce.t9,r);try{const e=JSON.parse(localStorage.getItem("NRBA_SESSION"));e.sessionReplayMode!==se.IK.OFF?this.#o(e.sessionReplayMode):this.importAggregator({})}catch(e){this.importAggregator({})}}async#o(e){const{Recorder:t}=await i.e(379).then(i.bind(i,4136));this.recorder=new t({mode:e,agentIdentifier:this.agentIdentifier}),this.recorder.startRecording(),this.importAggregator({recorder:this.recorder})}}var ue=i(4649);class le extends f{static featureName=ue.t;constructor(e,t){let r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];super(e,t,ue.t,r),this.importAggregator()}}new class extends t{constructor(t){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:(0,_.ky)(16);super(),l._A?(this.agentIdentifier=r,this.sharedAggregator=new v({agentIdentifier:this.agentIdentifier}),this.features={},(0,x.h5)(r,this),this.desiredFeatures=new Set(t.features||[]),this.desiredFeatures.add(p),(0,s.j)(this,t,t.loaderType||"agent"),this.run()):(0,e.Z)("Failed to initial the agent. Could not determine the runtime environment.")}get config(){return{info:(0,n.C5)(this.agentIdentifier),init:(0,n.P_)(this.agentIdentifier),loader_config:(0,n.DL)(this.agentIdentifier),runtime:(0,n.OP)(this.agentIdentifier)}}run(){try{const t=o(this.agentIdentifier),n=[...this.desiredFeatures];n.sort(((e,t)=>r.p[e.featureName]-r.p[t.featureName])),n.forEach((n=>{if(t[n.featureName]||n.featureName===r.D.pageViewEvent){const i=function(e){switch(e){case r.D.ajax:return[r.D.jserrors];case r.D.sessionTrace:return[r.D.ajax,r.D.pageViewEvent];case r.D.sessionReplay:return[r.D.sessionTrace];case r.D.pageViewTiming:return[r.D.pageViewEvent];default:return[]}}(n.featureName);i.every((e=>t[e]))||(0,e.Z)("".concat(n.featureName," is enabled but one or more dependent features has been disabled (").concat((0,E.P)(i),"). This may cause unintended consequences or missing data...")),this.features[n.featureName]=new n(this.agentIdentifier,this.sharedAggregator)}}))}catch(t){(0,e.Z)("Failed to initialize all enabled instrument classes (agent aborted) -",t);for(const e in this.features)this.features[e].abortHandler?.();const r=(0,x.fP)();return delete r.initializedAgents[this.agentIdentifier]?.api,delete r.initializedAgents[this.agentIdentifier]?.features,delete this.sharedAggregator,r.ee?.abort(),delete r.ee?.get(this.agentIdentifier),!1}}addToTrace(t){(0,e.Z)("Call to agent api addToTrace failed. The session trace feature is not currently initialized.")}setCurrentRouteName(t){(0,e.Z)("Call to agent api setCurrentRouteName failed. The spa feature is not currently initialized.")}interaction(){(0,e.Z)("Call to agent api interaction failed. The spa feature is not currently initialized.")}}({features:[p,j,class extends f{static featureName=ne;constructor(e,t){if(super(e,t,ne,!(arguments.length>2&&void 0!==arguments[2])||arguments[2]),!l.il)return;const n=this.ee;let i;(0,B.QU)(n),this.eventsEE=(0,B.em)(n),this.eventsEE.on(ae,(function(e,t){this.bstStart=(0,D.z)()})),this.eventsEE.on(ie,(function(e,t){(0,S.p)("bst",[e[0],t,this.bstStart,(0,D.z)()],void 0,r.D.sessionTrace,n)})),n.on(oe+te,(function(e){this.time=(0,D.z)(),this.startPath=location.pathname+location.hash})),n.on(oe+re,(function(e){(0,S.p)("bstHist",[location.pathname+location.hash,this.startPath,this.time],void 0,r.D.sessionTrace,n)}));try{i=new PerformanceObserver((e=>{const t=e.getEntries();(0,S.p)(J,[t],void 0,r.D.sessionTrace,n)})),i.observe({type:ee,buffered:!0})}catch(e){}this.importAggregator({resourceObserver:i})}},de,K,I,le,k],loaderType:"pro"})})()})();</script>
<meta name="keywords" content="fanfiction, transformative works, otw, fair use, archive" />
<meta name="language" content="en-US" />
<meta name="subject" content="fandom" />
<meta name="description" content="An Archive of Our Own, a project of the
    Organization for Transformative Works" />
<meta name="distribution" content="GLOBAL" />
<meta name="classification" content="transformative works" />
<meta name="author" content="Organization for Transformative Works" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>
        Erwachlehren's Mistake in Dregarnuhr's Weave - Chapter 1 - JazzyForest - 本好きの下剋上 - 香月美夜 | Honzuki no Gekokujou | Ascendance of a Bookworm Series - Kazuki Miya [Archive of Our Own]
    </title>
<link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/site/2.0/01-core.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/site/2.0/02-elements.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/site/2.0/03-region-header.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/site/2.0/04-region-dashboard.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/site/2.0/05-region-main.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/site/2.0/06-region-footer.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/site/2.0/07-interactions.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/site/2.0/08-actions.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/site/2.0/09-roles-states.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/site/2.0/10-types-groups.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/site/2.0/11-group-listbox.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/site/2.0/12-group-meta.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/site/2.0/13-group-blurb.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/site/2.0/14-group-preface.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/site/2.0/15-group-comments.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/site/2.0/16-zone-system.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/site/2.0/17-zone-home.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/site/2.0/18-zone-searchbrowse.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/site/2.0/19-zone-tags.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/site/2.0/20-zone-translation.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/site/2.0/21-userstuff.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/site/2.0/22-system-messages.css" />
<link rel="stylesheet" type="text/css" media="only screen and (max-width: 62em), handheld" href="/stylesheets/site/2.0/25-media-midsize.css" />
<link rel="stylesheet" type="text/css" media="only screen and (max-width: 42em), handheld" href="/stylesheets/site/2.0/26-media-narrow.css" />
<link rel="stylesheet" type="text/css" media="speech" href="/stylesheets/site/2.0/27-media-aural.css" />
<link rel="stylesheet" type="text/css" media="print" href="/stylesheets/site/2.0/28-media-print.css" />
<!--[if lte IE 8]><link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/site/2.0/29-role-ie8_or_lower.css" /><![endif]-->
<!--[if IE 5]><link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/site/2.0/30-role-ie5.css" /><![endif]-->
<!--[if IE 6]><link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/site/2.0/31-role-ie6.css" /><![endif]-->
<!--[if IE 7]><link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/site/2.0/32-role-ie7.css" /><![endif]-->

<link rel="stylesheet" media="screen" href="/stylesheets/sandbox.css" />
<script src="/javascripts/livevalidation_standalone.js"></script>
<meta name="csrf-param" content="authenticity_token" />
<meta name="csrf-token" content="fQ+USOpjkLXQOPjUjtcy99spgf2MWj8PIAbquwQ1ZwL/5BX/w6iIystMFQYQTUBtljh17r5driUDqr0ic2Ejhw==" />
</head>
<body class="logged-out">
<div id="outer" class="wrapper">
<ul id="skiplinks"><li><a href="#main">Main Content</a></li></ul>

<noscript>
  <p id="javascript-warning">
    While we&#39;ve done our best to make the core functionality of this site accessible without javascript, it will work better with it enabled. Please consider turning it on!
  </p>
</noscript>


<div id="header" class="region">
<h1 class="heading">
<a href="/"><span>Archive of Our Own</span><sup> beta</sup><img alt="Archive of Our Own" class="logo" src="/images/ao3_logos/logo_42.png" /></a>
</h1>
<div id="login" class="dropdown">
<p class="user actions" role="menu">
<a id="login-dropdown" role="menuitem" href="/users/login">Log In</a>
</p>
<div id="small_login" class="simple login">
<form class="new_user" id="new_user_session_small" action="/users/login" accept-charset="UTF-8" method="post"><input type="hidden" name="authenticity_token" value="p3W94uh9tTtjH+xt9i1Dof4idQ/2jhGIVbIPy7Ob07IlnjxVwbatRHhrAb9otzE7szOBHMSJgKJ2HlhSxM+XNw==" autocomplete="off" />
<dl>
<dt>
<label for="user_session_login_small">User name or email:</label></dt>
<dd><input id="user_session_login_small" type="text" name="user[login]" /></dd>
<dt><label for="user_session_password_small">Password:</label></dt>
<dd><input id="user_session_password_small" type="password" name="user[password]" /></dd>
</dl>
<p class="submit actions">
<label for="user_remember_me_small" class="action"><input type="checkbox" name="user[remember_me]" id="user_remember_me_small" value="1" />Remember Me</label>
<input type="submit" name="commit" value="Log In" />
</p>
</form>
<ul class="footnote actions">
<li><a href="/users/password/new">Forgot password?</a></li>
<li>
<a href="/invite_requests">Get an Invitation</a>
</li>
</ul>
</div>
</div>
<h3 class="landmark heading">Site Navigation</h3>
<ul class="primary navigation actions" role="navigation">
<li class="dropdown">
<a href="/menu/fandoms">Fandoms</a>
<ul class="menu" role="menu">
<li><a href="/media">All Fandoms</a></li>
<li id="medium_5"><a href="/media/Anime%20*a*%20Manga/fandoms">Anime &amp; Manga</a></li>
<li id="medium_3"><a href="/media/Books%20*a*%20Literature/fandoms">Books &amp; Literature</a></li>
<li id="medium_4"><a href="/media/Cartoons%20*a*%20Comics%20*a*%20Graphic%20Novels/fandoms">Cartoons &amp; Comics &amp; Graphic Novels</a></li>
<li id="medium_7"><a href="/media/Celebrities%20*a*%20Real%20People/fandoms">Celebrities &amp; Real People</a></li>
<li id="medium_2"><a href="/media/Movies/fandoms">Movies</a></li>
<li id="medium_6"><a href="/media/Music%20*a*%20Bands/fandoms">Music &amp; Bands</a></li>
<li id="medium_8"><a href="/media/Other%20Media/fandoms">Other Media</a></li>
<li id="medium_30198"><a href="/media/Theater/fandoms">Theater</a></li>
<li id="medium_1"><a href="/media/TV%20Shows/fandoms">TV Shows</a></li>
<li id="medium_476"><a href="/media/Video%20Games/fandoms">Video Games</a></li>
<li id="medium_9971"><a href="/media/Uncategorized%20Fandoms/fandoms">Uncategorized Fandoms</a></li>
</ul>
</li>
<li class="dropdown">
<a href="/menu/browse">Browse</a>
<ul class="menu" role="menu">
<li><a href="/works">Works</a></li>
<li><a href="/bookmarks">Bookmarks</a></li>
<li><a href="/tags">Tags</a></li>
<li><a href="/collections">Collections</a></li>
</ul>
</li>
<li class="dropdown">
<a href="/menu/search">Search</a>
<ul class="menu" role="menu">
<li><a href="/works/search">Works</a></li>
<li><a href="/bookmarks/search">Bookmarks</a></li>
<li><a href="/tags/search">Tags</a></li>
<li><a href="/people/search">People</a></li>
</ul>
</li>
<li class="dropdown">
<a href="/menu/about">About</a>
<ul class="menu" role="menu">
<li><a href="/about">About Us</a></li>
<li><a href="/admin_posts">News</a></li>
<li><a href="/faq">FAQ</a></li>
<li><a href="/wrangling_guidelines">Wrangling Guidelines</a></li>
<li><a href="/donate">Donate or Volunteer</a></li>
</ul>
</li>
<li class="search"><form class="search" id="search" action="/works/search" accept-charset="UTF-8" method="get">
<fieldset>
<legend>Search Works</legend>
<p>
<label class="landmark" for="site_search">Work Search:</label>
<input class="text" id="site_search" aria-describedby="site_search_tooltip" type="text" name="work_search[query]" />
<span class="tip" role="tooltip" id="site_search_tooltip">tip: lex m/m (mature OR explicit)</span>
<span class="submit actions"><input type="submit" value="Search" class="button" /></span>
</p>
</fieldset>
</form></li>
</ul>
<div class="clear"></div>
</div>

<div id="inner" class="wrapper">



<div id="main" class="chapters-show region" role="main">
<div class="flash"></div>





<div class="work"><p class="landmark"><a name="top">&nbsp;</a></p>

<h3 class="landmark heading">Actions</h3>
<ul class="work navigation actions" role="menu">
<li class="chapter entire"><a href="/works/48613378?view_full_work=true">Entire Work</a></li>
<li class="chapter next"><a href="/works/48613378/chapters/122645032#workskin">Next Chapter &#8594;</a></li>
<li class="chapter" aria-haspopup="true">
<noscript>
        <a href="/works/48613378/navigate">Chapter Index</a>
      </noscript>
<a class="hidden" href="#">Chapter Index</a>
<ul id="chapter_index" class="expandable secondary hidden">
<li>
<form action="/works/48613378/chapters/122623150" accept-charset="UTF-8" method="get">
<p>
<select name="selected_id" id="selected_id"><option selected="selected" value="122623150">1. Prologue</option>
<option value="122645032">2. One(?) Year After Rozemyne's Baptism</option>
<option value="122792170">3. Interrogations</option>
<option value="122821750">4. Winter</option>
<option value="122959810">5. While She Slept</option>
<option value="123108973">6. Rozemyne Wakes</option>
<option value="123280618">7. Returning to the Castle</option>
<option value="123348676">8. Meeting with Rozemyne</option>
<option value="123472459">9. Making Deals</option>
<option value="123499261">10. Side Story: My Little Brother</option>
<option value="123578833">11. Rozemyne's Training Begins</option>
<option value="123707167">12. The Archduke Conference and Tenth Year Celebrat...</option>
<option value="123723715">13. A Meeting with All Her Guardians</option>
<option value="123761950">14. Gifts and Announcements</option>
<option value="123819523">15. Side Story: Serving My Goddess</option>
<option value="123870781">16. Fallout</option>
<option value="123912613">17. Headache Report #1</option>
<option value="123964549">18. Headache Reports #2, 3, 4...</option>
<option value="123986440">19. Ditter!</option>
<option value="123989251">20. Side Story: Firing Traugott</option>
<option value="124052836">21. Research at the Academy</option>
<option value="124105339">22. What Happened at the Girls' Outing</option>
<option value="124189063">23. Justus' Information Gathering</option>
<option value="124305787">24. Dedication Ritual and the Lord of Winter</option>
<option value="124314193">25. Side Story: Tea with the Ladies</option>
<option value="124355161">26. Arranging a Mediocre Love Song</option>
<option value="124367950">27. Side Story: The Plan</option>
<option value="124422967">28. Finalizing an Engagement and Gaining a Retainer...</option>
<option value="124493668">29. Interduchy Tournament, Year 1</option>
<option value="124648921">30. Spring Prayer and Archduke Conference</option>
<option value="124714855">31. Warning</option>
<option value="124793107">32. Two Weddings and Some Corpses</option>
<option value="124824184">33. Side Story: My Father, the Traitor</option>
<option value="124873813">34. Side Story: The Dyeing Competition</option>
<option value="124927627">35. Side Story: Visiting Groschel</option>
<option value="125035027">36. Return to the Royal Academy</option>
<option value="125082223">37. Side Story: Making my Shield and Going to the G...</option>
<option value="125106154">38. Questioning Traugott</option>
<option value="125250010">39. Plans, Summons, and Reports</option>
<option value="125264650">40. Tea Parties</option>
<option value="125288515">41. A Song from One's Beloved</option>
<option value="125362687">42. Award Ceremony, Year Two</option>
<option value="125452450">43. Graduation and Archduke Conference, Year 2</option>
<option value="125460346">44. Side Story: The End of My Engagement</option>
<option value="125565448">45. Spring, Summer, and Autumn</option>
<option value="125603713">46. The Second Slumber</option>
<option value="125756818">47. Start of Year 3</option>
<option value="125805442">48. Stating Joint Research</option>
<option value="125807131">49. The Lord of Winter, Year Three</option>
<option value="125868190">50. Side Story: Saving My Brother</option>
<option value="125896105">51. Side Story: A Knight of My Own</option>
<option value="125944006">52. Side Story: How I Won My—</option>
<option value="126016237">53. The Lecture</option>
<option value="126072592">54. An Honest Conversation</option>
<option value="126094279">55. Another Honest Conversation</option>
<option value="126156151">56. Interduchy Tournament, Year 3</option>
<option value="126241234">57. Graduation Ceremony, Year 3</option>
<option value="126323188">58. A Discussion and Negotiations with the Sovereig...</option>
<option value="126427660">59. Visiting Klassenberg</option>
<option value="126493627">60. Welcome to Dunkelfelger!</option>
<option value="126548281">61. Welcoming Ditter</option>
<option value="126673495">62. The Spoils of Ditter</option>
<option value="126774166">63. Visiting Drewanchel</option>
<option value="126952192">64. The Foundation and Plans for the Future</option>
<option value="127014040">65. Archduke Conference, Year 3</option>
<option value="127030204">66. Side Story: Love or Ambition?</option>
<option value="127165144">67. Summer Happenings</option>
<option value="127189222">68. Hidden Rooms</option>
<option value="127247701">69. *M RATED* Second Chance</option>
<option value="127312024">70. New Children in Ehrenfest</option>
<option value="127381198">71. Start of Year 4</option>
<option value="127398106">72. Side Story: Becoming My Sister’s Knight</option>
<option value="127588903">73. Side Story: An Undergarment Revolution and a Te...</option>
<option value="127956616">74. Year Four and Interduchy Tournament</option>
<option value="128428429">75. Side Story: A Historic Ditter</option>
<option value="128579197">76. Saving Geduldh</option>
<option value="128601937">77. Side Story: My Brother’s Killer</option>
<option value="128613781">78. Side Story: Earning Mother’s Love</option>
<option value="129400672">79. Defending Ehrenfest</option>
<option value="129400810">80. Side Story: In the Temple</option>
<option value="129655339">81. Clean Up and Debrief</option>
<option value="129840370">82. Planning for Ahrensbach</option>
<option value="129965050">83. Battle at the Docks</option>
<option value="130211710">84. Side Story: Sweeping the City</option>
<option value="130765048">85. Interrogations at the Academy</option>
<option value="130890451">86. Letting Loose the Gremlin</option>
<option value="131024275">87. Reforms</option>
<option value="131272747">88. The Meaning of a Name</option>
<option value="131358673">89. Side Story: Parue Picking and Ladies' Education...</option>
<option value="131552794">90. The Beginning of Spring</option>
<option value="131757877">91. A Headache Inducing Conference - Part 1</option>
<option value="131782792">92. A Headache Inducing Conference - Part 2</option>
<option value="131852755">93. A Headache-Inducing Conference - Part 3</option>
<option value="131950366">94. A Headache-Inducing Conference - Part 4</option>
<option value="132044516">95. Side Story: A Headache-Inducing Little Brother ...</option>
<option value="132215200">96. A Headache-Inducing Conference - Part 5</option>
<option value="132485203">97. A Headache-Inducing Conference: Part 6</option>
<option value="133063348">98. A Headache-Inducing Conference: Part 7</option>
<option value="133403608">99. Gentlemen's Education and Blueprints</option>
<option value="133574485">100. A Meeting at the End of Spring</option>
<option value="133659499">101. A Meeting with One's Nephew</option>
<option value="134073583">102. To Alexandria</option></select>
<span class="submit actions"><input type="submit" name="commit" value="Go" /></span>
</p>
</form> </li>
<li><a href="/works/48613378/navigate">Full-page index</a></li>
</ul>
</li>
<li class="comments" id="show_comments_link_top">
<a data-remote="true" href="/comments/show_comments?chapter_id=122623150">Comments </a>
</li>
<li class="share hidden">
<a class=" modal" title="Share Work" aria-controls="#modal" href="/works/48613378/share">Share</a>
</li>
<li class="download" aria-haspopup="true">
<a href="#">Download</a>
<ul class="expandable secondary">
<li><a href="/downloads/48613378/Erwachlehrens_Mistake_in.azw3?updated_at=1705098518">AZW3</a></li>
<li><a href="/downloads/48613378/Erwachlehrens_Mistake_in.epub?updated_at=1705098518">EPUB</a></li>
<li><a href="/downloads/48613378/Erwachlehrens_Mistake_in.mobi?updated_at=1705098518">MOBI</a></li>
<li><a href="/downloads/48613378/Erwachlehrens_Mistake_in.pdf?updated_at=1705098518">PDF</a></li>
<li><a href="/downloads/48613378/Erwachlehrens_Mistake_in.html?updated_at=1705098518">HTML</a></li>
</ul>
</li>
</ul>

<h3 class="landmark heading">Work Header</h3>
<div class="wrapper">
<dl class="work meta group">
<dt class="rating tags">
Rating:
</dt>
<dd class="rating tags">
<ul class="commas">
<li><a class="tag" href="/tags/Mature/works">Mature</a></li>
</ul>
</dd>
<dt class="warning tags">
<a href="/tos_faq#tags">Archive Warning</a>:
</dt>
<dd class="warning tags">
<ul class="commas">
<li><a class="tag" href="/tags/Choose%20Not%20To%20Use%20Archive%20Warnings/works">Creator Chose Not To Use Archive Warnings</a></li>
</ul>
</dd>
<dt class="category tags">
Category:
</dt>
<dd class="category tags">
<ul class="commas">
<li><a class="tag" href="/tags/F*s*M/works">F/M</a></li>
</ul>
</dd>
<dt class="fandom tags">
Fandom:
</dt>
<dd class="fandom tags">
<ul class="commas">
<li><a class="tag" href="/tags/%E6%9C%AC%E5%A5%BD%E3%81%8D%E3%81%AE%E4%B8%8B%E5%89%8B%E4%B8%8A%20-%20%E9%A6%99%E6%9C%88%E7%BE%8E%E5%A4%9C%20%7C%20Honzuki%20no%20Gekokujou%20%7C%20Ascendance%20of%20a%20Bookworm%20Series%20-%20Kazuki%20Miya/works">本好きの下剋上 - 香月美夜 | Honzuki no Gekokujou | Ascendance of a Bookworm Series - Kazuki Miya</a></li>
</ul>
</dd>
<dt class="relationship tags">
Relationship:
</dt>
<dd class="relationship tags">
<ul class="commas">
<li><a class="tag" href="/tags/Ferdinand*s*Rozemyne%20(Ascendance%20of%20a%20Bookworm)/works">Ferdinand/Rozemyne (Ascendance of a Bookworm)</a></li>
</ul>
</dd>
<dt class="character tags">
Characters:
</dt>
<dd class="character tags">
<ul class="commas">
<li><a class="tag" href="/tags/Sylvester%20(Ascendance%20of%20a%20Bookworm)/works">Sylvester (Ascendance of a Bookworm)</a></li><li><a class="tag" href="/tags/Elvira%20(Ascendance%20of%20a%20Bookworm)/works">Elvira (Ascendance of a Bookworm)</a></li><li><a class="tag" href="/tags/Charlotte%20(Ascendance%20of%20a%20Bookworm)/works">Charlotte (Ascendance of a Bookworm)</a></li><li><a class="tag" href="/tags/Wilfried%20(Ascendance%20of%20a%20Bookworm)/works">Wilfried (Ascendance of a Bookworm)</a></li><li><a class="tag" href="/tags/Hartmut%20(Ascendance%20of%20a%20Bookworm)/works">Hartmut (Ascendance of a Bookworm)</a></li><li><a class="tag" href="/tags/Rozemyne%20(Ascendance%20of%20a%20Bookworm)/works">Rozemyne (Ascendance of a Bookworm)</a></li><li><a class="tag" href="/tags/Ferdinand%20(Ascendance%20of%20a%20Bookworm)/works">Ferdinand (Ascendance of a Bookworm)</a></li><li><a class="tag" href="/tags/Hannelore%20(Ascendance%20of%20a%20Bookworm)/works">Hannelore (Ascendance of a Bookworm)</a></li>
</ul>
</dd>
<dt class="freeform tags">
Additional Tags:
</dt>
<dd class="freeform tags">
<ul class="commas">
<li><a class="tag" href="/tags/Alternate%20Weave/works">Alternate Weave</a></li><li><a class="tag" href="/tags/Part%205%20Volume%2012%20spoilers/works">Part 5 Volume 12 spoilers</a></li><li><a class="tag" href="/tags/Retrograde/works">Retrograde</a></li><li><a class="tag" href="/tags/It&#39;s%20Ferdinand%20this%20time/works">It&#39;s Ferdinand this time</a></li><li><a class="tag" href="/tags/Ferdinand%20with%20memories/works">Ferdinand with memories</a></li><li><a class="tag" href="/tags/Not%20compliant%20with%20fanbook%208/works">Not compliant with fanbook 8</a></li><li><a class="tag" href="/tags/Minor%20non-canon%20compliant%20elements/works">Minor non-canon compliant elements</a></li>
</ul>
</dd>
<dt class="language">
Language:
</dt>
<dd class="language" lang="en">
English
</dd>
<dt class="stats">Stats:</dt>
<dd class="stats">

<dl class="stats"><dt class="published">Published:</dt><dd class="published">2023-07-15</dd><dt class="status">Updated:</dt><dd class="status">2024-01-12</dd><dt class="words">Words:</dt><dd class="words">416,167</dd><dt class="chapters">Chapters:</dt><dd class="chapters">102/?</dd><dt class="comments">Comments:</dt><dd class="comments">2,947</dd><dt class="kudos">Kudos:</dt><dd class="kudos">2,988</dd><dt class="bookmarks">Bookmarks:</dt><dd class="bookmarks"><a href="/works/48613378/bookmarks">189</a></dd><dt class="hits">Hits:</dt><dd class="hits">103,304</dd></dl>
</dd>
</dl>
</div>

<div id="workskin">
<div class="preface group">
<h2 class="title heading">
Erwachlehren's Mistake in Dregarnuhr's Weave
</h2>
<h3 class="byline heading">
<a rel="author" href="/users/JazzyForest/pseuds/JazzyForest">JazzyForest</a>
</h3>
<div class="summary module">
<h3 class="heading">Summary:</h3>
<blockquote class="userstuff">
<p>[Spoilers for Web Novel]</p><p>They knew it was a risk for Rozemyne to pour out all of the gods' mana so she could be redyed, but when things don't go to plan, Ferdinand must return to an earlier time to ensure her thread isn't cut too soon.</p>
</blockquote>
</div>
</div>
<div id="chapters">

<div class="chapter" id="chapter-1">

<div class="chapter preface group">
<h3 class="title">
<a href="/works/48613378/chapters/122623150">Chapter 1</a>: Prologue
</h3>

</div>

<div class="userstuff module" role="article">
<h3 class="landmark heading" id="work">Chapter Text</h3>
<p dir="ltr">Ferdinand held Rozemyne as she poured mana into the branch from Erwaermen, her breathing slowing and her strength waning. With great effort, she removed her hand from the feystone holding the branch and pulled something from her belt, pressing it into his palm. His mana was pulled into the object, and he looked down to see his name stone. Shock, confusion, anger, and pain shot through him. The reason she'd held it was so he could be near her while she still had the gods' mana, and the second it was depleted, she'd given it back to him. How eagerly had she been waiting fot his moment? How much did she detest his ultimate symbol of loyalty?</p><p dir="ltr">With his name stone safely out of her possession, she put her hand back on the feystone and pushed out the last of the gods' mana still within her. He quickly cast Flutrane’s healing before laying her down and placing the mind-reading magic tool on her head. Once he secured the one for himself, he poured his jureve in her mouth. It trickled out from her pale lips, and the first pang of worry struck him. Eventually, he managed to get enough of it down her throat to perform the mind-reading.</p><p dir="ltr">Once they were connected, he called out to her, but he received no response. Again and again, he called, his heart speeding up each time he received no answer. She hadn’t been silent this long even when she was in Mestionora’s library. Reluctantly, he reached towards her mind only to find memories that were blurred and fragmented, just like the criminals who’d died before being captured.</p><p dir="ltr">The wild emotions swirling in him severed the connection. Once he came back to himself, he checked Rozemyne’s neck for a pulse and felt his blood run cold. He was unable to sense any mana flowing in her, nor could he feel her breath against his hand. In desperation, he pressed his ear to her chest to listen for a heartbeat only for her melt away in his arms. The cold tinkle of her feystone clattering against the floor deafened him as Schneeahst's ice washed over him.</p><p dir="ltr">He stared at the light yellow feystone, waiting for the nightmarish vision to end. “No,” he breathed, brushing his fingers against its smooth surface. Hot tears filled his vision and streamed down his cheeks as a pain more intense than anything he’d experienced before pressed down on him. The weight finally broke him, wrenching bitter sobs from his crumpled form. He'd been too late. He'd let her pour out too much. He'd failed her, as she had known he would. That was why she had given back his name stone.</p><p dir="ltr">When he could breathe again, he gasped, “This was supposed to… They said…”</p><p dir="ltr">The weight on him cracked as fury burst through him. He’d make them pay. Every last one of those gods who’d poured their mana into her would feel his wrath - and he’d start with that damned tree.</p><p dir="ltr">He scooped up her feystone and stormed out of the supply chamber.</p><p dir="ltr">Her aides turned to him, panic in their eyes. “Lord Ferdinand!” Angelica called. “Lady Rozemyne is…?”</p><p dir="ltr">One look at him confirmed all their fears, and Lieseleta collapsed, her hands covering her mouth. “So it’s true. When Gretia fell–”</p><p dir="ltr">Ferdinand didn’t hear the rest as he continued his march out the room and down the hall. Justus eventually caught up to him as he reached the chamber with the transportation circle to the Royal Academy. “My Lord! What happened? Where are you going?”</p><p dir="ltr">“Stay here,” he commanded as he stepped onto the circle.</p><p dir="ltr">Justus paled, but his face became serious. “And if you don’t come back?”</p><p dir="ltr">The look in his attendant’s eye said he knew Ferdinand wasn’t planning on returning. With the Zent now dead and the only one with Wisdom likely soon to follow, it didn’t really matter what they did. The country was doomed to fall either way. Still, he would extend one last comfort to the man who’d dedicated his name to him all those years ago - a ray of hope to keep his mind off the inevitable. “Have Charlotte dye the foundation.” With that, he activated the circle.</p><p dir="ltr">When the gold and black swirling mana faded, he stood in the Alexandria dorms. They were deserted, given they were between the winter term and Archduke Conference. Between the lack of personnel and the sudden death of the new Zent distracting what remained, he had little difficulty reaching the stage for the dedication whirl. He loathed the idea of giving anything more to the gods who’d taken Rozemyne from him, but he danced nevertheless until the statues of the gods moved and the path opened.</p><p dir="ltr">“[Water gun],” he chanted as he entered the Garden of Beginnings. He fired the moment he stepped over the threshold, but his arrows dissipated against a yellow shield surrounding Erwaermen.</p><p dir="ltr">“Verfuhremeer,” the former god called, looking upward, “your assistance, please.”</p><p dir="ltr">An unnatural calm settled over Ferdinand, smothering even his desire to fight against it.</p><p dir="ltr">“Quinta, Mestionora has informed me of what transpired, and she’s been negotiating with the other gods on your behalf.”</p><p dir="ltr">Ferdinand’s brows rose. “To what end? Will she speak with Ewigeliebe and have Rozemyne brought back?”</p><p dir="ltr">Erwaermen shook his head. “You know she can’t meet with him. However, she has invoked the help of Dregarnuhr who wishes to see this weave corrected. Myne’s thread was not meant to snap here.”</p><p dir="ltr">He froze as he sped through several mental calculations. “You’re planning to unravel the weave?”</p><p dir="ltr">“Dregarnuhr will send you back to an earlier point in your thread, hopefully one far enough back to prevent Myne’s being cut too short while preserving as much of the weave as possible, but you two must still complete your Wisdom. Without a true Zent, my garden will perish, and you’ve already made your position clear on your acceptance of the role.”</p><p dir="ltr">Anger flashed through Ferdinand. “Do you plan to try to force Rozemyne–”</p><p dir="ltr">“No,” Erwaermen cut him off. “You can install a temporary Zent as you did this time, but you must still provide us with true Zent candidates.”</p><p dir="ltr">Ferdinand tapped his temple as he thought through all those who would meet the qualifications. “Easier said than done. Few people gain all seven colors before obtaining their schtappes, especially since students now obtain them their first year. I won’t have the power to change that policy.”</p><p dir="ltr">“Your children should have the colors, should they not?” Erwaremen asked. “Do not you and Myne both have the protection of the divine couple and the eternal five?”</p><p dir="ltr">“You assume we’ll marry.”  It didn't matter that they were technically already engaged in the weave. She hadn't truly accepted, and the events that allowed him to manipulate her into the position might not reoccur in the next weave.</p><p dir="ltr">“Is she not already dyed in your colors?”</p><p dir="ltr">Ferdinand glared at him. “<em>Was</em>. And that wasn't-”</p><p dir="ltr">“That is no matter. You will be reunited with her soon. Now, Dregarn–”</p><p dir="ltr">“Wait,” he said, holding up a hand. “I have conditions.”</p><p dir="ltr">Erwaermen studied him for a long moment and then asked, “They are?”</p><p dir="ltr">“First, I demand to know when I’ll be sent back to.”</p><p dir="ltr">The former god looked up for a moment then back to Ferdinand. “About a year after her baptism.”</p><p dir="ltr">That was before her coma. In that case… “Second, give Rozemyne a healthy body and help her grow so she looks her age.”</p><p dir="ltr">“Anwachs? Very well. As he’s done this for her before, he shall do it again.”</p><p dir="ltr">“Third, I’ll need all the materials I’ve gathered in this weave, including those branches we used to restore Alexandria.”</p><p dir="ltr">Erwaermen looked up again and spoke with the ceiling for a while before sighing with a nod. “Very well, but that is the last concession you will be given. Now, prepare yourself. Dregarnuhr will wait no longer.”</p><p dir="ltr">As a sickening sensation washed over him, Ferdinand grasped Rozemyne’s feystone to his breast, trying to take comfort in the warm mana within it.</p><p dir="ltr">He’d be with his family again soon.</p>
</div>

</div>

</div>
</div>

</div>



<div id="feedback" class="feedback">
<h3 class="landmark heading">Actions</h3>
<ul class="actions" role="navigation">
<li><a href="#main">&#8593; Top</a></li>
<li><a href="/works/48613378/chapters/122645032#workskin">Next Chapter &#8594;</a></li>
<li>
<form id="new_kudo" action="/kudos" accept-charset="UTF-8" method="post"><input type="hidden" name="authenticity_token" value="S9cUULL9+7jhNU+kW4/dAWFxU3XPPe0g/0ltJ1OoMLHJPJXnmzbjx/pBonbFFa+bLGCnZv06fArc5Tq+JPx0NA==" autocomplete="off" />
<input value="48613378" autocomplete="off" type="hidden" name="kudo[commentable_id]" id="kudo_commentable_id" />
<input value="Work" autocomplete="off" type="hidden" name="kudo[commentable_type]" id="kudo_commentable_type" />
<input type="submit" name="commit" value="Kudos ♥" id="kudo_submit" />
</form> </li>
<li id="show_comments_link"><a data-remote="true" href="/comments/show_comments?chapter_id=122623150">Comments (18)</a></li>
</ul>
<div id="kudos_message"></div>
<h3 class="landmark heading">Kudos</h3>
<div id="kudos">
<p class="kudos">
<a href="/users/Heavenlyslayer268">Heavenlyslayer268</a>, <a href="/users/Kurohime_9624">Kurohime_9624</a>, <a href="/users/CrystalWaterStar">CrystalWaterStar</a>, <a href="/users/Violettheory">Violettheory</a>, <a href="/users/Laili29">Laili29</a>, <a href="/users/Yoakesa">Yoakesa</a>, <a href="/users/snickersd">snickersd</a>, <a href="/users/FraktheG0ds">FraktheG0ds</a>, <a href="/users/narutopower1991">narutopower1991</a>, <a href="/users/zyxth">zyxth</a>, <a href="/users/Shiary">Shiary</a>, <a href="/users/thirstyfujo">thirstyfujo</a>, <a href="/users/ImNotAWriterNotReally">ImNotAWriterNotReally</a>, <a href="/users/LordSilver">LordSilver</a>, <a href="/users/Lacerator">Lacerator</a>, <a href="/users/Rosekitten">Rosekitten</a>, <a href="/users/Iron_Golem147">Iron_Golem147</a>, <a href="/users/LileeReads">LileeReads</a>, <a href="/users/imilliterate">imilliterate</a>, <a href="/users/TexTex">TexTex</a>, <a href="/users/CjSingh">CjSingh</a>, <a href="/users/AvatarPeridot">AvatarPeridot</a>, <a href="/users/Lyricsky">Lyricsky</a>, <a href="/users/ThisIsNotAName">ThisIsNotAName</a>, <a href="/users/YellowJasmine_Ruby_BlueC">YellowJasmine_Ruby_BlueC</a>, <a href="/users/TrekkyNor">TrekkyNor</a>, <a href="/users/Inabit">Inabit</a>, <a href="/users/MissNikki">MissNikki</a>, <a href="/users/lilchaosgoblin">lilchaosgoblin</a>, <a href="/users/Natasha1510">Natasha1510</a>, <a href="/users/Kotona14">Kotona14</a>, <a href="/users/SirBobTheMarvelous">SirBobTheMarvelous</a>, <a href="/users/ukimafura">ukimafura</a>, <a href="/users/gamayunc">gamayunc</a>, <a href="/users/Harman">Harman</a>, <a href="/users/artemyschan">artemyschan</a>, <a href="/users/icewing1998">icewing1998</a>, <a href="/users/AngrySugar">AngrySugar</a>, <a href="/users/neviche">neviche</a>, <a href="/users/aekwqiekw">aekwqiekw</a>, <a href="/users/Fanficlover1234">Fanficlover1234</a>, <a href="/users/Drax9000">Drax9000</a>, <a href="/users/Shaaaark">Shaaaark</a>, <a href="/users/Lumi13">Lumi13</a>, <a href="/users/Yuujiki">Yuujiki</a>, <a href="/users/lemurias">lemurias</a>, <a href="/users/Vinara9">Vinara9</a>, <a href="/users/DreamyAndree">DreamyAndree</a>, <a href="/users/DragonBladeRin">DragonBladeRin</a>, <a href="/users/TataBonomi">TataBonomi</a><span id="kudos_more_connector">, and </span><a id="kudos_more_link" data-remote="true" href="/works/48613378/kudos?before=5713905397">487 more users</a>
as well as
2451 guests
left kudos on this work!
</p>
</div>
<h3 class="landmark heading"><a id="comments">Comments</a></h3>
<div id="add_comment_placeholder" title="top level comment">
<div id="add_comment">

<div class="post comment" id="comment_form_for_122623150">
<form class="new_comment" id="comment_for_122623150" action="/chapters/122623150/comments" accept-charset="UTF-8" method="post"><input type="hidden" name="authenticity_token" value="vNDPObEothpQ86bMZBLRJxAYO6nMcEIm+zATgYATIIA+O06OmOOuZUuHSx76iKO9XQnPuv530wzYnEQY90dkBQ==" autocomplete="off" />
<fieldset>
<legend>Post Comment</legend>
<dl>
<dt class="landmark">Note:</dt>
<dd class="instructions comment_form">All fields are required. Your email address will not be published.</dd>
<dt><label for="comment_name_for_122623150">Guest name: </label></dt>
<dd>
<input id="comment_name_for_122623150" type="text" name="comment[name]" />
<script>
//<![CDATA[
var validation_for_comment_name_for_122623150 = new LiveValidation('comment_name_for_122623150', { wait: 500, onlyOnBlur: false });
validation_for_comment_name_for_122623150.add(Validate.Presence, {"failureMessage":"Please enter your name.","validMessage":""});
//]]>
</script>
</dd>
<dt><label for="comment_email_for_122623150">Guest email: </label></dt>
<dd>
<input id="comment_email_for_122623150" type="text" name="comment[email]" />
<script>
//<![CDATA[
var validation_for_comment_email_for_122623150 = new LiveValidation('comment_email_for_122623150', { wait: 500, onlyOnBlur: false });
validation_for_comment_email_for_122623150.add(Validate.Presence, {"failureMessage":"Please enter your email address.","validMessage":""});
//]]>
</script>
</dd>
</dl>
<p class="footnote">(Plain text with limited HTML <a class="help symbol question modal" title="Html help" aria-controls="#modal" href="/help/html-help.html"><span class="symbol question"><span>?</span></span></a>)</p>
<p>
<label for="comment_content_for_122623150" class="landmark">Comment</label>
<textarea id="comment_content_for_122623150" class="comment_form observe_textlength" title="Enter Comment" name="comment[comment_content]">
</textarea>
<input type="hidden" id="controller_name_for_122623150" name="controller_name" value="chapters" />
</p>
<p class="character_counter" tabindex="0"><span id="comment_content_for_122623150_counter" class="value" data-maxlength="10000">10000</span> characters left</p>
<script>
//<![CDATA[
var validation_for_comment_content_for_122623150 = new LiveValidation('comment_content_for_122623150', { wait: 500, onlyOnBlur: false });
validation_for_comment_content_for_122623150.add(Validate.Presence, {"failureMessage":"Brevity is the soul of wit, but we need your comment to have text in it.","validMessage":""});
validation_for_comment_content_for_122623150.add(Validate.Length, {"maximum":"10000","tooLongMessage":"must be less than 10000 characters long."});
//]]>
</script>
<p class="submit actions">
<input type="submit" name="commit" value="Comment" id="comment_submit_for_122623150" data-disable-with="Please wait..." />
</p>
</fieldset>
</form></div>
<div class="clear"></div>
</div>
</div>


<div id="comments_placeholder" style="display:none;">
</div>
</div>


<script type="speculationrules">
      {
        "prefetch": [
          {
            "source": "list",
            "urls": ["/works/48613378/chapters/122645032#workskin"]
          }
        ]
      }
    </script>
<div class="clear"></div>
</div>

</div>

<div id="footer" role="contentinfo" class="region">
<h3 class="landmark heading">Footer</h3>
<ul class="navigation actions" role="navigation">
<li class="module group">
<h4 class="heading">About the Archive</h4>
<ul class="menu">
<li><a href="/site_map">Site Map</a></li>
<li><a href="/diversity">Diversity Statement</a></li>
<li><a href="/tos">Terms of Service</a></li>
<li><a href="/dmca">DMCA Policy</a> </li>
</ul>
</li>
<li class="module group">
<h4 class="heading">Contact Us</h4>
<ul class="menu">
<li><a href="/abuse_reports/new">Policy Questions &amp; Abuse Reports</a></li>
<li><a href="/support">Technical Support &amp; Feedback</a></li>
</ul>
</li>
<li class="module group">
<h4 class="heading">Development</h4>
<ul class="menu">
<li><a href="https://github.com/otwcode/otwarchive/commits/v0.9.356.1">otwarchive v0.9.356.1</a></li>
<li><a href="/known_issues">Known Issues</a></li>
<li><a href="https://www.gnu.org/licenses/old-licenses/gpl-2.0.html" title="View License">GPL</a> by the <a href="https://transformativeworks.org/" title="The Organization for Transformative Works">OTW</a></li>
</ul>
</li>
</ul>
</div>

</div>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js" type="text/javascript"></script>
<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.0/jquery-ui.min.js" type="text/javascript"></script>

<script type="text/javascript">
  if (typeof jQuery == 'undefined') {
    document.write(unescape("%3Cscript src='/javascripts/jquery.min.js' type='text/javascript'%3E%3C/script%3E"));
    document.write(unescape("%3Cscript src='/javascripts/jquery-ui.min.js' type='text/javascript'%3E%3C/script%3E"));
  }
</script>
<script type="text/javascript">$j = jQuery.noConflict();</script>
<script src="/javascripts/jquery.scrollTo.min.js"></script>
<script src="/javascripts/jquery.livequery.min.js"></script>
<script src="/javascripts/rails.js"></script>
<script src="/javascripts/application.js"></script>
<script src="/javascripts/bootstrap/bootstrap-dropdown.min.js"></script>
<script src="/javascripts/jquery-shuffle.js"></script>
<script src="/javascripts/jquery.tokeninput.min.js"></script>
<script src="/javascripts/jquery.trap.min.js"></script>
<script src="/javascripts/ao3modal.min.js"></script>
<script src="/javascripts/js.cookie.min.js"></script>
<script src="/javascripts/filters.min.js"></script>
<script>
//<![CDATA[

      // We can't rely on !window.localStorage to test localStorage support in
      // browsers like Safari 9, which technically support it, but which have a
      // storage length of 0 in private mode.
      // Credit: https://github.com/getgrav/grav-plugin-admin/commit/cfe2188f10c4ca604e03c96f3e21537fda1cdf9a
      function isSupported() {
          var item = "localStoragePolyfill";
          try {
              localStorage.setItem(item, item);
              localStorage.removeItem(item);
              return true;
          } catch (e) {
              return false;
          }
      }

      function acceptTOS() {
        if (isSupported()) {
          localStorage.setItem("accepted_tos", "20180523");
        } else {
          Cookies.set("accepted_tos", "20180523", { expires: 365 });
        }
      }

    $j(document).ready(function() {
        if (localStorage.getItem("accepted_tos") !== "20180523" && Cookies.get("accepted_tos") !== "20180523") {
          $j("body").prepend("<div id=\"tos_prompt\" class=\"hidden\">\n  <h2 class=\"heading\">\n    <span>Archive of Our Own<\/span>\n  <\/h2>\n  <div class=\"agreement\">\n    <p class=\"summary\">\n      On Archive of Our Own (AO3), users can make profiles, create works and\n            other Content, post comments, give Kudos, create Collections and \n            Bookmarks, participate in Challenges, import works, and more. Any \n            information you publish in a comment, profile, work, or Content that you \n            post or import onto AO3 including in summaries, notes and tags, \n            will be accessible by the public (unless you limit access to a work only \n            to those with AO3 Accounts), and it will be available to \n            AO3 personnel. Be mindful when sharing personal information, \n            including  your religious or political views, health, racial background, \n            country of origin, sexual identity and/or personal relationships. To \n            learn more, check out our <a href=\"/tos\">Terms of Service<\/a> and <a href=\"/tos#privacy\">Privacy Policy<\/a>.\n    <\/p>\n\n    <p class=\"confirmation\">\n      <input type=\"checkbox\" id=\"tos_agree\" />\n      <label for=\"tos_agree\">I have read &amp; understood the new Terms of Service and Privacy Policy<\/label>\n    <\/p>\n\n      <p class=\"submit\">\n        <button name=\"button\" type=\"button\" disabled=\"disabled\" id=\"accept_tos\">I agree/consent to its terms<\/button>\n      <\/p>\n\n  <\/div>\n<\/div>\n\n<script>\n//<![CDATA[\n\n  \$j(document).ready(function() {\n    var container = \$j(\"#tos_prompt\");\n    var outer = \$j(\"#outer\");\n    var button = \$j(\"#accept_tos\");\n\n    setTimeout(showTOSPrompt, 1500);\n\n    function showTOSPrompt() {\n      \$j.when(container.fadeIn(500)).done(function() {\n        outer.addClass(\"hidden\").attr(\"aria-hidden\", \"true\");\n      });\n\n      \$j(\"#tos_agree\").on(\"click\", function() {\n        button.attr(\"disabled\", !this.checked);\n        if (this.checked) {\n          button.on(\"click\", function() {\n            acceptTOS();\n            outer.removeClass(\"hidden\").removeAttr(\"aria-hidden\");\n            \$j.when(container.fadeOut(500)).done(function() {\n              container.remove();\n            });\n          });\n        };\n      }).change();\n    };\n  });\n\n//]]]]><![CDATA[>\n<\/script>");
        }
    });

//]]>
</script>
<script>
//<![CDATA[

    $j(document).ready(function() {
      var permitted_hosts = ["104.153.64.122","208.85.241.152","208.85.241.157","ao3.org","archiveofourown.com","archiveofourown.net","archiveofourown.org","download.archiveofourown.org","insecure.archiveofourown.org","secure.archiveofourown.org","www.archiveofourown.com","www.archiveofourown.net","www.archiveofourown.org","www.ao3.org","archive.transformativeworks.org"];
      var current_host = window.location.hostname;

      if (!permitted_hosts.includes(current_host) && Cookies.get("proxy_notice") !== "0" && window.location.protocol !== "file:") {
        $j("#skiplinks").after("<div id=\"proxy-notice\">\n  <div class=\"userstuff\">\n    <p class=\"important\">Important message:<\/p>\n    <ol>\n      <li>You are using a proxy site that is not part of the Archive of Our Own.<\/li>\n      <li>The entity that set up the proxy site can see what you submit, including your IP address. If you log in through the proxy site, it can see your password.<\/li>\n    <\/ol>\n    <p class=\"important\">重要提示：<\/p>\n    <ol>\n      <li>您使用的是第三方开发的反向代理网站，此网站并非Archive of Our Own - AO3（AO3作品库）原站。<\/li>\n      <li>代理网站的开发者能够获取您上传至该站点的全部内容，包括您的ip地址。如您通过代理登录AO3，对方将获得您的密码。<\/li>\n    <\/ol>\n    <p class=\"submit\"><button class=\"action\" type=\"button\" id=\"proxy-notice-dismiss\">Dismiss Notice<\/button><\/p>\n  <\/div>\n<\/div>\n\n<script>\n//<![CDATA[\n\n  \$j(document).ready(function() {\n    \$j(\"#proxy-notice-dismiss\").on(\"click\", function() {\n      Cookies.set(\"proxy_notice\", \"0\");\n      \$j(\"#proxy-notice\").slideUp();\n    });\n  });\n\n//]]]]><![CDATA[>\n<\/script>");
      }
    });

//]]>
</script>
<script>
      $j(document).on("loadedCSRF", function() {
        $j.post("/works/48613378/hit_count.json")
      })
    </script>
</body>
</html>

`