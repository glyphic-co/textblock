# Type in Slips


### To initialize
```
TypeInSlips([{
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

Example with extra parameters included

```
TypeInSlips([{
  target:".some-class",
  minWidth: 280,
  maxWidth: 800,
  minFontSize: 1.9,
  maxFontSize: 2.6,
  minLineHeight: 1.33,
  maxLineHeight: 1.25
}]);
```

### Multiple elements with different settings

```
TypeInSlips([
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
