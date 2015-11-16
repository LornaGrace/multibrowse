(function( $ ) {

	// Puts an event handler on every input of type file inside an element of class "multibrowse"
	$(".multibrowse").delegate("input:file", 'change', function() {
		
		if ($( ".multibrowse input:file:last" ).val()) {
			var numberOfFiles = $( ".multibrowse input:file" ).length;
			var attributes = $( ".multibrowse input:file:first" ).prop( "attributes" );
			var $newFile = $("<input>");
			$.each(attributes, function() {
				if ( this.name == "id" || this.name == "name" ) {
					$newFile.attr(this.name, (this.value) + ( numberOfFiles + 1 ));
				} else {
	    			$newFile.attr(this.name, this.value);
	    		}
			});

			$( ".multibrowse input:file:last" ).after( $newFile );
		}
	});

}(jQuery));