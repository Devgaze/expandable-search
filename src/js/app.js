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
    
    this.domForm = domForm || document.getElementById('searchForm');

  }

  window.ESB = ESB;

})(window, document);