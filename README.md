# jquery-autosave

    //simple
    $("input").autosave();

Watches change events on all inputs, POSTing their values to your backend.

    //awesomeness
    $(".autosave").autosave({ url:"/save", done:function(){}, fail:function(){} });

POST the values and data-* attrs of any element to your "/save" uri and optionally write callbacks just like $.ajax


## Options
You can pass any of these options to the .autosave() function:
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
      <td>url</td>
      <td>string</td>
      <td>null</td>
      <td>The URL to which the request is sent.</td>
    </tr>
    <tr>
      <td>method</td>
      <td>string</td>
      <td>"POST"</td>
      <td>The type of request to make, usually POST or GET. Other HTTP request methods, such as PUT and DELETE, can also be used here, but they are not supported by all browsers.</td>
    </tr>
    <tr>
      <td>event</td>
      <td>string</td>
      <td>"change"</td>
      <td>Event that causes the plugin to send data to your url. See <a href="http://api.jquery.com/on/">jQuery.on</a> for options.</td>
    </tr>
    <tr>
      <td>type</td>
      <td>string</td>
      <td>"html"</td>
      <td>Specify the dataType you are expecting (xml, json, script, or html)</td>
    </tr>
    <tr>
      <td>data</td>
      <td>object</td>
      <td>null</td>
      <td>Object that holds all data that will be posted back to the url when the event is fired. You can set global default values to be sent here. All data-* attribute values end up here, minus "data-" (e.g. "data-id" becomes "id").</td>
    </tr>
    <tr>
      <td>debug</td>
      <td>boolean</td>
      <td>false</td>
      <td>Will stop any requests from being performed and will console.log the data variable inside of the autosave library</td>
    </tr>
    <tr>
      <td>before</td>
      <td>function</td>
      <td>function(){}</td>
      <td>Callback called just before a request is sent to the server.</td>
    </tr>
    <tr>
      <td>done</td>
      <td>function</td>
      <td>function(){}</td>
      <td>Callback used when the ajax call was successfull.</td>
    </tr>
    <tr>
      <td>fail</td>
      <td>function</td>
      <td>function(){}</td>
      <td>Callback used when ajax call failed, or there was an error. Note: If you specify a 'type', it must match the response or even a 200 (ok) response will show as failed.</td>
    </tr>
    <tr>
      <td>always</td>
      <td>function</td>
      <td>function(){}</td>
      <td>Callback used when when finished, whether successful or not.</td>
    </tr>
  </tbody>
</table>

originally forked from cfurrow/jquery.autosave.js at https://github.com/cfurrow/jquery.autosave.js
