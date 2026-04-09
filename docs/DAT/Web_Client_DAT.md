# Web Client DAT

**Family:** DAT (Data Operator)

## Summary

The Web Client DAT allows you to send HTTP requests to web servers from TouchDesigner. It supports GET, POST, PUT, DELETE, HEAD, OPTIONS and PATCH http methods.

The Web Client DAT supports various authentication types such as: basic, oauth1, oauth2.

The Web Client DAT allows for streaming from web servers.

The Web Client DAT sends HTTP requests to web servers and then outputs the response in the DAT. With streaming enabled it can stream data from a web server.

When streaming is enabled, Clamp Output as Rows should be enabled. This turns the output of the DAT into a FIFO table instead of raw text. Only the last N lines will be displayed, where N is the value of the Maximum Lines parameter. This will prevent the text in the DAT from getting too larger and will keep cook-times down as a result.

The Web Client DAT supports sending of GET, POST, PUT, DELETE, HEAD, OPTIONS, and PATCH request methods. The Web Client DAT also supports 4 authentication methods: Basic, Digest, OAuth1, and OAuth2.

The first input is the extra headers to send in the request. It should be a table with 2 columns, structured as name/value pairs. For example:

The second input is the data/parameters to send in the request. This can be a table with two columns, structured as name/value pairs. It can also just be text, in which case it will be sent as is. If the request method doesn't have a request body (eg. GET, OPTIONS) then it will append the input to the URL as query parameters if a table, otherwise it will be sent as the request data.

The Web Client DAT is the successor to the Web DAT.

See also: Web Server DAT, SocketIO DAT, XML DAT, TCP/IP DAT, WebSocket DAT, Web DAT.

## Parameters

### Web Client Page

#### Active `active`

Toggles the operator on/off.

#### Request Method `reqmethod`

Selects the HTTP request method.

- **GET** `get` - The GET method requests a representation of the specified resource. Requests using GET should only retrieve data.
- **POST** `post` - The POST method is used to submit an entity to the specified resource, often causing a change in state or side effects on the server.
- **PUT** `put` - The PUT method replaces all current representations of the target resource with the request payload.
- **DELETE** `delete` - The DELETE method deletes the specified resource.
- **HEAD** `head` - The HEAD method asks for a response identical to that of a GET request, but without the response body.
- **OPTIONS** `options` - The OPTIONS method is used to describe the communication options for the target resource.
- **PATCH** `patch` - The PATCH method is used to apply partial modifications to a resource.

#### URL `url`

The URL of the server to send the HTTP request. Generally, if sending an HTTP request to a secure server, then the URL should begin with "https://".

#### Upload File `uploadfile`

The contents of the upload file will be sent to the server (chunked, if necessary).

#### Request `request`

Sends the request

#### Stop `stop`

Stops the stream of data from the server.

#### Stream `stream`

Enables streaming. This is only necessary to enable if the server support streaming.

#### Verify Certificate (SSL) `verifycert`

Enables TLS (transport layer security) certificate verification.

#### Timeout `timeout`

Timeout time in milliseconds of the request if no response is received from the web server.

#### Include Header in Output `includeheader`

Includes the header in the output of the response.

### Authentication Page

#### Authentication Type `authtype`

The type of authentication.

- **None** `none` - No authentication
- **Basic** `basic` - Basic authentication is base-64 encoded username and password.
- **Digest** `digest` - Digest authentication is base-64 encoded username and password that's encrypted with a hashing function. Digest is a more secure version of Basic authentication.
- **OAuth1** `ouath1` - Version 1 of OAuth. OAuth1 requires App Key, App Secret, User OAuth Token, and User OAuth Secret. These can be found via the account on the web server that request is being sent to. For example, in the case of the Twitter API the values of these 4 parameters can be found under the account profile.
- **OAuth2** `ouath2` - Version 2 of OAuth. OAuth2 first requires an HTTP request be sent to the web server to acquire the Client ID and token. It can be acquired using a browser.

#### Username `username`

Username used in Basic/Digest authentication.

#### Password `pw`

Password used in Basic/Digest authentication.

#### App Key `appkey`

OAuth1 App Key retrieved from web server.

#### App Secret `appsecret`

OAuth1 App Secret retrieved from web server.

#### User OAuth Token `oauthtoken`

OAuth1 user token retrieved from web server.

#### User OAuth Secret `oauthsecret`

OAuth1 user secret retrieved from web server.

#### Client ID `clientid`

OAuth2 Client ID retrieved from web server.

#### Token `token`

OAuth2 token retrieved from web server.

### Output Page

#### Clear Output `clear`

Clears the output of the DAT.

#### Clamp Output as Rows `clamp`

When enabled, the output of the DAT is table instead of text. The rows will also be clamped to Maximum lines parameter value. This should be enabled when streaming is enabled too ensure that the output does not get too large.

#### Maximum Lines `maxlines`

The maximum number of rows when clamping is enabled.

#### Callbacks DAT `callbacks`

The Callbacks DAT.

### Common Page

#### Language `language`

Select how the DAT decides which script language to operate on.

- **Input** `input` - The DAT uses the inputs script language.
- **Node** `node` - The DAT uses it's own script language.

#### Edit/View Extension `extension`

Select the file extension this DAT should expose to external editors.

- **dat** `dat` - various common file extensions.
- **From Language** `language` - pick extension from DATs script language.
- **Custom Extension** `custom` - Specify a custom extension.

#### Custom Extension `customext`

Specifiy the custom extension.

#### Word Wrap `wordwrap`

Enable Word Wrap for Node Display.

- **Input** `input` - The DAT uses the inputs setting.
- **On** `on` - Turn on Word Wrap.
- **Off** `off` - Turn off Word Wrap.

## Operator Inputs

- Input 0: -
- Input 1: -

## Info CHOP Channels

Extra Information for the Web Client DAT can be accessed via an Info CHOP.

### Specific Web Client DAT Info Channels
- download_progress -
- downloaded_size -
- total_size -
- connected -
- connection_error -
- communicating -

### Common DAT Info Channels
- num_rows - Number of rows in this DAT.
- num_cols - Number of columns in this DAT.

### Common Operator Info Channels
- total_cooks - Number of times the operator has cooked since the process started.
- cook_time - Duration of the last cook in milliseconds.
- cook_frame - Frame number when this operator was last cooked relative to the component timeline.
- cook_abs_frame - Frame number when this operator was last cooked relative to the absolute time.
- cook_start_time - Time in milliseconds at which the operator started cooking in the frame it was cooked.
- cook_end_time - Time in milliseconds at which the operator finished cooking in the frame it was cooked.
- cooked_this_frame - 1 if operator was cooked this frame.
- warnings - Number of warnings in this operator if any.
- errors - Number of errors in this operator if any.
