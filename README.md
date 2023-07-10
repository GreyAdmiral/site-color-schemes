# site-color-schemes

> This is a plugin of determining and switching the color theme of the site. Adds a class to stylizing a dark or bright site of the site to the HTML element.

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

colorSchemes.click(); // You can also for example: colorSchemes.click({selector: ".class", lightClass: "myLighyClass"});
```

## Methods

   - «auto» — The class class is added activated on the user device (light or dark)
   - «click» — Until the user has used the topic change button, the topic class is added activated on the user device (light or dark).After clicking on the change button of the topic, the choice of the invoice is remembered and at the next opening the site the class selected by the topic selected by the user (light or dark) is added

## Note

When using a plugin without options, the color switch button for the HTML should have an attribute data-color-scheme

#### Example:

```html
<button data-color-scheme>
   <img src="/path-to-the-icon">
   Perhaps the text of the button
</button>
```

## Sample result

```html
<!DOCTYPE html>
<html class="light"> <!-- The result of the work of the plugin -->
...
</html>
```