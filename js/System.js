System = function(){}

/* only for IE */
System.copyToClipboard = function(txt) {
  Copied = txt.createTextRange();
  Copied.execCommand("Copy");
}

System.isArray = function(obj){
  return(Object.prototype.toString.call( obj ) === '[object Array]');
}

System.isLocalhost = function(){
  var url = Web.getUrl();
  if(url.indexOf("localhost") > -1) return true;
  if(url.indexOf("file:///") > -1) return true;
  if(url.indexOf("Users/") > -1) return true;
  if(url.indexOf("192.168") > -1) return true;
  return false;
}

System.isMacbook = function(){

}
System.isMobile = function(){ 
  //return ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) );
  return (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera);
}

//http://stackoverflow.com/questions/3845445/how-to-get-the-scroll-bar-with-css-overflow-on-ios
System.isTouchDevice = function(){
  try{
    document.createEvent("TouchEvent");
    return true;
  }catch(e){
    return false;
  }

  return false;
}