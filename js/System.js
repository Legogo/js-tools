System = function(){}

/* only for IE */
System.copyToClipboard = function(txt) {
  Copied = txt.createTextRange();
  Copied.execCommand("Copy");
}

System.onResize = function(intervalTime, callback){

  var prevSize = {x:0,y:0};
  var modified = false;
  var modifiedFrameTimer = 0;
  var itv = -1;

  window.onresize = function(event){
    //already resizing
    if(itv > -1) return;
    
    itv = setInterval(function(){

      var size = getInnerViewportSize();

      //on capte quand ça commence à resize
      if(prevSize.x != size.x || prevSize.y != size.y){
        prevSize = size;
        modifiedFrameTimer = 5;
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
