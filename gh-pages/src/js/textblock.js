$(document).ready(function(e) {
  measure();
});
$(window).resize(function(){measure();});
function measure() {

  $( textblock['textblocks'] ).each(function( index ) {
    // console.log( textblock['textblocks'][index]['id'] );
    // console.log( textblock['textblocks'][index]['minwdth'] );
    // console.log( textblock['textblocks'][index]['maxwdth'] );
    // console.log( textblock['textblocks'][index]['minfs'] );
    // console.log( textblock['textblocks'][index]['maxfs'] );
    // console.log( textblock['textblocks'][index]['minld'] );
    // console.log( textblock['textblocks'][index]['maxld'] );
    var tb_id = textblock['textblocks'][index]['id'];
    var tb_minw = textblock['textblocks'][index]['minwdth'];
    var tb_maxw = textblock['textblocks'][index]['maxwdth'];
    var tb_minf = textblock['textblocks'][index]['minfs'];
    var tb_maxf = textblock['textblocks'][index]['maxfs'];
    var tb_minl = textblock['textblocks'][index]['minld'];
    var tb_maxl = textblock['textblocks'][index]['maxld'];

  var vpw_width = $(window).width();
  var msr_width = $(tb_id).parent().width();
  // console.log(msr_width);

  var minld   = tb_minw / tb_minl;
  var maxld   = tb_maxw / tb_maxl;

  var fontsizevariation = tb_minf + ((tb_maxf - tb_minf) / (tb_maxw - tb_minw)) * (msr_width - tb_minw);
  var calctypesize = fontsizevariation;

  var leadingvariation = minld + ((maxld - minld) / (tb_maxw - tb_minw)) * (msr_width - tb_minw);
  var calcleading  = msr_width / leadingvariation;

  // x = 18+((32 - 18) / (1320 - 320)) * (y - 300)
  // $('#vpw').text(vpw_width);
  // $('#msr').text(msr_width);
  // $('#clcltdtypsz').text(calctypesize.toFixed(2));
  // $('#clcltdldng').text(calcleading.toFixed(2));

  $(tb_id).css('font-size', calctypesize + 'em' );
  $(tb_id).css('line-height', calcleading );

  var typesize = parseInt($(tb_id).css('font-size'));
  // $('#typsz').text(typesize);
  if(vpw_width < 624) {
    $( '.txt2' ).removeClass( 'smpltxt2' );
    $( '.2h3' ).removeClass( 'smpl2h3' );
    $( '.ft' ).removeClass( 'grid__row' );
  } else if (vpw_width > 624) {
    $( '.txt2' ).addClass( 'smpltxt2' );
    $( '.2h3' ).addClass( 'smpl2h3' );
    $( '.ft' ).addClass( 'grid__row' );
  }
});
}
