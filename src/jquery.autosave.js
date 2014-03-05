jQuery.fn.autosave = function(options){
  var $ = jQuery;
  $.each(this,function(){
    var $this = $(this);
    var defaults = {
      data:{},
      event: "change",
      debug: false,
      type: "html",
      success: function(){},
      error  : function(){},
      before : function(){}
    };
    options = $.extend(defaults,options);
    $this.data('original-value', $this.val());
    var data = getDataAttributes(this);

    var event = data.event || options.event;
    var dataType = data.type || options.type;
    $this.on(event,function(e){
      var $el = $(this);
      data.value = $el.val();
      data = $.extend(data,getDataAttributes(this));
      var url = data.url ? data.url : options.url;
      
      // No need to process the form if nothing actually changed
      if($el.val() == $el.data('original-value')) {
        e.preventDefault();
        return false;
      }

      if(options.before){
        options.before.call(this,$el);
      }
      
      // If Debugging is turned on, log the data var
      if(options.debug) {
        console.log(data);
        e.preventDefault();
        return false;
      }

      $.ajax({
        url:url,
        data:data,
        dataType: dataType,
        success:function(data){
          options.success(data,$el);
        },
        error:function(error){
          options.error(error,$el);
        }
      });
    });
  });

  function getDataAttributes(el){
    var rDataAttr = /^data\-(\w+)$/;
    var attrs = {};
    attrs.value = el.value;
    attrs.name  = el.name;

    $.each(el.attributes,function(index,attr){
      if(rDataAttr.test(attr.nodeName)){
        attrs[rDataAttr.exec(attr.nodeName)[1]] = attr.value;
      }
    });
    return attrs;
  }
  
};
