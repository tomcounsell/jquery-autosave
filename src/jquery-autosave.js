;(function( $, window, document, undefined ){
  
var pluginName = 'autosave'
var defaults = {
  url:    "",
  method: "POST",
  event:  "change",
  data:   {},
  type:   "html",
  debug:  false,
  before: function(){},
  done:   function(){},
  fail:   function(){},
  always: function(){}
};

function Plugin(element, options){
  this.element = element;
  //merge defualts and options without changing either
  this.options = $.extend( {}, defaults, options);
  
  this._defaults = defaults;
  this._name = pluginName;
  this.init();
}

Plugin.prototype.init = function(){
  var $this = $(this.element);
  var inline_options = getDataAttributes($this);
  var init_options = this.options; //preserve initial options
  
  //override just the event variable, check back and use updated data later
  var inline_options = getDataAttributes($this);
  init_options.event = inline_options.event || init_options.event

  $this.on(init_options.event,function(e){

    // before, done, fail, always use init_options 
    // so as to not be overwritten by inline_options
    if(init_options.before){
      init_options.before.call($this); // call in the context of the element
    }

    var inline_options = getDataAttributes($this); //get latest inline options
    options = $.extend({}, init_options, inline_options); //inline options overwrite options
    var data = $.extend({}, options.data, inline_options) //include all inline options in data

    //if data.debug included as string, change to boolean
    if (options.debug == "false"){ options.debug = false; }

    //remove url, method, type, debug from request params, add event
    delete data.url; 
    delete data.method; 
    delete data.type; 
    delete data.debug;
    data.event = options.event;

    if(!options.debug) { // Unless in Debug Mode

      $.ajax({
        url:      options.url,
        type:     options.method,
        cache:    false,
        data:     data,
        dataType: options.type
      }).done(function(data){   
          $this.data('autosave-response', data)
          $this.trigger('autosave-done');
      }).fail(function(){
          $this.trigger('autosave-fail');
      }).always(function(){ 
          $this.trigger('autosave-always');
      });

    }else{
      console.log(data);
    }
  }); //end applying event handler

  // before, done, fail, always use init_options 
  // so as to not be overwritten by inline_options
  if (init_options.done){
    $this.on('autosave-done', function(){ options.done.call($this) });
  }
  if (init_options.fail){
    $this.on('autosave-fail', function(){ options.fail.call($this) });
  }
  if (init_options.always){
    $this.on('autosave-always', function(){ options.always.call($this) });
  }

  function getDataAttributes($element){
    var data_attribute_regex = /^data\-(\w+)$/;
    var data_attributes = {};
    data_attributes.value = $element.val() || "";
    data_attributes.name  = $element.attr('name') || "";
    

    $($element[0].attributes).each(function(){
      if(data_attribute_regex.test(this.nodeName)){
        attribute_name = data_attribute_regex.exec(this.nodeName)[1]
        data_attributes[attribute_name] = this.nodeValue;
      }
    });
    
    return data_attributes;
  }// end getDataAttributes()

}//end init()

$.fn.autosave = function ( options ) {
  return this.each(function () {
    new Plugin( this, options );
  });
};//end plugin
  
})( jQuery, window, document );
