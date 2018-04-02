/*  Type.js
 by Nathan Ford
 @nathan_ford

 FEATURES
 - kerning pairs
 - rag adjust
 - min/max font size
 - widow tamer

 -----------------------------*/

var stylefill = {

  options: {
    externalCSS: false
  },
  properties: {},
  allRules: {},
  sheets: [],
  sheetTexts: {},

  arraySliceShim: function () { // fixes Array.prototype.slice support for IE lt 9
    'use strict';
    var _slice = Array.prototype.slice;

    try {
      _slice.call(document.documentElement);
    }
    catch (e) { // Fails in IE < 9
      Array.prototype.slice = function (begin, end) {

        var i,
          arrayLength = this.length,
          a = [];

        if (this.charAt) {
          for (i = 0; i < arrayLength; i++) {
            a.push(this.charAt(i));
          }
        }
        else {
          for (i = 0; i < this.length; i++) {
            a.push(this[i]);
          }
        }

        return _slice.call(a, begin, end || a.length);
      };
    }
  },

  setOptions: function (params) {
    this.options = params;
  },

  init: function (params) {
    this.properties = params;
    this.arraySliceShim();
    this.getStyleSheets();
  },

  loadStyles: function (count) {
    var sheet = this.sheets[count];

    if (sheet) {
      if (sheet.innerHTML) {
        this.loadCSSinner(sheet, count);
      }
      else if (!stylefill.sheets[sheet.href] && stylefill.options.externalCSS) {
        stylefill.loadFile(sheet.href, count);
      }
      else {
        stylefill.loadStyles(count + 1);
      }
    }
    else {
      stylefill.runSheets();
    }
  },

  loadCSSinner: function (sheet, count) {
    this.sheetTexts['onpage' + count] = sheet.innerHTML;
    this.loadStyles(count + 1);
  },

  loadFile: function (url, count) {
    var req;

    if (window.XMLHttpRequest) {
      req = new XMLHttpRequest();
    }
    else {
      req = new ActiveXObject("Microsoft.XMLHTTP");
    }
	},

	options : function (params) {

		this.options = params;

	},

	init : function (params) {

		this.properties = params;

		this.arraySliceShim();

		this.getStyleSheets();
	},

	loadStyles : function (count) {

		var sheet = this.sheets[count];

		if (sheet) {
			if (sheet.innerHTML) this.loadCSSinner(sheet, count);
			else if (!stylefill.sheets[sheet.href] && stylefill.options.externalCSS) stylefill.loadFile(sheet.href, count);
			else stylefill.loadStyles(count + 1);

		}
		else stylefill.runSheets();

	},

	loadCSSinner : function(sheet, count) {

		this.sheetTexts['onpage' + count] = sheet.innerHTML;

		this.loadStyles(count + 1);

	},

	// loadFile : function(url, count) {
  //
	//     var req;
  //
	//     if (window.XMLHttpRequest) req = new XMLHttpRequest();
	//     else req = new ActiveXObject("Microsoft.XMLHTTP");
  //
	//     req.open("GET", url, true);
  //
  //     req.onreadystatechange = function () {
  //
  //       if (this.readyState === 4 && this.status === 200) {
  //         stylefill.sheetTexts[url] = this.responseText;
  //         stylefill.loadStyles(count + 1);
  //       }
  //       else if (this.readyState === 4 && this.status === 000) {
  //         stylefill.loadStyles(count + 1);
  //       }
  //     };
  //
  //     req.send(null);
  //
	// },

	// getStyleSheets : function (property, func) {
  //
	// 	var sheetstext = new Array(),
	// 			stylesheets = Array.prototype.slice.call(document.querySelectorAll('link[href*=".css"]')), // grab stylesheet links - not used yet
  //
	// 			styleEles = document.getElementsByTagName('style');
  //
	// 	if (styleEles.length > 0) {
  //
	// 		for (i in styleEles) {
  //
	// 			if (styleEles[i].innerHTML) stylesheets.push(Array.prototype.slice.call(styleEles)[i]); // add on page CSS
  //
	// 		}
  //
	// 	}
  //
	// 	this.sheets = stylesheets;
  //
	// 	this.loadStyles(0);
  //
	// },

	// runSheets : function () {
  //
	// 	for (sheet in this.sheetTexts) {
	// 		for (property in this.properties) {
  //
	// 			var sheetext = this.sheetTexts[sheet],
	// 					func = this.properties[property];
  //
	// 			this.findRules(property, sheetext, func);
  //
	// 		}
	// 	}
  //
	// },

	// checkRule : function (property) {
  //
	// 	var propertyCamel = property.replace(/(^|-)([a-z])/g, function (m1, m2, m3) { return m3.toUpperCase(); });
  //
	// 	if (('Webkit' + propertyCamel) in document.body.style
	// 	 || ('Moz' + propertyCamel) in document.body.style
	// 	 || ('O' + propertyCamel) in document.body.style
	// 	 || property in document.body.style) return true;
  //
	// },

	// findRules : function (property, sheettext, func) {
  //
	// 	var rules = { support: false };
  //
	// 	if (sheettext) {
  //
	// 		if (!this.checkRule(property)) { // check if rule is valid now
  //
	// 			var selreg = new RegExp('([^}{]+){([^}]+)?' + property.replace('-', '\\-') + '[\\s\\t]*:[\\s\\t]*([^;]+)', 'gi'),
	// 					selmatch, i = 0;
  //
	// 			while (selmatch = selreg.exec(sheettext)) {
  //
	// 	   		var sel = selmatch[1].replace(/^([\s\n\r\t]+|\/\*.*?\*\/)+/, '').replace(/[\s\n\r\t]+$/, ''),
	// 	   				val = selmatch[3];
  //
	// 				rules['rule' + i] = {
  //
	// 					selector: sel,
	// 					property: property,
	// 					value: val
  //
	// 				};
  //
	// 				if (!stylefill.allRules[sel]) stylefill.allRules[sel] = new Object();
	// 				stylefill.allRules[sel][property] = val;
  //
	// 				i++;
  //
	// 			}
  //
	// 		}
	// 		else rules.support = true;
  //
	// 		func(rules);
  //
	// 	}
  //
	// },

  getStyleSheets: function (property, func) {

    var sheetstext = [],
      stylesheets = Array.prototype.slice.call(document.querySelectorAll('link[href*=".css"]')), // grab stylesheet links - not used yet
      styleEles = document.getElementsByTagName('style');

    if (styleEles.length > 0) {
      for (var i in styleEles) {
        if (styleEles[i].innerHTML) {
          // add on page CSS
          stylesheets.push(Array.prototype.slice.call(styleEles)[i]);
        }
      }
    }

    this.sheets = stylesheets;
    this.loadStyles(0);

  },

  runSheets: function () {

    for (var sheet in this.sheetTexts) {
      for (var property in this.properties) {

        if (this.sheetTexts.hasOwnProperty(sheet) && this.properties.hasOwnProperty(property)) {
          var sheetText = this.sheetTexts[sheet],
            func = this.properties[property];

          this.findRules(property, sheetText, func);
        }
      }
    }
  },

  checkRule: function (property) {

    var propertyCamel = property.replace(/(^|-)([a-z])/g, function (m1, m2, m3) {
      return m3.toUpperCase();
    });

    if (
      ('Webkit' + propertyCamel) in document.body.style
      || ('Moz' + propertyCamel) in document.body.style
      || ('O' + propertyCamel) in document.body.style
      || property in document.body.style
    ) {
      return true;
    }
  },

  findRules: function (property, sheetText, func) {

    var rules = {
      support: false
    };

    if (sheetText) {
      if (!this.checkRule(property)) { // check if rule is valid now

        var selreg = new RegExp('([^}{]+){([^}]+)?' + property.replace('-', '\\-') + '[\\s\\t]*:[\\s\\t]*([^;]+)', 'gi'),
          selmatch,
          i = 0;

        while (selmatch = selreg.exec(sheetText)) {

          var sel = selmatch[1].replace(/^([\s\n\r\t]+|\/\*.*?\*\/)+/, '').replace(/[\s\n\r\t]+$/, ''),
            val = selmatch[3];

          rules['rule' + i] = {
            selector: sel,
            property: property,
            value: val
          };

          if (!stylefill.allRules[sel]) stylefill.allRules[sel] = {};
          stylefill.allRules[sel][property] = val;

          i++;
        }
      }
      else {
        rules.support = true;
      }

      func(rules);
      console.log(rules);
    }
  }
};


