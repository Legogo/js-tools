function Debug(){}

var DEBUG;

Debug.update = function(info){
  if(DEBUG == undefined){
    //DEBUG = document.getElementById("debug");
    DEBUG = $("#debug");
    if(DEBUG == undefined){
      $("body").append("<div id='debug'></div>");
    }
    
    DEBUG = $("#debug");
  }
  
  $("#debug").html(info);
}

Debug.setup = function(){
  
  Debug.setVisibility(Debug.isLocalhost());
  
  Input.assignKey(32, function(){
    $("#debug").toggle();
  });
}

Debug.setVisibility = function(flag){
  if(flag) $("#debug").show();
  else $("#debug").hide();
}

Debug.isLocalhost = function(){
  var url = Web.getUrl();
  if(url.indexOf("localhost") > -1) return true;
  if(url.indexOf("file:///") > -1) return true;
  if(url.indexOf("Users/") > -1) return true;
  return false;
}