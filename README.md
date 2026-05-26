# site-color-schemes

> This is a plugin of determining and switching the color theme of the site. Adds a class or an attribute to the root of the page for stylizing the dark and bright theme of the site.

## Install

#### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/site-color-schemes@2.0.0/dist/site-color-schemes.min.js"></script>
```

or

```html
<script src="https://unpkg.com/site-color-schemes@2.0.0/dist/site-color-schemes.min.js"></script>
```

#### Import

Run the command in the console

```shell
npm i site-color-schemes
```

Perform the import

```javascript
const colorSchemes = require('site-color-schemes');
```

or

```javascript
import colorSchemes from 'site-color-schemes';
```

## Options

Type: `object`

### selector

Type: `string`<br>
Default: `[data-color-scheme]`<br>

The selector defining button for the color change

### resetSelector

Type: `string`<br>
Default: `[data-scheme-reset]`<br>

Selector button to reset color

### lightClass

Type: `string`<br>
Default: `light`

Class added with active light color theme

### darkClass

Type: `string`<br>
Default: `dark`

Class added with a dark color topic

### mode

Type: `string`<br>
Default: `class`<br>
Possible values: `class`, `attribute`

Add a class or attribute. The value of the attribute will be alternately the value of a dark or light class.

### storage

Type: `string`<br>
Default: `localStorage`<br>
Possible values: `localStorage`, `cookies`

Select a storage for the colors cheme state. You can choose from localStorage or cookies.

## Usage

#### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/site-color-schemes@2.0.0/dist/site-color-schemes.min.js"></script>

...

<script>
   siteColorSchemes.auto(); // You can also for example: colorSchemes.auto({selector: ".class", resetSelector: "#id", lightClass: "myLighyClass", darkClass: "myDarkClass", mode: "class", storage: "cookies"}});
</script>
```

or

```html
<script src="https://cdn.jsdelivr.net/npm/site-color-schemes@2.0.0/dist/site-color-schemes.min.js"></script>

...

<script>
   siteColorSchemes.click(); // You can also for example: colorSchemes.click({selector: "#id", resetSelector: ".class", lightClass: "myLighyClass", darkClass: "myDarkClass", mode: "attribute", storage: "localStorage"}});
</script>
```

#### Import

```javascript
const colorSchemes = require('site-color-schemes');

colorSchemes.auto(); // You can also for example: colorSchemes.auto({selector: ".class", resetSelector: "#id", lightClass: "myLighyClass", darkClass: "myDarkClass", mode: "class", storage: "cookies"}});
```

or

```javascript
const colorSchemes = require('site-color-schemes');

colorSchemes.click(); // You can also for example: colorSchemes.click({selector: "#id", resetSelector: ".class", lightClass: "myLighyClass", darkClass: "myDarkClass", mode: "attribute", storage: "localStorage"}});
```

## Methods

- «auto» — The class class or an attribute is added activated on the user device (light or dark)
- «click» — Until the user has used the topic change button, the topic class or an attribute is added activated on the user device (light or dark). After clicking on the change button of the topic, the choice of the invoice is remembered and at the next opening the site the class or an attribute selected by the topic selected by the user (light or dark) is added

## Note

When using a plugin without options, the color switch button for the HTML should have an attribute data-color-scheme

#### Example:

```html
<button data-color-scheme>
   <img src="/path-to-the-icon" />
   Perhaps the text of the button
</button>
```

or

```html
<button data-color-scheme>
   <img src="/path-to-the-icon" />
   Perhaps the text of the button
</button>

...

<button data-scheme-reset>
   <img src="/path-to-the-icon" />
   Perhaps the text of the button
</button>
```

## Samples of the result

```html
<!DOCTYPE html>
<html class="light">
   <!-- The result of the work of the plugin -->
   ...
</html>
```

or

```html
<!DOCTYPE html>
<html data-theme="light">
   <!-- The result of the work of the plugin -->
   ...
</html>
```
