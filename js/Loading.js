Loading = function(){
  this.idx = 0;
}

//http://stackoverflow.com/questions/950087/how-to-include-a-javascript-file-in-another-javascript-file
Loading.loadScript = function(url, callback)
{
  if(url == undefined){
    if(callback != undefined)  callback();
    return;
  }
  //log("<tools> loadScript("+url+")");
  $.getScript(url, callback);
}

Loading.loadScripts = function(idx, scriptList, callback){
  
  //console.log("loadScripts :: idx:"+idx+" / total:"+scriptList.length);
  if(this.idx >= scriptList.length){
    //console.log("loaded "+idx+" scripts, callback ? "+callback);
    callback();
    return;
  }
  
  this.loadScript(scriptList[idx], function(){
    //console.log("tools :: loaded script "+scriptList[idx]);
    this.loadScripts(this.idx + 1, scriptList, callback);
  });
}
