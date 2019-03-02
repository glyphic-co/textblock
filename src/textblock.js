window.Textblock = function(textblocks) {
  var config = {
    minWidthDefault: 320,
    maxWidthDefault: 960,
    containerDefault: 'parent',
    minWidthPrefix: 'minWidth',
    maxWidthPrefix: 'maxWidth',
    supportedProps: [
      /**
       * NOTE: `propName`s below must match the JS notation for a CSS property.
       * (See https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference)
       * 
       * If `PropName` is `propName` with first letter capitalized, the
       * parameters for the property take the form `minWidth<PropName>`,
       * `maxWidth<PropName>`, and, when applicable, `<propName>Units`.
       */
      {
        propName: 'fontSize',
        minWidthDefault: 1.0,
        maxWidthDefault: 1.8,
        unitsDefault: 'em'
      },
      {
        propName: 'fontStretch',
        unitsDefault: '%'
      },
      {
        propName: 'fontWeight'
      },
      {
        propName: 'letterSpacing',
        unitsDefault: 'em'
      },
      {
        propName: 'lineHeight',
        minWidthDefault: 1.33,
        maxWidthDefault: 1.25
      }
    ]
  };
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
          config.supportedProps.forEach(function(prop) {
            el.style[prop.propName] = measurements[prop.propName];
          });
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

      var current_width =
        tb_cont === 'self' ? elWidth(el) : elWidth(el.parentNode);

      var current_width_capped = Math.min(
        Math.max(current_width, tb_minw),
        tb_maxw
      ); // cap current container width to minWidth and maxWidth settings

      var width_ratio = (current_width_capped - tb_minw) / (tb_maxw - tb_minw);

      var measurements = {};

      config.supportedProps.forEach(function(prop) {
        var propNameCapitalized = capitalizeFirstChar(prop.propName);

        var propMinWidthSetting =
          block['min' + propNameCapitalized] || // check for legacy min param name
          block[config.minWidthPrefix + propNameCapitalized];

        var propMaxWidthSetting =
          block['max' + propNameCapitalized] || // check for legacy max param name
          block[config.maxWidthPrefix + propNameCapitalized];

        var units =
          prop.propName === 'fontSize'
            ? block.units || block.fontSizeUnits // allow legacy `units` param for fontSize
            : block[prop.propName + 'Units'] || ''; // otherwise use a prop-specific unit

        measurements[prop.propName] =
          scaleInRange(propMinWidthSetting, propMaxWidthSetting, width_ratio) +
          units;
      });

      return measurements;
    }
  }
  function scaleInRange(min, max, scale_factor) {
    return min + (max - min) * scale_factor;
  }
  function capitalizeFirstChar(str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
  }
  function prepBlockSettings(block) {
    // set container-level defaults
    var defaultSettings = {
      minWidth: config.minWidthDefault,
      maxWidth: config.maxWidthDefault,
      container: config.containerDefault
    };

    // set property-level defaults
    config.supportedProps.forEach(function(prop) {
      // set min/maxWidth defaults for props if set in config
      if (prop.minWidthDefault && prop.maxWidthDefault) {
        var propNameCapitalized = capitalizeFirstChar(prop.propName);
        defaultSettings[config.minWidthPrefix + propNameCapitalized] =
          prop.minWidthDefault;
        defaultSettings[config.maxWidthPrefix + propNameCapitalized] =
          prop.maxWidthDefault;
      }

      // set units default if set in config
      defaultSettings[prop.propName + 'Units'] = prop.unitsDefault || null;
    });
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
