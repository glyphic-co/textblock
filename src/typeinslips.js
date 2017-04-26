$(document).ready(function(e) {
  measure();
});
$(window).resize(function(){measure();});
function measure() {


  $( textblock['textblocks'] ).each(function( index ) {
    var tb_id = textblock['textblocks'][index]['id'];
    var tb_minw = textblock['textblocks'][index]['minwdth'];
    var tb_maxw = textblock['textblocks'][index]['maxwdth'];
    var tb_minf = textblock['textblocks'][index]['minfs'];
    var tb_maxf = textblock['textblocks'][index]['maxfs'];
    var tb_minl = textblock['textblocks'][index]['minld'];
    var tb_maxl = textblock['textblocks'][index]['maxld'];

  // var vpw_width = $(window).width();
  var msr_width = $(tb_id).parent().width();

  var minld   = tb_minw / tb_minl;
  var maxld   = tb_maxw / tb_maxl;

  var fontsizevariation = tb_minf + ((tb_maxf - tb_minf) / (tb_maxw - tb_minw)) * (msr_width - tb_minw);
  var calctypesize = fontsizevariation;

  var leadingvariation = minld + ((maxld - minld) / (tb_maxw - tb_minw)) * (msr_width - tb_minw);
  var calcleading  = msr_width / leadingvariation;

  $(tb_id).css('font-size', calctypesize + 'em' );
  $(tb_id).css('line-height', calcleading );

});
}
