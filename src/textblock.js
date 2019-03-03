window.Textblock = function(textblocks) {
  onDocReady(function() {
    run();
    onResize(run);
  });
  function run() {
    each(textblocks, function(rawBlock) {
      // loop through all the provided textblocks

      var block = prepBlockSettings(rawBlock);

      each(findEls(block.target), function(el) {
        // loop through each element that matches the textblock's selector

        var measurements = calc(el, block);
        if (measurements) {
          el.style.fontSize = measurements.fontSize + block.units;
          el.style.lineHeight = measurements.lineHeight;
          el.style.fontWeight = measurements.fontWeight;
        }
      });
    });
  }
  function calc(el, block) {
    // returns object with calculated fontSize and lineHeight for an element.
    if (el) {
      var tb_minw = block.minWidth;
      var tb_maxw = block.maxWidth;
      var tb_cont = block.container;

      // use short-circuit assignment to allow legacy config var names to be used.
      var tb_minf = block.minFontSize || block.minWidthFontSize;
      var tb_maxf = block.maxFontSize || block.maxWidthFontSize;
      var tb_minl = block.minLineHeight || block.minWidthLineHeight;
      var tb_maxl = block.maxLineHeight || block.maxWidthLineHeight;
      var tb_ming = block.minVariableGrade || block.minWidthFontWeight;
      var tb_maxg = block.maxVariableGrade || block.maxWidthFontWeight;

      var current_width =
        tb_cont === 'self' ? elWidth(el) : elWidth(el.parentNode);

      var current_width_capped = Math.min(
        Math.max(current_width, tb_minw),
        tb_maxw
      ); // cap current container width to minWidth and maxWidth settings

      var width_ratio = (current_width_capped - tb_minw) / (tb_maxw - tb_minw);

      return {
        fontSize: scaleInRange(tb_minf, tb_maxf, width_ratio),
        lineHeight: scaleInRange(tb_minl, tb_maxl, width_ratio),
        fontWeight: scaleInRange(tb_ming, tb_maxg, width_ratio)
      };
    }
  }
  function scaleInRange(min, max, scale_factor) {
    return min + (max - min) * scale_factor;
  }
  function prepBlockSettings(block) {
    var defaultSettings = {
      minWidth: 320,
      maxWidth: 960,
      minWidthFontSize: 1.0,
      maxWidthFontSize: 1.8,
      minWidthLineHeight: 1.33,
      maxWidthLineHeight: 1.25,
      container: 'parent',
      units: 'em'
    };
    return Object.assign(defaultSettings, block);
  }
  function onDocReady(callback) {
    // Listener for DOM ready. Replaces $(document).ready
    function modernBrowser() {
      if (
        document.readyState === 'complete' ||
        (document.readyState !== 'loading' &&
          !document.documentElement.doScroll)
      ) {
        callback && callback();
      } else {
        document.addEventListener('DOMContentLoaded', function() {
          callback && callback();
        });
      }
    }
    function oldIE() {
      document.attachEvent('onreadystatechange', function() {
        if (document.readyState === 'complete') {
          document.detachEvent('onreadystatechange', arguments.callee);
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
  function onResize(callback) {
    // listener for window resize
    if (window.attachEvent) {
      window.attachEvent('onresize', function() {
        callback && callback();
      });
    } else if (window.addEventListener) {
      window.addEventListener(
        'resize',
        function() {
          callback && callback();
        },
        true
      );
    }
  }
  function each(items, callback) {
    // loops through elements of an array
    for (var i = 0; i < items.length; i++) {
      callback && callback(items[i], i);
    }
  }
  function findEls(selector) {
    // replaces jquery finder: $('.some-el')
    return document.querySelectorAll(selector);
  }
  function elWidth(el) {
    // calculates width, without padding and border width
    var paddingWidth =
      parseInt(elStyleVal(el, 'padding-left')) +
      parseInt(elStyleVal(el, 'padding-right'));
    var borderWidth =
      parseInt(elStyleVal(el, 'border-left-width')) +
      parseInt(elStyleVal(el, 'border-right-width'));
    return el.offsetWidth - paddingWidth - borderWidth;
  }
  function elStyleVal(el, styleName) {
    // gets final calculated style values for element. For example, getting the final width or padding in px.
    if (window.getComputedStyle) {
      return window.getComputedStyle(el, null).getPropertyValue(styleName);
    } else {
      return el.currentStyle[styleName];
    }
  }
};
