function Debug(){}

var DEBUG;

Debug.checkForDiv = function(){
  if(DEBUG == undefined){
    //DEBUG = document.getElementById("debug");
    DEBUG = $("#debug");
    if(DEBUG == undefined){
      $("body").append("<div id='debug' style='z-index:10000;width:300px;'></div>");
    }
    
    DEBUG = $("#debug");
  }
}

Debug.update = function(str){
  Debug.checkForDiv();
  DEBUG.html(str);
}


Debug.append = function(str, limit){
  if(limit == undefined) limit = 0;

  Debug.checkForDiv();
  
  var ct = DEBUG.html();
  ct += "<br>"+str;

  if(limit > 0){
    var lines = ct.split("<br>");

    limit = Math.min(limit, lines.length);
    lines = lines.slice(lines.length-limit, lines.length);

    ct = "";
    var count = 0;
    for(var i = 0; i < lines.length; i++){
      if(lines[i].length > 0){
        ct += "<br>"+lines[i];
      }
    }
  }

  DEBUG.html(ct);
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