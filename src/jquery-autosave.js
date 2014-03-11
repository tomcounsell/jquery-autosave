jQuery.fn.autosave = function(options){
  var $ = jQuery;
  $.each(this,function(){
    var $this = $(this);
    
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
    
    options = $.extend(defaults, options); //options overwrite defaults
    var inline_options = getDataAttributes(this);
    var event = inline_options.event || options.event;
    
    $this.on(event,function(e){
      var $element = $(this);

      if(options.before){
        options.before.call($this); // call in the context of the element
      }
      
      var inline_options = getDataAttributes(this); //get latest inline options
      options = $.extend(options, inline_options); //inline options overwrite options
      var data = $.extend(options.data, inline_options) //include all inline options in data
      
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
        }).done(function(){   $this.trigger('autosave-done');
        }).fail(function(){   $this.trigger('autosave-fail');
        }).always(function(){ $this.trigger('autosave-always');
        });
        return true;
        
      }else{
        console.log(data);
        e.preventDefault();
        return false;
      }
    }); //end applying event handler
    
    if (options.done){
      $this.on('autosave-done', function(){ options.done.call($this) });
    }
    if (options.fail){
      $this.on('autosave-fail', function(){ options.fail.call($this) });
    }
    if (options.always){
      $this.on('autosave-always', function(){ options.always.call($this) });
    }
  }); //end applying callback functions

  function getDataAttributes(element){
    var data_attribute_regex = /^data\-(\w+)$/;
    var data_attributes = {};
    data_attributes.value = element.value || "";
    data_attributes.name  = element.name || "";

    $.each(element.attributes,function(index,attribute){
      if(data_attribute_regex.test(attribute.nodeName)){
        attribute_name = data_attribute_regex.exec(attribute.nodeName)[1]
        data_attributes[attribute_name] = attribute.value;
      }
    });
    
    return data_attributes;
  }// end getDataAttributes()
  
}; //end autosave
