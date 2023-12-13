(function () {
    const App = {
      _fr: document.querySelector('#fr'),
      _ar: document.querySelector('#ar'),
      _ja: document.querySelector('#ja'),
      _ch: document.querySelector('#ch'),
      _background: document.querySelector('.background'),
      _content: document.querySelector('.content'),
      footer: document.querySelector('.footer'),

      
      // initialisations
      app_init: function () {
        App.app_handlers();
      },
  
      // les gestionnaires d'ev
      app_handlers: function () {  
        App._fr.addEventListener("click", App.languageFr);
      },
  
      languageFr: () => {
      },
    };
    window.addEventListener("DOMContentLoaded", App.app_init);
  })();