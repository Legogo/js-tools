Scroll = function(){
  this.scrollDiv = "#scroll";
  this.scrollCallback = null;
  this.touchStart = {x:0,y:0};
  this.touchSolvingDir = false;
  this.touchPrevious = {x:0,y:0};
  this.touchDelta = {x:0,y:0};

  //permet de capter la vitesse de scroll
  this.useScrollInterval = false;
  this.scrollIntervalTime = 100;
  this.scrollIntervalId = -1;
  this.scrollCount = 0;

  this.touchMobile = false;
  this.solvedDelta = 0;

  this.mouseValues = [120,240,360,420,720,840,960,1080,1320,1680,1800,1920,2040,2280,2640,5520,7320];

  this.scrollIntervalUpate = function(handle){
    return function(e){
      if(handle.scrollCount > 0){
        //console.log(handle.scrollCount);
        //Debug.append("count ? "+handle.scrollCount);
        SCROLL.scrollCallback(handle.solvedDelta);
      }
      handle.scrollCount = 0;
    }
  }

  this.scrollIntervalId = setInterval(this.scrollIntervalUpate(this), this.scrollIntervalTime);
}

var SCROLL = new Scroll();

Scroll.setup = function(callback){
  SCROLL.scrollCallback = callback;
  SCROLL.touchMobile = System.isMobile();

  //if(SCROLL.touchMobile) Scroll.bind_scroll_mobile(); else Scroll.bind_scroll();
  
  Scroll.bind_scroll_mobile();
  Scroll.bind_scroll();

}

Scroll.allowToScroll = function(obj){
  var identifier = obj.toString();
  
  //console.log(obj);console.log(obj.nodeType);

  //Debug.append("allowToScroll :: touch ? "+obj.nodeType);

  var noScroll = false;

  if(identifier.indexOf("HtmlElement") > -1){
    return false;
  }

  if(!noScroll){
    if($(obj).hasClass("noScroll")){
      return false;
    }
  }

  if(noScroll){
    return false;
  }

  return true;
}

Scroll.preventScrollingEvent = function(obj){
  if(!Scroll.allowToScroll(obj)) return true;
  if($(obj).hasClass("scrollPrevent")){
    return true;
  }
  return false;
}

Scroll.bind_scroll_mobile = function(){

  //disable touch capacity on mobile
  document.ontouchstart = function(e){
    //Debug.append("touch start");
    if(!Scroll.allowToScroll(e.target)) return;
    if(Scroll.preventScrollingEvent(e.target)){
      Scroll.preventDefault(e);
    }

    Scroll.touchStart = Scroll.extractEventPosition(e);
  }
  document.ontouchend = function(e){
    //Debug.append("touch end");
    if(!Scroll.allowToScroll(e.target)) return;
    if(Scroll.preventScrollingEvent(e.target)){
      Scroll.preventDefault(e);
    }

    //logDebug("RELEASE");
    Scroll.touchPrevious.x = Scroll.touchPrevious.y = 0;
  }

  /* pagex et pagey sont exprimé dans la position du body, pas de l'écran */
  document.ontouchmove = function(e){
    //Debug.append("touch move");
    if(!Scroll.allowToScroll(e.target)) return;
    if(Scroll.preventScrollingEvent(e.target)){
      Scroll.preventDefault(e);
    }

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

    var delta = Math.abs(SCROLL.touchDelta.y);

    if(delta != 0 && delta < 50){
      Scroll.onScrollStep(SCROLL.touchDelta.y);
    }

  }

}

Scroll.extractEventPosition = function(event){ return {x:event.targetTouches[0].pageX,y:event.targetTouches[0].pageY}; }

Scroll.bind_scroll = function(){
  
  var doc = document.documentElement;

  var eventName = (/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
  if (document.attachEvent) {
    //if IE (and Opera depending on user setting)
    document.attachEvent("on"+eventName, Scroll.onWheel)
  }else if (document.addEventListener){
    //WC3 browsers
    document.addEventListener(eventName, Scroll.onWheel, false)
  }

  /*
  eventName = "mousedown";
  if(document.attachEvent){
    document.attachEvent("on"+eventName, Scroll.onMouseDown);
  }else if(document.addEventListener){
    document.addEventListener(eventName, Scroll.onMouseDown, false);
  }

  eventName = "mouseup";
  if(document.attachEvent){
    document.attachEvent("on"+eventName, Scroll.onMouseUp);
  }else if(document.addEventListener){
    document.addEventListener(eventName, Scroll.onMouseUp, false);
  }
  */
}

Scroll.onMouseUp = function(e){
  console.log("mouse up !");
}
Scroll.onMouseDown = function(e){
  console.log("mouse down");
}

/* called by wheel listener (not mobile) */
Scroll.onWheel = function(e){
    //console.log("onWheel");
  var evt=window.event || e //equalize event object

  if(!Scroll.allowToScroll(evt.target)) return;
  if(Scroll.preventScrollingEvent(evt.target)){
    Scroll.preventDefault(evt);
  }

  var delta=evt.detail? evt.detail*(-120) : evt.wheelDelta //check for detail first so Opera uses that instead of wheelDelta
  //document.getElementById("wheelvalue").innerHTML=delta //delta returns +120 when wheel is scrolled up, -120 when down

  Scroll.onScrollStep(delta);
}

/* called both by mobile and desktop */
Scroll.onScrollStep = function(delta){
  
  var dlt = Math.abs(delta);

  if(!SCROLL.useScrollInterval){
    SCROLL.scrollCallback(delta);
    return;
  }
  
  //souris PC
  if(SCROLL.mouseValues.indexOf(dlt) > -1){
    SCROLL.scrollCallback(delta);
    return;
  }
  
  //on mac touchpad there is inertia in movement that gives a delta decreasing toward 0
  //under 10 it's almost done
  //a big movement is around [50,200]
  
  SCROLL.scrollCount++;
  SCROLL.solvedDelta = delta;
  
  //if(SCROLL.scrollCount > 3) return;
  //SCROLL.scrollCallback(delta);
}

Scroll.preventDefault = function(e) {
  e = e || window.event;
  if (e.preventDefault) e.preventDefault();
  e.returnValue = false;  
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
