if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,l)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let c={};const t=e=>i(e,r),o={module:{uri:r},exports:c,require:t};s[r]=Promise.all(n.map((e=>o[e]||t(e)))).then((e=>(l(...e),c)))}}define(["./workbox-fd6446f0"],(function(e){"use strict";e.setCacheNameDetails({prefix:"image-design-cache"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/clipper-lib-9af4c47e.js",revision:null},{url:"assets/element-plus-55e064ff.js",revision:null},{url:"assets/fabric-d2b07081.js",revision:null},{url:"assets/filter-1d3c89dd.js",revision:null},{url:"assets/index-0a462b16.js",revision:null},{url:"assets/index-59d5250f.css",revision:null},{url:"assets/lodash-a8a01c9e.js",revision:null},{url:"assets/opentype.js-3318d238.js",revision:null},{url:"assets/vue-f1ae2b29.js",revision:null},{url:"assets/workbox-window.prod.es5-ec26ac7e.js",revision:null},{url:"index.html",revision:"d91c060354dea91de6c51cfc7704ca2f"},{url:"./favicon.ico",revision:"041e571db7264be1ed5a6ad5965b4657"},{url:"manifest.webmanifest",revision:"41e2afe7a346b012e64dc5be28362359"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"interface-cache",plugins:[]}),"GET"),e.registerRoute(/(.*?)\.(js|css|ts)/,new e.CacheFirst({cacheName:"js-css-cache",plugins:[]}),"GET"),e.registerRoute(/(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/,new e.CacheFirst({cacheName:"image-cache",plugins:[]}),"GET")}));