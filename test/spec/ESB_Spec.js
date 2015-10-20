'use strict';
describe('Expandable Search Bar (ESB)', function(){
  
  // initialisation
  var esb, MockedESB;
  var wrapperElement;

  var formId  = 'search-form';

  var ERR     = {
    NO_FORM_EL:       'You have to specify form to use this plugin or add/change your form ID to "searchForm"',
    NO_CONTAINER_EL:  'Container element is missing! Please check example code for proper markup.',
    NO_QUERY_EL:      'Search query field ID is missing! Please check example code for proper markup.',
    NO_BUTTON_EL:     'Search button ID is missing! Please check example code for proper markup.'
  };

  
  // DOM preparations
  wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', 'wrapper');
  document.body.insertBefore(wrapperElement, document.body.childNodes[0]);

  
  // handle inheritance as spying on class itself interfere with other tests
  var cloneClass = function (Original) {
    var ClonedClass = function () {
        ClonedClass.prototype.constructor.apply(this, arguments);
    };
    ClonedClass.prototype = Object.create(Original.prototype);
    ClonedClass.prototype.constructor = Original;
    return ClonedClass;
  };


  // POLYFILL for bind()
  // 
  if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
      if (typeof this !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
      }

      var aArgs   = Array.prototype.slice.call(arguments, 1),
          fToBind = this,
          FNOP    = function() {},
          FBound  = function() {
            return fToBind.apply(this instanceof FNOP ? this : oThis,
                   aArgs.concat(Array.prototype.slice.call(arguments)));
          };

      if (this.prototype) {
        // native functions don't have a prototype
        FNOP.prototype = this.prototype; 
      }
      FBound.prototype = new FNOP();

      return FBound;
    };
  }

  // polyfill for event trigger
  function triggerEvent(el, evt){
    
    var eventObj;
    
    if (document.createEvent) {
    
      eventObj = document.createEvent('MouseEvents');
      eventObj.initEvent( evt, true, false );
      el.dispatchEvent(eventObj);
    
    } else if (document.createEventObject) { 
    
      eventObj = document.createEventObject();
      el.triggerEvent( 'on' + evt, eventObj );
    
    } 
  
  } 

  beforeEach(function(){
    
    MockedESB = cloneClass(ESB);

    // set some spies
    spyOn(console, 'error').and.callThrough();
    

  });

  afterEach(function(){
    
    if (esb){

      delete esb.formElement;
      delete esb.container;
      delete esb.searchQuery;
      delete esb.searchButton;

      esb = null;
      MockedESB = null;

    }

    document.getElementById('wrapper').innerHTML = '';

  });


  // Specs - setup
  // 
  describe('Setup', function(){

    it('should be initialised', function(){
      
      document.getElementById('wrapper').innerHTML = window.__html__['test/fixtures/completeMarkup.html'];
      spyOn(MockedESB.prototype, 'constructor').and.callThrough();
      expect(MockedESB.prototype.constructor).not.toHaveBeenCalled();
      esb = new MockedESB(formId);
      expect(MockedESB.prototype.constructor).toHaveBeenCalled();

    });


    it('should initialise `formElement` element', function(){

      document.getElementById('wrapper').innerHTML = window.__html__['test/fixtures/completeMarkup.html'];
      esb = new ESB(formId);
      expect(esb.formElement).toBeDefined();
      expect(esb.formElement).not.toBeNull();
    
    });

    it('should gracefully report if `formElement` ID is not specified', function(){
      
      document.getElementById('wrapper').innerHTML = window.__html__['test/fixtures/completeMarkup.html'];
      esb = new ESB();
      expect(esb.formElement).toBeNull();
      expect(console.error).toHaveBeenCalledWith(ERR.NO_FORM_EL);

    });

    // container check
    // 
    it('should find `container` element (DIV) inside the form', function(){
      
      document.getElementById('wrapper').innerHTML = window.__html__['test/fixtures/completeMarkup.html'];
      esb = new ESB(formId);
      expect(esb.container).toBeDefined();
      expect(esb.container).not.toBeNull();
    
    });

    it('should gracefully report if `container` element is not found', function(){
      
      document.getElementById('wrapper').innerHTML = window.__html__['test/fixtures/noContainerMarkup.html'];
      esb = new ESB(formId);
      expect(esb.container).toBeNull();
      expect(console.error).toHaveBeenCalledWith(ERR.NO_CONTAINER_EL);

    });

    // search-query check
    // 
    it('should find `search-query` element inside the form', function(){
      
      document.getElementById('wrapper').innerHTML = window.__html__['test/fixtures/completeMarkup.html'];
      esb = new ESB(formId);
      expect(esb.searchQuery).toBeDefined();
      expect(esb.searchQuery).not.toBeNull();
    
    });

    it('should gracefully report if `search-query` element is not found', function(){
      
      document.getElementById('wrapper').innerHTML = window.__html__['test/fixtures/noQueryMarkup.html'];
      esb = new ESB(formId);
      expect(esb.searchQuery).toBeNull();
      expect(console.error).toHaveBeenCalledWith(ERR.NO_QUERY_EL);

    });

    // search-button check
    // 
    it('should find `search-button` element inside the form', function(){
      
      document.getElementById('wrapper').innerHTML = window.__html__['test/fixtures/completeMarkup.html'];
      esb = new ESB(formId);
      expect(esb.searchButton).toBeDefined();
      expect(esb.searchButton).not.toBeNull();
    
    });

    it('should gracefully report if `search-button` element is not found', function(){
      
      document.getElementById('wrapper').innerHTML = window.__html__['test/fixtures/noButtonMarkup.html'];
      esb = new ESB(formId);
      expect(esb.searchButton).toBeNull();
      expect(console.error).toHaveBeenCalledWith(ERR.NO_BUTTON_EL);

    });

    it('should initialise event listeners', function(){

      document.getElementById('wrapper').innerHTML = window.__html__['test/fixtures/completeMarkup.html'];
      spyOn(MockedESB.prototype, '_addEventListener').and.callThrough();
      expect(MockedESB.prototype._addEventListener).not.toHaveBeenCalled();
      esb = new MockedESB(formId);
      expect(esb._addEventListener).toHaveBeenCalled();

    });

    
    
  });


  // Specs - implementation
  // 
  describe('Implementation', function(){

    it('should toggle `search-query` element while clicking on `search-button`', function(){
      
      // // var esbconstr = spyOn(ESB.prototype, 'constructor')
      document.getElementById('wrapper').innerHTML = window.__html__['test/fixtures/completeMarkup.html'];
      esb = new ESB(formId);
      
      expect(esb.container.className).toBe('');
      expect(esb.searchExpanded).toBe(false);
      
      triggerEvent(esb.searchButton, 'click');
      expect(esb.searchExpanded).toBe(true);
      expect(esb.container.className).toBe('expanded');

      triggerEvent(esb.searchButton, 'click');
      expect(esb.searchExpanded).toBe(false);
      expect(esb.container.className).toBe('');

    });

    it('should collapse `search-query` element after click event on `document`', function(){
      
      // // var esbconstr = spyOn(ESB.prototype, 'constructor')
      document.getElementById('wrapper').innerHTML = window.__html__['test/fixtures/completeMarkup.html'];
      esb = new ESB(formId);
      
      expect(esb.container.className).toBe('');
      expect(esb.searchExpanded).toBe(false);
      
      triggerEvent(esb.searchButton, 'click');
      expect(esb.searchExpanded).toBe(true);
      expect(esb.container.className).toBe('expanded');

      triggerEvent(esb.doc, 'click');
      
      expect(esb.container.className).toBe('');
      expect(esb.searchExpanded).toBe(false);

    });

  });


});

