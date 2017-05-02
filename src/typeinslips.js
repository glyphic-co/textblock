var measure = function() {
  onDocReady(function(){
    run();
    onResize(run);
  });
  function run(){
    each($(textblock['textblocks']), function(block){
      var tb_id = block['id'];
      var tb_minw = block['minwdth'];
      var tb_maxw = block['maxwdth'];
      var tb_minf = block['minfs'];
      var tb_maxf = block['maxfs'];
      var tb_minl = block['minld'];
      var tb_maxl = block['maxld'];
      var msr_width = $(tb_id).parent().width();
      var minld   = tb_minw / tb_minl;
      var maxld   = tb_maxw / tb_maxl;

      var fontsizevariation = tb_minf + ((tb_maxf - tb_minf) / (tb_maxw - tb_minw)) * (msr_width - tb_minw);
      var calctypesize = fontsizevariation;

      var leadingvariation = minld + ((maxld - minld) / (tb_maxw - tb_minw)) * (msr_width - tb_minw);
      var calcleading  = msr_width / leadingvariation;

      console.log(findEls(tb_id))
      each(findEls(tb_id), function(el){
        el.style.fontSize = calctypesize + 'em';
        el.style.lineHeight = calcleading;
      })
    });
  }
  function onDocReady(callback){
    function modernBrowser(){
      if (
          document.readyState === "complete" ||
          (document.readyState !== "loading" && !document.documentElement.doScroll)
      ) {
        callback && callback();
      } else {
        document.addEventListener("DOMContentLoaded", function(){
          callback && callback();
        });
      }
    }
    function oldIE(){
      document.attachEvent("onreadystatechange", function(){
        if(document.readyState === "complete"){
          document.detachEvent("onreadystatechange", arguments.callee);
          callback && callback();
        }
      });
    }

    if (document.addEventListener) {
      modernBrowser();
    } else if (document.attachEvent) {
      oldIE();
    }
  }
  function onResize(callback){
    if(window.attachEvent) {
      window.attachEvent('onresize', function() {
        callback && callback();
      });
    }
    else if(window.addEventListener) {
      window.addEventListener('resize', function() {
        callback && callback();
      }, true);
    }
  }
  function each(items, callback) {
    for (i = 0; i < items.length; i++) { 
      callback && callback(items[i], i);
    }
  }
  function findEls(selector){
    var els = [document.getElementById(selector)];
    return els + document.getElementsByClassName(selector);
  }
  function parentEl(el) {

  }
}

measure();