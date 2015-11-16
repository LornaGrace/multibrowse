(function( $ ) {

	// Puts an event handler on every input of type file inside an element of class "multibrowse"
	$(".multibrowse").delegate("input:file", 'change', function() {
		
		var $filesObject = $(".multibrowse input:file");
		var numberOfInputs = $filesObject.length +1 ;

		if ( ($filesObject.filter(":last").val()) && (numberOfInputs <= 3) ) {
			console.log( "NumberOfFiles is " + numberOfFiles );
			var attributes = $filesObject.filter(":first").prop( "attributes" );
			var $newFile = $("<input>");
			$.each(attributes, function() {
				if ( this.name == "id" || this.name == "name" ) {
					$newFile.attr(this.name, (this.value) + ( numberOfFiles + 1 ));
				} else {
	    			$newFile.attr(this.name, this.value);
	    		}
			});

			$filesObject.filter(":last").after( $newFile );
		}
	});

}(jQuery));