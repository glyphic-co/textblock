$(document).ready(function() {

  $('.close').css('visibility', 'hidden');

  smpl = {
    smpls :
      [{
        id  : 'terms',
        num : 3
      },{
        id  : 'anatomy',
        num : 4
      },{
        id  : 'specimens',
        num : 3
      },{
        id  : 'organization',
        num : 3
      },{
        id  : 'glyphs',
        num : 3
      },{
        id  : 'Foreword-by-Erik-Spiekermann',
        num : 1
      },{
        id  : 'introduction',
        num : 1
      }
    ]};

  $( smpl['smpls'] ).each(function( index ) {

      id  = smpl['smpls'][index]['id'];
      cnt = smpl['smpls'][index]['num'];

      for (i = 0; i < cnt; i++) {
        // console.log( '#' + id + '-' + [i+1] );
        $('#' + id + '-' + [i+1]).popup({opacity: 0.6});

        $('#' + id + '_' + [i+1]).click(function (){
          var me = $(this),
             data = me.data('key');
        //  console.log(data.sec);
        //  console.log(data.nm);
         sec = data.sec;
         nm = data.nm;
        //  console.log('close X showing?');
         $('.close').css('visibility', 'visible');
        });

        $('#frwrdlnk').click(function (){
          foreword = 1;
          $('.close').css('visibility', 'visible');
        });

        $('#intrdctnlnk').click(function (){
          introduction = 1;
          $('.close').css('visibility', 'visible');
        });

        $('#' + id + '-' + [i+1]).keydown(function(e) {
          if(e.keyCode == 37) { // left
              // console.log('#' + sec + '-' + [nm-1]);
              $('#' + sec + '-' + nm).popup('hide');
              $('#' + sec + '-' + [nm-1]).popup('show');
              nm = parseInt(nm-1);
          }
          else if(e.keyCode == 39) { // right
              // console.log('#' + sec + '-' + [nm+1]);
              $('#' + sec + '-' + nm).popup('hide');
              $('#' + sec + '-' + [nm+1]).popup('show');
              nm = parseInt(nm+1);
          }
        });

        $('.close').click(function (){
          if (typeof foreword !== 'undefined') {
            $('#Foreword-by-Erik-Spiekermann-1').popup('hide');
            delete foreword;
          } else if (typeof introduction !== 'undefined') {
            $('#introduction-1').popup('hide');
            delete introduction;
          } else if (typeof sec !== 'undefined' && typeof nm !== 'undefined') {
            $('#' + sec + '-' + nm).popup('hide');
          }
          $('.close').css('visibility', 'hidden');
        });

      }
  });

});
