(function( $ ) {

	// Enter your options here (see doc)
	var userOptions = {
		// maxNumberOfInputs:
		// maxFileSize:
		// maxTotalSize:
	};

	$multibrowse = $(".multibrowse");

	$.fn.addFileInput = function( options ){

		// Default options
		var settings = $.extend({
			maxNumberOfInputs: 3,
			maxFileSize: 1000000,
			maxTotalSize: 3000000
		}, options );

		// Puts an event handler on every input of type file inside an element of class "multibrowse"
		$multibrowse.delegate("input:file", 'change', function() {
			
			var $filesObject = $(".multibrowse input:file");
			var numberOfInputs = $filesObject.length +1 ;

			if ( ($filesObject.filter(":last").val()) && (numberOfInputs <= settings.maxNumberOfInputs) ) {
				var attributes = $filesObject.filter(":first").prop( "attributes" );
				var $newFile = $("<input>");
				$.each(attributes, function() {
					if ( this.name == "id" || this.name == "name" ) {
						$newFile.attr(this.name, (this.value) + ( numberOfInputs + 1 ));
					} else {
		    			$newFile.attr(this.name, this.value);
		    		}
				});

				$filesObject.filter(":last").after( $newFile );
			}
		});

	}

	// $multibrowse.addFileInput( userOptions );

}(jQuery));