(function( $ ) {

	// Puts an event handler on every input of type file inside an element of class "multibrowse"
	$(".multibrowse").delegate("input:file", 'change', function() {
		var $newFile = $("<input type=\"file\">");
		$( ".multibrowse input:file:last" ).after( $newFile );
	});

}(jQuery));