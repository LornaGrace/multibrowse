(function( $ ) {


	/* Private variables
	********************************************************/
	var $multibrowse = $(".multibrowse"),
		$mb_submit = $(".mb_submit"),
		$mb_reset  = $(".mb_reset"),
		$filesObject = $(".multibrowse input:file"),
		attributes = $filesObject.filter(":first").prop( "attributes" ),
		numberOfInputs = 0,

	/* Options
	********************************************************/
		userOptions = {
		maxNumberOfInputs: $multibrowse.data("mb-inputs-max"),
		maxFileSize: $("input[name='MAX_FILE_SIZE']").attr("value"),
		maxTotalSize: $multibrowse.data("mb-total-size"),
		previewWidth: $multibrowse.data("mb-preview-width")
	};

	// Re-enables the "submit" button in case of browser refresh
	$mb_submit[0].disabled = false;


	/* INITIALISATION FUNCTION
	********************************************************/
	$.fn.addFileInput = function( options ){

		// Default options
		var settings = $.extend({
			maxNumberOfInputs: 3,
			maxFileSize: 1000000,
			maxTotalSize: 5000000,
			previewWidth: 200
		}, options );


		// Attach an event handler on every input of type file inside an element of class "multibrowse"
		$multibrowse.on('change', "input:file", function() {

			$filesObject = $(".multibrowse input:file");
			numberOfInputs = $filesObject.length;
			// Conditions for adding an empty input file
			var addNewInput = ($filesObject.filter(":last").val()) && (numberOfInputs < settings.maxNumberOfInputs);

			// Checks that the size of last file is less than maxFileSize
			if (this.files[0].size > settings.maxFileSize) {
				var message = "The file " + this.files[0].name + " has the size ";
				message    += getReadableFileSize(this.files[0].size) + "<br>";
				message    += "The maximum file size is " + getReadableFileSize(settings.maxFileSize);
				fileIsTooBig(message);
			} else if ( getTotalSize() > settings.maxTotalSize ){ // Same thing with the total file size
				var message = "The total file size is ";
				message    += getReadableFileSize(getTotalSize()) + "<br>";
				message    += "The maximum file size is " + getReadableFileSize(settings.maxTotalSize);
				fileIsTooBig(message);
			} else { // Make sure the submit button is enabled and the error message disappears
				$mb_submit[0].disabled = false;
				if( $(".mb-message").length) {
					$(".mb-message").remove();
				}
			}

			// Attach a preview to the file input
			generatePreview( $(this), settings.previewWidth );

			// Adds another input of type file if the contitions are respected
			if ( addNewInput ) {
				createFileInput( attributes);
			}

		});

		// Adds an event handler on mb_reset that leaves only one empty input
		// Re-enables the submit button and removes the error message
		if ($mb_reset.length) {
			$mb_reset.click( function( event ) {
				event.preventDefault();
				$(".multipreview").remove();
				$("input:file").not(":first").remove();
				$('input:file').val('');
				$mb_submit[0].disabled = false;
				$(".mb-message").remove();
			});
		}

		return this;
		
	}


	/* Helper functions
	********************************************************/

	// Helper method that treats errors when the file size is too big :
	var fileIsTooBig = function( message ) {
		var $message = $( "<p class=\"mb-message\"></p>" );
		$message.html( message );
		$multibrowse.prepend( $message );
		$mb_submit[0].disabled = true;
		addNewInput = false;
	}

	// Helper method that adds another file input wrapped in a div
	var createFileInput = function( attributes ) {
		var $newWrapper = $("<div class='mb_wrapper'></div>")
		var $newFile = $("<input>");
		// Copies the attributes adds a suffix to "id" and "name"
		$.each(attributes, function() {
			if ( this.name == "id" || this.name == "name" ) {
				$newFile.attr(this.name, (this.value) + ( $(".multibrowse input:file").length +1 ));
			} else {
    			$newFile.attr(this.name, this.value);
    		}
		});
		$newWrapper.append($newFile);
		$(".multibrowse .mb_wrapper:last").after( $newWrapper );
		
	}


	// Helper method that inserts a preview of the file uploaded
	var generatePreview = function( $input, width ) {
		$preview = $("<img>");
		$preview.addClass("multipreview").width(width);
		var reader = new FileReader();
		reader.onload = function(e) {
			$preview.attr('src', e.target.result);
		}
		reader.readAsDataURL($input[0].files[0]);
		if ($input.next().is("img")) {
			$input.next().remove();
		}
		$input.parent().append($preview);
	}

	// Helper method that translate a size in bytes into human readable format
	var getReadableFileSize = function(fileSizeInBytes) {

	    var i = -1;
	    var byteUnits = [' kB', ' MB', ' GB'];
	    do {
	        fileSizeInBytes = fileSizeInBytes / 1000;
	        i++;
	    } while (fileSizeInBytes > 1000);

	    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
	};


	// Helper method that calculates the total size of all files
	var getTotalSize = function() {
		var totalSize = 0;
		$filesObject.each( function(index) {
			// Skips the last input if empty
			if ($filesObject[index].files[0] == undefined ) {
				return true;
			}
			totalSize += $filesObject[index].files[0].size;
		});
		return totalSize;
	}


	$multibrowse.addFileInput( userOptions );

}(jQuery));


