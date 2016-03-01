
//----------------------------------------------------------
//A short snippet for detecting versions of IE in JavaScript
//without resorting to user-agent sniffing
//----------------------------------------------------------
//If you're not in IE (or IE version is less than 5) then:
//  ie === undefined
//If you're in IE (>=5) then you can determine which version:
//  ie === 7; // IE7
//Thus, to detect IE:
//  if (ie) {}
//And to detect the version:
//  ie === 6 // IE6
//  ie > 7 // IE8, IE9 ...
//  ie < 9 // Anything less than IE9
//----------------------------------------------------------

//UPDATE: Now using Live NodeList idea from @jdalton

var ie = (function(){
  var undef,v = 3,div = document.createElement('div'),all = div.getElementsByTagName('i');
  while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',all[0]);
  return v > 4 ? v : undef;
}());

//inheritance
//http://stackoverflow.com/questions/7486825/javascript-inheritance
function extend(b,a,t,p) { b.prototype = a; a.apply(t,p); }

Display = function(){}


Display.fixPNGs = function(){
  if( ie < 9){ 
    var i;
    //alert(document.images.length);
    for(i in document.images){
      if(document.images[i].src){
        var imgSrc = document.images[i].src;
        if(imgSrc.substr(imgSrc.length-4) === '.png' || imgSrc.substr(imgSrc.length-4) === '.PNG'){
        document.images[i].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='crop',src='" + imgSrc + "')";
        }
      }
    }   
  }
}


Display.onResize = function(callback, intervalTime){
  
  var prevSize = {x:0,y:0};
  var modified = false;
  var modifiedFrameTimer = 0; // count time before sending callback, so that it doesnt spam when changing size of the browser
  var itv = -1;

  window.onresize = function(event){
    //already resizing
    if(itv > -1) return;
    
    itv = setInterval(function(){

      var size = Resolution.getInnerViewportSize();

      //on capte quand ça commence à resize
      if(prevSize.x != size.x || prevSize.y != size.y){
        prevSize = size;
        modifiedFrameTimer = 3;
      }
      
      if(modifiedFrameTimer > 0){
        modifiedFrameTimer--;
        if(modifiedFrameTimer <= 0){
          clearInterval(itv);
          itv = -1;
          callback();
        }
      }
      
    }, intervalTime);
  };

}

Input = function(){}


Input.assignKey = function(charCode, callback){

  //http://www.javascriptkit.com/jsref/eventkeyboardmouse.shtml
  document.onkeypress=function(e){
    //console.log(e);console.log(charCode);
    var e=window.event || e;
    if(e.charCode == charCode){
      if(callback != undefined) callback();
    }

    //alert("CharCode value: "+e.charCode);
    //alert("Character: "+String.fromCharCode(e.charCode));
  }

}
Loading = function(){
  this.idx = 0;
}

//http://stackoverflow.com/questions/950087/how-to-include-a-javascript-file-in-another-javascript-file
Loading.loadScript = function(url, callback)
{
  if(url == undefined){
    if(callback != undefined)  callback();
    return;
  }
  //log("<tools> loadScript("+url+")");
  $.getScript(url, callback);
}

Loading.loadScripts = function(idx, scriptList, callback){
  
  //console.log("loadScripts :: idx:"+idx+" / total:"+scriptList.length);
  if(this.idx >= scriptList.length){
    //console.log("loaded "+idx+" scripts, callback ? "+callback);
    callback();
    return;
  }
  
  this.loadScript(scriptList[idx], function(){
    //console.log("tools :: loaded script "+scriptList[idx]);
    this.loadScripts(this.idx + 1, scriptList, callback);
  });
}

Log = function(){}

//http://stackoverflow.com/questions/690251/what-happened-to-console-log-in-ie8
Log.log = function(s){
  if (!window.console) window.console = {log: function() {}};
  try { console.log(s); } catch (e) { logWarning("LOG : "+s); }
}
Log.console = function(s, type){
  if(type == null)  type = "debug-normal";
  $("<p class='debug-line' id='"+type+"'>"+s+"</p>").prependTo('#console');
}

Log.body = function(info){
  $('<div style="font-size:2em;font-weight:bold">'+info+'</div>').prependTo('body');
}

Log.alert = function(s){
  alert("WARNING<br/>"+s);
}

Log.warning = function(s){
  if(console.warn) console.warn("[WARNING] :: "+s);
  logConsole(s, "debug-warning");
}

MathTools = function(){}

