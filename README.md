# Textblock.js

Textblock provides continuous responsive typesetting beyond standard CSS breakpoints. It adjusts type size and line height to set perfect type across varying screen widths. The script works on top of your current CSS, meaning you may already have a fallback.

It uses minimum and maximum values for font size, leading (line height), and measure (the container width).

The script calculates floating point values based on units defined within the document head (or foot):

- Minimum/maximum font size
- Minimum/maximum font leading (line height)
- Minimum/maximum container width

The math is easiest if you set the root em (rem) to 10px so em units are base 10, i.e. 2.4em = 24px.

### To initialize
```
Textblock([{
  target:".some-element"
}]);
```

### Optional Parameters
- `target`: The element that should be resized `.your-class p, #cool-id .another` (required)
- `minWidth`: default `280`
- `maxWidth`: default `800`
- `minFontSize`: default `1.9`
- `maxFontSize`: default `2.6`
- `minLineHeight`: default `1.33`
- `maxLineHeight`: default `1.25`
- `units`: default `em`

Example with extra parameters included

```
Textblock([{
  target:".some-class",
  minWidth: 280,
  maxWidth: 800,
  minFontSize: 1.9,
  maxFontSize: 2.6,
  minLineHeight: 1.33,
  maxLineHeight: 1.25,
  units: 'rem'
}]);
```

### Multiple elements with different settings

```
Textblock([
  {
    target:".some-class",
    minFontSize: 1.9,
    maxFontSize: 2.6,
  },
  {
    target:".another",
    minFontSize: 2.4,
    maxFontSize: 3.6,
  }
]);
