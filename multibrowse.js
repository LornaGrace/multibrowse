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
		var $filesObject = $(".multibrowse input:file");

		// Copies the attributes from first input, adds a suffix to "id" and "name"
		$.each(attributes, function() {
			if ( this.name == "id" || this.name == "name" ) {
				$newFile.attr(this.name, (this.value) + ( $filesObject.length +1 ));
			} else {
    			$newFile.attr(this.name, this.value);
    		}
		});

		$filesObject.filter(":last").after( $newFile ).after( "<br>" );
	}

	$.fn.addFileInput = function( options ){

		// Default options
		var settings = $.extend({
			maxNumberOfInputs: 3,
			maxFileSize: 7000000,
			maxTotalSize: 7000000
		}, options );

		// Puts an event handler on every input of type file inside an element of class "multibrowse"
		$multibrowse.delegate("input:file", 'change', function() {
			
			var $filesObject = $(".multibrowse input:file");			
			var attributes = $filesObject.filter(":first").prop( "attributes" );
			var numberOfInputs = $filesObject.length;
			var totalSize = 0;

			$filesObject.each( function(index) {
				totalSize += this.files[0].size;
			});

			// Checks the file size, then the max file size
			if ((  $filesObject[numberOfInputs -1].files[0].size > settings.maxFileSize) 
				|| totalSize > settings.maxTotalSize ){
				$filesObject.filter(":last").remove();
				$multibrowse.createFileInput( attributes);
				console.log( "Too big you idiot");
			} 
			// Adds another input of type file if the max number of inputs has not been reached
			// AND the last file input is not empty
			else if ( ($filesObject.filter(":last").val()) && (numberOfInputs <= settings.maxNumberOfInputs -1) ) {
				$multibrowse.createFileInput( attributes);
			}
		});

	}

	$multibrowse.addFileInput( userOptions );

}(jQuery));