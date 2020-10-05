# multinput.js

Multinput.js is a javascript tool that allows you to quickly duplicate one or more input fields.

## Installation
Multinput need JQuery.

```html
<script type="text/javascript" src="multinput.js"></script>
```

## Usage example

```html
<div class="multinput" id="multinput">
  <div class="item">
    <select name="gender[]">
     <option value="mr" data-default>Mr</option>
     <option value="mrs">Mrs</option>
    </select>
    <input type="text" name="firstname[]" data-default="Your name" />
    <!-- As much as you want -->
    <input type="text" name="lastname[]" />
    <div>
      <buton type="button" data-action="add">+</button>
      <!-- Not mandatory -->
      <buton type="button" data-action="moveup">↑</button>
      <buton type="button" data-action="movedown">↓</button>
      <!------------------->
      <buton type="button" data-action="remove">x</button>
    </div>
  </div>
</div>
```
**NOTE:** The `multinput` class is optional, but you need another one or id for initialization.

Initialize multiple
```js
$('.multinput').multinput(options);
```
or unique
```js
new Multinput($('#multinput'), options);
```

## Actions
Four actions can be used with `data-action` attribute :
* add
* moveup
* movedown
* remove

## Default values
Default values can be initialiez with the use of `data-default` without value on a select option or with value on text input field.

## Options
Different customization options are available

Option | Value | Details
-|-|-
animate | boolean *(Default: true)* | Active all animations on changes
speed | integer *(Default : 250)*| Speed in ms of animations
addComplete | function | Callback function called after adding an element
moveComplete | function | Callback function called after moving an element
removeComplete | function | Callback function called after removing an element

