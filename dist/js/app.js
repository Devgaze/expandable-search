!function(a,b,c){"use strict";function d(a){this.searchExpanded=!1,this.events=[];try{var c=""!==a?a:"search-form";if(this.formElement=b.getElementById(c),null===this.formElement)throw new Error('You have to specify form to use this plugin or add/change your form ID to "searchForm"');if(this.container=b.querySelector("form#"+c+" div"),null===this.container)throw new Error("Container element is missing! Please check example code for proper markup.");if(this.searchQuery=b.querySelector("form#"+c+" .search-query"),null===this.searchQuery)throw new Error("Search query field ID is missing! Please check example code for proper markup.");if(this.searchButton=b.querySelector("form#"+c+" .search-button"),null===this.searchButton)throw new Error("Search button ID is missing! Please check example code for proper markup.");this._addEventListener(this.searchButton,"click",this.toggleSearch),this._addEventListener(this.searchButton,"touchstart",this.toggleSearch)}catch(d){console.error(d.message)}}d.prototype.toggleSearch=function(a){a.preventDefault(),a.stopPropagation(),this.searchExpanded===!1?(this._updateClassName("add","expanded",this.container),this.searchExpanded=!0,this._addEventListener(b.body,"touchstart",this.close),this._addEventListener(b.body,"click",this.close)):(this._updateClassName("remove","expanded",this.container),this.searchExpanded=!1,this._removeEventListener(b.body,"touchstart",this.close),this._removeEventListener(b.body,"click",this.close),this.formElement.submit())},d.prototype.close=function(a){var c=a.target||a.srcElement;return this.searchExpanded===!0&&-1===c.className.indexOf("search-query")?(this._updateClassName("remove","expanded",this.container),this.searchExpanded=!1,this._removeEventListener(b.body,"touchstart",this.close),this._removeEventListener(b.body,"click",this.close),!0):!1},d.prototype._addEventListener=function(a,b,c){this.events[a]&&this.events[a][b]===c||(this.events[a]||(this.events[a]={}),this.events[a][b]=c,a.addEventListener?a.addEventListener(b,c.bind(this),!1):a.attachEvent&&a.attachEvent(b,c.bind(this)))},d.prototype._removeEventListener=function(a,b,c){this.events[a]&&this.events[a][b]===c&&(this.events.pop(a),a.removeEventListener?a.removeEventListener(b,c,!1):a.attachEvent&&a.detachEvent(b,c))},d.prototype._updateClassName=function(a,b,c){var d=new Array;try{if(d=c.className.split(" "),"add"===a)1===d.length&&""===d[0]&&d.pop(),d.push(b);else{if("remove"!==a)throw new Error("You should set first param `action` to either `add` or `remove`. For details read the README.");d.pop(b)}c.className=1===d.length?d.join(""):d.join(" ")}catch(e){console.error(e.message)}},a.ESB=d}(window,document);