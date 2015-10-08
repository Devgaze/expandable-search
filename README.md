# Expandable Search Bar

Expandable search bar is an UI/UX pattern that helps to reduce visual overload of controls through displaying controls on demand. Even though it is designed as a solution for smaller screen sizes (mobile/tablet), it is also very common pattern for desktop versions too. 


## Getting Started

1. To start using the plugin copy/move `esb.min.js` to scripts folder and `esb.min.css` to your styles folder

2. Prepare your HTML

```
<form id="searchBarForm" role="search">
  <div>
    <input type="text" name="search" placeholder="search..." class="searchTerm" />
    <input type="submit" role="button" value="Search" class="searchBtn icon icon-search">
  </div>
</form>
```

3. Include CSS file `esb.min.css` inside of your `<head>` tag 

```
<head>
  ...
  <link rel="stylesheet" href="styles/esb.min.css" />
  <!-- YOUR OTHER STYLE FILES -->
</head>
```

4. And Javascript file `esb.min.js` at the end of your HTML 

```
<body>
  ...
  <script type="text/javascript" src="js/esb.min.js"></script>
  <!-- YOUR OTHER JAVASCRIPT FILES -->
</body>
</html>
```

3. Fetch the `FORM` element of search bar form, pass it as parameter to `ESB` class

```
var searchBarFormElement = document.getElementById('searchBarForm');
var sb = ESB(searchBarFormElement);

```

<html>
<head>
  ...
</head>
<body>
  ...
  <script type="text/javascript" src="js/esb.min.js"></script>
  <!-- YOUR OTHER JAVASCRIPT FILES -->
</body>
</html>
```


<!-- Introduction - Summary - Installation - Downloads - FAQ - API explorer - Getting Started - Examples - Contributors -->



