(function( $ ) {

	// Enter your options here (see doc)
	var userOptions = {
		// maxNumberOfInputs:
		// maxFileSize:
		// maxTotalSize:
	};

	var $multibrowse = $(".multibrowse");
	
	// Helper method that adds another file input after the last one 
	$.fn.createFileInput = function( attributes ) {
		var $newFile = $("<input>");
		// Copies the attributes adds a suffix to "id" and "name"
		$.each(attributes, function() {
			if ( this.name == "id" || this.name == "name" ) {
				$newFile.attr(this.name, (this.value) + ( $(".multibrowse input:file").length +1 ));
			} else {
    			$newFile.attr(this.name, this.value);
    		}
		});
		$(".multibrowse input:file:last").after( $newFile ).after( "<br>" );
	}

	// Helper method that adds a message below the form header
	$.fn.writeMessage = function( message ) {
		var $message = $( "<p class=\"multiBrowseMessage\"></p>" );
		$message.html( message );
		$multibrowse.prepend( $message );
	}


	// MAIN FUNCTION
	$.fn.addFileInput = function( options ){

		// Default options
		var settings = $.extend({
			maxNumberOfInputs: 3,
			maxFileSize: 3000000,
			maxTotalSize: 7000000
		}, options );

		// Attach an event handler on every input of type file inside an element of class "multibrowse"
		$multibrowse.delegate("input:file", 'change', function() {
			
			var $filesObject = $(".multibrowse input:file");
			var attributes = $filesObject.filter(":first").prop( "attributes" );
			var numberOfInputs = $filesObject.length;

			// Stores the conditions for adding an empty input file
			var addNewInput = ($filesObject.filter(":last").val()) && (numberOfInputs < settings.maxNumberOfInputs);
			
			// Checks that the size of last file is less than maxFileSize
			if (this.files[0].size > settings.maxFileSize) {
				$multibrowse.writeMessage( "Last File Too Big you Idiot !!!" );
				addNewInput = false;
			}

			// Calculates the size of all files put together
			var totalSize = 0;
			$filesObject.each( function(index) {
				// Skips the last input if empty (in case a file has been replaced in another input)
				if ($filesObject[index].files[0] == undefined && index == numberOfInputs - 1) {
					return true;
				}
				totalSize += $filesObject[index].files[0].size;
			});

			// Checks the file size, then the max file size
			if ( totalSize > settings.maxTotalSize ){
				$multibrowse.writeMessage( "Total File Too Big you Idiot !!!" );
			} 

			// Adds another input of type file if the max number of inputs has not been reached
			// AND the last file input is not empty
			if ( addNewInput ) {
				$multibrowse.createFileInput( attributes);
			}

		});
		
	}

	$multibrowse.addFileInput( userOptions );

}(jQuery));


