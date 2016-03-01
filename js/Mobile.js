Mobile = function(){}
Mobile.isMobile = function(){ return ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ); }

//http://stackoverflow.com/questions/3845445/how-to-get-the-scroll-bar-with-css-overflow-on-ios
Mobile.isTouchDevice = function(){
  try{
    document.createEvent("TouchEvent");
    return true;
  }catch(e){
    return false;
  }

  return false;
}