Log = function(){}

//http://stackoverflow.com/questions/690251/what-happened-to-console-log-in-ie8
Log.log = function(s){
  if (!window.console) window.console = {log: function() {}};
  try { console.log(s); } catch (e) { logWarning("LOG : "+s); }
}
Log.console = function(s, type){
  if(type == null)  type = "debug-normal";
  $("<p class='debug-line' id='"+type+"'>"+s+"</p>").prependTo('#console');
}

Log.body = function(info){
  $('<div style="font-size:2em;font-weight:bold">'+info+'</div>').prependTo('body');
}

Log.alert = function(s){
  alert("WARNING<br/>"+s);
}

Log.warning = function(s){
  if(console.warn) console.warn("[WARNING] :: "+s);
  logConsole(s, "debug-warning");
}
