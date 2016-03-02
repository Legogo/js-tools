function extend(a,b,c,d){a.prototype=b,b.apply(c,d)}function Debug(){this.logs=[],this.div,this.dContent,this.dLogs,this.updateLogs=function(){this.dLogs.html("");for(var a=Math.max(0,this.logs.length-10),b="",c=a;c<this.logs.length;c++)b+=c==a?this.logs[c]:"<br>"+this.logs[c];this.dLogs.html(b)},this.html=function(a){this.dContent.html(a)},this.appendContent=function(a){var b=this.dContent.html();b=a+"<br>"+b,this.dContent.html(b)},this.getRefs=function(){if(void 0==this.div){var a="<div id='debug' style='background-color:#333;color:#ddd;z-index:10000;position:fixed;top:0px;left:0px;opacity:0.9;'>";a+="<div id='debug-logs'></div>",a+="<div id='debug-content'></div>",a+="</div>",$("body").append(a),this.div=$("#debug"),this.dContent=$("#debug-content"),this.dLogs=$("#debug-logs")}},this.getRefs()}var ie=function(){for(var a,b=3,c=document.createElement("div"),d=c.getElementsByTagName("i");c.innerHTML="<!--[if gt IE "+ ++b+"]><i></i><![endif]-->",d[0];);return b>4?b:a}(),DEBUG;Debug.update=function(a){DEBUG.html(a)},Debug.append=function(a){DEBUG.appendContent(a)},Debug.log=function(a){DEBUG.logs.push(a),DEBUG.updateLogs()},Debug.setup=function(){DEBUG=new Debug,Debug.setVisibility(System.isLocalhost()),Input.assignKey(32,function(){DEBUG.div.toggle()})},Debug.setVisibility=function(a){a?DEBUG.div.show():DEBUG.div.hide()},Display=function(){},Display.fixPNGs=function(){if(9>ie){var a;for(a in document.images)if(document.images[a].src){var b=document.images[a].src;".png"!==b.substr(b.length-4)&&".PNG"!==b.substr(b.length-4)||(document.images[a].style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='crop',src='"+b+"')")}}},Display.onResize=function(a,b){var c={x:0,y:0},d=0,e=-1;window.onresize=function(f){e>-1||(e=setInterval(function(){var b=Resolution.getInnerViewportSize();c.x==b.x&&c.y==b.y||(c=b,d=3),d>0&&(d--,0>=d&&(clearInterval(e),e=-1,a()))},b))}},Input=function(){},Input.assignKey=function(a,b){document.onkeypress=function(c){var c=window.event||c;c.charCode==a&&void 0!=b&&b()}},Input.click=function(a,b){a.bind("click touchstart",b)},Input.unClick=function(a){a.unbind("click touchstart")},Loading=function(){this.idx=0},Loading.loadScript=function(a,b){return void 0==a?void(void 0!=b&&b()):void $.getScript(a,b)},Loading.loadScripts=function(a,b,c){return this.idx>=b.length?void c():void this.loadScript(b[a],function(){this.loadScripts(this.idx+1,b,c)})},Log=function(){},Log.log=function(a){window.console||(window.console={log:function(){}});try{console.log(a)}catch(b){logWarning("LOG : "+a)}},Log.console=function(a,b){null==b&&(b="debug-normal"),$("<p class='debug-line' id='"+b+"'>"+a+"</p>").prependTo("#console")},Log.body=function(a){$('<div style="font-size:2em;font-weight:bold">'+a+"</div>").prependTo("body")},Log.alert=function(a){alert("WARNING<br/>"+a)},Log.warning=function(a){console.warn&&console.warn("[WARNING] :: "+a),logConsole(a,"debug-warning")},MathTools=function(){},MathTools.addMissingZeros=function(a){return 10>a?"0"+a:a},MathTools.sign=function(a){return 0>a?-1:a>0?1:0},MathTools.roundTo=function(a,b){return a=Math.floor(a*b),a/=b},MathTools.lerp=function(a,b,c){return a+c*(b-a)},MathTools.inverselerp=function(a,b,c){return(c-a)/(b-a)},MathTools.isNumeric=function(){return!isNaN(parseFloat(n))&&isFinite(n)},Mobile=function(){},Resolution=function(){this.SCREEN_REF_DIMENSIONS={vh:{fhd:{width:1080,height:1920},hd:{width:720,height:1280},med:{width:576,height:1024},low:{width:360,height:640}},hv:{fhd:{width:1920,height:1080},hd:{width:1280,height:720},med:{width:1024,height:576},low:{width:640,height:360}}}},Resolution.getScreenResolution=function(){return screen.width+" x "+screen.height},Resolution.getViewportDimensions=function(){return this.getInnerViewportSize()},Resolution.getViewportDimensionsCinema=function(){return resolution_getViewportClampedByRatio(9/16)},Resolution.getViewportClampedByRatio=function(a){var b=Resolution.getViewportDimensions();return b.y=b.x*a,b},Resolution.getScreenDimensionsByRatio=function(a,b){var c=Resolution.getViewportDimensions(),d=a/b,e=c.x/c.y,f={x:0,y:0};return d>e?(f.x=c.x,f.y=c.x/d):(f.y=c.y,f.x=c.y*d),f},Resolution.getClampedDimensions=function(){var a=Resolution.getViewportDimensions(),b=a.x>=a.y?SCREEN_REF_DIMENSIONS.hv:SCREEN_REF_DIMENSIONS.vh,c=a.x>=a.y;for(var d in b)if(b.hasOwnProperty(d)){var e=b[d];if(c){if(a.x>=e.width)return e}else if(a.y>=e.height)return e}return null},Resolution.getViewportSize=function(){var a,b;return"undefined"!=typeof window.innerWidth?(a=window.innerWidth,b=window.innerHeight):"undefined"!=typeof document.documentElement&&"undefined"!=typeof document.documentElement.clientWidth&&0!=document.documentElement.clientWidth?(a=document.documentElement.clientWidth,b=document.documentElement.clientHeight):(a=document.getElementsByTagName("body")[0].clientWidth,b=document.getElementsByTagName("body")[0].clientHeight),{x:a,y:b}},Resolution.getInnerViewportSize=function(){var a,b;return"BackCompat"===document.compatMode?(a=document.body.clientHeight,b=document.body.clientWidth):(a=document.documentElement.clientHeight,b=document.documentElement.clientWidth),{x:b,y:a}},Scroll=function(){this.scrollDiv="#scroll",this.scrollCallback=null,this.touchStart={x:0,y:0},this.touchSolvingDir=!1,this.touchPrevious={x:0,y:0},this.touchDelta={x:0,y:0},this.scrollIntervalId=-1,this.scrollCount=0,this.touchMobile=!1,this.solvedDelta=0,this.scrollIntervalUpate=function(a){return function(b){a.scrollCount>0&&SCROLL.scrollCallback(a.solvedDelta),a.scrollCount=0}},this.scrollIntervalId=setInterval(this.scrollIntervalUpate(this),50)};var SCROLL=new Scroll;Scroll.setup=function(a){SCROLL.scrollCallback=a,SCROLL.touchMobile=System.isMobile(),Scroll.bind_scroll_mobile(),Scroll.bind_scroll()},Scroll.allowToScroll=function(a){var b=a.toString(),c=!1;return b.indexOf("HtmlElement")>-1?!1:!c&&$(a).hasClass("noScroll")?!1:!c},Scroll.preventScrollingEvent=function(a){return Scroll.allowToScroll(a)?!!$(a).hasClass("scrollPrevent"):!0},Scroll.bind_scroll_mobile=function(){document.ontouchstart=function(a){Scroll.allowToScroll(a.target)&&(Scroll.preventScrollingEvent(a.target)&&Scroll.preventDefault(a),Scroll.touchStart=Scroll.extractEventPosition(a))},document.ontouchend=function(a){Scroll.allowToScroll(a.target)&&(Scroll.preventScrollingEvent(a.target)&&Scroll.preventDefault(a),Scroll.touchPrevious.x=Scroll.touchPrevious.y=0)},document.ontouchmove=function(a){if(Scroll.allowToScroll(a.target)){Scroll.preventScrollingEvent(a.target)&&Scroll.preventDefault(a);var b=Scroll.extractEventPosition(a);0==SCROLL.touchPrevious.x&&0==SCROLL.touchPrevious.y&&(SCROLL.touchPrevious.x=SCROLL.touchStart.x,SCROLL.touchPrevious.y=SCROLL.touchStart.y),SCROLL.touchDelta.x=b.x-SCROLL.touchPrevious.x,SCROLL.touchDelta.y=b.y-SCROLL.touchPrevious.y,SCROLL.touchPrevious.x=b.x,SCROLL.touchPrevious.y=b.y;var c=Math.abs(SCROLL.touchDelta.y);0!=c&&50>c&&Scroll.onScrollStep(SCROLL.touchDelta.y)}}},Scroll.extractEventPosition=function(a){return{x:a.targetTouches[0].pageX,y:a.targetTouches[0].pageY}},Scroll.bind_scroll=function(){var a=(document.documentElement,/Firefox/i.test(navigator.userAgent)?"DOMMouseScroll":"mousewheel");document.attachEvent?document.attachEvent("on"+a,Scroll.onWheel):document.addEventListener&&document.addEventListener(a,Scroll.onWheel,!1)},Scroll.onMouseUp=function(a){console.log("mouse up !")},Scroll.onMouseDown=function(a){console.log("mouse down")},Scroll.onWheel=function(a){var b=window.event||a;if(Scroll.allowToScroll(b.target)){Scroll.preventScrollingEvent(b.target)&&Scroll.preventDefault(b);var c=b.detail?-120*b.detail:b.wheelDelta;Scroll.onScrollStep(c)}},Scroll.onScrollStep=function(a){Math.abs(a)<10||(SCROLL.scrollCount++,SCROLL.solvedDelta=a)},Scroll.preventDefault=function(a){a=a||window.event,a.preventDefault&&a.preventDefault(),a.returnValue=!1},Scroll.disableScroll=function(){window.addEventListener&&window.addEventListener("DOMMouseScroll",preventDefault,!1),window.onwheel=preventDefault,window.onmousewheel=document.onmousewheel=preventDefault,window.ontouchmove=preventDefault,document.onkeydown=preventDefaultForScrollKeys},Scroll.enableScroll=function(){window.removeEventListener&&window.removeEventListener("DOMMouseScroll",preventDefault,!1),window.onmousewheel=document.onmousewheel=null,window.onwheel=null,window.ontouchmove=null,document.onkeydown=null},System=function(){},System.copyToClipboard=function(a){Copied=a.createTextRange(),Copied.execCommand("Copy")},System.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)},System.isLocalhost=function(){var a=Web.getUrl();return a.indexOf("localhost")>-1?!0:a.indexOf("file:///")>-1?!0:a.indexOf("Users/")>-1?!0:a.indexOf("192.168")>-1},System.isMacbook=function(){},System.isMobile=function(){return/Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent||navigator.vendor||window.opera)},System.isTouchDevice=function(){try{return document.createEvent("TouchEvent"),!0}catch(a){return!1}return!1},Web=function(){},Web.getUrl=function(){return document.URL.toLowerCase()},Web.getUrlLanguage=function(a){document.URL.toLowerCase();return document.URL.indexOf("/fr")>=0||document.URL.indexOf("?fr")>=0?"fr":document.URL.indexOf("/en")>=0||document.URL.indexOf("?en")>=0?"en":document.URL.indexOf("/de")>=0||document.URL.indexOf("?de")>=0?"de":a},Web.getUrlParam=function(){var a=Web.getUrl(),b=a.split("/");return b=b[b.length-1].split("?"),b[b.length-1]};