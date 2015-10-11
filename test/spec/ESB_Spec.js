'use strict';
describe('Expandable Search Bar (ESB)', function(){
  
  var esb, esbWithError, bodyElement, formElement;

  var ERR = {
    NO_FORM_EL: 'You have to specify form to use this plugin or add/change your form ID to "searchForm"'
  };

  beforeEach(function(){
    bodyElement = document.body;
    formElement = document.createElement('form');
    
    bodyElement.appendChild(formElement);

    // set some spies
    spyOn(window, 'ESB').and.callThrough();
    spyOn(console, 'error').and.callThrough();

    esb = new ESB(formElement);

  });

  it('should be initialised', function(){

    expect(ESB).toHaveBeenCalled();

  });

  it('should have `domForm` specified', function(){

    expect(esb.domForm).not.toBeNull();

  });

  it('should gracefully report if `domForm` is not specified', function(){

    esbWithError = new ESB();
    expect(esbWithError.domForm).toBeNull();
    expect(console.error).toHaveBeenCalledWith(ERR.NO_FORM_EL);

  });

});