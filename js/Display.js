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
