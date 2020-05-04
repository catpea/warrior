jQuery(function($){

  var flipButton = $('<button></button>');
  var resetButton = $('<button></button>');

  $('li.theme-switcher').append(flipButton);
  $('li.theme-switcher-reset').append(resetButton);

  resetButton.on('click', function(){
    localStorage.removeItem('current-theme');
  });

  flipButton.on('click', function(){
    // user action entails use of force
    if(getTheme()=='light'){
      $('html').attr('data-theme', 'dark')
      localStorage.setItem('current-theme', 'dark');
    }else{
      // user action entails use of force
      $('html').attr('data-theme', 'light')
      localStorage.setItem('current-theme', 'light');
    }
    updateUI();
  });

  function updateUI(){
    if(getTheme()=='light'){
      flipButton.text('Turn off dark mode');
    }else{
      flipButton.text('Turn on dark mode');
    }
  }

  function getTheme() {
    var currentTheme = localStorage.getItem('current-theme');
    if(currentTheme){ // user is controlling color scheme by hand, override prefers color scheme
      return currentTheme;
    }
    if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    } else {
      return 'light';
    }
  }


})
