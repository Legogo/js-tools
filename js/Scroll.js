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


