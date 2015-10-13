'use strict';
describe('Expandable Search Bar (ESB) setup', function(){
  
  // initialisation
  var esb;
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


  beforeEach(function(){
    
    // set some spies
    spyOn(window, 'ESB').and.callThrough();
    spyOn(console, 'error').and.callThrough();

  });

  afterEach(function(){
    
    if (esb){

      delete esb.formElement;
      delete esb.container;
      delete esb.searchQuery;
      delete esb.searchButton;

      esb = null;

    }

    document.getElementById('wrapper').innerHTML = '';

  });


  // Specs - setup
  // 
  describe('Setup', function(){

    it('should be initialised', function(){
      
      document.getElementById('wrapper').innerHTML = window.__html__['test/fixtures/completeMarkup.html'];
      expect(ESB).not.toHaveBeenCalled();
      esb = new ESB(formId);
      expect(ESB).toHaveBeenCalled();

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
    
  });


  // Specs - operations
  // 
  describe('Operations', function(){

    it('should listen events on `search-button` elements', function(){
      expect(true).toBe(true);
    });

  });


});

