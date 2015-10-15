# Expandable Search Bar

Expandable search bar is an UI/UX pattern that helps to reduce visual overload of controls through displaying controls on demand. Even though it is designed as a solution for smaller screen sizes (mobile/tablet), it is also very common pattern for desktop versions too. 


## Getting Started

To start using the plugin copy/move `esb.min.js` to scripts folder and `esb.min.css` to your styles folder.

Prepare your HTML

```html
<form id="search-form" role="search">
  <div>
    <input type="text" name="search" placeholder="search..." class="search-query" />
    <input type="submit" role="button" value="Search" class="search-button icon icon-search">
  </div>
</form>
```

Include CSS file `esb.min.css` inside of your `<head>` tag 

```html
<head>
  ...
  <link rel="stylesheet" href="styles/esb.min.css" />
  <!-- YOUR OTHER STYLE FILES -->
</head>
```

And Javascript file `esb.min.js` at the end of your HTML 

```html
<body>
  ...
  <script type="text/javascript" src="js/esb.min.js"></script>
  <!-- YOUR OTHER JAVASCRIPT FILES -->
</body>
</html>
```

Fetch the `FORM` element of search bar form, pass it as parameter to `ESB` class

```javascript
var sb = new ESB('search-form');

```

<!-- Introduction - Summary - Installation - Downloads - FAQ - API explorer - Getting Started - Examples - Contributors -->



