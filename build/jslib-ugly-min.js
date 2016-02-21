function extend(a,b,c,d){a.prototype=b,b.apply(c,d)}var ie=function(){for(var a,b=3,c=document.createElement("div"),d=c.getElementsByTagName("i");c.innerHTML="<!--[if gt IE "+ ++b+"]><i></i><![endif]-->",d[0];);return b>4?b:a}();Display=function(){},Display.fixPNGs=function(){if(9>ie){var a;for(a in document.images)if(document.images[a].src){var b=document.images[a].src;(".png"===b.substr(b.length-4)||".PNG"===b.substr(b.length-4))&&(document.images[a].style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='crop',src='"+b+"')")}}},Loading=function(){this.idx=0},Loading.loadScript=function(a,b){return void 0==a?void(void 0!=b&&b()):void $.getScript(a,b)},Loading.loadScripts=function(a,b,c){return this.idx>=b.length?void c():void this.loadScript(b[a],function(){this.loadScripts(this.idx+1,b,c)})},Log=function(){},Log.log=function(a){window.console||(window.console={log:function(){}});try{console.log(a)}catch(b){logWarning("LOG : "+a)}},Log.console=function(a,b){null==b&&(b="debug-normal"),$("<p class='debug-line' id='"+b+"'>"+a+"</p>").prependTo("#console")},Log.body=function(a){$('<div style="font-size:2em;font-weight:bold">'+a+"</div>").prependTo("body")},Log.alert=function(a){alert("WARNING<br/>"+a)},Log.warning=function(a){console.warn&&console.warn("[WARNING] :: "+a),logConsole(a,"debug-warning")},MathTools=function(){},MathTools.addMissingZeros=function(a){return 10>a?"0"+a:a},MathTools.sign=function(a){return 0>a?-1:a>0?1:0},MathTools.roundTo=function(a,b){return a=Math.floor(a*b),a/=b},MathTools.lerp=function(a,b,c){return a+c*(b-a)},MathTools.inverselerp=function(a,b,c){return(c-a)/(b-a)},Mobile=function(){},Mobile.isMobile=function(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)},Resolution=function(){this.SCREEN_REF_DIMENSIONS={vh:{fhd:{width:1080,height:1920},hd:{width:720,height:1280},med:{width:576,height:1024},low:{width:360,height:640}},hv:{fhd:{width:1920,height:1080},hd:{width:1280,height:720},med:{width:1024,height:576},low:{width:640,height:360}}}},Resolution.getScreenResolution=function(){return screen.width+" x "+screen.height},Resolution.getViewportDimensions=function(){return this.getInnerViewportSize()},Resolution.getViewportDimensionsCinema=function(){return resolution_getViewportClampedByRatio(9/16)},Resolution.getViewportClampedByRatio=function(a){var b=resolution_getViewportDimensions();return b.y=b.x*a,b},Resolution.getClampedDimensions=function(){var a=resolution_getViewportDimensions(),b=a.x>=a.y?SCREEN_REF_DIMENSIONS.hv:SCREEN_REF_DIMENSIONS.vh,c=a.x>=a.y;for(var d in b)if(b.hasOwnProperty(d)){var e=b[d];if(c){if(a.x>=e.width)return e}else if(a.y>=e.height)return e}return null},Resolution.getViewportSize=function(){var a,b;return"undefined"!=typeof window.innerWidth?(a=window.innerWidth,b=window.innerHeight):"undefined"!=typeof document.documentElement&&"undefined"!=typeof document.documentElement.clientWidth&&0!=document.documentElement.clientWidth?(a=document.documentElement.clientWidth,b=document.documentElement.clientHeight):(a=document.getElementsByTagName("body")[0].clientWidth,b=document.getElementsByTagName("body")[0].clientHeight),{x:a,y:b}},Resolution.getInnerViewportSize=function(){var a,b;return"BackCompat"===document.compatMode?(a=document.body.clientHeight,b=document.body.clientWidth):(a=document.documentElement.clientHeight,b=document.documentElement.clientWidth),{x:b,y:a}},Scroll=function(){this.scrollDiv="#scroll",this.onScrollCallback=null,this.touchStart={x:0,y:0},this.touchSolvingDir=!1,this.touchPrevious={x:0,y:0},this.touchDelta={x:0,y:0},this.touchIntervalId=-1};var SCROLL=new Scroll;Scroll.setup=function(a){SCROLL.onScrollCallback=a,Mobile.isMobile()?Scroll.bind_scroll_mobile():Scroll.bind_scroll()},Scroll.bind_scroll_mobile=function(){document.ontouchstart=function(a){a.preventDefault(),Scroll.touchStart=Scroll.extractEventPosition(a)},document.ontouchend=function(a){a.preventDefault(),Scroll.touchPrevious.x=Scroll.touchPrevious.y=0},document.ontouchmove=function(a){a.preventDefault();var b=Scroll.extractEventPosition(a);0==SCROLL.touchPrevious.x&&0==SCROLL.touchPrevious.y&&(SCROLL.touchPrevious.x=SCROLL.touchStart.x,SCROLL.touchPrevious.y=SCROLL.touchStart.y),SCROLL.touchDelta.x=b.x-SCROLL.touchPrevious.x,SCROLL.touchDelta.y=b.y-SCROLL.touchPrevious.y,SCROLL.touchPrevious.x=b.x,SCROLL.touchPrevious.y=b.y,0!=SCROLL.touchDelta.y&&void 0!=SCROLL.onScrollCallback&&SCROLL.onScrollCallback(SCROLL.touchDelta.y)}},Scroll.extractEventPosition=function(a){return{x:a.targetTouches[0].pageX,y:a.targetTouches[0].pageY}},Scroll.bind_scroll=function(){var a=/Firefox/i.test(navigator.userAgent)?"DOMMouseScroll":"mousewheel";document.attachEvent?document.attachEvent("on"+a,Scroll.onWheel):document.addEventListener&&document.addEventListener(a,Scroll.onWheel,!1)},Scroll.bind_scroll_usingDiv=function(){$(this.scrollDiv).bind("scroll",function(a){$t=$(a.target),event_scroll()})},Scroll.onWheel=function(a){var b=window.event||a,c=b.detail?-120*b.detail:b.wheelDelta;SCROLL.onScrollCallback(c)},Scroll.frameToScroll=function(a){var b=a,c=$(scrollDiv),d=c.get(0).scrollHeight-Scroll.getScreenHeight();return Math.floor(b*d)},Scroll.event_scroll=function(){var a=getScrollCurrentFrame();a=roundTo(a,100),SCROLL.onScrollCallback(a)},Scroll.getScrollCurrent=function(){var a=$(scrollDiv),b=a.scrollTop();return b},Scroll.getScrollCurrentFrame=function(){var a=$(scrollDiv),b=a.get(0).scrollHeight-getScreenHeight();return getScrollCurrent()/b},Scroll.getScreenHeight=function(){return Resolution.getViewportDimensions().y},Scroll.preventDefault=function(a){a=a||window.event,a.preventDefault&&a.preventDefault(),a.returnValue=!1},Scroll.preventDefaultForScrollKeys=function(a){return keys[a.keyCode]?(preventDefault(a),!1):void 0},Scroll.disableScroll=function(){window.addEventListener&&window.addEventListener("DOMMouseScroll",preventDefault,!1),window.onwheel=preventDefault,window.onmousewheel=document.onmousewheel=preventDefault,window.ontouchmove=preventDefault,document.onkeydown=preventDefaultForScrollKeys},Scroll.enableScroll=function(){window.removeEventListener&&window.removeEventListener("DOMMouseScroll",preventDefault,!1),window.onmousewheel=document.onmousewheel=null,window.onwheel=null,window.ontouchmove=null,document.onkeydown=null},System=function(){},System.copyToClipboard=function(a){Copied=a.createTextRange(),Copied.execCommand("Copy")},System.onResize=function(a,b){var c={x:0,y:0},d=0,e=-1;window.onresize=function(f){e>-1||(e=setInterval(function(){var a=getInnerViewportSize();(c.x!=a.x||c.y!=a.y)&&(c=a,d=5),d>0&&(d--,0>=d&&(clearInterval(e),e=-1,b()))},a))}},Web=function(){},Web.getUrlLanguage=function(a){document.URL.toLowerCase();return document.URL.indexOf("/fr")>=0||document.URL.indexOf("?fr")>=0?"fr":document.URL.indexOf("/en")>=0||document.URL.indexOf("?en")>=0?"en":document.URL.indexOf("/de")>=0||document.URL.indexOf("?de")>=0?"de":a};