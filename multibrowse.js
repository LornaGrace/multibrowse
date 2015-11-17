(function( $ ) {

	// Enter your options here (see doc)
	var userOptions = {
		// maxNumberOfInputs:
		// maxFileSize:
		// maxTotalSize:
	};

	var $multibrowse = $(".multibrowse");
	
	// Helper method that adds anothe file input after the last one 
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



	$.fn.writeMessage = function( message ) {
		var $message = $( "<p class=\"multiBrowseMessage\"></p>" );
		$message.html( message );
		$multibrowse.prepend( $message );
	}



	$.fn.addFileInput = function( options ){

		// Default options
		var settings = $.extend({
			maxNumberOfInputs: 5,
			maxFileSize: 7000000,
			maxTotalSize: 7000000
		}, options );

		// Puts an event handler on every input of type file inside an element of class "multibrowse"
		$multibrowse.delegate("input:file", 'change', function() {
			
			var $filesObject = $(".multibrowse input:file");
			var attributes = $filesObject.filter(":first").prop( "attributes" );
			var numberOfInputs = $filesObject.length;
			
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
			if ((  this.files[0].size > settings.maxFileSize) 
			|| totalSize > settings.maxTotalSize ){
				$message  = "Your files are too large";
				$multibrowse.writeMessage( "Too Big you Idiot !!!" );
			} 

			// Adds another input of type file if the max number of inputs has not been reached
			// AND the last file input is not empty
			if ( ($filesObject.filter(":last").val()) && (numberOfInputs <= settings.maxNumberOfInputs -1) ) {
				$multibrowse.createFileInput( attributes);
			}

		});
		
	}

	$multibrowse.addFileInput( userOptions );

}(jQuery));


