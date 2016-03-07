var MEDIA;

function Media(){
  var snd = $("#sound");
  var audio;

  this.setup = function(){
    this.addSoundPlayer();
  }

  this.addSoundPlayer = function(){
    if(this.snd == null){

      var ct = "<div id='sound'>";
      
      //ct += "<audio controls>";
      ct += "<audio>";
      //ct += '<source src="" type="audio/ogg">';
      //ct += '<source src="" type="audio/mpeg">';
      //ct += 'Your browser does not support the audio element.'
      ct += '</audio>';

      ct += "</div>";

      $("body").append(ct)

      this.snd = $("#sound");
      //this.audio = $(this.snd.find("audio")).get(0);
      //console.log(this.audio);
    }

    this.audio = $("<audio>");
    //console.log(this.snd);console.log(this.srcOgg);console.log(this.srcMpg);
  }

  this.setup();
}

Media.playSound = function(url){
  if(MEDIA == null) MEDIA = new Media();

  var audio = MEDIA.audio;

  //console.log(audio);
  audio.empty();
  $("<source>").attr("src", url+".mp3").appendTo(audio);

  audio[0].load();
  audio[0].play();
}