var type = {

  kerningPairs: function (rules) {

    var traverseNodes = function (node, pairs) {
      var next;

      if (node.nodeType === 1) {
        if (node = node.firstChild) {
          do {
            next = node.nextSibling;
            traverseNodes(node, pairs);
          } while (node = next);
        }
      }
      else if (node.nodeType === 3) {
        kernText(node, pairs);
      }
    };

    var kernText = function (node, pairs) {

      var nodetext = node.textContent,
        nodechars = nodetext.split(''),
        parent = node.parentNode,
        pcount = pairs.length;

      while (pcount-- > 0) {

        var pair = pairs[pcount].replace(/^([\s\n\r\t]+|\/\*.*?\*\/)+/, '').replace(/[\s\n\r\t]+$/, ''),
          chars = pair.match(/^(.)(.)\s/i),
          amount = pair.match(/\s(\-*[0-9.]+[a-z]+)$/i)[1],
          ccount = nodechars.length;

        while (ccount-- > 0) {

          var char = nodechars[ccount],
            nextchar = nodechars[ccount + 1],
            charpair = char + nextchar,
            nextcharreg = new RegExp('^(<span[^>]+>)*' + chars[2] + '(<\/\s*span\s*>)*$', 'i');

          if (char === chars[1] && nextchar && nextchar.match(nextcharreg)) {
            nodechars[ccount] = '<span style="letter-spacing:' + amount + '">' + char + '</span>';
          }
        }
      }

      var temp = document.createElement('div');

      temp.innerHTML = nodechars.join('');

      while (temp.firstChild) {
        parent.insertBefore(temp.firstChild, node);
      }

      parent.removeChild(node);
    };

    var kernAll = function () {

      for (var i in rules) {

        if (rules[i] && rules[i] !== 'none') {

          var rule = rules[i],
            eles = document.querySelectorAll(rule.selector),
            elescount = eles.length,
            val = rule.value,
            pairs = val.split(',');

          while (elescount-- > 0) {
            var ele = eles[elescount];
            traverseNodes(ele, pairs);
          }
        }
      }
    };

    window.addEventListener('load', kernAll, false);
  },


  getStyle: function (ele, style, unit) {

    var ret;

    if (ele.currentStyle) {
      ret = ele.currentStyle[style.replace(/-([A-z])/gi, function (a, b) {
        return b.toUpperCase();
      })];
    }
    else if (window.getComputedStyle) {
      ret = document.defaultView.getComputedStyle(ele, null).getPropertyValue(style);
    }

    if (unit) {
      return parseFloat(ret);
    }
    else {
      return ret;
    }
  }
};

stylefill.setOptions({
  externalCSS: false
});

stylefill.init({

  'kerning-pairs': type.kerningPairs,

});
