(function( $ ) {


	/* Global variables
	********************************************************/
	var $multibrowse = $(".multibrowse");
	var $mb_submit = $(".mb_submit");
	var $mb_reset  = $(".mb_reset");
	$mb_submit[0].disabled = false; // Re-enables the "submit" button in case of browser refresh


	/* Options
	********************************************************/
	var userOptions = {
		maxNumberOfInputs: $multibrowse.attr("mb-inputs-max"),
		maxFileSize: $("input[name='MAX_FILE_SIZE']").attr("value"),
		maxTotalSize: $multibrowse.attr("mb-total-size"),
		previewWidth: $multibrowse.attr("mb-preview-width")
	};


	/* MAIN FUNCTION
	********************************************************/
	$.fn.addFileInput = function( options ){

		// Default options
		var settings = $.extend({
			maxNumberOfInputs: 5,
			maxFileSize: 1000000,
			maxTotalSize: 5000000,
			previewWidth: 200
		}, options );


		// Attach an event handler on every input of type file inside an element of class "multibrowse"
		$multibrowse.on('change', "input:file", function() {
			
			var $filesObject = $(".multibrowse input:file");
			var attributes = $filesObject.filter(":first").prop( "attributes" );
			var numberOfInputs = $filesObject.length;

			// Conditions for adding an empty input file
			var addNewInput = ($filesObject.filter(":last").val()) && (numberOfInputs < settings.maxNumberOfInputs);

			// Checks that the size of last file is less than maxFileSize
			if (this.files[0].size > settings.maxFileSize) {
				var message = "The file " + this.files[0].name + " has the size ";
				message    += $multibrowse.addFileInput.getReadableFileSize(this.files[0].size) + "<br>";
				message    += "The maximum file size is " + $multibrowse.addFileInput.getReadableFileSize(settings.maxFileSize);
				$multibrowse.addFileInput.fileIsTooBig(message);
			} else if ( $multibrowse.addFileInput.totalSize() > settings.maxTotalSize ){ // Same thing with the total file size
				var message = "The total file size is ";
				message    += $multibrowse.addFileInput.getReadableFileSize($multibrowse.addFileInput.totalSize()) + "<br>";
				message    += "The maximum file size is " + $multibrowse.addFileInput.getReadableFileSize(settings.maxTotalSize);
				$multibrowse.addFileInput.fileIsTooBig(message);
			} else { // Make sure the submit button is enabled and the error message disappears
				$mb_submit[0].disabled = false;
				if( $(".mb-message").length) {
					$(".mb-message").remove();
				}
			}

			// Attach a preview to the file input
			$multibrowse.addFileInput.generatePreview( $(this), settings.previewWidth );

			// Adds another input of type file if the max number of inputs has not been reached
			// AND the last file input is not empty
			if ( addNewInput ) {
				$multibrowse.addFileInput.createFileInput( attributes);
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
	$.fn.addFileInput.fileIsTooBig = function( message ) {
		$multibrowse.addFileInput.writeMessage( message );
		$mb_submit[0].disabled = true;
		addNewInput = false;
	}

	// Helper method that adds another file input wrapped in a div
	$.fn.addFileInput.createFileInput = function( attributes ) {
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
	$.fn.addFileInput.generatePreview = function( $input, width ) {
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



	// Helper method that adds a message below the form header
	$.fn.addFileInput.writeMessage = function( message ) {
		var $message = $( "<p class=\"mb-message\"></p>" );
		$message.html( message );
		$multibrowse.prepend( $message );
	}


	// Helper method that translate a size in bytes into human readable format
	$.fn.addFileInput.getReadableFileSize = function(fileSizeInBytes) {

	    var i = -1;
	    var byteUnits = [' kB', ' MB', ' GB'];
	    do {
	        fileSizeInBytes = fileSizeInBytes / 1000;
	        i++;
	    } while (fileSizeInBytes > 1000);

	    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
	};


	// Helper method that calculates the total size of all files
	$.fn.addFileInput.totalSize = function() {
		var totalSize = 0;
		var $filesObject = $(".multibrowse input:file");
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


