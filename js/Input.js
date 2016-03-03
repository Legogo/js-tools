/*
  32 = space
  37 = left
  38 = up
  39 = right
  40 = down
*/
var INPUT;

$(function(){
  INPUT = new Input();
})

Input = function(){
  this.onPressCallback = [];

  this.setup = function(){
    document.onkeydown = this.onKeyPress;
  }

  this.onKeyPress = function(evt){
    var code = Input.extractCharCode(evt);
    
    //console.log(code+" / "+INPUT.onPressCallback.length);

    if(code < INPUT.onPressCallback.length){
      if(INPUT.onPressCallback[code] != undefined){
        //console.log(code);
        INPUT.onPressCallback[code]();
      }  
    }
    
  }

  this.setup();
}

Input.extractCharCode = function(evt){

  if (!evt) evt = window.evt;
  var code = evt.keyCode;
  if (evt.charCode && code == 0) code = evt.charCode;

  return code;
}

Input.alertOnKey = function(){
  document.onkeydown = function(evt){
    var code = Input.extractCharCode(evt);
    alert(keyCode);
  }
}

Input.assignKey = function(charCode, callback, owner){
  INPUT.onPressCallback[charCode] = callback;
  if(owner != undefined){
    console.log(charCode+" assigned for "+owner);
  }
  
}

/* mouse attachement to DOM element */
Input.click = function(elmt, callback){
  elmt.bind("click touchstart", callback);
}
Input.unClick = function(elmt){
  elmt.unbind("click touchstart");
}