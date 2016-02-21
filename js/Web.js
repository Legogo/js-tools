Web = function(){}

Web.getUrlLanguage = function(deflt){
  var url = document.URL.toLowerCase();
  if(document.URL.indexOf("/fr") >= 0 || document.URL.indexOf("?fr") >= 0) return "fr";
  if(document.URL.indexOf("/en") >= 0 || document.URL.indexOf("?en") >= 0) return "en";
  if(document.URL.indexOf("/de") >= 0 || document.URL.indexOf("?de") >= 0) return "de";
  return deflt;
}
