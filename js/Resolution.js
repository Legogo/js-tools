
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
