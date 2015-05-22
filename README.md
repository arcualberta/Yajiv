# Yajiv

You will need bower to install Yajiv dependencies. To install bower you will need npm:

```
curl -L https://www.npmjs.com/install.sh | sh
```

After npm is installed install bower:

```
npm install -g bower
```

Now install the dependencies by running the install command from inside the Yajiv directory.

```
bower install
```

To use this widget in omeka you will need to include a set of files on the head portion of the page.

```html
	<script type="text/javascript" src="bower_components/jquery/dist/jquery.min.js"></script>
	<script type="text/javascript" src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/yajiv.js"></script>

	<link rel="stylesheet" type="text/css" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/yajiv.css">
```

After that define galleryTitle variable and gallery array of hashes on the html head as so:

```html
<script>
	var galleryTitle = "Gallery title";
	var gallery = [
		{
			image: "img/original/5226b42fdff6a8ec50ed0b21f3442366.jpg",
			thumbnail: "img/thumbnail/5226b42fdff6a8ec50ed0b21f3442366.jpg"
		},
		{
			image: "img/original/9b42800a33b3582d5bed056d1a8ef0f7.jpg",
			thumbnail: "img/thumbnail/9b42800a33b3582d5bed056d1a8ef0f7.jpg"
		}
	};
</script>
```

To open the gallery modal add an elment with the "show-gallery" id.

```html
<button class='btn btn-primary' id="show-gallery">Open gallery</button>  
```





