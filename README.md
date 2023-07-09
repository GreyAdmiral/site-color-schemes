# site-color-schemes

> This is a plugin of determining and switching the color theme of the site.

## Install

```shell
npm i site-color-schemes
```

## Import

```javascript
const colorSchemes = require("site-color-schemes");
```
or

```javascript
import colorSchemes from 'site-color-schemes'
```

## Options

Type: `object`

### selector

Type: `string`<br>
Default: `[data-color-scheme]`<br>

The selector defining button for the color change

### lightClass

Type: `string`<br>
Default: `light`

Class added with active light color theme

### darkClass

Type: `string`<br>
Default: `dark`

Class added with a dark color topic

## Usage

```javascript
const colorSchemes = require("site-color-schemes");

colorSchemes.auto(); // You can also for example: colorSchemes.auto({lightClass: "myLighyClass", darkClass: "myDarkClass});
```

or

```javascript
const colorSchemes = require("site-color-schemes");

colorSchemes.click(); // You can also for example: colorSchemes.click({selector: ".class"});
```

## Note

When using a plugin without options, the color switch button for the HTML should have an attribute data-color-scheme

#### Example:

```html
<button data-color-scheme><img src="/path-to-the-icon">Perhaps the text of the button</button>
```
