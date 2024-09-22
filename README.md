# Textblock

A JavaScript tool for adjusting font size, line height, and variable grades to cast continuously responsive typography. It works as a progressive enhancement over your existing CSS.

The script calculates typography settings based on minimum and maximum values for font size, line height, variable grades, and container width:

-   Minimum/maximum font size
-   Minimum/maximum line height
-   Minimum/maximum container width
-   Minimum/maximum grades (for variable fonts only)

## Getting Started

### Initialize the Resized Element (Required)

### Using Vanilla JS

1. Include the minified script in your website.
2. Target elements using standard JavaScript notation.

```HTML
<script src="textblock.min.js"></script>

<script>
  Textblock([{
    target: ".some-element"
  }]);
</script>
```

Or by including the package via unpkg:

```HTML
<script src="https://unpkg.com/textblock/textblock.min.js"></script>

<script>
  Textblock([{
    target: ".some-other-element"
  }]);
</script>
```

### Using as a Node Module (for example, in React)

1. Install via NPM: `npm install --save textblock`
2. Import the module into your component and apply the settings within any client-side lifecycle method.

```JS
import { Textblock } from 'textblock';
import { useLayoutEffect } from "react";

useLayoutEffect(() => {
	Textblock([{
    target: ".some-element"
  }]);
});
```

Or:

```JS
import { Textblock } from 'textblock';
import { useEffect } from "react";

useEffect(() => {
	Textblock([{
    target: ".some-element"
  }]);
});
```

### Building the Project

To build the project and generate the minified output, follow these steps:

1. **Install dependencies**:  
   `npm install`
2. **Build the project**:  
   `npm run build`

    This will generate the compiled JavaScript files, Typescript type definitions, and a minified version in the `./dist` directory.

### Demo Files

A working demo site using the latest stable Textbox version can be found in this repository in the `./demo` directory.

You can also see Textblock in action at [Textblock.io](https://textblock.io).

## Parameters

-   **`target`** (required): The CSS selector for the element that should be resized, e.g., `".your-class"`, `"#some-id p"`.
-   **`minWidth`**: The minimum container width. Default: `320`.
-   **`maxWidth`**: The maximum container width. Default: `960`.
-   **`fontSizeMinWidth`**: The font size at the minimum width. Default: `1.0`.
-   **`fontSizeMaxWidth`**: The font size at the maximum width. Default: `1.8`.
-   **`lineHeightMinWidth`**: The line height at the minimum width (unitless). Default: `1.33`.
-   **`lineHeightMaxWidth`**: The line height at the maximum width (unitless). Default: `1.25`.
-   **`variableGradeMinWidth`**: The font weight (for variable fonts) at the minimum width, e.g., `450`.
-   **`variableGradeMaxWidth`**: The font weight at the maximum width, e.g., `400`.
-   **`container`**: Determines whether the element's own width (`"self"`) or its parent container's width (`"parent"`) is used. Default: `"parent"`.
-   **`fontSizeUnits`**: The units for font size, e.g., `"em"`, `"px"`, `"rem"`. Default: `"em"`.

For a better sense of context, set your root em to `10px` with `html { font-size: 62.5%; }`. This makes your em units base 10 so `2.4em` = `24px`. But any number will do because once you start adjusting the min/max numbers, the experience is more visual than calculated. And if you prefer a more scientific approach, Textblock gives you the control you need for setting systems like modular scales.

If you’re using variable fonts, the `variableGradeMinWidth` / `variableGradeMaxWidth` parameters provide a way to simulate grades (micro-variations in weight to set smaller sizes slightly bolder).

### Example

```JS
Textblock([{
 target: ".some-class",
 minWidth: 280,
 maxWidth: 800,
 fontSizeMinWidth: 1.9,
 fontSizeMaxWidth: 2.6,
 lineHeightMinWidth: 1.33,
 lineHeightMaxWidth: 1.25,
 variableGradeMinWidth: 366,
 variableGradeMaxWidth: 300,
 container: "self",
 fontSizeUnits: "rem"
}]);
```

### Targeting Multiple Elements with Different Settings

```JS
Textblock([
 {
  target: ".some-class",
  fontSizeMinWidth: 1.9,
  fontSizeMaxWidth: 2.6
 },
 {
  target: ".another-class",
  fontSizeMinWidth: 2.4,
  fontSizeMaxWidth: 3.6,
  variableGradeMinWidth: 450,
  variableGradeMaxWidth: 400,
  container: "self"
 }
]);
```
