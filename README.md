# jquery-autosave

    // simple
    $("input").autosave();

Watches change events on all inputs, POST-ing their values to your backend.

    // awesomeness
    $(".autosave").autosave({ url:"/save", done:function(){}, fail:function(){} });

Use a class and when those elements change, they will POST their values and data-* attrs to your url and include callbacks just like $.ajax


## Options
The following options can be passed to the plugin when it is initialized.
<table class="table table-striped table-lined">
  <thead>
    <tr>
      <th>Option</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>url</strong></td>
      <td>string</td>
      <td>null</td>
      <td>The URL to which the request is sent.</td>
    </tr>
    <tr>
      <td><strong>method</strong></td>
      <td>string</td>
      <td>"POST"</td>
      <td>The type of request to make, usually POST or GET. Other HTTP request methods, such as PUT and DELETE, can also be used here, but they are not supported by all browsers.</td>
    </tr>
    <tr>
      <td><strong>event</strong></td>
      <td>string</td>
      <td>"change"</td>
      <td>Event that causes the plugin to send data to your url. See <a href="http://api.jquery.com/on/">jQuery.on</a> for options.</td>
    </tr>
    <tr>
      <td><strong>type</strong></td>
      <td>string</td>
      <td>"html"</td>
      <td>Specify the dataType you are expecting (xml, json, script, or html)</td>
    </tr>
    <tr>
      <td><strong>data</strong></td>
      <td>object</td>
      <td>null</td>
      <td>Object that holds all data that will be posted back to the url when the event is fired. You can set global default values to be sent here. All data-* attribute values end up here, minus "data-" (e.g. "data-foo" becomes "foo").</td>
    </tr>
    <tr>
      <td><strong>debug</strong></td>
      <td>boolean</td>
      <td>false</td>
      <td>Will stop any requests from being performed and will console.log the data variable inside of the autosave library</td>
    </tr>
  </tbody>
</table>

##Callbacks/Promises
The following promise methods are available. However, if used, they should be included as options when autosave is initialized. See demos below for implementation example.
<table class="table table-striped table-lined">
  <thead>
    <tr>
      <th>Callback</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>before:</strong> function(){}</td>
      <td>Called just before processing the autosave. This is a great place to make some last second changes to the inline html data-* attributes.
      </td>
    </tr>
    <tr>
      <td><strong>done:</strong> function(data, textStatus, jqXHR){}</td>
      <td>Called when the autosave ajax call was successful. 
        <br>
        The function's arguments are the same as those in a jqXHR.done() in <a href="https://api.jquery.com/jQuery.ajax/">jQuery.ajax</a> (data, textStatus, and the jqXHR object).</td>
    </tr>
    <tr>
      <td><strong>fail:</strong> function(jqXHR, textStatus, errorThrown){}</td>
      <td>Called when the autosave ajax call failed or there is an error in the response. Note: Default 'type' is 'html' and it must match the response or even a 200(OK) status response will show as failed.
        <br>
        The function's arguments are the same as those in a jqXHR.fail() in <a href="https://api.jquery.com/jQuery.ajax/">jQuery.ajax</a> (jqXHR, textStatus, errorThrown).
      </td>
    </tr>
    <tr>
      <td><strong>always:</strong> function(){}</td>
      <td>Called when finished, whether successful or not. This is the very last process performed during an autosave.</td>
    </tr>
  </tbody>
</table>

originally forked from cfurrow/jquery.autosave.js at https://github.com/cfurrow/jquery.autosave.js
