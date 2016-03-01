System = function(){}

/* only for IE */
System.copyToClipboard = function(txt) {
  Copied = txt.createTextRange();
  Copied.execCommand("Copy");
}

System.isArray = function(obj){
  return(Object.prototype.toString.call( obj ) === '[object Array]');
}