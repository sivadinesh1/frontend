
var webGlObject = (function() { 
  return { 
    init: function() { 
      //alert('webGlObject initialized');
      console.log('called init..');
      
      setTimeout(function () {
        try {
          // $('.parallax').parallax();
          // $('.slider').slider({full_width: false, height:600});
         
        //  $('.button-collapse').sideNav();
          $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            hover: true, // Activate on hover
            belowOrigin: true, // Displays dropdown below the button
            alignment: 'right' // Displays dropdown with edge aligned to the left of button
          }
        );
    } catch (e) {
      console.log(e);
    }

/*
	By Osvaldas Valutis, www.osvaldas.info
	Available for use under the MIT License
*/

'use strict';

;( function ( document, window, index )
{
	var inputs = document.querySelectorAll( '.inputfile' );
	Array.prototype.forEach.call( inputs, function( input )
	{
		var label	 = input.nextElementSibling,
			labelVal = label.innerHTML;

		input.addEventListener( 'change', function( e )
		{
			var fileName = '';
			if( this.files && this.files.length > 1 )
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
			else
				fileName = e.target.value.split( '\\' ).pop();

			if( fileName )
				label.querySelector( 'span' ).innerHTML = fileName;
			else
				label.innerHTML = labelVal;
		});

		// Firefox bug fix
		input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
		input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
	});
}( document, window, 0 ));

  }, 1000);
      
    }, 
fontawesomeload: function() {
  try {
    var scriptEl = document.createElement('script')
    document.body.appendChild(scriptEl);
    scriptEl.setAttribute("type","text/javascript");
    scriptEl.setAttribute("async","");
    scriptEl.setAttribute("defer","");
    scriptEl.setAttribute("src", "https://use.fontawesome.com/4297a216e1.js");
  } catch (e) {
    console.log(e);
  }
}
    
  } 
  
})(webGlObject||{})


