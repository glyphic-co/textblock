# Textblock

A javascript tool for adjusting size, leading, and weight to cast continuously responsive typography. It works over your current CSS as a progressive enhancement.

Based on your settings for the minimum and maximum widths of a flexible container, the script interpolates settings at the container's current width for:

- **font size**
- **font weight** (intended for use with variable fonts to simulate grades — micro-variations in weight to set smaller sizes slightly bolder)
- **line height**

## To initialize, add the element to be resized (required)

```
Textblock([{
  target: ".some-element"
}]);
```

## Parameters

- **`target`** (required  ): The element that should be resized `".your‑class"`, `"#some-id p"`
- **`minWidth`**: default `320`
- **`maxWidth`**: default `960`
- **`minWidthFontSize`**: default `1.0`
- **`maxWidthFontSize`**: default `1.8`
- **`minWidthLineHeight`**: default `1.33` (unitless values only)
- **`maxWidthLineHeight`**: default `1.25` (unitless values only)
- **`minWidthFontWeight`**: e.g. `450` (undefined by default)
- **`maxWidthFontWeight`**: e.g. `400` (undefined by default)
- **`container`**: The container width to measure. Defaults to `"parent"` and can alternately be set to `"self"`.
- **`units`**: default `em`

For a better sense of context, set your root em to `10px` with `html { font-size: 62.5%; }`. This makes your em units base 10 so `2.4em` = `24px`. But any number will do because once you start adjusting the min/max numbers, the experience is more visual than calculated. And if you prefer a more scientific approach, Textblock gives you the control you need for setting systems like modular scales.

## Example Including Extra Parameters

```
Textblock([{
 target: ".some-class",
 minWidth: 280,
 maxWidth: 800,
 minWidthFontSize: 1.9,
 maxWidthFontSize: 2.6,
 minWidthLineHeight: 1.33,
 maxWidthLineHeight: 1.25,
 minWidthFontWeight: 366,
 maxWidthFontWeight: 300,
 container: "self",
 units: "rem"
}]);
```

## Multiple Elements with Different Settings

```
Textblock([
 {
  target: ".some-class",
  minWidthFontSize: 1.9,
  maxWidthFontSize: 2.6
 },
 {
  target: ".another-class",
  minWidthFontSize: 2.4,
  maxWidthFontSize: 3.6,
  minWidthFontWeight: 450,
  maxWidthFontWeight: 400,
  container: "self"
 }
]);
```
