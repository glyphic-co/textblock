# Textblock

A javascript tool for adjusting size, leading, and grades to cast continuously responsive typography. It works over your current CSS as a progressive enhancement.

The script calculates your setting based on minimum and maximum values for font size, line height, variable grades, and container width:

- minimum/maximum font size
- minimum/maximum line height
- minimum/maximum container width
- minimum/maximum grades (variable fonts only)

## To initialize, add the element to be resized (required)

### With Vanilla JS

1. Include the main script and
2. target elements using JS notation:

```HTML
<script src="textblock.min.js"></script>

<script>
  Textblock([{
    target: ".some-element"
  }]);
</script>
```
### As a Node Module (shown here for React)

1. Add to modules with `npm install --save textblock`,
2. include the module, and
3. apply to elements within `componentDidMount()` as needed:

```JS
import Textblock from 'textblock';

componentDidMount() {
  Textblock([{
    target: ".some-element"
  }]);
}
```

## Parameters

- **`target`** (required  ): The element that should be resized `".your‑class"`, `"#some-id p"`
- **`minWidth`**: default `320`
- **`maxWidth`**: default `960`
- **`minWidth_FontSize`**: default `1.0`
- **`maxWidth_FontSize`**: default `1.8`
- **`minWidth_LineHeight`**: default `1.33` (unitless values only)
- **`maxWidth_LineHeight`**: default `1.25` (unitless values only)
- **`minWidth_VariableGrade`**: A variable font weight for the small size, for example `450`
- **`maxWidth_VariableGrade`**: A variable font weight for the large size, i.e. `400`
- **`container`**: The container width to measure. Defaults to `"parent"` and can alternately be set to `"self"`.
- **`fontSize_Units`**: default `em`

For a better sense of context, set your root em to `10px` with `html { font-size: 62.5%; }`. This makes your em units base 10 so `2.4em` = `24px`. But any number will do because once you start adjusting the min/max numbers, the experience is more visual than calculated. And if you prefer a more scientific approach, Textblock gives you the control you need for setting systems like modular scales.

If you’re using variable fonts, the `minWidth_VariableGrade` / `maxWidth_VariableGrade` parameters provide a way to simulate grades (micro-variations in weight to set smaller sizes slightly bolder).

## Example Including Extra Parameters

```JS
Textblock([{
 target: ".some-class",
 minWidth: 280,
 maxWidth: 800,
 minWidth_FontSize: 1.9,
 maxWidth_FontSize: 2.6,
 minWidth_LineHeight: 1.33,
 maxWidth_LineHeight: 1.25,
 minWidth_VariableGrade: 366,
 maxWidth_VariableGrade: 300,
 container: "self",
 fontSize_Units: "rem"
}]);
```

## Multiple Elements with Different Settings

```JS
Textblock([
 {
  target: ".some-class",
  minWidth_FontSize: 1.9,
  maxWidth_FontSize: 2.6
 },
 {
  target: ".another-class",
  minWidth_FontSize: 2.4,
  maxWidth_FontSize: 3.6,
  minWidth_VariableGrade: 450,
  maxWidth_VariableGrade: 400,
  container: "self"
 }
]);
```
