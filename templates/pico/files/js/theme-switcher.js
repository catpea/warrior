/*!
 * Theme Switcher
 *
 * Pico.css - https://picocss.com
 * Copyright 2019 - Licensed under MIT
 */

(function() {

  /**
   * Config
   */

  var switcher = {
    button: {
      element:    'button',
      class:      'contrast switcher theme-switcher',
      on:         '<i>Turn on dark mode</i>',
      off:        '<i>Turn off dark mode</i>'
    },
    resetButton: {
      element:    'button',
      class:      'contrast switcher theme-switcher-reset',
      on:         '<i>Turn on dark mode</i>',
    },
    target:       'li.theme-switcher', // Button append in target
    resetTarget:  'li.theme-switcher-reset', // Button append in target
    selector:     'button.theme-switcher',  // Button selector in Dom
    currentTheme: systemColorScheme()
  };



  /**
   * Init
   */
   document.addEventListener('DOMContentLoaded', (event) => {
     //the event occurred
     themeSwitcher();
   })



  /**
   * Get System Color Scheme
   *
   * @return {string}
   */

  function systemColorScheme() {

    var currentTheme = localStorage.getItem('current-theme');
    if(currentTheme){ // user is controlling color scheme by hand, override prefers color scheme
      return currentTheme;
    }


    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    else {
      return 'light';
    }


  }



  /**
   * Display Theme Switcher
   */

  function themeSwitcher() {


    // Insert Switcher Reset
    if(document.querySelector(switcher.resetTarget)){
      var resetButton = document.createElement(switcher.resetButton.element);
      resetButton.className = switcher.resetButton.class;
      document.querySelector(switcher.resetTarget).appendChild(resetButton);
      resetButton.addEventListener('click', function(event) {
        localStorage.removeItem('current-theme');
        setButtons(systemColorScheme());
        setTheme(systemColorScheme());
      })
      resetButton.innerHTML = 'Reset to system theme'
    }

    // Insert Switcher
    if(document.querySelector(switcher.target)){
      var button = document.createElement(switcher.button.element);
      button.className = switcher.button.class;
      document.querySelector(switcher.target).appendChild(button);

      // Set Current Theme
      setButtons(switcher.currentTheme);
      setTheme(switcher.currentTheme);

      // Click Listener on Switcher
      var switchers = document.querySelectorAll(switcher.selector);
      for (var i = 0; i < switchers.length; i++) {
        switchers[i].addEventListener('click', function(event) {
          // Switch Theme
          if (switcher.currentTheme == 'light') {
            setButtons('dark');
            setTheme('dark', true);
          }
          else {
            setButtons('light');
            setTheme('light', true);
          }
        }, false);
      }
    }else{
      setTheme(switcher.currentTheme);
    }

  }



  /**
   * Set Theme
   *
   * @param {string} set
   */

  function setTheme(set, force) {
    // Apply theme
    document.querySelector('html').setAttribute('data-theme', set);
    switcher.currentTheme = set;

    if(force||localStorage.getItem('current-theme')){
      localStorage.setItem('current-theme', set);
    }
  }
  function setButtons(set) {

    // Text toggle
    if (set == 'light') {
      var label = switcher.button.on;
    }
    else {
      var label = switcher.button.off;
    }


    var switchers = document.querySelectorAll(switcher.selector);
    for (var i = 0; i < switchers.length; i++) {
      switchers[i].innerHTML = label;
      switchers[i].setAttribute('aria-label', stripTags(label));
    }



  }



  /**
   * Strip tags
   *
   * @param {string} html
   * @return {string}
   */

  function stripTags(html) {
    return html.replace(/<[^>]*>?/gm, '');
  }

})();
