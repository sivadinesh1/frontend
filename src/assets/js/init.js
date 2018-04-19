
var webGlObject = (function() { 
  return { 
    init: function() { 
      //alert('webGlObject initialized');
      console.log('called init..');
      
      setTimeout(function () {
        try {
          // $('.parallax').parallax();
          // $('.slider').slider({full_width: false, height:600});
         
          $('.button-collapse').sideNav();
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


