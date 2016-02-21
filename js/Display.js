Display = function(){}


Display.fixPNGs = function(){
  if( ie < 9){ 
    var i;
    //alert(document.images.length);
    for(i in document.images){
      if(document.images[i].src){
        var imgSrc = document.images[i].src;
        if(imgSrc.substr(imgSrc.length-4) === '.png' || imgSrc.substr(imgSrc.length-4) === '.PNG'){
        document.images[i].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='crop',src='" + imgSrc + "')";
        }
      }
    }   
  }
}
