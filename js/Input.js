Input = function(){}


Input.assignKey = function(charCode, callback){

  //http://www.javascriptkit.com/jsref/eventkeyboardmouse.shtml
  document.onkeypress=function(e){
    //console.log(e);console.log(charCode);
    var e=window.event || e;
    if(e.charCode == charCode){
      if(callback != undefined) callback();
    }

    //alert("CharCode value: "+e.charCode);
    //alert("Character: "+String.fromCharCode(e.charCode));
  }

}

Input.click = function(elmt, callback){
  elmt.bind("click touchstart", callback);
}
Input.unClick = function(elmt){
  elmt.unbind("click touchstart");
}