MathTools.addMissingZeros = function(val){if(val < 10) return "0"+val;return val;}
MathTools.sign = function(x){if(x < 0) return -1;else if(x > 0)  return 1;return 0;}
MathTools.roundTo = function(val, decimal){val = Math.floor(val * decimal);val = val / decimal;return val;}
MathTools.lerp = function(a,b,amount){ return a + amount * (b-a); }
MathTools.inverselerp = function(a,b,amount){ return (amount - a) / (b-a); }

MathTools.isNumeric = function(){
  return !isNaN(parseFloat(n)) && isFinite(n);
}
Mobile = function(){}
Mobile.isMobile = function(){ return ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ); }



Resolution = function(){
  this.SCREEN_REF_DIMENSIONS = {
    //plus haut que large
    vh:{
      fhd:{width:1080,height:1920},
      hd:{width:720,height:1280},
      med:{width:576,height:1024},
      low:{width:360,height:640}
    },

    //plus large que haut
    hv:{
      fhd:{width:1920,height:1080}, // big desktop
      hd:{width:1280,height:720}, // windowed
      med:{width:1024,height:576}, // ipad
      low:{width:640,height:360} // iphone
    }
  }
}

Resolution.getScreenResolution = function(){ return screen.width+" x "+screen.height; }
Resolution.getViewportDimensions = function(){ return this.getInnerViewportSize(); }
Resolution.getViewportDimensionsCinema = function(){ return resolution_getViewportClampedByRatio(9/16); }
Resolution.getViewportClampedByRatio = function(ratio){
  var dim = Resolution.getViewportDimensions();
  dim.y = dim.x * ratio;
  return dim;
}

Resolution.getScreenDimensionsByRatio = function(refWidth,refHeight){
  var dim = Resolution.getViewportDimensions();
  var ratio = (refWidth / refHeight);
  var dimRatio = dim.x / dim.y;

  var solved = {x:0,y:0};
  
  if(ratio > dimRatio){
    solved.x = dim.x;
    solved.y = dim.x / ratio;
  }else{
    solved.y = dim.y;
    solved.x = dim.y * ratio;
  }

  return solved;
}

  /* output ideal {w,h} based on device */
Resolution.getClampedDimensions = function(){
  var dim = Resolution.getViewportDimensions();

  var ref = (dim.x >= dim.y) ? SCREEN_REF_DIMENSIONS.hv : SCREEN_REF_DIMENSIONS.vh;
  var compareHorizontal = (dim.x >= dim.y);

  for(var key in ref){
    if(!ref.hasOwnProperty(key)) continue;

    var val = ref[key];

    if(compareHorizontal){
      //log(compareHorizontal+","+val.width+","+dim.x);
      if(dim.x >= val.width){
        //if(dim.y >= val.height) return val;
        return val;
      }
    }else{
      //log(compareHorizontal+","+val.height+","+dim.y);
      if(dim.y >= val.height){
        //if(dim.x >= val.width) return val;
        return val;
      }
    }
  }

  return null;
}


Resolution.getViewportSize = function(){
  var w;
  var h;
  
  // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
  
  if (typeof window.innerWidth != 'undefined')
  {
    w = window.innerWidth,
    h = window.innerHeight
  }
  
  // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
 
  else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0)
  {
    w = document.documentElement.clientWidth,
    h = document.documentElement.clientHeight
  }
  
  // older versions of IE
  
  else
  {
    w = document.getElementsByTagName('body')[0].clientWidth,
    h = document.getElementsByTagName('body')[0].clientHeight
  }

  return {x:w,y:h};
}

Resolution.getInnerViewportSize = function(){
  //var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  //var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  //var w = $(window).width();
  //var h = $(window).height();
  var h;
  var w;
  if (document.compatMode === 'BackCompat') {
    h = document.body.clientHeight;
    w = document.body.clientWidth;
  } else {
    h = document.documentElement.clientHeight;
    w = document.documentElement.clientWidth;
  }

  return {x:w,y:h};
}

Scroll = function(){
  this.scrollDiv = "#scroll";
  this.onScrollCallback = null;
  this.touchStart = {x:0,y:0};
  this.touchSolvingDir = false;
  this.touchPrevious = {x:0,y:0};
  this.touchDelta = {x:0,y:0};
  this.touchIntervalId = -1;
}

var SCROLL = new Scroll();

Scroll.setup = function(callback){
  SCROLL.onScrollCallback = callback;
  if(Mobile.isMobile()) Scroll.bind_scroll_mobile();
  else Scroll.bind_scroll();
}

