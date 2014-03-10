jQuery.fn.autosave = function(options){
  var $ = jQuery;
  $.each(this,function(){
    var $this = $(this);
    var defaults = {
      data:{},
      method: "POST",
      url:    "/",
      event:  "change",
      debug:  false,
      type:   "html",
      success:function(){},
      error:  function(){},
      before: function(){}
    };
    options = $.extend(defaults, options); //options overwrite defaults
    var inline_options = getDataAttributes(this);
    var event = inline_options.event || options.event;
    
    $this.on(event,function(e){
      var $element = $(this);
      var inline_options = getDataAttributes(this); //get latest inline options
      options = $.extend(options, inline_options); //inline options overwrite options
      var data = $.extend(options.data, inline_options) //include all inline options in data

      if(options.before){
        options.before.call(this,$element);
      }
      
      if(!options.debug) { // Unless in Debug Mode
        $.ajax({
          url:      options.url,
          type:     options.method,
          data:     data,
          dataType: options.type,
          success: function(data){
            options.success.call(data,$element);
          },
          error:function(error){
            options.error.call(error,$element);
          }
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
