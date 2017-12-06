function showHide(d)
{
var onediv = document.getElementById(d);
var divs=['introduction','logo','color'];
for (var i=0;i<divs.length;i++)
  {
  if (onediv != document.getElementById(divs[i]))
    {
    document.getElementById(divs[i]).style.display='none';
    }
  }
onediv.style.display = 'block';
}


$(function stay() {
    $('ul.menu li a').click(function () {
            $('ul.menu li a').removeClass('selected');
            $(this).addClass('selected');

    });
});
