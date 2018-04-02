# Textblock.js

Textblock optimizes size and leading to cast perfectly set type across any responsive width. It works over your current CSS as a progressive enhancement.

The script uses minimum and maximum values for size and line height plotted over the min/max range of container widths:

- Minimum/maximum font size
- Minimum/maximum font line height
- Minimum/maximum container width

For instance, if the min/max font size was set to 1em/2em and the container width to 300px/900px: at a width of 300px, the type would be 1em; at 600px, the type would be 1.5em.

You can simplify the math if you set the root em (rem) to 10px so em units are base 10, i.e. 2.4em = 24px.

### To initialize, add the element to be resized (required)
```
Textblock([{
  target:".some-element"
}]);
```

### Optional Parameters
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
```
