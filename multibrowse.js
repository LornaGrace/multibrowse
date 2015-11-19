(function( $ ) {


	/* Enter your options here (see doc)
	********************************************************/
	var userOptions = {
		// maxNumberOfInputs:
		// maxFileSize:
		// maxTotalSize:
		// previewWidth;
		// rightMargin;
	};


	/* Global variables
	********************************************************/
	var $multibrowse = $(".multibrowse");
	var $multisubmit = $(".multisubmit");
	var $multireset  = $(".multireset");
	$multisubmit[0].disabled = false; // Re-enables the "submit" button in case of browser refresh
	

	/* Helper functions
	********************************************************/

	// Helper method that adds another file input wrapped in a div
	$.fn.createFileInput = function( attributes ) {
		var $newWrapper = $("<div class='mb-wrapper'></div>")
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
		$(".multibrowse .mb-wrapper:last").after( $newWrapper );
		
	}


	// Helper method that inserts a preview of the file uploaded
	$.fn.generatePreview = function( $input, width, margin ) {
		$preview = $("<img>");
		$preview.addClass("multipreview").width(width).css("margin-right", margin);
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
	$.fn.writeMessage = function( message ) {
		var $message = $( "<p class=\"multiBrowseMessage\"></p>" );
		$message.html( message );
		$multibrowse.prepend( $message );
	}


	// Helper method that translate a size in bytes into human readable format
	$.fn.getReadableFileSize = function(fileSizeInBytes) {

	    var i = -1;
	    var byteUnits = [' kB', ' MB', ' GB'];
	    do {
	        fileSizeInBytes = fileSizeInBytes / 1000;
	        i++;
	    } while (fileSizeInBytes > 1000);

	    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
	};


	// Helper method that calculates the total size of all files
	$.fn.totalSize = function() {
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



	/* MAIN FUNCTIONS
	********************************************************/
	$.fn.addFileInput = function( options ){

		// Default options
		var settings = $.extend({
			maxNumberOfInputs: 5,
			maxFileSize: 7000000,
			maxTotalSize: 7000000,
			previewWidth: 200,
			rightMargin: 20
		}, options );

		// Attach an event handler on every input of type file inside an element of class "multibrowse"
		$multibrowse.delegate("input:file", 'change', function() {
			
			var $filesObject = $(".multibrowse input:file");
			var attributes = $filesObject.filter(":first").prop( "attributes" );
			var numberOfInputs = $filesObject.length;

			$filesObject.each( function (){
				$(this).width( settings.previewWidth ).css("margin-right", settings.rightMargin);
			});

			// Stores the conditions for adding an empty input file
			var addNewInput = ($filesObject.filter(":last").val()) && (numberOfInputs < settings.maxNumberOfInputs);
			
			console.log( this.files[0].size );

			// Checks that the size of last file is less than maxFileSize
			if (this.files[0].size > settings.maxFileSize) {
				var message = "The file " + this.files[0].name + " has the size ";
				message    += $multibrowse.getReadableFileSize(this.files[0].size) + "<br>";
				message    += "The maximum file size is " + $multibrowse.getReadableFileSize(settings.maxFileSize);
				$multibrowse.writeMessage( message );
				$multisubmit[0].disabled = true;
				addNewInput = false;
			}

			// Checks the file size, then the max file size
			if ( $multibrowse.totalSize() > settings.maxTotalSize ){
				var message = "The total file size is ";
				message    += $multibrowse.getReadableFileSize($multibrowse.totalSize()) + "<br>";
				message    += "The maximum file size is " + $multibrowse.getReadableFileSize(settings.maxTotalSize);
				$multibrowse.writeMessage(message);
				$multisubmit[0].disabled = true;
				addNewInput = false;
			}

			// Attach a preview to the file input
			$multibrowse.generatePreview( $(this), settings.previewWidth, settings.rightMargin );

			// Adds another input of type file if the max number of inputs has not been reached
			// AND the last file input is not empty
			if ( addNewInput ) {
				$multibrowse.createFileInput( attributes);
			}

		});

		// Adds an event handler on multireset that leaves only one empty input
		// Re-enables the submit button and removes the error message
		if ($multireset.length) {
			$multireset.click( function( event ) {
				event.preventDefault();
				$(".multipreview").remove();
				$("input:file").not(":first").remove();
				$('input:file').val('');
				$multisubmit[0].disabled = false;
				$(".multiBrowseMessage").remove();
			});
		}
		
	}

	$multibrowse.addFileInput( userOptions );

}(jQuery));


