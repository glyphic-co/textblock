window.Textblock = function(textblocks) {
  var config = {
    minWidthDefault: 320,
    maxWidthDefault: 960,
    containerDefault: 'parent',
    minWidthPrefix: 'minWidth',
    maxWidthPrefix: 'maxWidth',
    unitsSuffix: 'Units',
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
    textblocks.forEach(function(rawBlock) {
      // loop through all the provided textblocks

      var block = prepBlockSettings(rawBlock);

      document.querySelectorAll(block.target).forEach(function(el) {
        // loop through each element that matches the textblock's selector

        if (el) {
          var current_width_ratio = calcCurrentWidthRatio(el, block);

          config.supportedProps.forEach(function(prop) {
            el.style[prop.propName] = calcCurrentPropValue(
              block,
              prop.propName,
              current_width_ratio
            );
          });
        }
      });
    });
  }
  function calcCurrentPropValue(block, propName, width_ratio) {
    var propNameCapitalized = capitalizeFirstChar(propName);

    var propMinWidthSetting =
      block['min' + propNameCapitalized] || // check for legacy min param name
      block[config.minWidthPrefix + propNameCapitalized];

    var propMaxWidthSetting =
      block['max' + propNameCapitalized] || // check for legacy max param name
      block[config.maxWidthPrefix + propNameCapitalized];

    var units =
      block.units && propName === 'fontSize'
        ? block.units // allow legacy `units` param for fontSize
        : block[propName + config.unitsSuffix] || ''; // otherwise use a prop-specific unit if specified

    return (
      scaleInRange(propMinWidthSetting, propMaxWidthSetting, width_ratio) +
      units
    );
  }
  function calcCurrentWidthRatio(el, block) {
    var tb_minw = block.minWidth;
    var tb_maxw = block.maxWidth;
    var tb_cont = block.container;

    var current_width =
      tb_cont === 'self' ? elWidth(el) : elWidth(el.parentNode);

    var current_width_capped = Math.min(
      Math.max(current_width, tb_minw),
      tb_maxw
    ); // cap current container width to minWidth and maxWidth settings

    return (current_width_capped - tb_minw) / (tb_maxw - tb_minw);
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
      defaultSettings[prop.propName + config.unitsSuffix] =
        prop.unitsDefault || null;
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
