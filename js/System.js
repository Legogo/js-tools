var SYSTEM;

var orientationData = {
  rotation : 10000,
  width : 10000,
  height : 10000
}

System = function(){
  this.rotationSwitchCallback;
  this.rotationLandCallback;
  this.rotationPortCallback;
}

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

System.bindRotation = function(onSwitch, onPortrait, onLandscape){
  if(SYSTEM == null) SYSTEM = new System();

  SYSTEM.rotationPortCallback = onPortrait;
  SYSTEM.rotationLandCallback = onLandscape;
  SYSTEM.rotationSwitchCallback = onSwitch;

  window.onresize = function(event){
    System.onDeviceRotation();
  }

  $(window).on({resize:function(e){
    System.onDeviceRotation();
  }});
  
  //var eventName = "orientationchange";
  if (document.attachEvent) {
    //if IE (and Opera depending on user setting)
    
    document.attachEvent("orientationchange", System.onDeviceRotation);
    //document.attachEvent("deviceorientation", System.onDeviceRotation);
    //document.attachEvent("resize", System.onDeviceRotation);

  }else if (document.addEventListener){
    //WC3 browsers

    document.addEventListener("orientationchange", System.onDeviceRotation, false);
    //document.addEventListener("deviceorientation", System.onDeviceRotation, false);
    //document.addEventListener("resize", System.onDeviceRotation, false);
  }

  //System.onDeviceRotation();
}

System.isLandscape = function(){
  return Math.abs(window.orientation) == 90;
}
System.isPortrait = function(){
  return window.orientation == 0 || window.orientation == 180;
}

//function(event(){event.orientation}
System.onDeviceRotation = function(){
  //if(SYSTEM == undefined) return;

  var deg = parseInt(window.orientation);

  if(deg != orientationData.rotation || orientationData.width != window.innerWidth || orientationData.height != window.innerHeight){
    
    orientationData.rotation = deg;
    orientationData.width = window.innerWidth;
    orientationData.height = window.innerHeight;

    if(SYSTEM.rotationSwitchCallback != undefined) SYSTEM.rotationSwitchCallback();
    
    //-90 ou 90
    if(Math.abs(deg) == 90){
      if(SYSTEM.rotationLandCallback != undefined) SYSTEM.rotationLandCallback();
    }

    if(deg == 0 || deg == 180){
      if(SYSTEM.rotationPortCallback != undefined) SYSTEM.rotationPortCallback();
    }
  }
  
}

System.getBrowserInfoData = function(){
  var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
  if(/trident/i.test(M[1])){
      tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
      return {name:'IE',version:(tem[1]||'')};
      }   
  if(M[1]==='Chrome'){
      tem=ua.match(/\bOPR\/(\d+)/)
      if(tem!=null)   {return {name:'Opera', version:tem[1]};}
      }   
  M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
  if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
  return {
    name: M[0],
    version: M[1]
  };
}

System.getBrowserInfo = function(){
  //var info = System.getBrowserInfoData();
  //return info["name"]+" : "+info["version"];

  var info = System.getBrowserInfoRaw();
  return "appName = "+info["appName"]+" <br/> appVersion = "+info["appVersion"]+" <br/> userAgent = "+info["userAgent"];
}

System.getBrowserInfoRaw = function(){
  return {"appName":navigator.appName, "appVersion":navigator.appVersion, "userAgent":navigator.userAgent};
}