Scroll.bind_scroll_mobile = function(){

  //disable touch capacity on mobile
  document.ontouchstart = function(e){
    e.preventDefault()
    //logDebug("TOUCH");
    Scroll.touchStart = Scroll.extractEventPosition(e);
  }
  document.ontouchend = function(e){
    e.preventDefault();
    //logDebug("RELEASE");
    Scroll.touchPrevious.x = Scroll.touchPrevious.y = 0;
  }

  /* pagex et pagey sont exprimé dans la position du body, pas de l'écran */
  document.ontouchmove = function(e){
    e.preventDefault();

    var pos = Scroll.extractEventPosition(e);

    if(SCROLL.touchPrevious.x == 0 && SCROLL.touchPrevious.y == 0){
      SCROLL.touchPrevious.x = SCROLL.touchStart.x;
      SCROLL.touchPrevious.y = SCROLL.touchStart.y;
    }

    //touchDelta.x = pos.x - touchStart.x;touchDelta.y = pos.y - touchStart.y;
    SCROLL.touchDelta.x = pos.x - SCROLL.touchPrevious.x;
    SCROLL.touchDelta.y = pos.y - SCROLL.touchPrevious.y;

    SCROLL.touchPrevious.x = pos.x;
    SCROLL.touchPrevious.y = pos.y;

    if(SCROLL.touchDelta.y != 0 && SCROLL.onScrollCallback != undefined){
      SCROLL.onScrollCallback(SCROLL.touchDelta.y);
    }
  }

}

Scroll.extractEventPosition = function(event){ return {x:event.targetTouches[0].pageX,y:event.targetTouches[0].pageY}; }

Scroll.bind_scroll = function(){
  var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
  if (document.attachEvent) {
    //if IE (and Opera depending on user setting)
    document.attachEvent("on"+mousewheelevt, Scroll.onWheel)
  }else if (document.addEventListener){
    //WC3 browsers
    document.addEventListener(mousewheelevt, Scroll.onWheel, false)
  }
}
  
Scroll.bind_scroll_usingDiv = function(){
  //log("bing to "+scrollDiv);
  $(this.scrollDiv).bind("scroll", function(e){
    $t = $(e.target);
    event_scroll();
  });
}

Scroll.onWheel = function(e){
    //console.log("onWheel");
  var evt=window.event || e //equalize event object
  var delta=evt.detail? evt.detail*(-120) : evt.wheelDelta //check for detail first so Opera uses that instead of wheelDelta
  //document.getElementById("wheelvalue").innerHTML=delta //delta returns +120 when wheel is scrolled up, -120 when down
  SCROLL.onScrollCallback(delta);
}

Scroll.frameToScroll = function(frame){
  var perc = frame;
  var elmt = $(scrollDiv);
  var total = elmt.get(0).scrollHeight - Scroll.getScreenHeight();
  return Math.floor(perc * total);
}

  /* retourne une valeur entre [0,1] */
Scroll.event_scroll = function(){
  var progress = getScrollCurrentFrame();
  progress = roundTo(progress, 100);
  SCROLL.onScrollCallback(progress);
}

  /* output en px de haut */
Scroll.getScrollCurrent = function(){
  var elmt = $(scrollDiv);
  var s = elmt.scrollTop();
  return s;
}

Scroll.getScrollCurrentFrame = function(){
  var elmt = $(scrollDiv);
  var total = elmt.get(0).scrollHeight - getScreenHeight();
  return getScrollCurrent() / total; // [0,1]
}

Scroll.getScreenHeight = function(){ return Resolution.getViewportDimensions().y; }

Scroll.preventDefault = function(e) {
  e = e || window.event;
  if (e.preventDefault) e.preventDefault();
  e.returnValue = false;  
}

Scroll.preventDefaultForScrollKeys = function(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

Scroll.disableScroll = function() {
  //older FF
  if (window.addEventListener) window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

Scroll.enableScroll = function() {
  if (window.removeEventListener) window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.onmousewheel = document.onmousewheel = null;
  window.onwheel = null;
  window.ontouchmove = null;
  document.onkeydown = null;
}



System = function(){}

/* only for IE */
System.copyToClipboard = function(txt) {
  Copied = txt.createTextRange();
  Copied.execCommand("Copy");
}

System.isArray = function(obj){
  return(Object.prototype.toString.call( obj ) === '[object Array]');
}
Web = function(){}

Web.getUrl = function(){
  return document.URL.toLowerCase();
}

Web.getUrlLanguage = function(deflt){
  var url = document.URL.toLowerCase();
  if(document.URL.indexOf("/fr") >= 0 || document.URL.indexOf("?fr") >= 0) return "fr";
  if(document.URL.indexOf("/en") >= 0 || document.URL.indexOf("?en") >= 0) return "en";
  if(document.URL.indexOf("/de") >= 0 || document.URL.indexOf("?de") >= 0) return "de";
  return deflt;
}
