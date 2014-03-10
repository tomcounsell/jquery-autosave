jQuery.fn.autosave = function(options){
  var $ = jQuery;
  $.each(this,function(){
    var $this = $(this);
    var defaults = {
      url:    "/",
      method: "POST",
      event:  "change",
      data:   {},
      type:   "html",
      debug:  false,
      before: function(){},
      done:function(){},
      fail:  function(){}
    };
    options = $.extend(defaults, options); //options overwrite defaults
    var inline_options = getDataAttributes(this);
    var event = inline_options.event || options.event;
    
    $this.on(event,function(e){
      var $element = $(this);

      if(options.before){
        options.before.call(this); // call in the context of the element
      }
      
      var inline_options = getDataAttributes(this); //get latest inline options
      options = $.extend(options, inline_options); //inline options overwrite options
      var data = $.extend(options.data, inline_options) //include all inline options in data
      
      if(!options.debug) { // Unless in Debug Mode
        
        $.ajax({
          url:      options.url,
          type:     options.method,
          cache:    false,
          data:     data,
          dataType: options.type
        }).done(function(response_data){ options.done(data,$element);
        }).fail(function(jqXHR, text_status){ options.done(data,$element);
        });
        return true;
        
      }else{
        console.log(data);
        e.preventDefault();
        return false;
      }
    });
  });

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
  }
  
};
