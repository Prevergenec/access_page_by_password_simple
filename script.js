'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const police = document.querySelector('.police-all'),
        btn = document.querySelector('.police-btn'),
      policeCookie = getCookie('police');
    
    if(policeCookie == 'true') {
      police.classList.add('hide');
    }
    
    btn.addEventListener('click', () => {
      setCookie('police', 'true', {"path": '/', "max-age": 86400}); // кол-во секунд в дне
      police.classList.add('hide');
    });
    
    function getCookie(name) {
      let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    
    function setCookie(name, value, options = {}) {

      if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
      }
      
      let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

      for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
      }

      document.cookie = updatedCookie;
    }
    
});