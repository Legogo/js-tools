Web = function(){}

Web.getUrl = function(){
  return document.URL.toLowerCase();
}
Web.getUrlNoPage = function(){
  //http://www.domain.com/path/page.html
  //http://www.domain.com/path/page/
  //http://www.domain.com/path/page
  var url = Web.getUrl();
  var idx = 0;
  var lastIndex = -1;

  do{
    idx = url.indexOf("/",idx+1);
    if(idx > -1) lastIndex = idx+1;
    //console.log(idx);
  }while(idx > -1 && idx < url.length);

  var crop = url.slice(0,lastIndex);
  return crop;
}

Web.getUrlLanguage = function(deflt){
  var url = Web.getUrl();
  if(document.URL.indexOf("/fr") >= 0 || document.URL.indexOf("?fr") >= 0) return "fr";
  if(document.URL.indexOf("/en") >= 0 || document.URL.indexOf("?en") >= 0) return "en";
  if(document.URL.indexOf("/de") >= 0 || document.URL.indexOf("?de") >= 0) return "de";
  return deflt;
}

Web.getUrlParam = function(splitChar){
  if(splitChar == undefined) splitChar = '?';
  var url = Web.getUrl();
  var split = url.split("/");
  split = split[split.length-1].split(splitChar);
  return split[split.length-1];
}