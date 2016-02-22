System = function(){}

/* only for IE */
System.copyToClipboard = function(txt) {
  Copied = txt.createTextRange();
  Copied.execCommand("Copy");
}
