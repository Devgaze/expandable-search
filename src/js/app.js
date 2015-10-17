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
    
    // used for toggling search form
    this.searchExpanded = false;
    
    // used for event tracking
    this.events = [];

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
      

      // set `click` and `touchstart` listener on `searchButton` element
      this._addEventListener(this.searchButton, 'click', this.toggleSearch);

      // and for mobile devices
      this._addEventListener(this.searchButton, 'touchstart', this.toggleSearch);



    } catch (e) {
      // gracefully report
      console.error(e.message);
    }
    
  }


  /**
   * Expand's the container element
   * 
   * @name expand
   *
   */
  ESB.prototype.toggleSearch = function(ev){
    
    // don't submit yet
    ev.preventDefault();

    // don't propagate to body listeners
    ev.stopPropagation();

    if (this.searchExpanded === false){
          
      // animate container - expand
      this._updateClassName('add', 'expanded', this.container);

      // flag it as expanded
      this.searchExpanded = true;

      // listen the body element
      this._addEventListener(document, 'touchstart', this.close);
      this._addEventListener(document, 'click', this.close);

    } else {

      // animate container - collapse
      this._updateClassName('remove', 'expanded', this.container);

      // flag it as expanded
      this.searchExpanded = false;

      // remove listener from body element
      this._removeEventListener(document, 'touchstart', this.close);
      this._removeEventListener(document, 'click', this.close);


      // ready to submit
      this.formElement.submit();

    }
    
  };


  /**
   * Close's the container element, but does not submit the form
   * 
   * @name close
   *
   */
  ESB.prototype.close = function(ev){
    
    var target = ev.target || ev.srcElement;

    if (this.searchExpanded === true && target.className.indexOf('search-query') === -1 ) {
          
      // animate container - collapse
      this._updateClassName('remove', 'expanded', this.container);

      // flag it as expanded
      this.searchExpanded = false;

      // remove listener from body element
      this._removeEventListener(document.body, 'touchstart', this.close);
      this._removeEventListener(document.body, 'click', this.close);

      return true;

    }
    
    return false;
  };


  /**
   * Sets the event listener on element.
   * 
   * @name _addEventListener
   * @param el {HTMLNode} element on which event listener is added
   * @param evt {String} type of event to be listened
   * @param callback {Function} a callback function
   */
  ESB.prototype._addEventListener = function(el, evt, callback){

    if (this.events[el] && this.events[el][evt] === callback) {
      
      return;
    
    } else {
      
      if (!this.events[el]) {
        this.events[el] = {};
      }

      this.events[el][evt] = callback;

      if (el.addEventListener) {

        el.addEventListener(evt, callback.bind(this), false); 

      } else if (el.attachEvent)  {

        el.attachEvent(evt, callback.bind(this));

      }

    }
    
  };

  /**
   * Removes the event listener from element.
   * 
   * @name _removeEventListener
   * @param el {HTMLNode} element on which event listener is added
   * @param ev {String} type of event to be listened
   * @param callback {Function} a callback function
   */
  ESB.prototype._removeEventListener = function(el, evt, callback){

    if (this.events[el] && this.events[el][evt] === callback) {

        this.events.pop(el);

        if (el.removeEventListener) {

          el.removeEventListener(evt, callback, false); 

        } else if (el.attachEvent)  {

          el.detachEvent(evt, callback);

        }

    } else {

        return;
        
    }
    
  };

  /**
   * Helper function for adding/removing CSS classes.
   * Read the function name and params as follows:
   *
   * @name _updateClassName
   * @param action {String} a callback function
   * @param val {String} type of event to be listened
   * @param el {HTMLNode} element on which event listener is added
   */
  ESB.prototype._updateClassName = function(action, val, el){

    var classNameArr = new Array();
    
    try {

      classNameArr = el.className.split(' ');

      if (action === 'add') {

        // clear that empty element
        if (classNameArr.length === 1 && classNameArr[0] === "") {

          classNameArr.pop();

        }

        classNameArr.push(val);


      } else if (action === 'remove') {

        classNameArr.pop(val);
      
      } else {

        throw new Error('You should set first param `action` to either `add` or `remove`. For details read the README.');

      }
      
      el.className = (classNameArr.length === 1) ? classNameArr.join('') : classNameArr.join(' ');

    } catch (e) {

      console.error(e.message);

    }
    
  };

  window.ESB = ESB;

})(window, document);