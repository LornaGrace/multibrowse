# multibrowse
JQuery plugin that adds new elements of type "file input" after one has been filled, and performs various checks

## What it does.
Multibrowse dynamically adds an extra input file button each time one is filled, up to a maximum number of files or a maximum total file size. It also displays a preview of each file.
The generated input file will have the same attributes as the original. The name and id will, however, have a number appended at the end of their value which reflects their position. ie : If the original input file has an id and a name of “file-upload”, the first duplicate will have id and name of “file-upload2”.
It is possible to set a button that will reset only the input files without touching the rest of the form.

## Setup :

### Example :

```html
	<form id="sandbox-form" class="multibrowse" action="insertscript.php" method="post">

		<div class="mb_wrapper">
			<input type="file" name="upload" id="file-upload" value="" />
		</div>

		<button type="reset" value="reset" class="mb_reset">Reset</button>
		<button type="submit" class="mb_submit" value="submit">Submit</button>
	</form>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
	<script src="multibrowse.js"></script>
```

### Steps :

1. Add jquery to your web page
2. Link to the script multibrowse.min.js (note : the index.html file is here only for testing and is not required)
3. Add the class “multibrowse” to your form
4. Wrap the file input into a div of class “mb_wrapper”
5. Add the class of “mb_submit” to your submit buton
6. Optional : Add a reset button with the class “mb_wrapper”

## Customisation :

Variables can be customised directly in the html, or inside the plugin if you prefer.
In the plugin, you can do it directly by replacing the expression in the “userOptions” object by the value that you want.

###### maxNumberOfInputs : The maximum number of inputs
- Default : 5
- To set-up : Add an attribute “data-mb-inputs-max” with the desired value to the form.

###### maxFileSize : Self explanatory
- Default : 1MB
- Override with  <input type="hidden" name="MAX_FILE_SIZE" value="500000" />

###### totalFileSize : self explanatory
- Default : 5MB
- Override with : Add an attribute “data-mb-total-size” with the desired value to the form.

###### previewWidth : The width of the preview in pixels.
- Default : 200px
- override with : Add an attribute “data-mb-preview-width” with the desired value to the form.

## Example of customised form :

```html
<form id="sandbox-form" class="multibrowse" action="insertscript.php" method="post" mb-inputs-max=“20” data-mb-total-size=“10000000 ” data-mb-preview-width="400">
```

## What is actually generated :

Every time you add a file, this is what is created :

	<div class="mb_wrapper">
		<input type="file" name="upload" id="file-upload" value="" />
		<img class=“multipreview” style=“width: 200px;” src=“...”></img>
	</div>

	<div class="mb_wrapper">
		<input type="file" name="upload2” id="file-upload2” value="" />
	</div>


1. When you add an image, the preview is created with the class multipreview
2. A new div wrapper with a new file input is added just after

## In case of an error (file too large) :

The message generated just under the `<form>` tag is of class “mb-message”, in case you want to style it.
Also, the submit button is dimmed until the issue has been solved by the user.
