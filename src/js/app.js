/**
 * esb.js v1.0.0
 * https://github.com/Devgaze/expandable-search
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @module ESB
 */
 ;(function(window, document, undefined){

  'use strict';

  /**
   * ESB class that binds listeners to elements of provided form element
   *
   * @class ESB
   * @constructor
   * @param {DOMElement} domForm
   */
  function ESB (domForm) {
    
    try {

      this.domForm = domForm || document.getElementById('searchForm');
      
      if (this.domForm === null)
      {
        throw new Error('You have to specify form to use this plugin or add/change your form ID to "searchForm"');
      }

    } catch (e) {
      // gracefully report
      console.error(e.message);
    }
    
  }


  window.ESB = ESB;

})(window, document);