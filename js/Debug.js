var DEBUG;

function Debug(){
  this.logs = [];
  
  this.div;
  this.dContent;
  this.dLogs;

  this.updateLogs = function(){
    this.dLogs.html("");
    
    var start = Math.max(0, this.logs.length-10);

    var ct = "";
    for(var i = start; i < this.logs.length; i++){
      if(i == start) ct += this.logs[i];
      else ct += "<br>"+this.logs[i];
    }

    this.dLogs.html(ct);
  }

  this.html = function(str){
    this.dContent.html(str);
  }

  this.appendContent = function(str){
    //console.log(str);
    var ct = this.dContent.html();
    
    //au debut
    ct = str+"<br>"+ct;

    this.dContent.html(ct);
  }

  this.getRefs = function(){
    if(this.div == undefined){

      var div = "<div id='debug' style='background-color:#333;color:#ddd;z-index:10000;position:fixed;top:0px;left:0px;opacity:0.9;'>";
      div += "<div id='debug-logs'></div>";
      div += "<div id='debug-content'></div>";
      div += "</div>";
      $("body").append(div);
      
      this.div = $("#debug");
      this.dContent = $("#debug-content");
      this.dLogs = $("#debug-logs");
    }
  }

  this.getRefs();
}

Debug.update = function(str){
  if(DEBUG == null) DEBUG = new Debug();
  DEBUG.html(str);
}

Debug.append = function(str){
  if(DEBUG == null) DEBUG = new Debug();
  //console.log("append "+str);
  DEBUG.appendContent(str);
}

Debug.log = function(str){
  if(DEBUG == null) DEBUG = new Debug();
  //console.log(DEBUG);
  DEBUG.logs.push(str);
  DEBUG.updateLogs();
}

Debug.setup = function(toggleKeyCode){
  //console.log("{Debug} setup()");
  DEBUG = new Debug();

  //console.log("localhost ? "+System.isLocalhost());
  Debug.setVisibility(System.isLocalhost());
  
  //console.log(DEBUG.div.is(":visible"));console.log(DEBUG.div);

  if(toggleKeyCode != undefined){
    Input.assignKey(toggleKeyCode, function(){
      DEBUG.div.toggle();
    });  
  }
  
}

Debug.setVisibility = function(flag){
  if(flag) DEBUG.div.show();
  else DEBUG.div.hide();
}

Debug.hide = function(){
  Debug.setVisibility(false);
}
Debug.show = function(){
  Debug.setVisibility(true);
}