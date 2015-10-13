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
   * @param {DOMElement} formElement
   */
  function ESB (formElement) {
    
    try {

      var formId = (formElement !== '') ? formElement : 'search-form';

      this.formElement = document.getElementById(formId);
      
      if (this.formElement === null) {

        throw new Error('You have to specify form to use this plugin or add/change your form ID to "searchForm"');
      
      }
      
      // identify control container & controls
      // 
      this.container = document.querySelector('form#' + formId + ' div');
      
      if (this.container === null) {

        throw new Error('Container element is missing! Please check example code for proper markup.');
      
      }

      this.searchQuery = document.querySelector('form#' + formId + ' .search-query');

      if (this.searchQuery === null) {

        throw new Error('Search query field ID is missing! Please check example code for proper markup.');
      
      }

      this.searchButton = document.querySelector('form#' + formId + ' .search-button');
      
      if (this.searchButton === null) {

        throw new Error('Search button ID is missing! Please check example code for proper markup.');
      
      }
      
      // if all elements are here - proceed
      // this._initListeners();

    } catch (e) {
      // gracefully report
      console.error(e.message);
    }
    
  }

  window.ESB = ESB;

})(window, document);