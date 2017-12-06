$(document).ready(function(e) {
  substrate();
});
$(window).resize(function(){substrate();});
function substrate() {
  var svpw_width = $(window).width();
  var smsr_width = $('.textblock').width();
  if(smsr_width > 800) {
    $('.textblock').css('max-width', '800px' );
  }
  if(svpw_width > 1200) {
    var calcsubstrate  = 20 + 'vw';
  } else {
    var calcsubstrate = ((((svpw_width)/33 ))/2 + 'vw');
  }
  $('.tbcon').css({'margin': '0 ' + calcsubstrate})
  $('.textblock').css({'margin': '0 auto'})
  $('#vpw').text(svpw_width);
}
